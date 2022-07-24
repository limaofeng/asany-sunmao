import React from 'react';
interface SpinKitProps {
    name: 'Bounce' | 'Chase' | 'Circle' | 'CircleFade' | 'Flow' | 'Fold' | 'Grid' | 'Plane' | 'Pulse' | 'Swing' | 'Wander' | 'Wave';
}
declare function SpinKit({ name }: SpinKitProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default SpinKit;
