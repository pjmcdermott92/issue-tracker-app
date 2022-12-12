import { useEffect, useState } from 'react';

type PageTitle = string;

export const withPageTitle = (Component: any, pageTitle: string) => (props: any) => {
    const setPageTitle = useSetPageTitle(pageTitle);
    return <Component {...props} setPageTitle={setPageTitle} />
}

function useSetPageTitle(defaultTitle: PageTitle) {
    const [pageTitle, setPageTitle] = useState<PageTitle>(defaultTitle);
    let title = defaultTitle;
    if (pageTitle?.length) title = `${pageTitle} - Issue Tracker`;
    else if (defaultTitle?.length) title = `${defaultTitle} - Issue Tracker`;

    useEffect(() => {
        document.title = title ? title : 'Issue Tracker';
        return setPageTitle('');
    }, [pageTitle]);
}

export default withPageTitle;
