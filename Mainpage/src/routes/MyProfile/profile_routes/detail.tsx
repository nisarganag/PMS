import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = () => {
  const [userProfile, setUserProfile] = useState({
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
        setUserProfile(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchData();
  }, []); // Add dependencies if any

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

  const handleSubmit = async(event: React.FormEvent) => {
    const userEmail = getLoggedInUserEmail();
    const encodedEmail = encodeURIComponent(userEmail);
    const res = await fetch(
      `http://52.66.213.10:8080/api/v1/auth/view?email=${encodedEmail}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userDataFromApi = await res.json();
    const userId = userDataFromApi.id;
    event.preventDefault();
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
        console.log(response);
        // If the update was successful, you might want to update the userProfile state with the response data
        if (response.data) {
          setUserProfile(response.data);
        }
      })
      .catch((error) => console.log(error));
    setIsEditing(false);
  };

  return (
    <div className="details-div">
      <h1>Detail</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={userProfile.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={userProfile.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="detail-profile">
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Gender: {userProfile.gender}</p>
          <p>Phone Number: {userProfile.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Detail;
