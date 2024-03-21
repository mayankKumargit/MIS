/* eslint-disable react/prop-types */
// import { categories1,categories2 } from "../utils/constants"
import { FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Sidebar = ({children,categories}) => {

    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);

  return (
    <div className="container">
    <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
        <div className="top_section">
            <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                <FaBars onClick={toggle}/>
            </div>
        </div>
        {
            categories.map((item, index)=>(
                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                    {/* <FontAwesomeIcon icon={item.icon} /> */}
                    <FontAwesomeIcon icon={item.icon} />
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                </NavLink>
            ))
        }
    </div>
    <main>{children}</main>
 </div>
  )
}

export default Sidebar
