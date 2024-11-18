// LtlForm.tsx
"use client";
import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import InputMask from 'react-input-mask';
import DatepickerWrapper from './Datepickerwrapper';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface FormData {
  count: string | null;
  commodity: string | null;
  ltl_value: string | null;
  length: string | null;
  width: string | null;
  height: string | null;
  machine_weight: string | null;
  origin_zip: string | null;
  destination_zip: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  email: string | null;
}

interface LtlFormProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => void;
  setIsSubmitted: (value: boolean) => void;
}

const LtlForm: React.FC<LtlFormProps> = ({ currentStep, nextStep, prevStep, formData, handleChange, setIsSubmitted }) => {
  const formatEmailContent = (data: FormData) => {
    return `
      New LTL/FTL Transport Lead From NTS-Broker-Profile - https://nts-noah.netlify.app/::

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
          <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl mt-4'>LTL/FTL Transport Details</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="count" value="Count" />
              <TextInput value={formData.count || ''} onChange={handleChange} name="count" id="count" type="text" placeholder="Count" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="commodity" value="Commodity" />
              <TextInput value={formData.commodity || ''} onChange={handleChange} name="commodity" id="commodity" type="text" placeholder="Commodity" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="ltl_value" value="LTL Value" />
              <TextInput value={formData.ltl_value || ''} onChange={handleChange} name="ltl_value" id="ltl_value" type="text" placeholder='LTL Value' />
            </div>
          </div>

          <div className="flex flex-row gap-2 border-b border-slate-700/40 pb-3">
            <div className="mb-1 block">
              <Label htmlFor="length" value="Length" />
              <TextInput value={formData.length || ''} onChange={handleChange} name="length" id="length" type="number" placeholder="ft" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="width" value="Width" />
              <TextInput value={formData.width || ''} onChange={handleChange} name="width" id="width" type="number" placeholder="ft" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="height" value="Height" />
              <TextInput value={formData.height || ''} onChange={handleChange} name="height" id="height" type="number" placeholder='ft' />
            </div>
            <div className="block">
              <Label htmlFor="machine_weight" value="Machine Weight" />
              <TextInput value={formData.machine_weight || ''} onChange={handleChange} name="machine_weight" id="machine_weight" type="number" placeholder='lbs' />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="origin_zip" value="Origin ZIP Code" />
              <TextInput value={formData.origin_zip || ''} onChange={handleChange} name="origin_zip" id="origin_zip" type="text" placeholder="ZIP Code" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="destination_zip" value="Destination ZIP Code" />
              <TextInput value={formData.destination_zip || ''} onChange={handleChange} name="destination_zip" id="destination_zip" type="text" placeholder="ZIP Code" required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <div className="mb-1 block text-center">
              <Label htmlFor="date" value="Shipping Date" />
              <DatepickerWrapper
                onChange={handleChange}
                name="date"
                minDate={new Date()} 
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
              <TextInput value={formData.first_name || ''} onChange={handleChange} name="first_name" id="first_name" type="text" placeholder="John" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="last_name" value="Your last name" />
              <TextInput value={formData.last_name || ''} onChange={handleChange} name="last_name" id="last_name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="phone_number" value="Best Number" />
              <InputMask
                mask="(999) 999-9999"
                value={formData.phone_number || ''}
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
              <TextInput value={formData.email || ''} onChange={handleChange} name="email" id="email" type="email" placeholder="Doe" required />
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

export default LtlForm;