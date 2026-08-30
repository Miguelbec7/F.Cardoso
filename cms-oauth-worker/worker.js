/**
 * Cloudflare Worker que autentica o backoffice (Decap CMS) contra o GitHub.
 * Necessário porque não estamos a alojar em Netlify (que trata disto de fábrica).
 *
 * Configuração (ver README.md nesta pasta para o passo a passo completo):
 *  1. Criar uma GitHub OAuth App em https://github.com/settings/developers
 *     - Homepage URL: o domínio do site (ex: https://fcardoso.pt)
 *     - Authorization callback URL: https://<este-worker>.workers.dev/callback
 *  2. `wrangler secret put GITHUB_CLIENT_ID`
 *  3. `wrangler secret put GITHUB_CLIENT_SECRET`
 *  4. Definir a variável ALLOWED_ORIGIN (não secreta) com o(s) domínio(s) onde o /admin
 *     vive, separados por vírgula (ex: "https://f-cardoso.pages.dev,https://fcardoso.pt").
 *     Sem isto, o token só é entregue a origens "*.pages.dev" por omissão.
 *  5. `wrangler deploy`
 *  6. Atualizar `base_url` em /public/admin/config.yml para o endereço deste worker.
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "gh_oauth_state";

function randomState() {
  return crypto.randomUUID();
}

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

function isAllowedOrigin(origin, env) {
  if (!origin) return false;
  const allowList = (env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if (allowList.includes(origin)) return true;
  if (allowList.length === 0) {
    // Sem lista configurada, aceita por omissão qualquer subdomínio *.pages.dev (ambiente de testes).
    try {
      return new URL(origin).hostname.endsWith(".pages.dev");
    } catch {
      return false;
    }
  }
  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const state = randomState();
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
      authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", redirectUri);
      authorizeUrl.searchParams.set("scope", "repo,user");
      authorizeUrl.searchParams.set("state", state);

      return new Response(null, {
        status: 302,
        headers: {
          Location: authorizeUrl.toString(),
          "Set-Cookie": `${STATE_COOKIE}=${state}; Max-Age=600; Path=/callback; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const expectedState = getCookie(request, STATE_COOKIE);

      if (!code) {
        return new Response("Código de autorização em falta.", { status: 400 });
      }
      if (!state || !expectedState || state !== expectedState) {
        return new Response("Pedido inválido ou expirado — tente iniciar sessão novamente.", { status: 400 });
      }

      const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error || !tokenData.access_token) {
        return new Response(`Falha na autenticação: ${tokenData.error_description || "erro desconhecido"}`, {
          status: 401,
        });
      }

      const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });
      const allowedOriginsJson = JSON.stringify(
        (env.ALLOWED_ORIGIN || "").split(",").map((o) => o.trim()).filter(Boolean)
      );

      const html = `<!doctype html><html><body><script>
        (function () {
          var allowList = ${allowedOriginsJson};
          function isAllowed(origin) {
            if (allowList.indexOf(origin) !== -1) return true;
            if (allowList.length === 0) {
              try { return new URL(origin).hostname.endsWith(".pages.dev"); } catch (e) { return false; }
            }
            return false;
          }
          function receiveMessage(message) {
            if (!isAllowed(message.origin)) return;
            window.opener.postMessage(
              'authorization:github:success:${payload.replace(/'/g, "\\'")}',
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script></body></html>`;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Set-Cookie": `${STATE_COOKIE}=; Max-Age=0; Path=/callback`,
        },
      });
    }

    return new Response("Cardoso CMS OAuth proxy. Utilize /auth para iniciar sessão.", { status: 200 });
  },
};
