
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SessionExpired = () => {
  const { login } = useAuth();
  
  return (
    <ErrorLayout
      title="Session Expired"
      description="Your session has timed out due to inactivity. Please log in again to continue."
      icon={<Clock className="h-12 w-12 text-orange-500" />}
      showBackToDashboard={false}
      primaryAction={{
        label: "Log In Again",
        to: "/login"
      }}
    />
  );
};

export default SessionExpired;
