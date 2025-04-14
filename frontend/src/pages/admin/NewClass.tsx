
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewClass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    courseCode: '',
    faculty: '',
    semester: 'Fall 2025',
    startDate: '',
    endDate: '',
    schedule: '',
    location: '',
    capacity: '',
    description: '',
  });

  // Semester options
  const semesters = ['Fall 2025', 'Spring 2026', 'Summer 2026'];
  
  // Faculty options (mock data)
  const facultyOptions = [
    'Dr. Jane Smith',
    'Dr. Michael Brown',
    'Dr. Robert Taylor',
    'Dr. Sarah Johnson',
    'Prof. David Wilson'
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select input changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would normally make an API call to create the class
      // For now, we'll simulate a successful creation
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Class Created",
        description: `${formData.name} (${formData.courseCode}) has been successfully created for ${formData.semester}.`,
      });
      
      // Navigate back to classes list
      navigate('/admin/classes');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/classes')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create New Class</h1>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
              <CardDescription>
                Create a new class section. Fill in all required fields.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="e.g. Introduction to Computer Science" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Course Code */}
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input 
                    id="courseCode" 
                    name="courseCode"
                    placeholder="e.g. CS101" 
                    value={formData.courseCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Faculty */}
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty</Label>
                  <Select 
                    value={formData.faculty} 
                    onValueChange={(value) => handleSelectChange('faculty', value)}
                    required
                  >
                    <SelectTrigger id="faculty">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      {facultyOptions.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Semester */}
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select 
                    value={formData.semester} 
                    onValueChange={(value) => handleSelectChange('semester', value)}
                    required
                  >
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester} value={semester}>
                          {semester}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="startDate" 
                      name="startDate"
                      type="date"
                      className="pl-8" 
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="endDate" 
                      name="endDate"
                      type="date"
                      className="pl-8" 
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Schedule */}
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input 
                    id="schedule" 
                    name="schedule"
                    placeholder="e.g. Mon/Wed 10:00-11:30 AM" 
                    value={formData.schedule}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    placeholder="e.g. Room 101" 
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input 
                    id="capacity" 
                    name="capacity"
                    type="number"
                    min="1"
                    placeholder="Maximum number of students" 
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Class description and additional information" 
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-32"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate('/admin/classes')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Class'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewClass;
