import { useState, useCallback } from 'react';

type InitState = boolean;
type Value = any;

export const useToggle = (initState: InitState) => {
    const [value, setValue] = useState(initState);

    const toggle = useCallback((value?: Value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        });
    }, []);

    return [value, toggle] as const;
}
