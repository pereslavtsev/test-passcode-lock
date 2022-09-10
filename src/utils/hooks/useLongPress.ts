import React from 'react';

export const useLongPress = (onClick: () => void, onLongTouch: () => void) => {
  const [timeoutId, setTimeoutId] = React.useState<
    number | NodeJS.Timeout | null
  >(null);

  const handleMouseDown = () => {
    const timeoutId = setTimeout(() => {
      onLongTouch();
      setTimeoutId(timeoutId);
    }, 1000);
    setTimeoutId(timeoutId);
  };

  const handleMouseUp = () => {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
    onClick();
  };

  const handleMouseOut = () => {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
  };

  React.useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId]
  );

  return {
    onUp: handleMouseUp,
    onDown: handleMouseDown,
    onOut: handleMouseOut,
  };
};
