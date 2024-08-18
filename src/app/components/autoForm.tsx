"use client"
import { useState } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import LoginBanner from './LoginBanner'
interface Props {}

function AutoForm(props: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  function onCloseModal() {
    setOpenModal(false);
  }

  function nextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function prevStep() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  return (
    <>
      <Button className='bg-button' onClick={() => setOpenModal(true)}>Auto Transport</Button>
      <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
        <Modal.Header />
         <LoginBanner />
         <Modal.Body>
          <form className="flex h-2/4 min-w-screen flex-col align-middle items-center justify-center gap-4">
            {currentStep === 1 && (
              <>
                <h2 className='font-asterone font-medium underline underline-offset-8 text-slate-800 text-2xl'>Equipment/Freight Details</h2>
                <div className="flex flex-row gap-2">
                  <div className="mb-1 block">
                    <Label htmlFor="year" value="Year (optional)" />
                    <TextInput id="year" type="text" placeholder="2004" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="make" value="Make" />
                    <TextInput id="make" type="text" placeholder="Caterpillar" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="model" value="Model" />
                    <TextInput id="model" type="text" placeholder='D8T'/>
                  </div>
                </div>

                <div className="flex flex-row gap-2 border-b border-slate-700/40 pb-3">
                  <div className="mb-1 block">
                    <Label htmlFor="length" value="Length" />
                    <TextInput id="length" type="number" placeholder="ft" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="width" value="Width" />
                    <TextInput id="width" type="number" placeholder="ft" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="height" value="Height" />
                    <TextInput id="height" type="number" placeholder='ft' />
                  </div>
                  <div className="block">
                    <Label htmlFor="weight" value="lbs" />
                    <TextInput id="weight" type="number" placeholder='lbs' />
                  </div>
                </div>
                
                <div className="flex flex-row gap-2">
                  <div className="mb-1 block">
                    <Label htmlFor="origin" value="ZIP origin" />
                    <TextInput id="origin" type="text" placeholder="Zip code or city/state" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="destination" value="ZIP destination" />
                    <TextInput id="destination" type="text" placeholder='Zip code or city/state' />
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
                    <TextInput id="fname" type="text" placeholder="John" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="lname" value="Your last name" />
                    <TextInput id="lname" type="text" placeholder="Doe" />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="mb-1 block">
                    <Label htmlFor="pnumber" value="Best contact Number" />
                    <TextInput id="pnumber" type="number" placeholder="(---) --- ----" required />
                  </div>
                  <div className="mb-1 block">
                    <Label htmlFor="email" value="Best email" />
                    <TextInput id="email" type="email" placeholder="Doe" />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <Button onClick={prevStep} className='px-4 bg-button'>Previous</Button>
                  <Button type="submit" className='px-4 bg-button'>Submit</Button>
                </div>
              </>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AutoForm;