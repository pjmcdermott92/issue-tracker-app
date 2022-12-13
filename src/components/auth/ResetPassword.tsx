import { FormEvent, useState, useRef, useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { resetPassword, verifyResetToken } from '../../services/auth-service';
import CreatePasswordForm from './CreatePasswordForm';
import Loader from '../ui/Loader/Loader';
import withPageTitle from '../../hoc/withPageTitle';

type ResetPasswordProps = { setPageTitle: any };
type ResetPasswordFormProps = { token: string };

const ResetPassword = ({ setPageTitle }: ResetPasswordProps) => {
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const {loading, error, isValid: validToken} = useVerifyResetToken(token);

    if (!token?.length) return <Navigate to='/login' />

    return (
        <div className='card rounded p-2'>
            {loading && <Loader overlay />}
            {
                validToken
                    ? <ResetPasswordForm token={token} />
                    : <InvalidTokenMessage setPageTitle={setPageTitle} />
            }
            <p className='m-1 text-center'><Link to='/login'>Back to Login</Link></p>
        </div>
    )
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [isReset, setIsReset] = useState<boolean>(false);

    const onChangePassword = async (password: string) => {
        setLoading(true);
        setError(undefined);
        const res = await resetPassword(token, password);
        if (!res.success) {
            if (res.status >= 500) setError(res.message);
        } else {

        }
        setIsReset(true);
        setLoading(false);
    }

    if (isReset) return (
        <>
        <h3 className='text-success text-center my-1'>PASSWORD SUCCESSFULLY RESET</h3>
        <p className='mb-1'>Your password has been reset. You can now login using your new password.</p>
        </>
    )

    return (
        <>
        {loading && <Loader overlay />}
        <h2 className='text-md my-1'>Create a New Password</h2>
        <p className='mb-1'>Create a new password below to regain access to your account.</p>
        {error && <div className='my-1 alert alert-danger'>{error}</div>}
        <CreatePasswordForm handleSubmit={onChangePassword} />
        </>
    )
}

function InvalidTokenMessage({ setPageTitle }: ResetPasswordProps) {
    useEffect(() => setPageTitle('Link Invalid or Expired'), []);
    return (
        <>
        <h4 className='text-danger mb-1 text-center'>
            Link Invalid or Expired
        </h4>
        <p className='mt-1'>Your password reset link is either invalid or has expired.</p>
        <p className='my-1'>If you need to reset your password, please <Link to='/login/forgot-password'>request a new link</Link>.</p>
        </>
    )
}

function useVerifyResetToken(token: string | null) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);

    const checkToken = async () => {
        const res = await verifyResetToken(token!);
        if (!res.success) {
            if (res.status === 400) setIsValid(false);
            else if (res.status >= 500) setError(res.message);
        } else {
            setIsValid(true);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        if (!token?.length) return;
        checkToken();
    }, [token]);

    return {loading, error, isValid};
}

export default withPageTitle(ResetPassword, 'Reset Password');
