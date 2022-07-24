/// <reference types="react" />
import { AutoSizeType } from './ScrubbableControl';
interface TextAreaProps {
    value?: string;
    placeholder?: string;
    className?: string;
    autoSize?: boolean | AutoSizeType;
    onChange?: (value: string) => void;
}
declare function TextArea(props: TextAreaProps): JSX.Element;
export default TextArea;
