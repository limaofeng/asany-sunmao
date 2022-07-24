import React, { ComponentType } from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { LoadingComponentProps } from './components/scena/LoadingComponent';
import { AsanyProject, EditorPlugin, IAsanyEditor } from './typings';
import './icons';
import './style/tailwind.css';
import './style/index.less';
interface AsanyWarpperProps {
    className?: string;
    loading?: React.ComponentType<LoadingComponentProps>;
    project: AsanyProject;
    wrapper?: ComponentType<any>;
    container?: ComponentType<any>;
    plugins?: EditorPlugin[];
    onSave?: (data: AsanyProject) => void;
    onBack?: () => void;
    children?: React.ReactNode;
}
declare const _default: React.ForwardRefExoticComponent<AsanyWarpperProps & React.RefAttributes<IAsanyEditor>>;
export default _default;
