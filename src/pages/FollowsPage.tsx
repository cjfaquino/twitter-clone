import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';

const FollowsPage = () => {
  const params = useParams();

  return (
    <>
      <GoBackHeader />
      <div className='filter-buttons-container'>
        <NavLink
          to={`/${params.username}/followers_you_follow`}
          className='styled-filter-link'
        >
          <span>Followers you know</span>
        </NavLink>
        <NavLink
          end
          to={`/${params.username}/followers`}
          className='styled-filter-link'
        >
          <span>Followers</span>
        </NavLink>
        <NavLink
          to={`/${params.username}/following`}
          className='styled-filter-link'
        >
          <span>Following</span>
        </NavLink>
      </div>
    </>
  );
};

export default FollowsPage;
