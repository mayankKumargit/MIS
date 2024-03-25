import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css';

import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import { categories, categories2 } from "./utils/constants";
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import AdminRoutes from './components/AdminRoutes.jsx';
import StudentRoutes from './components/StudentRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Place AuthProvider here */}
        <InnerApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

function InnerApp() {
  const { isLoggedIn } = useAuth(); // Get authentication state and logout func
  console.log(isLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/admin/*" element={isLoggedIn ? <Sidebar categories={categories}><AdminRoutes /></Sidebar> : <Navigate to="/" />} />
        <Route path="/student/*" element={isLoggedIn ? <Sidebar categories={categories2}><StudentRoutes /></Sidebar> : <Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;