import { supabase } from '@/lib/supabaseClient';
import { AppError, handleError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export interface AuthUser {
  id: string;
  email: string;
}

/**
 * Send magic link to email
 */
export async function sendMagicLink(email: string): Promise<void> {
  try {
    logger.info('auth_send_magic_link', { email });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      throw new AppError(
        'Error al enviar el enlace mágico',
        'AUTH_MAGIC_LINK_ERROR',
        500,
        { originalError: error.message }
      );
    }

    logger.info('auth_magic_link_sent', { email });
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Claim invite code after successful authentication
 */
export async function claimInviteCode(code: string): Promise<void> {
  try {
    logger.info('auth_claim_invite', { code });

    const { data, error } = await supabase.rpc('claim_invite_code', { code });

    if (error) {
      logger.error('auth_claim_invite_failed', { code, error: error.message });
      throw AppError.database('Error al reclamar el código', { error: error.message });
    }

    if (!data?.success) {
      logger.warn('auth_claim_invite_invalid', { code, message: data?.message });
      throw AppError.inviteInvalid(data?.message || 'Código inválido');
    }

    logger.info('auth_claim_invite_success', { code });
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<AuthUser | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      logger.error('auth_get_session_error', { error: error.message });
      return null;
    }

    if (!session?.user) {
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email ?? '',
    };
  } catch (error) {
    logger.error('auth_get_session_exception', { error });
    return null;
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  try {
    logger.info('auth_sign_out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new AppError('Error al cerrar sesión', 'AUTH_SIGNOUT_ERROR', 500);
    }
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email ?? '',
      });
    } else {
      callback(null);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}
