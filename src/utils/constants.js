import { faCoffee, faPen,faUserTie,faUser } from "@fortawesome/free-solid-svg-icons";

export const categories=[
    {
        name:"Dashboard",
        path:"/admin/admin-profile",
        icon:faCoffee
    },
    {
        name:"Update profile",
        path:"/admin/update-profile",
        icon:faPen
    },
    {
        name:"Add Courses",
        path:"/admin/courses",
        icon:faCoffee
    },
    {
        name:"Manage Courses",
        path:"/admin/manage-courses",
        icon:faCoffee
    },
    {
        name:"Session",
        path:"/admin/session",
        icon:faCoffee
    },
    {
        name:"Add Staff",
        path:"/admin/add-staff",
        icon:faUserTie
    },
    {
        name:"Manage Staff",
        path:"/admin/manage-staff",
        icon:faCoffee
    },
    {
        name:"Add Student",
        path:"/admin/add-student",
        icon:faUser
    },
    { 
        name:"Manage Student",
        path:"/admin/manage-student",
        icon:faUser
    },
    {
        name:"logout",
        path:"/admin/logout",
        icon:faCoffee
    },
    {
        name:"Notify staff",
        path:"/admin/session",
        icon:faCoffee
    }
]


export const categories2=[
    {
        name:"Dashboard",
        path:"/student/student-profile",
        icon:faCoffee
    },

    {
        name:"See Courses",
        path:"/student/courses",
        icon:faCoffee
    },
    {
        name:"Attendance",
        path:"/student/attendance",
        icon:faCoffee
    },
    {
        name:"Logout",
        path:"/student/logout",
        icon:faUser
    },

]