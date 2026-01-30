import { logger } from './logger';

export interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  disablePwa: boolean;
}

class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvError';
  }
}

function validateEnv(): EnvConfig {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const disablePwa = import.meta.env.VITE_DISABLE_PWA === 'true';

  const missing: string[] = [];

  if (!supabaseUrl) {
    missing.push('VITE_SUPABASE_URL');
  }
  if (!supabaseAnonKey) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`;
    logger.error('env_validation_failed', { missing });
    throw new EnvError(message);
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch {
    const message = 'VITE_SUPABASE_URL is not a valid URL';
    logger.error('invalid_supabase_url', { url: supabaseUrl });
    throw new EnvError(message);
  }

  logger.info('env_validated', { supabaseUrl, disablePwa });

  return {
    supabaseUrl,
    supabaseAnonKey,
    disablePwa,
  };
}

export const env = validateEnv();

// Component for displaying env errors in UI
export function EnvErrorScreen({ error }: { error: EnvError }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gemma-darker via-slate-900 to-gemma-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            Error de Configuración
          </h1>
          <p className="text-red-400 font-body">
            {error.message}
          </p>
        </div>
        
        <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-300 font-body mb-3">
            Para resolver este error:
          </p>
          <ol className="text-sm text-slate-400 font-body space-y-2 list-decimal list-inside">
            <li>Copia el archivo <code className="text-gemma-pink">.env.example</code> a <code className="text-gemma-pink">.env</code></li>
            <li>Completa las variables de Supabase</li>
            <li>Reinicia el servidor de desarrollo</li>
          </ol>
        </div>

        <div className="text-xs text-slate-500 font-body text-center">
          Consulta el README.md para más información
        </div>
      </div>
    </div>
  );
}
