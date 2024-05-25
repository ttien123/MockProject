import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    classNameLabel?: string;
    labelName?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    {
        className,
        errorsMessage,
        classNameInput = 'w-full shadow-inputBS py-3 px-4 outline-none rounded-[4px] bg-transparent text-[14px]',
        classNameError = 'mt-1 mb-1 text-red-600 min-h-[21px] font-semibold text-[14px]',
        onChange,
        value = '',
        classNameLabel = 'mb-2 block font-semibold text-[14px]',
        labelName,
        ...rest
    },
    ref,
) {
    const [localValue, setLocalValue] = useState<string>(value as string);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d+$/.test(value) || value === '') {
            onChange && onChange(event);
            setLocalValue(value);
        }
    };
    return (
        <div className={className}>
            <label className={classNameLabel}>
                <span className="text-[14px] label-text">{labelName}</span>
            </label>
            <input
                className={classNameInput}
                {...rest}
                value={value === undefined ? localValue : value}
                onChange={handleChange}
                ref={ref}
            />
            <div className={classNameError}>{errorsMessage}</div>
        </div>
    );
});

export default InputNumber;
