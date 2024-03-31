/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const [isAdmin,setIsAdmin]=useState("")

  const [userDetails,setUserDetails]=useState({})

  // Function to handle login
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    console.log(`Inside Login() chala : ${isLoggedIn}`);
    console.log(userDetails)
  };

  console.log(`Outside Login() chala : ${isLoggedIn}`);

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,userDetails,setUserDetails,isAdmin,setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
