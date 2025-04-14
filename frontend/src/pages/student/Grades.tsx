
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, Printer, Download, TrendingUp, Star, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const StudentGrades = () => {
  const { toast } = useToast();

  // Sample data for demonstration
  const semesters = [
    { id: 'current', name: 'Current Semester' },
    { id: 'spring2025', name: 'Spring 2025' },
    { id: 'fall2024', name: 'Fall 2024' },
    { id: 'spring2024', name: 'Spring 2024' },
  ];

  const gradeScales = {
    'A+': { min: 97, max: 100, gpa: 4.0 },
    'A': { min: 93, max: 96.9, gpa: 4.0 },
    'A-': { min: 90, max: 92.9, gpa: 3.7 },
    'B+': { min: 87, max: 89.9, gpa: 3.3 },
    'B': { min: 83, max: 86.9, gpa: 3.0 },
    'B-': { min: 80, max: 82.9, gpa: 2.7 },
    'C+': { min: 77, max: 79.9, gpa: 2.3 },
    'C': { min: 73, max: 76.9, gpa: 2.0 },
    'C-': { min: 70, max: 72.9, gpa: 1.7 },
    'D+': { min: 67, max: 69.9, gpa: 1.3 },
    'D': { min: 63, max: 66.9, gpa: 1.0 },
    'D-': { min: 60, max: 62.9, gpa: 0.7 },
    'F': { min: 0, max: 59.9, gpa: 0.0 },
  };

  // Transcript summary
  const transcriptSummary = {
    overallGPA: 3.7,
    creditsAttempted: 68,
    creditsEarned: 68,
    honorPoints: 251.6,
  };

  // Current courses with grades
  const currentCourses = [
    { id: 1, code: 'CS101', title: 'Introduction to Computer Science', credits: 4, grade: 'A-', percent: 91.5, instructor: 'Dr. Alan Turing' },
    { id: 2, code: 'MATH204', title: 'Linear Algebra', credits: 3, grade: 'B+', percent: 88.2, instructor: 'Dr. Emmy Noether' },
    { id: 3, code: 'ENG105', title: 'Technical Communication', credits: 3, grade: 'A', percent: 94.7, instructor: 'Prof. Jane Smith' },
    { id: 4, code: 'PHYS201', title: 'Physics for Engineers', credits: 4, grade: 'B', percent: 85.3, instructor: 'Dr. Richard Feynman' },
  ];

  // Past courses
  const pastCourses = {
    'spring2024': [
      { id: 1, code: 'CS201', title: 'Data Structures', credits: 4, grade: 'A', percent: 95.0, instructor: 'Dr. Donald Knuth' },
      { id: 2, code: 'MATH104', title: 'Calculus II', credits: 4, grade: 'A-', percent: 92.1, instructor: 'Dr. Katherine Johnson' },
      { id: 3, code: 'HIST101', title: 'World History', credits: 3, grade: 'B+', percent: 88.5, instructor: 'Prof. Edward Gibbon' },
      { id: 4, code: 'BIO101', title: 'Introduction to Biology', credits: 4, grade: 'B', percent: 84.7, instructor: 'Dr. Rosalind Franklin' },
    ],
    'fall2024': [
      { id: 1, code: 'CS301', title: 'Database Systems', credits: 4, grade: 'A', percent: 96.1, instructor: 'Dr. Edgar Codd' },
      { id: 2, code: 'MATH304', title: 'Probability & Statistics', credits: 3, grade: 'A-', percent: 91.8, instructor: 'Dr. Ronald Fisher' },
      { id: 3, code: 'PHIL202', title: 'Ethics in Technology', credits: 3, grade: 'A', percent: 95.2, instructor: 'Prof. Martha Nussbaum' },
      { id: 4, code: 'ECON101', title: 'Principles of Economics', credits: 3, grade: 'B+', percent: 87.9, instructor: 'Dr. Adam Smith' },
    ],
  };

  // Calculate grade color based on letter grade
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  // Function to print grades
  const handlePrintGrades = () => {
    toast({
      title: "Printing Grades",
      description: "Your grades are being sent to the printer.",
    });
    window.print();
  };

  // Function to download grades as PDF
  const handleDownloadGrades = () => {
    toast({
      title: "Download Started",
      description: "Your grades report is being downloaded.",
    });
    // In a real application, this would generate and download a PDF
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">My Grades</h1>
          <p className="text-muted-foreground">View and track your academic performance</p>
        </div>

        {/* Transcript Summary Card */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Academic Transcript Summary</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handlePrintGrades}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadGrades}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium text-foreground">Overall GPA</p>
                <div className="flex justify-center">
                  <div className="mt-2 text-3xl font-bold text-azure-500 flex items-center">
                    {transcriptSummary.overallGPA}
                    <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium text-foreground">Credits Attempted</p>
                <p className="mt-2 text-3xl font-bold text-azure-500">{transcriptSummary.creditsAttempted}</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium text-foreground">Credits Earned</p>
                <p className="mt-2 text-3xl font-bold text-azure-500">{transcriptSummary.creditsEarned}</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm font-medium text-foreground">Honor Points</p>
                <p className="mt-2 text-3xl font-bold text-azure-500">{transcriptSummary.honorPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Grade Report */}
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-4">
            {semesters.map(semester => (
              <TabsTrigger key={semester.id} value={semester.id}>
                {semester.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Current Semester Grades */}
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle>Current Semester Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Course</TableHead>
                      <TableHead className="min-w-[250px]">Title</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={course.percent} className="h-2 w-[60px]" />
                            <span className="text-sm">{course.percent}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {course.percent >= 90 ? (
                            <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                          ) : course.percent >= 80 ? (
                            <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                          ) : course.percent >= 70 ? (
                            <Badge className="bg-yellow-100 text-yellow-800">Satisfactory</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 text-azure-600" />
                    <span>Semester GPA: <strong>3.65</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Final exams may affect your grades</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Past Semester Grades */}
          {Object.keys(pastCourses).map((semesterKey) => (
            <TabsContent key={semesterKey} value={semesterKey}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {semesters.find(s => s.id === semesterKey)?.name} Grades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Course</TableHead>
                        <TableHead className="min-w-[250px]">Title</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastCourses[semesterKey as keyof typeof pastCourses].map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={course.percent} className="h-2 w-[60px]" />
                              <span className="text-sm">{course.percent}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileSpreadsheet className="h-4 w-4 text-azure-600" />
                    <span>Semester GPA: <strong>{semesterKey === 'fall2024' ? '3.83' : '3.55'}</strong></span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Grade Scale Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grade Scale Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(gradeScales).map(([grade, scale]) => (
                <div key={grade} className="flex items-center gap-2">
                  <Badge variant="outline" className={getGradeColor(grade)}>
                    {grade}
                  </Badge>
                  <span className="text-sm text-foreground">
                    {scale.min}-{scale.max}% ({scale.gpa})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentGrades;
