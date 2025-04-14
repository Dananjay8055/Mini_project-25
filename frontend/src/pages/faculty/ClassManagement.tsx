
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  MoreVertical,
  Users,
  FileText,
  Calendar,
  ClipboardList,
  FileEdit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for faculty's classes
const initialClasses = [
  {
    id: '1',
    name: 'Computer Science 101',
    courseCode: 'CS101',
    semester: 'Fall 2025',
    students: 32,
    schedule: 'Mon/Wed 10:00-11:30 AM',
    room: 'Room 101',
  },
  {
    id: '2',
    name: 'Introduction to Algorithms',
    courseCode: 'CS205',
    semester: 'Fall 2025',
    students: 28,
    schedule: 'Tue/Thu 1:00-2:30 PM',
    room: 'Room 205',
  },
  {
    id: '3',
    name: 'Data Structures',
    courseCode: 'CS203',
    semester: 'Fall 2025',
    students: 25,
    schedule: 'Mon/Wed 2:00-3:30 PM',
    room: 'Room 103',
  },
];

const ClassManagement = () => {
  const navigate = useNavigate();
  const [classes] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  // Filter classes based on search term and semester filter
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = !semesterFilter || cls.semester === semesterFilter;
    
    return matchesSearch && matchesSemester;
  });

  const semesters = ['Fall 2025', 'Spring 2026', 'Summer 2026'];

  const viewStudents = (classId: string) => {
    navigate('/faculty/students', { state: { classId } });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground">Manage your classes and students</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Current Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead className="hidden md:table-cell">Code</TableHead>
                    <TableHead className="hidden md:table-cell">Semester</TableHead>
                    <TableHead className="hidden md:table-cell">Students</TableHead>
                    <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{cls.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              {cls.courseCode} | {cls.semester}
                            </div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              {cls.students} students
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{cls.courseCode}</TableCell>
                        <TableCell className="hidden md:table-cell">{cls.semester}</TableCell>
                        <TableCell className="hidden md:table-cell">{cls.students}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-col">
                            <span>{cls.schedule}</span>
                            <span className="text-sm text-muted-foreground">{cls.room}</span>
                          </div>
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
                              <DropdownMenuItem onClick={() => viewStudents(cls.id)}>
                                <Users className="h-4 w-4 mr-2" />
                                View Students
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Manage Grades
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Attendance
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileEdit className="h-4 w-4 mr-2" />
                                Edit Syllabus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No classes found.
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

export default ClassManagement;
