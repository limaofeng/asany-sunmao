import React, { CSSProperties, useEffect, useState } from 'react';

import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import SpinKit from '../spinkit';

export interface LoadingComponentProps {
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}

function LoadingComponent(props: LoadingComponentProps) {
  const { className, style } = props;

  const [loading, setLoading] = useState(false);

  const handleAddEndListener = (node: HTMLElement, done: () => void) => {
    node.addEventListener('transitionend', done, false);
  };

  useEffect(() => {
    setLoading(!!props.loading);
  }, [props.loading]);

  return (
    <CSSTransition
      in={!!loading}
      addEndListener={handleAddEndListener}
      classNames="asany-editor-loading"
    >
      <div style={style} className={classnames('asany-editor-loading', className)}>
        <SpinKit name="Wave" />
      </div>
    </CSSTransition>
  );
}

export default React.memo(LoadingComponent);
