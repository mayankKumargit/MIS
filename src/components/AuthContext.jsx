/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ( props ) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail,setUserEmail]=useState("")
  const [dept,setDept]=useState("")

  // Function to handle login
  const login = () => {
    setIsLoggedIn(true);
    console.log(`Inside Login() chala : ${isLoggedIn}`);
  };

  console.log(`Outside Login() chala : ${isLoggedIn}`);

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,userEmail,setUserEmail,dept,setDept }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
