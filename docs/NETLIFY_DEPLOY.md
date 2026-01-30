# 🚀 Deploy a Netlify - Guía Completa

Esta guía te ayudará a deployar Gemma 15 en Netlify sin errores.

---

## Opción 1: Deploy desde Git (Recomendado)

### Paso 1: Preparar el Repositorio

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Asegúrate de tener estos archivos:
   - `netlify.toml` ✅
   - `public/_redirects` ✅
   - `.gitignore` ✅

### Paso 2: Conectar con Netlify

1. Ve a https://app.netlify.com
2. Click en **Add new site** → **Import an existing project**
3. Selecciona tu repositorio
4. Netlify detectará automáticamente la configuración de `netlify.toml`

### Paso 3: Configurar Environment Variables

En **Site settings** → **Build & deploy** → **Environment variables**, agrega:

```
VITE_SUPABASE_URL = https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY = tu-anon-key-aqui
```

### Paso 4: Deploy

Click en **Deploy site**

✅ El build debería completarse en ~2 minutos.

---

## Opción 2: Deploy Manual con Netlify CLI

### Paso 1: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Paso 2: Login

```bash
netlify login
```

### Paso 3: Build Local

```bash
npm run build
```

Verifica que `dist/` se creó correctamente.

### Paso 4: Deploy

```bash
# Deploy preview
netlify deploy

# Deploy a producción
netlify deploy --prod
```

---

## 🐛 Troubleshooting

### Error: "Rollup failed to resolve import /src/main.tsx"

**Causa**: Ruta incorrecta en `index.html`

**Solución**: Ya está arreglado en la última versión. Verifica que `index.html` tenga:
```html
<script type="module" src="./src/main.tsx"></script>
```

### Error: "PWA assets not found"

**Causa**: Los íconos PNG del manifest no existen.

**Solución**: Ya está arreglado. Ahora usa `vite.svg` que sí existe. Para íconos personalizados:

1. Genera íconos PNG en https://realfavicongenerator.net/
2. Colócalos en `/public`
3. Actualiza `vite.config.ts` con las rutas correctas

### Error: Build timeout

**Causa**: Dependencias muy pesadas.

**Solución**: 
```bash
# Limpiar cache
rm -rf node_modules
npm install

# Actualizar Netlify settings
# Build timeout: 15 minutes (default)
```

### Error: "Module not found"

**Causa**: Imports con alias `@/` no resuelven.

**Solución**: Ya configurado en `vite.config.ts`. Si persiste:
```bash
npm run typecheck
```

### Error 404 en rutas después del deploy

**Causa**: SPA routing no configurado.

**Solución**: Ya está en `netlify.toml` y `public/_redirects`:
```
/*    /index.html   200
```

---

## ✅ Verificar Deploy Exitoso

Después del deploy, verifica:

1. **Homepage carga**: Abre tu URL de Netlify
2. **Auth funciona**: Prueba el flujo de login
3. **PWA se puede instalar**: Chrome → Install app
4. **Rutas funcionan**: Navega a `/admin` (debería redirigir si no eres admin)
5. **Environment variables**: Verifica que no haya error de "Missing variables"

---

## 🔧 Post-Deploy Configuration

### 1. Configurar Dominio Personalizado

1. En Netlify: **Domain management** → **Add custom domain**
2. Agrega tu dominio
3. Configura DNS según las instrucciones

### 2. Configurar HTTPS

Netlify provee HTTPS automáticamente. Espera ~1 minuto después de agregar el dominio.

### 3. Actualizar Supabase

En Supabase → **Authentication** → **URL Configuration**:

1. **Site URL**: `https://tu-dominio.netlify.app`
2. **Redirect URLs**: 
   - `https://tu-dominio.netlify.app/**`

### 4. Habilitar Deploy Previews

En Netlify → **Build settings** → **Deploy contexts**:
- **Production branch**: `main`
- **Branch deploys**: All branches
- **Deploy previews**: Automatically build pull requests

---

## 🚀 Deploy Automático

Cada vez que hagas push a `main`:
1. Netlify detecta el cambio
2. Ejecuta `npm run build`
3. Deploya automáticamente
4. Te notifica por email

---

## 📊 Monitoring

### Netlify Analytics

1. Ve a **Analytics** en tu dashboard
2. Habilita **Netlify Analytics** (tiene costo)
3. O usa Google Analytics gratis (agregar en el código)

### Error Tracking

Para producción, considera agregar:

```bash
npm install @sentry/react
```

---

## 🎯 Optimizaciones Post-Deploy

### 1. Lighthouse Score

```bash
npm install -g lighthouse
lighthouse https://tu-sitio.netlify.app --view
```

Objetivos:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- PWA: 100

### 2. Bundle Size

En Netlify verás el tamaño del bundle. Para reducirlo:

```bash
# Analizar bundle
npm run build
npx vite-bundle-visualizer
```

### 3. Lazy Loading

Ya implementado con React Router code splitting.

---

## 🔄 Rollback

Si un deploy falla:

1. Ve a **Deploys** en Netlify
2. Encuentra un deploy anterior exitoso
3. Click en **...** → **Publish deploy**

---

## 💰 Límites del Free Tier

Netlify free tier incluye:
- ✅ 100GB bandwidth/mes
- ✅ 300 build minutes/mes
- ✅ Deploys ilimitados
- ✅ HTTPS automático
- ✅ 1 build concurrente

Para un evento de 15 años, es más que suficiente.

---

## 📝 Checklist de Deploy

- [ ] Código pusheado a Git
- [ ] `netlify.toml` en la raíz
- [ ] `public/_redirects` creado
- [ ] Environment variables configuradas en Netlify
- [ ] Build exitoso localmente (`npm run build`)
- [ ] Deploy exitoso en Netlify
- [ ] URL de Supabase actualizada
- [ ] Site funciona en la URL de Netlify
- [ ] PWA instalable
- [ ] Todas las rutas funcionan

---

## 🆘 Ayuda Adicional

Si el deploy sigue fallando:

1. **Revisa los logs**: Netlify → Deploy → Deploy log
2. **Build local**: `npm run build` para ver errores
3. **Netlify Support**: https://answers.netlify.com/

---

¡Listo! Tu app debería estar online en minutos. 🎉
