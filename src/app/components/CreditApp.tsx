"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Label, TextInput } from "flowbite-react";
import { FaHandPointRight, FaCheckDouble, FaCheck } from "react-icons/fa";
import { FaAnglesUp, FaAnglesRight } from "react-icons/fa6";
import InputMask from 'react-input-mask';
import DatepickerWrapper from './Datepickerwrapper';
import Link from 'next/link';
import useWindowDimensions from '../../hooks/useWindowDimensions';

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

    const { width, height } = useWindowDimensions();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section className='z-50 my-10'>
            <h2 className='text-2xl my-4 text-zinc-900 text-center'>Ship often? Request an account application.</h2>
            <div className='flex flex-col items-center gap-5'>
                <button className='main-btn xxs:text-sm  md:text-2xl text-lg font-bold font-mono text-nowrap z-50' onClick={() => setOpenModal(true)}>Request an NTS Shipper&apos;s Account</button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header><span className='m-0 text-2xl text-zinc-950'>NTS Account Application</span></Modal.Header>
                    <Modal.Body>
                        {!isSubmitted ? (
                            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Name
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        name="name"
                                        required
                                        /></Label>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Phone
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Phone'
                                        value={formData.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        required
                                        /></Label>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Email
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        name="email"
                                        required
                                        /></Label>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Company
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Company'
                                        value={formData.company}
                                        onChange={handleChange}
                                        name="company"
                                        required
                                        /></Label>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Years in Business
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Years in Business'
                                        value={formData.years}
                                        onChange={handleChange}
                                        name="years"
                                        required
                                        /></Label>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>How often do you require shipping?
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='1-5 times a week, month, etc.'
                                        value={formData.frequency}
                                        onChange={handleChange}
                                        name="frequency"
                                        required
                                        /></Label>
                                </div>
                                <button className='main-btn hover:bg-amber-400 hover:text-mute-200' type='submit'>Submit</button>
                            </form>
                        ) : (
                            <div className='flex pt-5 flex-col items-center justify-center gap-3'>
                                <h2 className='font-asterone w-full underline underline-offset-8 text-zinc-800 text-lg font-bold text-center md:text-2xl'>Got it, I'll get the application emailed over soon as possible!</h2>
                                <h3 className='font-asterone w-full text-zinc-950 text-lg font-bold text-center md:text-xl'>
                                    If you have any additional questions you can always call or text me at
                                    <span className="text-zinc-950">
                                        <Link href="tel:954-495-8184"> 954-826-4318</Link>
                                    </span>
                                </h3>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
                <div className='mt-6 flex flex-col items-center justify-center'>
                    <h3 className='text-center md:text-normal text-xl font-bold mb-4 text-zinc-900'>Benefits of Getting an Account with NTS:</h3>
                    <ul className='list-none space-y-2 w-full'>
                        <li className='flex justify-center text-zinc-900'>
                            <FaCheck className='text-secondary-y mr-2' />
                            Pay later - net 30 invoicing
                        </li>
                        <li className='flex justify-center text-zinc-900'>
                            <FaCheck className='text-secondary-y mr-2' />
                            Better rates & reduced fees
                        </li>
                        <li className='flex justify-center text-zinc-900'>
                            <FaCheck className='text-secondary-y mr-2' />
                            Premium customer support
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CreditApp;