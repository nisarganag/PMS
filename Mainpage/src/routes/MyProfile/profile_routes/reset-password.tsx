import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config.tsx';

const ResetPassword = () => {
  const [, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    const userEmail = getLoggedInUserEmail();
    const encodedEmail = encodeURIComponent(userEmail);
    const token = localStorage.getItem("token");
  
    axios
      .get(`${BASE_URL}/api/v1/auth/view?email=${encodedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Handle the response here. You might set state that you use elsewhere in your component.
      })
      .catch((error) => console.log(error));
  }, []);
  const getLoggedInUserEmail = () => {
    return localStorage.getItem("emailId") || "";
  };
  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
  
    const userEmail = getLoggedInUserEmail();
    const encodedEmail = encodeURIComponent(userEmail);
    const token = localStorage.getItem("token");
  
    axios
      .get(`${BASE_URL}/api/v1/auth/view?email=${encodedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userId = response.data.id;
  
        return axios
          .post(
            `${BASE_URL}/api/v1/auth/authenticate`,
            { email: userEmail, password: oldPassword }
          )
          .then((response) => {
            const token = response.data.token;
  
            return axios.put(
              `${BASE_URL}/api/v1/users/update/${userId}`,
              { password: newPassword },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          });
      })
      .then((response) => {
        if (response.data === 'User updated successfully') {
          setMessage('Password updated successfully');
          setPassword(newPassword);
        } else {
          setMessage('Error updating password');
        }
      })
      .catch((error) => {
        console.log('Error updating password:', error);
        setMessage('Error updating password');
      });
  };

  return (
    <div className="details-div">
      <h1>Password Change</h1>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
