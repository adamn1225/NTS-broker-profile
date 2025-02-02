'use client';
import { useEffect, useState } from "react";

interface BlogPost {
    id: number;
    title: string;
    featured_image: string;
    excerpt: string;
    slug: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>Blog</h1>
            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={post.featured_image} alt={post.title} />
                    <p>{post.excerpt}</p>
                    <a href={`/blog/${post.slug}`}>Read more</a>
                </article>
            ))}
        </div>
    );
}