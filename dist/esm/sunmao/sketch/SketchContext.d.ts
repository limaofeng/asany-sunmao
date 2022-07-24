import React from 'react';
import { EqualityFn, IBlockCoreData, IBlockData, IReactComponentStoreContext, IUpdateBlockData, Selector } from '../typings';
declare type ReactComponentData = {
    id: string;
    store: IReactComponentStoreContext;
};
declare type EventCallback = (...params: any) => void;
declare type SketchEventName = 'block-click' | 'block-mouse-enter' | 'block-mouse-leave' | 'add-component' | 'remove-component' | 'update-component';
export declare class Sketch {
    private dev;
    private emitter;
    private _components;
    add(data: ReactComponentData): () => void;
    setDev(dev: boolean): void;
    isDev(): boolean;
    remove(id: string): void;
    get components(): ReactComponentData[];
    on(eventName: SketchEventName, callback: EventCallback): () => void;
    trigger(eventName: SketchEventName, ...params: any): void;
    getBlock(key: string): IBlockData | undefined;
    getComponent(key: string): ReactComponentData | undefined;
    updateComponent(id: string, data: IUpdateBlockData[]): void;
    updateBlock(id: string, props: any): void;
    getComponentData(id: string): IBlockCoreData[];
    useSelector<Selected>(id: string, selector: Selector<Selected>, equalityFn?: EqualityFn<Selected>): Selected;
}
export declare const SketchContext: React.Context<Sketch>;
interface SketchProviderProps {
    children: React.ReactNode;
}
export declare const SketchProvider: (props: SketchProviderProps) => JSX.Element;
export {};
