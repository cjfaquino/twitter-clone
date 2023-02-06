import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  textArr: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  customClass: PropTypes.string.isRequired,
  tweetID: PropTypes.string.isRequired,
};

type MyComponentProps = PropTypes.InferProps<typeof propTypes>;

const FormattedTweetMessage: FunctionComponent<MyComponentProps> = ({
  textArr,
  customClass,
  tweetID,
}) => (
  <div className={`${customClass}-item-message`}>
    {textArr.map((t, index) => {
      if (t.startsWith('#')) {
        return (
          <span
            key={`hash-${t}-${index}-${tweetID}`}
            className='link-hash'
          >{`${t} `}</span>
        );
      }
      return `${t} `;
    })}
  </div>
);

FormattedTweetMessage.propTypes = propTypes;

export default FormattedTweetMessage;
