"use client";
import { useState } from 'react';
import { Button, Modal, Label, TextInput, Datepicker } from "flowbite-react";

const MyForm = ({ currentStep, nextStep, prevStep, formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex h-1/4 min-w-screen flex-col align-middle items-center justify-center gap-6">
      {currentStep === 1 && (
        <>
          <h2 className='font-asterone font-medium underline underline-offset-8 text-slate-800 text-2xl'>Equipment/Freight Details</h2>
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
            <div className="mb-1 block">
              <Label htmlFor="ship_date" value="Shipping Date (estimating is fine)" />
              <Datepicker name="shipment_date" value={formData.shipment_date} onChange={handleChange} id="ship_date" minDate={new Date()} />
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
              <Label htmlFor="fname" value="Your first name" />
              <TextInput value={formData.first_name} onChange={handleChange} name="first_name" id="first_name" type="text" placeholder="John" required />
            </div>
            <div className="mb-1 block">
              <Label htmlFor="lname" value="Your last name" />
              <TextInput value={formData.last_name} onChange={handleChange} name="last_name" id="last_name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="mb-1 block">
              <Label htmlFor="pnumber" value="Best contact Number" />
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
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    freight: '',
    origin: '',
    destination: '',
    shipment_date: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        console.log('User inserted:', result.user);
      } else {
        console.error('Error inserting user:', result.error);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <>
      <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
        Construction Equipment/Heavy Duty Trucks
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <MyForm 
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FreightForm;