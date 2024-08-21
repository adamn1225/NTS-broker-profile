"use client";
import React, { useState, useEffect } from 'react';

interface UpdateProfileFormProps {
  brokerId: string;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ brokerId }) => {
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '', phone_number: '' });

  useEffect(() => {
    // Fetch the current profile data
    fetch(`/api/profile/${brokerId}`)
      .then(response => response.json())
      .then(data => setProfileData({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone_number: data.phone_number
      }));
  }, [brokerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the profile data
    fetch(`/api/profile/${brokerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone_number: profileData.phone_number
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle success or error
        console.log('Profile updated:', data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={profileData.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={profileData.phone_number} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;