import { NextResponse } from 'next/server';
import { createHelpResponse, getHelpResponsesByIssue, incrementHelpCount } from '@/lib/data';

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { citizen_id, message } = await request.json();
    
    if (!citizen_id) {
      return NextResponse.json({ success: false, error: 'Citizen ID required' }, { status: 400 });
    }
    
    const responseId = await createHelpResponse({
      issue_id: parseInt(id),
      citizen_id: parseInt(citizen_id),
      message
    });
    
    // Increment helper's help count
await incrementHelpCount(parseInt(citizen_id));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Help offer recorded',
      response_id: responseId
    });
  } catch (error) {
    console.error('Help response error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const responses = await getHelpResponsesByIssue(parseInt(id));
    
    return NextResponse.json({ success: true, responses });
  } catch (error) {
    console.error('Get help responses error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
