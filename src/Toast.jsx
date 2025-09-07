import React from 'react';
import { HiOutlineCheckCircle, HiMiniXMark, HiOutlineExclamationCircle } from "react-icons/hi2";
import { ToastContext } from './context/Toast/ToastProvider';
import styles from './ToastShelf.module.css';

const ICONS_BY_VARIANT = {
    success: HiOutlineCheckCircle,
    error: HiOutlineExclamationCircle,
}

const Toast = ({id, variant, children}) => {
    const {dismissToast} = React.useContext(ToastContext);
    const Icon = ICONS_BY_VARIANT[variant];

  return (
    <div className="toastWrapper flex justify-between items-center gap-4 rounded-md p-4 bg-[var(--filed-bg)] text-[var(--text-primary)] font-medium text-sm">
        <div>
        <h2 className='flex items-center gap-2'><Icon size={24} />{children}</h2>
        <small>Sunday, December 03, 2023 at 9:00 AM</small>
        </div>
        <button className='px-2 py-1.5 rounded-sm text-sx bg-[var(--primary-button-bg)] text-[var(--primary-button-text)]' onClick={() => dismissToast(id)} size='small'>Undo</button>
    </div>
  )
}

export default Toast