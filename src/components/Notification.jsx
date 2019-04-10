import { toast } from 'react-toastify';

export function notificationSuccess(msg) {
  toast.success(msg, {
    position: 'bottom-left',
    duration: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  });
}

export function notificationError(msg) {
  toast.error(msg, {
    position: 'bottom-left',
    duration: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  });
}