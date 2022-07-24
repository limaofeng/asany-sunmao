/// <reference types="react" />
export declare function generateUUID(): string;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object): void;
export declare function getMetadata(target: any): any;
export declare function copyMetadata(from: any, to: any): void;
export declare const sleep: (time: number) => Promise<unknown>;
