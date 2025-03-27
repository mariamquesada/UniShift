import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { API_URL } from '../config/api';

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
        user_type: 'employer'
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'employer');
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return <LoginForm userType="employer" onSubmit={handleLogin} error={error} />;
};

export default EmployerLogin;
