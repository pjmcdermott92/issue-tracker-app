import { forwardRef, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import s from './FormControl.module.scss';

interface FormControlProps {
    name: string
    type?: string
    label: string
    ref?: any
    value?: string | number
    required?: boolean
    onChange?: () => void
    autoFocus?: boolean
    as?: string,
    icon?: any
}

type PasswordIconProps = { revealPassword: boolean, setRevealPassword: any };

const FormControl = forwardRef(({ name, label, type, value, onChange, as, icon: Icon, ...props }: FormControlProps, ref) => {
    const [revealPassword, setRevealPassword] = useState<boolean>(false);
    const inputType = type === 'password' && revealPassword ? 'text' : type;
    const showIcon = Icon ? <label htmlFor={name} className={s.prependedIcon}><Icon /></label> : null;

    if (as === 'textarea') return (
        <div className={s.formControl}>
            <textarea
                ref={ref}
                name={name}
                id={name}
                placeholder={label}
                onChange={onChange}
                defaultValue={value}
                {...props}
            />
        </div>
    );

    return (
        <div className={s.formControl}>
            {showIcon}
            <input
                ref={ref}
                name={name}
                id={name}
                type={inputType}
                placeholder={label}
                onChange={onChange}
                value={value}
                {...props}
            />
            {type === 'password'
                ? <PasswordIcon
                    revealPassword={revealPassword}
                    setRevealPassword={setRevealPassword}
                /> : null}
        </div>
    );
});

function PasswordIcon({ revealPassword, setRevealPassword }: PasswordIconProps) {
    return (
        <div
            className={s.passwordToggleBtn}
            onMouseDown={() => setRevealPassword(true)}
            onMouseUp={() => setRevealPassword(false)}
            title='Reveal Password'
        >
            {revealPassword ? <IoEyeOff /> : <IoEye />}
        </div>
    );
}

export default FormControl;
