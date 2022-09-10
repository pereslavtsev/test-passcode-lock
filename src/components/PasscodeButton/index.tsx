import React from 'react';
import classnames from 'classnames';

import PasscodeButtonPopup from '../PasscodeButtonPopup';
import classes from './styles.module.css';
import { useLongPress } from '../../utils/hooks/useLongPress';

type PasscodeButtonProps = {
  symbol: string;
  additionalSymbols: Array<string>;
  classNames?: Array<string>;
  onSelect?: (letter: string) => void;
};

const PasscodeButton: React.FC<PasscodeButtonProps> = ({
  symbol,
  additionalSymbols,
  classNames = [],
  onSelect = () => {},
}) => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const { onUp, onDown, onOut } = useLongPress(
    () => {
      onSelect(symbol);
    },
    () => {
      setPopupOpen(true);
    }
  );

  return (
    <button
      type="button"
      className={classnames(classes['passcode-button_wrapper'], ...classNames)}
    >
      <div
        className={classes['passcode-button']}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseOut={onOut}
        onTouchStart={onDown}
      >
        <div className={classes['passcode-button_text']}>{symbol}</div>
        <div className={classes['passcode-button_subtext']}>
          {additionalSymbols.join('') || (
            <div className={classes.hidden}>1</div>
          )}
        </div>
      </div>
      <PasscodeButtonPopup
        isOpen={isPopupOpen}
        onPopupClose={() => setPopupOpen(false)}
        symbols={additionalSymbols}
        onSelectSymbol={onSelect}
      />
    </button>
  );
};

export default PasscodeButton;
