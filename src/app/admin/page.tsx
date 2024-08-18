"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    // Add other fields as necessary
}

const AdminPage = () => {
    const [formData, setFormData] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        const checkAdminLogin = (): boolean => {
            // Implement your admin login check logic here
            // For example, check a token in localStorage or a cookie
            return true; // Replace with actual logic
        };

        // Check if the user is logged in as an admin
        const isAdmin = checkAdminLogin();
        if (!isAdmin) {
            router.push('/login'); // Redirect to login page if not an admin
        } else {
            fetchFormData();
        }
    }, [router]);

    const fetchFormData = async () => {
        try {
            const response = await fetch('/api/form-data');
            const data = await response.json();
            if (Array.isArray(data)) {
                setFormData(data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Failed to fetch form data:', error);
        }
    };

    return (
        <div>
            {/* Render your admin page content here */}
            <h1>Admin Page</h1>
            {/* Render form data */}
            {formData.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    );
};

export default AdminPage;