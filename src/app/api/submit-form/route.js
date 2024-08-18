import { query } from '../../../db';

export async function GET() {
    try {
        const res = await query('SELECT * FROM users');
        return new Response(JSON.stringify(res.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to fetch form data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}