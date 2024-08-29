"use client";

import { useState, ChangeEvent, FormEvent, JSX, RefAttributes, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Datepicker, TextInputProps } from "flowbite-react";
import InputMask from 'react-input-mask';
import DatepickerWrapper from './Datepickerwrapper';

interface FormData {
  e_year: string;
  e_make: string;
  e_model: string;
  origin_zip: string;
  destination_zip: string;
  date: string;
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
  setIsSubmitted: (value: boolean) => void; // Add setIsSubmitted prop
}

const MyForm: React.FC<MyFormProps> = ({ currentStep, nextStep, prevStep, formData, handleChange, setIsSubmitted }) => {
  const formatEmailContent = (data: FormData) => {
    return `
      New Auto Transport Lead From NTS-Broker-Profile - https://nts-noah.netlify.app/::

      Year: ${data.e_year}
      Make: ${data.e_make}
      Model: ${data.e_model}
      date: ${data.date}
      Origin: ${data.origin_zip}
      Destination: ${data.destination_zip}
      First Name: ${data.first_name}
      Last Name: ${data.last_name}
      Phone Number: ${data.phone_number}
      Email: ${data.email}
    `;
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailContent = formatEmailContent(formData);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: emailContent }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
        setIsSubmitted(true); // Set isSubmitted to true upon successful submission
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };



  return (
    <form onSubmit={sendEmail} className="flex h-1/4 min-w-screen flex-col align-middle items-center justify-center gap-6">
      {currentStep === 1 && (
        <>
          <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl mt-4'>Equipment/Freight Details</h2>
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
              <Label htmlFor="origin_zip" value="Origin ZIP Code" />
              <TextInput value={formData.origin_zip} onChange={handleChange} name="origin_zip" id="origin_zip" type="text" placeholder="ZIP Code" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="destination_zip" value="Destination ZIP Code" />
              <TextInput value={formData.destination_zip} onChange={handleChange} name="destination_zip" id="destination_zip" type="text" placeholder="ZIP Code" required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <div className="mb-1 block text-center">
              <Label htmlFor="date" value="Shipping Date" />
              <DatepickerWrapper
                onChange={handleChange}
                name="date"
                minDate={new Date()} // Minimum selectable date is today
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                
              />
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
              <InputMask
                mask="(999) 999-9999"
                value={formData.phone_number}
                onChange={handleChange}
              >
                {/* @ts-ignore */}
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <TextInput
                    {...inputProps}
                    name="phone_number"
                    id="phone_number"
                    type="text"
                    placeholder="(---) --- ----"
                    required
                  />
                )}
              </InputMask>
            </div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Best email" />
              <TextInput value={formData.email} onChange={handleChange} name="email" id="email" type="email" placeholder="Doe" required/>
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    e_year: '',
    e_make: '',
    e_model: '',
    origin_zip: '',
    destination_zip: '',
    date: '',
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

  const fetchCityAndState = async (zipCode: string, type: 'origin' | 'destination') => {
    if (zipCode.length === 5) {
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
        if (response.ok) {
          const data = await response.json();
          const { 'place name': city, 'state abbreviation': state } = data.places[0];
          setFormData((prevData) => ({
            ...prevData,
            [`${type}_zip`]: `${zipCode} - ${city}, ${state}`
          }));
        }
      } catch (error) {
        console.error('Error fetching city and state:', error);
      }
    }
  };

  useEffect(() => {
    const zipCode = formData.origin_zip.split(' - ')[0]; // Extract the ZIP code part
    fetchCityAndState(zipCode, 'origin');
  }, [formData.origin_zip]);

  useEffect(() => {
    const zipCode = formData.destination_zip.split(' - ')[0]; // Extract the ZIP code part
    fetchCityAndState(zipCode, 'destination');
  }, [formData.destination_zip]);

  return (
    <>
      <Button className='bg-button hover:bg-amber-400  hover:text-mute-200' onClick={() => setOpenModal(true)}>
        <span className='text-2xl font-bold font-mono'> AUTO TRANSPORT</span>  
      </Button>
      <Modal show={openModal} size="3xl" className='bg-stone-600' onClose={onCloseModal} popup>
        <Modal.Header className='bg-stone-100'/>
        <Modal.Body className='bg-stone-100'>
          {isSubmitted ? (
            <div className='flex flex-col items-center justify-center gap-3'>
              <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl'>Thanks! I'll get working on it!</h2>
              <h3 className='font-asterone w-full text-slate-800 text-lg font-bold text-center md:text-xl'>I'll get the shipping rate you requested ASAP </h3>
              <h3 className='font-asterone w-full text-slate-800 text-lg font-bold text-center md:text-xl'> Need faster? Call or text me at 954-495-8184</h3>
              <h3 className='font-asterone w-full text-slate-800 text-lg font-bold text-center md:text-xl'> You can also email me at noah@ntslogistics.com</h3>
              </div>
          ) : (
            <MyForm 
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              handleChange={handleChange}
              setIsSubmitted={setIsSubmitted} // Pass setIsSubmitted as a prop
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AutoForm;