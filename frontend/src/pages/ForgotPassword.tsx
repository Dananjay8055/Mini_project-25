
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import LandingLayout from '@/components/layouts/LandingLayout';
import { useToast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally handle the password reset request
    // This is a placeholder for demonstration
    
    toast({
      title: "Reset Email Sent",
      description: "If your email exists in our system, you will receive password reset instructions shortly.",
    });
    
    setIsSubmitted(true);
  };

  return (
    <LandingLayout>
      <div className="min-h-[calc(100vh-13rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Instructions
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-azure-100 p-6 rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-4">
                  <Mail className="h-10 w-10 text-azure-600" />
                </div>
                <p className="text-gray-700">
                  If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.
                </p>
                <p className="text-gray-700">
                  Please also check your spam folder if you don't see the email.
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <div className="text-center text-sm w-full">
              Remember your password?{" "}
              <Link to="/login" className="text-azure-600 hover:text-azure-700 font-medium">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </LandingLayout>
  );
};

export default ForgotPassword;
