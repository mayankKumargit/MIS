// StudentRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import TeacherProfile from '../pages/TeacherProfile';
import MarkAttendance from '../pages/MarkAttendance';
import Logout from '../pages/Logout';

// Import other student pages

const TeacherRoutes = () => {
  return (
    <Routes>
                  <Route path="" element={<TeacherProfile />} />
                  <Route path="attendance" element={<MarkAttendance />} />
                  <Route path="logout" element={<Logout />} />
                  
    </Routes>
  );
};

export default TeacherRoutes;
