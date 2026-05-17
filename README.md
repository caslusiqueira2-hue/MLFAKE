 # Projeto Mercado Livre Clone
 
 Este projeto foi adaptado para ser facilmente implantado em plataformas de hospedagem como Netlify, Vercel e Cloudflare Pages.
 
 ## Como implantar
 
 ### Netlify
 1. Conecte seu repositório no Netlify.
 2. O arquivo `netlify.toml` já está configurado.
 3. Comando de Build: `npm run build`
 4. Diretório de Publicação: `.output/public`
 
 ### Vercel
 1. Importe seu projeto no Vercel.
 2. O arquivo `vercel.json` cuidará da configuração.
 3. Comando de Build: `npm run build`
 4. Diretório de Saída: `.output/public`
 
 ### Cloudflare Pages
 1. Conecte seu repositório no Cloudflare Pages.
 2. Use o comando de build: `npm run build`
 3. Diretório de saída: `.output/public`
 4. Compatibilidade: `nodejs_compat`
 
 ## Desenvolvimento Local
 
 ```bash
 npm install
 npm run dev
 ```