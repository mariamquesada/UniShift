
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { API_URL } from '../config/api';

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
        user_type: 'employee'
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'employee');
      navigate('/events');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <LoginForm userType="employee" onSubmit={handleLogin} />;
};

export default EmployeeLogin;
