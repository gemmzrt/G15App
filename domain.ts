export type Segment = 'YOUNG' | 'ADULT';
export type RSVPStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED';

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  isCeliac: boolean;
  avatarUrl: string | null;
  segment: Segment;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invite {
  id: string;
  code: string;
  email: string;
  segment: Segment;
  used: boolean;
  claimedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVP {
  id: string;
  userId: string;
  status: RSVPStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TableAssignment {
  id: string;
  userId: string;
  tableNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestListItem {
  profile: Profile;
  rsvp: RSVP | null;
  table: TableAssignment | null;
}

// Form types
export interface ProfileFormData {
  firstName: string;
  lastName: string;
  isCeliac: boolean;
  avatarFile?: File;
}

export interface RSVPFormData {
  status: RSVPStatus;
  notes?: string;
}

export interface InviteFormData {
  code: string;
  email: string;
  segment: Segment;
}
