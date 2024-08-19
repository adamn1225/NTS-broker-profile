import insertUser from '../../../utils/insertUser.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { username, password, isAdmin } = await req.json();

    try {
        await insertUser(username, password, isAdmin);
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}