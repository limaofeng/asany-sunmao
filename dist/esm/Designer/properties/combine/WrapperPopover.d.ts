import React from 'react';
import { IMultipleWrapperData } from './MultipleWrapper';
import { PopoverFields } from './WrapperPopoverContent';
import './style/WrapperPopover.less';
interface WrapperPopoverProps<T> extends IMultipleWrapperData<T>, PopoverFields<T> {
    /**
     * 点击 编辑按钮 和 popoverContent 区域之外 直接关闭 popover
     * 注意: ( select 等 子元素 弹出层 会在 body 上挂载，并非 区域内 )
     */
    closeOnClickAway: boolean;
    /** 初始化是否显示 (老数据 为 false, 新数据 为 true) */
    showPopoverImmediatelyAtCreated: boolean;
    /** wrapper 包裹的子元素 */
    children: React.ReactElement;
    /** 组件 */
    ContentRenderer: React.JSXElementConstructor<T>;
    /** 宽度，目前只提供 px */
    width: string;
    onChange: (value: any) => void;
}
declare function WrapperPopover(props: WrapperPopoverProps<any>): JSX.Element;
declare namespace WrapperPopover {
    var defaultProps: {
        /** 点击其他地方关闭当前 */
        closeOnClickAway: boolean;
    };
}
declare const _default: React.MemoExoticComponent<typeof WrapperPopover>;
export default _default;
