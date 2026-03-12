import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

const ADMIN_PASSWORD = 'didi-admin-2026';

export async function GET(request) {
  try {
    // Check admin auth
    const authHeader = request.headers.get('authorization');
    const adminPassword = request.headers.get('x-admin-password');
    
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all data
    const complaints = await db.getAllComplaints();
    const issues = await db.getIssues();
    const citizens = await db.getAllVerifiedCitizens();

    // Calculate statistics
    const stats = {
      complaints: {
        total: complaints.length,
        by_category: {},
        by_ward: {},
        by_status: {},
        by_severity: {}
      },
      issues: {
        total: issues.length,
        open: issues.filter(i => i.status === 'open').length,
        in_progress: issues.filter(i => i.status === 'in_progress').length,
        resolved: issues.filter(i => i.status === 'resolved').length,
        by_escalation_level: {}
      },
      citizens: {
        total: citizens.length,
        verified: citizens.filter(c => c.verified).length,
        active_helpers: citizens.filter(c => (c.help_count || 0) > 0).length
      },
      resolution_rate: 0,
      avg_resolution_time: null
    };

    // Complaints by category
    complaints.forEach(c => {
      const cat = c.category || 'other';
      stats.complaints.by_category[cat] = (stats.complaints.by_category[cat] || 0) + 1;
    });

    // Complaints by ward
    complaints.forEach(c => {
      const ward = c.ward || 'unknown';
      stats.complaints.by_ward[ward] = (stats.complaints.by_ward[ward] || 0) + 1;
    });

    // Complaints by status
    complaints.forEach(c => {
      const status = c.status || 'pending';
      stats.complaints.by_status[status] = (stats.complaints.by_status[status] || 0) + 1;
    });

    // Complaints by severity
    complaints.forEach(c => {
      const sev = c.severity || 'P3';
      stats.complaints.by_severity[sev] = (stats.complaints.by_severity[sev] || 0) + 1;
    });

    // Issues by escalation level
    issues.forEach(i => {
      const level = i.escalation_level || 0;
      stats.issues.by_escalation_level[level] = (stats.issues.by_escalation_level[level] || 0) + 1;
    });

    // Resolution rate
    if (issues.length > 0) {
      stats.resolution_rate = Math.round((stats.issues.resolved / issues.length) * 100);
    }

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('GET /api/admin error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
