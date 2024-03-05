import  { useState } from "react";
import '../style/AddStudentStyle.css'
import toast from "react-hot-toast";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const Register = () => {
    
    const [rollno,setRollNo]=useState("")
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender,setGender]=useState("M")
    const [batch,setBatch]=useState("")
    const [dept,setDept]=useState("CSE")
    const [year,setYear]=useState("")
    const [course, setCourse] = useState("BT");
    const [doj,setDoj]=useState("")
    const [sem,setSem]=useState("")

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleFileSubmit = async (e) => {
      e.preventDefault();
      try {
        const add_student = new FormData();
        add_student.append("csv_file", file);
        const response = await axios.post("https://sarthak503.pythonanywhere.com/api/upload-students-csv/", add_student, {
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
            const res = await axios.post(`https://sarthak503.pythonanywhere.com/api/students/`, {
                rollno,first_name,last_name,year,email,course,phone,address,doj,gender,dob,batch,dept,sem
            });
            console.log(res)
            console.log(res.status)
            if (res && res.status==201) {
                toast.success("Student created successfully");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } 
            else {
                toast.error(res.data.message);
            }
            if(res)
                console.log(res.data.message)

            setRollNo("");setFirstName("");setLastName("");setEmail("");setDob("");setAddress("");
            setPhone("");setBatch("");setYear("");setDoj("");setSem("")
            } 
            catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }

        console.log(rollno,first_name,last_name,year,email,course,phone,address,doj,gender,dob,batch,dept,sem)
        }

    return (
        
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title">Add students form</h4>
                <div className="mb-3">
                    <input
                    type="text"
                    value={rollno}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="form-control"
                    placeholder="Enter roll no"
                    required
                    autoFocus
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                    placeholder="Enter first Name"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                    placeholder="Enter last Name"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-control"
                    placeholder="Enter year"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Email "
                    required
                    />
                </div>
                {/* <div className="mb-3">
                    <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="form-control"
                    placeholder="Enter the course"
                    required
                    />
                </div> */}
                <div className="mb-3">
                    <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone number"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                    <br></br>
                    <input
                    type="date"
                    value={doj}
                    onChange={(e) => setDoj(e.target.value)}
                    className="form-control"
                    placeholder="What is the joining date"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="DOB" className="form-label">Date of birth</label>
                    <br></br>
                    <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="form-control"
                    placeholder="What is the date of birth"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="string"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="form-control"
                    placeholder="What is the batch"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="number"
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                    className="form-control"
                    placeholder="Enter semester"
                    required
                    
                    />
                </div>
                <div className="mb-3">
                    <label>
                    Select Department:
                    <select  className="form-control" value={dept} onChange={(e) => setDept(e.target.value)}>
                        <option value="CSE">C.S.E</option>
                        <option value="ECE">E.C.E</option>
                    </select>
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                    Select Course:
                    <select  className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value="BT">B.Tech</option>
                        <option value="MT">M.Tech</option>
                        <option value="PhD">PhD</option>
                    </select>
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                    Gender:
                    <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                    </select>
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
                    Add student
                </button>
                </form>

                <div  className="m-8">
                    <h2 className="text-2xl mb-4">Add Student by csv</h2>
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

export default Register;
