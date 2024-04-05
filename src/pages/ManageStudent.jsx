import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/manageStudent.css'; // Import CSS file for styling
import {toast} from 'react-hot-toast'

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [activeRow, setActiveRow] = useState(-1); // Index of the active row (-1 indicates none)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sarthak503.pythonanywhere.com/api/students/');
      setStudents(response.data);
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
      const response = await axios.put(`https://sarthak503.pythonanywhere.com/api/students/${students[index].rollno}/`, students[index]);
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
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents];
      updatedStudents[index][fieldName] = value;
      return updatedStudents;
    });
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`https://sarthak503.pythonanywhere.com/api/students/${students[index].rollno}`);
      console.log('Student deleted:', response.data);

      toast.success("student deleted successfully")
      // Update state after successful deletion
      setStudents((prevStudents) => prevStudents.filter((student, i) => i !== index));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  if (students.length===0) {
    return <div className='h-screen flex flex-row justify-center items-center text-3xl'>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className="table-container ">
      <h2 className='text-2xl font-bold mb-4'>Student Table</h2>
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th>Address</th>
              <th>Phone no</th>
              <th>Gender</th>
              <th>Batch</th>
              <th>Department</th>
              <th>Year</th>
              <th>Course</th>
              <th>Date of joining</th>
              <th>Sem</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className={index === activeRow ? 'active-row' : ''}>
                <td>{index === activeRow ? <input type="text" value={student.rollno} onChange={(e) => handleChange(index, 'rollno', e.target.value)} /> : student.rollno}</td>
                <td>{index === activeRow ? <input type="text" value={student.first_name} onChange={(e) => handleChange(index, 'first_name', e.target.value)} /> : student.first_name}</td>
                <td>{index === activeRow ? <input type="text" value={student.last_name} onChange={(e) => handleChange(index, 'last_name', e.target.value)} /> : student.last_name}</td>
                <td>{index === activeRow ? <input type="email" value={student.email} onChange={(e) => handleChange(index, 'email', e.target.value)} /> : student.email}</td>
                <td>{index === activeRow ? <input type="date" value={student.dob} onChange={(e) => handleChange(index, 'dob', e.target.value)} /> : student.dob}</td>
                <td>{index === activeRow ? <input type="text" value={student.address} onChange={(e) => handleChange(index, 'address', e.target.value)} /> : student.address}</td>
                <td>{index === activeRow ? <input type="text" value={student.phone} onChange={(e) => handleChange(index, 'phone', e.target.value)} /> : student.phone}</td>
                <td>{index === activeRow ? <input type="text" value={student.gender} onChange={(e) => handleChange(index, 'gender', e.target.value)} /> : student.gender=="M"?"Male":"Female"}</td>
                <td>{index === activeRow ? <input type="text" value={student.batch} onChange={(e) => handleChange(index, 'batch', e.target.value)} /> : student.batch}</td>
                <td>{index === activeRow ? <input type="text" value={student.dept} onChange={(e) => handleChange(index, 'dept', e.target.value)} /> : student.dept}</td>
                <td>{index === activeRow ? <input type="num" value={student.year} onChange={(e) => handleChange(index, 'year', e.target.value)} /> : student.year}</td>
                <td>{index === activeRow ? <input type="text" value={student.course} onChange={(e) => handleChange(index, 'course', e.target.value)} /> : student.course=="BT"?"BTech":"MTech"}</td>
                <td>{index === activeRow ? <input type="date" value={student.doj} onChange={(e) => handleChange(index, 'doj', e.target.value)} /> : student.doj}</td>
                <td>{index === activeRow ? <input type="num" value={student.sem} onChange={(e) => handleChange(index, 'sem', e.target.value)} /> : student.sem}</td>
                
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

export default StudentTable;
