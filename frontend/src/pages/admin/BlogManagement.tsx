
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BlogManagement = () => {
  const [activeTab, setActiveTab] = useState('published');
  
  // This would normally come from an API or context
  const blogPosts = [
    { 
      id: 1, 
      title: 'New Research Grant Opportunities', 
      author: 'Dr. Jane Smith', 
      authorAvatar: '/avatars/jane.jpg',
      department: 'Research Office',
      date: '2025-04-01', 
      status: 'Published',
      views: 1245,
      comments: 23
    },
    { 
      id: 2, 
      title: 'Campus Renovations Update', 
      author: 'Facilities Management', 
      authorAvatar: '/avatars/facilities.jpg',
      department: 'Administration',
      date: '2025-03-28', 
      status: 'Published',
      views: 987,
      comments: 15
    },
    { 
      id: 3, 
      title: 'Student Success Stories - Spring 2025', 
      author: 'Student Affairs', 
      authorAvatar: '/avatars/studentaffairs.jpg',
      department: 'Student Services',
      date: '2025-03-25', 
      status: 'Published',
      views: 1532,
      comments: 42
    },
    { 
      id: 4, 
      title: 'Upcoming Faculty Development Workshop', 
      author: 'Dr. Robert Johnson', 
      authorAvatar: '/avatars/robert.jpg',
      department: 'Faculty Affairs',
      date: '2025-04-05', 
      status: 'Draft',
      views: 0,
      comments: 0
    },
    { 
      id: 5, 
      title: 'Library Extended Hours for Finals', 
      author: 'Library Services', 
      authorAvatar: '/avatars/library.jpg',
      department: 'Academic Services',
      date: '2025-04-10', 
      status: 'Scheduled',
      views: 0,
      comments: 0
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-muted text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-muted text-gray-800';
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    if (activeTab === 'published') return post.status === 'Published';
    if (activeTab === 'drafts') return post.status === 'Draft';
    if (activeTab === 'scheduled') return post.status === 'Scheduled';
    return true; // 'all' tab
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create, edit and manage blog posts</p>
          </div>
          <Button className="flex gap-2">
            <Plus size={16} />
            New Post
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <Tabs defaultValue="published" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="all">All Posts</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.authorAvatar} />
                          <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>{post.department}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(post.status)} variant="outline">
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlogManagement;
