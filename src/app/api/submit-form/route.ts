// route.ts
import { NextRequest, NextResponse } from 'next/server';
import { insertFormSubmission } from '../../../formSubmissions.js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = ['first_name', 'last_name', 'phone_number', 'email', 'origin', 'destination'];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: 'All fields are required except shipment_date' }, { status: 400 });
      }
    }

    const formSubmission = await insertFormSubmission(body);
    
    // Redirect to the admin page after successful form submission
    const response = NextResponse.redirect('/admin/page');
    response.cookies.set('formSubmission', JSON.stringify(formSubmission), { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}