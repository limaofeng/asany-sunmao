import { ComponentType } from 'react';
import { ComponentSelector, ComponentTreeNode, DataSourceLoader, IComponentDefinition, ILibraryDefinition, ITemplate, SubscribeCallback } from './typings';
declare type AggregationLibrary = {
    [key: string]: ComponentType<any>;
};
declare class Sunmao {
    private libraries;
    private listeners;
    private templates;
    private components;
    private dataSourceLoaders;
    private library;
    private tags;
    addComponents(components: IComponentDefinition[]): void;
    addDataSourceLoader(loader: DataSourceLoader): void;
    getDataSourceLoader(type: string): DataSourceLoader<any> | undefined;
    /**
     * 添加 / 更新 组件
     * @param component 组件
     * @param repeatable 可重复
     * @param dispatch 触发监听
     * @param library 组件聚合对象
     */
    updateComponent(component: IComponentDefinition, dispatch?: boolean, repeatable?: boolean, library?: AggregationLibrary): AggregationLibrary;
    addLibrary(...librarys: ILibraryDefinition[]): void;
    addComponent(component: IComponentDefinition): void;
    addTemplate(template: ITemplate): void;
    getLibrary(name: string): ILibraryDefinition | undefined;
    getLibraries(): ILibraryDefinition[];
    getComponent(name: string): IComponentDefinition | undefined;
    getComponents(selector: ComponentSelector): IComponentDefinition[];
    getTreeDate(tag?: string | string[] | ComponentSelector): ComponentTreeNode[];
    private unsubscribe;
    dispatchSubscribe: () => void;
    subscribe: (callback: SubscribeCallback) => () => void;
}
export default Sunmao;
