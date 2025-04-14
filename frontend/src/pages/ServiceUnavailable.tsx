
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { CloudOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ServiceUnavailable = () => {
  const [isChecking, setIsChecking] = useState(false);
  
  const handleRetry = () => {
    setIsChecking(true);
    // Simulate checking server status
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  
  return (
    <ErrorLayout
      title="503: Service Unavailable"
      description="Our servers are currently experiencing high traffic or undergoing maintenance. Please try again later."
      icon={<CloudOff className="h-12 w-12 text-muted-foreground" />}
      showRetry={true}
      retryAction={handleRetry}
    >
      {isChecking && (
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin h-5 w-5 border-2 border-azure-600 rounded-full border-t-transparent"></div>
          <span className="text-sm text-muted-foreground">Checking server status...</span>
        </div>
      )}
    </ErrorLayout>
  );
};

export default ServiceUnavailable;
