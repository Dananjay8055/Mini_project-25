
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BookOpen,
  Download,
  FileText,
  Filter,
  MoreVertical,
  Search,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for faculty's courses
const facultyCourses = [
  {
    id: '1',
    code: 'CS101',
    title: 'Introduction to Computer Science',
    department: 'Computer Science',
    students: 45,
    status: 'Active',
    semester: 'Fall 2025',
    startDate: '2025-08-25',
    endDate: '2025-12-15',
  },
  {
    id: '2',
    code: 'CS205',
    title: 'Algorithm Design',
    department: 'Computer Science',
    students: 32,
    status: 'Active',
    semester: 'Fall 2025',
    startDate: '2025-08-25',
    endDate: '2025-12-15',
  },
  {
    id: '3',
    code: 'CS210',
    title: 'Data Structures',
    department: 'Computer Science',
    students: 28,
    status: 'Active',
    semester: 'Fall 2025',
    startDate: '2025-08-25',
    endDate: '2025-12-15',
  },
  {
    id: '4',
    code: 'CS303',
    title: 'Database Systems',
    department: 'Computer Science',
    students: 38,
    status: 'Upcoming',
    semester: 'Spring 2026',
    startDate: '2026-01-10',
    endDate: '2026-05-05',
  },
  {
    id: '5',
    code: 'CS401',
    title: 'Web Development',
    department: 'Computer Science',
    students: 0,
    status: 'Completed',
    semester: 'Spring 2025',
    startDate: '2025-01-15',
    endDate: '2025-05-10',
  },
];

const FacultyCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();

  // Filter courses based on search term
  const filteredCourses = facultyCourses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-muted text-gray-800';
      default:
        return 'bg-muted text-gray-800';
    }
  };

  const viewStudents = (courseId: string) => {
    navigate('/faculty/students', { state: { courseId } });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Courses</h1>
            <p className="text-muted-foreground">View and manage your assigned courses</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <FileText className="h-4 w-4" />
              <span>Syllabus Templates</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Download className="h-4 w-4" />
              <span>Export List</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Courses List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    {!isMobile && (
                      <>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Semester</TableHead>
                      </>
                    )}
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course.code}</div>
                            <div className="text-sm text-muted-foreground">{course.title}</div>
                            {isMobile && (
                              <div className="mt-1">
                                <div className="text-xs text-muted-foreground">{course.department}</div>
                                <div className="text-xs text-muted-foreground">{course.semester} • {course.students} students</div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        {!isMobile && (
                          <>
                            <TableCell>{course.department}</TableCell>
                            <TableCell>{course.students}</TableCell>
                            <TableCell>{course.semester}</TableCell>
                          </>
                        )}
                        <TableCell>
                          <Badge className={getStatusColor(course.status)} variant="outline">
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => viewStudents(course.id)}>
                                <Users className="h-4 w-4 mr-2" />
                                View Students
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                View Syllabus
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Course Materials
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Edit Course
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 3 : 6} className="h-24 text-center">
                        No courses found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyCourses;
