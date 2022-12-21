import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import s from './OffCanvas.module.scss';

type OffCanvasProps = {
    open: boolean
    close: () => void
    title: string
    children: React.ReactNode
    footerLink?: { path: string, text: string }
}

const OffCanvas = forwardRef(({ open, close, title, children, footerLink }: OffCanvasProps, ref: any) => {

    if (!open) return null;
    return (
        <div className={s.offCanvas} ref={ref}>
            <div className='card'>
                <div className={`card__header ${s.header}`}>
                    <h3 className='text-md'>{title}</h3>
                    <button
                        title={`Close ${title}`}
                        onClick={close}
                    >
                        &times;
                    </button>
                </div>
                <div className={s.body}>
                    {children}
                </div>
                {footerLink && <div className={`card__footer ${s.footer}`}>
                    <Link to={footerLink.path}>{footerLink.text}</Link>
                </div>}
            </div>
        </div>
    )
});

export default OffCanvas;
