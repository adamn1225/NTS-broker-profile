"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Equipment } from '../../../lib/schema'; // Import the shared type
import { Search } from 'lucide-react';

interface Dimensions {
    Length: string;
    Width: string | string[];
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
}

interface DimensionSearchProps {
    populateForm: (data: Partial<Equipment>) => void;
}

const DimensionSearch: React.FC<DimensionSearchProps> = ({ populateForm }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Excavator[]>([]);
    const [data, setData] = useState<Excavator[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const manufacturers = [
        "Caterpillar",
        "John Deere",
        "Case",
        "Komatsu",
        "Terex",
        "Ford",
        "Volvo",
        "Hitachi",
        "JCB",
        "Kubota",
        "New Holland",
        "Bobcat",
        "Yanmar",
        "Doosan",
        "Kobelco",
        "Hyundai",
        "Takeuchi",
        "Kawasaki",
        "Liebherr",
        "Sany",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/search');
                console.log('Fetched data:', response.data); // Debugging: Log fetched data
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const filteredData = selectedManufacturer
            ? data.filter(item => item["Manufacturer/Model"].toLowerCase().includes(selectedManufacturer.toLowerCase()))
            : data;

        console.log('Filtered data:', filteredData); // Debugging: Log filtered data

        const fuse = new Fuse(filteredData, {
            keys: ['Manufacturer/Model'],
            threshold: 0.3, // Adjust the threshold for more or less fuzzy matching
        });
        const result = fuse.search(query);
        console.log('Search results:', result); // Debugging: Log search results
        setResults(result.map(r => r.item));
    };

    const handleClearSearch = () => {
        setQuery('');
        setResults([]);
        setSelectedManufacturer('');
        setInputValue('');
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleRequestQuote = (result: Excavator) => {
        const [make, model] = result["Manufacturer/Model"].split(' ');
        populateForm({
            e_make: make,
            e_model: model,
            length: result.dimensions.Length,
            width: Array.isArray(result.dimensions.Width) ? result.dimensions.Width.join(', ') : result.dimensions.Width,
            height: result.dimensions.Height,
            machine_weight: result.Weight,
            e_year: "1" // Set year to "1" if not available
        });
        setIsModalOpen(false); // Close the modal after populating the form
    };

    return (
        <div className="flex flex-col justify-center items-center">
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className='text-center text-zinc-900 font-semibold'>Equipment Dimension Search/Directory</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close">&times;</button>
                        </div>
                        <div className="modal-body mt-4">
                                <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                                    <label>Select Manufacturer
                                    <select
                                        value={selectedManufacturer}
                                        onChange={(e) => setSelectedManufacturer(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">All Manufacturers</option>
                                        {manufacturers.filter(manufacturer =>
                                            manufacturer.toLowerCase().includes(inputValue.toLowerCase())
                                        ).map((manufacturer, index) => (
                                            <option key={index} value={manufacturer}>
                                                {manufacturer}
                                            </option>
                                        ))}
                                        </select>
                                        </label>
    
                                <div>
                                    <label> Search Model
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search Model"
                                            className="mb-4 form-select"
                                            />
                                    </label>
                                </div>
                            </div>
    
                            <div className="flex flex-col md:flex-row gap-4 my-4 justify-center">
                                <button onClick={handleSearch} className="main-btn md:w-2/3">Search</button>
                                <button onClick={handleClearSearch} className="secondary-btn">Clear Form</button>
                            </div>

                            <ul className="flex flex-col justify-center items-center gap-4 w-full">
                                {results.map((result, index) => (
                                    <div key={index} className='flex flex-col gap-4 w-2/3 justify-evenly items-center text-zinc-900 bg-stone-50 border border-zinc-800 p-4 h-auto'>
                                        <div className='grid grid-cols-1 justify-items-start'>
                                            <li className="font-bold cursor-pointer text-zinc-900 border-b border-zinc-500" onClick={() => toggleExpand(index)}>
                                                {result["Manufacturer/Model"]}
                                            </li>
                                        </div>
                                        {expandedIndex === index && (
                                            <div className="flex flex-col gap-1 ">
                                                <li className="border-b border-zinc-400 text-zinc-900">Weight: {result.Weight}</li>
                                                <ul>
                                                    <li className='border-b border-zinc-400 text-zinc-900'>Length: {result.dimensions.Length}</li>
                                                    <li className='border-b border-zinc-400 text-zinc-900'>Width: {Array.isArray(result.dimensions.Width) ? result.dimensions.Width.join(', ') : result.dimensions.Width}</li>
                                                    <li className='border-b border-zinc-400 text-zinc-900'>Height: {result.dimensions.Height}</li>
                                                </ul>
                                                <button onClick={() => handleRequestQuote(result)} className="btn btn-primary">Request Quote</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setIsModalOpen(false)} className="secondary-btn mt-2">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DimensionSearch;