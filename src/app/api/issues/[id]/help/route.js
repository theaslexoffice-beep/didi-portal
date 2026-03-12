import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { citizen_id, message, help_type } = body;

    if (!id || !citizen_id || !message) {
      return NextResponse.json(
        { success: false, error: 'Issue ID, citizen_id, and message are required' },
        { status: 400 }
      );
    }

    // Create help response
    const helpId = await db.createHelpResponse({
      issue_id: parseInt(id),
      citizen_id,
      message,
      help_type: help_type || 'offer',
      status: 'offered'
    });

    // Create community activity entry
    await db.createCommunityActivity({
      citizen_id,
      activity_type: 'help_offered',
      description: `Offered help on issue #${id}`,
      issue_id: parseInt(id)
    });

    // Increment helper's help count
    await db.incrementHelpCount(citizen_id);

    return NextResponse.json({
      success: true,
      data: {
        help_id: helpId,
        issue_id: id,
        citizen_id
      }
    });
  } catch (error) {
    console.error('POST /api/issues/[id]/help error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
