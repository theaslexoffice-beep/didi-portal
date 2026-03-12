// Legal Notice Generator
// For Day 45 escalation - formal legal notice before writ petition

import { ESCALATION_LADDER } from '../escalation.js';

/**
 * Generate legal notice
 * @param {Object} issue - Issue object
 * @param {Object} citizen - Citizen object
 * @param {string} authority - Target authority name (optional)
 * @returns {Object} { text, html }
 */
export function generateLegalNotice(issue, citizen, authority = null) {
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const daysSinceIssue = Math.floor((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24));
  
  // Determine target authority based on issue category
  const targetAuthority = authority || getAuthorityForCategory(issue.category);
  
  // Get escalation history summary
  const escalationSummary = getEscalationHistory(issue);
  
  const text = `
LEGAL NOTICE
Under Section 80 of the Code of Civil Procedure, 1908 (where applicable)


Date: ${today}

To,
${targetAuthority.name}
${targetAuthority.address}

From,
${citizen.name}
${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}
Phone: ${citizen.phone}
${citizen.email ? `Email: ${citizen.email}` : ''}

Through: DIDI PoliTech — Citizen Empowerment Platform


Subject: Legal Notice for Violation of Fundamental Rights and Non-Redressal of Grievance


Dear Sir/Madam,

UNDER INSTRUCTIONS FROM AND ON BEHALF OF MY CLIENT, I serve upon you this Legal Notice under the following terms:

1. FACTS OF THE CASE

   1.1 That my client, ${citizen.name}, is a law-abiding citizen residing at ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}.

   1.2 That on ${new Date(issue.created_at).toLocaleDateString('en-IN')}, my client had registered a grievance through the DIDI PoliTech platform (Citizen Grievance Redressal System) concerning the following issue:

       Issue Category: ${issue.category}
       Issue Title: ${issue.title || 'Civic Infrastructure Issue'}
       Location: ${issue.address || issue.ward || 'Bilaspur, Chhattisgarh'}
       Severity Level: ${issue.severity}
       Issue ID: DIDI-${issue.id}

   1.3 DESCRIPTION OF THE ISSUE:
       ${issue.description}

   1.4 That despite the lapse of ${daysSinceIssue} days since the registration of the said grievance, your office/department has completely failed to take any action to address or resolve the issue.


2. PREVIOUS ATTEMPTS AT RESOLUTION

${escalationSummary}

   2.5 That my client has exhausted all available administrative remedies and has made all reasonable efforts to seek redressal through proper channels.

   2.6 That the complete inaction and callous disregard shown by your office/department has left my client with no option but to issue this Legal Notice as a final opportunity for amicable resolution before initiating legal proceedings.


3. LEGAL BASIS

   3.1 VIOLATION OF FUNDAMENTAL RIGHTS

       That the failure to address my client's grievance constitutes a direct and flagrant violation of fundamental rights guaranteed under Articles 14 and 21 of the Constitution of India, which guarantee the Right to Equality and the Right to Life and Personal Liberty, respectively.

       ${getConstitutionalBasisForCategory(issue.category)}

   3.2 BREACH OF STATUTORY DUTY

       That your office/department has a statutory and constitutional obligation to ensure the welfare, safety, and well-being of citizens. The failure to perform this duty amounts to negligence and dereliction of statutory obligations.

   3.3 VIOLATION OF PRINCIPLES OF NATURAL JUSTICE

       That the unreasonable delay of ${daysSinceIssue} days in addressing a legitimate grievance is arbitrary, capricious, and violative of the principles of natural justice and good governance.


4. DEMAND

   In view of the above facts and circumstances, my client hereby DEMANDS that you:

   a) Immediately take cognizance of the issue and initiate necessary remedial measures within 7 (seven) days from the date of receipt of this notice;

   b) Ensure complete resolution of the issue within 15 (fifteen) days from the date of receipt of this notice;

   c) Provide a written response to my client detailing the action taken and the timeline for complete resolution;

   d) Ensure that adequate measures are put in place to prevent recurrence of such issues in the future.


5. TIMELINE FOR COMPLIANCE

   You are hereby given 15 (FIFTEEN) DAYS from the date of receipt of this notice to comply with the above demands and take necessary remedial action.


6. LEGAL CONSEQUENCES OF NON-COMPLIANCE

   TAKE NOTICE that if you fail to comply with the demands made in this notice within the stipulated period of 15 days, my client shall be constrained to initiate appropriate legal proceedings against you and your department, including but not limited to:

   a) Filing a Writ Petition under Article 226 of the Constitution of India before the Hon'ble High Court of Chhattisgarh at Bilaspur seeking appropriate relief and directions;

   b) Filing a Public Interest Litigation (PIL) if the issue affects a larger public interest;

   c) Initiating civil proceedings for damages, compensation, and costs;

   d) Filing appropriate complaints with relevant authorities including the State Human Rights Commission, Central Vigilance Commission, or other statutory bodies.

   All legal proceedings shall be initiated at your cost and risk, and my client shall claim full costs and compensation for the harassment, mental agony, and financial loss suffered due to your inaction and negligence.


7. RESERVATION OF RIGHTS

   My client reserves all rights, remedies, and contentions, whether factual or legal, which may be available in law. Nothing contained in this notice shall be deemed to be a waiver of any of my client's rights.


This notice is issued without prejudice to all other rights and remedies available to my client in law.

You are required to acknowledge receipt of this notice and respond within the stipulated time period.


Thanking you,

Yours faithfully,

${citizen.name}
(Through DIDI PoliTech Platform)
${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}
Phone: ${citizen.phone}
${citizen.email ? `Email: ${citizen.email}` : ''}

Date: ${today}


---
DISCLAIMER:
This legal notice has been generated through DIDI PoliTech — a citizen empowerment platform.
It is STRONGLY RECOMMENDED that you:
1. Consult a qualified advocate before sending this notice
2. Review and customize the content as per your specific situation
3. Send the notice through proper legal channels (Registered Post AD / Speed Post)
4. Keep proof of delivery and acknowledgment
This document is for illustrative purposes and does not constitute legal advice.
---
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Times New Roman', serif; 
      line-height: 1.7; 
      max-width: 850px; 
      margin: 40px auto; 
      padding: 30px; 
      text-align: justify;
    }
    .header { text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 30px; text-decoration: underline; }
    .section-title { font-weight: bold; margin-top: 25px; margin-bottom: 10px; }
    .para { margin: 12px 0; margin-left: 40px; }
    .no-indent { margin-left: 0; }
    .signature { margin-top: 50px; }
    .disclaimer { 
      margin-top: 50px; 
      padding: 15px; 
      background: #fff3cd; 
      border: 2px solid #856404; 
      font-size: 11px; 
      color: #856404;
    }
    @media print {
      body { margin: 0; padding: 20px; }
      .disclaimer { background: white; }
    }
  </style>
</head>
<body>
  <div class="header">LEGAL NOTICE</div>
  <p class="no-indent" style="text-align: center; margin-bottom: 30px;">Under Section 80 of the Code of Civil Procedure, 1908 (where applicable)</p>

  <p class="no-indent"><strong>Date:</strong> ${today}</p>

  <p class="no-indent" style="margin-top: 30px;"><strong>To,</strong><br>
  ${targetAuthority.name}<br>
  ${targetAuthority.address}</p>

  <p class="no-indent" style="margin-top: 30px;"><strong>From,</strong><br>
  ${citizen.name}<br>
  ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}<br>
  Phone: ${citizen.phone}<br>
  ${citizen.email ? `Email: ${citizen.email}<br>` : ''}<br>
  Through: DIDI PoliTech — Citizen Empowerment Platform</p>

  <p class="no-indent" style="margin-top: 30px;"><strong>Subject: Legal Notice for Violation of Fundamental Rights and Non-Redressal of Grievance</strong></p>

  <p class="no-indent" style="margin-top: 25px;">Dear Sir/Madam,</p>

  <p class="no-indent" style="margin-top: 20px;"><strong>UNDER INSTRUCTIONS FROM AND ON BEHALF OF MY CLIENT, I serve upon you this Legal Notice under the following terms:</strong></p>

  <div class="section-title">1. FACTS OF THE CASE</div>

  <p class="para">1.1 That my client, <strong>${citizen.name}</strong>, is a law-abiding citizen residing at ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}.</p>

  <p class="para">1.2 That on ${new Date(issue.created_at).toLocaleDateString('en-IN')}, my client had registered a grievance through the DIDI PoliTech platform (Citizen Grievance Redressal System) concerning the following issue:</p>

  <p class="no-indent" style="margin-left: 80px;">
    <strong>Issue Category:</strong> ${issue.category}<br>
    <strong>Issue Title:</strong> ${issue.title || 'Civic Infrastructure Issue'}<br>
    <strong>Location:</strong> ${issue.address || issue.ward || 'Bilaspur, Chhattisgarh'}<br>
    <strong>Severity Level:</strong> ${issue.severity}<br>
    <strong>Issue ID:</strong> DIDI-${issue.id}
  </p>

  <p class="para">1.3 <strong>DESCRIPTION OF THE ISSUE:</strong><br>${issue.description}</p>

  <p class="para">1.4 That despite the lapse of <strong>${daysSinceIssue} days</strong> since the registration of the said grievance, your office/department has completely failed to take any action to address or resolve the issue.</p>

  <div class="section-title">2. PREVIOUS ATTEMPTS AT RESOLUTION</div>

  ${escalationSummary.split('\n').map(line => `<p class="para">${line}</p>`).join('\n')}

  <p class="para">2.5 That my client has exhausted all available administrative remedies and has made all reasonable efforts to seek redressal through proper channels.</p>

  <p class="para">2.6 That the complete inaction and callous disregard shown by your office/department has left my client with no option but to issue this Legal Notice as a final opportunity for amicable resolution before initiating legal proceedings.</p>

  <div class="section-title">3. LEGAL BASIS</div>

  <p class="para"><strong>3.1 VIOLATION OF FUNDAMENTAL RIGHTS</strong></p>

  <p class="para">That the failure to address my client's grievance constitutes a direct and flagrant violation of fundamental rights guaranteed under <strong>Articles 14 and 21</strong> of the Constitution of India, which guarantee the Right to Equality and the Right to Life and Personal Liberty, respectively.</p>

  <p class="para">${getConstitutionalBasisForCategory(issue.category)}</p>

  <p class="para"><strong>3.2 BREACH OF STATUTORY DUTY</strong></p>

  <p class="para">That your office/department has a statutory and constitutional obligation to ensure the welfare, safety, and well-being of citizens. The failure to perform this duty amounts to negligence and dereliction of statutory obligations.</p>

  <p class="para"><strong>3.3 VIOLATION OF PRINCIPLES OF NATURAL JUSTICE</strong></p>

  <p class="para">That the unreasonable delay of ${daysSinceIssue} days in addressing a legitimate grievance is arbitrary, capricious, and violative of the principles of natural justice and good governance.</p>

  <div class="section-title">4. DEMAND</div>

  <p class="para">In view of the above facts and circumstances, my client hereby <strong>DEMANDS</strong> that you:</p>

  <p class="para">a) Immediately take cognizance of the issue and initiate necessary remedial measures within <strong>7 (seven) days</strong> from the date of receipt of this notice;</p>

  <p class="para">b) Ensure complete resolution of the issue within <strong>15 (fifteen) days</strong> from the date of receipt of this notice;</p>

  <p class="para">c) Provide a written response to my client detailing the action taken and the timeline for complete resolution;</p>

  <p class="para">d) Ensure that adequate measures are put in place to prevent recurrence of such issues in the future.</p>

  <div class="section-title">5. TIMELINE FOR COMPLIANCE</div>

  <p class="para">You are hereby given <strong>15 (FIFTEEN) DAYS</strong> from the date of receipt of this notice to comply with the above demands and take necessary remedial action.</p>

  <div class="section-title">6. LEGAL CONSEQUENCES OF NON-COMPLIANCE</div>

  <p class="para"><strong>TAKE NOTICE</strong> that if you fail to comply with the demands made in this notice within the stipulated period of 15 days, my client shall be constrained to initiate appropriate legal proceedings against you and your department, including but not limited to:</p>

  <p class="para">a) Filing a Writ Petition under Article 226 of the Constitution of India before the Hon'ble High Court of Chhattisgarh at Bilaspur seeking appropriate relief and directions;</p>

  <p class="para">b) Filing a Public Interest Litigation (PIL) if the issue affects a larger public interest;</p>

  <p class="para">c) Initiating civil proceedings for damages, compensation, and costs;</p>

  <p class="para">d) Filing appropriate complaints with relevant authorities including the State Human Rights Commission, Central Vigilance Commission, or other statutory bodies.</p>

  <p class="para">All legal proceedings shall be initiated at your cost and risk, and my client shall claim full costs and compensation for the harassment, mental agony, and financial loss suffered due to your inaction and negligence.</p>

  <div class="section-title">7. RESERVATION OF RIGHTS</div>

  <p class="para">My client reserves all rights, remedies, and contentions, whether factual or legal, which may be available in law. Nothing contained in this notice shall be deemed to be a waiver of any of my client's rights.</p>

  <p class="no-indent" style="margin-top: 30px;">This notice is issued without prejudice to all other rights and remedies available to my client in law.</p>

  <p class="no-indent">You are required to acknowledge receipt of this notice and respond within the stipulated time period.</p>

  <p class="no-indent" style="margin-top: 25px;">Thanking you,</p>

  <div class="signature">
    <p class="no-indent">Yours faithfully,</p><br><br>
    <p class="no-indent"><strong>${citizen.name}</strong><br>
    (Through DIDI PoliTech Platform)<br>
    ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}<br>
    Phone: ${citizen.phone}<br>
    ${citizen.email ? `Email: ${citizen.email}<br>` : ''}<br>
    <strong>Date:</strong> ${today}</p>
  </div>

  <div class="disclaimer">
    <strong>⚠️ DISCLAIMER:</strong><br>
    This legal notice has been generated through <strong>DIDI PoliTech</strong> — a citizen empowerment platform.<br>
    It is <strong>STRONGLY RECOMMENDED</strong> that you:<br>
    1. Consult a qualified advocate before sending this notice<br>
    2. Review and customize the content as per your specific situation<br>
    3. Send the notice through proper legal channels (Registered Post AD / Speed Post)<br>
    4. Keep proof of delivery and acknowledgment<br>
    This document is for illustrative purposes and does not constitute legal advice.
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}

/**
 * Get authority details based on issue category
 */
function getAuthorityForCategory(category) {
  const authorities = {
    infrastructure: {
      name: 'The Commissioner, Municipal Corporation, Bilaspur',
      address: 'Municipal Corporation Office, Bilaspur, Chhattisgarh - 495001'
    },
    health: {
      name: 'The Chief Medical and Health Officer, Bilaspur',
      address: 'District Hospital, Bilaspur, Chhattisgarh - 495001'
    },
    education: {
      name: 'The District Education Officer, Bilaspur',
      address: 'District Education Office, Bilaspur, Chhattisgarh - 495001'
    },
    safety: {
      name: 'The Superintendent of Police, Bilaspur',
      address: 'Police Headquarters, Bilaspur, Chhattisgarh - 495001'
    },
    electricity: {
      name: 'The Superintending Engineer, CSPDCL, Bilaspur Circle',
      address: 'CSPDCL Office, Bilaspur, Chhattisgarh - 495001'
    },
    water: {
      name: 'The Executive Engineer, Public Health Engineering Department',
      address: 'PHE Department, Bilaspur Division, Bilaspur, Chhattisgarh - 495001'
    },
    environment: {
      name: 'The District Collector, Bilaspur',
      address: 'Collectorate, Bilaspur, Chhattisgarh - 495001'
    },
    legal: {
      name: 'The District Collector, Bilaspur',
      address: 'Collectorate, Bilaspur, Chhattisgarh - 495001'
    },
    livelihood: {
      name: 'The District Collector, Bilaspur',
      address: 'Collectorate, Bilaspur, Chhattisgarh - 495001'
    }
  };
  
  return authorities[category] || authorities.infrastructure;
}

/**
 * Get escalation history summary
 */
function getEscalationHistory(issue) {
  const daysSince = Math.floor((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24));
  
  let history = '   2.1 That on ' + new Date(issue.created_at).toLocaleDateString('en-IN') + ', my client registered the grievance through the DIDI PoliTech platform.\n\n';
  
  let stepNum = 2;
  ESCALATION_LADDER.forEach((level, index) => {
    if (daysSince >= level.days && index > 0 && index < 6) { // Escalations up to media
      stepNum++;
      history += `   2.${stepNum} That on Day ${level.days}, the following escalation action was taken: ${level.action}.\n\n`;
    }
  });
  
  return history.trim();
}

/**
 * Get constitutional basis for different categories
 */
function getConstitutionalBasisForCategory(category) {
  const basis = {
    health: 'The Right to Health has been recognized as an integral part of Article 21 by the Hon\'ble Supreme Court in <em>Paschim Banga Khet Mazdoor Samity v. State of West Bengal (1996) 4 SCC 37</em>.',
    infrastructure: 'The Right to Safe Passage and Basic Infrastructure has been recognized as part of Article 21 in <em>Municipal Council, Ratlam v. Vardhichand (1980) 4 SCC 162</em>.',
    education: 'The Right to Education is explicitly guaranteed under Article 21A of the Constitution as upheld in <em>Unni Krishnan v. State of AP (1993) 1 SCC 645</em>.',
    water: 'The Right to Clean and Potable Water is an integral part of Article 21 as held in <em>Subhash Kumar v. State of Bihar (1991) 1 SCC 598</em>.',
    environment: 'The Right to a Clean Environment is part of Article 21 as established in <em>MC Mehta v. Union of India (1987) 1 SCC 395</em>.',
    safety: 'The Right to Life and Personal Liberty under Article 21 includes the right to live with dignity and safety as held in <em>Maneka Gandhi v. Union of India (1978) 1 SCC 248</em>.',
    livelihood: 'The Right to Livelihood is an integral part of the Right to Life under Article 21 as held in <em>Olga Tellis v. Bombay Municipal Corporation (1985) 3 SCC 545</em>.',
    legal: 'The Right to Equality and Fair Treatment is guaranteed under Article 14 and Article 21 as upheld in <em>State of West Bengal v. Anwar Ali Sarkar (1952) SCR 284</em>.'
  };
  
  return basis[category] || basis.infrastructure;
}
