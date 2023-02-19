import React from 'react';
import Dots from './Loaders/Dots';

interface IProps {
  submitting: boolean;
  text: string;
  width: number;
  disabled?: boolean;
}

const SubmitButton = ({ submitting, text, width, disabled }: IProps) => {
  const styles = {
    padding: '7px 15px',
    height: '42px',
    width: `${width}px`,
  };

  return (
    <button type='submit' style={styles} disabled={disabled || submitting}>
      {submitting ? <Dots /> : text}
    </button>
  );
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
