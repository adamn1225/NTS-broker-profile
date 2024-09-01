"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaHandPointRight, FaCheckDouble } from "react-icons/fa";
import { FaAnglesUp, FaAnglesRight } from "react-icons/fa6";
import InputMask from 'react-input-mask';
import DatepickerWrapper from './Datepickerwrapper';

interface FormData {
    name: string;
    phone: string;
    email: string;
    company: string;
    years: string;
    frequency: string;
}

const CreditApp = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        years: '',
        frequency: '',
    });

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formatEmailContent = (data: FormData) => {
            return `
      Credit Request for NTS Credit App- Lead NTS-Broker-Profile - https://nts-noah.netlify.app/:

      Last Name: ${data.name}
      Phone Number: ${data.phone}
      Email: ${data.email}
      Company: ${data.company}
      Years in Business: ${data.years}
      Frequency: ${data.frequency}
    `;
        };

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
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    years: '',
                    frequency: '',
                }); // Reset form fields
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <article className='bg-stone-300 py-12 '>
            <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                <div className=' flex text-stone-950 flex-col gap-2 '>
                    <span className='xxs:px-0 text-center xxs:items-center xxs:justify-center text-3xl flex md:gap-2 text-stone-950 md:text-center font-bold font-mono'>
                        <FaAnglesRight className='xxs:h-6' style={{ color: '#b18c2f', }} /><h4 className='xxs:text-base xxs:text-center md:text-lg  text-stone-950'>ATTENTION FREQUENT SHIPPERS</h4>
                    </span>
                    <div className='xxs:p-0 xxs:flex justify-center items-center my-2' style={{ border: 'solid', borderColor: '#b18c2f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div>
                    <h3 className='text-stone-950 text-center font-semibold'>Does your business need reliable shipping often?</h3>
                    <p className='text-stone-950 text-center font-semibold'>Request a credit application</p>
                    <div className='flex flex-col gap-2 w-full items-center'>
                        <p className='xxs:text-md text-stone-950 text-center text-lg font-semibold'>The benefits of being a credit customer</p>
                        <ul>
                            <li className='flex w-full justify-center'>
                                <FaCheckDouble style={{ color: '#b18c2f' }} /><span className=' text-stone-950 text-md font-medium'>Reduced Transport Costs
                                </span>
                            </li>
                            <li className='flex w-full justify-center'>
                                <FaCheckDouble style={{ color: '#b18c2f' }} /><span className=' text-stone-950 text-md font-medium'>Priority on Orders</span>
                            </li>
                            <li className='flex w-full justify-center text-stone-950 text-md font-medium'>
                                <FaCheckDouble style={{ color: '#b18c2f' }} />No upfront payments needed
                            </li>
                        </ul>
                    </div>

                    <Button className='xxs:mx-2 bg-button mt-4 md:mx-4 hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
                        <span className='md:text-2xl  text-sm font-bold font-mono text-nowrap flex items-center'>
                        <FaHandPointRight className="mr-2" /> Request a Credit Application 
                    </span>
                    </Button>
                </div>
                <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
                    <Modal.Header className='bg-stone-100' />
                    <Modal.Body className='bg-stone-100'>
                        {!isSubmitted ? (
                            <form onSubmit={sendEmail}>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-stone-950 font-bold'>Name</Label>
                                        <TextInput
                                            className='bg-stone-100'
                                            placeholder='Name'
                                            value={formData.name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-stone-950 font-bold'>Email</Label>
                                        <TextInput
                                            className='bg-stone-100'
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-1 block">
                                        <Label htmlFor="phone_number" value="Best Number" />
                                        <InputMask
                                            mask="(999) 999-9999"
                                            value={formData.phone}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        >
                                            {/* @ts-ignore */}
                                            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                                                <TextInput
                                                    {...inputProps}
                                                    name="phone_number"
                                                    id="phone_number"
                                                    type="text"
                                                    placeholder="(---) --- ----"
                                                />
                                            )}
                                        </InputMask>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-stone-950 font-bold'>Company</Label>
                                        <TextInput
                                            className='bg-stone-100'
                                            placeholder='Company'
                                            value={formData.company}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-stone-950 font-bold'>Years in Business</Label>
                                        <TextInput
                                            className='bg-stone-100'
                                            placeholder='Years in Business'
                                            value={formData.years}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, years: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-stone-950 font-bold'>How often do you require shipping?</Label>
                                        <TextInput
                                            className='bg-stone-100'
                                            placeholder='1-5 times a week, month, etc.'
                                            value={formData.frequency}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, frequency: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' type='submit'>Submit</Button>
                                </div>
                            </form>
                        ) : (
                            <div className='flex pt-5 flex-col items-center justify-center gap-3'>
                                <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl'>Got it, I'll get the application emailed over soon as possible!</h2>
                                <h3 className='font-asterone w-full text-slate-950 text-lg font-bold text-center md:text-xl'> If you have any additional questions you can always call or text me at <a href="tel:954-495-8184">954-826-4318</a></h3>
                                <h3 className='font-asterone w-full text-slate-950 text-lg font-bold text-center md:text-xl '> You can also email me at <a className="text-slate-950 " href="mailto:noah@ntslogistics.com">noah@ntslogistics.com</a></h3>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </article>
    );
};

export default CreditApp;