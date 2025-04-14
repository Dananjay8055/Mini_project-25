import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Book, GraduationCap } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// Mock student data
const studentData = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@azurescholars.edu',
  phone: '(555) 123-4567',
  avatar: null, // No image to show avatar fallback
  dateOfBirth: 'March 15, 2002',
  address: '123 Campus Drive, University City',
  major: 'Computer Science',
  year: 'Junior',
  gpa: 3.75,
  enrollmentDate: 'August 2023',
  advisorName: 'Dr. Sarah Parker',
  classes: [
    { id: '1', name: 'Computer Science 101', grade: 'A', attendance: 95 },
    { id: '2', name: 'Introduction to Algorithms', grade: 'B+', attendance: 88 },
    { id: '3', name: 'Data Structures', grade: 'A-', attendance: 92 },
  ],
  attendance: [
    { month: 'Jan', attendance: 95 },
    { month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 88 },
    { month: 'Apr', attendance: 94 },
    { month: 'May', attendance: 90 },
    { month: 'Jun', attendance: 96 },
  ],
  grades: [
    { assignment: 'Quiz 1', score: 85 },
    { assignment: 'Midterm', score: 92 },
    { assignment: 'Project', score: 88 },
    { assignment: 'Quiz 2', score: 78 },
    { assignment: 'Final', score: 91 },
  ],
  academicHistory: [
    { semester: 'Fall 2023', gpa: 3.7 },
    { semester: 'Spring 2024', gpa: 3.8 },
    { semester: 'Fall 2024', gpa: 3.75 },
    { semester: 'Spring 2025', gpa: 3.9 },
  ],
};

// Performance calculation helper (for demonstration)
const calculatePerformanceMetrics = () => {
  const attendance = studentData.attendance.reduce((sum, month) => sum + month.attendance, 0) / 
                    studentData.attendance.length;
  
  const grades = studentData.grades.reduce((sum, assignment) => sum + assignment.score, 0) / 
                studentData.grades.length;
                
  return {
    attendancePercentage: attendance,
    gradesPercentage: grades / 100,
    participationScore: 85, // Example fixed value
    overallPerformance: ((attendance + (grades / 100 * 100) + 85) / 3).toFixed(1)
  };
};

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState(studentData);
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceMetrics] = useState(calculatePerformanceMetrics);

  // In a real app, we would fetch the student data based on the ID
  useEffect(() => {
    // Simulating data fetch
    console.log(`Fetching data for student ID: ${id}`);
    // In reality, you would make an API call here
  }, [id]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => navigate('/faculty/students')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Student Details</h1>
        </div>

        {/* Student Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar || ''} alt={student.name} />
                <AvatarFallback className="text-2xl bg-azure-100 text-azure-600">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">{student.major} • {student.year}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>DOB: {student.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{student.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4">
                <div className="bg-green-50 text-green-700 rounded-lg px-4 py-3 text-center">
                  <div className="text-3xl font-bold">{student.gpa}</div>
                  <div className="text-sm">Current GPA</div>
                </div>
                <div className="bg-blue-50 text-blue-700 rounded-lg px-4 py-3 text-center">
                  <div className="text-3xl font-bold">{performanceMetrics.overallPerformance}</div>
                  <div className="text-sm">Performance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="academic" className="hidden md:block">Academic History</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Overall academic performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-azure-600">{performanceMetrics.attendancePercentage}%</div>
                    <div className="text-sm text-muted-foreground mt-1">Attendance</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-azure-600">{(performanceMetrics.gradesPercentage * 100).toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground mt-1">Average Grade</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-azure-600">{performanceMetrics.participationScore}%</div>
                    <div className="text-sm text-muted-foreground mt-1">Participation</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg bg-azure-50">
                    <div className="text-3xl font-bold text-azure-600">{performanceMetrics.overallPerformance}</div>
                    <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Current Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Current Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.classes.map((cls) => (
                    <div key={cls.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Book className="h-5 w-5 text-azure-600" />
                        <div>
                          <div className="font-medium">{cls.name}</div>
                          <div className="text-sm text-muted-foreground">Current Grade: {cls.grade}</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <div className="text-sm">Attendance:</div>
                        <div className={`px-2 py-1 rounded ${
                          cls.attendance >= 90 ? 'bg-green-100 text-green-700' : 
                          cls.attendance >= 80 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}>{cls.attendance}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Major</div>
                      <div className="font-medium">{student.major}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Academic Year</div>
                      <div className="font-medium">{student.year}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Enrollment Date</div>
                      <div className="font-medium">{student.enrollmentDate}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Cumulative GPA</div>
                      <div className="font-medium">{student.gpa}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Academic Advisor</div>
                      <div className="font-medium">{student.advisorName}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">Current Status</div>
                      <div className="font-medium text-green-600">Active</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Performance</CardTitle>
                <CardDescription>Student's recent assessment grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      score: {
                        label: "Score",
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <LineChart data={student.grades}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="assignment" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-score, #3b82f6)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="mt-6 space-y-4">
                  {student.grades.map((grade, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="font-medium">{grade.assignment}</div>
                      <div className={`px-2 py-1 rounded ${
                        grade.score >= 90 ? 'bg-green-100 text-green-700' : 
                        grade.score >= 80 ? 'bg-blue-100 text-blue-700' : 
                        grade.score >= 70 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>{grade.score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>Monthly attendance percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      attendance: {
                        label: "Attendance",
                        color: "#22c55e",
                      },
                    }}
                  >
                    <LineChart data={student.attendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        stroke="var(--color-attendance, #22c55e)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {student.classes.map((cls) => (
                      <div key={cls.id} className="p-4 border rounded-lg">
                        <div className="font-medium">{cls.name}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <div
                            className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={cls.attendance}
                          >
                            <div
                              className={`h-full ${
                                cls.attendance >= 90 ? 'bg-green-500' : 
                                cls.attendance >= 80 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${cls.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{cls.attendance}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Academic History Tab */}
          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic History</CardTitle>
                <CardDescription>GPA history by semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      gpa: {
                        label: "GPA",
                        color: "#8b5cf6",
                      },
                    }}
                  >
                    <LineChart data={student.academicHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[3.0, 4.0]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="gpa"
                        stroke="var(--color-gpa, #8b5cf6)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="mt-6">
                  <div className="overflow-hidden border rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">Semester</th>
                          <th className="py-3 px-4 text-left font-medium">GPA</th>
                          <th className="py-3 px-4 text-left font-medium">Standing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.academicHistory.map((semester, index) => (
                          <tr key={index} className="border-t">
                            <td className="py-3 px-4">{semester.semester}</td>
                            <td className="py-3 px-4 font-medium">{semester.gpa}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                semester.gpa >= 3.7 ? 'bg-green-100 text-green-700' : 
                                semester.gpa >= 3.3 ? 'bg-blue-100 text-blue-700' : 
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {semester.gpa >= 3.7 ? 'Dean\'s List' : 
                                 semester.gpa >= 3.3 ? 'Good Standing' : 
                                 'Satisfactory'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Dean's List</div>
                      <div className="text-sm text-muted-foreground">Spring 2025</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Dean's List</div>
                      <div className="text-sm text-muted-foreground">Fall 2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-green-100 text-green-700 rounded">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Computer Science Department Award</div>
                      <div className="text-sm text-muted-foreground">Academic Excellence in Programming</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentDetails;
