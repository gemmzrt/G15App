import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { getSession } from '@/features/auth/api';
import { getProfile } from '@/features/profile/api';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data: user } = useQuery({ queryKey: ['auth'], queryFn: getSession });
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => (user ? getProfile(user.id) : null),
    enabled: !!user,
  });

  if (!profile?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-white mb-4">
            Acceso Denegado
          </h1>
          <Button onClick={() => navigate('/')}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <h1 className="text-5xl font-display font-bold text-gradient">
            Panel Admin
          </h1>
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Volver
          </Button>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Invites Manager Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-display font-bold text-white mb-4">
              📨 Invitaciones
            </h2>
            <p className="text-slate-400 font-body mb-4">
              Gestiona códigos de invitación
            </p>
            <p className="text-sm text-slate-500 font-body">
              Funcionalidad próximamente...
            </p>
          </motion.div>

          {/* Guest List Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-display font-bold text-white mb-4">
              👥 Lista de Invitados
            </h2>
            <p className="text-slate-400 font-body mb-4">
              Ver confirmaciones y datos
            </p>
            <p className="text-sm text-slate-500 font-body">
              Funcionalidad próximamente...
            </p>
          </motion.div>

          {/* Table Assignments Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-display font-bold text-white mb-4">
              🪑 Asignación de Mesas
            </h2>
            <p className="text-slate-400 font-body mb-4">
              Asigna mesas a invitados
            </p>
            <p className="text-sm text-slate-500 font-body">
              Funcionalidad próximamente...
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
