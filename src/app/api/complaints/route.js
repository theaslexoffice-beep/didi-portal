import { NextResponse } from 'next/server';
import * as db from '@/lib/data';
import { classifySeverity } from '@/lib/severity';

// Helper to map category to department
function getDepartmentByCategory(category) {
  const departmentMap = {
    health: 'Chief Medical & Health Officer (CMHO), Bilaspur',
    infrastructure: 'Executive Engineer, PWD, Bilaspur Division',
    water: 'Executive Engineer, PHE Department, Bilaspur',
    electricity: 'CSPDCL, Bilaspur Circle',
    sanitation: 'Municipal Corporation, Bilaspur',
    safety: 'Superintendent of Police, Bilaspur',
    education: 'District Education Officer (DEO), Bilaspur',
    legal: 'District Collector, Bilaspur',
    environment: 'Municipal Corporation, Bilaspur',
    other: 'District Collector, Bilaspur'
  };
  
  return departmentMap[category] || departmentMap.other;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, description, ward, location, photo_url, citizen_id } = body;

    // Validate required fields
    if (!description || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'Description and citizen_id are required' },
        { status: 400 }
      );
    }

    // Auto-calculate severity
    const severity = classifySeverity(description);
    
    // Auto-find department
    const department = getDepartmentByCategory(category || 'other');
    
    // Create complaint
    const complaintId = await db.createComplaint({
      citizen_id,
      category: category || 'other',
      description,
      ward: ward || null,
      location: location || null,
      photo_url: photo_url || null,
      severity,
      status: 'pending'
    });
    
    // Create corresponding public issue
    const issueId = await db.createIssue({
      complaint_id: complaintId,
      category: category || 'other',
      description,
      ward: ward || null,
      location: location || null,
      severity,
      status: 'open',
      escalation_level: 0,
      created_by: citizen_id
    });

    return NextResponse.json({
      success: true,
      data: {
        complaint_id: complaintId,
        issue_id: issueId,
        severity,
        department
      }
    });
  } catch (error) {
    console.error('POST /api/complaints error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const ward = searchParams.get('ward');
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');
    const sort = searchParams.get('sort') || 'newest';

    // Get all complaints
    let complaints = await db.getAllComplaints();
    
    // Apply filters
    if (category) {
      complaints = complaints.filter(c => c.category === category);
    }
    if (ward) {
      complaints = complaints.filter(c => c.ward === ward);
    }
    if (status) {
      complaints = complaints.filter(c => c.status === status);
    }
    if (severity) {
      complaints = complaints.filter(c => c.severity === severity);
    }
    
    // Apply sorting
    if (sort === 'urgent') {
      const severityOrder = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
      complaints.sort((a, b) => 
        severityOrder[a.severity || 'P3'] - severityOrder[b.severity || 'P3']
      );
    } else {
      // newest (default)
      complaints.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
    }

    return NextResponse.json({
      success: true,
      data: complaints
    });
  } catch (error) {
    console.error('GET /api/complaints error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
