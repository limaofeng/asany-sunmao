import React from 'react';
import { IField } from 'sunmao';
import './style/WrapperPopoverContent.less';
export interface PopoverFields<T> {
    /** 传递 fields 或者 根据当前的 value 某些值获得 fields 的函数 */
    fields: ((value: T) => IField[]) | IField[];
}
export interface WrapperPopoverContentProps<T> extends PopoverFields<T> {
    /** 目前只用于点击内部, popover-content 不消失 */
    contentRef: any;
    /** content 宽度，目前只支持 px 和 百分比，后期可以提供 sm md lg 等 */
    width: string;
    /** content 最大高度，最大高度， 目前只支持 px 和 百分比 */
    maxHeight: string;
    value: T;
    onClose: () => void;
    onChange: (item: T) => void;
}
declare function WrapperPopoverContent(props: WrapperPopoverContentProps<any>): JSX.Element;
declare namespace WrapperPopoverContent {
    var defaultProps: {
        maxHeight: string;
        width: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof WrapperPopoverContent>;
export default _default;
