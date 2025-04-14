
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, HelpCircle, Book, MessageSquare, MailOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Support = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you as soon as possible.",
    });
    
    setSubject('');
    setMessage('');
  };

  // Sample FAQs for demonstration
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your email address, and you will receive instructions to reset your password.'
    },
    {
      id: 2,
      question: 'How can I update my profile information?',
      answer: 'You can update your profile information by clicking on your profile picture in the top right corner, selecting "Profile", and then editing your information.'
    },
    {
      id: 3,
      question: 'How do I enroll in a course?',
      answer: 'Students can enroll in courses by navigating to "Courses" from the dashboard, finding the desired course, and clicking "Enroll". Note that some courses may require approval.'
    },
    {
      id: 4,
      question: 'How do I view my grades?',
      answer: 'Students can view their grades by going to "My Courses" and selecting the specific course to see detailed grade information.'
    },
    {
      id: 5,
      question: 'How do I contact my professor?',
      answer: 'You can contact your professor through the messaging system by going to "Courses", selecting the course, and clicking on the "Message Instructor" option.'
    },
    {
      id: 6,
      question: 'What do I do if I encounter a technical issue?',
      answer: 'If you encounter a technical issue, you can submit a support ticket through the "Help & Support" page with details of the problem you are experiencing.'
    },
  ];

  // Sample Knowledge Base articles for demonstration
  const knowledgeBase = [
    {
      id: 1,
      title: 'Getting Started with Azure Scholars Hub',
      excerpt: 'Learn how to navigate the platform and make the most of your academic journey.',
      category: 'General',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Student Guide: Course Enrollment Process',
      excerpt: 'A step-by-step guide to finding and enrolling in courses.',
      category: 'Students',
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Faculty Guide: Managing Your Courses',
      excerpt: 'Learn how to create, update, and manage your courses effectively.',
      category: 'Faculty',
      readTime: '10 min'
    },
    {
      id: 4,
      title: 'Administrative Tools Overview',
      excerpt: 'Explore the administrative features to manage users and system settings.',
      category: 'Admin',
      readTime: '12 min'
    },
    {
      id: 5,
      title: 'Using the Blog Platform',
      excerpt: 'Guidelines for creating, editing, and commenting on blog posts.',
      category: 'General',
      readTime: '6 min'
    },
    {
      id: 6,
      title: 'Assignments and Grading System',
      excerpt: 'Understanding the assignment submission and grading workflow.',
      category: 'General',
      readTime: '8 min'
    },
  ];

  // Function to switch to the contact tab
  const switchToContactTab = () => {
    const contactTab = document.querySelector('[data-value="contact"]') as HTMLButtonElement | null;
    if (contactTab) {
      contactTab.click();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions or get in touch with our support team</p>
        </div>
        
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle size={16} />
              <span>FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="kb" className="flex items-center gap-2">
              <Book size={16} />
              <span>Knowledge Base</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Contact Support</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-6 mt-6">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg flex items-start">
                    <HelpCircle size={18} className="mr-2 text-azure-600 flex-shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Can't find what you're looking for?</p>
              <Button variant="outline" onClick={switchToContactTab}>
                Contact Support
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="kb" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeBase.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-2 text-xs text-muted-foreground">
                    <span>{article.readTime} read</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button>
                <Book size={16} className="mr-2" />
                View All Articles
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support Team</CardTitle>
                <CardDescription>
                  Fill out the form below and our support team will get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select 
                      id="category" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account & Access</option>
                      <option value="courses">Courses & Classes</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message"
                      placeholder="Describe your issue in detail"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="attachment" className="text-sm font-medium">Attachment (optional)</label>
                    <Input id="attachment" type="file" />
                    <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground flex items-center">
                  <MailOpen size={16} className="mr-2" />
                  <span>Typical response time: 24 hours</span>
                </p>
                <Button type="submit" onClick={handleSubmitTicket}>Submit Ticket</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Support;
