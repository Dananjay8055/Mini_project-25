
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { BookOpen, Calendar, FileText, CheckCircle, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Current semester</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
              <FileText className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Next due: Tomorrow</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Next: 2:00 PM - CS101</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Bell className="h-4 w-4 text-azure-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">New since yesterday</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 1, code: 'CS101', title: 'Introduction to Computer Science', progress: 75, grade: 'A-' },
                { id: 2, code: 'MATH204', title: 'Linear Algebra', progress: 60, grade: 'B+' },
                { id: 3, code: 'ENG105', title: 'Technical Communication', progress: 50, grade: 'A' },
                { id: 4, code: 'PHYS201', title: 'Physics for Engineers', progress: 40, grade: 'B' },
              ].map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted">{course.code}</span>
                      <h4 className="text-sm font-medium mt-1">{course.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-sm">{course.grade}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={course.progress} className="h-2" />
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">View All Courses</Button>
            </CardFooter>
          </Card>
          
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'MATH204: Linear Algebra', time: '10:00 AM - 11:30 AM', location: 'Room 305', status: 'completed' },
                  { id: 2, title: 'Study Group: Physics', time: '12:00 PM - 1:30 PM', location: 'Library', status: 'current' },
                  { id: 3, title: 'CS101: Programming', time: '2:00 PM - 3:30 PM', location: 'Room 101', status: 'upcoming' },
                  { id: 4, title: 'ENG105: Writing Workshop', time: '4:00 PM - 5:30 PM', location: 'Room 205', status: 'upcoming' },
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
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Full Calendar</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, course: 'CS101', title: 'Programming Exercise 5', dueDate: 'Tomorrow, 11:59 PM', urgent: true },
                { id: 2, course: 'MATH204', title: 'Problem Set 7', dueDate: 'May 15, 11:59 PM', urgent: false },
                { id: 3, course: 'ENG105', title: 'Research Paper Draft', dueDate: 'May 17, 11:59 PM', urgent: false },
                { id: 4, course: 'PHYS201', title: 'Lab Report 3', dueDate: 'May 18, 5:00 PM', urgent: false },
                { id: 5, course: 'CS101', title: 'Final Project Proposal', dueDate: 'May 20, 11:59 PM', urgent: false },
                { id: 6, course: 'ENG105', title: 'Peer Review', dueDate: 'May 22, 11:59 PM', urgent: false },
              ].map((assignment) => (
                <div key={assignment.id} className="p-3 border rounded-lg transition-colors cursor-pointer">
                  <div className="flex flex-col h-full">
                    <div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted">{assignment.course}</span>
                      {assignment.urgent && (
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-600 ml-2">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-2">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground mt-auto pt-2">{assignment.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">View All Assignments</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
