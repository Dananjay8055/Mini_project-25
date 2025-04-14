import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import LandingLayout from '@/components/layouts/LandingLayout';

const Login = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    }
  };

  return (
    <LandingLayout>
      <div className="min-h-[calc(100vh-13rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted">
        <Card className="w-full max-w-md animate-fade-in shadow-lg border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Login to Azure Scholars Hub</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-azure-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Demo Users</span>
              </div>
            </div>

            <div className="grid gap-2 text-sm">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setEmail('admin@azurescholars.edu');
                  setPassword('password');
                }}
              >
                Admin User (admin@azurescholars.edu)
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setEmail('faculty@azurescholars.edu');
                  setPassword('password');
                }}
              >
                Faculty User (faculty@azurescholars.edu)
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setEmail('student@azurescholars.edu');
                  setPassword('password');
                }}
              >
                Student User (student@azurescholars.edu)
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm w-full">
              Don't have an account?{' '}
              <Link to="/register" className="text-azure-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </LandingLayout>
  );
};

export default Login;
