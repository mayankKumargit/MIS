import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';

const TeacherAttendance = () => {

  const {userDetails}=useAuth()

  const faculty_id=userDetails.userDetails.faculty_id
  const dept=userDetails.userDetails.dept

  const [program, setProgram] = useState('BT');
  const [semester, setSemester] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
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
    // Fetch students based on selected course and date
    if (selectedCourse && date) {
      setLoading(true)
      setStudents([])
      axios.get(`https://sarthak503.pythonanywhere.com//api/attendance-list/?subject_id=${selectedCourse}&date=${date}`)
        .then(response => {
          setStudents(response.data.attendance);
          setLoading(false)
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedCourse,date]);



  console.log(program,semester)
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Attendance list</h1>

      <div className="mb-4">
          <label className="text-xl font-semibold mb-4 mr-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" px-4 py-2 border rounded"
          />
      </div>

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
            <option value="PHD">PHD</option>
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

      {(program === 'MT' || program === 'PHD') && (
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
        (loading && selectedCourse && date && students.length==0) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>Loading students...</h1>
      }

      {
        (!loading && students.length==0) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>No students</h1>
      }


      

        {students.length>0 &&  (
          <div>
          <h2 className="text-xl font-bold mb-2 my-10">Attendance Details:</h2>
          <table className="w-3/5">
            <thead>
              <tr>
                <th className="py-2 pr-6">Roll no</th>
                <th className="py-2 pr-6">Course Code</th>
                <th className="py-2 pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(item => (
                <tr key={item.date}>
                  <td className="py-2 pl-24">{item.student}</td>
                  <td className="py-2 pl-24">{item.subject}</td>
                  <td className="py-2 pl-20">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        

    </div>
  );
};

export default TeacherAttendance;
