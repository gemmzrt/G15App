import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getSession } from '@/features/auth/api';
import { getProfile } from '@/features/profile/api';
import { CountdownCard } from '../components/CountdownCard';
import { TableCard } from '../components/TableCard';
import { RSVPCard } from '@/features/rsvp/components/RSVPCard';
import { Button } from '@/components/ui';
import { signOut } from '@/features/auth/api';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const { data: user } = useQuery({ queryKey: ['auth'], queryFn: getSession });
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => (user ? getProfile(user.id) : null),
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-2">
              Gemma 15
            </h1>
            <p className="text-slate-300 font-body">
              Bienvenid@, {profile?.firstName || user?.email} ✨
            </p>
          </div>
          <div className="flex gap-3">
            {profile?.isAdmin && (
              <Button variant="secondary" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
            <Button variant="ghost" onClick={handleSignOut}>
              Salir
            </Button>
          </div>
        </motion.header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2"
          >
            <div className="glass-card rounded-2xl p-8 shadow-xl h-full">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                ¡Te esperamos! 🎉
              </h2>
              <p className="text-slate-300 font-body text-lg mb-6">
                Celebremos juntos este momento tan especial. Será una fiesta inolvidable.
              </p>
              <div className="space-y-2 text-slate-400 font-body">
                <p>📅 <strong>Fecha:</strong> 14 de Marzo 2026</p>
                <p>📍 <strong>Lugar:</strong> Por confirmar</p>
                <p>⏰ <strong>Horario:</strong> {profile?.segment === 'YOUNG' ? '14:00' : '19:00'} hs</p>
              </div>
            </div>
          </motion.div>

          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CountdownCard segment={profile?.segment || 'YOUNG'} />
          </motion.div>

          {/* RSVP Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user && <RSVPCard userId={user.id} />}
          </motion.div>

          {/* Table Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {user && <TableCard userId={user.id} />}
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-6 shadow-xl h-full">
              <h3 className="text-xl font-display font-bold text-white mb-4">
                📍 Ubicación
              </h3>
              <p className="text-slate-400 font-body mb-4">
                La ubicación será compartida próximamente
              </p>
              <Button variant="secondary" className="w-full" disabled>
                Ver en Mapa
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
