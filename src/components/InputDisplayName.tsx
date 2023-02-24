import React from 'react';
import DisplayName from '../classes/DisplayName';

interface IProps {
  displayName: string;
  handleDisplayName: React.ChangeEventHandler<HTMLInputElement>;
}

const InputDisplayName = ({ displayName, handleDisplayName }: IProps) => (
  <label htmlFor='displayName'>
    Display name <span className='verify-display-name verify error' />
    <input
      type='text'
      id='displayName'
      value={displayName}
      onChange={handleDisplayName}
      minLength={DisplayName.min}
      maxLength={DisplayName.max}
      required
    />
  </label>
);

export default InputDisplayName;
