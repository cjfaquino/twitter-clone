/* eslint-disable react/no-array-index-key */
import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import textToCleanedTextArray from '../utils/formatters/textToCleanedTextArray';

interface IArgs {
  text: string;
  customClass: string;
  itemID: string;
}

const FormattedText = ({ text, customClass, itemID }: IArgs) => {
  const textArr = textToCleanedTextArray(text);
  return (
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
};

export default FormattedText;
