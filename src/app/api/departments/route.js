import { NextResponse } from 'next/server';
import {
  BILASPUR_DEPARTMENTS,
  getDepartmentById,
  getDepartmentsByService,
  getDepartmentsByScheme,
  getEscalationChain,
  searchDepartments
} from '@/lib/department-directory';

/**
 * GET /api/departments
 * 
 * Query parameters:
 * - search: search keyword
 * - service: service keyword (e.g., "birth certificate")
 * - scheme: scheme name (e.g., "PM-KISAN")
 * - id: department ID
 * - escalation_from: department ID (returns escalation chain)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const searchQuery = searchParams.get('search');
    const serviceQuery = searchParams.get('service');
    const schemeQuery = searchParams.get('scheme');
    const idQuery = searchParams.get('id');
    const escalationFrom = searchParams.get('escalation_from');

    let departments = [];

    // Single department by ID
    if (idQuery) {
      const dept = getDepartmentById(parseInt(idQuery));
      if (!dept) {
        return NextResponse.json(
          { success: false, error: 'Department not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, department: dept });
    }

    // Escalation chain
    if (escalationFrom) {
      const chain = getEscalationChain(parseInt(escalationFrom));
      return NextResponse.json({
        success: true,
        escalation_chain: chain,
        count: chain.length
      });
    }

    // Search by service
    if (serviceQuery) {
      departments = getDepartmentsByService(serviceQuery);
    }
    // Search by scheme
    else if (schemeQuery) {
      departments = getDepartmentsByScheme(schemeQuery);
    }
    // Search by keyword
    else if (searchQuery) {
      departments = searchDepartments(searchQuery);
    }
    // Return all
    else {
      departments = BILASPUR_DEPARTMENTS;
    }

    return NextResponse.json({
      success: true,
      departments,
      count: departments.length,
      district: 'Bilaspur',
      state: 'Chhattisgarh'
    });

  } catch (error) {
    console.error('Get departments error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}
