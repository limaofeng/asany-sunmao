import React, { DependencyList } from 'react';
export declare function useDebounce<T extends (...args: any) => any>(fn: T, delay: number, deps?: DependencyList): import("lodash").DebouncedFunc<T>;
export interface TreeOptions<T> {
    idKey: string;
    pidKey: string;
    childrenKey?: string;
    getParentKey?: (data: T) => string;
    converter?: (data: T) => T;
    sort?: (l: T, r: T) => number;
}
export declare function tree<T>(list: T[], { idKey, pidKey, childrenKey, getParentKey, converter, sort, }: TreeOptions<T>): any[];
export declare function getElementViewPosition(element: any): {
    x: number;
    y: number;
};
export declare function urlToList(url: string): string[];
export declare const sleep: (time: number) => Promise<unknown>;
export declare function generateUUID(): string;
export declare const dispatchWindowResize: import("lodash").DebouncedFunc<() => void>;
export declare type ThrottleOptions = {
    compare: (a: any, b: any) => boolean;
};
export declare const throttle: (callback: Function, options?: ThrottleOptions | undefined) => {
    apply(...args: any): void;
};
export declare function LightenColor(hex: string, lum: number): string;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object): void;
export declare function getFieldValue(root: any, path: string): any;
export declare function setFieldValue<T>(root: T, path: string, value: any): T;
export declare function assign(target: any, ...sources: any[]): any;
