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
 *  4. `wrangler deploy`
 *  5. Atualizar `base_url` em /public/admin/config.yml para o endereço deste worker.
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

function randomState() {
  return crypto.randomUUID();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
      authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", redirectUri);
      authorizeUrl.searchParams.set("scope", "repo,user");
      authorizeUrl.searchParams.set("state", randomState());
      return Response.redirect(authorizeUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Código de autorização em falta.", { status: 400 });
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

      const html = `<!doctype html><html><body><script>
        (function () {
          function receiveMessage(message) {
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

      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return new Response("Cardoso CMS OAuth proxy. Utilize /auth para iniciar sessão.", { status: 200 });
  },
};
