# 📁 Estructura del Proyecto Gemma 15

## Vista General

```
gemma15/
├── 📚 Documentación y Setup
│   ├── README.md              # 👈 EMPIEZA AQUÍ
│   ├── GIT_SETUP.md           # Cómo subir a Git
│   ├── docs/                  # Documentación completa
│   │   ├── QUICK_START.md
│   │   ├── SUPABASE_SETUP.md
│   │   ├── NETLIFY_DEPLOY.md
│   │   ├── DEPLOYMENT.md
│   │   ├── DEV_COMMANDS.md
│   │   ├── PROJECT_STATUS.md
│   │   └── MIGRATION_GUIDE.md
│   └── database/
│       └── migrations.sql     # Schema de Supabase
│
├── ⚙️ Configuración
│   ├── .env.example           # Template de variables de entorno
│   ├── .gitignore             # Archivos a ignorar en Git
│   ├── package.json           # Dependencias y scripts
│   ├── netlify.toml           # Config de Netlify
│   ├── tsconfig.json          # Config de TypeScript
│   ├── vite.config.ts         # Config de Vite + PWA
│   ├── tailwind.config.js     # Config de Tailwind (colores, fuentes)
│   ├── postcss.config.js      # Config de PostCSS
│   ├── playwright.config.ts   # Config de tests E2E
│   ├── vitest.config.ts       # Config de tests unitarios
│   └── .eslintrc.cjs          # Config de ESLint
│
├── 💻 Código Fuente (src/)
│   ├── main.tsx               # Punto de entrada
│   ├── app/
│   │   ├── App.tsx            # Componente principal
│   │   └── router.tsx         # Rutas y navegación
│   ├── lib/                   # Utilidades core
│   │   ├── env.ts
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   ├── supabaseClient.ts
│   │   └── time.ts
│   ├── types/                 # Definiciones de tipos
│   │   ├── database.ts
│   │   ├── domain.ts
│   │   └── mappers.ts
│   ├── features/              # Módulos por funcionalidad
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── home/
│   │   ├── rsvp/
│   │   └── admin/
│   ├── components/ui/         # Componentes reutilizables
│   └── styles/
│       └── index.css          # Estilos globales
│
├── 🎨 Assets (public/)
│   ├── vite.svg               # Logo placeholder
│   ├── _redirects             # Config de SPA routing para Netlify
│   └── PWA_ICONS_SETUP.md     # Cómo generar íconos PWA
│
└── 🧪 Tests (tests/)
    ├── setup.ts
    ├── countdown.test.ts
    ├── mappers.test.ts
    └── e2e/
        └── auth.spec.ts
```

---

## Archivos Importantes

### 🎯 Para Empezar

1. **README.md** - Punto de entrada principal
2. **docs/QUICK_START.md** - Setup en 5 minutos
3. **database/migrations.sql** - SQL para Supabase
4. **.env.example** - Template de configuración

### 🚀 Para Desarrollo

- **package.json** - Scripts (`npm run dev`, `npm run build`, etc.)
- **src/app/router.tsx** - Definición de rutas
- **src/features/** - Toda la lógica de la app
- **tailwind.config.js** - Personalizar colores y estilos

### 📦 Para Deploy

- **netlify.toml** - Configuración de Netlify
- **docs/NETLIFY_DEPLOY.md** - Guía de deployment
- **GIT_SETUP.md** - Cómo subir a Git

---

## Flujo de Trabajo Típico

### Primera Vez
```bash
1. Leer README.md
2. Seguir docs/QUICK_START.md
3. Configurar Supabase (docs/SUPABASE_SETUP.md)
4. npm run dev
```

### Desarrollo Diario
```bash
1. npm run dev
2. Editar archivos en src/
3. git add . && git commit -m "feat: ..."
4. git push origin main
```

### Deploy
```bash
1. git push origin main
2. Netlify deploya automáticamente
   (o seguir docs/NETLIFY_DEPLOY.md)
```

---

## Carpetas que NO están en Git

Estas carpetas se crean localmente pero NO se suben a Git:

- `node_modules/` - Dependencias (se reinstalan con npm install)
- `dist/` - Build de producción (se regenera con npm run build)
- `.env` - Credenciales locales (cada dev tiene las suyas)

---

## Dónde Está Cada Cosa

### ¿Dónde modifico...?

| Qué | Archivo |
|-----|---------|
| Colores del tema | `tailwind.config.js` |
| Tipografía | `tailwind.config.js` + `index.html` |
| Fecha del evento | `src/lib/time.ts` |
| Rutas de la app | `src/app/router.tsx` |
| Estilos globales | `src/styles/index.css` |
| Componentes UI | `src/components/ui/` |
| Lógica de auth | `src/features/auth/` |
| Lógica de home | `src/features/home/` |
| SQL de la DB | `database/migrations.sql` |

### ¿Dónde agrego...?

| Qué | Dónde |
|-----|-------|
| Nueva página | `src/features/{feature}/pages/` |
| Nuevo componente | `src/features/{feature}/components/` |
| Nueva utilidad | `src/lib/` |
| Nuevo tipo | `src/types/` |
| Nuevo test | `tests/` |
| Nueva dependencia | `npm install {package}` |

---

## Archivos de Configuración Explicados

- **tsconfig.json** - TypeScript en modo strict
- **vite.config.ts** - Vite + PWA + alias @/
- **tailwind.config.js** - Colores, fuentes, animaciones
- **package.json** - Dependencias + scripts
- **netlify.toml** - Build command, redirects, headers
- **.eslintrc.cjs** - Reglas de lint
- **playwright.config.ts** - Tests E2E
- **vitest.config.ts** - Tests unitarios

---

## Resumen Rápido

**Para usar la app:**
1. README.md → QUICK_START.md
2. Configurar Supabase
3. npm run dev

**Para deployar:**
1. Subir a Git (GIT_SETUP.md)
2. Conectar con Netlify
3. Auto-deploy en cada push

**Para modificar:**
1. Código: src/
2. Estilos: tailwind.config.js
3. DB: database/migrations.sql

---

¡Todo organizado y listo para Git! 🎉
