import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

// Haversine distance calculation
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { resource_type, ward, location } = body;

    // Validate required fields
    if (!resource_type) {
      return NextResponse.json(
        { success: false, error: 'resource_type is required' },
        { status: 400 }
      );
    }

    // Get all verified citizens
    const citizens = await db.getAllVerifiedCitizens();
    
    const helpers = [];
    
    for (const citizen of citizens) {
      // Filter by ward if specified
      if (ward && citizen.ward !== ward) continue;
      
      // Check if citizen has resources
      if (!citizen.resources) continue;
      
      try {
        const resources = typeof citizen.resources === 'string' 
          ? JSON.parse(citizen.resources) 
          : citizen.resources;
        
        // Match resource type
        const hasResource = resources.some(r => 
          r.toLowerCase().includes(resource_type.toLowerCase())
        );
        
        if (hasResource) {
          const helper = {
            citizen_id: citizen.id,
            name: citizen.name,
            phone: citizen.phone,
            ward: citizen.ward,
            resources: resources.filter(r => 
              r.toLowerCase().includes(resource_type.toLowerCase())
            ),
            trust_score: citizen.trust_score || 0
          };
          
          // Add distance if location provided
          if (location && location.lat && location.lng && citizen.lat && citizen.lng) {
            helper.distance_km = Math.round(
              haversineDistance(location.lat, location.lng, citizen.lat, citizen.lng) * 10
            ) / 10;
          }
          
          helpers.push(helper);
        }
      } catch (e) {
        // Skip citizens with invalid resource data
        continue;
      }
    }
    
    // Sort by distance if available, otherwise by trust score
    helpers.sort((a, b) => {
      if (a.distance_km !== undefined && b.distance_km !== undefined) {
        return a.distance_km - b.distance_km;
      }
      return b.trust_score - a.trust_score;
    });

    return NextResponse.json({
      success: true,
      data: {
        resource_type,
        ward: ward || 'all',
        total_helpers: helpers.length,
        helpers: helpers.slice(0, 20)
      }
    });
  } catch (error) {
    console.error('POST /api/match/resource error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
