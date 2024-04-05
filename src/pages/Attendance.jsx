import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';

const Attendance = () => {

  const {userDetails}=useAuth()

  const rollno=userDetails.userDetails.rollno
  const dept=userDetails.userDetails.dept
  const program=userDetails.userDetails.course
  const semester=userDetails.userDetails.sem


  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [percentagePresent, setPercentagePresent] = useState(null);


  const handleSingleDateSubmit = async () => {
    try {
      const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/attendance/?student_id=${rollno}&subject_id=${selectedCourse}&date=${date}`);
      setAttendanceData([response.data]);
      console.log(response.data)
      console.log(date)
      console.log(rollno)
      console.log("get single date attendance")
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleRangeDateSubmit = async () => {
    try {
      const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/attendance/?student_id=${rollno}&subject_id=${selectedCourse}&start_date=${startDate}&end_date=${endDate}`);
      setAttendanceData(response.data);
      calculatePercentagePresent(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const calculatePercentagePresent = (data) => {
    const totalDates = data.length;
    const presentCount = data.filter(item => item.status === 'P').length;
    const percentage = (presentCount / totalDates) * 100;
    setPercentagePresent(percentage.toFixed(2)); // Round to 2 decimal places
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

      <h1 className="text-2xl font-bold mb-4">Get Attendance details</h1>

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

      <div className="my-10">
        <h1 className="text-xl font-semibold mb-4 mt-5 mr-2 ">Get Attendance for the specific dates</h1>

        <div className="mb-4">
          <label className="text-xl font-semibold mb-4 mr-2 block ">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" px-4 py-2 border rounded"
          />
          <button onClick={handleSingleDateSubmit} className="mt-2 block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Attendance</button>
        </div>
      </div>

      <h1 className="text-xl font-semibold mb-4 mr-2 ">Get Attendance for the range of dates</h1>

      <div className='flex flex-row justify-evenly'>
        <div className="mb-4">
          <label className="block text-xl font-semibold mb-4 mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className=" px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xl font-semibold mb-4 mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className=" px-4 py-2 border rounded"
          />
        </div>
      </div>
      <button onClick={handleRangeDateSubmit} className="mt-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Attendance Range</button>

      <div>
        <h2 className="text-xl font-bold mb-2 my-10">Attendance Details:</h2>
        <table className="w-3/5">
          <thead>
            <tr>
              <th className="py-2 pr-6">Date</th>
              <th className="py-2 pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(item => (
              <tr key={item.date}>
                <td className="py-2 pl-40">{item.date}</td>
                <td className="py-2 pl-40">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {percentagePresent && (
          <p className="mt-4">Percentage Present: {percentagePresent}%</p>
        )}
      </div>
    </div>
    
  );
};

export default Attendance;

