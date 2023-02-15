import { TweetObj } from './TweetObj';

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
  likes?: TweetObj[];
  metadata?: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    lastSignInTime: string;
  };
  doneLoading: boolean;
}
