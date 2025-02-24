"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import RequestQuoteForm from './RequestQuoteForm';

type Equipment = {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: {
        Length: string;
        Width: string;
        Height: string;
    };
    manufacturer: string;
    model: string;
    slug: string;
};

interface FormData {
    date: string | null;
    destination_zip: string | null;
    manufacturer: string | null;
    model: string | null;
    e_year: string | null;
    email: string | null;
    first_name: string | null;
    height: string | null;
    length: string | null;
    machine_weight: string | null;
    origin_zip: string | null;
    phone_number: string | null;
    last_name: string | null;
    width: string | null;
}

interface RequestQuoteFormClientProps {
    equipment: Equipment;
}

const RequestQuoteFormClient: React.FC<RequestQuoteFormClientProps> = ({ equipment }) => {
    const [formData, setFormData] = useState<FormData>({
        date: '',
        destination_zip: '',
        manufacturer: equipment.manufacturer,
        model: equipment.model,
        e_year: '',
        email: '',
        first_name: '',
        height: equipment.dimensions.Height,
        length: equipment.dimensions.Length,
        machine_weight: equipment.Weight,
        origin_zip: '',
        phone_number: '',
        last_name: '',
        width: equipment.dimensions.Width,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Send email notification
            const response = await fetch('/api/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                    subject: 'Heavy Equipment Transport Inquiry',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            console.log('Email sent successfully');
            setSubmitted(true); // Show the "Thank You" message
        } catch (error) {
            console.error('Error submitting quote request:', error);
        }
    };

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-normal items-center h-full'>
                <div className='h-full max-h-fit flex flex-col gap-2 justify-start py-12 bg-zinc-100 items-center w-full'>
                    <h1 className='text-center text-zinc-900 text-2xl mb-4 font-semibold md:text-3xl underline mt-4'>Dimensions of a {equipment.manufacturer} {equipment.model}</h1>
                    <ul className='flex flex-col md:flex-row md:gap-8'>
                        <li className='text-zinc-900 md:text-lg'><strong>Length:</strong>{equipment.dimensions.Length}</li>
                        <li className='text-zinc-900 md:text-lg'><strong>Width:</strong>{equipment.dimensions.Width}</li>
                        <li className='text-zinc-900 md:text-lg'><strong>Height:</strong>{equipment.dimensions.Height}</li>
                    </ul>
                    <p className='text-zinc-900 md:text-lg'><strong>Weight:</strong> {equipment.Weight}</p>
                </div>
                <div className='relative bg-form-bg bg-cover flex justify-center items-baseline pb-6 w-full border border-t-zinc-800/20'>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className='z-10 w-fit my-6 flex justify-center'>
                        {submitted ? (
                            <div className="text-center text-green-600 text-lg font-semibold">
                                Thank you! Your quote request has been submitted.
                            </div>
                        ) : (
                            <RequestQuoteForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                        )}
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default RequestQuoteFormClient;