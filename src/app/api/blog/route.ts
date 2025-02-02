import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
    error: string;
}

interface BlogPost {
    // Define the structure of a blog post based on the expected response
    id: number;
    title: string;
    content: string;
    // Add other fields as necessary
}

interface BlogResponse {
    posts: BlogPost[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogResponse | ErrorResponse>) {
    if (req.method === "GET") {
        const response = await fetch("https://noetics.io/api/clientblog");
        const posts: BlogPost[] = await response.json();
        return res.status(200).json({ posts });
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}
