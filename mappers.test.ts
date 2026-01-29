import { describe, it, expect } from 'vitest';
import { mapProfileFromDB, isProfileComplete } from '@/types/mappers';
import type { Database } from '@/types/database';

describe('Domain Mappers', () => {
  it('should map profile from DB correctly', () => {
    const dbProfile: Database['public']['Tables']['profiles']['Row'] = {
      id: '123',
      user_id: 'user-456',
      first_name: 'Test',
      last_name: 'User',
      is_celiac: false,
      avatar_url: null,
      segment: 'YOUNG',
      is_admin: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const domainProfile = mapProfileFromDB(dbProfile);

    expect(domainProfile.id).toBe('123');
    expect(domainProfile.userId).toBe('user-456');
    expect(domainProfile.firstName).toBe('Test');
    expect(domainProfile.lastName).toBe('User');
    expect(domainProfile.isCeliac).toBe(false);
    expect(domainProfile.segment).toBe('YOUNG');
  });

  it('should detect incomplete profile', () => {
    const incompleteProfile = {
      id: '123',
      userId: 'user-456',
      firstName: null,
      lastName: null,
      isCeliac: false,
      avatarUrl: null,
      segment: 'YOUNG' as const,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(isProfileComplete(incompleteProfile)).toBe(false);
  });

  it('should detect complete profile', () => {
    const completeProfile = {
      id: '123',
      userId: 'user-456',
      firstName: 'Test',
      lastName: 'User',
      isCeliac: false,
      avatarUrl: null,
      segment: 'YOUNG' as const,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(isProfileComplete(completeProfile)).toBe(true);
  });
});
