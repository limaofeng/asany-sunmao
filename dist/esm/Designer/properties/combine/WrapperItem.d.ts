import React, { MutableRefObject } from 'react';
import { IMultipleWrapperData } from './MultipleWrapper';
export declare const SortableHandler: () => JSX.Element;
export interface WrapperItemProps {
    /** 名称只读 */
    nameReadonly: boolean;
    placeholder?: string;
    /** 名称链接 对应 数据的某个key */
    nameLink?: string;
    displayField?: string;
    /** 可以编辑(显示编辑图标) */
    editable: boolean;
    /** 可以删除(显示删除图标) */
    canDelete: boolean;
    /** 拖拽 ref, 直接发布到想要拖拽的 dom 元素或者组件上 */
    drag: any;
    /** 目前只用于点击编辑按钮, popover-content 不消失 */
    itemRef: MutableRefObject<any>;
    data: IMultipleWrapperData<any>;
    onDelete: (item: any) => void;
    onChange: any;
    onEdit: (item?: any) => void;
}
declare function WrapperItem(props: WrapperItemProps): JSX.Element;
declare namespace WrapperItem {
    var defaultProps: {
        canDelete: boolean;
        sortable: boolean;
        displayField: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof WrapperItem>;
export default _default;
