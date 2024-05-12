import React, { useState } from 'react';
import axios from 'axios';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Settings</h1>
      <button onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
      {showChangePassword && (
        <form onSubmit={handleChangePassword}>
          <label>
            Current Password:
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </label>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <label>
            Confirm New Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
}

export default Settings;