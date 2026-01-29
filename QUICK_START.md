# 🚀 QUICK START - Gemma 15

Guía rápida para tener la app corriendo en 5 minutos.

## Paso 1: Descargar el Proyecto

Ya tienes el proyecto descargado. Si no, descárgalo del repositorio.

## Paso 2: Instalar Dependencias

```bash
cd gemma15
npm install
```

⏱️ Esto puede tomar 2-3 minutos.

## Paso 3: Configurar Supabase

### 3a. Crear Proyecto en Supabase

1. Ve a https://supabase.com
2. Crea una cuenta (si no tienes)
3. Crea un nuevo proyecto
4. Espera a que se inicialice (~2 minutos)

### 3b. Copiar Credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia:
   - `Project URL` → será tu `VITE_SUPABASE_URL`
   - `anon/public` key → será tu `VITE_SUPABASE_ANON_KEY`

### 3c. Configurar .env

```bash
cp .env.example .env
```

Edita `.env` y pega tus credenciales:

```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-super-larga-aqui
```

## Paso 4: Configurar Base de Datos

1. En Supabase, ve a **SQL Editor**
2. Abre el archivo `MIGRATION_GUIDE.md` de este proyecto
3. Copia TODO el SQL (desde `CREATE EXTENSION...` hasta el final)
4. Pégalo en el SQL Editor
5. Click en **RUN**

✅ Deberías ver "Success" en todas las operaciones.

## Paso 5: Crear Buckets de Storage

1. En Supabase, ve a **Storage**
2. Click en **New bucket**
3. Crea dos buckets:
   - Nombre: `avatars`, Público: ✅
   - Nombre: `user_photos`, Público: ✅

## Paso 6: ¡Ejecutar!

```bash
npm run dev
```

🎉 La app debería abrir en http://localhost:3000

## Paso 7: Probar la App

### Crear tu primer usuario

1. En Supabase, ve a **SQL Editor**
2. Ejecuta:
   ```sql
   -- Ver códigos disponibles
   SELECT code, email, segment FROM invites WHERE used = FALSE;
   ```
3. Copia un código (ej: `YOUNG01`)

### Login

1. En la app, ingresa el código: `YOUNG01`
2. Ingresa tu email real
3. Revisa tu email y haz click en el magic link
4. Completa tu perfil
5. ✅ ¡Ya estás dentro!

## Paso 8: Convertirte en Admin (Opcional)

Si quieres acceso al panel de admin:

```sql
-- Primero, busca tu user_id
SELECT user_id, first_name, last_name FROM profiles;

-- Luego, hazlo admin
UPDATE profiles 
SET is_admin = TRUE 
WHERE user_id = 'tu-user-id-aqui';
```

Recarga la app y verás el botón "Admin" en el header.

---

## ✅ Checklist

- [x] Node.js instalado (v18+)
- [x] Proyecto descargado
- [x] `npm install` ejecutado
- [x] Proyecto Supabase creado
- [x] Credenciales en `.env`
- [x] SQL migrations ejecutadas
- [x] Storage buckets creados
- [x] App corriendo en localhost:3000

---

## 🆘 Problemas Comunes

### "Missing environment variables"

→ Verifica que `.env` exista y tenga las variables correctas.

### "Database error" al hacer login

→ Asegúrate de haber ejecutado las migrations SQL.

### "Storage error" al subir avatar

→ Verifica que los buckets `avatars` y `user_photos` existan.

### La página está en blanco

→ Abre DevTools (F12), revisa la consola para ver errores.

---

## 📚 Próximos Pasos

1. **Personaliza el diseño**: Edita `tailwind.config.js` para cambiar colores
2. **Agrega íconos PWA**: Ver `public/PWA_ICONS_SETUP.md`
3. **Deploy**: Ver `DEPLOYMENT.md` para deployar a producción
4. **Completa el admin panel**: Implementar InvitesManager, GuestsList, etc.

---

## 📖 Documentación Completa

- **README.md**: Documentación completa del proyecto
- **MIGRATION_GUIDE.md**: SQL para Supabase
- **DEPLOYMENT.md**: Cómo deployar a producción
- **public/PWA_ICONS_SETUP.md**: Cómo generar íconos PWA

---

¡Listo! En menos de 10 minutos deberías tener la app corriendo. 🎊

Si tienes problemas, revisa los logs en la consola del navegador y en la terminal donde corriste `npm run dev`.
