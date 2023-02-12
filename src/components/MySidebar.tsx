import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyFooter from './MyFooter/MyFooter';
import OrSeparator from './OrSeparator';
import HaveAnAccount from './HaveAnAccount';
import WhoToFollow from './WhoToFollow';
import ProviderButtons from './ProviderButtons';
import SearchHeader from './SearchHeader';

interface IProps {
  isSignedIn: boolean;
}

const MySidebar = ({ isSignedIn }: IProps) => {
  const location = useLocation();
  const notExploreOrSearch: boolean | undefined = !location.pathname
    .split(/\//)[1]
    .match(/explore|search/i);

  return (
    <div id='sidebar'>
      {notExploreOrSearch && <SearchHeader />}
      {!isSignedIn ? (
        <div className='sidebar-signup'>
          <h3>New to {import.meta.env.VITE_APP_NAME}?</h3>
          <p>Sign up now to get your own personalized timeline!</p>
          <ProviderButtons mode='Sign up' />
          <OrSeparator />
          <Link to='/signup'>
            <button type='button' className='btn-sidebar-signup'>
              Create account
            </button>
          </Link>
          <HaveAnAccount exists />
          <p>
            This is only a project for learning. Any feedback will help to
            improve your overall experience.
          </p>
        </div>
      ) : (
        <WhoToFollow />
      )}
      <MyFooter />
    </div>
  );
};

export default MySidebar;
