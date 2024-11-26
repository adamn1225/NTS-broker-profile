import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
    try {
        const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data = JSON.parse(jsonData)["equipment-data"];

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const urls = data.map((item: { slug: string }) => {
            return `${baseUrl}/equipment/${item.slug}`;
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url: string) => `<url><loc>${url}</loc></url>`).join('')}
</urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}