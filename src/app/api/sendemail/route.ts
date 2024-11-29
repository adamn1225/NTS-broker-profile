import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { formData, subject } = await req.json();

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'noah@ntslogistics.com', // Recipient email address
            subject: subject, // Use the subject from the request body
            text: JSON.stringify(formData, null, 2), // Use the formatted email content
        };

        // Send email
        await transporter.sendMail(mailOptions);
        const response = NextResponse.json({ message: 'Email sent successfully' });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        const response = NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    }
}