import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface LoginFormProps {
  userType: 'employer' | 'employee';
  onSubmit: (email: string, password: string) => void;
  error?: string;
}

const LoginForm = ({ userType, onSubmit, error: propError }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    onSubmit(email, password);
  };

  const oppositeType = userType === 'employer' ? 'employee' : 'employer';
  const oppositeLink = `/${oppositeType}/login`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {userType === 'employer' ? 'Employer Login' : 'Student Login'}
        </Typography>

        {(propError || localError) && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {propError || localError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?{' '}
              <Link component={RouterLink} to={`/${userType}/register`}>
                Register here
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link component={RouterLink} to={oppositeLink}>
                {`Sign in as ${oppositeType}`}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
