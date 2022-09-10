import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import PasscodeLock from './components/PasscodeLock';
import { makeEmptyStringArray } from './utils/factoryFunctions';
import { checkCode } from './utils/checkCode';
import { LockStates } from './const';
import classes from './App.module.css';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [savedCode, saveCode] = React.useState<Array<string> | null>(null);
  const [code, setCode] = React.useState<Array<string>>(
    makeEmptyStringArray(6)
  );
  const [lockState, setLockState] = React.useState<LockStates>(
    LockStates.PENDING
  );

  const handleSymbolClick = (symbol: string) => {
    const lastEmptyIndex = code.findIndex((symbol) => !symbol);
    if (lastEmptyIndex === -1) return;
    const enteredCode = [
      ...code.slice(0, lastEmptyIndex),
      symbol,
      ...code.slice(lastEmptyIndex + 1),
    ];
    setCode(enteredCode);

    if (lastEmptyIndex !== code.length - 1) return;

    if (savedCode) {
      if (checkCode(savedCode, enteredCode)) {
        setLockState(LockStates.SUCCESS);
        toast.success('Code is correct');
      } else {
        setLockState(LockStates.FAILURE);
        toast.error('Code is incorrect');
      }
      return;
    }

    saveCode(enteredCode);
    toast.success('Passcode was successfully saved');
    setLockState(LockStates.SUCCESS);
  };

  const handleCirclesAnimationEnd = () => {
    setCode(makeEmptyStringArray(6));
    setLockState(LockStates.PENDING);
  };

  return (
    <div className={classes['passcode-app']}>
      <div>{savedCode ? 'Enter passcode' : 'Set new passcode'}</div>
      <PasscodeLock
        code={code}
        onSymbolClick={handleSymbolClick}
        lockState={lockState}
        onAnimationEnd={handleCirclesAnimationEnd}
      />
      <div className={classes['passcode-app_helper-text']}>
        To select a letter, hold down the button with the list of letters below
        the number
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
