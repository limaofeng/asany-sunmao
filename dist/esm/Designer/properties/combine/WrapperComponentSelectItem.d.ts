import React, { MutableRefObject } from 'react';
import { IMultipleWrapperData } from './MultipleWrapper';
export interface WrapperItemProps {
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
    tagPrefix: string;
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
export declare const AnyComponent: (props: {
    componentId?: string;
}) => JSX.Element | null;
