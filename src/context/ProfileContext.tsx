import React from 'react';
import { UserProfile } from '../interfaces/UserProfile';

const ProfileContext = React.createContext({
  id: 'no-id',
  doneLoading: false,
} as UserProfile);

export default ProfileContext;
