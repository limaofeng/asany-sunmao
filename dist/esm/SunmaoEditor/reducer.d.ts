import { ICustomizer } from '../sunmao';
import { AsanyAction, IPluginActionType } from '../Designer';
export declare enum SketchActionType {
    /**
     * 更新 Block 定制器
     */
    USER_CUSTOMIZER = "USER_CUSTOMIZER",
    BLOCK_ACTIVE_KEY = "BLOCK_ACTIVE_KEY",
    BLOCK_MOUSE_ENTER = "BLOCK_MOUSE_ENTER",
    BLOCK_MOUSE_LEAVE = "BLOCK_MOUSE_LEAVE"
}
export interface ISketchState {
    value?: any;
    customizer?: ICustomizer;
    activeKey?: string;
    stack: string[];
    change?: (value: any) => void;
}
export default function reducer(state: ISketchState, action: AsanyAction<SketchActionType | IPluginActionType>): ISketchState;
