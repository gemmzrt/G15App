import { supabase } from '@/lib/supabaseClient';
import { AppError, handleError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import type { Profile } from '@/types/domain';
import { mapProfileFromDB } from '@/types/mappers';

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw AppError.database('Error al cargar perfil', { error: error.message });
    }

    return data ? mapProfileFromDB(data) : null;
  } catch (error) {
    throw handleError(error);
  }
}

export async function updateProfile(
  userId: string,
  data: { firstName: string; lastName: string; isCeliac: boolean; avatarUrl?: string }
): Promise<Profile> {
  try {
    logger.info('profile_update', { userId });

    const { data: updated, error } = await supabase
      .from('profiles')
      .update({
        first_name: data.firstName,
        last_name: data.lastName,
        is_celiac: data.isCeliac,
        avatar_url: data.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw AppError.database('Error al actualizar perfil', { error: error.message });
    }

    return mapProfileFromDB(updated);
  } catch (error) {
    throw handleError(error);
  }
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      throw AppError.database('Error al subir avatar', { error: uploadError.message });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    throw handleError(error);
  }
}
