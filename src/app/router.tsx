import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InviteGate } from '@/features/auth/pages/InviteGate';
import { Home } from '@/features/home/pages/Home';
import { ProfileSetup } from '@/features/profile/pages/ProfileSetup';
import { AdminDashboard } from '@/features/admin/pages/AdminDashboard';
import { getSession } from '@/features/auth/api';
import { getProfile } from '@/features/profile/api';
import { isProfileComplete } from '@/types/mappers';
import { CardSkeleton } from '@/components/ui';

export function AppRouter() {
  const { data: user, isLoading: isLoadingAuth } = useQuery({
    queryKey: ['auth'],
    queryFn: getSession,
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => (user ? getProfile(user.id) : null),
    enabled: !!user,
  });

  if (isLoadingAuth || (user && isLoadingProfile)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <CardSkeleton />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<InviteGate />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  // Profile incomplete
  if (profile && !isProfileComplete(profile)) {
    return (
      <Routes>
        <Route path="/profile/setup" element={<ProfileSetup />} />
        <Route path="*" element={<Navigate to="/profile/setup" replace />} />
      </Routes>
    );
  }

  // Authenticated and profile complete
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
