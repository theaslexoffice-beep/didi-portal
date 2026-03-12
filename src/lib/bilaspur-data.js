// Hyperlocal Bilaspur Data
// Geographic data for Bilaspur city, Chhattisgarh
// City center: 22.0797°N, 82.1391°E

// ============ HOSPITALS & HEALTHCARE ============

export const BILASPUR_HOSPITALS = [
  {
    id: 1,
    name: 'CIMS Bilaspur (Chhattisgarh Institute of Medical Sciences)',
    name_hi: 'छत्तीसगढ़ चिकित्सा विज्ञान संस्थान',
    lat: 22.1292,
    lng: 82.1472,
    type: 'government',
    emergency: true,
    phone: '07752-284200',
    address: 'CIMS Campus, Kota Road, Bilaspur',
    departments: ['Emergency', 'Trauma Center', 'ICU', 'Surgery', 'Cardiology']
  },
  {
    id: 2,
    name: 'Apollo BSR Hospital',
    name_hi: 'अपोलो बीएसआर अस्पताल',
    lat: 22.0853,
    lng: 82.1502,
    type: 'private',
    emergency: true,
    phone: '07752-664455',
    address: 'Link Road, Bilaspur',
    departments: ['Emergency', '24x7 Pharmacy', 'Diagnostics']
  },
  {
    id: 3,
    name: 'Government District Hospital Bilaspur',
    name_hi: 'जिला अस्पताल बिलासपुर',
    lat: 22.0780,
    lng: 82.1410,
    type: 'government',
    emergency: true,
    phone: '07752-222222',
    address: 'Civil Lines, Bilaspur',
    departments: ['Emergency', 'General Medicine', 'Surgery', 'Pediatrics']
  },
  {
    id: 4,
    name: 'Ramkrishna Care Hospital',
    name_hi: 'रामकृष्णा केयर अस्पताल',
    lat: 22.0702,
    lng: 82.1623,
    type: 'private',
    emergency: true,
    phone: '07752-423232',
    address: 'Seepat Road, Bilaspur',
    departments: ['Emergency', 'ICU', 'Cardiology', 'Neurology']
  },
  {
    id: 5,
    name: 'Sai Hospital',
    name_hi: 'साई अस्पताल',
    lat: 22.0834,
    lng: 82.1389,
    type: 'private',
    emergency: true,
    phone: '07752-413131',
    address: 'Rajkishore Nagar, Bilaspur'
  }
];

// ============ POLICE STATIONS ============

export const BILASPUR_POLICE_STATIONS = [
  {
    id: 1,
    name: 'Kotwali Police Station',
    name_hi: 'कोतवाली थाना',
    lat: 22.0792,
    lng: 82.1398,
    phone: '07752-223344',
    address: 'Near Railway Station, Bilaspur',
    jurisdiction: ['Ward 1-10', 'Railway Area', 'City Center']
  },
  {
    id: 2,
    name: 'Civil Lines Police Station',
    name_hi: 'सिविल लाइन्स थाना',
    lat: 22.0765,
    lng: 82.1425,
    phone: '07752-227788',
    address: 'Civil Lines, Bilaspur',
    jurisdiction: ['Civil Lines', 'Court Area', 'Collectorate']
  },
  {
    id: 3,
    name: 'Torwa Police Station',
    name_hi: 'तोरवा थाना',
    lat: 22.1056,
    lng: 82.1123,
    phone: '07752-265566',
    address: 'Torwa, Bilaspur',
    jurisdiction: ['Torwa', 'Masanganj', 'Ratanpur Road']
  },
  {
    id: 4,
    name: 'Uslapur Police Station',
    name_hi: 'उसलापुर थाना',
    lat: 22.0512,
    lng: 82.1789,
    phone: '07752-242424',
    address: 'Uslapur, Bilaspur',
    jurisdiction: ['Uslapur', 'Seepat', 'Sakri']
  },
  {
    id: 5,
    name: 'Dayaldas Police Station (Women)',
    name_hi: 'दयालदास महिला थाना',
    lat: 22.0823,
    lng: 82.1467,
    phone: '07752-249999',
    address: 'Dayaldas Nagar, Bilaspur',
    type: 'women_only',
    jurisdiction: ['All women complaints']
  }
];

// ============ FIRE STATIONS ============

export const BILASPUR_FIRE_STATIONS = [
  {
    id: 1,
    name: 'Fire Brigade Station Bilaspur',
    name_hi: 'अग्निशमन केंद्र बिलासपुर',
    lat: 22.0801,
    lng: 82.1456,
    phone: '101',
    emergency_phone: '07752-228877',
    address: 'Near Circuit House, Bilaspur',
    vehicles: 3,
    coverage_radius: 10
  },
  {
    id: 2,
    name: 'Fire Station Torwa',
    name_hi: 'अग्निशमन केंद्र तोरवा',
    lat: 22.1089,
    lng: 82.1098,
    phone: '101',
    address: 'Torwa, Bilaspur',
    vehicles: 1,
    coverage_radius: 8
  }
];

// ============ GOVERNMENT OFFICES ============

export const BILASPUR_GOVT_OFFICES = [
  {
    id: 1,
    name: 'Collectorate Bilaspur',
    name_hi: 'कलेक्ट्रेट बिलासपुर',
    lat: 22.0774,
    lng: 82.1432,
    phone: '07752-223300',
    address: 'Civil Lines, Bilaspur',
    type: 'district_hq',
    departments: ['Revenue', 'Land Records', 'Disaster Management']
  },
  {
    id: 2,
    name: 'Bilaspur Municipal Corporation',
    name_hi: 'बिलासपुर नगर निगम',
    lat: 22.0812,
    lng: 82.1421,
    phone: '07752-223388',
    address: 'Vyapar Vihar, Bilaspur',
    type: 'municipal',
    departments: ['Sanitation', 'Water Supply', 'Roads', 'Building Permission']
  },
  {
    id: 3,
    name: 'Court Complex Bilaspur',
    name_hi: 'न्यायालय परिसर बिलासपुर',
    lat: 22.0756,
    lng: 82.1448,
    phone: '07752-223366',
    address: 'Civil Lines, Bilaspur',
    type: 'judiciary',
    courts: ['District Court', 'Civil Court', 'Sessions Court']
  },
  {
    id: 4,
    name: 'High Court of Chhattisgarh (Bilaspur Bench)',
    name_hi: 'छत्तीसगढ़ उच्च न्यायालय (बिलासपुर पीठ)',
    lat: 22.0743,
    lng: 82.1465,
    phone: '07752-223344',
    address: 'Civil Lines, Bilaspur',
    type: 'high_court'
  },
  {
    id: 5,
    name: 'DISCOM Office (Electricity Board)',
    name_hi: 'विद्युत वितरण कंपनी',
    lat: 22.0889,
    lng: 82.1512,
    phone: '07752-242400',
    address: 'Nehru Nagar, Bilaspur',
    type: 'utility'
  }
];

// ============ EDUCATIONAL INSTITUTIONS ============

export const BILASPUR_COLLEGES = [
  {
    id: 1,
    name: 'Government Law College Bilaspur (GLC)',
    name_hi: 'शासकीय विधि महाविद्यालय',
    lat: 22.0712,
    lng: 82.1478,
    phone: '07752-245678',
    address: 'Near Collectorate, Bilaspur',
    type: 'law'
  },
  {
    id: 2,
    name: 'Government Engineering College Bilaspur',
    name_hi: 'शासकीय इंजीनियरिंग महाविद्यालय',
    lat: 22.1234,
    lng: 82.1567,
    phone: '07752-267890',
    address: 'Seepat Road, Bilaspur',
    type: 'engineering'
  },
  {
    id: 3,
    name: 'Guru Ghasidas University',
    name_hi: 'गुरु घासीदास विश्वविद्यालय',
    lat: 22.0456,
    lng: 82.1823,
    phone: '07752-260209',
    address: 'Koni, Bilaspur',
    type: 'university'
  }
];

// ============ WARD DATA ============

export const BILASPUR_WARDS = [
  // Zone 1 — City Center
  { wardNumber: 1, name: 'Railway Colony', name_hi: 'रेलवे कॉलोनी', area: 'Central', landmarks: ['Railway Station', 'Platform 1-6'], approxLat: 22.0795, approxLng: 82.1372 },
  { wardNumber: 2, name: 'Vidhansabha Road', name_hi: 'विधानसभा रोड', area: 'Central', landmarks: ['Vidhan Sabha Office'], approxLat: 22.0823, approxLng: 82.1412 },
  { wardNumber: 3, name: 'Sarkanda', name_hi: 'सरकंडा', area: 'Central', landmarks: ['Sarkanda Market'], approxLat: 22.0867, approxLng: 82.1456 },
  { wardNumber: 4, name: 'Gol Bazaar', name_hi: 'गोल बाजार', area: 'Central', landmarks: ['Main Market', 'Bus Stand'], approxLat: 22.0778, approxLng: 82.1389 },
  { wardNumber: 5, name: 'Link Road', name_hi: 'लिंक रोड', area: 'Central', landmarks: ['Apollo Hospital', 'Link Road Market'], approxLat: 22.0845, approxLng: 82.1502 },
  
  // Zone 2 — Civil Lines
  { wardNumber: 6, name: 'Civil Lines', name_hi: 'सिविल लाइन्स', area: 'Administrative', landmarks: ['Collectorate', 'District Court'], approxLat: 22.0765, approxLng: 82.1432 },
  { wardNumber: 7, name: 'Circuit House', name_hi: 'सर्किट हाउस', area: 'Administrative', landmarks: ['Circuit House', 'VIP Guest House'], approxLat: 22.0734, approxLng: 82.1467 },
  
  // Zone 3 — Vyapar Vihar & Commercial
  { wardNumber: 8, name: 'Vyapar Vihar', name_hi: 'व्यापार विहार', area: 'Commercial', landmarks: ['Municipal Corporation', 'Commercial Area'], approxLat: 22.0812, approxLng: 82.1421 },
  { wardNumber: 9, name: 'Nehru Nagar', name_hi: 'नेहरू नगर', area: 'Residential', landmarks: ['Nehru Stadium', 'DISCOM Office'], approxLat: 22.0889, approxLng: 82.1512 },
  { wardNumber: 10, name: 'Dayaldas Nagar', name_hi: 'दयालदास नगर', area: 'Residential', landmarks: ['Dayaldas Police Station'], approxLat: 22.0823, approxLng: 82.1467 },
  
  // Zone 4 — Seepat & Eastern Areas
  { wardNumber: 11, name: 'Seepat', name_hi: 'सीपत', area: 'Eastern', landmarks: ['Seepat Road', 'Engineering College'], approxLat: 22.0712, approxLng: 82.1634 },
  { wardNumber: 12, name: 'Uslapur', name_hi: 'उसलापुर', area: 'Eastern', landmarks: ['Uslapur Market', 'Police Station'], approxLat: 22.0512, approxLng: 82.1789 },
  { wardNumber: 13, name: 'Sakri', name_hi: 'साकरी', area: 'Eastern', landmarks: ['Sakri Village'], approxLat: 22.0623, approxLng: 82.1867 },
  
  // Zone 5 — Western & Northern Areas
  { wardNumber: 14, name: 'Torwa', name_hi: 'तोरवा', area: 'Western', landmarks: ['Torwa Police Station', 'Fire Station'], approxLat: 22.1056, approxLng: 82.1123 },
  { wardNumber: 15, name: 'Masanganj', name_hi: 'मसानगंज', area: 'Western', landmarks: ['Masanganj Market'], approxLat: 22.0978, approxLng: 82.1234 },
  { wardNumber: 16, name: 'Rajkishore Nagar', name_hi: 'राजकिशोर नगर', area: 'Western', landmarks: ['Sai Hospital'], approxLat: 22.0834, approxLng: 82.1389 },
  
  // Zone 6 — Southern Areas
  { wardNumber: 17, name: 'Koni', name_hi: 'कोनी', area: 'Southern', landmarks: ['Guru Ghasidas University'], approxLat: 22.0456, approxLng: 82.1823 },
  { wardNumber: 18, name: 'Sirgitti', name_hi: 'सिरगिट्टी', area: 'Southern', landmarks: ['Sirgitti Market'], approxLat: 22.0589, approxLng: 82.1567 },
  
  // Additional Major Wards
  { wardNumber: 19, name: 'Agrasen Chowk', name_hi: 'अग्रसेन चौक', area: 'Central', landmarks: ['Agrasen Chowk', 'Market'], approxLat: 22.0801, approxLng: 82.1445 },
  { wardNumber: 20, name: 'Parsada', name_hi: 'परसाडा', area: 'Eastern', landmarks: ['Parsada Village'], approxLat: 22.0634, approxLng: 82.1712 },
  { wardNumber: 21, name: 'Ratanpur Road', name_hi: 'रतनपुर रोड', area: 'Northern', landmarks: ['Ratanpur Road'], approxLat: 22.1123, approxLng: 82.1278 },
  { wardNumber: 22, name: 'Janjgir Road', name_hi: 'जांजगीर रोड', area: 'Northern', landmarks: ['Janjgir Road'], approxLat: 22.1078, approxLng: 82.1356 },
  { wardNumber: 23, name: 'Kota Road', name_hi: 'कोटा रोड', area: 'Northern', landmarks: ['CIMS Hospital', 'Kota'], approxLat: 22.1292, approxLng: 82.1472 },
  { wardNumber: 24, name: 'Budhwari Bazaar', name_hi: 'बुधवारी बाजार', area: 'Central', landmarks: ['Wednesday Market'], approxLat: 22.0756, approxLng: 82.1401 },
  { wardNumber: 25, name: 'Sadar Bazaar', name_hi: 'सदर बाजार', area: 'Central', landmarks: ['Main Market'], approxLat: 22.0789, approxLng: 82.1423 }
];

// ============ EMERGENCY NUMBERS ============

export const EMERGENCY_CONTACTS = {
  all_emergency: '112',
  police: '100',
  fire: '101',
  ambulance: '108',
  women_helpline: '1091',
  child_helpline: '1098',
  disaster_management: '1070',
  senior_citizen_helpline: '1291',
  electricity_complaint: '1912',
  water_complaint: '1916'
};

// ============ UTILITY FUNCTIONS ============

/**
 * Find nearest hospital
 */
export function findNearestHospital(lat, lng) {
  let nearest = null;
  let minDistance = Infinity;
  
  for (const hospital of BILASPUR_HOSPITALS) {
    const distance = haversineDistance(lat, lng, hospital.lat, hospital.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { ...hospital, distance: Math.round(distance * 10) / 10 };
    }
  }
  
  return nearest;
}

/**
 * Find nearest police station
 */
export function findNearestPoliceStation(lat, lng) {
  let nearest = null;
  let minDistance = Infinity;
  
  for (const station of BILASPUR_POLICE_STATIONS) {
    const distance = haversineDistance(lat, lng, station.lat, station.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { ...station, distance: Math.round(distance * 10) / 10 };
    }
  }
  
  return nearest;
}

/**
 * Get ward by coordinates
 */
export function getWardByLocation(lat, lng) {
  // Simple proximity-based ward detection
  let closestWard = null;
  let minDistance = Infinity;
  
  for (const ward of BILASPUR_WARDS) {
    const distance = haversineDistance(lat, lng, ward.approxLat, ward.approxLng);
    if (distance < minDistance) {
      minDistance = distance;
      closestWard = ward;
    }
  }
  
  return closestWard;
}

// Haversine distance helper
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
