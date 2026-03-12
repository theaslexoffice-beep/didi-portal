import { NextResponse } from 'next/server';

// Rate limiting store (in-memory, for simple use)
const rateLimitMap = new Map();

// Rate limit config
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute

// Simple rate limiter
export function rateLimit(identifier) {
  const now = Date.now();
  const requestLog = rateLimitMap.get(identifier) || [];
  
  // Filter requests within the time window
  const recentRequests = requestLog.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  // Check if limit exceeded
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    rateLimitMap.clear();
  }
  
  return true;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }
  
  // Admin auth check (placeholder - implement proper auth later)
  if (pathname.startsWith('/admin')) {
    // TODO: Implement proper admin authentication
    // For now, just allow through
    // In production, check for valid session/token
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
};
