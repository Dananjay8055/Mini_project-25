
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
  year: string;
  major: string;
  gpa: number;
  semester: string;
  class: string;
}

interface StudentsListProps {
  students: Student[];
  selectedSemester: string;
  selectedClass: string;
  onSemesterChange: (value: string) => void;
  onClassChange: (value: string) => void;
}

const StudentsList = ({ 
  students, 
  selectedSemester, 
  selectedClass, 
  onSemesterChange, 
  onClassChange 
}: StudentsListProps) => {
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-gray-800';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Major</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Class</TableHead>
          <TableHead className="text-right">GPA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length > 0 ? (
          students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(student.status)} variant="outline">
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell>{student.year}</TableCell>
              <TableCell>{student.major}</TableCell>
              <TableCell>{student.semester}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell className="text-right font-medium">{student.gpa.toFixed(1)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              No students match the current filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StudentsList;
