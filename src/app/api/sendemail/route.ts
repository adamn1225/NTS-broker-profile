import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
    id: number;
    title: string;
    featured_image: string;
    excerpt: string;
    slug: string;
}

export async function GET(req: NextRequest) {
    const client_id = process.env.CLIENT_ID; // Set a unique client ID for each site
    const response = await fetch(`https://noetics.io/api/clientblog?client_id=${client_id}`);
    const posts: BlogPost[] = await response.json();
    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}