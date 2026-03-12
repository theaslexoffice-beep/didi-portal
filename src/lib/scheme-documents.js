/**
 * Scheme Document Checklist Generator
 * Generates unified document checklist for multiple schemes
 * Deduplicates, groups by type, and provides where-to-get guidance
 */

/**
 * Document metadata - where and how to obtain each document
 */
const DOCUMENT_GUIDE = {
  'Aadhaar Card': {
    type: 'identity',
    how_to_get: 'Apply at Aadhaar Enrollment Centre or update online',
    where_to_get: 'UIDAI Centre / CSC / Post Office / Online at uidai.gov.in',
    online_url: 'https://uidai.gov.in/',
    typical_time: '15-30 days for new enrollment, instant for e-Aadhaar download',
    cost: 'Free for first enrollment; ₹50 for update',
    validity: 'Lifetime (update recommended every 10 years)'
  },
  'PAN Card': {
    type: 'identity',
    how_to_get: 'Apply online through NSDL/UTIITSL or offline at TIN-FC',
    where_to_get: 'Online at onlineservices.nsdl.com/paam or incometax.gov.in',
    online_url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    typical_time: '15-20 days',
    cost: '₹110 (online), ₹107 (offline)',
    validity: 'Lifetime'
  },
  'Bank Account': {
    type: 'financial',
    how_to_get: 'Open account at any bank branch with KYC documents',
    where_to_get: 'Any bank branch (preferably public sector for schemes) / Jan Dhan Yojana',
    online_url: 'https://pmjdy.gov.in/',
    typical_time: 'Same day',
    cost: 'Free (zero-balance accounts available)',
    validity: 'Permanent'
  },
  'Bank Account (linked to Aadhaar)': {
    type: 'financial',
    how_to_get: 'Link existing account to Aadhaar at bank branch or via SMS/net banking',
    where_to_get: 'Your bank branch or online banking portal',
    online_url: 'https://uidai.gov.in/ecosystem/banking.html',
    typical_time: 'Instant to 24 hours',
    cost: 'Free',
    validity: 'Permanent once linked'
  },
  'Income Certificate': {
    type: 'income',
    how_to_get: 'Apply at Tehsildar office or e-District portal with affidavit',
    where_to_get: 'Tehsildar Office / e-District portal (CG: edistrict.cgstate.gov.in)',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '7-15 days',
    cost: '₹20-50 depending on state',
    validity: '6 months to 1 year (check scheme requirements)'
  },
  'Caste Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Tehsildar office or online via e-District with supporting documents',
    where_to_get: 'Tehsildar Office / SDM Office / e-District portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '15-30 days',
    cost: '₹20-50',
    validity: 'Permanent (for SC/ST); annual renewal for OBC NCL'
  },
  'SC Caste Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Tehsildar/SDM office with family documents and affidavit',
    where_to_get: 'Tehsildar Office / SDM Office / e-District portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '15-30 days',
    cost: '₹20-50',
    validity: 'Permanent'
  },
  'ST Caste Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Tehsildar/SDM office with tribal origin proof',
    where_to_get: 'Tehsildar Office / SDM Office / e-District portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '15-30 days',
    cost: '₹20-50',
    validity: 'Permanent'
  },
  'OBC (Non-Creamy Layer) Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Tehsildar office with income certificate and affidavit',
    where_to_get: 'Tehsildar Office / SDM Office / e-District portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '15-30 days',
    cost: '₹20-50',
    validity: '1 year (must be renewed annually for scholarships)'
  },
  'Domicile Certificate': {
    type: 'address',
    how_to_get: 'Apply at Tehsildar office or e-District with address proof and 3-year residence proof',
    where_to_get: 'Tehsildar Office / e-District portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '7-15 days',
    cost: '₹20-50',
    validity: 'Permanent'
  },
  'BPL Card': {
    type: 'income',
    how_to_get: 'Apply through Gram Panchayat/Block office based on SECC survey',
    where_to_get: 'Gram Panchayat / Block Development Office / Food & Civil Supplies Department',
    online_url: 'https://khadya.cg.nic.in/ or local BPL survey',
    typical_time: '30-60 days (depends on survey)',
    cost: 'Free',
    validity: 'Updated based on periodic surveys'
  },
  'Ration Card': {
    type: 'identity',
    how_to_get: 'Apply at Food & Civil Supplies office or online portal',
    where_to_get: 'Food & Civil Supplies Department / e-District portal',
    online_url: 'https://khadya.cg.nic.in/',
    typical_time: '15-30 days',
    cost: 'Free',
    validity: 'Permanent (subject to periodic verification)'
  },
  'Land Records': {
    type: 'land',
    how_to_get: 'Obtain from Patwari or download from Bhuiyan portal',
    where_to_get: 'Patwari Office / Bhuiyan portal (CG: bhuiyan.cg.nic.in)',
    online_url: 'https://bhuiyan.cg.nic.in/',
    typical_time: 'Instant (online) or 2-3 days (offline)',
    cost: 'Free to ₹50',
    validity: 'Current records valid permanently'
  },
  'Khasra': {
    type: 'land',
    how_to_get: 'Download from Bhuiyan portal or get from Patwari',
    where_to_get: 'Patwari Office / Bhuiyan CG portal',
    online_url: 'https://bhuiyan.cg.nic.in/',
    typical_time: 'Instant (online)',
    cost: 'Free',
    validity: 'Current year Khasra required'
  },
  'Khatauni': {
    type: 'land',
    how_to_get: 'Download from Bhuiyan portal or obtain from Patwari',
    where_to_get: 'Patwari Office / Bhuiyan CG portal',
    online_url: 'https://bhuiyan.cg.nic.in/',
    typical_time: 'Instant (online)',
    cost: 'Free',
    validity: 'Current'
  },
  'Land ownership documents / Khasra-Khatauni': {
    type: 'land',
    how_to_get: 'Download B1/P2 from Bhuiyan portal or get from Patwari',
    where_to_get: 'Patwari Office / Bhuiyan CG portal (bhuiyan.cg.nic.in)',
    online_url: 'https://bhuiyan.cg.nic.in/',
    typical_time: 'Instant (online)',
    cost: 'Free to ₹50',
    validity: 'Current year'
  },
  'Birth Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Municipal Corporation / Gram Panchayat or online (within 21 days of birth)',
    where_to_get: 'Municipal Corporation / Gram Panchayat / Hospital / CRS portal',
    online_url: 'https://crsorgi.gov.in/ or https://edistrict.cgstate.gov.in/',
    typical_time: 'Instant to 7 days',
    cost: 'Free (if registered within 21 days); late fee if delayed',
    validity: 'Permanent'
  },
  'Death Certificate': {
    type: 'identity',
    how_to_get: 'Apply at Municipal Corporation / Gram Panchayat within 21 days of death',
    where_to_get: 'Municipal Corporation / Gram Panchayat / CRS portal',
    online_url: 'https://crsorgi.gov.in/',
    typical_time: 'Instant to 7 days',
    cost: 'Free (if within 21 days)',
    validity: 'Permanent'
  },
  'Disability Certificate': {
    type: 'medical',
    how_to_get: 'Get assessed by medical board (District Hospital / CMO office)',
    where_to_get: 'District Hospital / CMHO Office / Medical Board',
    online_url: 'Contact District Hospital',
    typical_time: '15-30 days',
    cost: 'Free in government hospitals',
    validity: 'Permanent for permanent disability; renewable for temporary'
  },
  'MCP Card': {
    type: 'medical',
    how_to_get: 'Issued by ANM/ASHA worker at first ANC visit',
    where_to_get: 'Primary Health Centre / Sub-Centre / Anganwadi',
    online_url: 'Visit nearest PHC/Sub-Centre',
    typical_time: 'Issued immediately at first ANC',
    cost: 'Free',
    validity: 'For duration of pregnancy + 6 months postpartum'
  },
  'Mother & Child Protection Card': {
    type: 'medical',
    how_to_get: 'Issued by ANM/ASHA during pregnancy registration',
    where_to_get: 'PHC / Sub-Centre / Anganwadi',
    online_url: 'Visit nearest health centre',
    typical_time: 'Immediate',
    cost: 'Free',
    validity: 'Pregnancy period'
  },
  'Passport-size photo': {
    type: 'documents',
    how_to_get: 'Get clicked at any photo studio',
    where_to_get: 'Local photo studio / Jan Seva Kendra',
    online_url: 'N/A',
    typical_time: 'Immediate',
    cost: '₹20-50 for 4-6 photos',
    validity: 'Recent photo (within 6 months) usually required'
  },
  'Mobile number': {
    type: 'contact',
    how_to_get: 'Purchase SIM card with Aadhaar-based KYC',
    where_to_get: 'Any mobile operator store',
    online_url: 'N/A',
    typical_time: 'Immediate to 24 hours',
    cost: '₹100-300 (varies by operator)',
    validity: 'As long as active'
  },
  'Address proof': {
    type: 'address',
    how_to_get: 'Use Aadhaar, ration card, electricity bill, voter ID, or rent agreement',
    where_to_get: 'Use existing documents',
    online_url: 'N/A',
    typical_time: 'Immediate (if document exists)',
    cost: 'Free',
    validity: 'Depends on document type'
  },
  'Educational Certificate': {
    type: 'education',
    how_to_get: 'Obtain from school/college where studied; duplicate if lost',
    where_to_get: 'School / College / Board Office',
    online_url: 'Contact issuing institution',
    typical_time: '7-30 days for duplicate',
    cost: '₹50-500 for duplicate',
    validity: 'Permanent'
  },
  'Marksheet': {
    type: 'education',
    how_to_get: 'Issued by school/college; duplicate from Board if lost',
    where_to_get: 'School / College / Education Board',
    online_url: 'Contact Board (CGBSE: cgbse.nic.in)',
    typical_time: '7-30 days for duplicate',
    cost: '₹50-300 for duplicate',
    validity: 'Permanent'
  },
  'Fee receipt': {
    type: 'education',
    how_to_get: 'Issued by school/college upon fee payment',
    where_to_get: 'School / College accounts office',
    online_url: 'N/A',
    typical_time: 'Immediate upon payment',
    cost: 'Free (part of fee payment)',
    validity: 'Current academic year'
  },
  'Marriage Certificate': {
    type: 'identity',
    how_to_get: 'Register marriage at SDM office or online portal',
    where_to_get: 'SDM Office / Marriage Registration portal',
    online_url: 'https://edistrict.cgstate.gov.in/',
    typical_time: '7-15 days',
    cost: '₹50-100',
    validity: 'Permanent'
  },
  "Husband's death certificate": {
    type: 'identity',
    how_to_get: 'Apply at Municipal Corporation / Gram Panchayat',
    where_to_get: 'Municipal Corporation / Gram Panchayat / CRS portal',
    online_url: 'https://crsorgi.gov.in/',
    typical_time: 'Immediate to 7 days',
    cost: 'Free',
    validity: 'Permanent'
  }
};

/**
 * Generate unified document checklist for multiple schemes
 * @param {Array} schemes - Array of scheme objects
 * @returns {Object} { documents: Array, by_type: Object, summary: Object }
 */
export function getDocumentChecklist(schemes) {
  const documentMap = new Map();

  // Collect all unique documents across schemes
  schemes.forEach(scheme => {
    let docs = scheme.documents_needed;
    
    // Parse if JSON string
    if (typeof docs === 'string') {
      try {
        docs = JSON.parse(docs);
      } catch {
        docs = [];
      }
    }

    if (Array.isArray(docs)) {
      docs.forEach(docName => {
        if (!documentMap.has(docName)) {
          documentMap.set(docName, {
            name: docName,
            schemes_needed_for: [],
            ...getDocumentInfo(docName)
          });
        }
        documentMap.get(docName).schemes_needed_for.push(scheme.name);
      });
    }
  });

  // Convert map to array
  const documents = Array.from(documentMap.values());

  // Group by document type
  const by_type = {
    identity: [],
    financial: [],
    income: [],
    land: [],
    address: [],
    education: [],
    medical: [],
    contact: [],
    documents: [],
    other: []
  };

  documents.forEach(doc => {
    const type = doc.type || 'other';
    if (by_type[type]) {
      by_type[type].push(doc);
    } else {
      by_type.other.push(doc);
    }
  });

  // Generate summary
  const summary = {
    total_documents: documents.length,
    by_type_count: Object.fromEntries(
      Object.entries(by_type).map(([type, docs]) => [type, docs.length])
    ),
    estimated_time: estimateTotalTime(documents),
    estimated_cost: estimateTotalCost(documents),
    online_available: documents.filter(d => d.online_url && d.online_url !== 'N/A').length,
    critical: documents.filter(d => isCriticalDocument(d.name)).length
  };

  return { documents, by_type, summary };
}

/**
 * Get document information from guide
 * @param {string} docName - Document name
 * @returns {Object} Document metadata
 */
function getDocumentInfo(docName) {
  // Exact match
  if (DOCUMENT_GUIDE[docName]) {
    return DOCUMENT_GUIDE[docName];
  }

  // Fuzzy match
  for (const [key, value] of Object.entries(DOCUMENT_GUIDE)) {
    if (docName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(docName.toLowerCase())) {
      return value;
    }
  }

  // Default fallback
  return {
    type: 'other',
    how_to_get: 'Contact relevant issuing authority',
    where_to_get: 'Government office / online portal',
    online_url: 'Check with issuing department',
    typical_time: 'Varies',
    cost: 'Varies',
    validity: 'Check requirements'
  };
}

/**
 * Estimate total time to collect all documents
 * @param {Array} documents - Document list
 * @returns {string} Estimated time range
 */
function estimateTotalTime(documents) {
  let maxDays = 0;
  documents.forEach(doc => {
    const timeStr = doc.typical_time || '';
    const days = parseTimeString(timeStr);
    if (days > maxDays) maxDays = days;
  });

  if (maxDays === 0) return 'Immediate';
  if (maxDays <= 7) return '1 week';
  if (maxDays <= 15) return '2 weeks';
  if (maxDays <= 30) return '1 month';
  return '1-2 months';
}

/**
 * Parse time string to days
 * @param {string} timeStr - Time description
 * @returns {number} Days
 */
function parseTimeString(timeStr) {
  if (!timeStr) return 0;
  if (timeStr.includes('Instant') || timeStr.includes('Immediate')) return 0;
  
  const match = timeStr.match(/(\d+)[-\s]+?(\d+)?\s*(day|week|month)/i);
  if (match) {
    const num = parseInt(match[2] || match[1]);
    const unit = match[3].toLowerCase();
    if (unit.includes('day')) return num;
    if (unit.includes('week')) return num * 7;
    if (unit.includes('month')) return num * 30;
  }
  return 15; // Default
}

/**
 * Estimate total cost
 * @param {Array} documents - Document list
 * @returns {string} Cost range
 */
function estimateTotalCost(documents) {
  let total = 0;
  documents.forEach(doc => {
    const costStr = doc.cost || '';
    const cost = parseCostString(costStr);
    total += cost;
  });

  if (total === 0) return 'Free';
  if (total < 500) return `₹${total} (approximately)`;
  if (total < 1000) return '₹500-1,000';
  return `₹${Math.ceil(total / 100) * 100} (approximately)`;
}

/**
 * Parse cost string to number
 * @param {string} costStr - Cost description
 * @returns {number} Cost in rupees
 */
function parseCostString(costStr) {
  if (!costStr || costStr.toLowerCase().includes('free')) return 0;
  
  const match = costStr.match(/₹\s*(\d+)[-\s]+?(\d+)?/);
  if (match) {
    return parseInt(match[2] || match[1]);
  }
  return 50; // Default nominal cost
}

/**
 * Check if document is critical (Aadhaar, bank, etc.)
 * @param {string} docName - Document name
 * @returns {boolean}
 */
function isCriticalDocument(docName) {
  const critical = ['Aadhaar', 'Bank Account', 'Mobile number', 'Income Certificate', 'Caste Certificate'];
  return critical.some(c => docName.includes(c));
}

/**
 * Get application sequence - suggested order to collect documents
 * @param {Array} documents - Document list
 * @returns {Array} Ordered document list with steps
 */
export function getApplicationSequence(documents) {
  // Priority order
  const order = [
    'Aadhaar Card',
    'Mobile number',
    'Bank Account',
    'Passport-size photo',
    'Address proof',
    'Birth Certificate',
    'Domicile Certificate',
    'Income Certificate',
    'Caste Certificate',
    'Land Records',
    'Educational Certificate',
    'Marksheet',
    'MCP Card',
    'Disability Certificate',
    'Marriage Certificate'
  ];

  const sorted = [];
  const remaining = [];

  // Sort by priority
  order.forEach(priority => {
    const doc = documents.find(d => d.name.includes(priority));
    if (doc) sorted.push({ ...doc, step: sorted.length + 1 });
  });

  // Add remaining documents
  documents.forEach(doc => {
    if (!sorted.find(s => s.name === doc.name)) {
      remaining.push({ ...doc, step: sorted.length + remaining.length + 1 });
    }
  });

  return [...sorted, ...remaining];
}

/**
 * Generate printable/downloadable checklist
 * @param {Array} schemes - Schemes array
 * @returns {Object} Formatted checklist
 */
export function generatePrintableChecklist(schemes) {
  const checklist = getDocumentChecklist(schemes);
  const sequence = getApplicationSequence(checklist.documents);

  return {
    title: `Document Checklist for ${schemes.length} Scheme(s)`,
    schemes: schemes.map(s => s.name),
    sequence,
    summary: checklist.summary,
    instructions: [
      '1. Start with Aadhaar Card - most schemes require it',
      '2. Open a bank account and link it to Aadhaar',
      '3. Collect identity documents (Caste, Income, Domicile)',
      '4. Gather scheme-specific documents (Land records, Education certificates, etc.)',
      '5. Keep photocopies of all documents',
      '6. Self-attest all copies before submission'
    ],
    tips: [
      'Many certificates can be applied online via e-District portal',
      'Aadhaar e-KYC can replace multiple documents in several schemes',
      'Keep scanned copies in DigiLocker for digital submission',
      'Income and OBC NCL certificates have 6-12 month validity - plan renewal',
      'Land records (Khasra/Khatauni) can be downloaded free from Bhuiyan portal'
    ]
  };
}
