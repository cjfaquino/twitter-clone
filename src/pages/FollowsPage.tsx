import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import useFindByUsername from '../hooks/useFindByUsername';
import useFollowsList from '../hooks/useFollowsList';
import ListOfUsers from '../components/ListOfUsers';

const FollowsPage = () => {
  const params = useParams();
  const location = useLocation();
  const targetUser = useFindByUsername(params.username!);
  const typeOfList = location.pathname.split('/').pop();
  const [userLists] = useFollowsList(typeOfList!, targetUser.userProfile.id);

  return (
    <>
      <GoBackHeader targetUser={targetUser} />
      <div className='filter-buttons-container'>
        <NavLink
          to={`/${params.username}/followers_you_follow`}
          className='styled-filter-link'
          state={{ targetUser }}
        >
          <span>Followers you know</span>
        </NavLink>
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
