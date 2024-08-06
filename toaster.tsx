'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Toaster() {
  const { toasts, addToast, removeToast } = useToast();
  const [autoDismiss, setAutoDismiss] = useState(true);
  const [dismissTime, setDismissTime] = useState(5000); // 5 seconds

  useEffect(() => {
    if (autoDismiss) {
      const timerIds = toasts.map((toast) => {
        const timerId = setTimeout(() => {
          removeToast(toast.id);
        }, dismissTime);
        return timerId;
      });
      return () => {
        timerIds.forEach((id) => clearTimeout(id));
      };
    }
  }, [toasts, autoDismiss, dismissTime, removeToast]);

  return (
    <ToastProvider>
      <div className="toaster-controls">
        <Button onClick={() => addToast({ title: 'New Toast', description: 'This is a new toast notification.' })}>
          Add Toast
        </Button>
        <label className="auto-dismiss-toggle">
          <input
            type="checkbox"
            checked={autoDismiss}
            onChange={(e) => setAutoDismiss(e.target.checked)}
          />
          Auto Dismiss
        </label>
        {autoDismiss && (
          <div className="dismiss-time-control">
            <label>Dismiss Time (ms):</label>
            <input
              type="number"
              value={dismissTime}
              onChange={(e) => setDismissTime(Number(e.target.value))}
              min={1000}
              step={1000}
            />
          </div>
        )}
      </div>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
      <style jsx>{`
        .toaster-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .auto-dismiss-toggle {
          display: flex;
          align-items: center;
        }
        .dismiss-time-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </ToastProvider>
  );
}

// Additional components and hooks used in the Toaster component

// Button component for adding new toast notifications
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}

// Hook for managing toast notifications
function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, { ...toast, id: Date.now() }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
