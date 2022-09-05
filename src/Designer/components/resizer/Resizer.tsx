import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

type ResizeFunc = (e: React.MouseEvent) => void;

type DefaultHandleProps = {
  className?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
};

function DefaultHandle({ className, onMouseDown }: DefaultHandleProps) {
  return <div className={classnames('handle', className)} onMouseDown={onMouseDown}></div>;
}

export type ResizerProps = {
  className?: string;
  handleClassName?: string;
  direction?: 'x' | 'y';
  onResizeStart?: ResizeFunc;
  onResize: (diff: number) => void;
  onResizeEnd?: ResizeFunc;
  handle?: React.ReactElement<DefaultHandleProps>;
  children: React.ReactNode;
  style?: CSSProperties;
};

function Resizer(props: ResizerProps) {
  const {
    className,
    handleClassName,
    direction = 'x',
    handle = <DefaultHandle />,
    children,
    style,
  } = props;
  const { onResizeStart, onResize, onResizeEnd } = props;

  const [active, setActive] = useState(false);
  const state = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const position = state.current;
    let diff = 0;

    if (direction === 'x') {
      diff = position.x - e.clientX;
      diff && onResize(-diff);
    }

    if (direction === 'y') {
      diff = position.y - e.clientY;
      diff && onResize(diff);
    }

    updateStartPosition(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    onResizeEnd && onResizeEnd(e);
    setActive(false);
    removeListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onResizeStart && onResizeStart(e);
    updateStartPosition(e);
    setActive(true);
    window.addEventListener('mouseup', handleMouseUp as any);
    window.addEventListener('mousemove', handleMouseMove as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStartPosition = useCallback((e: React.MouseEvent) => {
    state.current.x = e.clientX;
    state.current.y = e.clientY;
  }, []);

  const removeListeners = useCallback(() => {
    window.removeEventListener('mouseup', handleMouseUp as any);
    window.removeEventListener('mousemove', handleMouseMove as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => removeListeners, []);
  return (
    <div
      className={classnames('resizer', className, 'direction-' + direction, {
        active,
      })}
      style={style}
    >
      {React.cloneElement(handle, {
        className: classnames(handle?.props?.className, handleClassName),
        onMouseDown: handleMouseDown,
      })}
      {children}
    </div>
  );
}

export default React.memo(Resizer);
