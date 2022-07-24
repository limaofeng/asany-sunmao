import React from 'react';
import type { AsanyAction, AsanyProject, AsanyProviderMode, EditorPlugin, IAsanyState } from './typings';
declare type UnsubscribeFunc = () => void;
declare type SubscribeCallback = () => void;
declare type SubscribeFunc = (callback: SubscribeCallback) => UnsubscribeFunc;
export declare type DispatchWithoutAction<T> = (action: AsanyAction<T>) => void;
export declare type IAsanyStoreContext<D> = {
    getState: () => IAsanyState;
    subscribe: SubscribeFunc;
    dispatch: DispatchWithoutAction<D>;
};
/**
 * 创建Content状态
 */
export declare const AsanyContext: React.Context<IAsanyStoreContext<any>>;
export interface AsanyProviderProps {
    children: JSX.Element;
    mode?: AsanyProviderMode;
    plugins?: EditorPlugin[];
    value?: AsanyProject;
    version?: number;
}
export declare const AsanyProvider: (props: AsanyProviderProps) => JSX.Element;
export interface IAsanyStateContext extends IAsanyState {
}
export {};
