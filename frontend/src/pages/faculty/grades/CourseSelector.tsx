
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: string;
  name: string;
  students: number;
  section: string;
  term: string;
}

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: string;
  setSelectedCourse: (courseId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourse,
  setSelectedCourse,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select defaultValue={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Current Courses</SelectLabel>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.id}: {course.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center h-full space-x-2">
              <div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {courses.find(c => c.id === selectedCourse)?.section || 'Section 001'}
                </Badge>
              </div>
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {courses.find(c => c.id === selectedCourse)?.term || 'Spring 2025'}
                </Badge>
              </div>
              <div>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  {courses.find(c => c.id === selectedCourse)?.students || '0'} Students
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
