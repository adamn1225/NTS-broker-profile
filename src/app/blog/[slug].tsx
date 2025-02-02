import { GetStaticProps, GetStaticPaths } from 'next';
import supabase from '@lib/supabaseClient';

interface Post {
    title: string;
    featured_image: string;
    content: string;
}

export default function BlogPost({ post }: { post: Post }) {
    if (!post) return <p>Post not found</p>;

    return (
        <article>
            <h1>{post.title}</h1>
            <img src={post.featured_image} alt={post.title} />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await supabase.from('blog_posts').select('slug');
    interface BlogPost {
        slug: string;
    }

    const paths = data?.map((post: BlogPost) => ({ params: { slug: post.slug } })) || [];
    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await supabase.from('blog_posts').select('*').eq('slug', params?.slug).single();
    return { props: { post: data }, revalidate: 60 };
};