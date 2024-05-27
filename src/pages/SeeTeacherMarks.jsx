import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';

const SeeTeacherMarks = () => {

  const {userDetails}=useAuth()

  const faculty_id=userDetails.userDetails.faculty_id
  const dept=userDetails.userDetails.dept

  const [program, setProgram] = useState('BT');
  const [semester, setSemester] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [students, setStudents] = useState([]);
  const [loading,setLoading]=useState(true)
  const [selectedExam, setSelectedExam] = useState('');


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
    if (selectedCourse && selectedExam) {
      setLoading(true)
      setStudents([])
      axios.get(`https://sarthak503.pythonanywhere.com/api/result-list/?subject=${selectedCourse}&exam=${selectedExam}`)
        .then(response => {
          setStudents(response.data.results);
          setLoading(false)
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedCourse,selectedExam]);



  console.log(program,semester)
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Marks list</h1>


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
            <option value="PhD">PhD</option>
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

      <div className="mb-4">
        <label htmlFor="exam" className="text-xl font-semibold mb-4 mr-2">
          Select Exam:
        </label>
        <select
          className="border rounded-md p-2"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select Exam</option>
          <option value="CT1">CT1</option>
          <option value="CT2">CT2</option>
          <option value="EndSem">End Semester</option>
        </select>
      </div>

      {
        (loading && selectedCourse && selectedExam && students.length==0) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>Loading students...</h1>
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
                <th className="py-2 ">Roll no</th>
                <th className="py-2 ">Course Code</th>
                <th className="py-2 ">Exam Type</th>
                <th className="py-2 ">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map(item => (
                <tr key={item.student}>
                  <td className="py-2 pl-16">{item.student}</td>
                  <td className="py-2 pl-16">{item.subject}</td>
                  <td className="py-2 pl-16">{item.exam}</td>
                  <td className="py-2 pl-16">{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        

    </div>
  );
};

export default SeeTeacherMarks;
