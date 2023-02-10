export interface UserProfile {
  id: string;
  bio?: string;
  website?: string;
  location?: string;
  displayName?: string;
  userName?: string;
  photoURL?: string;
  backdropURL?: string;
  followers?: number;
  following?: number;
  metadata?: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  doneLoading: boolean;
}
