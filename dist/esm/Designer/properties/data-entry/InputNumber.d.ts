/// <reference types="react" />
interface InputNumberProps {
    value?: number;
    placeholder?: string;
    className?: string;
    onChange?: (number: string) => void;
}
declare function InputNumber(props: InputNumberProps): JSX.Element;
export default InputNumber;
