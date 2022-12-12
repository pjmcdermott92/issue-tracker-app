import s from './Loader.module.scss';

type LoaderProps = { fullscreen?: boolean };

const Loader = ({ fullscreen }: LoaderProps) => {
    if (fullscreen) return (
        <div className={s.fullScreenWrapper}>
            <Loading />
        </div>
    )

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
