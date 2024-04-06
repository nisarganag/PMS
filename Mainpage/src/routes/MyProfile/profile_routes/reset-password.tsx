import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/user/password')
            .then(response => setPassword(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChangePassword = (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match');
            return;
        }

        bcrypt.compare(newPassword, password, (err, isMatch) => {
            if (err) {
                console.log(err);
            } else if (isMatch) {
                setMessage('New password cannot be the same as the current password');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);

                axios.put('http://localhost:5000/user/password', { password: hash })
                    .then(response => setMessage('Password changed successfully'))
                    .catch(error => console.log(error));
            }
        });
    };

    return (
        <div className="details-div">
            <h1>Password Change</h1>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;