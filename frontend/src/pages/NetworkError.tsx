
import { useState, useEffect } from 'react';
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { Wifi, WifiOff } from 'lucide-react';

const NetworkError = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <ErrorLayout
      title="Network Error"
      description={
        isOnline 
          ? "Your connection has been restored. You can now continue browsing."
          : "You're currently offline. Please check your internet connection and try again."
      }
      icon={isOnline ? <Wifi className="h-12 w-12 text-green-500" /> : <WifiOff className="h-12 w-12 text-muted-foreground" />}
      showRetry={!isOnline}
      primaryAction={
        isOnline 
          ? {
              label: "Continue",
              to: "/"
            }
          : undefined
      }
    />
  );
};

export default NetworkError;
