
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileSpreadsheet, Filter, HelpCircle } from 'lucide-react';
import { Student } from './useGrades';

interface Course {
  id: string;
  name: string;
  students: number;
  section: string;
  term: string;
}

interface GradingTableProps {
  selectedCourse: string;
  courses: Course[];
  filteredStudents: Student[];
  handleGradeChange: (studentId: number, category: string, value: string) => void;
}

export const GradingTable: React.FC<GradingTableProps> = ({
  selectedCourse,
  courses,
  filteredStudents,
  handleGradeChange
}) => {
  // Determine if there are any unsaved changes
  const unsavedChanges = filteredStudents.some(student => !student.submitted);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Student Grades: {selectedCourse} - {courses.find(c => c.id === selectedCourse)?.name}</CardTitle>
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-xs flex gap-1">
              <Filter className="h-3 w-3" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-xs flex gap-1">
              <HelpCircle className="h-3 w-3" />
              Help
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="w-[100px] text-center">ID</TableHead>
              <TableHead className="w-[80px] text-center">
                <div className="text-center">
                  <span>Attend.</span>
                  <div className="text-xs font-normal">10%</div>
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center">
                <div className="text-center">
                  <span>Assign.</span>
                  <div className="text-xs font-normal">30%</div>
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center">
                <div className="text-center">
                  <span>Midterm</span>
                  <div className="text-xs font-normal">15%</div>
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center">
                <div className="text-center">
                  <span>Project</span>
                  <div className="text-xs font-normal">20%</div>
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center">
                <div className="text-center">
                  <span>Final</span>
                  <div className="text-xs font-normal">25%</div>
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center">Total</TableHead>
              <TableHead className="w-[80px] text-center">Grade</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell className="text-center">{student.studentId}</TableCell>
                <TableCell className="p-1 text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.attendance}
                    onChange={(e) => handleGradeChange(student.id, 'attendance', e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="p-1 text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.assignments}
                    onChange={(e) => handleGradeChange(student.id, 'assignments', e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="p-1 text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.midterm}
                    onChange={(e) => handleGradeChange(student.id, 'midterm', e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="p-1 text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.project}
                    onChange={(e) => handleGradeChange(student.id, 'project', e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="p-1 text-center">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.final}
                    onChange={(e) => handleGradeChange(student.id, 'final', e.target.value)}
                    className="h-8 text-center"
                  />
                </TableCell>
                <TableCell className="font-bold text-center">{student.total.toFixed(1)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={
                    student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                    student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                    student.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {student.grade}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {student.submitted ? (
                    <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Showing {filteredStudents.length} of {filteredStudents.length} students</span>
          </div>
          {unsavedChanges && (
            <div className="flex items-center text-sm text-amber-600">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span>Unsaved changes</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
