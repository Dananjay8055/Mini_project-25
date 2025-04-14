
import ErrorLayout from '@/components/layouts/ErrorLayout';
import { ShieldX } from 'lucide-react';

const ForbiddenPage = () => {
  return (
    <ErrorLayout
      title="403: Forbidden"
      description="You don't have permission to access this resource. If you believe this is an error, please contact your administrator."
      icon={<ShieldX className="h-12 w-12 text-red-500" />}
      primaryAction={{
        label: "Back to Safety",
        to: "/"
      }}
    />
  );
};

export default ForbiddenPage;
