import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, Button, useToast } from '@/components/ui';
import { supabase } from '@/lib/supabaseClient';
import { mapRSVPFromDB } from '@/types/mappers';
import type { RSVPStatus } from '@/types/domain';

interface RSVPCardProps {
  userId: string;
}

export function RSVPCard({ userId }: RSVPCardProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: rsvp } = useQuery({
    queryKey: ['rsvp', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data ? mapRSVPFromDB(data) : null;
    },
  });

  const updateRSVPMutation = useMutation({
    mutationFn: async (status: RSVPStatus) => {
      const { error } = await supabase
        .from('rsvps')
        .upsert({
          user_id: userId,
          status,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rsvp', userId] });
      showToast('RSVP actualizado', 'success');
    },
    onError: () => {
      showToast('Error al actualizar RSVP', 'error');
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>📝 Confirmación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant={rsvp?.status === 'CONFIRMED' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => updateRSVPMutation.mutate('CONFIRMED')}
            className="flex-1"
          >
            ✓ Voy
          </Button>
          <Button
            variant={rsvp?.status === 'DECLINED' ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => updateRSVPMutation.mutate('DECLINED')}
            className="flex-1"
          >
            ✕ No voy
          </Button>
        </div>
        {rsvp && (
          <p className="text-sm text-slate-400 font-body text-center">
            Estado: <strong className={rsvp.status === 'CONFIRMED' ? 'text-green-400' : 'text-red-400'}>
              {rsvp.status === 'CONFIRMED' ? 'Confirmado' : rsvp.status === 'DECLINED' ? 'No asistiré' : 'Pendiente'}
            </strong>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
