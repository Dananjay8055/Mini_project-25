
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Users, BookOpen, Calendar, FileText, AlertCircle, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className=" text-muted-foreground ">Welcome back to your dashboard.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">+27 this week</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground">+4 this week</p>
            </CardContent>
          </Card>
          
          {/* <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Next: Tomorrow</p>
            </CardContent>
          </Card> */}
          
          {/* <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">New Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card> */}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          {/* <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, icon: <Users size={16} />, color: 'bg-blue-100 text-blue-600', action: 'New faculty member registered', time: '10 minutes ago' },
                  { id: 2, icon: <AlertCircle size={16} />, color: 'bg-red-100 text-red-600', action: 'System alert: Database backup completed', time: '25 minutes ago' },
                  { id: 3, icon: <BookOpen size={16} />, color: 'bg-green-100 text-green-600', action: 'New course added: Advanced Mathematics', time: '1 hour ago' },
                  // { id: 4, icon: <FileText size={16} />, color: 'bg-purple-100 text-purple-600', action: 'Blog post published by Dr. Johnson', time: '2 hours ago' },
                  // { id: 5, icon: <Calendar size={16} />, color: 'bg-amber-100 text-amber-600', action: 'Academic calendar updated for Fall Semester', time: '3 hours ago' },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className={`p-2 rounded-full ${activity.color} mr-3 mt-0.5`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
          
          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {[
                  { id: 1, icon: <Users size={18} />, label: 'Manage Users', link: '/admin/users' },
                  { id: 2, icon: <BookOpen size={18} />, label: 'Course Management', link: '/admin/courses' },
                  // { id: 3, icon: <BarChart3 size={18} />, label: 'View Reports', link: '/admin/reports' },
                  // { id: 4, icon: <Calendar size={18} />, label: 'Academic Calendar', link: '/admin/calendar' },
                  // { id: 5, icon: <FileText size={18} />, label: 'Blog Management', link: '/blog/manage' },
                  { id: 6, icon: <AlertCircle size={18} />, label: 'System Settings', link: '/admin/settings' },
                ].map((item) => (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    className="flex items-center p-3 rounded-lg text-foreground hover:bg-azure-50 hover:text-gray-900 transition-colors"
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
