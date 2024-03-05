import  { useState } from "react";
import '../style/AddStudentStyle.css'
import toast from "react-hot-toast";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

const Courses = () => {
    
    const [course_code,setCourseCode]=useState("")
    const [subject_name, setSubjectName] = useState("");
    const [semester, setSemester] = useState("");
    const [intended_for, setIntendedForChoices] = useState("BT");
    const [credit,setCredit]=useState("")
    const [teacher_id,setTeacherId]=useState("")


  

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
                <h4 className="title">Add students form</h4>
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
                

                <div className="mb-3">
                    <label>
                    Intended for
                    <select  className="form-control" value={intended_for} onChange={(e) => setIntendedForChoices(e.target.value)}>
                        <option value="BT">BTech</option>
                        <option value="MT">MTech</option>
                        <option value="PhD">PhD</option>
                    </select>
                    </label>
                </div>
          
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ">
                    Add course
                </button>
                </form>
            </div>
            
        
    );
}

export default Courses;
