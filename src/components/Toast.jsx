import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Toast({ type = 'success', message, onClose, duration = 4000 }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`toast toast--${type} ${exiting ? 'toast--exiting' : ''}`} role="alert">
      <div className="toast-icon">
        {type === 'success' ? <CheckCircle /> : <XCircle />}
      </div>
      <span>{message}</span>
      <button className="toast-close" onClick={handleClose} aria-label="Dismiss notification">
        <X />
      </button>
    </div>
  );
}
