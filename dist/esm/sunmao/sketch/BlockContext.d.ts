import React from 'react';
import { UseBlockCache } from '../typings';
export interface IBlockContext {
    parentBlockKey?: string;
}
export declare const BlockContext: React.Context<IBlockContext>;
export declare type BlockRootProviderProps = {
    children: React.ReactNode;
};
export declare function BlockRootProvider(props: BlockRootProviderProps): JSX.Element;
export declare function buildBlockProvider(blockKey: string, cache: React.RefObject<UseBlockCache<any, any>>): React.ComponentType<any>;
export declare function useBlockContext(key: string): {
    parentBlockKey: string | undefined;
    key: string;
};
