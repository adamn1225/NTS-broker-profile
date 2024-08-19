import { query } from '../../../../config/db.js';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { username, password } = await req.json();

    try {
        const queryText = 'SELECT * FROM public.users WHERE username = $1';
        const values = [username];
        console.log('Executing query:', queryText, 'with values:', values);
        const result = await query(queryText, values);

        if (result.rows.length === 0) {
            console.log('User not found');
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Invalid password');
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Add logic for successful login here, e.g., setting cookies or tokens

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}