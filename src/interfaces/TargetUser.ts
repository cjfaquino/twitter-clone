import { UserProfile } from './UserProfile';

export interface TargetUser {
  userProfile: UserProfile;
  followers: UserProfile[];
  following: UserProfile[];
  doneLoading: boolean;
}
