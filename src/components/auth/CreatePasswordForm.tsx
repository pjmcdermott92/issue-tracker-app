import { useState, useEffect, FormEvent } from 'react';
import { IoKeyOutline, IoCheckmark, IoAlert } from 'react-icons/io5';
import FormControl from '../forms/FormControl/FormControl';
import FormButton from '../forms/FormButton';
import s from './auth.module.scss';

type CreatePasswordFormProps = { handleSubmit: any };
type PasswordChecklistProps = { password: string, setIsValid: any };

const CreatePasswordForm = ({ handleSubmit }: CreatePasswordFormProps) => {
    const [showPasswordChecklist, setShowPasswordChecklist] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const passwordsMatch = passwordValid && password === confirmPassword;    

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!passwordValid || !passwordsMatch) return;
        handleSubmit(password);
    }

    return (
        <form onSubmit={onSubmit} className={s.authForm}>
            <FormControl
                name='password'
                type='password'
                label='Create Password'
                value={password}
                icon={IoKeyOutline}
                onBlur={() => setShowPasswordChecklist(() => passwordValid ? false : true)}
                onFocus={() => setShowPasswordChecklist(true)}
                onChange={(e: any) => setPassword(e.target!.value)}
                required
                autoFocus
            />
            { showPasswordChecklist && 
                <PasswordChecklist
                    password={password}
                    setIsValid={setPasswordValid}
                />
            }
            <FormControl
                name='password2'
                type='password'
                label='Confirm Password'
                value={confirmPassword}
                icon={IoKeyOutline}
                onChange={(e: any) => setConfirmPassword(e.target!.value)}
                required
            />
            {passwordValid && (
                <ul className={s.passwordChecklist}>
                    <li className={passwordsMatch ? s.valid : ''}>
                        <div>{passwordsMatch ? <IoCheckmark /> : <IoAlert />}</div>
                        <p>Passwords must match</p>
                    </li>
                </ul>
            )}
            <FormButton disabled={!passwordValid || !passwordsMatch}>Create Password</FormButton>
        </form>
    );
}

function PasswordChecklist({ password, setIsValid }: PasswordChecklistProps) {
    const isLength = password!.length >= 8 && password!.length <= 20;
    const hasUpperCaseChar = /([A-Z])/g.test(password!);
    const hasLowerCaseChar = /([a-z])/g.test(password!);
    const hasSpecialChar = /([@#$!%*?&])/g.test(password!);
    const isValid =
        isLength &&
        hasLowerCaseChar &&
        hasUpperCaseChar &&
        hasSpecialChar;

    useEffect(() => { setIsValid(isValid); }, [password]);
    
    return (
        <ul className={s.passwordChecklist}>
            <li className={isLength ? s.valid : ''}>
                <div>{isLength ? <IoCheckmark /> : <IoAlert />}</div>
                <p>Password must be between 8 and 20 characters in length</p>
            </li>
            <li className={hasUpperCaseChar ? s.valid : ''}>
                <div>{hasUpperCaseChar ? <IoCheckmark /> : <IoAlert />}</div>
                <p>Password must contain at least 1 uppercase letter (A-Z)</p>
            </li>
            <li className={hasLowerCaseChar ? s.valid : ''}>
                <div>{hasLowerCaseChar ? <IoCheckmark /> : <IoAlert />}</div>
                <p>Password must contain at least 1 lowercase letter (a-z)</p>
            </li>
            <li className={hasSpecialChar ? s.valid : ''}>
                <div>{hasSpecialChar ? <IoCheckmark /> : <IoAlert />}</div>
                <p>Password must contain at least 1 of the following special characters: @ # $ ! % * ? &</p>
            </li>
        </ul>
    );
}

export default CreatePasswordForm;
