import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import './App.css'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Session from './pages/Session'
import ManageCourses  from './pages/ManageCourses'
import UpdateProfile from './pages/UpdateProfile'
import AddStudent from './pages/AddStudent'
import Sidebar from './components/Sidebar'
import ManageStudent from './pages/ManageStudent'
import AddStaff from './pages/AddStaff'
import ManageStaff from './pages/ManageStaff'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Attendance from './pages/Attendance'
import StudentProfile from './pages/StudentProfile'
import StudentCourses from './pages/StudentCourses'
import { categories,categories2} from "./utils/constants"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <>
              <Sidebar categories={categories}>
                <Routes>
                <Route path="admin-profile" element={<Dashboard />} />
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
              </Sidebar>
              
            </>
          }
        >
        </Route>
        <Route
          path="/student/*"
          element={
            <>
              <Sidebar categories={categories2}>
                <Routes>
                <Route path="student-profile" element={<StudentProfile />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="logout" element={<Logout />} />
                
                </Routes>
              </Sidebar>
              
            </>
          }
        >
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;