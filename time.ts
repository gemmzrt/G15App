import { DateTime } from 'luxon';

export const EVENT_TIMEZONE = 'America/Argentina/Buenos_Aires';

// Event configuration - hardcoded as per spec
export const EVENT_CONFIG = {
  date: '2026-03-14',
  globalStart: '2026-03-14T14:00:00',
  globalEnd: '2026-03-15T01:00:00',
  segments: {
    YOUNG: '2026-03-14T14:00:00',
    ADULT: '2026-03-14T19:00:00',
  },
} as const;

export type Segment = keyof typeof EVENT_CONFIG.segments;

export interface CountdownState {
  status: 'before' | 'ongoing' | 'finished';
  days: number;
  hours: number;
  minutes: number;
  message: string;
}

/**
 * Calculate countdown state for a given segment
 */
export function calculateCountdown(segment: Segment): CountdownState {
  const now = DateTime.now().setZone(EVENT_TIMEZONE);
  const targetTime = DateTime.fromISO(EVENT_CONFIG.segments[segment], { zone: EVENT_TIMEZONE });
  const globalEnd = DateTime.fromISO(EVENT_CONFIG.globalEnd, { zone: EVENT_TIMEZONE });

  // Before target time
  if (now < targetTime) {
    const diff = targetTime.diff(now, ['days', 'hours', 'minutes']);
    return {
      status: 'before',
      days: Math.floor(diff.days),
      hours: Math.floor(diff.hours),
      minutes: Math.floor(diff.minutes),
      message: `Faltan ${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m`,
    };
  }

  // Between target and global end
  if (now >= targetTime && now < globalEnd) {
    const diff = globalEnd.diff(now, ['hours', 'minutes']);
    return {
      status: 'ongoing',
      days: 0,
      hours: Math.floor(diff.hours),
      minutes: Math.floor(diff.minutes),
      message: `EN CURSO - Termina en ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m`,
    };
  }

  // After global end
  return {
    status: 'finished',
    days: 0,
    hours: 0,
    minutes: 0,
    message: 'Finalizado',
  };
}

/**
 * Get formatted event date for display
 */
export function getEventDateFormatted(): string {
  const eventDate = DateTime.fromISO(EVENT_CONFIG.date, { zone: EVENT_TIMEZONE });
  return eventDate.toFormat('dd/MM/yyyy');
}

/**
 * Get formatted event time for a segment
 */
export function getSegmentTimeFormatted(segment: Segment): string {
  const time = DateTime.fromISO(EVENT_CONFIG.segments[segment], { zone: EVENT_TIMEZONE });
  return time.toFormat('HH:mm');
}

/**
 * Check if event is currently happening
 */
export function isEventOngoing(): boolean {
  const now = DateTime.now().setZone(EVENT_TIMEZONE);
  const globalStart = DateTime.fromISO(EVENT_CONFIG.globalStart, { zone: EVENT_TIMEZONE });
  const globalEnd = DateTime.fromISO(EVENT_CONFIG.globalEnd, { zone: EVENT_TIMEZONE });
  
  return now >= globalStart && now < globalEnd;
}
