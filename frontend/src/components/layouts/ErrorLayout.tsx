
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface ErrorLayoutProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  showBackToDashboard?: boolean;
  showHome?: boolean;
  showRetry?: boolean;
  retryAction?: () => void;
  primaryAction?: {
    label: string;
    to: string;
  };
  children?: React.ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  title,
  description,
  icon,
  showBackToDashboard = true,
  showHome = true,
  showRetry = false,
  retryAction,
  primaryAction,
  children
}) => {
  const { user } = useAuth();
  
  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'faculty':
        return '/faculty';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {icon && (
          <div className="bg-muted p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-6">
            {icon}
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {children && <div className="mb-6">{children}</div>}
        
        <div className="space-y-4">
          {primaryAction ? (
            <Button asChild className="w-full">
              <Link to={primaryAction.to}>{primaryAction.label}</Link>
            </Button>
          ) : null}
          
          {showRetry && (
            <Button 
              className="w-full" 
              onClick={retryAction || (() => window.location.reload())}
            >
              Try Again
            </Button>
          )}
          
          {showBackToDashboard && user && (
            <Button asChild variant={primaryAction || showRetry ? "outline" : "default"} className="w-full">
              <Link to={getDashboardLink()}>Return to Dashboard</Link>
            </Button>
          )}
          
          {showHome && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorLayout;
