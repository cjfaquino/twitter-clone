import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import useFindByUsername from '../hooks/useFindByUsername';
import useFollowsList from '../hooks/useFollowsList';
import ListOfUsers from '../components/ListOfUsers';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import useWindowTitle from '../hooks/useWindowTitle';
import getUserUid from '../utils/user/getUserUid';

const FollowsPage = () => {
  const params = useParams();
  const location = useLocation();
  const targetUser = useFindByUsername(params.username!);
  const typeOfList = location.pathname.split('/')[2];
  const [userLists] = useFollowsList(typeOfList!, targetUser.userProfile.id);

  const windowTitle = (listName: string) => {
    let title = '';
    const name = `${targetUser.userProfile.displayName} (@${targetUser.userProfile.userName})`;
    switch (listName) {
      case 'followers':
        title = `People following ${name}`;
        break;
      case 'following':
        title = `People followed by ${name}`;
        break;
      case 'followers_you_follow':
        title = `People you know following ${name}`;
        break;

      default:
        title = '';
        break;
    }

    return title;
  };
  useWindowTitle(windowTitle(typeOfList));

  return (
    <>
      <GoBackHeader targetUser={targetUser} />
      <div className='filter-buttons-container'>
        {isUserSignedIn() && targetUser.userProfile.id !== getUserUid() && (
          <NavLink
            to={`/${params.username}/followers_you_follow`}
            className='styled-filter-link'
            state={{ targetUser }}
          >
            <span>Followers you know</span>
          </NavLink>
        )}
        <NavLink
          end
          to={`/${params.username}/followers`}
          className='styled-filter-link'
          state={{ targetUser }}
        >
          <span>Followers</span>
        </NavLink>
        <NavLink
          to={`/${params.username}/following`}
          className='styled-filter-link'
          state={{ targetUser }}
        >
          <span>Following</span>
        </NavLink>
      </div>
      <ListOfUsers users={userLists} />
    </>
  );
};

export default FollowsPage;
