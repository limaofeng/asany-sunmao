/// <reference types="react" />
interface InputProps {
    value?: string;
    placeholder?: string;
    className?: string;
    width?: number | 'adaptive';
    onChange?: (value: string) => void;
}
declare function Input(props: InputProps): JSX.Element;
export default Input;
