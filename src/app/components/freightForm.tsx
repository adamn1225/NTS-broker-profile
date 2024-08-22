"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal, Label, TextInput, Datepicker } from "flowbite-react";
import DatepickerWrapper from './Datepickerwrapper';

interface FormData {
  e_year: string;
  e_make: string;
  e_model: string;
  length: string;
  width: string;
  height: string;
  machine_weight: string;
  origin: string;
  destination: string;
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
      New Equipment Transport Lead NTS-Broker-Profile - https://nts-noah.netlify.app/:

      Year: ${data.e_year}
      Make: ${data.e_make}
      Model: ${data.e_model}
      Dimensions (LxWxH): ${data.length} x ${data.width} x ${data.height}
      Machine Weight: ${data.machine_weight}
      Origin: ${data.origin}
      Destination: ${data.destination}
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
          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="year" value="Year (optional)" />
              <TextInput value={formData.e_year} onChange={handleChange} name="e_year" id="e_year" type="text" placeholder="2004" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="make" value="Make" />
              <TextInput value={formData.e_make} onChange={handleChange} name="e_make" id="e_make" type="text" placeholder="Caterpillar" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="model" value="Model" />
              <TextInput value={formData.e_model} onChange={handleChange} name="e_model" id="e_model" type="text" placeholder='D8T'/>
            </div>
          </div>

          <div className="flex flex-row gap-2 border-b border-slate-700/40 pb-3">
            <div className="mb-1 block">
              <Label htmlFor="length" value="Length" />
              <TextInput value={formData.length} onChange={handleChange} name="length" id="length" type="number" placeholder="ft" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="width" value="Width" />
              <TextInput value={formData.width} onChange={handleChange} name="width" id="width" type="number" placeholder="ft" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="height" value="Height" />
              <TextInput value={formData.height} onChange={handleChange} name="height" id="height" type="number" placeholder='ft' />
            </div>
            <div className="block">
              <Label htmlFor="weight" value="lbs" />
              <TextInput value={formData.machine_weight} onChange={handleChange} name="machine_weight" id="weight" type="number" placeholder='lbs' />
            </div>
          </div>
          
          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="origin" value="ZIP origin" />
              <TextInput value={formData.origin} onChange={handleChange} name="origin" id="origin" type="text" placeholder="Zip code or city/state" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="destination" value="ZIP destination" />
              <TextInput value={formData.destination} onChange={handleChange} name="destination" id="destination" type="text" placeholder='Zip code or city/state' />
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

const FreightForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    e_year: '',
    e_make: '',
    e_model: '',
    length: '',
    width: '',
    height: '',
    machine_weight: '',
    origin: '',
    destination: '',
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

  return (
    <>
      <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
        Construction/Heavy/Oversize Equipment
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

export default FreightForm;