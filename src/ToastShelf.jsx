import React from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './context/Toast/ToastProvider';
import Toast from "./Toast";

const ToastShelf = () => {
    const {toasts} = React.useContext(ToastContext);

  return createPortal (
    <ol className='fixed right-0 bottom-0 flex flex-col gap-4 p-4'>
        {toasts.map((toast) => (
            <li key={toast.id}>
                <Toast id={toast.id} variant={toast.variant}>
                    {toast.message}
                </Toast>
            </li>
        ))}
    </ol>,
    document.querySelector("#portal")
  )
}

export default ToastShelf