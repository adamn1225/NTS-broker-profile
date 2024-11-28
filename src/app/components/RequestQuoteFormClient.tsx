"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Equipment } from '../../../lib/schema';
import supabase from '../../../lib/supabaseClient';

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
        e_make: equipment.e_make,
        e_model: equipment.e_model,
        length: equipment.length?.replace(/[^\d.]/g, '') || '',
        width: equipment.width?.replace(/[^\d.]/g, '') || '',
        height: equipment.height?.replace(/[^\d.]/g, '') || '',
        machine_weight: equipment.machine_weight?.replace(/[^\d.]/g, '') || '',
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
            const { error } = await supabase
                .from('quotes')
                .insert([formData]);

            if (error) {
                throw new Error('Error inserting data into Supabase');
            }

            console.log('Quote request submitted successfully');
        } catch (error) {
            console.error('Error submitting quote request:', error);
        }
    };

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-normal items-center h-full'>
                {/* Add your form component here */}
            </div>
        </div>
    );
};

export default RequestQuoteFormClient;