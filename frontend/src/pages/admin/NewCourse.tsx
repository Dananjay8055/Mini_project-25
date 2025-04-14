
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
import {
  ArrowLeft,
  CalendarIcon,
  Plus,
  Trash,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const NewCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    department: 'computer-science',
    description: '',
    credits: '3',
    startDate: '',
    endDate: '',
  });
  
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [newPrereq, setNewPrereq] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle department selection
  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };
  
  // Handle credits selection
  const handleCreditsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, credits: value }));
  };
  
  // Add prerequisite
  const addPrerequisite = () => {
    if (newPrereq && !prerequisites.includes(newPrereq)) {
      setPrerequisites([...prerequisites, newPrereq]);
      setNewPrereq('');
    }
  };
  
  // Remove prerequisite
  const removePrerequisite = (prereq: string) => {
    setPrerequisites(prerequisites.filter(p => p !== prereq));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would normally make an API call to create the course
      // For now, we'll simulate a successful creation
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Course Created",
        description: `${formData.title} (${formData.code}) has been successfully added.`,
      });
      
      // Navigate back to courses list
      navigate('/admin/courses');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
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
              onClick={() => navigate('/admin/courses')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Add New Course</h1>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Create a new course in the system. Fill in all required information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Introduction to Computer Science" 
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Course Code */}
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input 
                  id="code" 
                  name="code"
                  placeholder="CS101" 
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={handleDepartmentChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Credits */}
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Select 
                    value={formData.credits} 
                    onValueChange={handleCreditsChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select credits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Credit</SelectItem>
                      <SelectItem value="2">2 Credits</SelectItem>
                      <SelectItem value="3">3 Credits</SelectItem>
                      <SelectItem value="4">4 Credits</SelectItem>
                      <SelectItem value="5">5 Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                
                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Provide a detailed description of the course" 
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-32"
                  required
                />
              </div>
              
              {/* Prerequisites */}
              <div className="space-y-4">
                <Label>Prerequisites</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add course code (e.g., MATH101)" 
                    value={newPrereq}
                    onChange={(e) => setNewPrereq(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={addPrerequisite}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                
                {prerequisites.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <Separator />
                    <p className="text-sm font-medium">Prerequisites:</p>
                    <ul className="space-y-2">
                      {prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md">
                          <span>{prereq}</span>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePrerequisite(prereq)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate('/admin/courses')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Course'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewCourse;
