
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define user roles
export type UserRole = 'admin' | 'faculty' | 'student' | null;

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  loading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@azurescholars.edu',
    role: 'admin',
    avatar: '/admin-avatar.png',
  },
  {
    id: '2',
    name: 'Faculty User',
    email: 'faculty@azurescholars.edu',
    role: 'faculty',
    avatar: '/faculty-avatar.png',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@azurescholars.edu',
    role: 'student',
    avatar: '/student-avatar.png',
  },
];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (for demo purposes)
      const foundUser = sampleUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real implementation, you would verify password here
      
      // Save user to state and localStorage
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      // Redirect based on role
      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else if (foundUser.role === 'faculty') {
        navigate('/faculty');
      } else {
        navigate('/student');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists (for demo purposes)
      if (sampleUsers.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      
      // Create new user (in a real app, this would be sent to a backend API)
      const newUser: User = {
        id: (sampleUsers.length + 1).toString(),
        name,
        email,
        role,
      };
      
      // Add user to our sample array (in a real app, this would be stored in a database)
      sampleUsers.push(newUser);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      });
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
