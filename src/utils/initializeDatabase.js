// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFormSubmissions } from '../../../../model/formSubmissions.js';

export async function GET(request: NextRequest) {
    try {
        const formSubmissions = await getFormSubmissions();
        return NextResponse.json(formSubmissions);
    } catch (error) {
        console.error('Error fetching form submissions', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}