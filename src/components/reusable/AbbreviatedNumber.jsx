import React from 'react';
import { abbrNum } from '../../utils/abbrNumber';
import classNames from 'classnames';

const AbbreviatedNumber = ({
  number,
  ...rest
}) => {
  const abbrVal = abbrNum(number, 1);
  const classes = classNames({
    'abbreviated-number': true,
    'abbreviated-number--medium': (6 > abbrVal.length && abbrVal.length > 4),
    'abbreviated-number--small': (abbrVal.length > 5),
  });
  return (
    <div className={classes} {...rest}>
      {abbrVal}
    </div>
  );
}

export default AbbreviatedNumber;
