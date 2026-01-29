# Guía de Deployment

Esta guía cubre cómo deployar Gemma 15 en diferentes plataformas.

## Opción 1: Vercel (Recomendado) ⚡

Vercel es perfecto para aplicaciones React + Vite.

### Setup

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configurar Environment Variables**
   - Ve al dashboard de Vercel
   - Settings → Environment Variables
   - Agrega:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Re-deploy**
   ```bash
   vercel --prod
   ```

### Auto-deploy desde Git

1. Conecta tu repositorio en Vercel
2. Cada push a `main` deployará automáticamente
3. Los PRs crearán preview deployments

---

## Opción 2: Netlify 🌐

### Setup

1. **Instalar Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Crear `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

5. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Agrega las variables de Supabase

---

## Opción 3: GitHub Pages 📄

### Setup

1. **Instalar gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Actualizar `vite.config.ts`**
   ```ts
   export default defineConfig({
     base: '/gemma15/', // Nombre de tu repo
     // ... resto de config
   });
   ```

3. **Agregar scripts a `package.json`**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub Pages**
   - Repo → Settings → Pages
   - Source: Deploy from branch `gh-pages`

**Nota**: GitHub Pages no soporta environment variables server-side, necesitarás un approach diferente para las credenciales.

---

## Opción 4: Docker 🐳

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build & Run

```bash
docker build -t gemma15 .
docker run -p 3000:80 gemma15
```

---

## Checklist Pre-Deployment ✅

Antes de deployar a producción:

- [ ] Variables de entorno configuradas
- [ ] PWA icons generados y en `/public`
- [ ] Tests pasando (`npm run test`)
- [ ] TypeScript sin errores (`npm run typecheck`)
- [ ] Lint pasando (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Preview funciona (`npm run preview`)
- [ ] Base de datos Supabase en producción
- [ ] RLS policies configuradas
- [ ] Storage buckets creados
- [ ] Al menos un código de invitación en la DB

---

## Post-Deployment

### Verificar PWA

1. Abrir la app en Chrome (móvil o desktop)
2. DevTools → Application → Manifest
3. Verificar que muestre "Installable"
4. Probar instalación

### Verificar HTTPS

Las PWAs requieren HTTPS. Vercel y Netlify lo proveen automáticamente.

### Performance

Usa Lighthouse para verificar performance:

```bash
npm install -g lighthouse
lighthouse https://tu-dominio.com --view
```

Objetivos:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- PWA: 100

---

## Troubleshooting

### Error: "Build failed"

- Verifica que todas las dependencias estén instaladas
- Revisa logs del build
- Asegúrate que las env vars estén configuradas

### Error: "PWA no se instala"

- Verifica HTTPS
- Revisa que los íconos existan
- Verifica el manifest en DevTools

### Error: "Auth no funciona"

- Verifica que las redirect URLs estén configuradas en Supabase
- Auth → URL Configuration
- Agrega tu dominio a "Site URL" y "Redirect URLs"

---

## Monitoreo

Considera agregar:

- **Sentry** para error tracking
- **Analytics** (Google Analytics, Plausible, etc.)
- **Uptime monitoring** (UptimeRobot, etc.)

---

¡Todo listo para deployment! 🚀
