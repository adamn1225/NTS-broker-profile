"use client";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

// Define the type for form submission data
interface FormSubmission {
    user_id: string;
    username: string;
    phone_number: string;
    freight: string;
    origin: string;
    destination: string;
    e_year: string;
    e_make: string;
    e_model: string;
    length: string;
    // Add other properties as needed
}

// Define the props for AdminPageClient
interface AdminPageClientProps {
    username: string;
}

const AdminPageClient: React.FC<AdminPageClientProps> = ({ username }) => {
    const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFormSubmissions = async () => {
            try {
                const response = await fetch('/api/submit-form', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch form submissions: ${response.statusText}`);
                }
                const data: FormSubmission[] = await response.json();
                setFormSubmissions(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchFormSubmissions();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className='text-slate-700 text-3xl mb-12'>Welcome, {username}</h1>
            <h1 className='text-slate-700 text-xl mb-2'>Form Submissions</h1>
            <table className="min-w-full border-collapse border border-gray-800/40 text-slate-700">
                <thead>
                    <tr>
                        <th className="border border-gray-800/40 px-4 py-2">User ID</th>
                        <th className="border border-gray-800/40 px-4 py-2">Phone Number</th>
                        <th className="border border-gray-800/40 px-4 py-2">Freight</th>
                        <th className="border border-gray-800/40 px-4 py-2">Origin</th>
                        <th className="border border-gray-800/40 px-4 py-2">Destination</th>
                        <th className="border border-gray-800/40 px-4 py-2">Year</th>
                        <th className="border border-gray-800/40 px-4 py-2">Make</th>
                        <th className="border border-gray-800/40 px-4 py-2">Model</th>
                        <th className="border border-gray-800/40 px-4 py-2">Length</th>
                    </tr>
                </thead>
                <tbody>
                    {formSubmissions.map((submission, index) => (
                        <tr key={index}>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.user_id}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.phone_number}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.freight}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.origin}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.destination}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.e_year}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.e_make}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.e_model}</td>
                            <td className="border border-gray-800/40 px-4 py-2">{submission.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPageClient;