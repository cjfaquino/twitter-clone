import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import useInput from '../../hooks/useInput';
import { UserProfile } from '../../interfaces/UserProfile';
import useProviderLinkStatus from '../../hooks/useProviderLinkStatus';
import useWindowTitle from '../../hooks/useWindowTitle';
import useToggle from '../../hooks/useToggle';
import Login from '../Login';
import AccountStats from './AccountStats';
import LinkProviderButtons from './LinkProviderButtons';
import ChangePasswordForm from './ChangePasswordForm';
import VerifyEmailForm from './VerifyEmailForm';
import ChangeUsernameForm from './ChangeUsernameForm';
import Spinner from '../../components/Loaders/Spinner';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
}

const Settings = ({ currentUser, userProfile }: IProps) => {
  useWindowTitle('Settings');

  const [showLoginPopup, toggleLoginPopup] = useToggle();
  const [userName, handleUserName, setUserName] = useInput();
  const [email, handleEmail, setEmail] = useInput();
  const [googleStatus, handleGoogle] = useProviderLinkStatus(
    currentUser,
    'google.com'
  );
  const [githubStatus, handleGithub] = useProviderLinkStatus(
    currentUser,
    'github.com'
  );
  const [emailProviderStatus, handleEmailProvider, setEmailProvider] =
    useProviderLinkStatus(currentUser, 'password');

  const navigate = useNavigate();

  const setFields = async () => {
    // update inputs if data is available
    setEmail((currentUser && currentUser.email) || '');

    if (userProfile.doneLoading) {
      setUserName(userProfile.userName!);
    }
  };

  useEffect(() => {
    // must be signed in
    // User session expired, needs to reauthenticate
    if (!currentUser || currentUser.isAnonymous) {
      return navigate('/login');
    }

    // has not finished signup
    if (userProfile.id === 'no-id' && userProfile.doneLoading) {
      return navigate('/signup');
    }

    setFields();
    return () => {};
  }, [userProfile]);

  return userProfile.doneLoading ? (
    <div className='settings-forms'>
      <ChangeUsernameForm
        userName={userName}
        handleUserName={handleUserName}
        userProfile={userProfile}
      />

      <VerifyEmailForm
        email={email}
        handleEmail={handleEmail}
        currentUser={currentUser}
      />

      <ChangePasswordForm
        toggleLoginPopup={toggleLoginPopup}
        currentUser={currentUser}
        emailProviderStatus={emailProviderStatus}
        setEmailProvider={setEmailProvider}
        email={email}
      />

      <LinkProviderButtons
        emailProviderStatus={emailProviderStatus}
        googleStatus={googleStatus}
        githubStatus={githubStatus}
        handleEmailProvider={handleEmailProvider}
        handleGoogle={handleGoogle}
        handleGithub={handleGithub}
      />
      <AccountStats currentUser={currentUser} />
      {showLoginPopup && (
        <>
          <div id='popup-background' onClick={toggleLoginPopup} aria-hidden />
          <div className='login-popup'>
            <Login
              toggleLoginPopup={toggleLoginPopup}
              asPopup
              reauthenticate
              google={googleStatus}
              github={githubStatus}
              email={emailProviderStatus}
            />
          </div>
        </>
      )}
    </div>
  ) : (
    <Spinner />
  );
};

export default Settings;
