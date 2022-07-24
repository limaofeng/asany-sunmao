import type { AsanyProjectType, IAsanyState } from '../typings';
export declare const getPlugins: (state: IAsanyState, projectType: AsanyProjectType) => import("../typings").EditorPlugin[];
export declare const getReducers: (state: IAsanyState, projectType: AsanyProjectType) => ((state: any, action: import("../typings").AsanyAction<any>) => any) | undefined;
export declare const getScena: (state: IAsanyState, projectType: AsanyProjectType) => any;
export declare function getFeatures(state: IAsanyState, projectType: AsanyProjectType): string[];
export declare function getToolbar(state: IAsanyState, projectType: AsanyProjectType): any;
export declare function getSidebar(state: IAsanyState, projectType: AsanyProjectType): any;
