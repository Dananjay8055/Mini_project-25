
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { PlusCircle, Search, MoreVertical, Users, Trash2, Edit, Calendar } from 'lucide-react';

// Mock data for classes
const initialClasses = [
  {
    id: '1',
    name: 'Computer Science 101',
    courseCode: 'CS101',
    semester: 'Fall 2025',
    faculty: 'Dr. Jane Smith',
    students: 32,
    schedule: 'Mon/Wed 10:00-11:30 AM',
    room: 'Room 101',
  },
  {
    id: '2',
    name: 'Introduction to Algorithms',
    courseCode: 'CS205',
    semester: 'Fall 2025',
    faculty: 'Dr. Michael Brown',
    students: 28,
    schedule: 'Tue/Thu 1:00-2:30 PM',
    room: 'Room 205',
  },
  {
    id: '3',
    name: 'Data Structures',
    courseCode: 'CS203',
    semester: 'Fall 2025',
    faculty: 'Dr. Robert Taylor',
    students: 25,
    schedule: 'Mon/Wed 2:00-3:30 PM',
    room: 'Room 103',
  },
  {
    id: '4',
    name: 'Machine Learning',
    courseCode: 'CS401',
    semester: 'Fall 2025',
    faculty: 'Dr. Sarah Johnson',
    students: 22,
    schedule: 'Fri 9:00 AM-12:00 PM',
    room: 'Lab 301',
  },
  {
    id: '5',
    name: 'Web Development',
    courseCode: 'CS301',
    semester: 'Fall 2025',
    faculty: 'Prof. David Wilson',
    students: 34,
    schedule: 'Tue/Thu 3:00-4:30 PM',
    room: 'Room 206',
  },
];

const ClassManagement = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  // Filter classes based on search term and semester filter
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = !semesterFilter || cls.semester === semesterFilter;
    
    return matchesSearch && matchesSemester;
  });

  const semesters = ['Fall 2025', 'Spring 2026', 'Summer 2026'];

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Class Management</h1>
            <p className="text-muted-foreground">Manage all classes across the institution</p>
          </div>
          <Button asChild>
            <Link to="/admin/classes/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Class
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Classes</CardTitle>
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
                    <TableHead className="hidden md:table-cell">Faculty</TableHead>
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
                              {cls.faculty}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{cls.courseCode}</TableCell>
                        <TableCell className="hidden md:table-cell">{cls.semester}</TableCell>
                        <TableCell className="hidden md:table-cell">{cls.faculty}</TableCell>
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
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Class
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                Manage Students
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClass(cls.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Class
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
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
