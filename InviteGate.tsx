import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button, Input, useToast } from '@/components/ui';
import { sendMagicLink, claimInviteCode } from '../api';
import { logger } from '@/lib/logger';

const inviteSchema = z.object({
  code: z.string().min(6, 'El código debe tener al menos 6 caracteres'),
});

const emailSchema = z.object({
  email: z.string().email('Email inválido'),
});

type InviteForm = z.infer<typeof inviteSchema>;
type EmailForm = z.infer<typeof emailSchema>;

export function InviteGate() {
  const [step, setStep] = useState<'code' | 'email' | 'sent'>('code');
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const inviteForm = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
  });

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const handleInviteSubmit = async (data: InviteForm) => {
    try {
      setInviteCode(data.code.toUpperCase());
      setStep('email');
      logger.info('invite_code_entered', { code: data.code });
    } catch (error) {
      showToast('Error al validar el código', 'error');
    }
  };

  const handleEmailSubmit = async (data: EmailForm) => {
    try {
      setEmail(data.email);
      await sendMagicLink(data.email);
      setStep('sent');
      showToast('¡Enlace enviado! Revisa tu email', 'success');
    } catch (error) {
      showToast('Error al enviar el enlace', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-6xl font-display font-bold text-gradient mb-3"
          >
            Gemma 15
          </motion.h1>
          <p className="text-slate-300 font-body text-lg">
            Celebración inolvidable ✨
          </p>
        </div>

        {/* Code Step */}
        {step === 'code' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Código de Invitación
            </h2>
            <p className="text-slate-400 font-body mb-6">
              Ingresa el código que recibiste en tu invitación
            </p>

            <form onSubmit={inviteForm.handleSubmit(handleInviteSubmit)} className="space-y-4">
              <Input
                {...inviteForm.register('code')}
                label="Código"
                placeholder="ABC123"
                error={inviteForm.formState.errors.code?.message}
                className="uppercase"
                autoFocus
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={inviteForm.formState.isSubmitting}
              >
                Continuar
              </Button>
            </form>
          </motion.div>
        )}

        {/* Email Step */}
        {step === 'email' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-8 shadow-2xl"
          >
            <button
              onClick={() => setStep('code')}
              className="text-gemma-pink hover:text-gemma-purple mb-4 flex items-center gap-2 font-body"
            >
              ← Volver
            </button>

            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Tu Email
            </h2>
            <p className="text-slate-400 font-body mb-6">
              Te enviaremos un enlace mágico para ingresar
            </p>

            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <Input
                {...emailForm.register('email')}
                type="email"
                label="Email"
                placeholder="tu@email.com"
                error={emailForm.formState.errors.email?.message}
                autoFocus
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={emailForm.formState.isSubmitting}
              >
                Enviar Enlace Mágico
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gemma-purple/10 border border-gemma-purple/30 rounded-xl">
              <p className="text-sm text-slate-300 font-body">
                💡 <strong>Código:</strong> {inviteCode}
              </p>
            </div>
          </motion.div>
        )}

        {/* Sent Step */}
        {step === 'sent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 shadow-2xl text-center"
          >
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              ¡Revisa tu Email!
            </h2>
            <p className="text-slate-400 font-body mb-6">
              Te enviamos un enlace mágico a <strong className="text-gemma-pink">{email}</strong>
            </p>

            <div className="space-y-3 text-sm text-slate-300 font-body text-left">
              <p>✓ Revisa tu bandeja de entrada</p>
              <p>✓ Si no lo ves, revisa spam</p>
              <p>✓ El enlace expira en 1 hora</p>
            </div>

            <Button
              variant="ghost"
              onClick={() => setStep('email')}
              className="w-full mt-6"
            >
              Cambiar email
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
