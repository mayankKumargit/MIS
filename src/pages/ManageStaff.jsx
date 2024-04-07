import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/manageStudent.css'; // Import CSS file for styling
import {toast} from 'react-hot-toast'

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [activeRow, setActiveRow] = useState(-1); // Index of the active row (-1 indicates none)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sarthak503.pythonanywhere.com/api/faculty/');
      setStaffs(response.data);
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
      const response = await axios.put(`https://sarthak503.pythonanywhere.com/api/faculty/${staffs[index].faculty_id}/`, staffs[index]);
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
    setStaffs(prevStaffs => {
      const updatedStaffs = [...prevStaffs];
      updatedStaffs[index][fieldName] = value;
      return updatedStaffs;
    });
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`https://sarthak503.pythonanywhere.com/api/faculty/${staffs[index].faculty_id}/`);
      console.log('faculty deleted:', response.data);

      toast.success("faculty deleted successfully")
      // Update state after successful deletion
      setStaffs((prevStaffs) => prevStaffs.filter((staff, i) => i !== index));
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  if (staffs.length===0) {
    return <div className='h-screen  flex flex-row justify-center items-center text-3xl'>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className="table-container">
      <h2 className='text-2xl font-bold mb-4'>Faculty Table</h2>
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>Faculty id</th>
              <th>Faculty Name</th>
              <th>Phone no</th>
              <th>Email</th>
              <th>Department</th>
              <th>Specialization </th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={index} className={index === activeRow ? 'active-row' : ''}>
                <td>{index === activeRow ? <input type="text" value={staff.faculty_id} onChange={(e) => handleChange(index, 'faculty_id', e.target.value)} /> : staff.faculty_id}</td>
                <td>{index === activeRow ? <input type="text" value={staff.name} onChange={(e) => handleChange(index, 'name', e.target.value)} /> : staff.name}</td>
                <td>{index === activeRow ? <input type="number" value={staff.phone_no} onChange={(e) => handleChange(index, 'phone_no', e.target.value)} /> : staff.phone_no}</td>
                <td>{index === activeRow ? <input type="email" value={staff.email_id} onChange={(e) => handleChange(index, 'email_id', e.target.value)} /> : staff.email_id}</td>
                <td>{index === activeRow ? <input type="text" value={staff.dept} onChange={(e) => handleChange(index, 'dept', e.target.value)} /> : staff.dept}</td>
                <td>{index === activeRow ? <input type="text" value={staff.specialisation} onChange={(e) => handleChange(index, 'specialisation', e.target.value)} /> : staff.specialisation}</td> 
                <td>{index === activeRow ? <input type="text" value={staff.role} onChange={(e) => handleChange(index, 'role', e.target.value)} /> : staff.role}</td> 
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

export default ManageStaff;
