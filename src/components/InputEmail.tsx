import React from 'react';

interface IProps {
  email: string;
  handleEmail: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean | null;
  reset?: boolean;
}

const InputEmail = ({ email, handleEmail, disabled, reset }: IProps) => {
  const ID = `${reset ? 'reset-' : ''}email`;

  return (
    <label htmlFor={ID}>
      Email
      <input
        type='email'
        id={ID}
        value={email}
        onChange={handleEmail}
        disabled={!!disabled}
        required
      />
    </label>
  );
};

InputEmail.defaultProps = {
  disabled: false,
  reset: false,
};

export default InputEmail;
