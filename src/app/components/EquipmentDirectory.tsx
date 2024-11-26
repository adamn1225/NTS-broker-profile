"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import RequestQuoteForm from './RequestQuoteForm';
import supabase from '../../../lib/supabaseClient';
import { Equipment } from '../../../lib/schema';
import Link from 'next/link';

interface Dimensions {
    Length: string;
    Width: string;
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
    manufacturer: string;
    model: string;
    slug: string;
}

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

interface Props { }

const EquipmentDirectory: React.FC<Props> = () => {
    const [data, setData] = useState<Excavator[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<Excavator | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showSideNav, setShowSideNav] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        e_year: '',
        e_make: '',
        e_model: '',
        length: '',
        width: '',
        height: '',
        machine_weight: '',
        origin_zip: '',
        destination_zip: '',
        date: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/directory');
                const result = await response.json();
                setData(result["equipment-data"]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleManufacturerClick = (manufacturer: string) => {
        setSelectedManufacturer(manufacturer);
        setSelectedModel(null); // Reset selected model when manufacturer changes
    };

    const handleModelClick = (model: Excavator) => {
        setSelectedModel(model);
        setShowForm(false); // Hide the form when a new model is selected
        setShowSideNav(false); // Hide the side navigation when a model is selected
    };

    const handleRequestQuote = () => {
        if (selectedModel) {
            setFormData({
                e_year: '',
                e_make: selectedManufacturer,
                e_model: selectedModel.model,
                length: selectedModel.dimensions.Length.replace(/[^\d.]/g, ''),
                width: Array.isArray(selectedModel.dimensions.Width) ? selectedModel.dimensions.Width.join(', ').replace(/[^\d.]/g, '') : selectedModel.dimensions.Width.replace(/[^\d.]/g, ''),
                height: selectedModel.dimensions.Height.replace(/[^\d.]/g, ''),
                machine_weight: selectedModel.Weight.replace(/[^\d.]/g, ''),
                origin_zip: '',
                destination_zip: '',
                date: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                email: ''
            });
            setShowForm(true); // Show the form after populating it
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error submitting quote request');
            }

            console.log('Quote request submitted successfully');
            setShowForm(false); // Hide the form after successful submission
        } catch (error) {
            console.error('Error submitting quote request:', error);
        }
    };

    const filteredData = data.filter(item =>
        item.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-full">
            {showSideNav ? (
                <div className="w-full md:w-1/4 bg-zinc-300 p-4 overflow-y-auto h-full md:block">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search models..."
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                    />
                    <ul>
                        {filteredData.map((item, index) => (
                            <li key={item.slug}>
                                <details open={selectedManufacturer === item.manufacturer}>
                                    <summary
                                        className="cursor-pointer text-xl text-zinc-900"
                                        onClick={() => handleManufacturerClick(item.manufacturer)}
                                    >
                                        {item.manufacturer}
                                    </summary>
                                    <ul className="ml-4 text-zinc-900">
                                        <li
                                            key={`${item.manufacturer}-${item.model}-${index}`}
                                            className={`cursor-pointer text-zinc-900 ${selectedModel?.model === item.model ? 'font-bold' : ''}`}
                                            onClick={() => handleModelClick(item)}
                                        >
                                            <Link href={`/equipment/${item.slug}`}>
                                                {item.model}
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex-grow p-4 overflow-y-auto flex flex-col justify-start items-center md:hidden">
                    <button
                        onClick={() => setShowSideNav(true)}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Back to Search
                    </button>
                    {selectedModel && selectedManufacturer && (
                        <div className='flex flex-col items-center text-center gap-6 mt-6 text-zinc-900'>
                            <h2 className="text-2xl font-bold mb-4 text-zinc-900">{selectedManufacturer} {selectedModel.model}</h2>
                            <p className='text-zinc-900'><strong>Weight:</strong> {selectedModel.Weight}</p>
                            <p className='text-zinc-900'><strong>Dimensions:</strong></p>
                            <ul className="list-disc list-inside">
                                <li className='text-zinc-900'><strong>Length:</strong> {selectedModel.dimensions.Length}</li>
                                <li className='text-zinc-900'><strong>Width:</strong> {Array.isArray(selectedModel.dimensions.Width) ? selectedModel.dimensions.Width.join(', ') : selectedModel.dimensions.Width}</li>
                                <li className='text-zinc-900'><strong>Height:</strong> {selectedModel.dimensions.Height}</li>
                            </ul>
                            <button onClick={handleRequestQuote} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Request Quote</button>
                            <div>
                                {showForm && (
                                    <div className='w-full mt-2'>
                                        <RequestQuoteForm
                                            formData={formData}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="hidden md:flex-grow md:p-4 md:overflow-y-auto md:flex md:flex-col md:justify-start md:items-center">
                <div className='text-center'>
                    <h1 className="text-3xl font-bold mb-4 text-normal pt-4 underline underline-offset-4 text-zinc-900">Equipment Directory</h1>
                    <p className="text-lg text-normal text-zinc-900">Welcome to the equipment directory. Here you can search for equipment by manufacturer and model.</p>
                </div>
                {selectedModel && selectedManufacturer && (
                    <div className='flex flex-col items-center text-center gap-6 mt-6 text-zinc-900'>
                        <h2 className="text-2xl font-bold mb-4 text-zinc-900">{selectedManufacturer} {selectedModel.model}</h2>
                        <p className='text-zinc-900'><strong>Weight:</strong> {selectedModel.Weight}</p>
                        <p className='text-zinc-900'><strong>Dimensions:</strong></p>
                        <ul className="list-disc list-inside">
                            <li className='text-zinc-900'><strong>Length:</strong> {selectedModel.dimensions.Length}</li>
                            <li className='text-zinc-900'><strong>Width:</strong> {Array.isArray(selectedModel.dimensions.Width) ? selectedModel.dimensions.Width.join(', ') : selectedModel.dimensions.Width}</li>
                            <li className='text-zinc-900'><strong>Height:</strong> {selectedModel.dimensions.Height}</li>
                        </ul>
                        <button onClick={handleRequestQuote} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Request Quote</button>
                        <div>
                            {showForm && (
                                <div className='w-full mt-2'>
                                    <RequestQuoteForm
                                        formData={formData}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentDirectory;