import { Suspense, forwardRef } from 'react';
import Loader from '../../ui/Loader/Loader';
import OffCanvas from '../../ui/OffCanvas/OffCanvas';
import s from './Header.module.scss';

type MessagesProps = { open: boolean, close: () => void }

const Messages = forwardRef(({ open, close }: MessagesProps, ref: any) => {
    return (
        <OffCanvas
            ref={ref}
            title='Messages'
            open={open}
            close={close}
            footerLink={{
                path: '/messages',
                text: 'View All Messages'
            }}
        >
            <Suspense fallback={<Loader />}>
                MESSAGES...
            </Suspense>
        </OffCanvas>
    )
});

export default Messages;
