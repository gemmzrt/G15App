# 🗄️ Configuración de Supabase - Paso a Paso

Sigue estos pasos **en orden** para configurar la base de datos.

---

## Paso 1: Ejecutar SQL Migration

1. Ve a tu proyecto en Supabase
2. Click en **SQL Editor** en el menú lateral
3. Click en **New Query**
4. Abre el archivo `migrations.sql` de este proyecto
5. **Copia TODO el contenido** del archivo
6. **Pégalo** en el SQL Editor de Supabase
7. Click en **Run** (botón abajo a la derecha)

✅ Deberías ver el mensaje: `Migration completed successfully! ✅`

Si ves algún error, lee la sección de troubleshooting al final.

---

## Paso 2: Crear Storage Buckets

### Bucket: avatars

1. Ve a **Storage** en el menú lateral
2. Click en **New bucket**
3. Configura:
   - **Name**: `avatars`
   - **Public bucket**: ✅ (marcado)
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
4. Click **Create bucket**

### Bucket: user_photos

1. Click en **New bucket** nuevamente
2. Configura:
   - **Name**: `user_photos`
   - **Public bucket**: ✅ (marcado)
   - **File size limit**: 10MB
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
3. Click **Create bucket**

---

## Paso 3: Configurar Storage Policies

### Políticas para bucket "avatars"

1. Click en el bucket **avatars**
2. Ve a **Policies**
3. Click **New policy**

#### Política 1: Upload de avatares

```
Policy name: Users can upload own avatar
Allowed operation: INSERT
Target roles: authenticated

Policy definition (USING):
(bucket_id = 'avatars' AND (storage.foldername(name))[1] = (auth.uid())::text)
```

#### Política 2: Update de avatares

```
Policy name: Users can update own avatar
Allowed operation: UPDATE
Target roles: authenticated

Policy definition (USING):
(bucket_id = 'avatars' AND (storage.foldername(name))[1] = (auth.uid())::text)
```

#### Política 3: Ver avatares

```
Policy name: Anyone can view avatars
Allowed operation: SELECT
Target roles: public

Policy definition (USING):
bucket_id = 'avatars'
```

### Nota sobre user_photos

Por ahora no necesita políticas (pendiente para Iteración 2).

---

## Paso 4: Configurar Authentication

1. Ve a **Authentication** → **URL Configuration**
2. Configura:
   - **Site URL**: `http://localhost:3000` (desarrollo)
   - **Redirect URLs**: 
     - `http://localhost:3000/**`
     - Tu dominio de producción cuando lo tengas

3. Ve a **Authentication** → **Email Templates**
4. Revisa el template de **Magic Link** (opcional: personalizarlo)

---

## Paso 5: Verificar que Todo Funciona

Ejecuta estas queries en SQL Editor para verificar:

```sql
-- 1. Ver tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Deberías ver: invites, profiles, rsvps, table_assignments

-- 2. Ver funciones creadas
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public';

-- Deberías ver: is_admin, claim_invite_code

-- 3. Ver códigos de invitación de prueba
SELECT code, email, segment, used FROM invites;

-- Deberías ver: YOUNG01, YOUNG02, ADULT01, ADMIN01

-- 4. Ver buckets de storage
SELECT name FROM storage.buckets;

-- Deberías ver: avatars, user_photos
```

✅ Si todas estas queries funcionan, ¡estás listo!

---

## Paso 6: Obtener Credenciales

1. Ve a **Settings** → **API**
2. Copia estos valores:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Pégalos en tu archivo `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Paso 7 (Opcional): Crear Usuario Admin

Después de registrarte en la app con el código `ADMIN01`:

```sql
-- Buscar tu user_id
SELECT user_id, first_name, last_name, is_admin 
FROM profiles;

-- Convertirte en admin (reemplaza con tu user_id)
UPDATE profiles 
SET is_admin = TRUE 
WHERE user_id = 'tu-uuid-aqui';
```

---

## 🎯 Checklist Final

- [ ] SQL migration ejecutado sin errores
- [ ] Bucket `avatars` creado (público)
- [ ] Bucket `user_photos` creado (público)
- [ ] Políticas de storage configuradas
- [ ] Authentication URLs configuradas
- [ ] Credenciales copiadas a `.env`
- [ ] Queries de verificación exitosas

---

## 🐛 Troubleshooting

### Error: "relation already exists"

**Causa**: Las tablas ya existen.

**Solución**: Ignora el error o ejecuta:
```sql
DROP TABLE IF EXISTS invites, profiles, rsvps, table_assignments CASCADE;
-- Luego vuelve a ejecutar la migration
```

### Error: "function already exists"

**Causa**: Las funciones ya existen.

**Solución**: El script ya incluye `DROP FUNCTION IF EXISTS`, pero si falla:
```sql
DROP FUNCTION IF EXISTS is_admin(uuid);
DROP FUNCTION IF EXISTS claim_invite_code(text);
-- Luego vuelve a ejecutar la migration
```

### Error: "permission denied for schema storage"

**Causa**: Problemas con los buckets.

**Solución**: 
1. Verifica que los buckets existan
2. Verifica que sean públicos
3. Recrea las políticas manualmente

### Error al hacer login en la app

**Causa**: RLS policies no configuradas correctamente.

**Solución**: Ejecuta en SQL Editor:
```sql
-- Verificar que RLS esté habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Si rowsecurity es 'false' en alguna tabla:
ALTER TABLE nombre_tabla ENABLE ROW LEVEL SECURITY;
```

---

## 📊 Verificar RLS Policies

```sql
-- Ver todas las políticas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Deberías ver políticas para:
- `invites` (3 políticas)
- `profiles` (3 políticas)
- `rsvps` (3 políticas)
- `table_assignments` (3 políticas)

---

## 🎉 ¡Todo Listo!

Si llegaste hasta acá sin errores, tu Supabase está 100% configurado.

**Siguiente paso**: Vuelve al `QUICK_START.md` y continúa con el setup de la app.
