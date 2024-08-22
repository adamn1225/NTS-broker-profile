import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import envConfig from '../../../../config'; // Adjusted path to the new configuration file

export async function POST(req) {
    const { username, password } = await req.json();
    const cookies = req.cookies;

    console.log('Received login:', { username, password });

    if (cookies.adminToken === 'true') {
        console.log('Admin already logged in, redirecting to admin page');
        return NextResponse.json({ authenticated: true, isAdmin: true });
    }

    try {
        // Handle login for Noah
        if (username === 'noah') {
            const noahPassword = envConfig.NOAH_PASSWORD;
            const isMatch = await bcrypt.compare(password, noahPassword);

            if (isMatch) {
                console.log('Password match for noah');
                const response = NextResponse.json({ authenticated: true, isAdmin: true });
                response.cookies.set('adminToken', 'true', { httpOnly: true });
                response.cookies.set('username', 'noah', { httpOnly: true });
                return response;
            } else {
                console.log('Password mismatch for noah');
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
        }

        // Add logic for other users if needed
        console.log('User not handled:', username);
        return NextResponse.json({ authenticated: false }, { status: 401 });

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ authenticated: false, error: 'Internal server error' }, { status: 500 });
    }
}