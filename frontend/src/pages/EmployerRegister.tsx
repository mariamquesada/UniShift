import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';

const EmployerRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5001/api/register', {
        name,
        email,
        password,
        user_type: 'employer'
      });

      localStorage.setItem('token', response.data.token);
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return <RegisterForm onRegister={handleRegister} userType="Employer" error={error} />;
};

export default EmployerRegister;
