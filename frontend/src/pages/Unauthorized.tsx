
import { ShieldAlert } from 'lucide-react';
import ErrorLayout from '@/components/layouts/ErrorLayout';

const Unauthorized = () => {
  return (
    <ErrorLayout
      title="Access Denied"
      description="You don't have permission to access this page. This area is restricted to authorized users only."
      icon={<ShieldAlert className="h-12 w-12 text-red-600" />}
      primaryAction={{
        label: "Back to Safety",
        to: "/"
      }}
    />
  );
};

export default Unauthorized;
