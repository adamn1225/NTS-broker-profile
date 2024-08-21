import { cookies } from 'next/headers.js';
import { redirect } from 'next/navigation.js';
import AdminPageClient from './AdminPageClient.js';
import '../globals.css';
import AdminLayout from './AdminLayout.js'; // Adjust the import path as necessary

import React from 'react.js';

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