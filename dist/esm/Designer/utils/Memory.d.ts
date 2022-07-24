export default class Memory {
    map: Map<any, any>;
    get(key: any): any;
    set(key: any, value: any): Map<any, any>;
    clear(): void;
}
