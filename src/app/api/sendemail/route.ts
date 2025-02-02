import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
    id: number;
    title: string;
    featured_image: string;
    excerpt: string;
    slug: string;
}

export async function GET(req: NextRequest) {
    const client_id = process.env.CLIENT_ID; // Ensure CLIENT_ID is set in your environment
    if (!client_id) {
        return NextResponse.json({ error: "Client ID not set" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://noetics.io/api/clientblog?client_id=${client_id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }
        const posts: BlogPost[] = await response.json();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}