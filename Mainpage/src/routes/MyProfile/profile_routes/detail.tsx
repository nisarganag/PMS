import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = () => {
    const [userProfile, setUserProfile] = useState({
        firstName: 'sonu',
        lastName: 'ady',
        gender: 'male',
        phoneNumber: '6969',
        bio: 'my bio'
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('') // Add the API endpoint
            .then(response => setUserProfile(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setUserProfile({
            ...userProfile,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.put('', userProfile) // Add the API endpoint
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setIsEditing(false);
    };

    return (
        <div className="details-div">
            <h1>Detail</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={userProfile.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={userProfile.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select name="gender" value={userProfile.gender} onChange={handleChange}>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={userProfile.phoneNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Bio:</label>
                        <textarea name="bio" value={userProfile.bio} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className='detail-profile'>
                    <p>First Name: {userProfile.firstName}</p>
                    <p>Last Name: {userProfile.lastName}</p>
                    <p>Gender: {userProfile.gender}</p>
                    <p>Phone Number: {userProfile.phoneNumber}</p>
                    <p>Bio: {userProfile.bio}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default Detail;