import  { useState } from "react";
import '../style/AddStudentStyle.css'
import toast from "react-hot-toast";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const AddStaff = () => {
    
    const [name,setName]=useState("")
    const [faculty_id, setFacultyId] = useState("");
    const [phone_no, setPhoneNo] = useState("");
    const [email_id, setEmailId] = useState("");
    const [dept,setDept]=useState("")
    const [specialisation,setSpecialisation]=useState("")
    const [role,setRole]=useState("")


  

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`https://sarthak503.pythonanywhere.com/api/faculty/`, {
              name,faculty_id,phone_no,email_id,dept,specialisation,role
            });
            console.log(res)
            console.log(res.status)
            if (res && res.status==201) {
                toast.success("Faculty added successfully");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } 
            else {
                toast.error(res.data.message);
            }
            if(res)
                console.log(res.data.message)

            } 
            catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
            setName("");setFacultyId("");setPhoneNo("");setEmailId("");setDept("");setSpecialisation("");setRole("")

        console.log(name,faculty_id,phone_no,email_id,dept,specialisation,role)
        }

    return (
        
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title">Add faculty form</h4>
                <div className="mb-3">
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter faculty name"
                    required
                    autoFocus
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={faculty_id}
                    onChange={(e) => setFacultyId(e.target.value)}
                    className="form-control"
                    placeholder="Enter faculty id"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="number"
                    value={phone_no}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="form-control"
                    placeholder="Enter phone number"
                    required
                    />
                </div>
                
                <div className="mb-3">
                    <input
                    type="email"
                    value={email_id}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="form-control"
                    placeholder="Enter the email-id "
                    required
                    />
                </div>
          
                <div className="mb-3">
                    <input
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="form-control"
                    placeholder="Enter department"
                    required
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="text"
                    value={specialisation}
                    onChange={(e) => setSpecialisation(e.target.value)}
                    className="form-control"
                    placeholder="Enter specialisation"
                    required
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                    placeholder="Enter role"
                    required
                    />
                </div>
                

          
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
                    Add faculty
                </button>
                </form>
            </div>
            
        
    );
}

export default AddStaff;
