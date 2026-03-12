import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { getEscalationStatus, ESCALATION_LADDER } from '@/lib/escalation';

export async function POST(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Issue ID is required' },
        { status: 400 }
      );
    }

    // Get issue
    const issue = await db.getIssueById(parseInt(id));
    
    if (!issue) {
      return NextResponse.json(
        { success: false, error: 'Issue not found' },
        { status: 404 }
      );
    }

    // Check if already resolved
    if (issue.status === 'resolved' || issue.status === 'closed') {
      return NextResponse.json(
        { success: false, error: 'Cannot escalate resolved or closed issues' },
        { status: 400 }
      );
    }

    const currentLevel = issue.escalation_level || 0;
    
    // Check if already at max level
    if (currentLevel >= ESCALATION_LADDER.length - 1) {
      return NextResponse.json(
        { success: false, error: 'Issue is already at maximum escalation level' },
        { status: 400 }
      );
    }

    const nextLevel = currentLevel + 1;
    const nextLevelData = ESCALATION_LADDER[nextLevel];

    // Update issue escalation level
    await db.updateIssueEscalationLevel(parseInt(id), nextLevel);

    // Log escalation
    await db.createEscalationLog({
      issue_id: parseInt(id),
      from_level: currentLevel,
      to_level: nextLevel,
      action: nextLevelData.action,
      reason: 'Manual escalation requested'
    });

    return NextResponse.json({
      success: true,
      data: {
        issue_id: id,
        previous_level: currentLevel,
        new_level: nextLevel,
        action: nextLevelData.action,
        level_name: nextLevelData.name
      }
    });
  } catch (error) {
    console.error('POST /api/issues/[id]/escalate error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
