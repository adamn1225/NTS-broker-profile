"use client";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const AdminPageClient = () => {
    const [formSubmissions, setFormSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const username = 'Admin'; // Replace with username logic

    useEffect(() => {
        const fetchFormSubmissions = async () => {
            try {
                const response = await fetch('/api/submit-form', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch form submissions: ${response.statusText}`);
                }
                const data = await response.json();
                setFormSubmissions(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFormSubmissions();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome, {username}</h1>
            <h1>Form Submissions</h1>
            <table className="min-w-full border-collapse border border-gray-800/40">
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