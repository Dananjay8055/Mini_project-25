
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { GradePageHeader } from './GradePageHeader';
import { CourseSelector } from './CourseSelector';
import { GradingTable } from './GradingTable';
import { GradingInstructions } from './GradingInstructions';
import { useGrades } from './useGrades';

const FacultyGrades = () => {
  const { 
    selectedCourse, 
    setSelectedCourse,
    searchQuery, 
    setSearchQuery,
    unsavedChanges,
    filteredStudents,
    courses,
    handleSaveGrades,
    handleSubmitFinalGrades,
    handleImportGrades,
    handleExportGrades,
    handleGradeChange
  } = useGrades();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <GradePageHeader 
          unsavedChanges={unsavedChanges}
          onSave={handleSaveGrades}
          onSubmitFinal={handleSubmitFinalGrades}
          onImport={handleImportGrades}
          onExport={handleExportGrades}
        />
        
        <CourseSelector 
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <GradingTable 
          selectedCourse={selectedCourse}
          courses={courses}
          filteredStudents={filteredStudents}
          handleGradeChange={handleGradeChange}
        />
        
        <GradingInstructions />
      </div>
    </DashboardLayout>
  );
};

export default FacultyGrades;
