import React from 'react';
import debounce from 'lodash.debounce';

import Circle from '../Circle';
import PasscodeButton from '../PasscodeButton';
import classes from './styles.module.css';
import { passcodeButtonsData } from './const';
import { LockStates } from '../../const';

type PasscodeLockProps = {
  code: Array<string>;
  onSymbolClick: (symbol: string) => void;
  lockState: LockStates;
  onAnimationEnd?: () => void;
};

const PasscodeLock: React.FC<PasscodeLockProps> = ({
  code,
  onSymbolClick,
  lockState,
  onAnimationEnd = () => {},
}) => {
  const debouncedCirclesAnimationEnd = React.useRef(
    debounce(
      (callback: () => void) => {
        callback();
      },
      500,
      { leading: true, trailing: true }
    )
  );

  React.useEffect(
    () => () => debouncedCirclesAnimationEnd.current.cancel(),
    []
  );

  return (
    <div className={classes['passcode-lock']}>
      <div
        className={classes['passcode-lock_circles']}
        onAnimationEnd={() =>
          debouncedCirclesAnimationEnd.current(onAnimationEnd)
        }
      >
        {code.map((symbol, index) => (
          <Circle
            key={index}
            filled={!!symbol}
            lockState={lockState}
            classNames={[classes['passcode-lock_circles__circle']]}
          />
        ))}
      </div>
      <div className={classes['passcode-lock_buttons']}>
        {passcodeButtonsData.map((buttonData, index) =>
          'empty' in buttonData ? (
            <div
              key={index}
              className={classes['passcode-lock_buttons_empty']}
            ></div>
          ) : (
            <PasscodeButton
              key={index}
              classNames={[classes['passcode-lock_buttons_button-wrapper']]}
              symbol={buttonData.mainSymbol}
              additionalSymbols={buttonData.additionalSymbols}
              onSelect={onSymbolClick}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PasscodeLock;
