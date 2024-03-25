import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Session from '../pages/Session'
import ManageCourses  from '../pages/ManageCourses'
import UpdateProfile from '../pages/UpdateProfile'
import AddStudent from '../pages/AddStudent'
import ManageStudent from '../pages/ManageStudent'
import AddStaff from '../pages/AddStaff'
import ManageStaff from '../pages/ManageStaff'
import Logout from '../pages/Logout';
// Import other admin pages

const AdminRoutes = () => {
  return (
    <Routes>

                  <Route path="" element={<Dashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="update-profile" element={<UpdateProfile />} />
                  <Route path="session" element={<Session />} />
                  <Route path="manage-courses" element={<ManageCourses />} />
                  <Route path="add-student" element={<AddStudent />} />
                  <Route path="manage-student" element={<ManageStudent />} />
                  <Route path="add-staff" element={<AddStaff />} />
                  <Route path="manage-staff" element={<ManageStaff />} />
                  <Route path="logout" element={<Logout />} />
                  
    </Routes>
  );
};

export default AdminRoutes;