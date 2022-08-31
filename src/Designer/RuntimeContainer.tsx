import React from 'react';

interface RuntimeContainerProps {
  children?: React.ReactElement;
}

function RuntimeContainer({ children }: RuntimeContainerProps) {
  return <>{children}</>;
}

export default RuntimeContainer;
