# Guía de Migración de Supabase

Este archivo contiene el SQL necesario para configurar la base de datos en Supabase.

## Instrucciones

1. Ve a tu proyecto en Supabase
2. Navega a **SQL Editor**
3. Crea una nueva query
4. Copia y pega el SQL de abajo
5. Ejecuta la query

---

## Schema SQL

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Invites table
CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('YOUNG', 'ADULT')),
  used BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  is_celiac BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  segment TEXT NOT NULL CHECK (segment IN ('YOUNG', 'ADULT')),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'DECLINED')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table assignments
CREATE TABLE IF NOT EXISTS table_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  table_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_invites_code ON invites(code);
CREATE INDEX idx_invites_email ON invites(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_rsvps_user_id ON rsvps(user_id);
CREATE INDEX idx_table_assignments_user_id ON table_assignments(user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = user_uuid AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Claim invite code
CREATE OR REPLACE FUNCTION claim_invite_code(code TEXT)
RETURNS JSON AS $$
DECLARE
  invite_record RECORD;
  current_user_id UUID;
  user_segment TEXT;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RETURN json_build_object('success', FALSE, 'message', 'Usuario no autenticado');
  END IF;

  -- Get invite
  SELECT * INTO invite_record FROM invites WHERE invites.code = claim_invite_code.code;

  -- Validate invite exists
  IF invite_record IS NULL THEN
    RETURN json_build_object('success', FALSE, 'message', 'Código inválido');
  END IF;

  -- Check if already used
  IF invite_record.used = TRUE THEN
    RETURN json_build_object('success', FALSE, 'message', 'Código ya utilizado');
  END IF;

  -- Mark as used
  UPDATE invites 
  SET used = TRUE, claimed_by = current_user_id, updated_at = NOW()
  WHERE invites.code = claim_invite_code.code;

  -- Create or update profile
  INSERT INTO profiles (user_id, segment, created_at, updated_at)
  VALUES (current_user_id, invite_record.segment, NOW(), NOW())
  ON CONFLICT (user_id) DO UPDATE
  SET segment = invite_record.segment, updated_at = NOW();

  RETURN json_build_object('success', TRUE, 'message', 'Código reclamado exitosamente');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_assignments ENABLE ROW LEVEL SECURITY;

-- Invites policies
CREATE POLICY "Admins can view all invites"
  ON invites FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert invites"
  ON invites FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update invites"
  ON invites FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()));

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RSVPs policies
CREATE POLICY "Users can view own RSVP"
  ON rsvps FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can insert own RSVP"
  ON rsvps FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own RSVP"
  ON rsvps FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Table assignments policies
CREATE POLICY "Users can view own table"
  ON table_assignments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Admins can insert table assignments"
  ON table_assignments FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update table assignments"
  ON table_assignments FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()));

-- ============================================
-- STORAGE
-- ============================================

-- Create storage buckets (execute in Storage section of Supabase)
-- Bucket: avatars (public)
-- Bucket: user_photos (public)

-- Storage policies for avatars
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Create test invite codes
INSERT INTO invites (code, email, segment) VALUES
  ('YOUNG01', 'joven1@example.com', 'YOUNG'),
  ('YOUNG02', 'joven2@example.com', 'YOUNG'),
  ('ADULT01', 'adulto1@example.com', 'ADULT'),
  ('ADMIN01', 'admin@example.com', 'ADULT');

-- Note: To make a user admin, update their profile manually:
-- UPDATE profiles SET is_admin = TRUE WHERE user_id = '<uuid>';
```

---

## Configuración de Storage

1. Ve a **Storage** en Supabase
2. Crea dos buckets:
   - `avatars` (público)
   - `user_photos` (público)
3. Las políticas de storage ya están en el SQL de arriba

## Crear Usuario Admin

Después de que un usuario se registre con el código ADMIN01:

```sql
UPDATE profiles 
SET is_admin = TRUE 
WHERE user_id = (
  SELECT user_id FROM profiles 
  WHERE user_id IN (
    SELECT claimed_by FROM invites WHERE code = 'ADMIN01'
  )
);
```

## Verificación

Ejecuta estos queries para verificar que todo está OK:

```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver códigos de invitación
SELECT code, email, segment, used FROM invites;

-- Ver funciones
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public';
```

---

¡Listo! La base de datos está configurada.
