import { logger } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    
    // Log the error
    logger.error(`AppError: ${code}`, {
      message,
      statusCode,
      context,
    });
  }

  static unauthorized(message = 'No autorizado'): AppError {
    return new AppError(message, 'UNAUTHORIZED', 401);
  }

  static notFound(resource: string): AppError {
    return new AppError(`${resource} no encontrado`, 'NOT_FOUND', 404);
  }

  static validation(message: string, context?: Record<string, unknown>): AppError {
    return new AppError(message, 'VALIDATION_ERROR', 400, context);
  }

  static database(message: string, context?: Record<string, unknown>): AppError {
    return new AppError(message, 'DATABASE_ERROR', 500, context);
  }

  static inviteInvalid(message = 'Código de invitación inválido o ya usado'): AppError {
    return new AppError(message, 'INVITE_INVALID', 400);
  }

  static profileIncomplete(message = 'Por favor completa tu perfil para continuar'): AppError {
    return new AppError(message, 'PROFILE_INCOMPLETE', 403);
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR', 500);
  }

  return new AppError('Error desconocido', 'UNKNOWN_ERROR', 500);
}
