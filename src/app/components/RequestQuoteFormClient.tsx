"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Equipment } from '../../types';
import RequestQuoteForm from '@components/RequestQuoteForm';

interface FormData {
    e_year: string | null;
    e_make: string | null;
    e_model: string | null;
    length: string | null;
    width: string | null;
    height: string | null;
    machine_weight: string | null;
    origin_zip: string | null;
    destination_zip: string | null;
    date: string | null;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    email: string | null;
}

interface RequestQuoteFormClientProps {
    equipment: Equipment;
}

const RequestQuoteFormClient: React.FC<RequestQuoteFormClientProps> = ({ equipment }) => {
    const [formData, setFormData] = useState<FormData>({
        e_year: '',
        e_make: equipment.manufacturer,
        e_model: equipment.model,
        length: equipment.dimensions.Length.replace(/[^\d.]/g, ''),
        width: equipment.dimensions.Width.replace(/[^\d.]/g, ''),
        height: equipment.dimensions.Height.replace(/[^\d.]/g, ''),
        machine_weight: equipment.Weight.replace(/[^\d.]/g, ''),
        origin_zip: '',
        destination_zip: '',
        date: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    formData,
                    subject: `New Quote Request for ${formData.e_make} ${formData.e_model}`
                })
            });

            if (!response.ok) {
                throw new Error('Error submitting quote request');
            }

            console.log('Quote request submitted successfully');
        } catch (error) {
            console.error('Error submitting quote request:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-col justify-start items-center h-full'>
                <h1 className='text-zinc-900 text-4xl underline mt-4'>{equipment.manufacturer} {equipment.model}</h1>
                <p className='text-zinc-900 text-2xl mb-2'><strong>Dimensions:</strong></p>
                <ul>
                    <li className='text-zinc-900'><strong>Length:</strong> {equipment.dimensions.Length}</li>
                    <li className='text-zinc-900'><strong>Width:</strong> {equipment.dimensions.Width}</li>
                    <li className='text-zinc-900'><strong>Height:</strong> {equipment.dimensions.Height}</li>
                </ul>
                <p className='text-zinc-900'><strong>Weight:</strong> {equipment.Weight}</p>
            </div>
                <RequestQuoteForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
};

export default RequestQuoteFormClient;