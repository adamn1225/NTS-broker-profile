import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../db';
import bcrypt from 'bcrypt'; // Assuming passwords are hashed

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    try {
        const res = await query('SELECT * FROM users WHERE username = $1', [username]);
        const user = res.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            // Password matches
            return NextResponse.json({ authenticated: true }, { status: 200 });
        } else {
            // Invalid credentials
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (err) {
        console.error('Error during authentication:', err); // Log the error for debugging
        return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
    }
}