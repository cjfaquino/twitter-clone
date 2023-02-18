import React from 'react';

interface IProps {
  password: string;
  handlePassword: React.ChangeEventHandler<HTMLInputElement>;
  noConfirm?: boolean;
  confirmPassword?: string;
  handleConfirmPassword?: React.ChangeEventHandler<HTMLInputElement>;
}

const defaultProps = {
  noConfirm: false,
  confirmPassword: '',
  handleConfirmPassword: () => {},
};

const InputPasswordConfirm = ({
  noConfirm,
  password,
  confirmPassword,
  handlePassword,
  handleConfirmPassword,
}: IProps) => (
  <>
    <label htmlFor='password'>
      Password <span className='verify-password verify error' />
      <input
        type='password'
        id='password'
        value={password}
        onChange={handlePassword}
        required
      />
    </label>
    {!noConfirm && (
      <label htmlFor='confirm-password'>
        Confirm password{' '}
        <span className='verify-confirm-password verify error' />
        <input
          type='password'
          id='confirm-password'
          value={confirmPassword}
          onChange={handleConfirmPassword}
          required
        />
      </label>
    )}
  </>
);

InputPasswordConfirm.defaultProps = defaultProps;

export default InputPasswordConfirm;
