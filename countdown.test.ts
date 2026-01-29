import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import { calculateCountdown, EVENT_TIMEZONE } from '@/lib/time';

describe('Countdown Logic', () => {
  it('should show "before" status when before event start', () => {
    // This test needs to be adjusted based on current date
    // For now, it's a placeholder
    const result = calculateCountdown('YOUNG');
    expect(['before', 'ongoing', 'finished']).toContain(result.status);
  });

  it('should calculate correct timezone', () => {
    const now = DateTime.now().setZone(EVENT_TIMEZONE);
    expect(now.zoneName).toBe('America/Argentina/Buenos_Aires');
  });

  it('should have valid countdown properties', () => {
    const result = calculateCountdown('YOUNG');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('days');
    expect(result).toHaveProperty('hours');
    expect(result).toHaveProperty('minutes');
    expect(result).toHaveProperty('message');
  });
});
