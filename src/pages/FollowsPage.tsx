import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';

const FollowsPage = () => {
  const params = useParams();

  return (
    <>
      <GoBackHeader />
      <div className='follow-filter-buttons'>
        <NavLink to={`/${params.username}/followers_you_follow`}>
          <span>Followers you know</span>
        </NavLink>
        <NavLink end to={`/${params.username}/followers`}>
          <span>Followers</span>
        </NavLink>
        <NavLink to={`/${params.username}/following`}>
          <span>Following</span>
        </NavLink>
      </div>
    </>
  );
};

export default FollowsPage;
