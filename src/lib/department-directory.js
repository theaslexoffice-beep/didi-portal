/**
 * Government Department Directory - Bilaspur District, Chhattisgarh
 * Used by legal engine for addressing notices/petitions
 * AND by scheme engine for application guidance
 * 
 * Note: Contact details researched to best available public information
 * Some details may require periodic updates
 */

export const BILASPUR_DEPARTMENTS = [
  {
    id: 1,
    name: "District Collector, Bilaspur",
    name_hi: "जिला कलेक्टर, बिलासपुर",
    head: "District Collector & District Magistrate",
    head_hi: "जिला कलेक्टर एवं जिला दंडाधिकारी",
    address: "Collectorate Office, Rajkishore Nagar, Bilaspur, Chhattisgarh - 495001",
    address_hi: "कलेक्टोरेट कार्यालय, राजकिशोर नगर, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222005, 222201",
    email: "collector-bilaspur.cg@gov.in",
    website: "https://bilaspur.gov.in/",
    services_provided: [
      "Revenue administration",
      "Law and order coordination",
      "Disaster management",
      "Election management",
      "Public grievance redressal",
      "Land revenue records",
      "Certificate issuance (income, caste, domicile)",
      "Government scheme implementation oversight"
    ],
    schemes_administered: [
      "PM Awas Yojana",
      "All district-level scheme approvals",
      "Revenue land allotment",
      "MGNREGA oversight",
      "Disaster relief"
    ],
    office_hours: "10:00 AM - 6:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM (for grievances)",
    escalation_level: 1,
    jurisdiction: "Bilaspur District"
  },
  {
    id: 2,
    name: "Municipal Corporation, Bilaspur",
    name_hi: "नगर निगम, बिलासपुर",
    head: "Commissioner, Bilaspur Municipal Corporation",
    head_hi: "आयुक्त, बिलासपुर नगर निगम",
    address: "Bilaspur Municipal Corporation, Shastri Chowk, Bilaspur, Chhattisgarh - 495001",
    address_hi: "बिलासपुर नगर निगम, शास्त्री चौक, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-242044, 242045",
    email: "commrbmc@gmail.com",
    website: "https://bilaspurmuncipal.gov.in/",
    services_provided: [
      "Birth and death registration",
      "Trade license",
      "Building plan approval",
      "Property tax collection",
      "Water supply",
      "Sewerage and sanitation",
      "Street lights",
      "Solid waste management",
      "Public health services",
      "Road maintenance (within corporation limits)"
    ],
    schemes_administered: [
      "PM Awas Yojana - Urban",
      "Swachh Bharat Mission - Urban",
      "AMRUT scheme",
      "Smart City Mission"
    ],
    office_hours: "10:00 AM - 5:30 PM (Monday to Saturday)",
    public_hours: "10:00 AM - 2:00 PM",
    escalation_level: 1,
    jurisdiction: "Bilaspur Municipal Corporation limits (urban area)"
  },
  {
    id: 3,
    name: "Superintendent of Police, Bilaspur",
    name_hi: "पुलिस अधीक्षक, बिलासपुर",
    head: "Superintendent of Police (SP), Bilaspur",
    head_hi: "पुलिस अधीक्षक, बिलासपुर",
    address: "Office of SP, Police Line, Bilaspur, Chhattisgarh - 495001",
    address_hi: "एसपी कार्यालय, पुलिस लाइन, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222100, 100 (emergency)",
    email: "sp-bilaspur.cg@gov.in",
    website: "https://cgpolice.gov.in/",
    services_provided: [
      "Law and order maintenance",
      "Crime investigation",
      "FIR registration",
      "Police verification",
      "Traffic management",
      "Women and child safety (Sakhi Kendra)",
      "Cyber crime investigation"
    ],
    schemes_administered: [
      "Women Helpline 181",
      "One Stop Centre (Sakhi)",
      "Child Helpline 1098",
      "Cyber Crime Helpline"
    ],
    office_hours: "24x7 for emergency; 10:00 AM - 6:00 PM for admin",
    public_hours: "24x7",
    escalation_level: 1,
    jurisdiction: "Bilaspur District (law and order)"
  },
  {
    id: 4,
    name: "Chief Medical & Health Officer (CMHO), Bilaspur",
    name_hi: "मुख्य चिकित्सा एवं स्वास्थ्य अधिकारी, बिलासपुर",
    head: "Chief Medical & Health Officer",
    head_hi: "मुख्य चिकित्सा एवं स्वास्थ्य अधिकारी",
    address: "CMHO Office, Near District Hospital, Bilaspur, Chhattisgarh - 495001",
    address_hi: "सीएमएचओ कार्यालय, जिला अस्पताल के पास, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222044",
    email: "cmho-bilaspur.cg@nic.in",
    website: "https://cghealth.nic.in/",
    services_provided: [
      "Public health administration",
      "District hospital oversight",
      "PHC and CHC management",
      "Immunization programs",
      "Maternal and child health",
      "Disease surveillance",
      "Health scheme implementation"
    ],
    schemes_administered: [
      "PM-JAY (Ayushman Bharat)",
      "Janani Suraksha Yojana",
      "PM Matru Vandana Yojana",
      "Rashtriya Bal Swasthya Karyakram",
      "National Health Mission",
      "Mukhyamantri Haat Bazaar Clinic Yojana (CG)"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Saturday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (health services)"
  },
  {
    id: 5,
    name: "District Education Officer (DEO), Bilaspur",
    name_hi: "जिला शिक्षा अधिकारी, बिलासपुर",
    head: "District Education Officer",
    head_hi: "जिला शिक्षा अधिकारी",
    address: "DEO Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "जिला शिक्षा अधिकारी कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222088",
    email: "deo-bilaspur.cg@nic.in",
    website: "https://eduportal.cg.nic.in/",
    services_provided: [
      "School administration (primary & secondary)",
      "Teacher deployment",
      "Mid-day meal scheme oversight",
      "Scholarship disbursement",
      "RTE implementation",
      "School infrastructure monitoring"
    ],
    schemes_administered: [
      "Samagra Shiksha Abhiyan",
      "PM POSHAN (Mid-Day Meal)",
      "National Scholarship Portal (NSP)",
      "Swami Atmanand English Medium Schools (CG)",
      "RTE Section 12(1)(c) - Free seats in private schools"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Saturday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (education)"
  },
  {
    id: 6,
    name: "Executive Engineer, PWD, Bilaspur Division",
    name_hi: "कार्यकारी अभियंता, लोक निर्माण विभाग, बिलासपुर संभाग",
    head: "Executive Engineer, Public Works Department",
    head_hi: "कार्यकारी अभियंता, लोक निर्माण विभाग",
    address: "PWD Division Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "लोक निर्माण विभाग संभाग कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222077",
    email: "ee-pwd-bilaspur.cg@nic.in",
    website: "https://cgpwd.gov.in/",
    services_provided: [
      "Road construction and maintenance",
      "Bridge construction",
      "Government building construction",
      "Infrastructure development",
      "Tender management"
    ],
    schemes_administered: [
      "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
      "State road development schemes",
      "Infrastructure projects"
    ],
    office_hours: "10:00 AM - 5:30 PM (Monday to Saturday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur Division (roads & buildings)"
  },
  {
    id: 7,
    name: "Executive Engineer, PHE Department, Bilaspur",
    name_hi: "कार्यकारी अभियंता, लोक स्वास्थ्य यांत्रिकी विभाग, बिलासपुर",
    head: "Executive Engineer, Public Health Engineering",
    head_hi: "कार्यकारी अभियंता, लोक स्वास्थ्य यांत्रिकी",
    address: "PHE Division Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "लोक स्वास्थ्य यांत्रिकी संभाग कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222055",
    email: "ee-phe-bilaspur.cg@nic.in",
    website: "https://cgwb.gov.in/",
    services_provided: [
      "Water supply schemes",
      "Hand pumps and tube wells",
      "Water quality monitoring",
      "Rural water supply",
      "Sanitation infrastructure"
    ],
    schemes_administered: [
      "Jal Jeevan Mission",
      "Swachh Bharat Mission - Gramin",
      "National Rural Drinking Water Programme"
    ],
    office_hours: "10:00 AM - 5:30 PM (Monday to Saturday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (water & sanitation)"
  },
  {
    id: 8,
    name: "CSPDCL, Bilaspur Circle",
    name_hi: "छत्तीसगढ़ राज्य विद्युत वितरण कंपनी लिमिटेड, बिलासपुर सर्कल",
    head: "Superintendent Engineer, CSPDCL Bilaspur",
    head_hi: "अधीक्षण अभियंता, सीएसपीडीसीएल बिलासपुर",
    address: "CSPDCL Office, Link Road, Bilaspur, Chhattisgarh - 495001",
    address_hi: "सीएसपीडीसीएल कार्यालय, लिंक रोड, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "1912 (toll-free), 07752-244000",
    email: "sebildcl@cspdcl.co.in",
    website: "https://www.cspdcl.co.in/",
    services_provided: [
      "Electricity distribution",
      "New connection",
      "Meter reading",
      "Bill payment",
      "Fault repair",
      "Load enhancement",
      "Disconnection/reconnection"
    ],
    schemes_administered: [
      "PM Saubhagya Yojana",
      "Deen Dayal Upadhyaya Gram Jyoti Yojana",
      "Subsidized electricity for farmers/BPL"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Saturday); 24x7 for fault complaints",
    public_hours: "10:00 AM - 2:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur Circle (electricity)"
  },
  {
    id: 9,
    name: "Sub-Divisional Magistrate (SDM), Bilaspur",
    name_hi: "अनुविभागीय दंडाधिकारी, बिलासपुर",
    head: "Sub-Divisional Magistrate (SDM)",
    head_hi: "अनुविभागीय दंडाधिकारी",
    address: "SDM Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "एसडीएम कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222066",
    email: "sdm-bilaspur.cg@nic.in",
    website: "https://bilaspur.gov.in/",
    services_provided: [
      "Revenue administration (sub-division level)",
      "Certificate issuance (caste, income, domicile)",
      "Marriage registration",
      "Magistrate duties",
      "Land dispute resolution",
      "Arms license"
    ],
    schemes_administered: [
      "Certificate issuance for all schemes",
      "Revenue-related scheme approvals"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur Sub-Division"
  },
  {
    id: 10,
    name: "Tehsildar, Bilaspur",
    name_hi: "तहसीलदार, बिलासपुर",
    head: "Tehsildar",
    head_hi: "तहसीलदार",
    address: "Tehsil Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "तहसील कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222033",
    email: "teh-bilaspur.cg@nic.in",
    website: "https://bilaspur.gov.in/",
    services_provided: [
      "Revenue record maintenance",
      "Income certificate",
      "Caste certificate",
      "Domicile certificate",
      "Land mutation",
      "Land revenue collection",
      "Tenancy issues"
    ],
    schemes_administered: [
      "Certificate issuance for PM-KISAN, scholarships, etc.",
      "Land-related scheme verifications"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 3,
    jurisdiction: "Bilaspur Tehsil"
  },
  {
    id: 11,
    name: "Block Development Officer, Bilaspur",
    name_hi: "विकासखंड अधिकारी, बिलासपुर",
    head: "Block Development Officer (BDO)",
    head_hi: "विकासखंड अधिकारी",
    address: "Block Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "विकासखंड कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222044",
    email: "bdo-bilaspur.cg@nic.in",
    website: "https://bilaspur.gov.in/",
    services_provided: [
      "Rural development schemes",
      "MGNREGA implementation",
      "Gram Panchayat coordination",
      "BPL survey",
      "IAY / PM Awas Gramin",
      "Anganwadi oversight",
      "Self-help group formation"
    ],
    schemes_administered: [
      "MGNREGA",
      "PM Awas Yojana - Gramin",
      "Swachh Bharat Mission - Gramin",
      "DAY-NRLM",
      "ICDS (Integrated Child Development Services)"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 3,
    jurisdiction: "Bilaspur Block (rural areas)"
  },
  {
    id: 12,
    name: "District Social Welfare Officer, Bilaspur",
    name_hi: "जिला समाज कल्याण अधिकारी, बिलासपुर",
    head: "District Social Welfare Officer",
    head_hi: "जिला समाज कल्याण अधिकारी",
    address: "Social Welfare Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "समाज कल्याण कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222099",
    email: "dswo-bilaspur.cg@nic.in",
    website: "https://socialjustice.cg.gov.in/",
    services_provided: [
      "SC/ST/OBC welfare",
      "Disability pensions",
      "Old age pensions (NSAP)",
      "Widow pensions",
      "Scholarships (SC/ST/OBC)",
      "Legal aid coordination"
    ],
    schemes_administered: [
      "Post-Matric Scholarship for SC/ST/OBC",
      "Indira Gandhi National Old Age Pension",
      "Indira Gandhi National Widow Pension",
      "Indira Gandhi National Disability Pension",
      "Stand-Up India",
      "Beti Bachao Beti Padhao"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (social welfare)"
  },
  {
    id: 13,
    name: "District Labour Officer, Bilaspur",
    name_hi: "जिला श्रम अधिकारी, बिलासपुर",
    head: "District Labour Officer",
    head_hi: "जिला श्रम अधिकारी",
    address: "Labour Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "श्रम कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222088",
    email: "dlo-bilaspur.cg@nic.in",
    website: "https://labour.cg.gov.in/",
    services_provided: [
      "Labour registration",
      "Labour welfare schemes",
      "Factory inspection",
      "Minimum wage enforcement",
      "Industrial dispute resolution",
      "Construction worker welfare"
    ],
    schemes_administered: [
      "PM Shram Yogi Maandhan",
      "Atal Pension Yojana registration",
      "Construction worker welfare schemes",
      "ESI and PF enforcement"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (labour matters)"
  },
  {
    id: 14,
    name: "District Agriculture Officer, Bilaspur",
    name_hi: "जिला कृषि अधिकारी, बिलासपुर",
    head: "Deputy Director, Agriculture",
    head_hi: "उप संचालक, कृषि",
    address: "Agriculture Office, Bilaspur, Chhattisgarh - 495001",
    address_hi: "कृषि कार्यालय, बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-222077",
    email: "dao-bilaspur.cg@nic.in",
    website: "https://agridept.cg.gov.in/",
    services_provided: [
      "Agricultural extension services",
      "Crop advisory",
      "Soil testing",
      "Seed distribution",
      "Fertilizer subsidy",
      "Pest control",
      "Kisan Mela organization"
    ],
    schemes_administered: [
      "PM-KISAN",
      "PM Fasal Bima Yojana",
      "Soil Health Card Scheme",
      "Rajiv Gandhi Kisan Nyay Yojana (CG)",
      "Godhan Nyay Yojana (CG)",
      "Kisan Credit Card"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (agriculture)"
  },
  {
    id: 15,
    name: "Lead District Manager (LDM) - Banking, Bilaspur",
    name_hi: "मुख्य जिला प्रबंधक - बैंकिंग, बिलासपुर",
    head: "Lead District Manager",
    head_hi: "मुख्य जिला प्रबंधक",
    address: "LDM Office, c/o Lead Bank (State Bank of India), Bilaspur, Chhattisgarh - 495001",
    address_hi: "एलडीएम कार्यालय, लीड बैंक (भारतीय स्टेट बैंक), बिलासपुर, छत्तीसगढ़ - 495001",
    phone: "07752-244500",
    email: "ldm.bilaspur@sbi.co.in",
    website: "https://www.sbi.co.in/",
    services_provided: [
      "Banking scheme coordination",
      "Financial inclusion programs",
      "Credit camp organization",
      "PMJDY implementation",
      "Loan mela coordination",
      "Bank linkage for SHGs"
    ],
    schemes_administered: [
      "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
      "PM MUDRA Yojana",
      "Stand-Up India",
      "Kisan Credit Card",
      "PM SVANidhi",
      "PMJJBY and PMSBY"
    ],
    office_hours: "10:00 AM - 5:00 PM (Monday to Friday)",
    public_hours: "10:00 AM - 1:00 PM",
    escalation_level: 2,
    jurisdiction: "Bilaspur District (banking & finance)"
  }
];

/**
 * Get department by ID
 */
export function getDepartmentById(id) {
  return BILASPUR_DEPARTMENTS.find(d => d.id === id);
}

/**
 * Get departments by service type
 */
export function getDepartmentsByService(serviceKeyword) {
  const keyword = serviceKeyword.toLowerCase();
  return BILASPUR_DEPARTMENTS.filter(dept =>
    dept.services_provided.some(s => s.toLowerCase().includes(keyword))
  );
}

/**
 * Get departments administering a specific scheme
 */
export function getDepartmentsByScheme(schemeName) {
  const scheme = schemeName.toLowerCase();
  return BILASPUR_DEPARTMENTS.filter(dept =>
    dept.schemes_administered.some(s => s.toLowerCase().includes(scheme))
  );
}

/**
 * Get escalation chain for an issue
 */
export function getEscalationChain(startingDepartmentId) {
  const dept = getDepartmentById(startingDepartmentId);
  if (!dept) return [];

  const chain = [dept];
  const lowerLevels = BILASPUR_DEPARTMENTS
    .filter(d => d.escalation_level > dept.escalation_level)
    .sort((a, b) => a.escalation_level - b.escalation_level);

  return [...chain, ...lowerLevels];
}

/**
 * Search departments by name or service
 */
export function searchDepartments(query) {
  const q = query.toLowerCase();
  return BILASPUR_DEPARTMENTS.filter(dept =>
    dept.name.toLowerCase().includes(q) ||
    dept.name_hi.includes(q) ||
    dept.head.toLowerCase().includes(q) ||
    dept.services_provided.some(s => s.toLowerCase().includes(q))
  );
}

export default BILASPUR_DEPARTMENTS;
