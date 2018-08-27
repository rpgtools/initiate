import React from 'react';
import Counter from './Counter';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';

export default class InitiativeToken extends React.Component {
  render () {
    const {
      title,
      selected,
      children,
      actions,
      className,
      ...rest
    } = this.props;
    const tokenClass = classNames({
      'initiative-token': true,
      [`${className}`]: ('undefined' !== className),
      'selected': selected,
    });
    return (
      <div className={tokenClass} {...rest}>
        <div className="initiative-token__title">{title}</div>
        <div className="initiative-token__children">{children}</div>
        <div className="initiative-token__actions">
          {actions}
          <DragHandle />
        </div>
      </div>
    );
  }
};
