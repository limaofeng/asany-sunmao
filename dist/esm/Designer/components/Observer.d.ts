declare type CallbackFunc = (value: any, prevValue: any) => void | boolean | Promise<void>;
declare class BlockObserver<T> {
    private key;
    private values;
    private eventEmitter;
    constructor(key: string, values?: T);
    on(name: string, callback: CallbackFunc): void;
    off(name: string, callback: CallbackFunc): void;
    observe(values: T | any): void;
    clear(): void;
}
export default BlockObserver;
