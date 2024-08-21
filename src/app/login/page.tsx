"use client";
import '../globals.css';
import React, { useState } from 'react';
import BrokerLogin from './brokerLogin';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import BrokerRegister from './brokerRegister';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
<div className=" w-full h-full flex flex-col justify-center items-center">
  <div className="flex flex-row gap-4">
    <Button className='bg-button' onClick={handleLoginClick}>Login</Button>
    <Button className='bg-button' onClick={handleRegisterClick}>Register</Button>
  </div>
  <div className="flex flex-col">
    {showLogin && <BrokerLogin />}
    {showRegister && <BrokerRegister />}
  </div>
</div>
  );
};

export default LoginPage;