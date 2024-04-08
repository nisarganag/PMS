import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = () => {
  const [userProfile, setUserProfile] = useState({
    id:"",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const getLoggedInUserEmail = () => {
    return localStorage.getItem("emailId") || "";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = getLoggedInUserEmail();
        const encodedEmail = encodeURIComponent(userEmail);
        const response = await fetch(
          `http://52.66.213.10:8080/api/v1/auth/view?email=${encodedEmail}`,
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
        setUserProfile({
          ...userDataFromApi,
          id: userDataFromApi.id, // Add the user's ID to the userProfile state
        });
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };
  
    fetchData();
  }, []); // Add dependencies if any // Add dependencies if any

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

// TODO: put request to update user profile

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const userConfirmed = window.confirm('Are you sure you want to save the changes?');

  // If the user clicked Cancel, stop here and don't save the changes
  if (!userConfirmed) {
    return;
  }
    const userId = userProfile.id; // Assuming the userProfile state includes the user's id
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://52.66.213.10:8080/api/v1/users/update/${userId}`,
        userProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Response data:', response.data);
        // If the update was successful, fetch the updated user profile
        if (response.data === 'User updated successfully') {
          const userEmail = getLoggedInUserEmail();
          const encodedEmail = encodeURIComponent(userEmail);
          axios
            .get(
              `http://52.66.213.10:8080/api/v1/auth/view?email=${encodedEmail}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              const updatedUserProfile = response.data; // Replace this with the correct path to the updated user profile in the response data
              setUserProfile(updatedUserProfile);
            })
            .catch((error) => console.log("Error fetching updated user profile:", error));
        }
      })
      .catch((error) => console.log('Error updating user profile:', error));
    setIsEditing(false);
  };

  return (
    <div className="details-div">
      <h1>Detail</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} >
          <div className="details-profile">
            <div className="detail-left">
              <p className="detail-clr">First Name:</p>
              <p>Last Name:</p>
              <p className="detail-clr">Gender:</p>
              <p>Phone Number:</p>
            </div>
            <div className="detail-right">
              <input
                  type="text"
                  name="firstName"
                  value={userProfile.firstName}
                  onChange={handleChange}
                  className="detail-clr"
              />
              <input
                type="text"
                name="lastName"
                value={userProfile.lastName}
                onChange={handleChange}
                style={{background: 'var(--first-color'}}
              />
              <select
                name="gender"
                value={userProfile.gender}
                onChange={handleChange}
                className="detail-clr"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="phone"
                value={userProfile.phone}
                onChange={handleChange}
                style={{background: 'var(--first-color'}}
              />
            </div> 
          </div>
          <div className="detail-buttons">
            <button type="submit" className="detail-save" >
              Save
              <svg className="detail-svg" viewBox="0 0 448 512">
                <path d="M0 464c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V176H0v288zm320-236c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm80 88v128H48V316c0-6.627 5.373-12 12-12h328c6.627 0 12 5.373 12 12zm-304-28V0h-80c-26.51 0-48 21.49-48 48v240h128zm128 0V0h-80v240h80zm128 0V0h-80v240h80z"></path>
              </svg>
            </button> 
            <button type="button" className="detail-save" onClick={() => setIsEditing(false)}>
              Cancel
              <svg className="detail-svg" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
              </svg>
            </button>
          </div>
          
        </form>
      ) : (
        <div >
          <div className="details-profile">
            <div className="detail-left">
              <p className="detail-clr">First Name:</p>
              <p>Last Name:</p>
              <p className="detail-clr">Gender:</p>
              <p>Phone Number:</p>
            </div>
            <div className="detail-right">
              <p className="detail-clr">{userProfile.firstName ? userProfile.firstName : "N/A"}</p>
              <p>{userProfile.lastName ? userProfile.lastName : "N/A"}</p>
              <p className="detail-clr">{userProfile.gender ? userProfile.gender : "N/A"}</p>
              <p>{userProfile.phone ? userProfile.phone : "N/A"}</p>
            </div>
          </div>
          
          <button className="detail-edit"  onClick={() => setIsEditing(true)}>Edit 
            <svg className="detail-svg" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
          </button>
          
        </div>
        
      )}
    </div>
  );
};

export default Detail;
