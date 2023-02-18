import React from 'react';
import UserName from '../classes/UserName';

interface IProps {
  userName: string;
  handleUserName: React.ChangeEventHandler<HTMLInputElement>;
}

const InputUsername = ({ userName, handleUserName }: IProps) => (
  <label htmlFor='userName'>
    Username @ <span className='verify-username verify error' />
    <input
      type='text'
      id='userName'
      value={userName}
      autoComplete='off'
      onChange={handleUserName}
      minLength={UserName.min}
      maxLength={UserName.max}
      required
    />
  </label>
);

export default InputUsername;
