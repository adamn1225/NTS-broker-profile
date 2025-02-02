'use client';
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [posts, setPosts] = useState<{ id: number; title: string; featured_image: string; excerpt: string; slug: string; }[]>([]);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

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
