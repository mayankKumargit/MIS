// StudentRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import StudentProfile from '../pages/StudentProfile';
import StudentCourses from '../pages/StudentCourses';
import Attendance from '../pages/Attendance';
import Logout from '../pages/Logout';
import StudentMarks from '../pages/StudentMarks';
// Import other student pages

const StudentRoutes = () => {
  return (
    <Routes>
                  <Route path="" element={<StudentProfile />} />
                  <Route path="courses" element={<StudentCourses />} />
                  <Route path="attendance" element={<Attendance />} />
                  <Route path="see-marks" element={<StudentMarks />} />
                  <Route path="logout" element={<Logout />} />
                  
    </Routes>
  );
};

export default StudentRoutes;
