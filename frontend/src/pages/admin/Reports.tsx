
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Download, FileText } from 'lucide-react';

// Sample data for charts
const enrollmentData = [
  { name: 'Jan', students: 400 },
  { name: 'Feb', students: 430 },
  { name: 'Mar', students: 448 },
  { name: 'Apr', students: 470 },
  { name: 'May', students: 540 },
  { name: 'Jun', students: 580 },
  { name: 'Jul', students: 590 },
  { name: 'Aug', students: 650 },
  { name: 'Sep', students: 710 },
  { name: 'Oct', students: 720 },
  { name: 'Nov', students: 730 },
  { name: 'Dec', students: 700 },
];

const gradeDistributionData = [
  { grade: 'A+', count: 120 },
  { grade: 'A', count: 240 },
  { grade: 'A-', count: 180 },
  { grade: 'B+', count: 220 },
  { grade: 'B', count: 190 },
  { grade: 'B-', count: 150 },
  { grade: 'C+', count: 100 },
  { grade: 'C', count: 80 },
  { grade: 'C-', count: 50 },
  { grade: 'D+', count: 30 },
  { grade: 'D', count: 20 },
  { grade: 'F', count: 10 },
];

const departmentData = [
  { name: 'Computer Science', students: 450 },
  { name: 'Engineering', students: 380 },
  { name: 'Mathematics', students: 280 },
  { name: 'Physics', students: 220 },
  { name: 'Chemistry', students: 190 },
  { name: 'Biology', students: 210 },
  { name: 'English', students: 170 },
  { name: 'History', students: 150 },
];

const Reports = () => {
  const isMobile = useIsMobile();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">View insights and metrics about the institution</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <FileText className="h-4 w-4" />
              <span>Full Report</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="enrollment" className="space-y-4">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrollment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentData} margin={{ top: 5, right: 20, bottom: 5, left: isMobile ? 0 : 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                      <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 30 : 40} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Line type="monotone" dataKey="students" stroke="#0284c7" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Monthly student enrollment for the past year
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradeDistributionData} margin={{ top: 5, right: 20, bottom: 5, left: isMobile ? 0 : 20 }}>
                      <XAxis dataKey="grade" tick={{ fontSize: isMobile ? 10 : 12 }} />
                      <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 30 : 40} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Distribution of grades across all courses
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Students by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData} margin={{ top: 5, right: 20, bottom: 5, left: isMobile ? 0 : 20 }} layout={isMobile ? "vertical" : "horizontal"}>
                      {isMobile ? (
                        <>
                          <XAxis type="number" tick={{ fontSize: 10 }} />
                          <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                        </>
                      ) : (
                        <>
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                        </>
                      )}
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Bar dataKey="students" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Number of enrolled students by department
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
