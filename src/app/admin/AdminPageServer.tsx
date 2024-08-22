import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminPageClient from './AdminPageClient';
import '../globals.css';
import AdminLayout from './AdminLayout.js'; // Adjust the import path as necessary

import React from 'react';

const AdminPageServer = async () => {
    const adminToken = cookies().get('adminToken');
    const username = cookies().get('username');
    console.log('Admin token:', adminToken); // Add logging to check the token
    console.log('Username:', username); // Add logging to check the username

    if (!adminToken || adminToken.value !== 'true') {
        console.log('No valid admin token found, redirecting to login');
        redirect('/login');
    }

    return (
        <AdminLayout>
            <div className="h-screen">
                <div className="flex flex-col justify-center w-screen h-1/3 items-center">
                    <AdminPageClient username={username?.value || 'Guest'} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPageServer;