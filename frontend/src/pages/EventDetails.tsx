import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  expertise_required: string;
  company_name: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [availability, setAvailability] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        navigate('/events');
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5001/api/events/${id}/apply`,
        { availability },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setSuccess('Application submitted successfully!');
      setOpenDialog(false);
      setAvailability('');
    } catch (error) {
      console.error('Failed to submit application:', error);
      setError('Failed to submit application. Please try again.');
    }
  };

  if (!event) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                {event.company_name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                {new Date(event.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Chip 
            label={event.expertise_required}
            color="primary"
            sx={{ mr: 1 }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Event Description
        </Typography>
        <Typography paragraph sx={{ mb: 4 }}>
          {event.description}
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpenDialog(true)}
          sx={{ mt: 2 }}
        >
          Apply for This Event
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Apply for {event.name}</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Your Availability"
              fullWidth
              multiline
              rows={4}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="Please describe your availability for this event..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleApply} variant="contained">
              Submit Application
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default EventDetails;
