
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

const Calendar = () => {
  const { user } = useAuth();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Faculty Meeting",
      date: new Date(2025, 3, 15, 10, 0),
      endTime: new Date(2025, 3, 15, 11, 30),
      location: "Conference Room 101",
      attendees: 12,
      type: "meeting",
    },
    {
      id: 2,
      title: "Advanced Programming - Midterm",
      date: new Date(2025, 3, 17, 9, 0),
      endTime: new Date(2025, 3, 17, 11, 0),
      location: "Room 205",
      attendees: 30,
      type: "exam",
    },
    {
      id: 3,
      title: "Student Council Meeting",
      date: new Date(2025, 3, 18, 14, 0),
      endTime: new Date(2025, 3, 18, 15, 30),
      location: "Student Center",
      attendees: 8,
      type: "meeting",
    },
    {
      id: 4,
      title: "Academic Research Presentation",
      date: new Date(2025, 3, 20, 13, 0),
      endTime: new Date(2025, 3, 20, 15, 0),
      location: "Auditorium",
      attendees: 45,
      type: "presentation",
    },
  ];
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) => date && 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Get today's events
  const today = new Date();
  const todaysEvents = events.filter(
    (event) => 
    event.date.getDate() === today.getDate() && 
    event.date.getMonth() === today.getMonth() && 
    event.date.getFullYear() === today.getFullYear()
  );
  
  // Get upcoming events (next 7 days excluding today)
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingEvents = events.filter(
    (event) => 
    event.date > today && 
    event.date <= nextWeek
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Event</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="selected" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="selected">Selected Day</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              
              <TabsContent value="selected" className="space-y-4 mt-4">
                <h2 className="text-lg font-semibold">
                  {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No Date Selected'}
                </h2>
                
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 w-full ${
                        event.type === 'meeting' ? 'bg-azure-500' : 
                        event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees} Attendees</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No events scheduled for this day</p>
                    <Button variant="outline" className="mt-4">
                      <Plus size={16} className="mr-1" />
                      Add Event
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="today" className="space-y-4 mt-4">
                <h2 className="text-lg font-semibold">
                  Today's Events
                </h2>
                
                {todaysEvents.length > 0 ? (
                  todaysEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 w-full ${
                        event.type === 'meeting' ? 'bg-azure-500' : 
                        event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees} Attendees</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No events scheduled for today</p>
                    <Button variant="outline" className="mt-4">
                      <Plus size={16} className="mr-1" />
                      Add Event
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                <h2 className="text-lg font-semibold">
                  Upcoming Events
                </h2>
                
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className={`h-1 w-full ${
                        event.type === 'meeting' ? 'bg-azure-500' : 
                        event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees} Attendees</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted">
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No upcoming events in the next 7 days</p>
                    <Button variant="outline" className="mt-4">
                      <Plus size={16} className="mr-1" />
                      Add Event
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
