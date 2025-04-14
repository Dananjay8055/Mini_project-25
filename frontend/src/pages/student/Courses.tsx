
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Calendar, ArrowUpRight, GraduationCap } from 'lucide-react';

// Sample student courses data
const studentCourses = [
  {
    id: '1',
    title: 'Introduction to Cloud Computing',
    code: 'CC101',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    room: 'Tech Building 305',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    status: 'active',
    nextClass: '2025-04-12T10:00:00Z',
    description: 'An introductory course to cloud computing principles, services, and deployment models.',
    progress: 65,
    grade: 'B+',
    assignments: {
      total: 12,
      completed: 8,
      pending: 2,
      upcoming: 2
    }
  },
  {
    id: '2',
    title: 'Database Systems',
    code: 'DB202',
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    room: 'Science Hall 210',
    startDate: '2025-01-16',
    endDate: '2025-05-31',
    status: 'active',
    nextClass: '2025-04-13T14:00:00Z',
    description: 'A comprehensive study of database design, implementation, and management.',
    progress: 60,
    grade: 'A-',
    assignments: {
      total: 10,
      completed: 6,
      pending: 2,
      upcoming: 2
    }
  },
  {
    id: '3',
    title: 'Machine Learning Fundamentals',
    code: 'ML303',
    instructor: 'Dr. James Wilson',
    schedule: 'Wed, Fri 1:00 PM - 2:30 PM',
    room: 'Tech Building 450',
    startDate: '2025-01-17',
    endDate: '2025-06-01',
    status: 'active',
    nextClass: '2025-04-14T13:00:00Z',
    description: 'Introduction to basic concepts and algorithms in machine learning.',
    progress: 55,
    grade: 'B',
    assignments: {
      total: 8,
      completed: 4,
      pending: 1,
      upcoming: 3
    }
  },
  {
    id: '4',
    title: 'Web Development Workshop',
    code: 'WD401',
    instructor: 'Prof. Emily Davis',
    schedule: 'Fri 9:00 AM - 12:00 PM',
    room: 'Online / Virtual',
    startDate: '2025-02-07',
    endDate: '2025-04-25',
    status: 'completed',
    description: 'Hands-on workshop on building modern web applications.',
    progress: 100,
    grade: 'A',
    assignments: {
      total: 6,
      completed: 6,
      pending: 0,
      upcoming: 0
    }
  },
];

const StudentCourses = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNextClassTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else {
      return `In ${diffDays} days`;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Browse Course Catalog</span>
          </Button>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Current Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCourses.filter(course => course.status === 'active').map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-azure-600 hover:bg-azure-700">{course.code}</Badge>
                      {course.grade && (
                        <span className={`px-2 py-1 rounded-md text-sm font-medium 
                          ${course.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                          course.grade.startsWith('B') ? 'bg-azure-100 text-azure-800' :
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                          {course.grade}
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-muted-foreground" />
                        {course.instructor}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-muted-foreground" />
                          <span>Next: {getNextClassTime(course.nextClass)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{course.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      
                      {/* Assignment status */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="flex flex-col items-center p-1 rounded bg-green-50">
                          <span className="text-lg font-medium text-green-600">{course.assignments.completed}</span>
                          <span className="text-xs text-muted-foreground">Completed</span>
                        </div>
                        <div className="flex flex-col items-center p-1 rounded bg-orange-50">
                          <span className="text-lg font-medium text-orange-600">{course.assignments.pending}</span>
                          <span className="text-xs text-muted-foreground">Pending</span>
                        </div>
                        <div className="flex flex-col items-center p-1 rounded bg-azure-50">
                          <span className="text-lg font-medium text-azure-600">{course.assignments.upcoming}</span>
                          <span className="text-xs text-muted-foreground">Upcoming</span>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-azure-600 h-2.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-right text-muted-foreground mt-1">
                          {course.progress}% Complete
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      <span>Go to Classroom</span>
                      <ArrowUpRight size={14} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCourses.filter(course => course.status === 'completed').map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{course.code}</Badge>
                      {course.grade && (
                        <span className={`px-2 py-1 rounded-md text-sm font-medium 
                          ${course.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                          course.grade.startsWith('B') ? 'bg-azure-100 text-azure-800' :
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                          {course.grade}
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-muted-foreground" />
                        {course.instructor}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
                      </div>
                      
                      {/* Assignment status */}
                      <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm text-gray-600">Assignments</span>
                        <span className="text-sm font-medium">
                          {course.assignments.completed}/{course.assignments.total} Completed
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gray-500 h-2.5 rounded-full" 
                            style={{ width: `100%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-right text-muted-foreground mt-1">
                          Course Completed
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      <span>View Course Materials</span>
                      <ArrowUpRight size={14} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={course.status === 'active' ? 'bg-azure-600 hover:bg-azure-700' : 'bg-gray-500'}>
                        {course.code}
                      </Badge>
                      {course.grade && (
                        <span className={`px-2 py-1 rounded-md text-sm font-medium 
                          ${course.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                          course.grade.startsWith('B') ? 'bg-azure-100 text-azure-800' :
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                          {course.grade}
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-muted-foreground" />
                        {course.instructor}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      {course.status === 'active' ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-muted-foreground" />
                              <span>Next: {getNextClassTime(course.nextClass)}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{course.room}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Calendar size={14} className="text-muted-foreground" />
                            <span>{course.schedule}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-sm">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span>{formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
                        </div>
                      )}
                      
                      {/* Assignment status */}
                      {course.status === 'active' ? (
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="flex flex-col items-center p-1 rounded bg-green-50">
                            <span className="text-lg font-medium text-green-600">{course.assignments.completed}</span>
                            <span className="text-xs text-muted-foreground">Completed</span>
                          </div>
                          <div className="flex flex-col items-center p-1 rounded bg-orange-50">
                            <span className="text-lg font-medium text-orange-600">{course.assignments.pending}</span>
                            <span className="text-xs text-muted-foreground">Pending</span>
                          </div>
                          <div className="flex flex-col items-center p-1 rounded bg-azure-50">
                            <span className="text-lg font-medium text-azure-600">{course.assignments.upcoming}</span>
                            <span className="text-xs text-muted-foreground">Upcoming</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50">
                          <span className="text-sm text-gray-600">Assignments</span>
                          <span className="text-sm font-medium">
                            {course.assignments.completed}/{course.assignments.total} Completed
                          </span>
                        </div>
                      )}
                      
                      {/* Progress bar */}
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`${course.status === 'active' ? 'bg-azure-600' : 'bg-gray-500'} h-2.5 rounded-full`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-right text-muted-foreground mt-1">
                          {course.status === 'active' ? `${course.progress}% Complete` : 'Course Completed'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      <span>{course.status === 'active' ? 'Go to Classroom' : 'View Course Materials'}</span>
                      <ArrowUpRight size={14} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;
