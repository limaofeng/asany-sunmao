import React, { ComponentType, DependencyList, FC } from 'react';
export interface ReactComponent {
    [key: string]: React.ReactElement | ReactComponent | any;
}
export interface ILibraryDefinition {
    name: string;
    tags: ComponentTreeNode[];
    components: IComponentDefinition[];
}
export interface ITemplate {
    id: string;
    name: string;
    tags: string[];
    component: React.ReactElement<any>;
    configuration: React.ReactElement<any>;
}
export interface ICloudComponent extends FC<any> {
    info: IComponentDefinition;
    [key: string]: any;
}
export declare enum IComponentCategory {
    Page = 0,
    Symbol = 1
}
export declare enum IComponentPlatform {
    web = 0,
    mobile = 1
}
export declare type IFieldType = 'String' | 'Text' | 'Integer' | 'Float' | 'Boolean' | 'Date' | 'DateTime' | 'JSON' | 'Asset' | 'Enum';
export declare type SubscribeCallback = () => void;
export declare type ComponentSelector = (component: IComponentDefinition) => boolean;
export declare type ComponentSorter = (a: IComponentDefinition, b: IComponentDefinition) => number;
export declare type ComponentPropertyRendererSetting = {
    component: ComponentPropertyRenderer | ComponentType<any> | string;
    props: {
        [key: string]: any;
    };
};
export declare type ComponentPropertyRenderer = string | ComponentType<any> | ComponentPropertyRendererSetting | any;
export declare type VisibleFunc = (props: any) => boolean;
declare type DepType = ((state: any) => any | Promise<any>) | string[];
export interface IField {
    name: string;
    /**
     *  显示名称
     * 为空时，不在配置面板中显示
     */
    label?: string;
    /**
     * 布局
     */
    layout?: 'Inline' | 'Stacked';
    /**
     * 隐藏 Lable
     */
    hiddenLabel?: boolean;
    /**
     * 占位符
     */
    placeholder?: string;
    type: IFieldType;
    /**
     * 渲染器
     */
    renderer?: ComponentPropertyRenderer;
    /**
     * 包装器， 用于实现数组类数据
     */
    wrappers?: ComponentPropertyRenderer[];
    multiple?: boolean;
    enumeration?: any;
    defaultValue?: any;
    group?: string | boolean;
    required?: boolean;
    value?: any;
    valuePropName?: string;
    deps?: DepType;
    /**
     * 是否可见
     */
    visible?: boolean | VisibleFunc;
    /**
     * 钩子函数
     */
    hooks?: {
        options?: PluginOptions;
        init?: any;
        /**
         * 前置拦截
         */
        before?: any;
        /**
         * 转换器
         */
        convert?: any;
        /**
         * 后置拦截
         */
        after?: any;
    };
}
interface PluginOptions {
    merge: boolean;
}
export interface ComponentTreeNode {
    value: string;
    label: string;
    children: ComponentTreeNode[];
}
export interface IGroup {
    id: string;
    name?: string;
    layout?: 'Inline' | 'Stacked';
    fields: IField[];
}
export interface ComponentDragObject {
    /**
     * ID
     */
    id: string;
    /**
     * Drag Type
     */
    type: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 组件
     */
    component: string;
    /**
     * 支持扩展
     */
    [key: string]: any;
}
export declare type ComponentGroup = {
    title: string;
    type: string;
    createDragObject: CreateDragObjectFunc;
    components: IComponentDefinition[];
};
export declare type CreateDragObjectFunc = (component: IComponentDefinition) => ComponentDragObject;
export declare type IComponentDragObject = {
    title: string;
    type?: string;
    sorter?: ComponentSorter;
    selector: string | ComponentSelector;
    object?: CreateDragObjectFunc;
};
export interface IComponentDefinition<T = any> {
    /**
     * 名称
     */
    name: string;
    /**
     * 组件标题
     */
    title?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 封面图
     */
    cover?: string;
    /**
     * 组件
     */
    component: ComponentType<T>;
    /**
     *  组件标签
     */
    tags?: string[];
    /**
     * 权重
     */
    boost?: number;
    /**
     * 可以使用的子组件 (用于拖拽支持)
     */
    symbols?: IComponentDragObject[];
    /**
     * 配置属性定义
     */
    props?: IField[];
    /**
     * 所属组件库
     */
    library?: ILibraryDefinition | string;
    /**
     * 额外信息
     */
    [key: string]: any;
}
export declare type LibraryMetadata = {
    /**
     * 名称
     */
    name: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 支持通过配置 namespace 减少每个组件上的路径设置
     */
    namespace?: string;
};
export interface ComponentMetadata {
    /**
     * 组件名称 (唯一)
     * 默认为字段名
     */
    name?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 封面图
     */
    cover?: string;
    /**
     * 组件标题
     */
    title?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 组件标签
     */
    tags?: string[];
    /**
     * 可以使用的子组件 (用于拖拽支持)
     */
    symbols?: IComponentDragObject[];
    /**
     * 额外信息
     */
    [key: string]: any;
}
export declare const METADATA_KEY_COMPONENTS = "_COMPONENTS";
declare type UnsubscribeFunc = () => void;
declare type SubscribeFunc = (callback: SubscribeCallback) => UnsubscribeFunc;
export declare type ReactComponentActionType = 
/**
 * 注册区块
 */
'RegistrationBlock'
/**
 * 卸载区块
 */
 | 'UninstallBlock'
/**
 * 更新 Block 数据
 */
 | 'UpdateBlockProps'
/**
 * 更新 Block 数据
 */
 | 'UpdateAllBlockProps'
/**
 * 更新 Block 定制器
 */
 | 'UpdateBlockCustomizer';
export interface ReactComponentAction {
    type: ReactComponentActionType;
    payload?: any;
}
export declare type DispatchWithoutAction = (action: ReactComponentAction) => void;
export declare type UpdateFunc<T> = (props: T | string, value?: any) => void;
export interface IFieldGroup {
    id: string;
    name?: string;
    visible?: boolean | VisibleFunc;
    layout?: 'Inline' | 'Stacked';
}
export interface ITabPane {
    name: string;
    visible?: boolean | VisibleFunc;
    groups: string[] | IFieldGroup[];
    customizer?: ICustomizer;
}
export interface ICustomizer {
    /**
     * ？还未想好怎么表述
     */
    frame?: boolean;
    /**
     * 选项卡
     */
    tabs?: ITabPane[];
    /**
     * 字段分组设置
     */
    groups?: IFieldGroup[];
    /**
     * 配置字段
     */
    fields: IField[];
}
export interface IBlockData<T = any> {
    id: string;
    key: string;
    icon: string;
    title: string;
    props?: T;
    update: UpdateFunc<T>;
    component: string;
    customizer?: ICustomizer;
    version?: number;
}
export interface IReactComponentState {
    blocks: IBlockData[];
}
export declare type IReactComponentStoreContext = {
    id: string;
    getBlock: (key: string) => IBlockData | undefined;
    getState: () => IReactComponentState;
    subscribe: SubscribeFunc;
    dispatch: DispatchWithoutAction;
};
export interface ReactComponentProviderProps {
    id?: string;
    children: React.ReactNode;
    value: IBlockData<any>[];
    version?: number;
    dev: boolean;
}
export interface IComponentBlockData {
    key: string;
    props: any;
}
export interface IBlockState {
    version: number;
    definition: IComponentDefinition;
    blocks: IBlockData<any>[];
}
export declare type IBlockCoreData = {
    key: string;
    icon: string;
    title: string;
    component: string;
    props: any;
};
export interface IUpdateBlockData {
    key: string;
    props: any;
}
export declare type Selector<Selected> = (state: IReactComponentState) => Selected;
export declare type EqualityFn<Selected> = (theNew: Selected, latest: Selected) => boolean;
export interface IBlockDataProps {
    [key: string]: any;
}
export interface IBlockOptions<T> {
    key: string;
    icon: string;
    title: string;
    props?: T;
    customizer?: ICustomizer;
}
export declare type IBlockProviderProps<P> = {
    ref?: any;
    as?: React.ComponentType<P> | React.ReactElement | string;
    children?: React.ReactNode;
    deps?: DependencyList | undefined;
};
export declare type DivProvider = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface IUseBlockState<T, P = DivProvider> extends IBlockData<T> {
    onClick: (e?: React.MouseEvent) => void;
    update: UpdateFunc<T>;
    props: T;
    Provider: React.ComponentType<IBlockProviderProps<P> & P>;
}
export declare type IUseBlock<T, P = DivProvider> = IUseBlockState<T, P>;
export declare type UseBlockCache<T, P> = {
    id: string;
    key: string;
    options: IBlockOptions<T>;
    result: IUseBlock<T, P>;
};
export declare type DataSet<R> = {
    loading?: boolean;
    data?: R[];
    error?: any;
};
export declare type DataField = {
    id: string;
};
export declare type DataFilter = {
    id: string;
};
export declare type DatasetConfig = {
    fields: DataField[];
    filters: DataFilter[];
};
export interface GraphQLDatasetConfig {
    gql: string;
    variables?: any;
}
export interface DataSourceLoader<P = any> {
    type: string;
    load(param?: P): DataSource;
}
export interface DataSource {
    dataset<T, P>(param: P): Promise<DataSet<T>>;
}
export declare const defaultEqualityFn: (a: any, b: any) => boolean;
export interface IComponentTagDefinition {
    id?: number;
    path: string;
    name: string;
    parentPath?: string;
    library: string;
    count?: number;
}
export interface IComponentLibraryDefinition {
    id?: string;
    name?: string;
    type?: 'local' | 'remote';
    description?: string;
    tags: IComponentTagDefinition[];
    components: IComponentDefinition[];
    total?: number;
}
export interface CheckPoint {
    id?: string;
    name: string;
    version?: Date | string;
}
export {};
