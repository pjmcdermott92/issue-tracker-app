const hasProperty = (object: object, key: string) => (object ? Object.hasOwnProperty.call(object, key) : false);

const withProviders = (...providers: any) => (Component: any) => (props: any) => {

    return providers.reduceRight((acc: any, prov: any) => {
        let Provider = prov;
        if (hasProperty(prov, 'props')) {
            Provider = prov.provider;
            const providerProps = prov.props;
            return <Provider {...providerProps}>{acc}</Provider>
        } else {
            return <Provider>{acc}</Provider>
        }
    }, <Component {...props} />);
}

export default withProviders;
