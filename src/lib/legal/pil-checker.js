// PIL (Public Interest Litigation) Aggregator
// Checks if issues qualify for PIL based on pattern and threshold

import { getIssues } from '../data.js';

const PIL_THRESHOLD = 50; // Minimum 50 similar complaints
const PIL_TIMEFRAME_DAYS = 90; // Within 90 days

// Landmark PIL cases by category
const LANDMARK_CASES = {
  health: [
    'Paschim Banga Khet Mazdoor Samity v. State of West Bengal (1996) 4 SCC 37 — Right to Emergency Medical Care',
    'Consumer Education & Research Centre v. Union of India (1995) 3 SCC 42 — Right to Health of Workers',
    'Vincent Panikurlangara v. Union of India (1987) 2 SCC 165 — Drug Standards and Public Health'
  ],
  environment: [
    'MC Mehta v. Union of India (1987) 1 SCC 395 — Taj Trapezium Case, Environmental Protection',
    'Indian Council for Enviro-Legal Action v. Union of India (1996) 3 SCC 212 — Industrial Pollution',
    'Vellore Citizens Welfare Forum v. Union of India (1996) 5 SCC 647 — Polluter Pays Principle'
  ],
  education: [
    'Unni Krishnan v. State of Andhra Pradesh (1993) 1 SCC 645 — Right to Education',
    'Mohini Jain v. State of Karnataka (1992) 3 SCC 666 — Capitation Fees in Education',
    'Society for Unaided Private Schools v. Union of India (2012) 6 SCC 1 — RTE Implementation'
  ],
  infrastructure: [
    'Municipal Council, Ratlam v. Vardhichand (1980) 4 SCC 162 — Municipal Obligations for Sanitation',
    'Ramana Dayaram Shetty v. International Airport Authority (1979) 3 SCC 489 — Public Infrastructure',
    'Bandhua Mukti Morcha v. Union of India (1984) 3 SCC 161 — Infrastructure for Workers'
  ],
  water: [
    'Subhash Kumar v. State of Bihar (1991) 1 SCC 598 — Right to Pollution-Free Water',
    'AP Pollution Control Board v. Prof MV Nayudu (1999) 2 SCC 718 — Groundwater Pollution',
    'Narmada Bachao Andolan v. Union of India (2000) 10 SCC 664 — Displacement and Water Rights'
  ],
  food: [
    'PUCL v. Union of India & Others (2001) — Right to Food, Mid-Day Meal Scheme',
    'Kishen Pattnayak v. State of Orissa (1989) — PDS and Food Security',
    'Swaraj Abhiyan v. Union of India (2016) 7 SCC 498 — Food Security and ICDS'
  ],
  safety: [
    'Vishaka v. State of Rajasthan (1997) 6 SCC 241 — Sexual Harassment at Workplace',
    'DK Basu v. State of West Bengal (1997) 1 SCC 416 — Custodial Violence',
    'Nilabati Behera v. State of Orissa (1993) 2 SCC 746 — Custodial Death Compensation'
  ],
  livelihood: [
    'Olga Tellis v. Bombay Municipal Corporation (1985) 3 SCC 545 — Right to Livelihood',
    'People\'s Union for Democratic Rights v. Union of India (1982) 3 SCC 235 — Bonded Labour',
    'Bandhua Mukti Morcha v. Union of India (1984) 3 SCC 161 — Exploitation of Workers'
  ]
};

// Relevant Constitutional Articles
const RELEVANT_ARTICLES = {
  health: ['Article 21 (Right to Life & Health)', 'Article 39(e) (Protection of Health)', 'Article 47 (Duty to Improve Public Health)'],
  environment: ['Article 21 (Right to Clean Environment)', 'Article 48A (Protection of Environment)', 'Article 51A(g) (Duty to Protect Environment)'],
  education: ['Article 21A (Right to Education)', 'Article 45 (Free & Compulsory Education)', 'Article 46 (Educational & Economic Interests)'],
  infrastructure: ['Article 21 (Right to Life)', 'Article 39(b) (Material Resources for Common Good)', 'Article 47 (Standard of Living)'],
  water: ['Article 21 (Right to Water)', 'Article 47 (Standard of Living)', 'Article 39(b) (Equitable Distribution of Resources)'],
  food: ['Article 21 (Right to Food)', 'Article 39(a) (Adequate Livelihood)', 'Article 47 (Nutrition & Standard of Living)'],
  safety: ['Article 21 (Right to Life & Liberty)', 'Article 14 (Equality Before Law)', 'Article 22 (Protection Against Arrest)'],
  livelihood: ['Article 21 (Right to Livelihood)', 'Article 39(a) (Right to Livelihood)', 'Article 41 (Right to Work)']
};

/**
 * Check PIL eligibility
 * @param {string} category - Issue category
 * @param {string} ward - Ward/area
 * @param {string} city - City (default: Bilaspur)
 * @returns {Promise<Object>} PIL eligibility data
 */
export async function checkPILEligibility(category, ward, city = 'Bilaspur') {
  // Get issues from database
  const allIssues = await getIssues({ category, ward, status: 'open', limit: 500 });
  
  // Filter issues within the timeframe
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - PIL_TIMEFRAME_DAYS);
  
  const recentIssues = allIssues.filter(issue => {
    const issueDate = new Date(issue.created_at);
    return issueDate >= cutoffDate;
  });
  
  const issueCount = recentIssues.length;
  const eligible = issueCount >= PIL_THRESHOLD;
  
  // Count unique citizens affected
  const uniqueCitizens = new Set(recentIssues.map(i => i.citizen_id).filter(Boolean));
  const affectedCitizens = uniqueCitizens.size;
  
  // Generate common description pattern (AI-summarizable in production)
  const commonDescription = generateCommonPattern(recentIssues);
  
  // Generate PIL title
  const suggestedPILTitle = generatePILTitle(category, ward, city, issueCount);
  
  // Get relevant articles and landmark cases
  const relevantArticles = RELEVANT_ARTICLES[category] || RELEVANT_ARTICLES.infrastructure;
  const landmarkCases = LANDMARK_CASES[category] || LANDMARK_CASES.infrastructure;
  
  return {
    eligible,
    issueCount,
    affectedCitizens,
    threshold: PIL_THRESHOLD,
    timeframeDays: PIL_TIMEFRAME_DAYS,
    commonDescription,
    suggestedPILTitle,
    relevantArticles,
    landmarkCases,
    category,
    ward,
    city
  };
}

/**
 * Generate common pattern from issues
 */
function generateCommonPattern(issues) {
  if (issues.length === 0) {
    return 'No issues found matching the criteria.';
  }
  
  // Group by severity
  const severityCounts = {};
  issues.forEach(issue => {
    severityCounts[issue.severity] = (severityCounts[issue.severity] || 0) + 1;
  });
  
  // Find most common keywords in descriptions
  const wordFreq = {};
  issues.forEach(issue => {
    const words = issue.description.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 4) { // Skip short words
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
  });
  
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  const pattern = `
Pattern Analysis of ${issues.length} similar issues:
- Severity Distribution: ${Object.entries(severityCounts).map(([s, c]) => `${s}: ${c}`).join(', ')}
- Common Keywords: ${topWords.join(', ')}
- Time Span: ${PIL_TIMEFRAME_DAYS} days
- Geographic Concentration: ${issues[0].ward || 'Multiple wards'}

These issues collectively indicate a systemic failure in service delivery and governance, affecting the fundamental rights and quality of life of citizens in the area.
  `.trim();
  
  return pattern;
}

/**
 * Generate PIL title
 */
function generatePILTitle(category, ward, city, count) {
  const categoryLabels = {
    health: 'Healthcare Services',
    infrastructure: 'Infrastructure and Public Amenities',
    education: 'Educational Facilities',
    water: 'Water Supply and Sanitation',
    environment: 'Environmental Degradation',
    safety: 'Public Safety and Security',
    electricity: 'Electricity Supply',
    livelihood: 'Livelihood and Employment',
    legal: 'Legal and Administrative Grievances'
  };
  
  const label = categoryLabels[category] || 'Civic Amenities';
  const location = ward ? `${ward}, ${city}` : city;
  
  return `Public Interest Litigation Concerning Systemic Failure in ${label} Affecting ${count}+ Citizens in ${location}`;
}

/**
 * Generate PIL framework (similar to writ petition but for PIL)
 * @param {Object} pilData - PIL eligibility data
 * @param {Object} petitioner - Lead petitioner (citizen)
 * @returns {Object} { text, html }
 */
export function generatePILFramework(pilData, petitioner) {
  const year = new Date().getFullYear();
  const today = new Date().toLocaleDateString('en-IN');
  
  const text = `
IN THE HIGH COURT OF CHHATTISGARH AT BILASPUR

PUBLIC INTEREST LITIGATION (PIL) NO. ____________ OF ${year}

[Under Article 226 of the Constitution of India]


IN THE MATTER OF:

${pilData.suggestedPILTitle}


AND

IN THE MATTER OF:

${petitioner.name}
(Lead Petitioner on behalf of ${pilData.affectedCitizens} affected citizens)
Resident of ${petitioner.address || petitioner.ward || 'Bilaspur'},
District Bilaspur, Chhattisgarh
                                                    ... PETITIONER

VERSUS

1. State of Chhattisgarh through the Chief Secretary,
   Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002

2. [Relevant Department Secretary based on category]

3. [Local Authority - District Collector / Municipal Corporation]
                                                    ... RESPONDENTS


PUBLIC INTEREST LITIGATION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA


TO,
THE HON'BLE CHIEF JUSTICE AND HIS LORDSHIP'S COMPANION JUDGES OF THE HIGH COURT OF CHHATTISGARH AT BILASPUR


THE HUMBLE PETITION OF THE PETITIONER ABOVE-NAMED

MOST RESPECTFULLY SHOWETH:


1. PUBLIC INTEREST DIMENSION

1.1 That this Public Interest Litigation is being filed in the larger public interest, concerning the fundamental rights and welfare of ${pilData.affectedCitizens}+ citizens affected by systemic failures in ${pilData.category} services in ${pilData.ward || pilData.city}, Chhattisgarh.

1.2 That the Petitioner, ${petitioner.name}, is filing this PIL not merely in personal capacity but as a concerned citizen representing the collective grievance of the affected community.

1.3 That between ${new Date(Date.now() - pilData.timeframeDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')} and ${today}, a total of ${pilData.issueCount} similar complaints have been registered through the DIDI PoliTech platform (Citizen Grievance Redressal System), indicating a clear pattern of systemic failure.


2. PATTERN OF GRIEVANCES

${pilData.commonDescription}


3. FUNDAMENTAL RIGHTS VIOLATED

The following Constitutional provisions are being systematically violated:

${pilData.relevantArticles.map(art => `- ${art}`).join('\n')}


4. LEGAL PRECEDENTS

The Hon'ble Supreme Court of India has repeatedly held that Public Interest Litigation is a powerful tool for enforcing fundamental rights and ensuring governmental accountability. The following landmark cases are directly relevant:

${pilData.landmarkCases.map((c, i) => `${i + 1}. ${c}`).join('\n\n')}


5. PRAYER

In view of the systemic nature of the violations and the large number of citizens affected, it is most respectfully prayed that this Hon'ble Court may be pleased to:

a) Take cognizance of this Public Interest Litigation and issue appropriate directions to the Respondents;

b) Direct the Respondent authorities to immediately address all ${pilData.issueCount} pending grievances within a time-bound manner;

c) Appoint an independent committee to inspect and report on the systemic failures in ${pilData.category} services in ${pilData.ward || pilData.city};

d) Direct the Respondents to formulate and implement a comprehensive action plan to prevent recurrence of such issues;

e) Direct the Respondents to establish a transparent monitoring mechanism for public grievances;

f) Award exemplary costs to be utilized for community welfare in the affected area;

g) Pass such other and further orders as this Hon'ble Court may deem fit in the interest of justice and public welfare.


AND FOR THIS ACT OF KINDNESS, THE PETITIONER, AS IN DUTY BOUND, SHALL EVER PRAY.


                                                    PETITIONER
                                                    Through Counsel

PLACE: Bilaspur
DATE: ${today}


---
Generated via DIDI PoliTech — Citizen Empowerment Platform
This is a FRAMEWORK document. Consult a qualified PIL advocate before filing.
---
  `.trim();

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Times New Roman', serif; line-height: 1.8; max-width: 900px; margin: 40px auto; padding: 40px; }
    .header { text-align: center; font-weight: bold; margin-bottom: 30px; }
    .section-title { font-weight: bold; margin-top: 30px; text-decoration: underline; }
    .para { margin: 15px 0; text-indent: 40px; }
    .no-indent { text-indent: 0; }
  </style>
</head>
<body>
  <div class="header">
    IN THE HIGH COURT OF CHHATTISGARH AT BILASPUR<br><br>
    PUBLIC INTEREST LITIGATION (PIL) NO. ____________ OF ${year}<br><br>
    [Under Article 226 of the Constitution of India]
  </div>
  
  <div class="header" style="margin-top: 40px;">IN THE MATTER OF:</div>
  <p class="no-indent" style="text-align: center;"><strong>${pilData.suggestedPILTitle}</strong></p>
  
  <div class="header" style="margin-top: 30px;">AND<br><br>IN THE MATTER OF:</div>
  
  <p class="no-indent" style="margin-left: 100px;">
    <strong>${petitioner.name}</strong><br>
    (Lead Petitioner on behalf of ${pilData.affectedCitizens} affected citizens)<br>
    Resident of ${petitioner.address || petitioner.ward || 'Bilaspur'},<br>
    District Bilaspur, Chhattisgarh<br>
    <span style="float: right; margin-right: 50px;">... PETITIONER</span>
  </p>
  
  <p class="no-indent" style="text-align: center; margin: 30px 0;"><strong>VERSUS</strong></p>
  
  <p class="no-indent" style="margin-left: 50px;">
    <strong>1.</strong> State of Chhattisgarh through the Chief Secretary,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002<br><br>
    <strong>2.</strong> [Relevant Department Secretary based on category]<br><br>
    <strong>3.</strong> [Local Authority - District Collector / Municipal Corporation]<br>
    <span style="float: right; margin-right: 50px;">... RESPONDENTS</span>
  </p>
  
  <div class="section-title" style="text-align: center; margin-top: 50px;">PUBLIC INTEREST LITIGATION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA</div>
  
  <p class="no-indent" style="margin-top: 40px;"><strong>TO,</strong><br>
  THE HON'BLE CHIEF JUSTICE AND HIS LORDSHIP'S COMPANION JUDGES OF THE HIGH COURT OF CHHATTISGARH AT BILASPUR</p>
  
  <p class="no-indent" style="margin-top: 30px;"><strong>THE HUMBLE PETITION OF THE PETITIONER ABOVE-NAMED</strong></p>
  
  <p class="no-indent"><strong>MOST RESPECTFULLY SHOWETH:</strong></p>
  
  <div class="section-title">1. PUBLIC INTEREST DIMENSION</div>
  
  <p class="para">1.1 That this Public Interest Litigation is being filed in the larger public interest, concerning the fundamental rights and welfare of <strong>${pilData.affectedCitizens}+ citizens</strong> affected by systemic failures in ${pilData.category} services in ${pilData.ward || pilData.city}, Chhattisgarh.</p>
  
  <p class="para">1.2 That the Petitioner, <strong>${petitioner.name}</strong>, is filing this PIL not merely in personal capacity but as a concerned citizen representing the collective grievance of the affected community.</p>
  
  <p class="para">1.3 That between ${new Date(Date.now() - pilData.timeframeDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')} and ${today}, a total of <strong>${pilData.issueCount} similar complaints</strong> have been registered through the DIDI PoliTech platform (Citizen Grievance Redressal System), indicating a clear pattern of systemic failure.</p>
  
  <div class="section-title">2. PATTERN OF GRIEVANCES</div>
  
  <p class="para">${pilData.commonDescription.replace(/\n/g, '<br>')}</p>
  
  <div class="section-title">3. FUNDAMENTAL RIGHTS VIOLATED</div>
  
  <p class="para">The following Constitutional provisions are being systematically violated:</p>
  <ul>
    ${pilData.relevantArticles.map(art => `<li>${art}</li>`).join('')}
  </ul>
  
  <div class="section-title">4. LEGAL PRECEDENTS</div>
  
  <p class="para">The Hon'ble Supreme Court of India has repeatedly held that Public Interest Litigation is a powerful tool for enforcing fundamental rights and ensuring governmental accountability. The following landmark cases are directly relevant:</p>
  
  <ol>
    ${pilData.landmarkCases.map(c => `<li style="margin: 10px 0;">${c}</li>`).join('')}
  </ol>
  
  <div class="section-title">5. PRAYER</div>
  
  <p class="para">In view of the systemic nature of the violations and the large number of citizens affected, it is most respectfully prayed that this Hon'ble Court may be pleased to:</p>
  
  <div style="margin-left: 40px;">
    <p class="no-indent">a) Take cognizance of this Public Interest Litigation and issue appropriate directions to the Respondents;</p>
    <p class="no-indent">b) Direct the Respondent authorities to immediately address all ${pilData.issueCount} pending grievances within a time-bound manner;</p>
    <p class="no-indent">c) Appoint an independent committee to inspect and report on the systemic failures in ${pilData.category} services in ${pilData.ward || pilData.city};</p>
    <p class="no-indent">d) Direct the Respondents to formulate and implement a comprehensive action plan to prevent recurrence of such issues;</p>
    <p class="no-indent">e) Direct the Respondents to establish a transparent monitoring mechanism for public grievances;</p>
    <p class="no-indent">f) Award exemplary costs to be utilized for community welfare in the affected area;</p>
    <p class="no-indent">g) Pass such other and further orders as this Hon'ble Court may deem fit in the interest of justice and public welfare.</p>
  </div>
  
  <p class="no-indent" style="margin-top: 50px; text-align: center;"><strong>AND FOR THIS ACT OF KINDNESS, THE PETITIONER, AS IN DUTY BOUND, SHALL EVER PRAY.</strong></p>
  
  <p class="no-indent" style="margin-top: 80px; text-align: right; margin-right: 100px;">
    <strong>PETITIONER</strong><br>
    Through Counsel
  </p>
  
  <p class="no-indent" style="margin-top: 40px;">
    <strong>PLACE:</strong> Bilaspur<br>
    <strong>DATE:</strong> ${today}
  </p>
  
  <div style="margin-top: 60px; padding: 20px; background: #fff3cd; border: 2px solid #856404; font-size: 12px;">
    <strong>⚠️ FRAMEWORK DOCUMENT:</strong><br>
    Generated via DIDI PoliTech — Citizen Empowerment Platform.<br>
    This is a FRAMEWORK document. Consult a qualified PIL advocate before filing.
  </div>
</body>
</html>`;

  return { text, html };
}
