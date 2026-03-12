import { NextResponse } from 'next/server';
import { BILASPUR_DEPARTMENTS } from '@/lib/department-directory';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const service = searchParams.get('service');

    let departments = [...BILASPUR_DEPARTMENTS];

    // Filter by search query
    if (search) {
      const query = search.toLowerCase();
      departments = departments.filter(dept =>
        dept.name.toLowerCase().includes(query) ||
        dept.name_hi.includes(query) ||
        dept.head.toLowerCase().includes(query) ||
        dept.services_provided.some(s => s.toLowerCase().includes(query))
      );
    }

    // Filter by service
    if (service) {
      const serviceQuery = service.toLowerCase();
      departments = departments.filter(dept =>
        dept.services_provided.some(s => s.toLowerCase().includes(serviceQuery))
      );
    }

    return NextResponse.json({
      success: true,
      data: departments,
      count: departments.length
    });
  } catch (error) {
    console.error('GET /api/departments error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
