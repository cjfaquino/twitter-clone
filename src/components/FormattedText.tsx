import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

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
            // eslint-disable-next-line react/no-array-index-key
            key={`hash-${t}-${index}-${itemID}`}
            className='link-hash'
          >{`${t} `}</span>
        );
      }
      return `${t} `;
    })}
  </div>
);

FormattedText.propTypes = propTypes;

export default FormattedText;
