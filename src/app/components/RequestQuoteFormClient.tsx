"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Database } from '../../../lib/database.types';
import RequestQuoteForm from './RequestQuoteForm';
import supabase from '../../../lib/supabaseClient';

type Equipment = Database['public']['Tables']['equipment']['Row'];

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
        e_year: equipment.e_year,
        email: '',
        first_name: '',
        height: equipment.height,
        length: equipment.length,
        machine_weight: equipment.machine_weight,
        origin_zip: '',
        phone_number: '',
        last_name: '',
        width: equipment.width,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('equipment')
                .insert([formData]);

            if (error) {
                throw new Error('Error inserting data into Supabase');
            }

            console.log('Quote request submitted successfully');

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
                <div className='h-full max-h-fit flex flex-col gap-2 justify-start py-12 bg-stone-100 items-center w-full'>
                    <h1 className='text-center text-zinc-900 text-lg font-semibold md:text-3xl underline mt-4'>Dimensions of a {equipment.manufacturer} {equipment.model}</h1>
                    <ul className='flex flex-col md:flex-row md:gap-8'>
                        <li className='text-zinc-900 md:text-lg'><strong>Length:</strong>{equipment.length}</li>
                        <li className='text-zinc-900 md:text-lg'><strong>Width:</strong>{equipment.width}</li>
                        <li className='text-zinc-900 md:text-lg'><strong>Height:</strong>{equipment.height}</li>
                    </ul>
                    <p className='text-zinc-900 md:text-lg'><strong>Weight:</strong> {equipment.machine_weight}</p>
                </div>
                <div className='bg-zinc-300 flex justify-center items-baseline pb-6 w-full border border-t-zinc-800/20'>
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
    );
};

export default RequestQuoteFormClient;