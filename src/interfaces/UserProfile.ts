export interface UserProfile {
  id: string;
  bio?: string;
  website?: string;
  location?: string;
  displayName?: string;
  userName?: string;
  photoURL?: string;
  backdropURL?: string;
  metadata?: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  doneLoading: boolean;
}
