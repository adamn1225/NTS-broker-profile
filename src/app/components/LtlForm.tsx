"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, Modal, Label, TextInput, Datepicker } from "flowbite-react";
import InputMask from 'react-input-mask';
import DatepickerWrapper from './Datepickerwrapper';

interface FormData {
  count: string;
  commodity: string;
  ltl_value: string;
  length: string;
  width: string;
  height: string;
  machine_weight: string;
  origin_zip: string;
  destination_zip: string;
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
      New LTL/FTL Lead from NTS-Broker-Profile - https://nts-noah.netlify.app/::

      Count: ${data.count}
      Commodity: ${data.commodity}
      LTL Value: ${data.ltl_value}
      Dimensions (LxWxH): ${data.length} x ${data.width} x ${data.height}
      Machine Weight: ${data.machine_weight}
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
          <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl mt-4'>Shipment Details</h2>
          <div className="flex md:flex-row flex-col gap-2 w-full border-b border-slate-700/40 pb-3">
            <div className="mb-1 block">
              <Label htmlFor="count" value="Unit Ct." />
              <TextInput value={formData.count} onChange={handleChange} name="count" id="count" type="text" placeholder="11 Pallets, Crates, etc." />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="Commodity" value="Commodity" />
              <TextInput value={formData.commodity} onChange={handleChange} name="commodity" id="commodity" type="text" placeholder="Electronic parts" />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="freight_value" value="Freight value (for LTL insurance)" />
              <TextInput value={formData.ltl_value} onChange={handleChange} name="ltl_value" id="freight_value" type="number" placeholder='$1000.00'/>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-slate-800 md:px-3 mb-2 border-b border-slate-700/40">
              <h2 className="md:text-center"><strong>For FTL</strong> - Provide estimated dimensions of van/flatbed space needed</h2>
              <h3 className="md:text-center"><strong>For LTL</strong> - Provide estimated dimensions of each unit - fine to average if each unit's different</h3>
            </div>
            
            <div className="flex md:flex-row flex-col gap-2 ">
              <div className="mb-1 block">
                <Label htmlFor="length" value="Length (ft, in)" />
                <TextInput value={formData.length} onChange={handleChange} name="length" id="length" type="number" placeholder="48" />
              </div>
              <div className="mb-1 block">
                <Label htmlFor="width" value="Width (ft, in)" />
                <TextInput value={formData.width} onChange={handleChange} name="width" id="width" type="number" placeholder="48" />
              </div>
              <div className="mb-1 block">
                <Label htmlFor="height" value="Height (ft, in)" />
                <TextInput value={formData.height} onChange={handleChange} name="height" id="height" type="number" placeholder='60' />
              </div>
              <div className="block">
                <Label htmlFor="weight" value="Weight (lbs)" />
                <TextInput value={formData.machine_weight} onChange={handleChange} name="machine_weight" id="weight" type="number" placeholder='800' />
              </div>
            </div>
            <div className='flex flex-col text-center my-2 text-slate-800 border border-slate-700/40 p-3'>
              <h3 className='text-md px-0'>Straight Dry Van <strong>Interior</strong>  Dimensions:</h3>
              <h2 className='text-sm'><strong>Length:</strong> 52'8"-53'</h2>
              <h2 className='text-sm'><strong>Width:</strong> 98-102.36 in</h2>
              <h2 className='text-sm'><strong>Height:</strong> 108-111 in</h2>
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

const LtlForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    count: '',
    commodity: '',
    ltl_value: '',
    length: '',
    width: '',
    height: '',
    machine_weight: '',
    origin_zip: '',
    destination_zip: '',
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
      <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
        <span className='md:text-2xl text-lg font-bold font-mono text-nowrap flex items-center'>LTL/FTL SHIPMENT</span>
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

export default LtlForm;