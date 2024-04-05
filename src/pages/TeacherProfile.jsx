import { useAuth } from "../components/AuthContext"
const TeacherProfile = () => {
  const {userDetails}=useAuth()
  console.log(userDetails.userDetails)
  return (
    <div>
      teacher profile
    </div>
  )
}

export default TeacherProfile
