import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '../forms/FormControl/FormControl';
import FormButton from '../forms/FormButton';
import s from './auth.module.scss';

type SuccessMessageProps = { email: string };

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('pjmcdermott1992@gmail.com');

    return (
        <div className='card rounded p-2'>
            <h2>Forgot Password</h2>
            {isSubmitted ? <LinkSentMessage email={email} /> : <RequestForm />}
        </div>
    )
}

function RequestForm() {
    const emailRef = useRef<HTMLInputElement>();

    return (
        <>
        <p className='my-1'>To request a link to reset your password, enter the email address associated with your account below.</p>
        <form className={s.authForm}>
            <FormControl
                name='email'
                label='Email Address'
                type='email'
                ref={emailRef}
                autoFocus
                required
            />
            <FormButton>Request Link</FormButton>
        </form>
        <p className='mx-1 text-center'><Link to='/login'>Back to Login</Link></p>
        </>
    );
}

function LinkSentMessage({ email }: SuccessMessageProps) {
    return (
        <>
        <h3 className='text-success text-center my-1'>LINK SENT SUCCESSFULLY!</h3>
        <p className='mb-1'>A link has been sent to the email address <strong>{email}</strong>, with further instructions to reset your password.</p>
        <p className='mb-1'>If you do not receive this link within 5 minutes, be sure to check your Spam or Junk folder.</p>
        <p className='mb-1'><strong><em>NOTE:</em> This link is only valid for 15 minutes.</strong> After 15 minutes, the link will expire, and you will need to request a new link.</p>
        <p className='mx-1 text-center'><Link to='/login'>Back to Login</Link></p>
        </>

    )
}

export default ForgotPassword;