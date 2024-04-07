import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/manageStudent.css'; // Import CSS file for styling
import {toast} from 'react-hot-toast'

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [activeRow, setActiveRow] = useState(-1); // Index of the active row (-1 indicates none)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sarthak503.pythonanywhere.com/api/subjects/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (index) => {
    // Set the index of the active row
    setActiveRow(index);
  };

  const handleSave = async (index) => {
    // Update the data in the database
    try {
      const response = await axios.put(`https://sarthak503.pythonanywhere.com/api/subjects/${courses[index].course_code}/`, courses[index]);
      console.log('Data updated:', response.data);
      // Reset the active row after saving
      setActiveRow(-1);
      toast.success("Edited successfully")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (index, fieldName, value) => {
    // Update the value of the field for the student at the given index
    setCourses(prevCourses => {
      const updatedCourses = [...prevCourses];
      updatedCourses[index][fieldName] = value;
      return updatedCourses;
    });
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`https://sarthak503.pythonanywhere.com/api/subjects/${courses[index].course_code}/`);
      console.log('Course deleted:', response.data);

      toast.success("course deleted successfully")
      // Update state after successful deletion
      setCourses((prevCourses) => prevCourses.filter((course, i) => i !== index));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (courses.length===0) {
    return <div className='h-screen  flex flex-row justify-center items-center text-3xl'>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className="table-container">
      <h2 className='title text-2xl font-bold mb-4'>Courses Table</h2>
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Subject Name</th>
              <th>Semester</th>
              <th>Program</th>
              <th>Credit</th>
              <th>Department</th>
              <th>Teacher id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className={index === activeRow ? 'active-row' : ''}>
                <td>{index === activeRow ? <input type="text" value={course.course_code} onChange={(e) => handleChange(index, 'course_code', e.target.value)} /> : course.course_code}</td>
                <td>{index === activeRow ? <input type="text" value={course.subject_name} onChange={(e) => handleChange(index, 'subject_name', e.target.value)} /> : course.subject_name}</td>
                <td>{index === activeRow ? <input type="number" value={course.semester} onChange={(e) => handleChange(index, 'semester', e.target.value)} /> : course.semester}</td>
                <td>{index === activeRow ? <input type="email" value={course.intended_for} onChange={(e) => handleChange(index, 'intended_for', e.target.value)} /> : course.intended_for=="BT"?"BTech":course.intended_for=="MT"?"MTech":"PhD"}</td>
                <td>{index === activeRow ? <input type="number" value={course.credit} onChange={(e) => handleChange(index, 'credit', e.target.value)} /> : course.credit}</td>
                <td>{index === activeRow ? <input type="text" value={course.dept} onChange={(e) => handleChange(index, 'dept', e.target.value)} /> : course.dept}</td>
                <td>{index === activeRow ? <input type="text" value={course.teacher_id} onChange={(e) => handleChange(index, 'teacher_id', e.target.value)} /> : course.teacher_id}</td> 
                <td>
                  <div className='flex'>
                  {index === activeRow ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => handleSave(index)}>Save</button> : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => handleEdit(index)}>Edit</button>}
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCourses;
