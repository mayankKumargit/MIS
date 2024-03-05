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

function App() {
 

    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<Dashboard></Dashboard>}></Route>
                    <Route path='/courses' element={<Courses></Courses>}></Route>
                    <Route path='/update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
                    <Route path='/session' element={<Session></Session>}></Route>
                    <Route path='/manage-courses' element={<ManageCourses></ManageCourses>}></Route>
                    <Route path='/add-student' element={<AddStudent></AddStudent>}></Route>
                    <Route path='/manage-student' element={<ManageStudent></ManageStudent>}></Route>
                    <Route path='/add-staff' element={<AddStaff></AddStaff>}></Route>
                    <Route path='/manage-staff' element={<ManageStaff></ManageStaff>}></Route>
                    
                </Routes>
            </Sidebar>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </BrowserRouter>
        
    
    )
}

export default App
