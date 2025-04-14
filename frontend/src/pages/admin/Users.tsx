
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Filter,
  MoreVertical,
  Plus,
  Search,
  UserPlus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock user data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
    status: 'active',
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'faculty',
    status: 'active',
    createdAt: '2024-11-15',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-10-05',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    role: 'student',
    status: 'inactive',
    createdAt: '2024-09-20',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.w@example.com',
    role: 'faculty',
    status: 'pending',
    createdAt: '2024-12-10',
  },
];

const Users = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>;
      case 'faculty':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Faculty</Badge>;
      case 'student':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Student</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-200/80 text-green-800 border-2 border-green-200';
      case 'inactive':
        return 'bg-muted text-gray-400 border-2 border-gray-200';
      case 'pending':
        return 'bg-yellow-200/80 text-yellow-800 border-2 border-yellow-200';
      default:
        return 'bg-muted/80 text-gray-800 border-2 border-gray-200';
    }
  };

  const handleAddUser = () => {
    navigate('/admin/users/new');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage students, faculty, and administrators</p>
          </div>
          <Button 
            onClick={handleAddUser}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    {!isMobile && <TableHead>Email</TableHead>}
                    <TableHead>Role</TableHead>
                    {!isMobile && <TableHead>Status</TableHead>}
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            {isMobile && (
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            )}
                            {isMobile && (
                              <div className="mt-1">
                                <Badge 
                                  className={getStatusColor(user.status)} 
                                  variant="outline"
                                >
                                  {user.status}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        {!isMobile && <TableCell>{user.email}</TableCell>}
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        {!isMobile && (
                          <TableCell>
                            <Badge 
                              className={getStatusColor(user.status)} 
                              variant="outline"
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                        )}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 3 : 5} className="h-24 text-center">
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;
