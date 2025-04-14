
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileX, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  ShieldX, 
  CloudOff,
  WifiOff,
  ShieldAlert
} from 'lucide-react';

const ErrorPagesDemoIndex = () => {
  const errorPages = [
    {
      title: '404 - Not Found',
      description: 'When a page cannot be found',
      path: '/error-demo/404',
      icon: <FileX className="h-8 w-8" />
    },
    {
      title: 'Unauthorized Access',
      description: 'When a user tries to access content they don\'t have permission for',
      path: '/unauthorized',
      icon: <ShieldAlert className="h-8 w-8" />
    },
    {
      title: 'Generic Error',
      description: 'For unexpected application errors',
      path: '/error',
      icon: <AlertTriangle className="h-8 w-8" />
    },
    {
      title: 'Maintenance',
      description: 'When the system is undergoing maintenance',
      path: '/maintenance',
      icon: <Wrench className="h-8 w-8" />
    },
    {
      title: 'Session Expired',
      description: 'When a user\'s session has timed out',
      path: '/session-expired',
      icon: <Clock className="h-8 w-8" />
    },
    {
      title: '403 - Forbidden',
      description: 'When a user is authenticated but doesn\'t have access rights',
      path: '/forbidden',
      icon: <ShieldX className="h-8 w-8" />
    },
    {
      title: '503 - Service Unavailable',
      description: 'When the server is temporarily unable to handle requests',
      path: '/service-unavailable',
      icon: <CloudOff className="h-8 w-8" />
    },
    {
      title: 'Network Error',
      description: 'When there are connectivity issues',
      path: '/network-error',
      icon: <WifiOff className="h-8 w-8" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Error Pages Demo</h1>
          <p className="text-muted-foreground">Preview all available error pages in the application</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {errorPages.map((page, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b flex flex-row items-center gap-3">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  {page.icon}
                </div>
                <div>
                  <CardTitle>{page.title}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Button asChild className="w-full">
                  <Link to={page.path}>View Error Page</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ErrorPagesDemoIndex;
