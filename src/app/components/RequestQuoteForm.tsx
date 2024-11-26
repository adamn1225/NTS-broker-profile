"use client";
import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
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
        <form onSubmit={handleSubmit} className="flex h-1/4 mb-5 min-w-screen flex-col align-middle items-center justify-center gap-6">
            <h2 className='font-asterone w-full underline underline-offset-8 text-zinc-800 text-lg font-bold text-center md:text-2xl mt-4'>Get a Haul Rate</h2>
            <div className="flex flex-row gap-2">
                <div className="mb-1 block">
                    <Label htmlFor="year" value="Year (optional)" />
                    <TextInput value={formData.e_year || ''} onChange={handleChange} name="e_year" id="e_year" type="text" placeholder="2004" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="make" value="Make" />
                    <TextInput value={formData.e_make || ''} onChange={handleChange} name="e_make" id="e_make" type="text" placeholder="Caterpillar" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="model" value="Model" />
                    <TextInput value={formData.e_model || ''} onChange={handleChange} name="e_model" id="e_model" type="text" placeholder='D8T' />
                </div>
            </div>

            <div className="flex flex-row gap-2 border-b border-zinc-700/40 pb-3">
                <div className="mb-1 block">
                    <Label htmlFor="length" value="Length" />
                    <TextInput value={formData.length || ''} onChange={handleChange} name="length" id="length" type="number" placeholder="ft" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="width" value="Width" />
                    <TextInput value={formData.width || ''} onChange={handleChange} name="width" id="width" type="number" placeholder="ft" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="height" value="Height" />
                    <TextInput value={formData.height || ''} onChange={handleChange} name="height" id="height" type="number" placeholder='ft' />
                </div>
                <div className="block">
                    <Label htmlFor="weight" value="lbs" />
                    <TextInput value={formData.machine_weight || ''} onChange={handleChange} name="machine_weight" id="weight" type="number" placeholder='lbs' />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="mb-1 block">
                    <Label htmlFor="origin_zip" value="Origin ZIP Code" />
                    <TextInput value={formData.origin_zip || ''} onChange={handleChange} name="origin_zip" id="origin_zip" type="text" placeholder="ZIP Code" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="destination_zip" value="Destination ZIP Code" />
                    <TextInput value={formData.destination_zip || ''} onChange={handleChange} name="destination_zip" id="destination_zip" type="text" placeholder="ZIP Code" required />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 items-stretch w-full justify-center">
                <div className="mb-1 text-center font-semibold w-3/4 flex flex-col gap-1 md:w-1/6">
                    <Label className='font-medium' htmlFor="date" value="Shipping Date" />
                    <DateInput
                        value={formData.date || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h2 className='font-asterone font-medium underline underline-offset-8 text-zinc-800 text-2xl'>Contact Details</h2>
            <div className="flex flex-row gap-2">
                <div className="mb-1 block">
                    <Label htmlFor="first_name" value="Your first name" />
                    <TextInput value={formData.first_name || ''} onChange={handleChange} name="first_name" id="first_name" type="text" placeholder="John" required />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="last_name" value="Your last name" />
                    <TextInput value={formData.last_name || ''} onChange={handleChange} name="last_name" id="last_name" type="text" placeholder="Doe" />
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <div className="mb-1 block">
                    <Label htmlFor="phone_number" value="Best Number" />
                    <MaskedInput
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        value={formData.phone_number || ''}
                        onChange={handleChange}
                        render={(ref, props) => (
                            <TextInput
                                {...props}
                                ref={ref as React.LegacyRef<HTMLInputElement>}
                                name="phone_number"
                                id="phone_number"
                                type="text"
                                placeholder="(---) --- ----"
                                required
                            />
                        )}
                    />
                </div>
                <div className="mb-1 block">
                    <Label htmlFor="email" value="Best email" />
                    <TextInput value={formData.email || ''} onChange={handleChange} name="email" id="email" type="email" placeholder="Doe" />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <Button type="submit" className='px-4 bg-button'>Submit</Button>
            </div>
        </form>
    );
};

export default RequestQuoteForm;