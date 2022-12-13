import { forwardRef } from 'react';
import { Alert } from '../../../contexts/AlertProvider';
import s from './ToastAlerts.module.scss';

type DismissAlertAction = (id: string, index: number) => void;
type AlertContext = { alerts: Alert[] | null, dismissAlert: DismissAlertAction };
type ToastAlertsProps = { alertContext: AlertContext };

export const ToastAlerts = forwardRef(({ alertContext }: ToastAlertsProps, ref: any) => {
    const { alerts, dismissAlert } = alertContext;

    if (!alerts?.length) return null;
    return (
        <div className={s.alertWrapper} ref={ref}>
            {
                alerts?.map((alert: Alert, index: number) => {
                    return (
                        <div
                            key={alert.id}
                            className={`alert alert-${alert.type} rounded`}
                            style={{
                                boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.15)' 
                            }}
                        >
                            <button
                                className={s.alertCloseBtn}
                                onClick={() => dismissAlert(alert.id, index)}
                            >
                                &times;
                            </button>
                            {alert.message}
                        </div>
                    );
                })
            }
        </div>
    );
});
