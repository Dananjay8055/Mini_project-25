
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
  User,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items based on user role - simplified for mobile
  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/admin', label: 'Home', icon: Home },
          { path: '/admin/users', label: 'Users', icon: Users },
          { path: '/admin/courses', label: 'Courses', icon: Book },
          { path: '/admin/classes', label: 'Classes', icon: BookOpen },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      case 'faculty':
        return [
          { path: '/faculty', label: 'Home', icon: Home },
          { path: '/faculty/courses', label: 'Courses', icon: Book },
          { path: '/faculty/classes', label: 'Classes', icon: BookOpen },
          { path: '/faculty/students', label: 'Students', icon: GraduationCap },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      case 'student':
        return [
          { path: '/student', label: 'Home', icon: Home },
          { path: '/student/courses', label: 'Courses', icon: Book },
          { path: '/student/grades', label: 'Grades', icon: FileText },
          { path: '/student/calendar', label: 'Calendar', icon: Calendar },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      default:
        return [
          { path: '/profile', label: 'Profile', icon: User },
          { path: '/blog', label: 'Blog', icon: FileText },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border md:hidden z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-azure-600" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
