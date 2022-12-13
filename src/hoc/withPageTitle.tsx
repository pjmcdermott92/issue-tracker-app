import { useEffect, useState } from 'react';

type PageTitle = string;

export const withPageTitle = (Component: any, pageTitle: string) => (props: any) => {
    const [title, setTitle] = useState<PageTitle>(pageTitle);

    useEffect(() => {
        if (title?.length) document.title = `${title} - Issue Tracker`;
        else document.title =  'Issue Tracker';
    }, [title]);

    return <Component {...props} setPageTitle={setTitle} />
}

export default withPageTitle;
