import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogResponse | ErrorResponse>) {
    if (req.method === "GET") {
        const response = await fetch("https://noetics.io/api/clientblog");
        const posts: BlogPost[] = await response.json();
        return res.status(200).json({ posts });
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}