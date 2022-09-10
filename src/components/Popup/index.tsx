import React from 'react';

import classes from './styles.module.css';
import classNames from 'classnames';

type PopupProps = {
  open: boolean;
  close: () => void;
};

const Popup: React.FC<React.PropsWithChildren<PopupProps>> = ({
  children,
  open,
  close,
}) => {
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const elemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const size = elemRef.current?.getBoundingClientRect();
    if (size) setSize({ width: size.width, height: size.height });
  }, [open]);

  React.useEffect(() => {
    if (open && size) {
      const bodyMouseDownHandler = (event: MouseEvent) => {
        if (
          elemRef.current &&
          event.target &&
          !(
            elemRef.current.contains(event.target as Node) ||
            elemRef.current === event.target
          )
        )
          close();
      };

      document.body.addEventListener('mousedown', bodyMouseDownHandler);

      return () => {
        document.body.removeEventListener('mousedown', bodyMouseDownHandler);
      };
    }
  }, [open, size]);

  if (!open) return null;

  return (
    <div
      className={classNames(classes['popup'], {
        [classes['popup-wrapper__hidden']]: !size,
      })}
      style={
        size
          ? {
              top: `calc(50% - ${size.height}px / 2)`,
              left: `calc(50% - ${size.width}px / 2)`,
            }
          : {}
      }
      ref={elemRef}
    >
      {children}
    </div>
  );
};

export default Popup;
