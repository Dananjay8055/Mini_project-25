
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
  Image as ImageIcon,
  X,
  Tag as TagIcon,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const NewPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'announcements',
    publishNow: true,
  });
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handle cover image upload
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add tag
  const addTag = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && newTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would normally make an API call to create the blog post
      // For now, we'll simulate a successful creation
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Post Created",
        description: `"${formData.title}" has been successfully published.`,
      });
      
      // Navigate back to blog management
      navigate('/admin/blog-management');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
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
              onClick={() => navigate('/admin/blog-management')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create New Post</h1>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
              <CardDescription>
                Create a new blog post. Fill in all required fields and add any relevant tags.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Post Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Enter post title" 
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Summary */}
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea 
                  id="summary" 
                  name="summary"
                  placeholder="Brief summary of the post (displayed in previews)" 
                  value={formData.summary}
                  onChange={handleChange}
                  className="min-h-20"
                  required
                />
              </div>
              
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcements">Announcements</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="resources">Resources</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Cover Image */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className={`border-2 border-dashed rounded-lg p-4 ${coverImagePreview ? 'border-transparent' : 'border-gray-300'} transition-all`}>
                  {coverImagePreview ? (
                    <div className="relative">
                      <img 
                        src={coverImagePreview} 
                        alt="Cover preview" 
                        className="w-full h-64 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => {
                          setCoverImage(null);
                          setCoverImagePreview(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-muted-foreground font-medium">Click to upload cover image</span>
                      <span className="text-gray-400 text-sm mt-1">SVG, PNG, JPG or GIF (max. 2MB)</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} className="px-2 py-1 flex items-center gap-1">
                      <span>{tag}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)} 
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <TagIcon className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="tags"
                    placeholder="Type a tag and press Enter or comma" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={addTag}
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  name="content"
                  placeholder="Write your post content here (supports markdown)" 
                  value={formData.content}
                  onChange={handleChange}
                  className="min-h-[300px]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full md:w-auto order-2 md:order-1">
                <Button 
                  variant="outline" 
                  type="button"
                  className="w-full"
                  onClick={() => navigate('/admin/blog-management')}
                >
                  Cancel
                </Button>
              </div>
              <div className="flex gap-2 w-full md:w-auto order-1 md:order-2">
                <Button 
                  variant="outline" 
                  type="button"
                  className="flex-1"
                  onClick={() => {
                    // Save as draft logic would go here
                    toast({
                      title: "Post Saved",
                      description: "Post has been saved as draft.",
                    });
                  }}
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewPost;
