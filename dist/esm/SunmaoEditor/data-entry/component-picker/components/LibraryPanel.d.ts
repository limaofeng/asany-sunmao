/// <reference types="react" />
import { ListTreeNode } from '../../../../Designer/typings';
interface LibraryPanelProps {
    value?: string;
    visible: boolean;
    treeData: ListTreeNode[];
    onChange: (name: string) => void;
}
declare function LibraryPanel(props: LibraryPanelProps): JSX.Element;
export default LibraryPanel;
