import React from 'react';
import { Link } from 'react-router-dom';

const HaveAnAccount = ({ exists }: { exists: boolean }) =>
  exists ? (
    <p>
      Already have an account? <Link to='/login'>Log in</Link>.
    </p>
  ) : (
    <p>
      Don&apos;t have an account? <Link to='/signup'>Sign up</Link>.
    </p>
  );

export default HaveAnAccount;
