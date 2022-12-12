import { FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { loginUser } from '../../services/auth-service';
import FormControl from '../forms/FormControl/FormControl';
import FormButton from '../forms/FormButton';
import Loader from '../ui/Loader/Loader';
import withPageTitle from '../../hoc/withPageTitle';
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';
import s from './auth.module.scss';

type DemoLoginsProps = { disabled: boolean };

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const { getIdentity } = useAuth();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(undefined);
        try {
            const res = await loginUser({
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            });
            
            if (!res.success) {
                setError(res.message);
            } else {
                getIdentity();
            }
        } catch (err) {
            
        }
        passwordRef.current!.value = '';
        setLoading(false);
    }

    return (
        <>
        <div className='card rounded p-2'>
            {loading && <Loader overlay />}
            <h2>Log In</h2>
            {error && <div className='my-1 alert alert-danger'>{error}</div>}
            <p className='my-1'>Enter your email address and password to log in.</p>
            <form onSubmit={onSubmit} className={s.authForm}>
                <FormControl
                    name='email'
                    label='Email Address'
                    type='email'
                    ref={emailRef}
                    icon={IoMailOutline}
                    autoFocus
                    required
                />
                <FormControl
                    name='password'
                    label='Password'
                    type='password'
                    ref={passwordRef}
                    icon={IoKeyOutline}
                    required
                />
                <FormButton>Log In</FormButton>
            </form>
            <p className='mx-1 text-center'><Link to='forgot-password'>Forgot Password?</Link></p>
        </div>
        <DemoLogins disabled={loading} />
        </>
    )
}

function DemoLogins({ disabled }: DemoLoginsProps) {
    const DemoRoles = [
        { name: 'Admin' },
        { name: 'Project Manager' },
        { name: 'Developer' },
        { name: 'Submitter' },
    ];

    return (
        <div className={s.demoLoginOptions}>
            <h3>Demo Login</h3>
            <p className='mt-1'>Want to try out the app? Log in with a Demo account below.</p>
            <p className='mb-1 mt-2'>Login As:</p>
            <div className={s.demoLoginBtns}>
                {DemoRoles?.map(role => (
                    <button
                        key={role.name}
                        className='btn btn-100 btn-outline-light'
                        disabled={disabled}
                    >
                        Demo {role.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default withPageTitle(Login, 'Log In');
