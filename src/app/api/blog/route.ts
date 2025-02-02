import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabaseClient';

export async function GET() {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('status', 'published');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
