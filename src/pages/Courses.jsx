import  { useState } from "react";
import '../style/AddStudentStyle.css'
import toast from "react-hot-toast";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const Courses = () => {
    
    const [course_code,setCourseCode]=useState("")
    const [subject_name, setSubjectName] = useState("");
    const [semester, setSemester] = useState("");
    const [intended_for, setIntendedFor] = useState("BT");
    const [credit,setCredit]=useState("")
    const [teacher_id,setTeacherId]=useState("")

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleFileSubmit = async (e) => {
      e.preventDefault();
      try {
        const add_courses = new FormData();
        add_courses.append("csv_file", file);
        const response = await axios.post("https://sarthak503.pythonanywhere.com/api/upload-students-csv/", add_courses, {
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
            const res = await axios.post(`https://sarthak503.pythonanywhere.com/api/subjects/`, {
              course_code,subject_name,semester,intended_for,credit,teacher_id
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

            setCourseCode("");setSubjectName("");setSemester("");setCredit("");setTeacherId("")
            } 
            catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }

        console.log(course_code,subject_name,semester,intended_for,credit,teacher_id)
        }

    return (
        
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title text-2xl font-bold mb-4">Add courses form</h4>
                <div className="mb-3">
                    <input
                    type="text"
                    value={course_code}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="form-control"
                    placeholder="Enter course code"
                    required
                    autoFocus
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={subject_name}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="form-control"
                    placeholder="Enter subject name"
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="number"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="form-control"
                    placeholder="Enter semester"
                    required
                    />
                </div>
                
                <div className="mb-3">
                    <input
                    type="number"
                    value={credit}
                    onChange={(e) => setCredit(e.target.value)}
                    className="form-control"
                    placeholder="Enter the number of credit "
                    required
                    />
                </div>
          
                <div className="mb-3">
                    <input
                    type="text"
                    value={teacher_id}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="form-control"
                    placeholder="Enter teacher id"
                    required
                    />
                </div>
                

                <div className="mb-4">
                    <label htmlFor="program" className="mr-2">
                    Select Program:
                    </label>
                    <select
                    value={intended_for}
                    onChange={(e)=>setIntendedFor(e.target.value)}
                    className="border rounded-md p-2"
                    >
                        <option value="BT">BTech</option>
                        <option value="MT">MTech</option>
                        <option value="PHD">PHD</option>
                    </select>
                </div>
          
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
                    Add course
                </button>
                </form>

                <div  className="m-8">
                    <h2 className="text-2xl mb-4">Upload courses by csv</h2>
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

export default Courses;
