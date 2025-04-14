
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StudentsList from '@/components/faculty/students/StudentsList';
import StudentFilters from '@/components/faculty/students/StudentFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useStudentData } from '@/hooks/faculty/useStudentData';
import { Download, FileText, Plus, Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MyStudents = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { 
    students,
    searchTerm, 
    setSearchTerm, 
    selectedSemester,
    setSelectedSemester,
    selectedClass,
    setSelectedClass,
    semesters,
    classes,
    resetFilters
  } = useStudentData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Students</h1>
          <p className="text-muted-foreground">View and manage your students across all courses</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate("/faculty/reports")}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <FileText className="h-4 w-4" />
            <span>View Reports</span>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </Button>
            <Button 
              variant="default" 
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 py-3 border-b">
              <StudentFilters 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSemester={selectedSemester}
                onSemesterChange={setSelectedSemester}
                selectedClass={selectedClass}
                onClassChange={setSelectedClass}
                semesters={semesters}
                classes={classes}
                resetFilters={resetFilters}
                isMobile={isMobile}
              />
            </div>
            <StudentsList 
              students={students} 
              selectedSemester={selectedSemester}
              selectedClass={selectedClass}
              onSemesterChange={setSelectedSemester}
              onClassChange={setSelectedClass}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyStudents;
