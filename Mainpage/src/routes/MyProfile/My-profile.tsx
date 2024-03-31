import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { useCallback } from "react";
import "./My-profile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  // const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  // Define getLoggedInUserEmail here if it's not defined elsewhere
  const getLoggedInUserEmail = () => {
    return localStorage.getItem("emailId") || "";
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const userEmail = getLoggedInUserEmail();
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/view?email=${encodedEmail}`,
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

  const handleEditFirstName = () => {
    setEditedFirstName(userData.firstName);
  };

  const handleSaveFirstName = async () => {
    try {
      const userEmail = getLoggedInUserEmail();
      const encodedEmail = encodeURIComponent(userEmail);
      const res = await fetch(
        `http://localhost:8080/api/v1/auth/view?email=${encodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDataFromApi = await res.json();
      const userId = userDataFromApi.id;
      const response = await fetch(`http://localhost:8080/api/v1/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ firstName: editedFirstName }),
      });
      if (!response.ok) {
        throw new Error("Failed to save first name");
      }
      setUserData({ ...userData, firstName: editedFirstName });
      setEditedFirstName("");
    } catch (error) {
      console.error("Error saving first name:", error);
    }
  };

  const handleEditLastName = () => {
    setEditedLastName(userData.lastName);
  };

  const handleSaveLastName = async () => {
    try {
      const userEmail = getLoggedInUserEmail();
      const encodedEmail = encodeURIComponent(userEmail);
      const res = await fetch(
        `http://localhost:8080/api/v1/auth/view?email=${encodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDataFromApi = await res.json();
      const userId = userDataFromApi.id;
      const response = await fetch(`http://localhost:8080/api/v1/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ lastName: editedLastName }),
      });
      if (!response.ok) {
        throw new Error("Failed to save first name");
      }
      setUserData({ ...userData, lastName: editedLastName });
      setEditedLastName("");
    } catch (error) {
      console.error("Error saving last name:", error);
    }
  };

  const handleEditPhone = () => {
    setEditedPhone(userData.phone);
  };

  const handleSavePhone = async () => {
    try {
      const userEmail = getLoggedInUserEmail();
      const encodedEmail = encodeURIComponent(userEmail);
      const res = await fetch(
        `http://localhost:8080/api/v1/auth/view?email=${encodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDataFromApi = await res.json();
      const userId = userDataFromApi.id;
      const response = await fetch(`http://localhost:8080/api/v1/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ phone: editedPhone }),
      });
      if (!response.ok) {
        throw new Error("Failed to save first name");
      }
      setUserData({ ...userData, phone: editedPhone });
      setEditedPhone("");
    } catch (error) {
      console.error("Error saving Phone Number:", error);
    }
  };

  return (
    <div className="container">
      <h1>My Profile</h1>
      <div className="form-group-profile">
        <label htmlFor="firstName">First Name:</label>
        <div className="profile-detail">
          <input
            type="firstname"
            id="firstName"
            value={editedFirstName || userData.firstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            readOnly={!editedFirstName}
          />
          {editedFirstName ? (
            <button className="save-button" onClick={handleSaveFirstName}>
              <FaSave />
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditFirstName}>
              <svg className="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="form-group-profile">
        <label htmlFor="lastName">Last Name:</label>
        <div className="profile-detail">
          <input
            type="lastname"
            id="lastName"
            value={editedLastName || userData.lastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            readOnly={!editedLastName}
          />
          {editedLastName ? (
            <button className="save-button" onClick={handleSaveLastName}>
              <FaSave />
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditLastName}>
              <svg className="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="form-group-profile">
        <label htmlFor="email">Email:</label>
        <div className="profile-detail">
          <input
            type="email"
            id="email"
            value={editedLastName || userData.email}
            onChange={(e) => setEditedLastName(e.target.value)}
            readOnly
          />
        </div>
      </div>
      <div className="form-group-profile">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <div className="profile-detail">
          <input
            type="tel"
            id="phoneNumber"
            value={editedPhone || userData.phone}
            onChange={(e) => setEditedPhone(e.target.value)}
            readOnly={!editedPhone}
          />
          {editedPhone ? (
            <button className="save-button" onClick={handleSavePhone}>
              <FaSave />
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditPhone}>
              <svg className="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
