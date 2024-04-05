/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({children}) => {


  const [userDetails, setUserDetails] = useState(() => {
    // Initialize userDetails from local storage if available
    const storedUserDetails = localStorage.getItem('userLoggedIn');
    return storedUserDetails ? JSON.parse(storedUserDetails) : {
      isLoggedIn: false,
      userType: "",
      userDetails: ""
    };
  });

  // useEffect(() => {
  //   // Check local storage for authentication token or user session
  //   const storedUserDetails = localStorage.getItem('userLoggedIn');
  //   if (storedUserDetails) {
  //     setUserDetails(JSON.parse(storedUserDetails));
  //   }
  // }, []);

  // Function to handle login
  const login = (userType,details) => {
    let user={
      isLoggedIn:true,
      userType:userType,
      userDetails:details
    }
    localStorage.setItem('userLoggedIn', JSON.stringify(user));

    setUserDetails(user)
    console.log(userDetails)
  };


  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    setUserDetails({
      isLoggedIn: false,
      userType: "",
      userDetails: ""
    });
  };

  return (
    <AuthContext.Provider value={{ login, logout,userDetails,setUserDetails}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
