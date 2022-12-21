import { Suspense, forwardRef } from 'react';
import Loader from '../../ui/Loader/Loader';
import OffCanvas from '../../ui/OffCanvas/OffCanvas';
import s from './Header.module.scss';

type NotificationsProps = { open: boolean, close: () => void }

const Notifications = forwardRef(({ open, close }: NotificationsProps, ref: any) => {

    return (
        <OffCanvas
            ref={ref}
            title='Notifications'
            open={open}
            close={close}
        >
            <Suspense fallback={<Loader />}>
                Notifications...
            </Suspense>
        </OffCanvas>
    )
});

export default Notifications;
