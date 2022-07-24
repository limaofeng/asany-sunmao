import React from 'react';
import { DeviceScreen } from '../../../typings';
interface DeviceListProps {
    value: DeviceScreen;
    onChange: (value: DeviceScreen) => void;
}
/**
 * 设备列表
 * @param props
 */
export declare function DeviceList(props: DeviceListProps): any;
/**
 * 屏幕选择组件
 * @param props
 */
declare function DeviceScreenPicker(): JSX.Element;
export declare const ScreenPicker: React.MemoExoticComponent<typeof DeviceScreenPicker>;
export interface ScreenProps {
    children?: JSX.Element;
}
interface ScreenViewportProps {
    children: React.ReactNode;
    width?: number;
    height?: number;
    zoom?: number;
    scrollX?: number;
    scrollY?: number;
}
declare function ScreenViewport(props: ScreenViewportProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ScreenViewport>;
export default _default;
