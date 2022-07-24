export default class Debugger {
    private isDebug?;
    constructor(isDebug?: boolean | undefined);
    log(...args: any[]): void;
}
