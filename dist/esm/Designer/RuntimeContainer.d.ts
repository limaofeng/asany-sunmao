import React from 'react';
interface RuntimeContainerProps {
    children: React.ReactElement;
}
declare function RuntimeContainer({ children, ...props }: RuntimeContainerProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default RuntimeContainer;
