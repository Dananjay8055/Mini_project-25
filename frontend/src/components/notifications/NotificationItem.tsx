
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Trash2 } from 'lucide-react';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIconByType = () => {
    switch (notification.type) {
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <Bell className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <Bell className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <Card 
      className={`mb-3 transition-all ${notification.read ? 'bg-muted/50' : 'bg-muted border-l-4 border-l-blue-500'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 flex items-start">
        <div className="mr-3 mt-1">
          {getIconByType()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-medium ${notification.read ? 'text-foreground' : 'text-gray-900'}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground'} mt-1`}>
            {notification.message}
          </p>
        </div>
        
        {isHovered && (
          <div className="flex space-x-1 ml-2">
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onMarkAsRead(notification.id)}
                className="h-8 w-8"
                title="Mark as read"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(notification.id)}
              className="h-8 w-8 text-muted-foreground hover:text-red-500"
              title="Delete notification"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
