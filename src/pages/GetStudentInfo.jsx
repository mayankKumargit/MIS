import { useAuth } from "../components/AuthContext"
const GetStudentInfo = () => {
  const {userEmail}=useAuth()
  return (
    <div>
      {userEmail}
    </div>
  )
}

export default GetStudentInfo
