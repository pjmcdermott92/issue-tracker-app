import React, { useContext, useState, createRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastAlerts } from '../components/ui/ToastAlerts/ToastAlerts';

export type Alert = { id: string, message: string, type: string };
type AlertProviderProps = { children: React.ReactNode };
type AlertContextValue = { alerts: Alert[] | null, setAlert: any, dismissAlert: any } | null;

const AlertContext = React.createContext<AlertContextValue>(null);

export const useAlerts = () => {
    const context = useContext(AlertContext);
    if (context === undefined) throw new Error('useAlerts must be used within an AlertProvider');
    return context;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const { state } = useLocation();
    const alertWrapperRef = createRef<any>();

    const setAlert = (message: string, type: string = 'dark') => {
        const id = uuid();
        setAlerts(prevAlerts => [{ id, message, type}, ...prevAlerts]);
    }

    const dismissAlert = (id: string, alertIndex: number) => {
        const alertElement = alertWrapperRef.current!.childNodes[alertIndex];
        alertElement.classList.add('closing');
        setTimeout(() => {
            setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
        }, 300);
    }

    useEffect(() => {
        if (state?.auth?.display_name) setAlert(`Welcome back, ${state.auth.display_name}!`);
    }, []);

    useEffect(() => {
        let interval: any;
        if (!alerts.length) return clearInterval(interval);
        const alertIndex: number = alerts.length - 1;
        interval = setInterval(() => {
            dismissAlert(alerts[alertIndex].id, alertIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [alerts]);

    const value = { alerts, setAlert, dismissAlert };
    return <AlertContext.Provider value={value}>
        <ToastAlerts
            ref={alertWrapperRef}
            alertContext={{alerts, dismissAlert}}
        />
        {children}
    </AlertContext.Provider>
}

function uuid() {
    const date = new Date().getTime();
    return 'x-xyx'.replace(/[xy]/g, () => {
        const rand = Math.floor(date * Math.random());
        return rand.toString(16);
    });
}

export default AlertProvider;
