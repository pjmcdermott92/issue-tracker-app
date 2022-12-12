import { useState, FormEvent } from 'react';

export const useForm = (callback: any, initialValues: any = {}) => {
    const [values, setValues] = useState<any>(initialValues);

    const onChange = (e: any) => {
        const { name, value } = e.target;
        e.persist();
        setValues((prevValues: object) => ({ ...prevValues, [name]: value }));
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        callback();
    }

    const clearValue = (value: any) => {
        return setValues((prevValues: object) => ({ ...prevValues, [value]: '' }));
    }

    return {values, onChange, onSubmit, clearValue};
}
