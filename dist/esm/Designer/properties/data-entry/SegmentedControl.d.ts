import { CSSProperties } from 'react';
export interface SegmentedControlOption {
    label: string;
    value: string;
    icon?: string;
}
interface SegmentedControlProps {
    style?: CSSProperties;
    className?: string;
    options: SegmentedControlOption[];
    value?: string;
    onChange?: (state: string) => void;
}
declare const SegmentedControl: (props: SegmentedControlProps) => JSX.Element;
export default SegmentedControl;
