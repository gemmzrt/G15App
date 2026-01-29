import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { calculateCountdown, type Segment } from '@/lib/time';

interface CountdownCardProps {
  segment: Segment;
}

export function CountdownCard({ segment }: CountdownCardProps) {
  const [countdown, setCountdown] = useState(calculateCountdown(segment));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(segment));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [segment]);

  const getStatusColor = () => {
    switch (countdown.status) {
      case 'before':
        return 'text-gemma-pink';
      case 'ongoing':
        return 'text-green-400';
      case 'finished':
        return 'text-slate-500';
    }
  };

  return (
    <Card hover={false} className="h-full">
      <CardHeader>
        <CardTitle>⏰ Cuenta Regresiva</CardTitle>
      </CardHeader>
      <CardContent>
        {countdown.status === 'before' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <TimeUnit value={countdown.days} label="Días" />
              <TimeUnit value={countdown.hours} label="Horas" />
              <TimeUnit value={countdown.minutes} label="Min" />
            </div>
            <p className={`text-center font-body font-medium ${getStatusColor()}`}>
              {countdown.message}
            </p>
          </div>
        )}

        {countdown.status === 'ongoing' && (
          <div className="text-center space-y-3">
            <div className="text-4xl">🎊</div>
            <p className={`font-display text-2xl font-bold ${getStatusColor()}`}>
              ¡EN CURSO!
            </p>
            <p className="text-slate-400 font-body text-sm">
              Termina en {countdown.hours}h {countdown.minutes}m
            </p>
          </div>
        )}

        {countdown.status === 'finished' && (
          <div className="text-center space-y-3">
            <div className="text-4xl">✨</div>
            <p className={`font-display text-2xl font-bold ${getStatusColor()}`}>
              Finalizado
            </p>
            <p className="text-slate-400 font-body text-sm">
              ¡Gracias por venir!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="bg-gemma-purple/20 rounded-xl p-3 text-center"
    >
      <div className="text-3xl font-display font-bold text-gradient">
        {value}
      </div>
      <div className="text-xs text-slate-400 font-body mt-1">
        {label}
      </div>
    </motion.div>
  );
}
