import React, { useEffect } from 'react';
import {
  useParams,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { User } from 'firebase/auth';
import GoBackHeader from '../../components/GoBackHeader';
import ProfileLarge from './ProfileLarge';
import useFindByUsername from '../../hooks/useFindByUsername';
import ProfileFeed from './ProfileFeed';
import { UserProfile } from '../../interfaces/UserProfile';
import Spinner from '../../components/Loaders/Spinner';
import useWindowTitle from '../../hooks/useWindowTitle';
import { TweetObj } from '../../interfaces/TweetObj';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
  tweets: TweetObj[];
  setTweets: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const ProfilePage = ({
  currentUser,
  userProfile,
  tweets,
  setTweets,
}: IProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const targetUser = useFindByUsername(params.username!);
  useWindowTitle(
    targetUser.doneLoading &&
      `${targetUser.userProfile.displayName} (@${targetUser.userProfile.userName})`
  );

  useEffect(() => {
    // has not finished signup
    // navigate to finish
    if (userProfile.id === 'no-id' && userProfile.doneLoading) {
      navigate('/signup/continue');
    }
  }, [userProfile]);

  return targetUser.doneLoading ? (
    <div id='profile'>
      <GoBackHeader targetUser={targetUser} />
      <ProfileLarge
        currentUser={currentUser}
        userProfile={userProfile}
        targetUser={targetUser}
      />

      {targetUser.userProfile && (
        <div className='filter-buttons-container'>
          <NavLink
            end
            to={`/${targetUser.userProfile.userName}`}
            className='styled-filter-link'
          >
            <span>Tweets</span>
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/with_replies`}
            className='styled-filter-link'
          >
            <span>Tweets & replies</span>
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/media`}
            className='styled-filter-link'
          >
            <span>Media</span>
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/likes`}
            className='styled-filter-link'
          >
            <span>Likes</span>
          </NavLink>
        </div>
      )}
      <Routes>
        {[
          { path: '', filter: 'user tweets' },
          { path: 'with_replies', filter: 'user tweets&replies' },
          { path: 'likes', filter: 'user likes' },
          { path: 'media', filter: 'user media' },
        ].map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <ProfileFeed
                filter={item.filter}
                targetUser={targetUser}
                setTweets={setTweets}
                tweets={tweets}
              />
            }
          />
        ))}
      </Routes>
    </div>
  ) : (
    <Spinner />
  );
};

export default ProfilePage;
