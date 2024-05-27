import {  faUserTie, faUser, faSignOut, faGauge, faAddressBook, faUserPlus, faIdBadge, faUserPen, faPenToSquare, faPlus, faBookOpen, faEye, faMarker } from "@fortawesome/free-solid-svg-icons";

export const admins=[
    {
        name:"Dashboard",
        path:"/admin/",
        icon: faGauge
    },
    {
        name:"Add Courses",
        path:"/admin/courses",
        icon:faPlus
    },
    {
        name:"Manage Courses",
        path:"/admin/manage-courses",
        icon:faPenToSquare
    },
    {
        name:"Add Staff",
        path:"/admin/add-staff",
        icon: faUserPlus
    },
    {
        name:"Manage Staff",
        path:"/admin/manage-staff",
        icon:faUserTie
    },
    {
        name:"Add Student",
        path:"/admin/add-student",
        icon:faUserPlus
    },
    { 
        name:"Manage Student",
        path:"/admin/manage-student",
        icon:faUserPen
    },
    {
        name:"logout",
        path:"/admin/logout",
        icon:faSignOut
    }
]


export const students=[
    {
        name:"Profile",
        path:"/student/",
        icon:faUser
    },

    {
        name:"See Courses",
        path:"/student/courses",
        icon:faBookOpen
    },
    {
        name:"Attendance",
        path:"/student/attendance",
        icon:faEye
    },
    {
        name:"See marks",
        path:"/student/see-marks",
        icon:faEye
    },
    {
        name:"Logout",
        path:"/student/logout",
        icon:faSignOut
    },

]

export const teachers=[
    {
        name:"Profile",
        path:"/teacher/",
        icon:faIdBadge
    },
    {
        name:"Courses",
        path:"/teacher/courses",
        icon:faBookOpen
    },
    {
        name:"Attendance",
        path:"/teacher/attendance",
        icon:faAddressBook
    },
    {
        name:"See Attendance",
        path:"/teacher/list-attendance",
        icon:faEye
    },
    {
        name:"Save marks",
        path:"/teacher/save-marks",
        icon:faMarker
    },
    {
        name:"See marks",
        path:"/teacher/see-marks",
        icon:faEye
    },
    {
        name:"Logout",
        path:"/teacher/logout",
        icon:faSignOut
    },

]