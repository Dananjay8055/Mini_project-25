
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Key, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <CardDescription className="text-azure-600 font-medium mt-1">
                {user?.role?.charAt(0).toUpperCase() + (user?.role?.slice(1) || '')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Member since {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            </CardContent>
          </Card>
          
          {/* Settings Tabs */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Key size={16} />
                  <span>Password</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell size={16} />
                  <span>Notifications</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <form onSubmit={handleSaveProfile}>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and profile picture
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user?.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user?.email} disabled />
                        <p className="text-sm text-muted-foreground">
                          Email cannot be changed
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <Input id="avatar" type="file" accept="image/*" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="password">
                <Card>
                  <form onSubmit={handleSavePassword}>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <form onSubmit={handleSaveNotifications}>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Choose how you want to receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-azure-600 focus:ring-azure-500"
                          defaultChecked
                        />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="browser-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-azure-600 focus:ring-azure-500"
                          defaultChecked
                        />
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="assignment-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-azure-600 focus:ring-azure-500"
                          defaultChecked
                        />
                        <Label htmlFor="assignment-notifications">Assignment Updates</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="course-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-azure-600 focus:ring-azure-500"
                          defaultChecked
                        />
                        <Label htmlFor="course-notifications">Course Updates</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Save Preferences</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
