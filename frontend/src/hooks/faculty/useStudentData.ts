
import { useState, useMemo } from 'react';

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

export const useStudentData = () => {
  // Mock student data - in a real app, this would come from an API
  const students: Student[] = [
    { id: 1, name: 'Emma Johnson', email: 'emma.j@azurescholars.edu', avatar: '/avatars/emma.jpg', status: 'Active', year: 'Sophomore', major: 'Computer Science', gpa: 3.8, semester: 'Spring 2025', class: 'CS101: Intro to Programming' },
    { id: 2, name: 'James Wilson', email: 'j.wilson@azurescholars.edu', avatar: '/avatars/james.jpg', status: 'Active', year: 'Junior', major: 'Mathematics', gpa: 3.5, semester: 'Spring 2025', class: 'MATH201: Calculus II' },
    { id: 3, name: 'Sophia Brown', email: 's.brown@azurescholars.edu', avatar: '/avatars/sophia.jpg', status: 'Warning', year: 'Freshman', major: 'Engineering', gpa: 2.9, semester: 'Fall 2024', class: 'CS101: Intro to Programming' },
    { id: 4, name: 'Liam Garcia', email: 'l.garcia@azurescholars.edu', avatar: '/avatars/liam.jpg', status: 'Active', year: 'Senior', major: 'Physics', gpa: 4.0, semester: 'Fall 2024', class: 'PHYS150: Quantum Physics' },
    { id: 5, name: 'Olivia Martinez', email: 'o.martinez@azurescholars.edu', avatar: '/avatars/olivia.jpg', status: 'Inactive', year: 'Sophomore', major: 'Biology', gpa: 3.2, semester: 'Spring 2025', class: 'BIO110: Cell Biology' },
    { id: 6, name: 'Noah Clark', email: 'n.clark@azurescholars.edu', avatar: '/avatars/noah.jpg', status: 'Active', year: 'Junior', major: 'Computer Science', gpa: 3.7, semester: 'Fall 2024', class: 'CS201: Data Structures' },
    { id: 7, name: 'Isabella Wright', email: 'i.wright@azurescholars.edu', avatar: '/avatars/isabella.jpg', status: 'Active', year: 'Sophomore', major: 'Chemistry', gpa: 3.4, semester: 'Spring 2025', class: 'CHEM110: Organic Chemistry' },
  ];

  // States for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  // Get unique semesters and classes for filters
  const semesters = useMemo(() => 
    Array.from(new Set(students.map(student => student.semester))),
    []
  );
  
  const classes = useMemo(() => 
    Array.from(new Set(students.map(student => student.class))),
    []
  );

  // Filter students based on search term and filters
  const filteredStudents = useMemo(() => 
    students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSemester = selectedSemester ? student.semester === selectedSemester : true;
      const matchesClass = selectedClass ? student.class === selectedClass : true;
      
      return matchesSearch && matchesSemester && matchesClass;
    }),
    [searchTerm, selectedSemester, selectedClass, students]
  );

  const resetFilters = () => {
    setSelectedSemester('');
    setSelectedClass('');
  };

  return {
    students: filteredStudents,
    searchTerm,
    setSearchTerm,
    selectedSemester,
    setSelectedSemester,
    selectedClass,
    setSelectedClass,
    semesters,
    classes,
    resetFilters
  };
};
