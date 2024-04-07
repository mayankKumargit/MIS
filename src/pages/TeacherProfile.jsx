import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../components/AuthContext";

const TeacherProfile = () => {
  const { userDetails } =useAuth()
  console.log(userDetails)
  const userEmail=userDetails.userDetails.email_id
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sarthak503.pythonanywhere.com/api/faculty/${userEmail}/`);
        setUserData(response.data);
        
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    console.log("user email "+userEmail)
    fetchData();
  }, [userEmail]);

  

  if (!userData) {
    return <div className='h-screen  flex flex-row justify-center items-center text-3xl'>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className=" flex flex-col  px-4 py-8">
      <h1 className="text-3xl mx-auto font-bold mb-4   text-blue-900">Teacher Profile</h1>
      <div className='mx-auto'>
        <div className="bg-white shadow-md rounded-lg p-6 my-3 w-fit">
          {/* Render user data here */}
          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700"> Name : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.name}</span>
          </div>
          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Email : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.email_id}</span>
          </div>
          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Faculty Id : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.faculty_id}</span>
          </div>

          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Department : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.dept}</span>
          </div>

          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Phone No : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.phone_no}</span>
          </div>

          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Role : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.role}</span>
          </div>

          <div className="mb-4">
            <span className=" text-2xl font-medium text-gray-700">Specialisation : </span>
            <span className=" text-2xl font-medium text-blue-900">{userData.specialisation}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
