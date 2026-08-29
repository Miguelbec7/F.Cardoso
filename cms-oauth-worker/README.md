# Login do backoffice (Decap CMS) — passo a passo

Este worker é a única peça de infraestrutura que falta para o backoffice em
`/admin` funcionar (adicionar carros, fotos, marcar como vendido, etc.).
Sem isto o botão "Login with GitHub" em `/admin` não avança.

## 1. Criar a GitHub OAuth App

1. Em https://github.com/settings/developers → **New OAuth App**
2. Nome: "F. Cardoso Automóveis — CMS"
3. Homepage URL: o domínio do site (pode ser o do Cloudflare Pages por agora)
4. Authorization callback URL: `https://fcardoso-cms-auth.<a-tua-conta>.workers.dev/callback`
   (fica definitivo depois de fazeres o deploy no passo 2, é só confirmar que bate certo)
5. Guarda o **Client ID** e gera um **Client Secret**

## 2. Publicar o worker

Precisas de ter uma conta Cloudflare (grátis) e o `wrangler` instalado:

```bash
npm install -g wrangler
cd cms-oauth-worker
wrangler login
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler deploy
```

O deploy dá-te um endereço tipo `https://fcardoso-cms-auth.<conta>.workers.dev`.

## 3. Ligar tudo

Em `public/admin/config.yml`, troca:

```yaml
base_url: https://SUBSTITUIR-PELO-WORKER.workers.dev
```

pelo endereço real do worker. Faz commit e o backoffice em `/admin` passa a
funcionar — qualquer pessoa com acesso ao repositório GitHub pode entrar com
a conta GitHub e editar carros/fotos/testemunhos diretamente pelo `/admin`,
sem tocar em código.
