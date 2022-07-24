import React from 'react';
import Sunmao from './Sunmao';
export declare const SunmaoContext: React.Context<{
    sunmao: Sunmao;
    debug: boolean;
}>;
interface SunmaoProviderProps {
    sunmao?: Sunmao;
    debug?: boolean;
    children: React.ReactNode;
}
declare function SunmaoProvider({ sunmao, debug, children }: SunmaoProviderProps): JSX.Element;
export default SunmaoProvider;
