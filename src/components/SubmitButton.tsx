import React from 'react';
import Dots from './Loaders/Dots';

interface IProps {
  submitting: boolean;
  text: string;
  width: number;
}

const SubmitButton = ({ submitting, text, width }: IProps) => {
  const styles = {
    padding: '7px 15px',
    height: '42px',
    width: `${width}px`,
  };

  return (
    <button type='submit' style={styles} disabled={submitting}>
      {submitting ? <Dots /> : text}
    </button>
  );
};

export default SubmitButton;
