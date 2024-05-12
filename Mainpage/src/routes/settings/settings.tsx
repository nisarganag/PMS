import React, { useState } from 'react';
import axios from 'axios';
import './settings.css';

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    try {
      await axios.put('/api/change-password', { currentPassword, newPassword });
      alert('Password changed successfully');
      setShowChangePassword(false);
    } catch (error) {
      alert('Failed to change password');
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.delete('/api/delete-profile');
        alert('Profile deleted successfully');
      } catch (error) {
        alert('Failed to delete profile');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', }}>
      <h1  >Settings</h1>
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
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
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
      </div>
      
    </div>
  );
}

export default Settings;