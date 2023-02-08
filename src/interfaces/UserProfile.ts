export interface UserProfile {
  id: string;
  displayName?: string;
  userName?: string;
  photoURL?: string;
  metadata?: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  doneLoading: boolean;
}
