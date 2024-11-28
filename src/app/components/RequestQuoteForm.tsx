"use client";
import React, { ChangeEvent, FormEvent } from 'react';
import MaskedInput from 'react-text-mask';
import DateInput from './DateInput';

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

interface RequestQuoteFormProps {
    formData: FormData;
    handleChange: (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const RequestQuoteForm: React.FC<RequestQuoteFormProps> = ({ formData, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-gray-800 underline">Get a Haul Rate</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                    <label htmlFor="e_year" className="font-semibold">Year (optional)</label>
                    <input value={formData.e_year || ''} onChange={handleChange} name="e_year" id="e_year" type="text" placeholder="2004" className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="e_make" className="font-semibold">Make</label>
                    <input value={formData.e_make || ''} onChange={handleChange} name="e_make" id="e_make" type="text" placeholder="Caterpillar" className="p-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="e_model" className="font-semibold">Model</label>
                    <input value={formData.e_model || ''} onChange={handleChange} name="e_model" id="e_model" type="text" placeholder="D8T" className="p-2 border border-gray-300 rounded" required />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                    <label htmlFor="length" className="font-semibold">Length</label>
                    <input value={formData.length || ''} onChange={handleChange} name="length" id="length" type="number" placeholder="ft" className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="width" className="font-semibold">Width</label>
                    <input value={formData.width || ''} onChange={handleChange} name="width" id="width" type="number" placeholder="ft" className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="height" className="font-semibold">Height</label>
                    <input value={formData.height || ''} onChange={handleChange} name="height" id="height" type="number" placeholder="ft" className="p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="machine_weight" className="font-semibold">Weight (lbs)</label>
                    <input value={formData.machine_weight || ''} onChange={handleChange} name="machine_weight" id="machine_weight" type="number" placeholder="lbs" className="p-2 border border-gray-300 rounded" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                    <label htmlFor="origin_zip" className="font-semibold">Origin ZIP Code</label>
                    <input value={formData.origin_zip || ''} onChange={handleChange} name="origin_zip" id="origin_zip" type="text" placeholder="ZIP Code" className="p-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="destination_zip" className="font-semibold">Destination ZIP Code</label>
                    <input value={formData.destination_zip || ''} onChange={handleChange} name="destination_zip" id="destination_zip" type="text" placeholder="ZIP Code" className="p-2 border border-gray-300 rounded" required />
                </div>
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="date" className="font-semibold">Shipping Date</label>
                <DateInput
                    value={formData.date || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                    <label htmlFor="first_name" className="font-semibold">First Name</label>
                    <input value={formData.first_name || ''} onChange={handleChange} name="first_name" id="first_name" type="text" placeholder="John" className="p-2 border border-gray-300 rounded" required />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="last_name" className="font-semibold">Last Name</label>
                    <input value={formData.last_name || ''} onChange={handleChange} name="last_name" id="last_name" type="text" placeholder="Doe" className="p-2 border border-gray-300 rounded" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col w-full">
                    <label htmlFor="phone_number" className="font-semibold">Phone Number</label>
                    <MaskedInput
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        value={formData.phone_number || ''}
                        onChange={handleChange}
                        render={(ref, props) => (
                            <input
                                {...props}
                                ref={ref as React.LegacyRef<HTMLInputElement>}
                                name="phone_number"
                                id="phone_number"
                                type="text"
                                placeholder="(---) --- ----"
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input value={formData.email || ''} onChange={handleChange} name="email" id="email" type="email" placeholder="you@email.com" className="p-2 border border-gray-300 rounded" required />
                </div>
            </div>

            <div className="flex justify-center w-full">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
        </form>
    );
};

export default RequestQuoteForm;