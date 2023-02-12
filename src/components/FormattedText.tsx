/* eslint-disable react/no-array-index-key */
import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { createSearchParams, Link } from 'react-router-dom';

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
    {textArr.map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <Link
            to={{
              pathname: '/search',
              search: createSearchParams({ q: word, f: 'latest' }).toString(),
            }}
            key={`hash-${word}-${index}-${itemID}`}
            className='link-hash'
          >{`${word} `}</Link>
        );
      }

      if (word.startsWith('@')) {
        const username = word.replace(/@/g, '');
        return (
          <Link
            to={`/${username}`}
            key={`user-${word}-${index}-${itemID}`}
            className='link-user'
          >{`@${username} `}</Link>
        );
      }

      return `${word} `;
    })}
  </div>
);

FormattedText.propTypes = propTypes;

export default FormattedText;
