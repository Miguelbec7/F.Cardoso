# Login do backoffice (Decap CMS) — passo a passo pelo painel da Cloudflare

Não precisas de instalar nada no computador — dá para fazer tudo pelo
browser, no painel da Cloudflare. Ordem importante: primeiro criamos o
Worker (para saber o endereço dele), só depois a GitHub OAuth App.

## 1. Criar o Worker (ainda vazio)

1. No painel da Cloudflare, no menu da esquerda: **Compute** → **Workers & Pages**
2. Botão **Create** (ou "Create application" / "Create Worker", consoante a versão do painel)
3. Escolhe **Create Worker** (não é "Pages" — é mesmo "Worker")
4. Nome: `fcardoso-cms-auth`
5. **Deploy** — fica publicado com o código de exemplo, endereço tipo:
   `https://fcardoso-cms-auth.<a-tua-conta>.workers.dev`
   → guarda este endereço, vais precisar dele nos passos seguintes

## 2. Criar a GitHub OAuth App

1. Em https://github.com/settings/developers → **New OAuth App**
2. Nome: "F. Cardoso Automóveis — CMS"
3. Homepage URL: o domínio do site (por agora pode ser o do Cloudflare Pages)
4. Authorization callback URL: `https://fcardoso-cms-auth.<a-tua-conta>.workers.dev/callback`
   (usa o endereço exato que guardaste no passo 1, com `/callback` no fim)
5. **Register application**
6. Guarda o **Client ID**
7. **Generate a new client secret** e guarda-o também (só é mostrado uma vez)

## 3. Colocar o código real no Worker

1. Volta ao Worker (`Compute` → `Workers & Pages` → `fcardoso-cms-auth`)
2. Aba **Edit code** (ou "Quick edit")
3. Apaga o conteúdo de exemplo e cola o conteúdo do ficheiro `worker.js` desta pasta
4. **Deploy** / **Save and deploy**

## 4. Configurar o Client ID / Secret no Worker

1. No Worker, aba **Settings** → **Variables and Secrets**
2. Adiciona duas variáveis do tipo **Secret**:
   - `GITHUB_CLIENT_ID` → cola o Client ID do passo 2
   - `GITHUB_CLIENT_SECRET` → cola o Client Secret do passo 2
3. Guarda (pode pedir para fazer redeploy — aceita)

## 5. Ligar tudo no site

Em `public/admin/config.yml`, troca:

```yaml
base_url: https://SUBSTITUIR-PELO-WORKER.workers.dev
```

pelo endereço real do Worker (sem `/callback` no fim, só o domínio base).
Faz commit e o backoffice em `/admin` passa a funcionar — qualquer pessoa
com acesso ao repositório GitHub pode entrar com a conta GitHub e editar
carros/fotos/testemunhos diretamente pelo `/admin`, sem tocar em código.

---

### Alternativa por linha de comandos (opcional, se preferires)

Se tiveres o `wrangler` instalado, os passos 1, 3 e 4 podem ser feitos assim:

```bash
npm install -g wrangler
cd cms-oauth-worker
wrangler login
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler deploy
```
