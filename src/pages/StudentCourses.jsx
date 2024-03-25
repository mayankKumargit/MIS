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

const StudentCourses = () => {
  const {dept}=useAuth()
  // const [courses, setCourses] = useState([]);
  // const [selectedSemester, setSelectedSemester] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  // const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  useEffect(() => {
    // Fetch all courses by default
    axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&intended_for=BT`)
      .then(response => {
        // setCourses(response.data);
        setFilteredCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dept]);

  const handleFilter = async (semester) => {
    try {
      if (semester === "") {
        axios.get(`https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&intended_for=BT`)
      .then(response => {
        // setCourses(response.data);
        setFilteredCourses(response.data);
      })
      } else {
        const response = await axios.get(
          `https://sarthak503.pythonanywhere.com/api/filter/?dept=${dept}&semester=${semester}&intended_for=BT`
        );
        setFilteredCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered courses:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Courses</h1>
      <div className="mb-4">
      <label htmlFor="semester" className="mr-2">
        Select Semester:
      </label>
      <select
        name="semester"
        id="semester"
        onChange={(e) => handleFilter(e.target.value)}
        className="border rounded-md p-2"
      >
        <option value="">All</option> {/* Option to show all courses */}
        {[...Array(8).keys()].map((semester) => (
          <option key={semester} value={semester + 1}>
            Semester {semester + 1}
          </option>
        ))}
      </select>
    </div>
    <div>
        {filteredCourses.sort((a, b) => a.semester - b.semester).map((course) => (
          <Course key={course.course_code} course={course} />
        ))}
    +</div>
    </div>
  );
};

export default StudentCourses;
