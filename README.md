# Gemma 15 - Aplicación PWA para Evento de 15 Años 🎉

**Iteración 1 (MVP)** - Proyecto funcional, deployable y con arquitectura production-ready.

---

## 🚀 Quick Start (5 minutos)

```bash
# 1. Clonar e instalar
git clone <tu-repo>
cd gemma15
npm install

# 2. Configurar environment
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# 3. Ejecutar
npm run dev
```

📖 **Guía completa**: [`docs/QUICK_START.md`](docs/QUICK_START.md)

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[QUICK_START.md](docs/QUICK_START.md)** | Setup rápido (5 min) |
| **[SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)** | Configurar base de datos paso a paso |
| **[NETLIFY_DEPLOY.md](docs/NETLIFY_DEPLOY.md)** | Deploy a Netlify |
| **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** | Deploy a Vercel/GitHub Pages/Docker |
| **[DEV_COMMANDS.md](docs/DEV_COMMANDS.md)** | Comandos útiles para desarrollo |
| **[PROJECT_STATUS.md](docs/PROJECT_STATUS.md)** | Estado del proyecto y roadmap |
| **[MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md)** | Referencia completa de SQL |

---

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS + diseño festivo personalizado
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form + Zod
- **Backend**: Supabase (Auth + Postgres + Storage + Realtime)
- **PWA**: Vite PWA Plugin + Workbox
- **Timezone**: Luxon

---

## 📁 Estructura del Proyecto

```
gemma15/
├── docs/                       # 📚 Documentación
│   ├── QUICK_START.md         # Setup rápido
│   ├── SUPABASE_SETUP.md      # Config de base de datos
│   ├── NETLIFY_DEPLOY.md      # Deploy a Netlify
│   ├── DEPLOYMENT.md          # Deploy a otras plataformas
│   ├── DEV_COMMANDS.md        # Comandos útiles
│   ├── PROJECT_STATUS.md      # Estado y roadmap
│   └── MIGRATION_GUIDE.md     # Referencia SQL
├── database/                   # 🗄️ Database
│   └── migrations.sql         # Schema completo de Supabase
├── src/
│   ├── app/                    # App core
│   │   ├── App.tsx            # Main app component
│   │   └── router.tsx         # Routing logic
│   ├── lib/                    # Core utilities
│   │   ├── env.ts             # Environment validation
│   │   ├── errors.ts          # Error handling (AppError)
│   │   ├── logger.ts          # Structured logging
│   │   ├── supabaseClient.ts  # Supabase client
│   │   └── time.ts            # Luxon timezone + countdown
│   ├── types/                  # Type definitions
│   │   ├── database.ts        # Supabase DB types
│   │   ├── domain.ts          # Domain models
│   │   └── mappers.ts         # DB → Domain mappers
│   ├── features/               # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── profile/           # User profile
│   │   ├── home/              # Home/Dashboard
│   │   ├── rsvp/              # RSVP functionality
│   │   └── admin/             # Admin panel
│   ├── components/ui/          # Reusable UI components
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── tests/                      # Tests (Vitest + Playwright)
└── [config files]              # TS, Vite, Tailwind, ESLint, etc.
```

---

## 🎯 Features

### ✅ Implementado (Iteración 1)

- **Autenticación**: Código → Email → Magic Link
- **Perfil**: Setup obligatorio con avatar
- **Home**: Bento Grid con countdown en tiempo real
- **RSVP**: Confirmar/Rechazar asistencia
- **Mesas**: Asignación con Realtime sync
- **Admin**: Dashboard básico
- **PWA**: Instalable en móvil/desktop
- **Diseño**: Tema festivo rosa/púrpura

📊 **Estado completo**: [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)

### 🚧 Próximas Iteraciones

- Admin panel completo (gestión de invites, guests, mesas)
- Features sociales (chat, galería, sugerencias)
- Notificaciones push
- Y más...

---

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Ejecutar ESLint |
| `npm run typecheck` | Verificar tipos TypeScript |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:e2e` | Ejecutar tests E2E |

📖 **Más comandos**: [`docs/DEV_COMMANDS.md`](docs/DEV_COMMANDS.md)

---

## 🎨 Diseño

- **Colores**: Rosa (#ec4899), Púrpura (#c026d3), Violeta (#a855f7)
- **Tipografía**: Playfair Display + Outfit
- **Efectos**: Glass morphism, gradientes animados
- **Responsive**: Mobile-first

📝 Para personalizar colores y fuentes, edita `tailwind.config.js`

---

## ⏰ Cuenta Regresiva

- **Fecha**: 14 de Marzo 2026
- **Timezone**: America/Argentina/Buenos_Aires
- **Actualización**: Cada 30 segundos
- **Estados**: Antes / En curso / Finalizado

---

## 🔐 Autenticación

1. Ingresa código de invitación
2. Ingresa email → recibe magic link
3. Click en el link → sesión creada
4. Completa perfil si es necesario
5. ¡Listo! Acceso a la app

---

## 📱 PWA

- ✅ Instalable en móvil y desktop
- ✅ Network-only para Supabase (no cachea API)
- ✅ Cache para assets estáticos

Ver `public/PWA_ICONS_SETUP.md` para generar íconos personalizados.

---

## 🚢 Deployment

### Netlify (Recomendado)

📖 **Guía completa**: [`docs/NETLIFY_DEPLOY.md`](docs/NETLIFY_DEPLOY.md)

```bash
# Push a Git
git push origin main

# Netlify auto-deploya desde Git
# Configura env vars en Netlify dashboard
```

### Otras Plataformas

📖 **Ver**: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) para Vercel, GitHub Pages, Docker

---

## 🧪 Testing

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test            # Unit tests (Vitest)
npm run test:e2e    # E2E tests (Playwright)
```

---

## 🐛 Troubleshooting

**Error: "Missing environment variables"**  
→ Copia `.env.example` a `.env` y completa las credenciales

**Error: "Invite code invalid"**  
→ Verifica que el código exista en la tabla `invites` de Supabase

**PWA no se instala**  
→ Necesitas HTTPS (Netlify/Vercel lo proveen automáticamente)

📖 **Más troubleshooting**: Ver documentos en `/docs`

---

## 📞 Soporte

- 📖 Documentación completa en `/docs`
- 🐛 Issues en GitHub
- 💬 Contacto: [tu-email]

---

## 📝 Licencia

Este proyecto es privado y fue creado para el evento de Gemma 15.

---

**¡Creado con 💜 y mucho entusiasmo!**
