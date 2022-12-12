import { useRef } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '../forms/FormControl/FormControl';
import FormButton from '../forms/FormButton';
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';
import s from './auth.module.scss';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    return (
        <>
        <div className='card rounded p-2'>
            <h2>Log In</h2>
            <p className='my-1'>Enter your email address and password to log in.</p>
            <form className={s.authForm}>
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
                <p className='mx-1 text-center'><Link to='forgot-password'>Forgot Password?</Link></p>
            </form>
        </div>
        <DemoLogins />
        </>
    )
}

function DemoLogins() {
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
                    >
                        Demo {role.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Login;
