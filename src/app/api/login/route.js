import { NextResponse } from 'next/server';
import { query } from '../../../db';
import bcrypt from 'bcrypt'; // Assuming passwords are hashed

export async function POST(req) {
    const { username, password } = await req.json();

    console.log('Login attempt for username:', username);

    // Check if the user is already authenticated and an admin
    const cookies = req.cookies;
    if (cookies.adminToken === 'true') {
        console.log('Admin already logged in, redirecting to admin page');
        return NextResponse.redirect('/admin/page.tsx');
    }

    try {
        const queryText = 'SELECT * FROM public.users WHERE username = $1';
        console.log('Executing query:', queryText, 'with values:', [username]);
    
        const res = await query(queryText, [username]);
        const user = res.rows[0];
        
        console.log('User found:', user);
        
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid);
        
            if (isPasswordValid) {
                // Password matches
                const response = NextResponse.json({ authenticated: true, isAdmin: user.is_admin }, { status: 200 });
        
                // Set a cookie to indicate admin status if the user is an admin
                if (user.is_admin) {
                    response.cookies.set('adminToken', 'true', { httpOnly: true, path: '/' });
                }
                return response;
            } else {
                return NextResponse.json({ authenticated: false }, { status: 401 });
            }
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during login attempt:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}