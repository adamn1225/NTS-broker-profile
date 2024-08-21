"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Label, TextInput } from "flowbite-react";

const BrokerLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response from server:', result);
      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login successful:', result);
        router.push('/broker-dashboard');
      } else {
        // Handle login error
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='w-full flex flex-col gap-4 justify-center items-center mt-5'>
          <TextInput
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button className='bg-button w-full mt-3 text-center items-center' type="submit">Login</Button>
      </form>
    </div>
  );
};

export default BrokerLogin;