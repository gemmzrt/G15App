# Gemma 15 - Aplicación PWA para Evento de 15 Años 🎉

**Iteración 1 (MVP)** - Proyecto funcional, deployable y con arquitectura production-ready.

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

## 📁 Estructura del Proyecto

```
gemma15/
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
│   │   │   ├── api.ts
│   │   │   └── pages/InviteGate.tsx
│   │   ├── profile/           # User profile
│   │   │   ├── api.ts
│   │   │   └── pages/ProfileSetup.tsx
│   │   ├── home/              # Home/Dashboard
│   │   │   ├── pages/Home.tsx
│   │   │   └── components/
│   │   │       ├── CountdownCard.tsx
│   │   │       └── TableCard.tsx
│   │   ├── rsvp/              # RSVP functionality
│   │   │   └── components/RSVPCard.tsx
│   │   └── admin/             # Admin panel
│   │       └── pages/AdminDashboard.tsx
│   ├── components/ui/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── styles/
│   │   └── index.css          # Global styles + Tailwind
│   └── main.tsx               # App entry point
├── public/                     # Static assets (PWA icons)
├── tests/                      # Tests (Vitest + Playwright)
└── [config files]              # TS, Vite, Tailwind, ESLint, etc.
```

## 🛠️ Setup Instructions

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y completa tus credenciales de Supabase:

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. Configurar Supabase

**IMPORTANTE**: Este proyecto asume que ya tienes una base de datos Supabase configurada con el schema completo.

Debes ejecutar el archivo `migrations.sql` que debe incluir:

#### Tablas requeridas:
- `invites` (id, code, email, segment, used, claimed_by)
- `profiles` (id, user_id, first_name, last_name, is_celiac, avatar_url, segment, is_admin)
- `rsvps` (id, user_id, status, notes)
- `table_assignments` (id, user_id, table_number)

#### Funciones RPC requeridas:
- `is_admin(user_uuid)`: Retorna si un usuario es admin
- `claim_invite_code(code)`: Valida y reclama un código de invitación

#### Storage Buckets:
- `avatars`: Para fotos de perfil
- `user_photos`: Para fotos subidas por usuarios

#### Row Level Security (RLS):
Configura policies apropiadas para cada tabla según el rol (ADMIN vs INVITED).

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## 🎨 Diseño y Estética

La aplicación usa un diseño festivo con:
- **Colores**: Rosa (#ec4899), Púrpura (#c026d3), Violeta (#a855f7)
- **Fondo**: Gradiente animado oscuro (slate/purple)
- **Tipografía**: 
  - Display: "Playfair Display" (serif elegante)
  - Body: "Outfit" (sans-serif moderna)
- **Efectos**: Glass morphism, animaciones suaves, micro-interacciones

## ⏰ Cuenta Regresiva

Configuración del evento (hardcoded en Iteración 1):

- **Fecha**: 14 de Marzo 2026
- **Timezone**: America/Argentina/Buenos_Aires
- **Ventana global**: 14:00 del 14/03 hasta 01:00 del 15/03
- **Segmentos**:
  - YOUNG: Ingreso a las 14:00
  - ADULT: Ingreso a las 19:00

La cuenta regresiva se actualiza cada 30 segundos y muestra:
- **Antes del evento**: Días, horas, minutos restantes
- **Durante el evento**: "EN CURSO" + tiempo hasta el fin
- **Después del evento**: "Finalizado"

## 🔐 Flujo de Autenticación

1. Usuario ingresa **código de invitación** (ej: "ABC123")
2. Usuario ingresa su **email**
3. Sistema envía **Magic Link** al email
4. Usuario hace click en el link → sesión autenticada
5. Sistema ejecuta RPC `claim_invite_code()` para validar y reclamar
6. Si el perfil está incompleto → redirige a `/profile/setup`
7. Si el perfil está completo → redirige a Home `/`

## 📱 PWA (Progressive Web App)

El Service Worker está configurado con:

✅ **Network-only** para llamadas a Supabase (no cachear API)  
✅ **Cache-first** para fuentes de Google y assets estáticos  
✅ Manifest con iconos para instalación en móvil  

Para **deshabilitar** el PWA temporalmente:

```env
VITE_DISABLE_PWA=true
```

## 🧪 Testing y QA

### Lint
```bash
npm run lint
```

### Typecheck
```bash
npm run typecheck
```

### Unit Tests (Vitest)
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

**NOTA**: Los tests básicos están configurados pero necesitan ser implementados completamente. Ver `tests/` para estructura inicial.

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos estarán en `dist/`. Puedes previsualizar con:

```bash
npm run preview
```

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

## 🎯 Features de Iteración 1 (MVP)

### ✅ Implementado

- [x] Auth con Código + Email + Magic Link
- [x] Perfil obligatorio (first_name, last_name, is_celiac, avatar)
- [x] Home con Bento Grid
- [x] Tarjeta de bienvenida
- [x] Cuenta regresiva en tiempo real (luxon + timezone)
- [x] RSVP (Confirmar/Rechazar asistencia)
- [x] Tu Mesa (con Realtime subscriptions)
- [x] Tarjeta de ubicación (placeholder)
- [x] Admin Dashboard (estructura base)
- [x] PWA instalable con Service Worker
- [x] Diseño festivo con animaciones
- [x] Multi-dispositivo (sync via Supabase)
- [x] Manejo de errores con AppError + Toasts
- [x] Logging estructurado
- [x] Null-safety defensivo
- [x] Mappers explícitos DB → Domain

### 🚧 Pendiente para próximas iteraciones

- [ ] Admin: InvitesManager (CRUD de invites)
- [ ] Admin: GuestsList (lista filtrable)
- [ ] Admin: TableAssignments (asignar mesas)
- [ ] Tests E2E completos
- [ ] Features sociales (chat, fotos, sugerencias de canciones)

## 📄 Archivos de Configuración

- **TypeScript**: `tsconfig.json` (strict mode)
- **Vite**: `vite.config.ts` (PWA + alias)
- **Tailwind**: `tailwind.config.js` (tema festivo)
- **ESLint**: `.eslintrc.cjs` (reglas estrictas)
- **PostCSS**: `postcss.config.js`

## 🐛 Debug y Troubleshooting

### Error: "Missing environment variables"

Asegúrate de tener `.env` con las variables correctas. Ver `.env.example`.

### Error: "Invite code invalid"

Verifica que:
1. El código existe en la tabla `invites`
2. `used = false`
3. El RPC `claim_invite_code()` está funcionando

### PWA no se instala

Verifica que:
1. Estás usando HTTPS (o localhost)
2. Los iconos existen en `/public`
3. El manifest es válido

### Countdown no actualiza

El countdown se actualiza cada 30 segundos. Si no ves cambios, verifica que la fecha del evento esté configurada correctamente en `lib/time.ts`.

## 🎨 Personalización

### Cambiar colores del tema

Edita `tailwind.config.js`:

```js
colors: {
  'gemma-pink': '#tu-color-aqui',
  'gemma-purple': '#tu-color-aqui',
  // ...
}
```

### Cambiar tipografía

Edita `tailwind.config.js` y actualiza los imports en `index.html`:

```js
fontFamily: {
  'display': ['"Tu Font Display"', 'serif'],
  'body': ['"Tu Font Body"', 'sans-serif'],
}
```

## 📞 Soporte

Para issues o preguntas:
1. Revisa la documentación
2. Revisa los logs en consola (modo dev)
3. Usa la ruta `/debug` para ver diagnósticos

## 📝 Licencia

Este proyecto es privado y fue creado para el evento de Gemma 15.

---

**¡Creado con 💜 y mucho entusiasmo!**
