import { NextResponse } from 'next/server';
import { 
  BILASPUR_HOSPITALS, 
  BILASPUR_POLICE_STATIONS,
  findNearestHospital,
  findNearestPoliceStation 
} from '@/lib/bilaspur-data';

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
    const { type, location } = body;

    // Validate required fields
    if (!type || !location) {
      return NextResponse.json(
        { success: false, error: 'type and location (lat, lng) are required' },
        { status: 400 }
      );
    }

    const { lat, lng } = location;
    
    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'location must include lat and lng' },
        { status: 400 }
      );
    }

    let result = {};

    switch (type.toLowerCase()) {
      case 'hospital':
      case 'medical':
      case 'health':
        // Find nearest hospitals
        const hospitals = BILASPUR_HOSPITALS.map(h => ({
          ...h,
          distance_km: Math.round(haversineDistance(lat, lng, h.lat, h.lng) * 10) / 10
        })).sort((a, b) => a.distance_km - b.distance_km);
        
        result = {
          type: 'hospital',
          nearest: hospitals[0],
          all_nearby: hospitals.slice(0, 5),
          emergency_number: '108'
        };
        break;

      case 'police':
      case 'safety':
        // Find nearest police stations
        const stations = BILASPUR_POLICE_STATIONS.map(s => ({
          ...s,
          distance_km: Math.round(haversineDistance(lat, lng, s.lat, s.lng) * 10) / 10
        })).sort((a, b) => a.distance_km - b.distance_km);
        
        result = {
          type: 'police',
          nearest: stations[0],
          all_nearby: stations.slice(0, 3),
          emergency_number: '100'
        };
        break;

      case 'fire':
        result = {
          type: 'fire',
          nearest: {
            name: 'Fire Brigade Station Bilaspur',
            phone: '101',
            address: 'Near Circuit House, Bilaspur',
            distance_km: 'Call 101 immediately'
          },
          emergency_number: '101'
        };
        break;

      default:
        // General emergency - return all
        const nearestHospital = findNearestHospital(lat, lng);
        const nearestPolice = findNearestPoliceStation(lat, lng);
        
        result = {
          type: 'general_emergency',
          hospital: nearestHospital,
          police: nearestPolice,
          emergency_numbers: {
            all: '112',
            ambulance: '108',
            police: '100',
            fire: '101'
          }
        };
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('POST /api/match/emergency error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
