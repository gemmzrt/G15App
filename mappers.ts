import type { Database } from './database';
import type { Profile, Invite, RSVP, TableAssignment } from './domain';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type InviteRow = Database['public']['Tables']['invites']['Row'];
type RSVPRow = Database['public']['Tables']['rsvps']['Row'];
type TableAssignmentRow = Database['public']['Tables']['table_assignments']['Row'];

export function mapProfileFromDB(row: ProfileRow): Profile {
  return {
    id: row.id,
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    isCeliac: row.is_celiac,
    avatarUrl: row.avatar_url,
    segment: row.segment,
    isAdmin: row.is_admin,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapInviteFromDB(row: InviteRow): Invite {
  return {
    id: row.id,
    code: row.code,
    email: row.email,
    segment: row.segment,
    used: row.used,
    claimedBy: row.claimed_by,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapRSVPFromDB(row: RSVPRow): RSVP {
  return {
    id: row.id,
    userId: row.user_id,
    status: row.status,
    notes: row.notes,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function mapTableAssignmentFromDB(row: TableAssignmentRow): TableAssignment {
  return {
    id: row.id,
    userId: row.user_id,
    tableNumber: row.table_number,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function isProfileComplete(profile: Profile): boolean {
  return !!(profile.firstName && profile.lastName);
}
