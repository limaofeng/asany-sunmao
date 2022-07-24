import React from 'react';
import { IComponentBlockData } from '../typings';
interface IOptions {
    id: string;
    dev?: boolean;
}
declare type ExternalProps = {
    children?: React.ReactNode;
    [key: string]: any;
};
export default function useReactComponent<T = ExternalProps>(id: string, injectProps?: IComponentBlockData[], options?: IOptions): React.ComponentType<T>;
export {};
