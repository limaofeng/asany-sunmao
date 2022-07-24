import { DependencyList } from 'react';
export declare function useDebounce<T extends (...args: any) => any>(fn: T, delay: number, deps?: DependencyList): import("lodash").DebouncedFunc<T>;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: DependencyList): void;
export declare function useDeepCompareMemo<T>(factory: () => T, dependencies?: DependencyList): T;
export declare const dispatchWindowResize: import("lodash").DebouncedFunc<() => void>;
export declare const sleep: (time: number) => Promise<unknown>;
export declare const visibleFilter: (props: any) => ({ visible }: any) => any;
export declare function generateUUID(): string;
