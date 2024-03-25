import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const {login,setUserEmail } = useAuth(); // Destructure the login function from useAuth

  console.log("Destructuring login : " + login);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
 
      const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/get-user-type/?email=${email}`);
      // console.log(response.data);
      const userType=response.data.user_type
      // console.log(userType)
      login();
      setUserEmail(email)
      // console.log("Performing login " + login());
      // console.log(isLoggedIn)
      
      
      // Handle successful login (e.g., redirect to dashboard)
      if (userType === 1) {
        navigate('/admin');
      } else if (userType === 2) {
        navigate('/student');
      } else {
        setError('Invalid user type');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
