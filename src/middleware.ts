import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Set cache control headers for static assets
    if (request.nextUrl.pathname.startsWith('/_next/static/') || request.nextUrl.pathname.startsWith('/static/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    return response;
}

export const config = {
    matcher: ['/static/:path*', '/_next/static/:path*'],
};