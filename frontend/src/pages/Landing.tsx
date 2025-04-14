import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingLayout from '@/components/layouts/LandingLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users, FileText, ShieldCheck } from 'lucide-react';

const Landing = () => {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">Azure Scholars Hub</h1>
              <p className="text-xl md:text-2xl font-light">A comprehensive student management platform designed to streamline and centralize academic operations.</p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="btn-secondary">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://placehold.co/600x400/azure/white?text=Azure+Scholars+Hub" 
                alt="Azure Scholars Hub Platform" 
                className="rounded-lg shadow-xl max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Powerful Features for Everyone</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our platform provides tailored experiences for administrators, faculty, and students, ensuring that each user has access to the tools they need.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              icon: <Users className="h-6 w-6 text-primary" />, 
              title: "User-Specific Dashboards", 
              desc: "Different dashboards for administrators, faculty, and students to ensure relevant functionalities for each role."
            }, {
              icon: <FileText className="h-6 w-6 text-primary" />, 
              title: "Data Management", 
              desc: "Robust modules to add, edit, and manage student and faculty information, including academic records."
            }, {
              icon: <BookOpen className="h-6 w-6 text-primary" />, 
              title: "Course Integration", 
              desc: "Embeds Google Classroom to display course details, materials, assignments, and grades effectively."
            }, {
              icon: <FileText className="h-6 w-6 text-primary" />, 
              title: "Blog & Knowledge Sharing", 
              desc: "Built-in blog platform for sharing insights, educational content, and facilitating discussions."
            }, {
              icon: <ShieldCheck className="h-6 w-6 text-primary" />, 
              title: "Secure Role-Based Access", 
              desc: "Advanced permission settings ensure each user's access is regulated according to their roles."
            }, {
              icon: <GraduationCap className="h-6 w-6 text-primary" />, 
              title: "Academic Progress Tracking", 
              desc: "Comprehensive tools to track and visualize student progress throughout their academic journey."
            }].map((item, idx) => (
              <Card key={idx} className="border border-border card-hover">
                <CardHeader className="pb-2">
                  <div className="p-3 rounded-lg mb-2 flex items-center justify-left gap-2 ">
                    {item.icon}
                  <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Landing;