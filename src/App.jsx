import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css';

import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import { admins, students, teachers } from "./utils/constants";
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import AdminRoutes from './components/AdminRoutes.jsx';
import StudentRoutes from './components/StudentRoutes.jsx';
import TeacherRoutes from './components/TeacherRoutes.jsx'

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
  const { isLoggedIn,isAdmin } = useAuth(); // Get authentication state and logout func
  console.log(isLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/admin/*" element={isLoggedIn && isAdmin==1 ? <Sidebar categories={admins}><AdminRoutes /></Sidebar> : <Navigate to="/" />} />
        <Route path="/student/*" element={isLoggedIn && isAdmin==2 ? <Sidebar categories={students}><StudentRoutes /></Sidebar> : <Navigate to="/" />} />
        <Route path="/teacher/*" element={isLoggedIn && isAdmin==3 ? <Sidebar categories={teachers}><TeacherRoutes /></Sidebar> : <Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;