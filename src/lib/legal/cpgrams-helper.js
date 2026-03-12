// CPGRAMS Filing Helper
// Since CPGRAMS (pgportal.gov.in) has no public API, we generate ready-to-paste content

// Ministry/Department mapping for CPGRAMS
const CPGRAMS_MAPPING = {
  infrastructure: {
    ministry: 'Ministry of Road Transport & Highways',
    state_authority: 'Chief Minister Helpline (1100) / Public Works Department, Chhattisgarh',
    category: 'Road Transport & Highways',
    subcategory: 'Road Maintenance / Infrastructure'
  },
  health: {
    ministry: 'Ministry of Health & Family Welfare',
    state_authority: 'Chief Minister Helpline (1100) / Health Department, Chhattisgarh',
    category: 'Health & Family Welfare',
    subcategory: 'Public Health Services / Hospitals'
  },
  education: {
    ministry: 'Ministry of Education',
    state_authority: 'Chief Minister Helpline (1100) / School Education Department, Chhattisgarh',
    category: 'Education',
    subcategory: 'School Education / Mid-day Meal'
  },
  safety: {
    ministry: 'Ministry of Home Affairs',
    state_authority: 'Chief Minister Helpline (1100) / Home Department, Chhattisgarh',
    category: 'Home Affairs',
    subcategory: 'Police / Law & Order'
  },
  electricity: {
    ministry: 'Ministry of Power',
    state_authority: 'CSPDCL Customer Care / Chief Minister Helpline (1100)',
    category: 'Power',
    subcategory: 'Electricity Supply / Billing'
  },
  water: {
    ministry: 'Ministry of Jal Shakti',
    state_authority: 'Chief Minister Helpline (1100) / PHE Department, Chhattisgarh',
    category: 'Jal Shakti',
    subcategory: 'Water Supply / Sanitation'
  },
  environment: {
    ministry: 'Ministry of Environment, Forest and Climate Change',
    state_authority: 'Chief Minister Helpline (1100) / CG Environment Conservation Board',
    category: 'Environment, Forest and Climate Change',
    subcategory: 'Pollution / Environmental Degradation'
  },
  legal: {
    ministry: 'Central Vigilance Commission',
    state_authority: 'Chief Minister Helpline (1100) / District Administration',
    category: 'Legal / Administrative',
    subcategory: 'Corruption / Mal-administration'
  },
  livelihood: {
    ministry: 'Ministry of Rural Development',
    state_authority: 'Chief Minister Helpline (1100) / Rural Development Department, CG',
    category: 'Rural Development',
    subcategory: 'MGNREGA / Livelihood Schemes'
  }
};

/**
 * Prepare CPGRAMS complaint
 * @param {Object} issue - Issue object
 * @param {Object} citizen - Citizen object
 * @returns {Object} CPGRAMS-ready complaint data
 */
export function prepareCPGRAMS(issue, citizen) {
  const mapping = CPGRAMS_MAPPING[issue.category] || CPGRAMS_MAPPING.infrastructure;
  
  const subject = `Grievance regarding ${issue.category} issue in ${issue.ward || 'Bilaspur'}, Chhattisgarh`;
  
  const description = `
Grievance Details:

Issue Category: ${issue.category}
Issue Title: ${issue.title || 'Civic Infrastructure Problem'}
Severity Level: ${issue.severity}
Location: ${issue.address || issue.ward || 'Bilaspur, Chhattisgarh'}
Issue Raised On: ${new Date(issue.created_at).toLocaleDateString('en-IN')}
DIDI Platform Issue ID: DIDI-${issue.id}

Description of the Problem:
${issue.description}

Current Status:
This grievance was registered on the DIDI PoliTech platform (Citizen Grievance Redressal System) on ${new Date(issue.created_at).toLocaleDateString('en-IN')}. Despite the severity of the issue, no action has been taken by the local authorities for ${Math.floor((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24))} days.

The issue affects the daily life and fundamental rights of citizens in the area. Immediate attention and resolution are urgently required.

Relief Sought:
1. Immediate inspection of the issue by concerned department officials.
2. Swift action to resolve the problem within a reasonable timeframe.
3. Regular updates on the progress of resolution.
4. Ensure such issues are prevented in the future through proper maintenance and monitoring.

Citizen Contact Details:
Name: ${citizen.name}
Address: ${citizen.address || citizen.ward || 'Bilaspur, Chhattisgarh'}
Phone: ${citizen.phone}
${citizen.email ? `Email: ${citizen.email}` : ''}

This complaint is being filed through DIDI PoliTech — a citizen empowerment platform that facilitates transparent grievance redressal.
  `.trim();

  // Step-by-step instructions
  const instructions = `
📋 **How to File on CPGRAMS (pgportal.gov.in):**

**FOR CENTRAL ISSUES:**
1. Visit: https://pgportal.gov.in/
2. Click "Register Grievance" (Lodge Public Grievance)
3. Select Ministry: "${mapping.ministry}"
4. Select Category: "${mapping.category}"
5. Select Sub-category: "${mapping.subcategory}"
6. Select State: "Chhattisgarh"
7. Select District: "Bilaspur"
8. Copy and paste the Subject and Description provided above
9. Attach supporting documents/photos if available
10. Submit and note your Grievance Registration Number

**FOR STATE ISSUES (Recommended for CG-specific problems):**
1. **CM Helpline:** Call 1100 (toll-free) or visit https://cmhelpline.cgstate.gov.in/
2. **Jan Shikayat Portal:** https://janshikayat.cgstate.gov.in/
3. Select "${mapping.state_authority}" as the concerned department
4. Provide the same details as above

⏱️ **Expected Timeline:**
- CPGRAMS: Response within 60 days (as per Sevottam guidelines)
- CM Helpline: Response within 15-30 days

📝 **After Filing:**
- Note your registration number/token number
- Track status online regularly
- If no response within the timeline, escalate to RTI or legal notice
  `.trim();

  return {
    ministry: mapping.ministry,
    state_authority: mapping.state_authority,
    category: mapping.category,
    subcategory: mapping.subcategory,
    subject,
    description,
    instructions
  };
}

/**
 * Generate CPGRAMS Hindi version
 */
export function prepareCPGRAMSHindi(issue, citizen) {
  const mapping = CPGRAMS_MAPPING[issue.category] || CPGRAMS_MAPPING.infrastructure;
  
  const subject = `${issue.ward || 'बिलासपुर'}, छत्तीसगढ़ में ${issue.category} समस्या के संबंध में शिकायत`;
  
  const description = `
शिकायत विवरण:

समस्या श्रेणी: ${issue.category}
समस्या शीर्षक: ${issue.title || 'नागरिक बुनियादी ढाँचा समस्या'}
गंभीरता स्तर: ${issue.severity}
स्थान: ${issue.address || issue.ward || 'बिलासपुर, छत्तीसगढ़'}
समस्या दर्ज की गई: ${new Date(issue.created_at).toLocaleDateString('hi-IN')}
DIDI प्लेटफ़ॉर्म समस्या ID: DIDI-${issue.id}

समस्या का विवरण:
${issue.description}

वर्तमान स्थिति:
यह शिकायत DIDI PoliTech प्लेटफ़ॉर्म (नागरिक शिकायत निवारण प्रणाली) पर ${new Date(issue.created_at).toLocaleDateString('hi-IN')} को दर्ज की गई थी। समस्या की गंभीरता के बावजूद, स्थानीय अधिकारियों द्वारा ${Math.floor((new Date() - new Date(issue.created_at)) / (1000 * 60 * 60 * 24))} दिनों से कोई कार्यवाही नहीं की गई है।

यह समस्या क्षेत्र के नागरिकों के दैनिक जीवन और मौलिक अधिकारों को प्रभावित कर रही है। तत्काल ध्यान और समाधान की अत्यंत आवश्यकता है।

अनुरोधित राहत:
1. संबंधित विभाग के अधिकारियों द्वारा तत्काल निरीक्षण।
2. उचित समय-सीमा के भीतर समस्या का समाधान करने के लिए शीघ्र कार्यवाही।
3. समाधान की प्रगति पर नियमित अपडेट।
4. उचित रखरखाव और निगरानी के माध्यम से भविष्य में ऐसी समस्याओं की रोकथाम।

नागरिक संपर्क विवरण:
नाम: ${citizen.name}
पता: ${citizen.address || citizen.ward || 'बिलासपुर, छत्तीसगढ़'}
फोन: ${citizen.phone}
${citizen.email ? `ईमेल: ${citizen.email}` : ''}

यह शिकायत DIDI PoliTech के माध्यम से दर्ज की जा रही है — एक नागरिक सशक्तिकरण मंच जो पारदर्शी शिकायत निवारण की सुविधा प्रदान करता है।
  `.trim();

  const instructions = `
📋 **CPGRAMS (pgportal.gov.in) पर कैसे दर्ज करें:**

**केंद्रीय मुद्दों के लिए:**
1. वेबसाइट पर जाएं: https://pgportal.gov.in/
2. "Register Grievance" (शिकायत दर्ज करें) पर क्लिक करें
3. मंत्रालय चुनें: "${mapping.ministry}"
4. श्रेणी चुनें: "${mapping.category}"
5. उप-श्रेणी चुनें: "${mapping.subcategory}"
6. राज्य चुनें: "छत्तीसगढ़"
7. जिला चुनें: "बिलासपुर"
8. ऊपर दिए गए विषय और विवरण को कॉपी-पेस्ट करें
9. यदि उपलब्ध हो तो सहायक दस्तावेज/फोटो संलग्न करें
10. जमा करें और अपना शिकायत पंजीकरण नंबर नोट करें

**राज्य मुद्दों के लिए (CG-विशिष्ट समस्याओं के लिए अनुशंसित):**
1. **CM हेल्पलाइन:** 1100 (टोल-फ्री) पर कॉल करें या https://cmhelpline.cgstate.gov.in/ पर जाएं
2. **जन शिकायत पोर्टल:** https://janshikayat.cgstate.gov.in/
3. संबंधित विभाग के रूप में "${mapping.state_authority}" चुनें
4. ऊपर दिए गए समान विवरण प्रदान करें

⏱️ **अपेक्षित समयसीमा:**
- CPGRAMS: 60 दिनों के भीतर प्रतिक्रिया (सेवोत्तम दिशानिर्देशों के अनुसार)
- CM हेल्पलाइन: 15-30 दिनों के भीतर प्रतिक्रिया

📝 **दर्ज करने के बाद:**
- अपना पंजीकरण/टोकन नंबर नोट करें
- नियमित रूप से ऑनलाइन स्थिति ट्रैक करें
- यदि समयसीमा के भीतर कोई प्रतिक्रिया नहीं मिलती है, तो RTI या कानूनी नोटिस पर बढ़ें
  `.trim();

  return {
    ministry: mapping.ministry,
    state_authority: mapping.state_authority,
    category: mapping.category,
    subcategory: mapping.subcategory,
    subject,
    description,
    instructions
  };
}
