import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import toast from 'react-hot-toast';

const StudentMarks = () => {

  const {userDetails}=useAuth()

  const rollno=userDetails.userDetails.rollno
  const dept=userDetails.userDetails.dept
  const program=userDetails.userDetails.course
  const semester=userDetails.userDetails.sem


  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');


  const [marksData, setMarksData] = useState({});

  const [loading1,setLoading1]=useState(false)
  
  const [temp,setTemp]=useState(false)
  const [selectedExam, setSelectedExam] = useState('');

  const getMarks = async () => {
    try {
      setLoading1(true)
      setMarksData({})
      setTemp(true)
      const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/result-details/?subject=${selectedCourse}&exam=${selectedExam}&rollno=${rollno}`);
      setLoading1(false)
      setMarksData(response.data)
      console.log(response.data)
 
      console.log(rollno)
  
    } catch (error) {
      console.error('Error fetching marks :', error);
      toast.error("No marks uploaded")
      setLoading1(false)
    }
  };






  useEffect(() => {
    // Fetch courses based on selected program and semester
    if (program && semester) {
      axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&semester=${semester}&intended_for=${program}`)
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [program,semester]);





  console.log(program,semester)
  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">Get marks details</h1>

      <div className="mb-4">
          <label htmlFor="courses" className="text-xl font-semibold mb-4 mr-2">
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
          onChange={(e) => {setSelectedExam(e.target.value);setMarksData({})}}
        >
          <option value="">Select Exam</option>
          <option value="CT1">CT1</option>
          <option value="CT2">CT2</option>
          <option value="EndSem">End Semester</option>
        </select>
      </div>
      <button onClick={getMarks} className="mt-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get marks</button>

      {loading1 && <h1 className='flex flex-row justify-center items-center text-3xl my-10'>Loading marks...</h1>}

      {(!loading1 && marksData.student===null) && <h1 className='flex flex-row justify-center items-center text-3xl my-10'>No marks for this subject_id</h1>}

      {
        (temp && (marksData.student ?? null)) && (
          <h1 className=' text-3xl my-10'>Marks for the {selectedExam} is {marksData.marks}</h1>
        )
      }

      
      
    </div>
    
  );
};

export default StudentMarks;

