import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format, addDays, isWeekend } from 'date-fns';

interface Appointment {
  id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  notes: string;
  created_at: string;
}

const AppointmentScheduling = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    service_type: '',
    appointment_time: '',
    location: '',
    notes: ''
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const serviceTypes = [
    { value: 'birth_registration', label: 'Birth Certificate Registration' },
    { value: 'marriage_registration', label: 'Marriage Certificate Registration' },
    { value: 'death_registration', label: 'Death Certificate Registration' },
    { value: 'document_collection', label: 'Document Collection' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  const locations = [
    { value: 'addis_ababa_main', label: 'Addis Ababa - Main Office' },
    { value: 'addis_ababa_bole', label: 'Addis Ababa - Bole Branch' },
    { value: 'dire_dawa', label: 'Dire Dawa Office' },
    { value: 'hawassa', label: 'Hawassa Office' },
    { value: 'mekelle', label: 'Mekelle Office' }
  ];

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      // This would fetch from an appointments table
      // For now, we'll use mock data
      setAppointments([]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const scheduleAppointment = async () => {
    if (!selectedDate || !newAppointment.service_type || !newAppointment.appointment_time || !newAppointment.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // This would insert into an appointments table
      const appointmentData = {
        ...newAppointment,
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        user_id: user?.id,
        status: 'scheduled'
      };

      toast({
        title: "Success",
        description: "Appointment scheduled successfully"
      });

      setDialogOpen(false);
      setNewAppointment({
        service_type: '',
        appointment_time: '',
        location: '',
        notes: ''
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'scheduled':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || date < new Date();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Appointment Scheduling
        </h1>
        <p className="text-muted-foreground">
          Schedule appointments for government services and document processing
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose your preferred appointment date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="rounded-md border"
              />
              <div className="mt-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule New Appointment</DialogTitle>
                      <DialogDescription>
                        Book an appointment for {selectedDate && format(selectedDate, 'PPP')}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Service Type</Label>
                        <Select 
                          value={newAppointment.service_type} 
                          onValueChange={(value) => setNewAppointment(prev => ({ ...prev, service_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map(service => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Time Slot</Label>
                        <Select 
                          value={newAppointment.appointment_time} 
                          onValueChange={(value) => setNewAppointment(prev => ({ ...prev, appointment_time: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Location</Label>
                        <Select 
                          value={newAppointment.location} 
                          onValueChange={(value) => setNewAppointment(prev => ({ ...prev, location: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Additional Notes</Label>
                        <Textarea
                          placeholder="Any special requirements or notes..."
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <Button onClick={scheduleAppointment} disabled={loading} className="w-full">
                        {loading ? 'Scheduling...' : 'Schedule Appointment'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Appointments</CardTitle>
              <CardDescription>
                Manage your scheduled appointments and view their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No appointments scheduled</h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule your first appointment to get started
                  </p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {serviceTypes.find(s => s.value === appointment.service_type)?.label}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {format(new Date(appointment.appointment_date), 'PPP')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.appointment_time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {locations.find(l => l.value === appointment.location)?.label}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduling;