import { NextResponse } from 'next/server';
import { getAllComplaints, getPendingComplaints, updateComplaintStatus } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'didi-admin-2026';

function checkAuth(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return false;
  }
  return true;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'pending';

    let complaints;
    if (filter === 'pending') {
      complaints = getPendingComplaints();
    } else {
      complaints = getAllComplaints();
    }

    return NextResponse.json({ success: true, complaints });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status are required' }, { status: 400 });
    }

    if (!['approved', 'rejected', 'resolved', 'pending'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    updateComplaintStatus(id, status, adminNotes);
    return NextResponse.json({ success: true, message: `Complaint ${id} updated to ${status}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
