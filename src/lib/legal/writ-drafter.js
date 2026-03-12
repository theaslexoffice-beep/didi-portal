// Writ Petition Generator
// Generates framework writ petitions under Article 226 of Constitution of India
// Before the Hon'ble High Court of Chhattisgarh at Bilaspur

// Fundamental Rights mapping
const FUNDAMENTAL_RIGHTS_MAPPING = {
  health: {
    article: 'Article 21',
    right: 'Right to Health',
    landmark_case: 'Paschim Banga Khet Mazdoor Samity v. State of West Bengal (1996) 4 SCC 37',
    description: 'The right to health is an integral part of the Right to Life under Article 21 of the Constitution.'
  },
  infrastructure: {
    article: 'Article 21',
    right: 'Right to Safe Passage and Infrastructure',
    landmark_case: 'Municipal Council, Ratlam v. Vardhichand (1980) 4 SCC 162',
    description: 'The right to safe passage on roads and access to basic infrastructure is part of the Right to Life under Article 21.'
  },
  education: {
    article: 'Article 21A',
    right: 'Right to Education',
    landmark_case: 'Unni Krishnan v. State of Andhra Pradesh (1993) 1 SCC 645',
    description: 'The Right to Education is a Fundamental Right under Article 21A of the Constitution.'
  },
  water: {
    article: 'Article 21',
    right: 'Right to Clean Water',
    landmark_case: 'Subhash Kumar v. State of Bihar (1991) 1 SCC 598',
    description: 'The right to access clean and potable water is an integral part of the Right to Life under Article 21.'
  },
  environment: {
    article: 'Article 21',
    right: 'Right to Clean Environment',
    landmark_case: 'MC Mehta v. Union of India (1987) 1 SCC 395',
    description: 'The right to a clean and healthy environment is an integral part of the Right to Life under Article 21.'
  },
  safety: {
    article: 'Article 21',
    right: 'Right to Life and Personal Liberty',
    landmark_case: 'Maneka Gandhi v. Union of India (1978) 1 SCC 248',
    description: 'The Right to Life and Personal Liberty is guaranteed under Article 21 of the Constitution.'
  },
  livelihood: {
    article: 'Article 21',
    right: 'Right to Livelihood',
    landmark_case: 'Olga Tellis v. Bombay Municipal Corporation (1985) 3 SCC 545',
    description: 'The Right to Livelihood is an integral part of the Right to Life under Article 21.'
  },
  legal: {
    article: 'Article 21 & Article 14',
    right: 'Right to Equality and Fair Treatment',
    landmark_case: 'State of West Bengal v. Anwar Ali Sarkar (1952) SCR 284',
    description: 'The Right to Equality before law and fair treatment is guaranteed under Article 14 and Article 21.'
  }
};

// Respondent mapping
const RESPONDENT_MAPPING = {
  infrastructure: [
    'State of Chhattisgarh through the Secretary, Public Works Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'Commissioner, Municipal Corporation, Bilaspur, District Bilaspur, Chhattisgarh - 495001',
    'Executive Engineer, Public Works Department, Bilaspur Division, Bilaspur, Chhattisgarh - 495001'
  ],
  health: [
    'State of Chhattisgarh through the Secretary, Health & Family Welfare Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'Chief Medical and Health Officer, District Hospital, Bilaspur, Chhattisgarh - 495001',
    'Medical Superintendent, District Hospital, Bilaspur, Chhattisgarh - 495001'
  ],
  education: [
    'State of Chhattisgarh through the Secretary, School Education Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'District Education Officer, Bilaspur, Chhattisgarh - 495001',
    'Block Education Officer, Bilaspur, Chhattisgarh - 495001'
  ],
  safety: [
    'State of Chhattisgarh through the Secretary, Home Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'Superintendent of Police, Bilaspur, Chhattisgarh - 495001'
  ],
  electricity: [
    'Chhattisgarh State Power Distribution Company Limited (CSPDCL) through its Managing Director, Danganiya, Raipur, Chhattisgarh - 492013',
    'Superintending Engineer, CSPDCL, Bilaspur Circle, Bilaspur, Chhattisgarh - 495001'
  ],
  water: [
    'State of Chhattisgarh through the Secretary, Public Health Engineering Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'Executive Engineer, Public Health Engineering Department, Bilaspur Division, Bilaspur, Chhattisgarh - 495001'
  ],
  environment: [
    'State of Chhattisgarh through the Secretary, Environment and Forest Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'Member Secretary, Chhattisgarh Environment Conservation Board, Paryavaran Bhawan, Raipur, Chhattisgarh - 492001',
    'District Collector, Collectorate, Bilaspur, Chhattisgarh - 495001'
  ],
  legal: [
    'State of Chhattisgarh through the Chief Secretary, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'District Collector, Collectorate, Bilaspur, Chhattisgarh - 495001'
  ],
  livelihood: [
    'State of Chhattisgarh through the Secretary, Rural Development Department, Mantralaya, Atal Nagar (Naya Raipur), Chhattisgarh - 492002',
    'District Collector, Collectorate, Bilaspur, Chhattisgarh - 495001',
    'Chief Executive Officer, District Rural Development Agency, Bilaspur, Chhattisgarh - 495001'
  ]
};

/**
 * Generate Writ Petition framework
 * @param {Object} issue - Issue object
 * @param {Object} citizen - Citizen object
 * @param {string} fundamentalRight - Optional override for fundamental right
 * @returns {Object} { text, html }
 */
export function generateWritPetition(issue, citizen, fundamentalRight = null) {
  const rightData = fundamentalRight 
    ? FUNDAMENTAL_RIGHTS_MAPPING[fundamentalRight]
    : FUNDAMENTAL_RIGHTS_MAPPING[issue.category] || FUNDAMENTAL_RIGHTS_MAPPING.infrastructure;
  
  const respondents = RESPONDENT_MAPPING[issue.category] || RESPONDENT_MAPPING.infrastructure;
  
  const year = new Date().getFullYear();
  const daysSinceIssue = Math.floor((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24));
  
  const isUrgent = issue.severity === 'P0' || issue.severity === 'P1';
  
  const text = `
IN THE HIGH COURT OF CHHATTISGARH AT BILASPUR

WRIT PETITION (CIVIL) NO. ____________ OF ${year}

[Under Article 226 of the Constitution of India]


IN THE MATTER OF:

${citizen.name}
Resident of ${citizen.address || citizen.ward || 'Bilaspur'},
District Bilaspur, Chhattisgarh
                                                    ... PETITIONER

VERSUS

${respondents.map((r, i) => `${i + 1}. ${r}`).join('\n\n')}
                                                    ... RESPONDENTS


PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA


TO,
THE HON'BLE CHIEF JUSTICE AND HIS LORDSHIP'S COMPANION JUDGES OF THE HIGH COURT OF CHHATTISGARH AT BILASPUR


THE HUMBLE PETITION OF THE PETITIONER ABOVE-NAMED

MOST RESPECTFULLY SHOWETH:


1. PARTIES

1.1 That the Petitioner is a citizen of India, resident of ${citizen.address || citizen.ward || 'Bilaspur'}, District Bilaspur, Chhattisgarh, and is directly affected by the inaction and negligence of the Respondent authorities.

1.2 That the Respondent No. 1 is the State of Chhattisgarh, responsible for ensuring the welfare and protection of its citizens.

${respondents.slice(1).map((r, i) => `1.${i + 3} That the Respondent No. ${i + 2} is directly responsible for addressing and resolving issues related to ${issue.category} in the jurisdiction of Bilaspur, Chhattisgarh.`).join('\n\n')}


2. JURISDICTION

2.1 This Hon'ble Court has territorial and subject matter jurisdiction to entertain this Writ Petition under Article 226 of the Constitution of India.

2.2 The cause of action has arisen within the jurisdiction of this Hon'ble Court, as the disputed acts and omissions have occurred in Bilaspur, Chhattisgarh.

2.3 The Petitioner has no other efficacious remedy available except to approach this Hon'ble Court for the enforcement of fundamental rights.


3. FACTS OF THE CASE

3.1 That the Petitioner, being a law-abiding citizen, had registered a grievance on ${new Date(issue.created_at).toLocaleDateString('en-IN')} through the DIDI PoliTech platform (Citizen Grievance Redressal System) concerning the following issue:

     Issue Category: ${issue.category}
     Issue Title: ${issue.title || 'Civic Infrastructure Issue'}
     Location: ${issue.address || issue.ward || 'Bilaspur, Chhattisgarh'}
     Severity Level: ${issue.severity}
     Issue ID: DIDI-${issue.id}

3.2 DESCRIPTION OF THE ISSUE:
     ${issue.description}

3.3 That despite the registration of the said grievance and the lapse of ${daysSinceIssue} days, the Respondent authorities have failed to take any meaningful action to address and resolve the issue.

3.4 That the Petitioner has made all reasonable efforts to seek redressal through administrative channels, including:
     a) Registration of complaint on the DIDI PoliTech platform
     b) Escalation to concerned local authorities
     c) [Filing of RTI application / Complaint on CPGRAMS portal - if applicable]
     
3.5 That the inaction and negligence of the Respondent authorities have directly violated the Petitioner's fundamental rights guaranteed under the Constitution of India.

3.6 That the Petitioner is constrained to approach this Hon'ble Court as a last resort, having exhausted all alternative remedies.


4. GROUNDS

A. VIOLATION OF FUNDAMENTAL RIGHTS

   That the failure of the Respondent authorities to address the Petitioner's grievance constitutes a direct violation of the Petitioner's fundamental rights enshrined under ${rightData.article} of the Constitution of India.

   ${rightData.description}

   This principle has been well established by the Hon'ble Supreme Court of India in the landmark case of ${rightData.landmark_case}.

B. FAILURE TO PERFORM STATUTORY DUTY

   That the Respondent authorities have a statutory and constitutional obligation to ensure the welfare and safety of citizens. The failure to address the Petitioner's grievance amounts to a clear dereliction of duty.

C. ARBITRARY AND UNREASONABLE INACTION

   That the inaction of ${daysSinceIssue} days is arbitrary, unreasonable, and violates the principles of good governance and natural justice.

D. PUBLIC INTEREST

   That the issue raised by the Petitioner is not merely a private grievance but affects the larger public interest and the fundamental rights of other citizens in the locality.


5. PRAYER

In the light of the facts stated above and the grounds urged, it is most respectfully prayed that this Hon'ble Court may be pleased to:

a) Issue a Writ of Mandamus or any other appropriate writ, order or direction commanding the Respondents to immediately take necessary action to address and resolve the issue raised by the Petitioner;

b) Direct the Respondent authorities to submit a time-bound action plan for the resolution of the said issue;

c) Direct the Respondent authorities to ensure that similar issues do not recur in the future through proper maintenance and monitoring;

${isUrgent ? 'd) Grant interim relief by directing the Respondents to take immediate remedial measures on an urgent basis, given the severity ('+issue.severity+') of the issue;\n\n' : ''}e) Award costs of this petition to the Petitioner;

f) Pass such other and further orders as this Hon'ble Court may deem fit and proper in the facts and circumstances of the case and in the interest of justice.


${isUrgent ? `6. INTERIM RELIEF

That the nature and severity of the issue (Severity Level: ${issue.severity}) warrants immediate intervention by this Hon'ble Court. The Petitioner humbly prays for interim directions to the Respondents to take urgent remedial measures pending the final disposal of this Writ Petition.

` : ''}
AND FOR THIS ACT OF KINDNESS, THE PETITIONER, AS IN DUTY BOUND, SHALL EVER PRAY.


                                                    PETITIONER
                                                    Through Counsel

PLACE: Bilaspur
DATE: ${new Date().toLocaleDateString('en-IN')}



---
DISCLAIMER:
This is an AI-generated draft framework prepared by DIDI PoliTech — a citizen empowerment platform.
This document is for illustrative purposes only and does not constitute legal advice.
It is STRONGLY RECOMMENDED that the Petitioner:
1. Consult a qualified advocate before filing this petition
2. Verify all facts and legal citations
3. Obtain proper legal representation
4. Ensure compliance with all High Court rules and procedures
Filing a writ petition requires legal expertise and court formalities.
---
  `.trim();

  // HTML version (formatted for printing)
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Times New Roman', serif; 
      line-height: 1.8; 
      max-width: 900px; 
      margin: 40px auto; 
      padding: 40px; 
      text-align: justify;
    }
    .header { text-align: center; font-weight: bold; margin-bottom: 30px; }
    .section-title { font-weight: bold; margin-top: 30px; margin-bottom: 10px; text-decoration: underline; }
    .para { margin: 15px 0; text-indent: 40px; }
    .no-indent { text-indent: 0; }
    .prayer { margin-left: 40px; }
    .disclaimer { 
      margin-top: 60px; 
      padding: 20px; 
      background: #fff3cd; 
      border: 2px solid #856404; 
      font-size: 12px; 
      color: #856404;
      text-align: left;
      page-break-before: always;
    }
    .disclaimer strong { color: #721c24; }
    @media print {
      body { margin: 0; padding: 20px; }
      .disclaimer { background: white; }
    }
  </style>
</head>
<body>
  <div class="header">
    IN THE HIGH COURT OF CHHATTISGARH AT BILASPUR<br><br>
    WRIT PETITION (CIVIL) NO. ____________ OF ${year}<br><br>
    [Under Article 226 of the Constitution of India]
  </div>

  <div class="header" style="margin-top: 40px;">IN THE MATTER OF:</div>

  <p class="no-indent" style="margin-left: 100px;">
    <strong>${citizen.name}</strong><br>
    Resident of ${citizen.address || citizen.ward || 'Bilaspur'},<br>
    District Bilaspur, Chhattisgarh<br>
    <span style="float: right; margin-right: 50px;">... PETITIONER</span>
  </p>

  <p class="no-indent" style="text-align: center; margin: 30px 0;"><strong>VERSUS</strong></p>

  <p class="no-indent" style="margin-left: 50px;">
    ${respondents.map((r, i) => `<strong>${i + 1}.</strong> ${r}<br><br>`).join('')}
    <span style="float: right; margin-right: 50px;">... RESPONDENTS</span>
  </p>

  <div class="header" style="margin-top: 50px;">PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA</div>

  <p class="no-indent" style="margin-top: 40px;"><strong>TO,</strong><br>
  THE HON'BLE CHIEF JUSTICE AND HIS LORDSHIP'S COMPANION JUDGES OF THE HIGH COURT OF CHHATTISGARH AT BILASPUR</p>

  <p class="no-indent" style="margin-top: 30px;"><strong>THE HUMBLE PETITION OF THE PETITIONER ABOVE-NAMED</strong></p>

  <p class="no-indent" style="margin-top: 20px;"><strong>MOST RESPECTFULLY SHOWETH:</strong></p>

  <div class="section-title">1. PARTIES</div>

  <p class="para">1.1 That the Petitioner is a citizen of India, resident of ${citizen.address || citizen.ward || 'Bilaspur'}, District Bilaspur, Chhattisgarh, and is directly affected by the inaction and negligence of the Respondent authorities.</p>

  <p class="para">1.2 That the Respondent No. 1 is the State of Chhattisgarh, responsible for ensuring the welfare and protection of its citizens.</p>

  ${respondents.slice(1).map((r, i) => `<p class="para">1.${i + 3} That the Respondent No. ${i + 2} is directly responsible for addressing and resolving issues related to ${issue.category} in the jurisdiction of Bilaspur, Chhattisgarh.</p>`).join('\n')}

  <div class="section-title">2. JURISDICTION</div>

  <p class="para">2.1 This Hon'ble Court has territorial and subject matter jurisdiction to entertain this Writ Petition under Article 226 of the Constitution of India.</p>

  <p class="para">2.2 The cause of action has arisen within the jurisdiction of this Hon'ble Court, as the disputed acts and omissions have occurred in Bilaspur, Chhattisgarh.</p>

  <p class="para">2.3 The Petitioner has no other efficacious remedy available except to approach this Hon'ble Court for the enforcement of fundamental rights.</p>

  <div class="section-title">3. FACTS OF THE CASE</div>

  <p class="para">3.1 That the Petitioner, being a law-abiding citizen, had registered a grievance on ${new Date(issue.created_at).toLocaleDateString('en-IN')} through the DIDI PoliTech platform (Citizen Grievance Redressal System) concerning the following issue:</p>

  <p class="no-indent" style="margin-left: 80px;">
    <strong>Issue Category:</strong> ${issue.category}<br>
    <strong>Issue Title:</strong> ${issue.title || 'Civic Infrastructure Issue'}<br>
    <strong>Location:</strong> ${issue.address || issue.ward || 'Bilaspur, Chhattisgarh'}<br>
    <strong>Severity Level:</strong> ${issue.severity}<br>
    <strong>Issue ID:</strong> DIDI-${issue.id}
  </p>

  <p class="para">3.2 <strong>DESCRIPTION OF THE ISSUE:</strong><br>
  ${issue.description}</p>

  <p class="para">3.3 That despite the registration of the said grievance and the lapse of ${daysSinceIssue} days, the Respondent authorities have failed to take any meaningful action to address and resolve the issue.</p>

  <p class="para">3.4 That the Petitioner has made all reasonable efforts to seek redressal through administrative channels, including:</p>
  <p class="no-indent" style="margin-left: 80px;">
    a) Registration of complaint on the DIDI PoliTech platform<br>
    b) Escalation to concerned local authorities<br>
    c) [Filing of RTI application / Complaint on CPGRAMS portal - if applicable]
  </p>

  <p class="para">3.5 That the inaction and negligence of the Respondent authorities have directly violated the Petitioner's fundamental rights guaranteed under the Constitution of India.</p>

  <p class="para">3.6 That the Petitioner is constrained to approach this Hon'ble Court as a last resort, having exhausted all alternative remedies.</p>

  <div class="section-title">4. GROUNDS</div>

  <p class="para"><strong>A. VIOLATION OF FUNDAMENTAL RIGHTS</strong></p>

  <p class="para">That the failure of the Respondent authorities to address the Petitioner's grievance constitutes a direct violation of the Petitioner's fundamental rights enshrined under <strong>${rightData.article}</strong> of the Constitution of India.</p>

  <p class="para">${rightData.description}</p>

  <p class="para">This principle has been well established by the Hon'ble Supreme Court of India in the landmark case of <em>${rightData.landmark_case}</em>.</p>

  <p class="para"><strong>B. FAILURE TO PERFORM STATUTORY DUTY</strong></p>

  <p class="para">That the Respondent authorities have a statutory and constitutional obligation to ensure the welfare and safety of citizens. The failure to address the Petitioner's grievance amounts to a clear dereliction of duty.</p>

  <p class="para"><strong>C. ARBITRARY AND UNREASONABLE INACTION</strong></p>

  <p class="para">That the inaction of ${daysSinceIssue} days is arbitrary, unreasonable, and violates the principles of good governance and natural justice.</p>

  <p class="para"><strong>D. PUBLIC INTEREST</strong></p>

  <p class="para">That the issue raised by the Petitioner is not merely a private grievance but affects the larger public interest and the fundamental rights of other citizens in the locality.</p>

  <div class="section-title">5. PRAYER</div>

  <p class="para">In the light of the facts stated above and the grounds urged, it is most respectfully prayed that this Hon'ble Court may be pleased to:</p>

  <div class="prayer">
    <p class="no-indent">a) Issue a Writ of Mandamus or any other appropriate writ, order or direction commanding the Respondents to immediately take necessary action to address and resolve the issue raised by the Petitioner;</p>

    <p class="no-indent">b) Direct the Respondent authorities to submit a time-bound action plan for the resolution of the said issue;</p>

    <p class="no-indent">c) Direct the Respondent authorities to ensure that similar issues do not recur in the future through proper maintenance and monitoring;</p>

    ${isUrgent ? `<p class="no-indent">d) Grant interim relief by directing the Respondents to take immediate remedial measures on an urgent basis, given the severity (${issue.severity}) of the issue;</p>` : ''}

    <p class="no-indent">${isUrgent ? 'e' : 'd'}) Award costs of this petition to the Petitioner;</p>

    <p class="no-indent">${isUrgent ? 'f' : 'e'}) Pass such other and further orders as this Hon'ble Court may deem fit and proper in the facts and circumstances of the case and in the interest of justice.</p>
  </div>

  ${isUrgent ? `
  <div class="section-title">6. INTERIM RELIEF</div>

  <p class="para">That the nature and severity of the issue (Severity Level: ${issue.severity}) warrants immediate intervention by this Hon'ble Court. The Petitioner humbly prays for interim directions to the Respondents to take urgent remedial measures pending the final disposal of this Writ Petition.</p>
  ` : ''}

  <p class="no-indent" style="margin-top: 50px; text-align: center;"><strong>AND FOR THIS ACT OF KINDNESS, THE PETITIONER, AS IN DUTY BOUND, SHALL EVER PRAY.</strong></p>

  <p class="no-indent" style="margin-top: 80px; text-align: right; margin-right: 100px;">
    <strong>PETITIONER</strong><br>
    Through Counsel
  </p>

  <p class="no-indent" style="margin-top: 40px;">
    <strong>PLACE:</strong> Bilaspur<br>
    <strong>DATE:</strong> ${new Date().toLocaleDateString('en-IN')}
  </p>

  <div class="disclaimer">
    <strong>⚠️ DISCLAIMER:</strong><br><br>
    This is an <strong>AI-generated draft framework</strong> prepared by DIDI PoliTech — a citizen empowerment platform.<br><br>
    This document is for <strong>illustrative purposes only</strong> and does <strong>NOT constitute legal advice</strong>.<br><br>
    It is <strong>STRONGLY RECOMMENDED</strong> that the Petitioner:<br>
    1. Consult a <strong>qualified advocate</strong> before filing this petition<br>
    2. Verify all facts and legal citations<br>
    3. Obtain proper legal representation<br>
    4. Ensure compliance with all High Court rules and procedures<br><br>
    Filing a writ petition requires legal expertise and court formalities.
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}
