import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import toast from "react-hot-toast";

const TeacherMarks = () => {
  const { userDetails } = useAuth();

  const faculty_id = userDetails.userDetails.faculty_id;
  const dept = userDetails.userDetails.dept;

  const [program, setProgram] = useState('BT');
  const [semester, setSemester] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [program, semester]);

  useEffect(() => {
    // Fetch students based on selected course
    if (selectedCourse) {
      setLoading(true);
      setStudents([]);
      axios.get(`https://sarthak503.pythonanywhere.com/api//filter-students/?dept=${dept}&sem=${semester}&intended_for=${program}`)
        .then(response => {
          setLoading(false);
          setStudents(response.data);

          // Initialize marks state
          const initialMarks = response.data.map(student => ({
            student: student.rollno,
            subject: selectedCourse,
            exam: selectedExam,
            marks: 0, // Assuming all students have 0 marks initially
          }));
          setMarks(initialMarks);
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedCourse, selectedExam]);

  const handleSaveMarks = () => {
    // Send marks data to the API endpoint
    console.log(marks)
    axios.post('https://sarthak503.pythonanywhere.com/api/bulk-result-upload/', marks)
      .then(response => {
        console.log('Marks saved successfully:', response.data);
        toast.success("Marks saved successfully");
        // Optionally, handle success message or navigation
      })
      .catch(error => {
        console.error('Error saving marks:', error);
        toast.error("Marks already uploaded");
        // Optionally, handle error message or retry logic
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Student Marks Upload</h1>

      <div className="mb-4">
        <label htmlFor="program" className="text-xl font-semibold mb-4 mr-2">
          Select Program:
        </label>
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="BT">BTech</option>
          <option value="MT">MTech</option>
          <option value="PhD">PHD</option>
        </select>
      </div>

      {(program === 'BT' ) && (
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

      {(program === 'PhD' || program === 'MT') && (
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
        <label htmlFor="exam" className="text-xl font-semibold mb-4 mr-2">
          Select Exam:
        </label>
        <select
          className="border rounded-md p-2"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select Exam Type</option>
          <option value="CT1">CT1</option>
          <option value="CT2">CT2</option>
          <option value="EndSem">End Semester</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="course" className="text-xl font-semibold mb-4 mr-2">
          Select Course:
        </label>
        <select
          className="border rounded-md p-2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.course_code} value={course.course_code}>{course.subject_name}</option>
          ))}
        </select>
      </div>


      {loading && selectedCourse && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>Loading students...</h1>}

      {!loading && students.length === 0 && <h1 className='h-32  flex flex-row justify-center items-center text-3xl'>No students</h1>}

      {students.length > 0 && (
        <div className="flex  flex-col justify-center align-middle">
          <h2 className="text-2xl font-semibold my-10">Enter Marks</h2>
          <table className="w-3/5">
            <thead>
              <tr>
                <th className="py-2 ">Roll No</th>
                <th className="py-2 ">Course</th>
                <th className="py-2">Exam type</th>
                <th className="py-2 ">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.rollno}>
                  <td className="py-4 pl-14 ">{student.rollno}</td>
                  <td className="py-2 pl-14">{`${selectedCourse}`}</td>
                  <td className="py-2 pl-14">{`${selectedExam}`}</td>
                  <td className="py-2 pl-14">
                    <input
                      type="number"
                      className="w-40 rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                      value={marks[index].marks}
                      onChange={(e) => {
                        const updatedMarks = [...marks];
                        updatedMarks[index].marks = e.target.value;
                        setMarks(updatedMarks);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="py-2 w-48 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
            onClick={handleSaveMarks}
          >
            Save Marks
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherMarks;
