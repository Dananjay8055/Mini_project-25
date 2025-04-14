import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, MessageSquare, ThumbsUp, Share, BookOpen } from 'lucide-react';

// Sample blog posts
const samplePosts = [
  {
    id: '1',
    title: 'Introduction to Azure Cloud Computing',
    content: 'Azure provides a comprehensive set of cloud services that developers and IT professionals use to build, deploy, and manage applications...',
    author: {
      name: 'Admin User',
      avatar: '/admin-avatar.png',
      role: 'admin'
    },
    date: '2025-04-01T12:00:00Z',
    likes: 24,
    comments: 8,
    category: 'technology'
  },
  {
    id: '2',
    title: 'Best Practices for Online Learning',
    content: 'With the shift to remote education, it\'s important to establish effective study habits and learning strategies...',
    author: {
      name: 'Faculty User',
      avatar: '/faculty-avatar.png',
      role: 'faculty'
    },
    date: '2025-03-28T09:30:00Z',
    likes: 42,
    comments: 15,
    category: 'education'
  },
  {
    id: '3',
    title: 'Student Project Showcase: Machine Learning Applications',
    content: 'Our final year students have created impressive projects utilizing various machine learning techniques...',
    author: {
      name: 'Student User',
      avatar: '/student-avatar.png',
      role: 'student'
    },
    date: '2025-03-25T14:15:00Z',
    likes: 36,
    comments: 12,
    category: 'projects'
  },
];

const Blog = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Hub</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Input 
                placeholder="Search blog posts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span>New Post</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="my-posts">My Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-6">
            {samplePosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)} • {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-azure-100 text-azure-800 rounded-full">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t bg-background flex justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Share size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>Read More</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-6 mt-6">
            {samplePosts.filter(post => post.category === 'technology').map((post) => (
              
              <Card key={post.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)} • {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-azure-100 text-azure-800 rounded-full">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Share size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>Read More</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6 mt-6">
            {samplePosts.filter(post => post.category === 'education').map((post) => (
              
              <Card key={post.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)} • {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-azure-100 text-azure-800 rounded-full">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Share size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>Read More</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6 mt-6">
            {samplePosts.filter(post => post.category === 'projects').map((post) => (
              
              <Card key={post.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)} • {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-azure-100 text-azure-800 rounded-full">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Share size={16} />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>Read More</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="my-posts" className="space-y-6 mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Create your first blog post to share with the community</p>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>Create New Post</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
