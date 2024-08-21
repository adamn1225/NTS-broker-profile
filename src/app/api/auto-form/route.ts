import { NextRequest, NextResponse } from 'next/server.js';
import { getAutoFormSubmissions, insertAutoFormSubmission } from '@model/autoForm.js';

export async function POST(req: NextRequest) {
    try {
        const formSubmission = await req.json();
        const result = await insertAutoFormSubmission(formSubmission);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error inserting form submission:', error);
        return NextResponse.json({ error: 'Failed to insert form submission' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const submissions = await getAutoFormSubmissions();
        return NextResponse.json(submissions, { status: 200 });
    } catch (error) {
        console.error('Error fetching form submissions:', error);
        return NextResponse.json({ error: 'Failed to fetch form submissions' }, { status: 500 });
    }
}