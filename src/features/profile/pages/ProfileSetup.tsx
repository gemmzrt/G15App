import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button, Input, useToast } from '@/components/ui';
import { getSession } from '@/features/auth/api';
import { updateProfile, uploadAvatar } from '../api';
import { useState } from 'react';

const profileSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  isCeliac: z.boolean(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ProfileSetup() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: user } = useQuery({ queryKey: ['auth'], queryFn: getSession });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      isCeliac: false,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      if (!user) throw new Error('No user');

      let avatarUrl: string | undefined;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(user.id, avatarFile);
      }

      return updateProfile(user.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        isCeliac: data.isCeliac,
        avatarUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast('Perfil completado', 'success');
    },
    onError: () => {
      showToast('Error al guardar perfil', 'error');
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Completa tu Perfil
        </h1>
        <p className="text-slate-400 font-body mb-6">
          Necesitamos algunos datos para continuar
        </p>

        <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
          {/* Avatar Upload */}
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-gemma-pink to-gemma-purple flex items-center justify-center">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">👤</span>
              )}
            </div>
            <label className="cursor-pointer text-gemma-pink hover:text-gemma-purple font-body text-sm">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              Subir foto (opcional)
            </label>
          </div>

          <Input
            {...register('firstName')}
            label="Nombre"
            placeholder="Tu nombre"
            error={errors.firstName?.message}
          />

          <Input
            {...register('lastName')}
            label="Apellido"
            placeholder="Tu apellido"
            error={errors.lastName?.message}
          />

          {/* Celiac checkbox */}
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
            <input
              type="checkbox"
              {...register('isCeliac')}
              id="isCeliac"
              className="w-5 h-5 rounded border-slate-600 text-gemma-purple focus:ring-gemma-purple"
            />
            <label htmlFor="isCeliac" className="text-slate-300 font-body cursor-pointer">
              Soy celíaco/a
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={updateMutation.isPending}
          >
            Guardar y Continuar
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
