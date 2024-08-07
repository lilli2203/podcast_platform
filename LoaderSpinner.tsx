import React, { useState, useEffect } from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface LoaderSpinnerProps {
  size?: number;
  color?: string;
  message?: string;
  withOverlay?: boolean;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  error?: boolean;
  errorMessage?: string;
  retryCallback?: () => void;
  type?: 'spinner' | 'dots' | 'bars';
}

const animationSpeeds = {
  slow: 'animate-spin-slow',
  medium: 'animate-spin-medium',
  fast: 'animate-spin-fast'
};

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  size = 30,
  color = 'orange-500',
  message = 'Loading...',
  withOverlay = false,
  animationSpeed = 'medium',
  error = false,
  errorMessage = 'An error occurred',
  retryCallback,
  type = 'spinner'
}) => {
  const [showMessage, setShowMessage] = useState(true);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      setShowRetry(true);
    }
  }, [error]);

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <LoaderIcon
            className={`animate-spin text-${color} ${animationSpeeds[animationSpeed]}`}
            size={size}
          />
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 bg-${color} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      case 'bars':
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-12 bg-${color} rounded animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${withOverlay ? 'h-screen w-full' : 'h-full w-full'}`}>
      {withOverlay && (
        <div className="absolute inset-0 bg-gray-900 opacity-75" />
      )}
      <div className={`flex flex-col items-center ${withOverlay ? 'relative z-10' : ''}`}>
        {renderLoader()}
        {error ? (
          <div className="mt-4 text-red-500 font-semibold text-lg text-center">
            {errorMessage}
            {retryCallback && (
              <button
                onClick={retryCallback}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            )}
          </div>
        ) : (
          showMessage && (
            <p className={`mt-4 text-${color} font-semibold text-lg`}>
              {message}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default LoaderSpinner;
