
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search, 
  Plus, 
  Filter,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Courses = () => {
  // This would normally come from an API or context
  const courses = [
    { id: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', credits: 3, students: 45, status: 'Active' },
    { id: 'MATH201', name: 'Calculus II', department: 'Mathematics', credits: 4, students: 32, status: 'Active' },
    { id: 'PHYS150', name: 'Physics for Engineers', department: 'Physics', credits: 4, students: 38, status: 'Active' },
    { id: 'BIO110', name: 'Introduction to Biology', department: 'Biology', credits: 3, students: 50, status: 'Full' },
    { id: 'ENG205', name: 'Creative Writing', department: 'English', credits: 3, students: 22, status: 'Available' },
    { id: 'HIST101', name: 'World History', department: 'History', credits: 3, students: 0, status: 'Inactive' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Full': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-muted text-gray-800';
      default: return 'bg-muted text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Course Management</h1>
            <p className="text-muted-foreground">Manage and create courses across departments</p>
          </div>
          <Button className="flex gap-2 w-full sm:w-auto">
            <Plus size={16} />
            New Course
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter size={16} />
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Courses List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course ID</TableHead>
                  <TableHead>Course Name</TableHead>
                  {!isMobile && <TableHead>Department</TableHead>}
                  {!isMobile && <TableHead>Credits</TableHead>}
                  {!isMobile && <TableHead>Students</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.id}</TableCell>
                    <TableCell>
                      <div>
                        {course.name}
                        {isMobile && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            {course.department} • {course.credits} cr • {course.students} students
                          </div>
                        )}
                      </div>
                    </TableCell>
                    {!isMobile && <TableCell>{course.department}</TableCell>}
                    {!isMobile && <TableCell>{course.credits}</TableCell>}
                    {!isMobile && <TableCell>{course.students}</TableCell>}
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
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Course</DropdownMenuItem>
                          <DropdownMenuItem>Manage Schedule</DropdownMenuItem>
                          <DropdownMenuItem>View Students</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
