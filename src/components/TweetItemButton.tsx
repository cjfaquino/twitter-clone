import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import fancyNumbers from '../utils/formatters/fancyNumbers';

interface IProps {
  className: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  number?: number;
  type?: string;
  color: string;
  icon: IconDefinition | IconProp;
}

const defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick: (e: any) => {},
  number: 0,
  type: '',
};

const TweetItemButton = ({
  className,
  handleClick,
  number,
  icon,
  type,
  color,
}: IProps & typeof defaultProps) => (
  <button
    type='button'
    className={className}
    title={type}
    onClick={handleClick}
  >
    <span className={`btn-${color}`}>
      <FontAwesomeIcon icon={icon} />
    </span>{' '}
    {!!type && !!number && (
      <span className={`${type}-number`}>{fancyNumbers(number)}</span>
    )}
    <span className='extra-btn-text' />
  </button>
);

TweetItemButton.defaultProps = defaultProps;

export default TweetItemButton;
