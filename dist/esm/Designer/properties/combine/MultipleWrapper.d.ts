import React from 'react';
export interface IMultipleWrapperData<T> {
    /** 标识 唯一值 (后续删除 20.7.21) */
    id: string;
    /** 显示的图标 */
    icon?: string;
    /** 展示名称 */
    name?: string;
    /** 可以编辑名称 */
    canEditName?: boolean;
    /** 当前项可以排序 */
    sortable?: boolean;
    /** 是否为预设项 */
    isPreset?: boolean;
    editing?: boolean;
    /**
     * 当前项目 是否是可使用状态(系统预设值)，
     * 如果为用户添加项，该值一定为 false
     */
    isDelete?: boolean;
    data?: T;
    [key: string]: any;
}
export interface MultipleWrapperProps {
    /** 配置标题 */
    name?: string;
    placeholder?: string;
    /** 孩子组件 */
    children: React.ReactElement;
    /** 可以添加项目,显示按钮且可以使用 */
    canAddItem: boolean;
    /** 可以对项目排序 */
    canSortItem: boolean;
    /** 选项显示名 */
    itemName: string;
    itemClassName?: string;
    itemRender?: ItemRender;
    /** 预设项目 */
    presetValue: IMultipleWrapperData<any>[];
    /** 当创建完成立即展示 popover */
    immediatelyShowPopoverWhenCreated: boolean;
    value: any[];
    isObject?: boolean;
    initializer?: (data: IMultipleWrapperData<any>) => any;
    onChange: (value: IMultipleWrapperData<any>[]) => void;
    pipeline?: (value: IMultipleWrapperData<any>[], current: IMultipleWrapperData<any>) => IMultipleWrapperData<any>[];
}
declare type ItemRender = (props: any) => React.ReactElement;
export declare function MultipleWrapper<T>(props: MultipleWrapperProps): JSX.Element;
export declare namespace MultipleWrapper {
    var defaultProps: {
        canSortItem: boolean;
        immediatelyShowPopoverWhenCreated: boolean;
        canAddItem: boolean;
    };
}
declare const _default: React.MemoExoticComponent<typeof MultipleWrapper>;
export default _default;
