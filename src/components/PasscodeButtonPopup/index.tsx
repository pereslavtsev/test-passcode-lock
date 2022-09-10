import React from 'react';

import Popup from '../Popup';
import classes from './styles.module.css';

type PasscodeButtonPopup = {
  symbols: Array<string>;
  isOpen: boolean;
  onPopupClose: () => void;
  onSelectSymbol: (symbol: string) => void;
};

const PasscodeButtonPopup: React.FC<PasscodeButtonPopup> = ({
  symbols,
  isOpen,
  onPopupClose,
  onSelectSymbol,
}) => {
  return (
    <Popup open={isOpen} close={onPopupClose}>
      <div className={classes['passcode-button-popup']}>
        {symbols.map((symbol, index) => (
          <div
            key={index}
            className={classes['passcode-button-popup_symbol']}
            onClick={() => {
              onSelectSymbol(symbol);
              onPopupClose();
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default PasscodeButtonPopup;
