
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({
  title = "No notifications yet",
  description = "When you receive notifications, they will appear here.",
  action
}: EmptyStateProps) => {
  return (
    <Card className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Bell className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </Card>
  );
};

export default EmptyState;
