import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { scheme_id, citizen_profile } = body;

    if (!scheme_id) {
      return NextResponse.json(
        { success: false, error: 'scheme_id is required' },
        { status: 400 }
      );
    }

    const scheme = await db.getSchemeById(parseInt(scheme_id));
    
    if (!scheme) {
      return NextResponse.json(
        { success: false, error: 'Scheme not found' },
        { status: 404 }
      );
    }

    // Parse documents_needed
    let requiredDocs = [];
    if (scheme.documents_needed) {
      try {
        requiredDocs = typeof scheme.documents_needed === 'string'
          ? JSON.parse(scheme.documents_needed)
          : scheme.documents_needed;
      } catch {
        requiredDocs = [];
      }
    }

    // If citizen profile is provided, customize document list based on their situation
    if (citizen_profile) {
      const profile = citizen_profile;
      
      // Add conditional documents based on profile
      if (profile.category && ['sc', 'st', 'obc'].includes(profile.category)) {
        if (!requiredDocs.includes('Caste Certificate')) {
          requiredDocs.push('Caste Certificate');
        }
      }
      
      if (profile.income && profile.income < 100000) {
        if (!requiredDocs.includes('Income Certificate')) {
          requiredDocs.push('Income Certificate');
        }
      }
      
      if (profile.hasLand) {
        if (!requiredDocs.includes('Land Records (Khasra/Khatauni)')) {
          requiredDocs.push('Land Records (Khasra/Khatauni)');
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        scheme_id,
        scheme_name: scheme.name,
        required_documents: requiredDocs
      }
    });
  } catch (error) {
    console.error('POST /api/schemes/documents error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
