import MoveableHelper from 'moveable-helper';
import { Frame, NameType } from 'scenejs';
import Memory from './Memory';
export default class MoveableData extends MoveableHelper {
    private memory;
    private selectedTargets;
    constructor(memory: Memory);
    setSelectedTargets(targets: Array<HTMLElement | SVGElement>): void;
    getSelectedTargets(): (HTMLElement | SVGElement)[];
    getSelectedFrames(): Frame[];
    renderFrames(): void;
    setOrders(scope: string[], orders: NameType[]): {
        id: string;
        prev: any;
        prevOrders: import("@daybrush/utils").IObject<(string | number)[]>;
        next: any;
        nextOrders: import("@daybrush/utils").IObject<(string | number)[]>;
    }[];
    setProperty(names: string[], value: any): {
        id: string;
        prev: any;
        prevOrders: import("@daybrush/utils").IObject<(string | number)[]>;
        next: any;
        nextOrders: import("@daybrush/utils").IObject<(string | number)[]>;
    }[];
    removeProperties(...names: string[]): {
        id: string;
        prev: any;
        prevOrders: import("@daybrush/utils").IObject<(string | number)[]>;
        next: any;
        nextOrders: import("@daybrush/utils").IObject<(string | number)[]>;
    }[];
    getProperties(properties: string[][], defaultValues: any[]): any[];
    private setValue;
}
