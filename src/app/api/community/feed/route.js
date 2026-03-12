import { NextResponse } from 'next/server';
import { getCommunityFeed } from '@/lib/community';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const feed = getCommunityFeed(ward, limit);
    
    return NextResponse.json({
      success: true,
      count: feed.length,
      feed
    });
  } catch (error) {
    console.error('Error fetching community feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community feed' },
      { status: 500 }
    );
  }
}
