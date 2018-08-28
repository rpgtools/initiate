import React from 'react';
import { abbrNum } from '../../utils';
import classNames from 'classnames';

const AbbreviatedNumber = ({
  number,
  ...rest
}) => {
  const abbrVal = abbrNum(number, 1);
  const classes = classNames({
    'abbreviated-number': true,
    'abbreviated-number--small': (abbrVal.length > 6),
    'abbreviated-number--medium': (abbrVal.length == 6),
  });
  return (
    <div className={classes} {...rest}>
      {abbrVal}
    </div>
  );
}

export default AbbreviatedNumber;
