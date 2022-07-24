import { IPluginActionType } from '../../../reducers/actions';
import { AsanyAction } from '../../../typings';
export declare enum SketchActionType {
    /**
     * 更新 Block 定制器
     */
    UpdateBlockCustomizer = "UpdateBlockCustomizer",
    Test = "Form/Test"
}
export interface ISketchState {
    count: number;
}
export default function reducer(state: ISketchState, action: AsanyAction<SketchActionType | IPluginActionType>): ISketchState;
