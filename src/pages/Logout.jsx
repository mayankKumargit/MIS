import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Assuming you have an AuthContext for managing authentication state

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from context

  useEffect(() => {
    logout(); // Call logout function
    navigate('/'); // Redirect to login page after logout
  }, [navigate, logout]);

  return null; // This component doesn't render anything
};

export default Logout;
