import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

// Format timestamp as "X mins ago"
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return new Date(date).toLocaleDateString();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ward = searchParams.get('ward');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get recent community activity
    let activities;
    
    if (ward) {
      activities = await db.getCommunityActivityByWard(ward, limit);
    } else {
      activities = await db.getRecentCommunityActivity(limit);
    }

    // Enhance with time_ago formatting
    const enhancedActivities = activities.map(activity => ({
      ...activity,
      time_ago: formatTimeAgo(activity.created_at)
    }));

    return NextResponse.json({
      success: true,
      data: enhancedActivities,
      count: enhancedActivities.length
    });
  } catch (error) {
    console.error('GET /api/community/feed error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
