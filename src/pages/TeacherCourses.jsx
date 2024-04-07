/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';


const Course = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold">{course.subject_name}</h3>
      <p>Course Code: {course.course_code}</p>
      <p>Semester: {course.semester}</p>
      <p>Credit: {course.credit}</p>
    </div>
  );
};

const TeacherCourses = () => {

  const {userDetails}=useAuth()

  const faculty_id=userDetails.userDetails.faculty_id
  const dept=userDetails.userDetails.dept

  const [program, setProgram] = useState('BT');
  const [semester, setSemester] = useState('');
  const [loading,setLoading]=useState(true)

  console.log(faculty_id,dept,program)
  // const [courses, setCourses] = useState([]);
  // const [selectedSemester, setSelectedSemester] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  // const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  useEffect(() => {
    // Fetch all courses by default
    axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&intended_for=${program}&facultyid=${faculty_id}`)
      .then(response => {
        // setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dept,program]);

  useEffect(() => {
    // Fetch courses based on selected program and semester
    if(semester=="")
    {
      setLoading(true)
      setFilteredCourses([])
      axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&semester=${semester}&intended_for=${program}&facultyid=${faculty_id}`)
        .then(response => {
          setFilteredCourses(response.data);
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
    else if (program && semester) {
      setLoading(true)
      setFilteredCourses([])
      axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&semester=${semester}&intended_for=${program}&facultyid=${faculty_id}`)
        .then(response => {
          setFilteredCourses(response.data);
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [program,semester]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>

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
            <option value="">All</option>
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

      {
        loading && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>Loading courses...</h1>
      }

      {
        (!loading && filteredCourses.length==0) && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>No courses for this semester and program</h1>
      }

    <div>
        {filteredCourses.sort((a, b) => a.semester - b.semester).map((course) => (
          <Course key={course.course_code} course={course} />
        ))}
    </div>
    </div>
  );
};

export default TeacherCourses;
