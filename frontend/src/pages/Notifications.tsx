
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellOff, Check, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NotificationItem, { Notification } from '@/components/notifications/NotificationItem';
import EmptyState from '@/components/notifications/EmptyState';

// Mock data
const generateMockNotifications = (count: number): Notification[] => {
  const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
  const notifications: Notification[] = [];
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);
    
    notifications.push({
      id: `notification-${i}`,
      title: `Sample Notification ${i + 1}`,
      message: `This is a sample ${types[i % 4]} notification message for testing purposes.`,
      timestamp: date,
      read: i % 3 === 0, // Every third notification is read
      type: types[i % 4]
    });
  }
  
  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  // Simulate loading notifications
  useEffect(() => {
    // For demo purposes: 50% chance of having notifications, 50% chance of empty state
    const hasNotifications = Math.random() > 0.5;
    
    if (hasNotifications) {
      const mockNotifications = generateMockNotifications(Math.floor(Math.random() * 10) + 1);
      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, []);
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read;
    return true;
  });
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Notification marked as read",
      duration: 2000
    });
  };
  
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      duration: 2000
    });
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      duration: 2000
    });
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      duration: 2000
    });
  };
  
  const generateNewNotification = () => {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      title: `New Notification`,
      message: `This is a new ${randomType} notification that was just generated.`,
      timestamp: new Date(),
      read: false,
      type: randomType
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    toast({
      title: "New notification received",
      duration: 2000
    });
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        <Card>
          <CardHeader className="border-b pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Notifications</CardTitle>
                <CardDescription>Stay updated with important information</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleMarkAllAsRead}
                      disabled={unreadCount === 0}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Mark all read
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleClearAll}
                    >
                      <Trash className="mr-1 h-4 w-4" />
                      Clear all
                    </Button>
                  </>
                )}
                <Button onClick={generateNewNotification}>
                  Add notification
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <div className="border-b px-6">
                <TabsList className="bg-transparent border-b-0 mt-0">
                  <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-white rounded-full text-xs px-2 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0 pt-0">
                <div className="p-4">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <NotificationItem 
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyState
                      action={{
                        label: "Generate notification",
                        onClick: generateNewNotification
                      }}
                    />
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0 pt-0">
                <div className="p-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                      <NotificationItem 
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="No unread notifications"
                      description="You've read all your notifications."
                      action={{
                        label: "Generate notification",
                        onClick: generateNewNotification
                      }}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
