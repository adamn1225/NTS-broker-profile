"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import emailjs from 'emailjs-com';

interface FormData {
  e_year: string;
  e_make: string;
  e_model: string;
  origin: string;
  destination: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

interface MyFormProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => void;
}

const MyForm: React.FC<MyFormProps> = ({ currentStep, nextStep, prevStep, formData, handleChange }) => {
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm('service_6gziuve', 'template_01cuvab', e.currentTarget, 'rrWtzpNKcD6Y5952J')
      .then((result) => {
        console.log(result.text);
        alert('Form submitted successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to submit the form.');
      });
  };

  return (
    <form onSubmit={sendEmail} className="flex h-1/4 min-w-screen flex-col align-middle items-center justify-center gap-6">
      {currentStep === 1 && (
        <>
          <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl'>Equipment/Freight Details</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="year" value="Year (optional)" />
              <TextInput value={formData.e_year} onChange={handleChange} name="e_year" id="e_year" type="text" placeholder="2020" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="make" value="Make" />
              <TextInput value={formData.e_make} onChange={handleChange} name="e_make" id="e_make" type="text" placeholder="Infiniti" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="model" value="Model" />
              <TextInput value={formData.e_model} onChange={handleChange} name="e_model" id="e_model" type="text" placeholder='Q50'/>
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="origin" value="ZIP origin" />
              <TextInput value={formData.origin} onChange={handleChange} name="origin" id="origin" type="text" placeholder="Zip code or city/state" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="destination" value="ZIP destination" />
              <TextInput value={formData.destination} onChange={handleChange} name="destination" id="destination" type="text" placeholder='Zip code or city/state' />
            </div>
          </div>
          <Button onClick={nextStep} className='px-4 bg-button'>Next</Button>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h2 className='font-asterone font-medium underline underline-offset-8 text-slate-800 text-2xl'>Contact Details</h2>
          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="first_name" value="Your first name" />
              <TextInput value={formData.first_name} onChange={handleChange} name="first_name" id="first_name" type="text" placeholder="John" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="last_name" value="Your last name" />
              <TextInput value={formData.last_name} onChange={handleChange} name="last_name" id="last_name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="phone_number" value="Best Number" />
              <TextInput value={formData.phone_number} onChange={handleChange} name="phone_number" id="phone_number" type="number" placeholder="(---) --- ----" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Best email" />
              <TextInput value={formData.email} onChange={handleChange} name="email" id="email" type="email" placeholder="Doe" />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button onClick={prevStep} className='px-4 bg-button hover:bg-amber-400 hover:text-mute-200'>Previous</Button>
            <Button type="submit" className='px-4 bg-button'>Submit</Button>
          </div>
        </>
      )}
    </form>
  );
};

const AutoForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    e_year: '',
    e_make: '',
    e_model: '',
    origin: '',
    destination: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
  });

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
        Auto Transport
      </Button>
      <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <MyForm 
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AutoForm;