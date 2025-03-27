import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  expertise_required: string;
  description: string;
}

interface Applicant {
  id: number;
  name: string;
  availability: string;
  average_rating: number;
}

const EmployerDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    expertise_required: '',
    description: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const fetchApplicants = async (eventId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/events/${eventId}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplicants(response.data);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    }
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    fetchApplicants(event.id);
  };

  const handleCreateEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/events', newEvent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpenNewEventDialog(false);
      setNewEvent({
        name: '',
        date: '',
        location: '',
        expertise_required: '',
        description: '',
      });
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Employer Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewEventDialog(true)}
        >
          Create New Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Events
            </Typography>
            <List>
              {events.map((event) => (
                <ListItemButton
                  key={event.id}
                  onClick={() => handleEventSelect(event)}
                  selected={selectedEvent?.id === event.id}
                >
                  <ListItemText
                    primary={event.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                        {' — '}{event.location}
                      </>
                    }
                  />
                  <Chip label={event.expertise_required} size="small" />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedEvent ? `Applicants for ${selectedEvent.name}` : 'Select an event to view applicants'}
            </Typography>
            {selectedEvent && (
              <List>
                {applicants.map((applicant) => (
                  <Accordion key={applicant.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ flexGrow: 1 }}>{applicant.name}</Typography>
                        <Rating value={applicant.average_rating} readOnly size="small" />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2" gutterBottom>
                        Availability:
                      </Typography>
                      <Typography color="text.secondary">
                        {applicant.availability}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openNewEventDialog} onClose={() => setOpenNewEventDialog(false)}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            fullWidth
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Required Expertise"
            fullWidth
            value={newEvent.expertise_required}
            onChange={(e) => setNewEvent({ ...newEvent, expertise_required: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewEventDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateEvent} variant="contained">
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployerDashboard;
