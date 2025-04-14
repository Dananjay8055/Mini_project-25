
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const MaintenancePage = () => {
  const [countdown, setCountdown] = useState(60);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <ErrorLayout
      title="Under Maintenance"
      description="We're currently performing scheduled maintenance to improve your experience. Please check back soon."
      icon={<Wrench className="h-12 w-12 text-blue-600" />}
      showBackToDashboard={false}
      showRetry={true}
      retryAction={() => window.location.reload()}
    >
      <div className="text-center">
        <div className="mb-2 text-sm text-muted-foreground">Automatically refreshing in</div>
        <div className="text-2xl font-mono bg-muted py-2 px-4 rounded-full inline-block">{countdown}s</div>
      </div>
    </ErrorLayout>
  );
};

export default MaintenancePage;
