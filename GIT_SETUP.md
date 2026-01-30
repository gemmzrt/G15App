# 🔧 Setup de Git - Instrucciones

Esta guía te ayuda a subir el proyecto a Git correctamente.

---

## Opción 1: Nuevo Repositorio

### 1. Crear repositorio en GitHub/GitLab

1. Ve a GitHub.com → New repository
2. Nombre: `gemma15` (o el que prefieras)
3. **NO** inicialices con README, .gitignore o licencia
4. Copia la URL del repo (ej: `https://github.com/tu-usuario/gemma15.git`)

### 2. Inicializar Git localmente

```bash
cd gemma15

# Inicializar repo
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - Gemma 15 MVP"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/gemma15.git

# Push
git branch -M main
git push -u origin main
```

✅ ¡Listo! Tu código está en GitHub.

---

## Opción 2: Repositorio Existente

Si ya tienes un repositorio:

```bash
cd gemma15

# Si no está inicializado
git init

# Agregar remote
git remote add origin https://github.com/tu-usuario/gemma15.git

# Agregar archivos
git add .
git commit -m "Update: Proyecto reorganizado"

# Push
git push -u origin main
```

---

## Estructura de Carpetas en Git

```
gemma15/
├── .env.example           ✅ Incluido
├── .gitignore             ✅ Incluido
├── README.md              ✅ Incluido
├── package.json           ✅ Incluido
├── netlify.toml           ✅ Incluido
├── docs/                  ✅ Toda la documentación
├── database/              ✅ SQL migrations
├── src/                   ✅ Todo el código fuente
├── public/                ✅ Assets estáticos
├── tests/                 ✅ Tests
└── [config files]         ✅ TS, Vite, Tailwind, etc.
```

**NO incluido** (gracias a `.gitignore`):
- `node_modules/`
- `dist/`
- `.env` (credenciales locales)
- Archivos de build

---

## Verificar antes de Push

```bash
# Ver qué archivos se van a subir
git status

# Ver el contenido que se va a commitear
git diff --cached

# Si algo no debería estar, quitarlo:
git reset HEAD archivo-a-quitar

# Agregar al .gitignore si es necesario
echo "archivo-a-ignorar" >> .gitignore
```

---

## Comandos Git Útiles

```bash
# Ver estado
git status

# Ver historial
git log --oneline

# Crear branch para nueva feature
git checkout -b feature/nombre-feature

# Volver a main
git checkout main

# Ver branches
git branch

# Push de un branch
git push origin nombre-branch

# Pull cambios
git pull origin main
```

---

## .gitignore

El proyecto ya incluye `.gitignore` con:

```gitignore
# Dependencies
node_modules

# Build
dist
dist-ssr

# Environment
.env
.env.local

# Logs
*.log

# Editor
.vscode/*
.idea

# Testing
coverage
test-results/
```

---

## Colaboración

### Agregar colaboradores

1. GitHub → Settings → Manage access
2. Invite collaborators

### Workflow recomendado

```bash
# 1. Crear branch para feature
git checkout -b feature/admin-panel

# 2. Hacer cambios y commits
git add .
git commit -m "feat: agregar admin panel"

# 3. Push del branch
git push origin feature/admin-panel

# 4. Crear Pull Request en GitHub

# 5. Después de merge, actualizar main
git checkout main
git pull origin main
```

---

## Conectar con Netlify

Una vez que el código esté en GitHub:

1. Ve a Netlify.com
2. New site from Git
3. Selecciona tu repositorio
4. Netlify detectará `netlify.toml` automáticamente
5. Configura las environment variables
6. ¡Deploy!

Cada push a `main` deployará automáticamente.

---

## Proteger Branch Main

En GitHub:

1. Settings → Branches
2. Add rule para `main`
3. Configurar:
   - ✅ Require pull request reviews
   - ✅ Require status checks
   - ✅ Include administrators

Esto previene pushes directos a main sin PR.

---

## Mensajes de Commit

Usa mensajes descriptivos siguiendo conventional commits:

```bash
# Features
git commit -m "feat: agregar cuenta regresiva"

# Fixes
git commit -m "fix: corregir error en RSVP"

# Docs
git commit -m "docs: actualizar README"

# Style
git commit -m "style: mejorar diseño de tarjetas"

# Refactor
git commit -m "refactor: simplificar auth logic"

# Tests
git commit -m "test: agregar tests para countdown"

# Chore
git commit -m "chore: actualizar dependencias"
```

---

## Troubleshooting Git

### Error: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/tu-usuario/gemma15.git
```

### Error: "failed to push some refs"

```bash
# Pull primero
git pull origin main --rebase

# Luego push
git push origin main
```

### Olvidé agregar archivo a .gitignore

```bash
# Remover del tracking sin borrar el archivo
git rm --cached archivo-sensible

# Agregar a .gitignore
echo "archivo-sensible" >> .gitignore

# Commit
git add .gitignore
git commit -m "chore: actualizar .gitignore"
```

---

## 🎯 Checklist Pre-Push

- [ ] `.env` NO está en el repo (debe estar en `.gitignore`)
- [ ] `node_modules/` NO está en el repo
- [ ] Todos los archivos necesarios están incluidos
- [ ] `README.md` está actualizado
- [ ] Commits tienen mensajes descriptivos
- [ ] Build funciona: `npm run build`
- [ ] Tests pasan: `npm test`

---

¡Todo listo para Git! 🚀
