// RTI Auto-Drafter
// Generates RTI applications under Section 6(1) of RTI Act, 2005

// Department mapping for different issue categories
const DEPARTMENT_MAPPING = {
  infrastructure: {
    name: 'Public Works Department (PWD) / Municipal Corporation',
    pio: 'The Public Information Officer',
    address: 'Office of Municipal Corporation, Bilaspur, Chhattisgarh - 495001',
    department: 'Public Works Department / Municipal Corporation, Bilaspur'
  },
  health: {
    name: 'Health & Family Welfare Department',
    pio: 'The Public Information Officer',
    address: 'Office of Chief Medical Officer, Civil Hospital, Bilaspur, Chhattisgarh - 495001',
    department: 'District Hospital / Chief Medical Officer, Bilaspur'
  },
  education: {
    name: 'School Education Department',
    pio: 'The Public Information Officer',
    address: 'Office of District Education Officer, Bilaspur, Chhattisgarh - 495001',
    department: 'District Education Office, Bilaspur'
  },
  safety: {
    name: 'Police / Home Department',
    pio: 'The Public Information Officer',
    address: 'Office of Superintendent of Police, Police Headquarters, Bilaspur, Chhattisgarh - 495001',
    department: 'Police Department, Bilaspur'
  },
  electricity: {
    name: 'CSPDCL (Chhattisgarh State Power Distribution Company Ltd.)',
    pio: 'The Public Information Officer',
    address: 'CSPDCL Office, Bilaspur Circle, Bilaspur, Chhattisgarh - 495001',
    department: 'CSPDCL, Bilaspur'
  },
  water: {
    name: 'PHE Department (Public Health Engineering)',
    pio: 'The Public Information Officer',
    address: 'Office of Executive Engineer, PHE Department, Bilaspur, Chhattisgarh - 495001',
    department: 'Public Health Engineering Department, Bilaspur'
  },
  environment: {
    name: 'Chhattisgarh Environment Conservation Board',
    pio: 'The Public Information Officer',
    address: 'CG Environment Conservation Board, Regional Office, Bilaspur, Chhattisgarh - 495001',
    department: 'CG Environment Conservation Board, Bilaspur'
  },
  legal: {
    name: 'District Administration / Collectorate',
    pio: 'The Public Information Officer',
    address: 'Office of District Collector, Collectorate, Bilaspur, Chhattisgarh - 495001',
    department: 'District Administration, Bilaspur'
  },
  livelihood: {
    name: 'District Administration / DRDA',
    pio: 'The Public Information Officer',
    address: 'Office of District Collector, Collectorate, Bilaspur, Chhattisgarh - 495001',
    department: 'District Rural Development Agency, Bilaspur'
  }
};

/**
 * Generate RTI application
 * @param {Object} issue - Issue object
 * @param {Object} citizen - Citizen object
 * @param {string} language - Language (en/hi)
 * @returns {Object} { text, html }
 */
export function generateRTI(issue, citizen, language = 'en') {
  const dept = DEPARTMENT_MAPPING[issue.category] || DEPARTMENT_MAPPING.infrastructure;
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  
  if (language === 'hi') {
    return generateRTIHindi(issue, citizen, dept, today);
  }
  
  // English RTI
  const text = `
To,
${dept.pio}
${dept.department}
${dept.address}

Date: ${today}

Subject: Application for Information under Section 6(1) of the Right to Information Act, 2005

Respected Sir/Madam,

I, ${citizen.name}, resident of ${citizen.address || citizen.ward || 'Bilaspur'}, Chhattisgarh, hereby request the following information under Section 6(1) of the Right to Information Act, 2005:

**Background:**
On ${new Date(issue.created_at).toLocaleDateString('en-IN')}, a complaint/grievance was registered through the DIDI PoliTech platform (Citizen Grievance Redressal System) regarding:

${issue.title || 'Civic Issue'}
${issue.description}

Location: ${issue.address || issue.ward || 'Ward information not provided'}
Issue ID: DIDI-${issue.id}
Category: ${issue.category}
Severity: ${issue.severity}

**Information Sought:**

1. Whether any complaint/grievance has been registered in your office/department regarding the above-mentioned issue from ${new Date(issue.created_at).toLocaleDateString('en-IN')} to date?

2. If yes, what is the current status of the complaint and what action has been taken by your department?

3. If no action has been taken, please provide reasons for the delay and inaction.

4. What is the estimated time frame for resolution of this issue?

5. Copies of any files, inspection reports, correspondence, or documents related to the above-mentioned issue.

6. Name and designation of the officer(s) responsible for addressing this matter.

**Format of Information Required:** English / Hindi

**Period for which Information is Sought:** From ${new Date(issue.created_at).toLocaleDateString('en-IN')} to ${today}

I am enclosing an application fee of Rs. 10/- (Rupees Ten only) in the form of Postal Order/Demand Draft in favour of the Accounts Officer.

If any information pertains to another public authority, kindly transfer this application under Section 6(3) of the RTI Act, 2005, and inform me accordingly.

I request you to provide the information at the earliest, preferably within the statutory period of 30 days as mandated under Section 7(1) of the RTI Act, 2005.

Thanking you,

Yours faithfully,

${citizen.name}
${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}
Phone: ${citizen.phone}
${citizen.email ? `Email: ${citizen.email}` : ''}

---
Generated via DIDI PoliTech — Citizen Empowerment Platform
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
    h2 { text-align: center; text-decoration: underline; }
    .section { margin: 20px 0; }
    .bold { font-weight: bold; }
    .signature { margin-top: 40px; }
    .footer { margin-top: 60px; font-size: 10px; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="section">
    To,<br>
    ${dept.pio}<br>
    ${dept.department}<br>
    ${dept.address}
  </div>

  <div class="section">
    <strong>Date:</strong> ${today}
  </div>

  <div class="section">
    <strong>Subject:</strong> Application for Information under Section 6(1) of the Right to Information Act, 2005
  </div>

  <div class="section">
    Respected Sir/Madam,
  </div>

  <div class="section">
    I, <strong>${citizen.name}</strong>, resident of ${citizen.address || citizen.ward || 'Bilaspur'}, Chhattisgarh, hereby request the following information under Section 6(1) of the Right to Information Act, 2005:
  </div>

  <div class="section">
    <strong>Background:</strong><br>
    On ${new Date(issue.created_at).toLocaleDateString('en-IN')}, a complaint/grievance was registered through the DIDI PoliTech platform (Citizen Grievance Redressal System) regarding:<br><br>
    
    ${issue.title ? `<strong>${issue.title}</strong><br>` : ''}
    ${issue.description}<br><br>
    
    <strong>Location:</strong> ${issue.address || issue.ward || 'Ward information not provided'}<br>
    <strong>Issue ID:</strong> DIDI-${issue.id}<br>
    <strong>Category:</strong> ${issue.category}<br>
    <strong>Severity:</strong> ${issue.severity}
  </div>

  <div class="section">
    <strong>Information Sought:</strong>
    <ol>
      <li>Whether any complaint/grievance has been registered in your office/department regarding the above-mentioned issue from ${new Date(issue.created_at).toLocaleDateString('en-IN')} to date?</li>
      <li>If yes, what is the current status of the complaint and what action has been taken by your department?</li>
      <li>If no action has been taken, please provide reasons for the delay and inaction.</li>
      <li>What is the estimated time frame for resolution of this issue?</li>
      <li>Copies of any files, inspection reports, correspondence, or documents related to the above-mentioned issue.</li>
      <li>Name and designation of the officer(s) responsible for addressing this matter.</li>
    </ol>
  </div>

  <div class="section">
    <strong>Format of Information Required:</strong> English / Hindi
  </div>

  <div class="section">
    <strong>Period for which Information is Sought:</strong> From ${new Date(issue.created_at).toLocaleDateString('en-IN')} to ${today}
  </div>

  <div class="section">
    I am enclosing an application fee of <strong>Rs. 10/-</strong> (Rupees Ten only) in the form of Postal Order/Demand Draft in favour of the Accounts Officer.
  </div>

  <div class="section">
    If any information pertains to another public authority, kindly transfer this application under Section 6(3) of the RTI Act, 2005, and inform me accordingly.
  </div>

  <div class="section">
    I request you to provide the information at the earliest, preferably within the statutory period of 30 days as mandated under Section 7(1) of the RTI Act, 2005.
  </div>

  <div class="section">
    Thanking you,
  </div>

  <div class="signature">
    Yours faithfully,<br><br><br>
    
    <strong>${citizen.name}</strong><br>
    ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}<br>
    Phone: ${citizen.phone}<br>
    ${citizen.email ? `Email: ${citizen.email}` : ''}
  </div>

  <div class="footer">
    Generated via DIDI PoliTech — Citizen Empowerment Platform
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}

/**
 * Generate RTI in Hindi
 */
function generateRTIHindi(issue, citizen, dept, today) {
  const text = `
सेवा में,
${dept.pio}
${dept.department}
${dept.address}

दिनांक: ${today}

विषय: सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत सूचना हेतु आवेदन

महोदय/महोदया,

मैं, ${citizen.name}, निवासी ${citizen.address || citizen.ward || 'बिलासपुर'}, छत्तीसगढ़, सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत निम्नलिखित सूचना का अनुरोध करता/करती हूँ:

**पृष्ठभूमि:**
दिनांक ${new Date(issue.created_at).toLocaleDateString('hi-IN')} को DIDI PoliTech प्लेटफ़ॉर्म (नागरिक शिकायत निवारण प्रणाली) के माध्यम से निम्न विषय में शिकायत/प्रतिवेदन दर्ज किया गया था:

${issue.title || 'नागरिक समस्या'}
${issue.description}

स्थान: ${issue.address || issue.ward || 'वार्ड सूचना उपलब्ध नहीं'}
समस्या ID: DIDI-${issue.id}
श्रेणी: ${issue.category}
गंभीरता: ${issue.severity}

**अनुरोधित सूचना:**

1. क्या दिनांक ${new Date(issue.created_at).toLocaleDateString('hi-IN')} से आज तक आपके कार्यालय/विभाग में उपरोक्त विषय से संबंधित कोई शिकायत/प्रतिवेदन दर्ज हुआ है?

2. यदि हाँ, तो शिकायत की वर्तमान स्थिति क्या है और आपके विभाग द्वारा क्या कार्यवाही की गई है?

3. यदि कोई कार्यवाही नहीं की गई है, तो विलंब और निष्क्रियता के कारण बताएं।

4. इस समस्या के समाधान की अनुमानित समय-सीमा क्या है?

5. उपरोक्त विषय से संबंधित सभी फाइलें, निरीक्षण रिपोर्ट, पत्राचार या दस्तावेजों की प्रतियां।

6. इस मामले को संबोधित करने के लिए जिम्मेदार अधिकारी(यों) का नाम और पदनाम।

**सूचना का प्रारूप:** हिंदी / अंग्रेजी

**सूचना की अवधि:** ${new Date(issue.created_at).toLocaleDateString('hi-IN')} से ${today} तक

मैं लेखा अधिकारी के पक्ष में डाक आदेश/डिमांड ड्राफ्ट के रूप में रु. 10/- (दस रुपये मात्र) का आवेदन शुल्क संलग्न कर रहा/रही हूँ।

यदि कोई सूचना किसी अन्य लोक प्राधिकरण से संबंधित है, तो कृपया सूचना का अधिकार अधिनियम, 2005 की धारा 6(3) के तहत इस आवेदन को स्थानांतरित करें और मुझे तदनुसार सूचित करें।

मैं आपसे अनुरोध करता/करती हूँ कि सूचना का अधिकार अधिनियम, 2005 की धारा 7(1) के तहत अनिवार्य 30 दिनों की वैधानिक अवधि के भीतर सूचना प्रदान करें।

धन्यवाद,

भवदीय,

${citizen.name}
${citizen.address || citizen.ward || 'बिलासपुर, छत्तीसगढ़'}
फोन: ${citizen.phone}
${citizen.email ? `ईमेल: ${citizen.email}` : ''}

---
DIDI PoliTech — नागरिक सशक्तिकरण मंच द्वारा जनरेट किया गया
  `.trim();

  // Hindi HTML version (similar structure)
  const html = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif; line-height: 1.8; max-width: 800px; margin: 40px auto; padding: 20px; }
    .section { margin: 20px 0; }
    .signature { margin-top: 40px; }
    .footer { margin-top: 60px; font-size: 10px; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="section">
    सेवा में,<br>
    ${dept.pio}<br>
    ${dept.department}<br>
    ${dept.address}
  </div>

  <div class="section">
    <strong>दिनांक:</strong> ${today}
  </div>

  <div class="section">
    <strong>विषय:</strong> सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत सूचना हेतु आवेदन
  </div>

  <div class="section">
    महोदय/महोदया,
  </div>

  <div class="section">
    मैं, <strong>${citizen.name}</strong>, निवासी ${citizen.address || citizen.ward || 'बिलासपुर'}, छत्तीसगढ़, सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत निम्नलिखित सूचना का अनुरोध करता/करती हूँ:
  </div>

  <div class="section">
    <strong>पृष्ठभूमि:</strong><br>
    दिनांक ${new Date(issue.created_at).toLocaleDateString('hi-IN')} को DIDI PoliTech प्लेटफ़ॉर्म (नागरिक शिकायत निवारण प्रणाली) के माध्यम से निम्न विषय में शिकायत/प्रतिवेदन दर्ज किया गया था:<br><br>
    
    ${issue.title ? `<strong>${issue.title}</strong><br>` : ''}
    ${issue.description}<br><br>
    
    <strong>स्थान:</strong> ${issue.address || issue.ward || 'वार्ड सूचना उपलब्ध नहीं'}<br>
    <strong>समस्या ID:</strong> DIDI-${issue.id}<br>
    <strong>श्रेणी:</strong> ${issue.category}<br>
    <strong>गंभीरता:</strong> ${issue.severity}
  </div>

  <div class="section">
    <strong>अनुरोधित सूचना:</strong>
    <ol>
      <li>क्या दिनांक ${new Date(issue.created_at).toLocaleDateString('hi-IN')} से आज तक आपके कार्यालय/विभाग में उपरोक्त विषय से संबंधित कोई शिकायत/प्रतिवेदन दर्ज हुआ है?</li>
      <li>यदि हाँ, तो शिकायत की वर्तमान स्थिति क्या है और आपके विभाग द्वारा क्या कार्यवाही की गई है?</li>
      <li>यदि कोई कार्यवाही नहीं की गई है, तो विलंब और निष्क्रियता के कारण बताएं।</li>
      <li>इस समस्या के समाधान की अनुमानित समय-सीमा क्या है?</li>
      <li>उपरोक्त विषय से संबंधित सभी फाइलें, निरीक्षण रिपोर्ट, पत्राचार या दस्तावेजों की प्रतियां।</li>
      <li>इस मामले को संबोधित करने के लिए जिम्मेदार अधिकारी(यों) का नाम और पदनाम।</li>
    </ol>
  </div>

  <div class="section">
    <strong>सूचना का प्रारूप:</strong> हिंदी / अंग्रेजी
  </div>

  <div class="section">
    <strong>सूचना की अवधि:</strong> ${new Date(issue.created_at).toLocaleDateString('hi-IN')} से ${today} तक
  </div>

  <div class="section">
    मैं लेखा अधिकारी के पक्ष में डाक आदेश/डिमांड ड्राफ्ट के रूप में <strong>रु. 10/-</strong> (दस रुपये मात्र) का आवेदन शुल्क संलग्न कर रहा/रही हूँ।
  </div>

  <div class="section">
    यदि कोई सूचना किसी अन्य लोक प्राधिकरण से संबंधित है, तो कृपया सूचना का अधिकार अधिनियम, 2005 की धारा 6(3) के तहत इस आवेदन को स्थानांतरित करें और मुझे तदनुसार सूचित करें।
  </div>

  <div class="section">
    मैं आपसे अनुरोध करता/करती हूँ कि सूचना का अधिकार अधिनियम, 2005 की धारा 7(1) के तहत अनिवार्य 30 दिनों की वैधानिक अवधि के भीतर सूचना प्रदान करें।
  </div>

  <div class="section">
    धन्यवाद,
  </div>

  <div class="signature">
    भवदीय,<br><br><br>
    
    <strong>${citizen.name}</strong><br>
    ${citizen.address || citizen.ward || 'बिलासपुर, छत्तीसगढ़'}<br>
    फोन: ${citizen.phone}<br>
    ${citizen.email ? `ईमेल: ${citizen.email}` : ''}
  </div>

  <div class="footer">
    DIDI PoliTech — नागरिक सशक्तिकरण मंच द्वारा जनरेट किया गया
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}
