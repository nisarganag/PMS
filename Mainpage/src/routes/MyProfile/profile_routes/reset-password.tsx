import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config.tsx';
import { MdErrorOutline } from "react-icons/md";

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
      <form onSubmit={handleChangePassword} >
        <div className="details-profile">
          <div className="detail-left">
            <p className="detail-clr">Old Password:</p>
            <p>New Password:</p>
            <p className="detail-clr">Confirm New Password:</p>
          </div>
          <div className="detail-right">
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="detail-clr"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{background: 'var(--first-color'}}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="detail-clr"
            />
          </div>
        </div>
        <button type="submit" className="pass-save" >
              Save
              <svg className="detail-svg" viewBox="0 0 448 512">
                <path d="M0 464c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V176H0v288zm320-236c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm80 88v128H48V316c0-6.627 5.373-12 12-12h328c6.627 0 12 5.373 12 12zm-304-28V0h-80c-26.51 0-48 21.49-48 48v240h128zm128 0V0h-80v240h80zm128 0V0h-80v240h80z"></path>
              </svg>
        </button> 
      </form>
      {message && 
      <p>
        <MdErrorOutline style={{color:"red", fontSize:"20px", }} />
        {message}
      </p>}
    </div>
  );
};

export default ResetPassword;
