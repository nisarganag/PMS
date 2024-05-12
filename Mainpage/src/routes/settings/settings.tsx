import React, { useState } from 'react';
import axios from 'axios';
import './settings.css';
import { BASE_URL } from '../config/config';

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

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
        } else {
          setMessage('Error updating password');
        }
      })
      .catch((error) => {
        console.log('Error updating password:', error);
        setMessage('Error updating password');
      });
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const getLoggedInUserEmail = () => {
          return localStorage.getItem("emailId") || "";
        };
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
            axios.delete(`${BASE_URL}/api/v1/users/delete/${userId}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(() => {
                alert('Profile deleted successfully');
                localStorage.removeItem('token');
                localStorage.removeItem('emailId');
                window.location.href = '/login';
              })
              .catch((error) => {
                alert(`Failed to delete profile: ${error.message}`);
              });
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', }}>
      <h1>Settings</h1>
      <div style={{textAlign: 'center', display:'flex', flexDirection:'column'}} >
        <button className='setting-btn' onClick={() => setShowChangePassword(!showChangePassword)}>
          <span>Change Password</span>
        </button>
        {showChangePassword && (
          <form className='setting-change-pass' onSubmit={handleChangePassword}>
            <div>
              <div className="detail-left" style={{textAlign:'left'}}>
                <p> Current Password:</p>
                <p> New Password:</p>
                <p> Confirm New Password:</p>
              </div>
              <div className="detail-right">
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <button className="setting-submitBtn"  type="submit">
              Submit
              <svg fill="white" viewBox="0 0 448 512" height="1em" className="arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
            </button>
          </form>
        )}
        <button className='setting-btn-del' onClick={handleDeleteProfile}>
          <span>Delete Profile</span>
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Settings;