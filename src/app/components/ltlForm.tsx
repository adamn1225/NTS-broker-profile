"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import emailjs from 'emailjs-com';

interface FormData {
  count: string;
  commodity: string;
  ltl_value: number;
  length: number;
  width: number;
  height: number;
  machine_weight: number;
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

    emailjs.sendForm('service_6gziuve', 'template_3h9ecks', e.currentTarget, 'rrWtzpNKcD6Y5952J')
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
          <h2 className='font-asterone font-medium underline underline-offset-8 text-slate-800 text-2xl'>Shipment Details</h2>
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



          <div className="flex flex-row gap-2 align-middle justify-center">
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

const LtlForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    count: '',
    commodity: '',
    ltl_value: 0,
    length: 0,
    width: 0,
    height: 0,
    machine_weight: 0,
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
        LTL/FTL
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

export default LtlForm;