import { query } from '../../../config/db.js';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import envConfig from '../../../../config.js'; // Adjusted path to the new configuration file

export async function POST(req) {
    const { username, password } = await req.json();
    const cookies = req.cookies;

    if (cookies.adminToken === 'true') {
        console.log('Admin already logged in, redirecting to admin page');
        return NextResponse.json({ authenticated: true, isAdmin: true });
    }

    try {
        // Special case for xp_12
        if (username === 'xp_12') {
            const xp12Password = envConfig.XP_12_PASSWORD;
            const isMatch = await bcrypt.compare(password, xp12Password);

            if (isMatch) {
                console.log('Password match for xp_12');
                const response = NextResponse.json({ authenticated: true, isAdmin: true });
                response.cookies.set('adminToken', 'true', { httpOnly: true });
                response.cookies.set('username', 'xp_12', { httpOnly: true });
                return response;
            } else {
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
        }

        // Add logic for other users if needed

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ authenticated: false, error: 'Internal server error' }, { status: 500 });
    }
}