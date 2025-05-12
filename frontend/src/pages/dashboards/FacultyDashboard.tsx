
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { BookOpen, Users, Calendar, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FacultyDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your teaching activities.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">My Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active courses this semester</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          
          {/* <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
              <Calendar className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: Today at 2:00 PM</p>
            </CardContent>
          </Card> */}
          
          {/* <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
              <FileText className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Due in 3 days</p>
            </CardContent>
          </Card> */}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Introduction to Computer Science', time: '10:00 AM - 11:30 AM', location: 'Room 101', status: 'completed' },
                  { id: 2, title: 'Office Hours', time: '12:00 PM - 1:30 PM', location: 'Faculty Office', status: 'current' },
                  { id: 3, title: 'Advanced Programming', time: '2:00 PM - 3:30 PM', location: 'Room 205', status: 'upcoming' },
                  { id: 4, title: 'Department Meeting', time: '4:00 PM - 5:00 PM', location: 'Conference Room', status: 'upcoming' },
                ].map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 mt-0.5 ${
                      event.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : event.status === 'current'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-muted text-gray-600'
                    }`}>
                      {event.status === 'completed' ? (
                        <CheckCircle size={16} />
                      ) : event.status === 'current' ? (
                        <Clock size={16} />
                      ) : (
                        <Calendar size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                      <p className="text-xs text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
          
          {/* Recent Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, course: 'CS101', title: 'Programming Exercise 5', dueDate: 'Due tomorrow', submissions: 18, total: 32 },
                  { id: 2, course: 'CS205', title: 'Research Project Outline', dueDate: 'Due in 3 days', submissions: 12, total: 28 },
                  { id: 3, course: 'CS101', title: 'Final Project Proposal', dueDate: 'Due in 7 days', submissions: 5, total: 32 },
                  { id: 4, course: 'CS310', title: 'Algorithm Analysis', dueDate: 'Due in 10 days', submissions: 0, total: 25 },
                ].map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-lg cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-muted ">{assignment.course}</span>
                        <p className="text-sm font-medium mt-1">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Submissions</p>
                        <p className="text-sm font-medium">{assignment.submissions}/{assignment.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Student Notifications */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Student Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, type: 'question', student: 'Alex Johnson', message: 'Asked a question about Assignment #3', time: '10 minutes ago', urgent: true },
                  { id: 2, type: 'submission', student: 'Maria Garcia', message: 'Submitted Final Project early', time: '30 minutes ago', urgent: false },
                  { id: 3, type: 'absence', student: 'James Wilson', message: 'Requested absence for next week', time: '2 hours ago', urgent: true },
                  { id: 4, type: 'grade', student: 'Sarah Lee', message: 'Requested grade review', time: '3 hours ago', urgent: false },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 mt-0.5 ${
                      notification.urgent 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.urgent ? <AlertCircle size={16} /> : <FileText size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{notification.student}</p>
                      <p className="text-xs">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
