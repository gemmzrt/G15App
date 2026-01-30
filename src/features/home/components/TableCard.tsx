import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { supabase } from '@/lib/supabaseClient';
import { mapTableAssignmentFromDB } from '@/types/mappers';
import { useEffect } from 'react';
import { logger } from '@/lib/logger';

interface TableCardProps {
  userId: string;
}

export function TableCard({ userId }: TableCardProps) {
  const { data: table, refetch } = useQuery({
    queryKey: ['table', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('table_assignments')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data ? mapTableAssignmentFromDB(data) : null;
    },
  });

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('table_assignments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'table_assignments',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          logger.info('table_assignment_changed', { payload });
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, refetch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🪑 Tu Mesa</CardTitle>
      </CardHeader>
      <CardContent>
        {table ? (
          <div className="text-center space-y-2">
            <div className="text-5xl font-display font-bold text-gradient">
              {table.tableNumber}
            </div>
            <p className="text-slate-400 font-body text-sm">
              Tu mesa asignada
            </p>
          </div>
        ) : (
          <p className="text-slate-400 font-body text-center">
            Aún no tienes mesa asignada
          </p>
        )}
      </CardContent>
    </Card>
  );
}
