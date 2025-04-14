
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Types
type Course = {
  id: string;
  name: string;
  students: number;
  section: string;
  term: string;
};

export type Student = {
  id: number;
  name: string;
  studentId: string;
  attendance: number;
  midterm: number;
  assignments: number;
  project: number;
  final: number;
  total: number;
  grade: string;
  submitted: boolean;
};

export const useGrades = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [searchQuery, setSearchQuery] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Sample data for demonstration
  const courses: Course[] = [
    { id: 'CS101', name: 'Introduction to Computer Science', students: 32, section: '001', term: 'Spring 2025' },
    { id: 'CS205', name: 'Data Structures and Algorithms', students: 28, section: '001', term: 'Spring 2025' },
    { id: 'CS310', name: 'Database Systems', students: 25, section: '002', term: 'Spring 2025' },
  ];

  // Sample students for current course
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Alice Johnson', studentId: '10045678', attendance: 95, midterm: 88, assignments: 92, project: 95, final: 90, total: 91.5, grade: 'A-', submitted: true },
    { id: 2, name: 'Bob Smith', studentId: '10056789', attendance: 85, midterm: 78, assignments: 85, project: 88, final: 82, total: 83.4, grade: 'B', submitted: true },
    { id: 3, name: 'Carol Martinez', studentId: '10067890', attendance: 98, midterm: 95, assignments: 96, project: 98, final: 94, total: 96.0, grade: 'A', submitted: true },
    { id: 4, name: 'David Wilson', studentId: '10078901', attendance: 75, midterm: 70, assignments: 72, project: 85, final: 78, total: 76.2, grade: 'C', submitted: false },
    { id: 5, name: 'Emma Davis', studentId: '10089012', attendance: 92, midterm: 87, assignments: 90, project: 91, final: 88, total: 89.4, grade: 'B+', submitted: true },
    { id: 6, name: 'Frank Thomas', studentId: '10090123', attendance: 80, midterm: 75, assignments: 78, project: 80, final: 82, total: 79.1, grade: 'C+', submitted: false },
    { id: 7, name: 'Grace Lee', studentId: '10001234', attendance: 100, midterm: 92, assignments: 95, project: 97, final: 91, total: 94.3, grade: 'A', submitted: true },
    { id: 8, name: 'Henry Brown', studentId: '10012345', attendance: 88, midterm: 84, assignments: 87, project: 89, final: 85, total: 86.4, grade: 'B', submitted: true },
  ]);

  // Function to handle grade changes
  const handleGradeChange = (studentId: number, category: string, value: string) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) return;
    
    setUnsavedChanges(true);
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [category]: numericValue };
          
          // Recalculate total score (weighted)
          const total = (
            updatedStudent.attendance * 0.1 + 
            updatedStudent.assignments * 0.3 + 
            updatedStudent.midterm * 0.15 + 
            updatedStudent.project * 0.2 + 
            updatedStudent.final * 0.25
          ).toFixed(1);
          
          // Determine letter grade
          let letterGrade;
          const totalNum = parseFloat(total);
          if (totalNum >= 97) letterGrade = 'A+';
          else if (totalNum >= 93) letterGrade = 'A';
          else if (totalNum >= 90) letterGrade = 'A-';
          else if (totalNum >= 87) letterGrade = 'B+';
          else if (totalNum >= 83) letterGrade = 'B';
          else if (totalNum >= 80) letterGrade = 'B-';
          else if (totalNum >= 77) letterGrade = 'C+';
          else if (totalNum >= 73) letterGrade = 'C';
          else if (totalNum >= 70) letterGrade = 'C-';
          else if (totalNum >= 67) letterGrade = 'D+';
          else if (totalNum >= 63) letterGrade = 'D';
          else if (totalNum >= 60) letterGrade = 'D-';
          else letterGrade = 'F';
          
          return { 
            ...updatedStudent, 
            total: parseFloat(total), 
            grade: letterGrade,
            submitted: false 
          };
        }
        return student;
      })
    );
  };

  // Function to save grades
  const handleSaveGrades = () => {
    // In a real app, this would send data to the server
    setUnsavedChanges(false);
    toast({
      title: "Grades Saved",
      description: "Student grades have been successfully saved.",
    });
  };

  // Function to submit final grades
  const handleSubmitFinalGrades = () => {
    setStudents(prevStudents => 
      prevStudents.map(student => ({
        ...student,
        submitted: true
      }))
    );
    
    toast({
      title: "Grades Submitted",
      description: "Final grades have been submitted to the registrar.",
    });
  };

  // Function to import grades from CSV
  const handleImportGrades = () => {
    toast({
      title: "Import Started",
      description: "Please select a CSV file to import grades.",
    });
    // In a real app, this would open a file picker and process the CSV
  };

  // Function to export grades to CSV
  const handleExportGrades = () => {
    toast({
      title: "Export Started",
      description: "Grades are being exported to CSV format.",
    });
    // In a real app, this would generate and download a CSV file
  };

  // Filter students by search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.studentId.includes(searchQuery)
  );

  return {
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
  };
};
