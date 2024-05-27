// StudentRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import TeacherProfile from '../pages/TeacherProfile';
import MarkAttendance from '../pages/MarkAttendance';
import Logout from '../pages/Logout';
import TeacherCourses from '../pages/TeacherCourses';
import TeacherAttendance from '../pages/TeacherAttendance';
import TeacherMarks from '../pages/TeacherMarks';
import SeeTeacherMarks from '../pages/SeeTeacherMarks';

// Import other student pages

const TeacherRoutes = () => {
  return (
    <Routes>
                  <Route path="" element={<TeacherProfile />} />
                  <Route path="courses" element={<TeacherCourses />} />
                  <Route path="attendance" element={<MarkAttendance />} />
                  <Route path="list-attendance" element={<TeacherAttendance />} />
                  <Route path="save-marks" element={<TeacherMarks />} />
                  <Route path="see-marks" element={<SeeTeacherMarks />} />
                  <Route path="logout" element={<Logout />} />
                  
    </Routes>
  );
};

export default TeacherRoutes;
