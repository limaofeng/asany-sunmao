import { Feature, FeaturesHelper, IAsanyEditor } from '../typings';
export default class FeaturesHelperImpl implements FeaturesHelper {
    private editor;
    constructor(editor: IAsanyEditor);
    has(feature: Feature): boolean;
    zoom(enable: boolean): void;
    drag(enable: boolean): void;
    selecto(enable: boolean): void;
    ruler(enable: boolean): void;
}
