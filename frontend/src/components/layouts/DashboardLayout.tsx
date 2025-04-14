
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, 
  ChevronDown, 
  MessageSquare,
  Menu,
  User as UserIcon,
  Settings,
  LogOut
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import ThemeToggle from '@/components/ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar />
        
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="bg-card shadow-sm sticky top-0 z-30">
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:flex hidden" />
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <ThemeToggle />
                
                {/* Notifications button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => navigate('/notifications')}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* Messages button */}
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* User dropdown - mobile and desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{user?.name}</span>
                      <ChevronDown size={16} className="hidden md:inline" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/notifications')}>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/${user?.role}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-grow p-6 pb-20 md:pb-6 bg-background">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-card border-t py-4 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Azure Scholars Hub. All rights reserved.</p>
            </div>
          </footer>
        </SidebarInset>
        
        {/* Mobile Navigation */}
        <MobileNavbar />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
