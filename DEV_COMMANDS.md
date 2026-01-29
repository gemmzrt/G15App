# 🛠️ Developer Commands - Cheatsheet

Comandos útiles para trabajar en el proyecto Gemma 15.

## 📦 Setup Inicial

```bash
# Instalar dependencias
npm install

# Copiar environment variables
cp .env.example .env

# (Luego editar .env con tus credenciales de Supabase)
```

## 🚀 Development

```bash
# Servidor de desarrollo (Puerto 3000)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🧪 Testing & Quality

```bash
# Ejecutar todos los tests
npm test

# Tests en watch mode
npm test -- --watch

# Tests con coverage
npm test -- --coverage

# E2E tests
npm run test:e2e

# E2E en modo UI
npx playwright test --ui

# TypeScript type checking
npm run typecheck

# ESLint
npm run lint

# Fix lint issues automáticamente
npm run lint -- --fix
```

## 🗄️ Supabase

```bash
# Instalar Supabase CLI (global)
npm install -g supabase

# Login a Supabase
supabase login

# Link a tu proyecto
supabase link --project-ref tu-project-id

# Pull schema actual
supabase db pull

# Push cambios al schema
supabase db push

# Generar types TypeScript
supabase gen types typescript --local > src/types/database.ts
```

## 🎨 Styling

```bash
# Rebuild Tailwind (en watch mode con Vite)
npm run dev

# Ver clases de Tailwind disponibles
npx tailwindcss --help
```

## 📱 PWA

```bash
# Build con PWA
npm run build

# Test PWA locally
npm run preview
# Luego abrir http://localhost:4173 en Chrome

# Generate PWA icons (manual - usa herramienta online)
# https://realfavicongenerator.net/
```

## 🔍 Debugging

```bash
# Servidor con source maps
npm run dev

# Build con source maps
npm run build -- --sourcemap

# Analizar bundle size
npm run build
npx vite-bundle-visualizer
```

## 🗃️ Database Queries (Supabase)

```sql
-- Ver todos los invites
SELECT code, email, segment, used FROM invites;

-- Ver perfiles con usuario
SELECT p.first_name, p.last_name, p.segment, p.is_admin, u.email
FROM profiles p
JOIN auth.users u ON p.user_id = u.id;

-- Ver confirmaciones RSVP
SELECT p.first_name, p.last_name, r.status
FROM rsvps r
JOIN profiles p ON r.user_id = p.user_id;

-- Ver asignaciones de mesa
SELECT p.first_name, p.last_name, t.table_number
FROM table_assignments t
JOIN profiles p ON t.user_id = p.user_id
ORDER BY t.table_number;

-- Hacer a alguien admin
UPDATE profiles 
SET is_admin = TRUE 
WHERE user_id = 'uuid-aqui';

-- Crear invite code
INSERT INTO invites (code, email, segment)
VALUES ('NEWCODE', 'email@example.com', 'YOUNG');

-- Resetear invite (marcarlo como no usado)
UPDATE invites 
SET used = FALSE, claimed_by = NULL
WHERE code = 'CODE123';
```

## 🔄 Git Workflow

```bash
# Crear nueva feature branch
git checkout -b feature/nombre-feature

# Commit con mensaje descriptivo
git add .
git commit -m "feat: descripción de la feature"

# Push a remote
git push origin feature/nombre-feature

# Merge a main (después de PR aprobado)
git checkout main
git merge feature/nombre-feature
git push origin main
```

## 📊 Performance

```bash
# Lighthouse audit
npm install -g lighthouse
npm run build
npm run preview
lighthouse http://localhost:4173 --view

# Bundle analyzer
npm run build
npx vite-bundle-visualizer dist/stats.html
```

## 🐛 Common Fixes

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de Vite
rm -rf node_modules/.vite
npm run dev

# Fix TypeScript errors
npm run typecheck

# Fix lint errors
npm run lint -- --fix

# Rebuild todo
npm run build
```

## 🔐 Environment Variables

```bash
# Development
# Usa .env (local)

# Production (Vercel/Netlify)
# Configura en el dashboard:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY

# Verificar que las variables estén cargando
# (La app mostrará error screen si faltan)
```

## 📦 Dependencies

```bash
# Agregar nueva dependencia
npm install nombre-paquete

# Agregar dev dependency
npm install -D nombre-paquete

# Actualizar dependencias
npm update

# Ver dependencias desactualizadas
npm outdated

# Audit de seguridad
npm audit

# Fix vulnerabilidades automáticamente
npm audit fix
```

## 🚢 Deploy

```bash
# Deploy a Vercel
npm install -g vercel
vercel login
vercel

# Deploy a Netlify
npm install -g netlify-cli
netlify login
netlify deploy --prod

# Deploy a GitHub Pages
npm run deploy
```

## 📝 Útiles para Admin

```sql
-- Estadísticas rápidas
SELECT 
  COUNT(*) FILTER (WHERE status = 'CONFIRMED') as confirmados,
  COUNT(*) FILTER (WHERE status = 'DECLINED') as rechazados,
  COUNT(*) FILTER (WHERE status = 'PENDING') as pendientes
FROM rsvps;

-- Contar celíacos
SELECT COUNT(*) FROM profiles WHERE is_celiac = TRUE;

-- Ver quién no tiene mesa asignada (y confirmó)
SELECT p.first_name, p.last_name
FROM profiles p
JOIN rsvps r ON p.user_id = r.user_id
LEFT JOIN table_assignments t ON p.user_id = t.user_id
WHERE r.status = 'CONFIRMED' AND t.id IS NULL;
```

## 🎨 Custom Styling

```bash
# Editar tema
# → tailwind.config.js

# Editar estilos globales
# → src/styles/index.css

# Agregar nueva fuente
# 1. Editar index.html (Google Fonts link)
# 2. Editar tailwind.config.js (fontFamily)
```

## 📱 Test en Móvil

```bash
# Obtener IP local
ipconfig getifaddr en0  # Mac
ip addr show           # Linux
ipconfig               # Windows

# Ejecutar dev server
npm run dev

# Abrir en móvil: http://TU-IP:3000
```

---

## 🎯 Quick Reference

| Tarea | Comando |
|-------|---------|
| Desarrollo | `npm run dev` |
| Build | `npm run build` |
| Tests | `npm test` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Preview | `npm run preview` |
| Deploy | `vercel` o `netlify deploy` |

---

**💡 Tip**: Guarda este archivo en favoritos para acceso rápido a comandos comunes.
