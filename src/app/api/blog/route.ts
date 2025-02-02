import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
    title: string;
    featured_image: string;
    content: string;
}

interface BlogResponse {
    posts: BlogPost[];
}

interface ErrorResponse {
    error: string;
}

export async function GET(req: NextRequest) {
    const response = await fetch("https://noetics.io/api/clientblog");
    const posts: BlogPost[] = await response.json();
    return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}