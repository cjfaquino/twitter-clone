import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  exists?: boolean;
}

const defaultProps = {
  exists: false,
};

const HaveAnAccount = ({ exists }: IProps & typeof defaultProps) =>
  exists ? (
    <p>
      Already have an account? <Link to='/login'>Log in</Link>.
    </p>
  ) : (
    <p>
      Don&apos;t have an account? <Link to='/signup'>Sign up</Link>.
    </p>
  );

HaveAnAccount.defaultProps = defaultProps;

export default HaveAnAccount;
