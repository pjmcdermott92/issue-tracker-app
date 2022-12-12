import s from './Loader.module.scss';

type LoaderProps = { fullscreen?: boolean, overlay?: boolean };

const Loader = ({ fullscreen, overlay }: LoaderProps) => {
    if (fullscreen) return (
        <div className={s.fullScreenWrapper}>
            <Loading />
        </div>
    );

    if (overlay) return (
        <div className={s.overlayWrapper}>
            <Loading />
        </div>
    );

    return <Loading />
}

function Loading() {
    return (
        <div className={s.container}>
            <p>Loading...</p>
            <div className={s.loaderWrapper}>
                <div className={s.loaderBar} />
            </div>
        </div>
    )
}

export default Loader;
