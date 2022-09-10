import React from 'react';
import classnames from 'classnames';

import { LockStates } from '../../const';
import classes from './styles.module.css';

type CircleProps = {
  filled: boolean;
  lockState: LockStates;
  classNames?: Array<string>;
  onAnimationEnd?: () => void;
};

const Circle: React.FC<CircleProps> = ({
  filled,
  lockState,
  classNames = [],
}) => {
  return (
    <div
      className={classnames(
        classes.circle,
        {
          [classes['circle__filled']]: filled,
          [classes['circle_animation__success']]:
            lockState === LockStates.SUCCESS,
          [classes['circle_animation__failure']]:
            lockState === LockStates.FAILURE,
        },
        ...classNames
      )}
    ></div>
  );
};

export default Circle;
