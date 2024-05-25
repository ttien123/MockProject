import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    classNameLabel?: string;
    extendClassNameInput?: string;
    classNameWrapper?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
    labelName?: string;
}

const Input = ({
    register,
    errorsMessage,
    name,
    type = 'text',
    rules,
    classNameWrapper,
    classNameInput = 'w-full shadow-inputBS py-3 px-4 outline-none rounded-[4px] bg-transparent',
    classNameError = 'mt-1 mb-1 text-red-600 min-h-[21px] font-semibold text-[14px]',
    classNameLabel = 'mb-2 block font-semibold text-[14px]',
    placeholder,
    labelName,
    extendClassNameInput,
    ...rest
}: Props) => {
    const registerResult = register && name ? register(name, rules) : null;

    return (
        <div className={classNameWrapper}>
            <label className={classNameLabel}>
                <span className="text-[14px] label-text">{labelName}</span>
            </label>
            <input
                placeholder={placeholder}
                autoComplete="current-password"
                type={type}
                className={classNameInput + ' ' + extendClassNameInput}
                {...registerResult}
                {...rest}
            />
            <div className={classNameError}>{errorsMessage}</div>
        </div>
    );
};

export default Input;
