"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Label, TextInput } from "flowbite-react";
import { FaHandPointRight, FaCheckDouble } from "react-icons/fa";
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
        <div>
            <button onClick={() => setOpenModal(true)}>Open Credit App</button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Credit Application</Modal.Header>
                <Modal.Body>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>Name</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    name="name"
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>Phone</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='Phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>Email</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    name="email"
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>Company</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='Company'
                                    value={formData.company}
                                    onChange={handleChange}
                                    name="company"
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>Years in Business</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='Years in Business'
                                    value={formData.years}
                                    onChange={handleChange}
                                    name="years"
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-stone-950 font-bold'>How often do you require shipping?</Label>
                                <TextInput
                                    className='bg-stone-100'
                                    placeholder='1-5 times a week, month, etc.'
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    name="frequency"
                                    required
                                />
                            </div>
                            <button className='bg-button hover:bg-amber-400 hover:text-mute-200' type='submit'>Submit</button>
                        </form>
                    ) : (
                        <div className='flex pt-5 flex-col items-center justify-center gap-3'>
                            <h2 className='font-asterone w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl'>Got it, I'll get the application emailed over soon as possible!</h2>
                            <h3 className='font-asterone w-full text-slate-950 text-lg font-bold text-center md:text-xl'>
                                If you have any additional questions you can always call or text me at
                                <span className="text-slate-950">
                                    <Link href="tel:954-495-8184"> 954-826-4318</Link>
                                </span>
                            </h3>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreditApp;