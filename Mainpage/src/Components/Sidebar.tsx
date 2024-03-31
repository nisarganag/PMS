import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { GrSearchAdvanced } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import './Sidebar.css'; 
const DropDownProfile = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('emailId');
        window.location.href = '/login';
    }
    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        const emailId = localStorage.getItem('emailId');
    
        return token !== null || emailId !== null;
    }
    return(
        <div className={"dropdown"}  onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown } >
            <button className="dropbtn">
                <Link to={isLoggedIn() ? "/My_profile" : "/Login"} className="userLogo">
                    <FaRegUser />
                </Link>
            </button>
            {showDropdown && (
                <div className="input ">
                    
                    <a href={isLoggedIn() ? "/My_profile" : "/login"} className="value" >
                    <RiAccountPinCircleLine className='drop-logo-icon' />
                        Account           
                    </a>
                    <a className="value">
                        <IoMdHelp className='drop-logo-icon'/>
                        Help & Info
                    </a>
                    <a className="value" onClick={logout}>
                    <IoLogOut className='drop-logo-icon' />
                        Log Out
                    </a>
                    
                </div>
            )}
        </div>
    )
}


const Sidebar = () => {
    const [show, setShow] = useState(false);
    const [activeLink, setActiveLink] = useState("Home"); // Track active link

    // Function to handle click on a link
    const handleLinkClick = (linkName: string) => {
        setActiveLink(linkName);
    }

    return (
        <main className={`sidebar-container ${show ? 'space-toggle' : ''}`}>
            <header className={`header ${show ? 'space-toggle' : ''}`}>
                <div className="header-toggle" onClick={() => setShow(!show)}>
                    <FaBars />
                </div>
                <DropDownProfile/>
            

            </header>

        

            <aside className={`sidebar ${show ? 'show' : ''}`}>
                <nav className="nav">
                    <div>
                        <Link 
                            to="Home" 
                            className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} 
                            onClick={() => handleLinkClick('Home')}
                        >
                            <FaHome className='nav-logo-icon' />
                            <span className="nav-logo-name">Home</span>
                        </Link>

                        <Link 
                            to="My_profile" 
                            className={`nav-link ${activeLink === 'My_profile' ? 'active' : ''}`} 
                            onClick={() => handleLinkClick('My_profile')}
                        >
                            <FaGraduationCap className='nav-logo-icon' />
                            <span className="nav-logo-name">My Profile</span>
                        </Link>

                        <Link 
                            to="My_library" 
                            className={`nav-link ${activeLink === 'My_library' ? 'active' : ''}`} 
                            onClick={() => handleLinkClick('My_library')}
                        >
                            <IoIosStar className='nav-logo-icon' />
                            <span className="nav-logo-name">My Library</span>
                        </Link>

                        <Link 
                            to="Alerts" 
                            className={`nav-link ${activeLink === 'Alerts' ? 'active' : ''}`} 
                            onClick={() => handleLinkClick('Alerts')}
                        >
                            <IoMail className='nav-logo-icon'/>
                            <span className="nav-logo-name">Alerts</span>
                        </Link>

                        <Link 
                            to="Metrices" 
                            className={`nav-link ${activeLink === 'Metrices' ? 'active' : ''}`} 
                            onClick={() => handleLinkClick('Metrices')}
                        >
                            <ImStatsBars2 className='nav-logo-icon'/>
                            <span className="nav-logo-name">Metrices</span>
                        </Link>

                        <Link 
                            to="Advanced_search" 
                            className={`nav-link ${activeLink === 'Advanced_Search' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('Advanced_Search')}
                        >
                            <GrSearchAdvanced className='nav-logo-icon'/>
                            <span className="nav-logo-name">Advanced Search</span>
                        </Link> 

                        <Link 
                            to="Settings" 
                            className={`nav-link ${activeLink === 'Settings' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('Settings')}
                            >
                            <IoMdSettings className='nav-logo-icon'/>
                            <span className="nav-logo-name">Settings</span>
                        </Link>
                    </div> 
                </nav>
            </aside>
        </main>
    );
}

export default Sidebar;