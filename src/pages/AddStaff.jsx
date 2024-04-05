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
    const [dept,setDept]=useState("CSE")
    const [specialisation,setSpecialisation]=useState("")
    const [role,setRole]=useState("")
    const [password,setPassword]=useState("")


    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleFileSubmit = async (e) => {
      e.preventDefault();
      try {
        const add_staff = new FormData();
        add_staff.append("csv_file", file);
        const response = await axios.post("https://sarthak503.pythonanywhere.com/api/upload-students-csv/", add_staff, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded:", response.data);
        // Reset the file state after successful upload if needed
        setFile(null);
        toast.success("file uploaded successfully")
        console.log(2)
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

  

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`https://sarthak503.pythonanywhere.com/api/faculty/`, {
              name,faculty_id,phone_no,email_id,dept,specialisation,role,password
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
            setName("");setFacultyId("");setPhoneNo("");setEmailId("");setDept("");setSpecialisation("");setRole("");setPassword("")

        console.log(name,faculty_id,phone_no,email_id,dept,specialisation,role,password)
        }

    return (
        
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title text-2xl font-bold mb-4">Add faculty form</h4>
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
                <div className="mb-3">
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter password"
                    required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="semester" className="mr-2">
                    Select Department:
                    </label>
                    <select
                    value={dept}
                    onChange={(e)=>setDept(e.target.value)}
                    className="border rounded-md p-2"
                    >
                        <option value="CSE">C.S.E</option>
                        <option value="ECE">E.C.E</option>
                    </select>
                </div>
                

          
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
                    Add faculty
                </button>
                </form>

                <div  className="m-8">
                    <h2 className="text-2xl mb-4">Add faculty by csv</h2>
                    <form onSubmit={handleFileSubmit} className="space-y-4">
                        <div>
                        <label htmlFor="fileInput" className="block mb-2">Choose a file:</label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                            accept=".csv"
                            required
                        />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Upload File</button>
                    </form>
                </div>

            </div>
            
        
    );
}

export default AddStaff;
