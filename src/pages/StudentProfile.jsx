import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../components/AuthContext";

const StudentProfile = () => {
  const { userEmail } = useAuth();
  const {setDept}=useAuth()
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/students/${userEmail}/`);
        setUserData(response.data);
        
        setDept(response.data.dept)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    console.log("user email "+userEmail)
    fetchData();
  }, [userEmail]);

  

  if (!userData) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 mx-20  text-blue-900">Student Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 my-3 w-auto">
        {/* Render user data here */}
        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Roll No : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.rollno}</span>
        </div>
        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">First Name : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.first_name}</span>
        </div>
        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Last Name : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.last_name}</span>
        </div>
        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Email : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.email}</span>
        </div>
        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Date of Birth : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.dob}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Address : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.address}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Phone No : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.phone}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Department : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.dept}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Batch year : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.batch}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Gender : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.gender=='M'?"Male":"Female"}</span>
        </div>

        <div className="mb-4">
          <span className=" text-2xl font-medium text-gray-700">Current Semester : </span>
          <span className=" text-2xl font-medium text-blue-900">{userData.sem}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
