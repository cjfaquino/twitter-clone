/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  textArr: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  customClass: PropTypes.string.isRequired,
  itemID: PropTypes.string.isRequired,
};

type MyComponentProps = PropTypes.InferProps<typeof propTypes>;

const FormattedText: FunctionComponent<MyComponentProps> = ({
  textArr,
  customClass,
  itemID,
}) => (
  <div className={`${customClass}-item-message`}>
    {textArr.map((t, index) => {
      if (t.startsWith('#')) {
        return (
          <span
            key={`hash-${t}-${index}-${itemID}`}
            className='link-hash'
          >{`${t} `}</span>
        );
      }

      if (t.startsWith('@')) {
        const username = t.replace(/@/g, '');
        return (
          <Link
            to={`/${username}`}
            key={`user-${t}-${index}-${itemID}`}
            className='link-user'
          >{`@${username} `}</Link>
        );
      }

      return `${t} `;
    })}
  </div>
);

FormattedText.propTypes = propTypes;

export default FormattedText;
