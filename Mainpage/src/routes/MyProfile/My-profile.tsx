import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./My-profile.css";
import Detail from "./profile_routes/detail";
import Recents from "./profile_routes/recents";
import Reset_password from "./profile_routes/reset-password";
import { BASE_URL } from '../config/config.tsx';
// import photo from "./0f166c6cdf3643e7b8179432a1ddf709.png"



function My_profile() {

  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/login");
    }
  }, [history]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: "",
  });

  
  const [editedLastName, setEditedLastName] = useState("");
  const [, setEditedPhoto] = useState<File | null>(null);

  // Define getLoggedInUserEmail here if it's not defined elsewhere
  const getLoggedInUserEmail = () => {
    return localStorage.getItem("emailId") || "";
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const userEmail = getLoggedInUserEmail();
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await fetch(
        `${BASE_URL}/api/v1/auth/view?email=${encodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile data");
      }
      const userDataFromApi = await response.json();
      setUserData(userDataFromApi);
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  }, []); // Removed getLoggedInUserEmail from the dependency array

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as File;
      setEditedPhoto(file);
  
      try {
        const reader = new FileReader();
        const userEmail = getLoggedInUserEmail();
        const encodedEmail = encodeURIComponent(userEmail);
        const res = await fetch(
          `${BASE_URL}/api/v1/auth/view?email=${encodedEmail}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const userDataFromApi = await res.json();
        const userId = userDataFromApi.id;
        reader.onloadend = async () => {
          if (typeof reader.result !== 'string') {
            console.error('Failed to read file as data URL');
            return;
          }
  
          const formData = new FormData();
          formData.append('photo', file);
  
          const response = await fetch(
            `${BASE_URL}/api/v1/users/update/photo/${userId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
            }
          );
          if (!response.ok) {
            throw new Error('Failed to save Profile Photo');
          }
          fetchUserProfile();
          setUserData({ ...userData, photo: reader.result });
        };
  
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error saving Profile Photo:', error);
      }
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInput.current?.click();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container-profile-photo">
      {/* <h2 className="profile-text">Personal Info: </h2> */}

      <div className="background-picture-profile">
        <div className="profile-picture">
            <img
              className="profile-picture"
              src={`data:image/jpeg;base64,${userData.photo}`}
              // src={photo}
              alt="profile picture"
            />

            <input className="choose-button" type="file" onChange={handleFileChange} style={{display: 'none'}} ref={fileInput} />

            <button className="upload-photo-button" onClick={handleButtonClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="70" viewBox="0 0 20 20" height="70" fill="none" className="svg-icon">
                <g strokeWidth="1.5" strokeLinecap="round" stroke="#de8a2a">
                  <circle r="7.5" cy="10" cx="10"></circle>
                  <path d="m9.99998 7.5v5"></path>
                  <path d="m7.5 9.99998h5"></path>
                </g>
              </svg>
            </button>

            <input
                type="email"
                id="email"
                value={editedLastName || userData.email}
                onChange={(e) => setEditedLastName(e.target.value)}
                readOnly
              />

        </div>
        
        <nav id='menu'>
          <input
            type="checkbox"
            id="responsive-menu"
            checked={isMenuOpen}
            onChange={handleMenuToggle}
          /><label></label>
          <ul id="myTab">
            <li>
              <a href='#profile' onClick={() => setActiveTab('profile')}>Profile</a>
            </li>
            <li>
              <a href='#resetPassword' onClick={() => setActiveTab('resetPassword')}>Reset Password</a>
            </li>
            <li>
              <a href='#recents' onClick={() => setActiveTab('recents')}>Recents</a>
            </li>
          </ul>
        </nav>

        <div >
          {activeTab === 'profile' && <Detail />}
          {activeTab === 'resetPassword' && <Reset_password />}
          {activeTab === 'recents' && <Recents />}
        </div>
      </div>
        
    </div>
  );
}

export default My_profile;
