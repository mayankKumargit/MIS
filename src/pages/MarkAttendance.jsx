import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import toast from "react-hot-toast";

const MarkAttendance = () => {

  const {userDetails}=useAuth()

  const faculty_id=userDetails.userDetails.faculty_id
  const dept=userDetails.userDetails.dept

  const [program, setProgram] = useState('BT');
  const [semester, setSemester] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading,setLoading]=useState(true)

  // const handleProgramChange = (e) => {
  //   setProgram(e.target.value);
  //   //setSemester('');
  // };

  useEffect(() => {
    // Fetch courses based on selected program and semester
    if (program && semester) {
      axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&semester=${semester}&intended_for=${program}&facultyid=${faculty_id}`)
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [program,semester]);

  useEffect(() => {
    // Fetch students based on selected course
    if (selectedCourse) {
      setLoading(true)
      setStudents([])
      axios.get(`https://sarthak503.pythonanywhere.com/api//filter-students/?dept=${dept}&sem=${semester}&intended_for=${program}`)
        .then(response => {
          setLoading(false)
          setStudents(response.data);
          
          // Initialize attendance state
          const initialAttendance = response.data.map(student => ({
            student: student.rollno,
            subject:selectedCourse,
            date:new Date().toISOString().split('T')[0],
            status: 'P', // Assuming all students are initially present
          }));
          setAttendance(initialAttendance);
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedCourse]);

  const handleSaveAttendance = () => {
    // Send attendance data to the API endpoint
    axios.post('https://sarthak503.pythonanywhere.com/api/bulk-attendance-upload/', attendance)
      .then(response => {
        console.log('Attendance saved successfully:', response.data);
        toast.success("Attendance saved successfully")
        // Optionally, handle success message or navigation
      })
      .catch(error => {
        console.error('Error saving attendance:', error);
        // Optionally, handle error message or retry logic
      });
  };


  console.log(program,semester)
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Student Attendance</h1>

      <div className="mb-4">
        <label htmlFor="semester" className="text-xl font-semibold mb-4 mr-2">
          Select Program:
        </label>
        <select
          value={program}
          onChange={(e)=>setProgram(e.target.value)}
          className="border rounded-md p-2"
        >
            <option value="BT">BTech</option>
            <option value="MT">MTech</option>
            <option value="PhD">PHD</option>
        </select>
      </div>

      {program === 'BT' && (
        <div className="mb-4">
          <label htmlFor="semester" className="text-xl font-semibold mb-4 mr-2">
                Select Semester:
          </label>
          <select
            className="border rounded-md p-2"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {[...Array(8)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Semester {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {(program === 'MT' || program === 'PhD') && (
          <div className="mb-4">
          <label htmlFor="semester" className="text-xl font-semibold mb-4 mr-2">
                Select Semester:
          </label>
          <select
              className="border rounded-md p-2"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
          >
          {[...Array(4)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
                  Semester {index + 1}
            </option>
            ))}
            </select>
          </div>
      )}

      <div className="mb-4">
          <label htmlFor="semester" className="text-xl font-semibold mb-4 mr-2">
                Select Courses:
          </label>
          <select
            className="border rounded-md p-2"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.course_code} value={course.course_code}>{course.subject_name}</option>
            ))}
          </select>
      </div>

      {
        (loading && selectedCourse) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>Loading students...</h1>
      }

      {
        (!loading && students.length==0) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>No students</h1>
      }


      {students.length>0 &&  (
        <div className="flex  flex-col justify-center align-middle">
        <h2 className="text-2xl font-semibold my-10">Mark Attendance</h2>
        <table className="w-3/5">
          <thead>
            <tr>
              <th className="py-2">Roll No</th>
              <th className="py-2">Name</th>
              <th className="py-2">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr  key={student.rollno}>

                <td className="py-4 pl-20">{student.rollno}</td>
                <td className="py-2 pl-20">{`${student.first_name} ${student.last_name}`}</td>
                <td className="py-2 pl-20">
                  <select
                    className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={attendance[index].status}
                    onChange={e => {
                      const updatedAttendance = [...attendance];
                      updatedAttendance[index].status = e.target.value;
                      setAttendance(updatedAttendance);
                    }}
                  >
                    <option value="P">Present</option>
                    <option value="A">Absent</option>
                    <option value="OD">On Duty</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="py-2 w-48 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={handleSaveAttendance}
        >
          Save Attendance
        </button>
      </div>
      )}
      

    </div>
  );
};

export default MarkAttendance;
