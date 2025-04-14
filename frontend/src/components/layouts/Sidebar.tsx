
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart3,
  Book,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  Users
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { path: '/profile', label: 'Profile', icon: User },
      { path: '/blog', label: 'Blog', icon: FileText },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: Home },
          { path: '/admin/users', label: 'Users', icon: Users },
          { path: '/admin/courses', label: 'Courses', icon: Book },
          { path: '/admin/classes', label: 'Classes', icon: BookOpen },
          { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
          { path: '/admin/blog-management', label: 'Blog Management', icon: FileText },
          { path: '/admin/settings', label: 'Settings', icon: Settings },
          ...commonItems,
        ];
      case 'faculty':
        return [
          { path: '/faculty', label: 'Dashboard', icon: Home },
          { path: '/faculty/courses', label: 'My Courses', icon: Book },
          { path: '/faculty/classes', label: 'My Classes', icon: BookOpen },
          { path: '/faculty/grades', label: 'Manage Grades', icon: FileText },
          { path: '/faculty/students', label: 'My Students', icon: GraduationCap },
          { path: '/faculty/calendar', label: 'Calendar', icon: Calendar },
          ...commonItems,
        ];
      case 'student':
        return [
          { path: '/student', label: 'Dashboard', icon: Home },
          { path: '/student/courses', label: 'My Courses', icon: Book },
          { path: '/student/grades', label: 'My Grades', icon: FileText },
          { path: '/student/calendar', label: 'Calendar', icon: Calendar },
          ...commonItems,
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <div className="flex items-center gap-2 px-4">
          <div className="bg-azure-600 text-white p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          </div>
          <span className="text-xl font-bold text-azure-800">Azure Scholars Hub</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                    onClick={() => navigate(item.path)}
                    className={cn("transition-colors", 
                      location.pathname === item.path ? "font-medium" : ""
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
