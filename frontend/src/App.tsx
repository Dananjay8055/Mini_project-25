import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import GenericError from "./pages/GenericError";
import MaintenancePage from "./pages/MaintenancePage";
import SessionExpired from "./pages/SessionExpired";
import ForbiddenPage from "./pages/ForbiddenPage";
import ServiceUnavailable from "./pages/ServiceUnavailable";
import NetworkError from "./pages/NetworkError";
import ErrorPagesDemoIndex from "./pages/ErrorPagesDemoIndex";

// Protected Pages
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import FacultyDashboard from "./pages/dashboards/FacultyDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";

// Common Protected Pages
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";

// Admin Pages
import AdminUsers from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses"; 
import AdminReports from "./pages/admin/Reports"; 
import BlogManagement from "./pages/admin/BlogManagement"; 
import NewUser from "./pages/admin/NewUser";
import NewCourse from "./pages/admin/NewCourse";
import NewPost from "./pages/admin/NewPost";
import AdminClassManagement from "./pages/admin/ClassManagement";
import NewClass from "./pages/admin/NewClass";

// Faculty Pages
import FacultyCourses from "./pages/faculty/Courses";
import FacultyGrades from "./pages/faculty/grades"; 
import FacultyMyStudents from "./pages/faculty/MyStudents"; 
import FacultyClassManagement from "./pages/faculty/ClassManagement";
import StudentDetails from "./pages/faculty/StudentDetails";

// Student Pages
import StudentCourses from "./pages/student/Courses";
import StudentGrades from "./pages/student/Grades";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Fixed TooltipProvider usage to ensure proper React context
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/index" element={<Index />} />
              
              {/* Error Pages */}
              <Route path="/error" element={<GenericError />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/session-expired" element={<SessionExpired />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/service-unavailable" element={<ServiceUnavailable />} />
              <Route path="/network-error" element={<NetworkError />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/users/new" element={<NewUser />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                <Route path="/admin/courses/new" element={<NewCourse />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/blog-management" element={<BlogManagement />} />
                <Route path="/admin/blog-management/new" element={<NewPost />} />
                <Route path="/admin/classes" element={<AdminClassManagement />} />
                <Route path="/admin/classes/new" element={<NewClass />} />
                {/* Admin Error Pages Demo */}
                <Route path="/admin/error-pages-demo" element={<ErrorPagesDemoIndex />} />
              </Route>
              
              {/* Faculty Routes */}
              <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/faculty/courses" element={<FacultyCourses />} />
                <Route path="/faculty/grades" element={<FacultyGrades />} />
                <Route path="/faculty/students" element={<FacultyMyStudents />} />
                <Route path="/faculty/students/:id" element={<StudentDetails />} />
                <Route path="/faculty/classes" element={<FacultyClassManagement />} />
              </Route>
              
              {/* Student Routes */}
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/courses" element={<StudentCourses />} />
                <Route path="/student/grades" element={<StudentGrades />} />
              </Route>
              
              {/* Protected Routes (any authenticated user) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/support" element={<Support />} />
              </Route>
              
              {/* Test/Demo Routes */}
              <Route path="/error-demo/404" element={<NotFound />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
