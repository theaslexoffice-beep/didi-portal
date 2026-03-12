// AI Severity Scoring Engine
// Maslow Pyramid-based priority assignment

const severityKeywords = {
  P0: {
    en: ['accident', 'bleeding', 'fire', 'dying', 'attack', 'murder', 'rape', 'flood', 'earthquake', 'collapsed', 'drowning', 'suicide', 'heart attack', 'stroke', 'emergency', 'critical', 'life threat'],
    hi: ['दुर्घटना', 'खून', 'आग', 'मर रहा', 'हमला', 'हत्या', 'बलात्कार', 'बाढ़', 'भूकंप', 'गिर गया', 'डूब रहा', 'आत्महत्या', 'दिल का दौरा', 'आपातकाल', 'जान खतरे में'],
    cg: ['दुरघटना', 'लहू', 'आगी', 'मरत हवय', 'हमला', 'हत्या', 'बलात्कार', 'बाढ़', 'भुइंचाल', 'गिर गे', 'डूबत हवय']
  },
  P1: {
    en: ['hungry', 'no water', 'homeless', 'medicine', 'hospital', 'no food', 'shelter', 'starving', 'dehydrated', 'pregnant', 'child sick', 'fever', 'vomiting', 'diarrhea', 'malnutrition'],
    hi: ['भूखा', 'पानी नहीं', 'बेघर', 'दवाई', 'अस्पताल', 'खाना नहीं', 'आश्रय', 'भूख से मर रहा', 'गर्भवती', 'बच्चा बीमार', 'बुखार', 'उल्टी', 'दस्त', 'कुपोषण'],
    cg: ['भूखे', 'पानी नइ हे', 'घर नइ हे', 'दवाई', 'अस्पताल', 'खाना नइ', 'भूख ले मरत हवन', 'गर्भवती', 'लइका बीमार', 'बुखार', 'उल्टी']
  },
  P2: {
    en: ['harassment', 'threatened', 'eviction', 'police', 'arrested', 'violence', 'stalking', 'abuse', 'beating', 'torture', 'illegal detention', 'extortion', 'kidnapped', 'forced', 'blackmail'],
    hi: ['उत्पीड़न', 'धमकी', 'बेदखली', 'पुलिस', 'गिरफ्तार', 'हिंसा', 'पीछा', 'दुर्व्यवहार', 'मारपीट', 'यातना', 'अवैध हिरासत', 'जबरन वसूली', 'अपहरण', 'जबरदस्ती', 'ब्लैकमेल'],
    cg: ['परेसानी', 'धमकी', 'बेदखली', 'पुलिस', 'गिरफ्तार', 'हिंसा', 'पीछा', 'मारपीट', 'यातना', 'अपहरण', 'जबरदस्ती']
  },
  P3: {
    en: ['pothole', 'road', 'electricity', 'drainage', 'garbage', 'streetlight', 'sewage', 'water supply', 'power cut', 'broken pipe', 'manhole', 'broken road', 'sanitation'],
    hi: ['गड्ढा', 'सड़क', 'बिजली', 'नाली', 'कूड़ा', 'सड़क की बत्ती', 'सीवेज', 'पानी की आपूर्ति', 'बिजली कटौती', 'टूटा पाइप', 'मैनहोल', 'टूटी सड़क', 'स्वच्छता'],
    cg: ['खड्डा', 'सड़क', 'बिजली', 'नाली', 'कचरा', 'सड़क के बत्ती', 'पानी सप्लाई', 'बिजली कट', 'टूटे पाइप', 'टूटे सड़क']
  },
  P4: {
    en: ['park', 'noise', 'beautification', 'playground', 'painting', 'garden', 'pollution', 'stray animals', 'dogs barking', 'maintenance', 'tree cutting', 'parking'],
    hi: ['पार्क', 'शोर', 'सौंदर्यीकरण', 'खेल का मैदान', 'पेंटिंग', 'बगीचा', 'प्रदूषण', 'आवारा जानवर', 'कुत्ते भौंक रहे', 'रखरखाव', 'पेड़ काटना', 'पार्किंग'],
    cg: ['पार्क', 'सोर', 'खेल के मैदान', 'बगीचा', 'प्रदूषण', 'आवारा जानवर', 'कुत्ता भूंकत हवय', 'रखरखाव', 'पार्किंग']
  }
};

export function classifySeverity(description) {
  if (!description) return 'P3';
  
  const text = description.toLowerCase();
  
  // Check each severity level in order (P0 first, then P1, etc.)
  for (const [severity, languages] of Object.entries(severityKeywords)) {
    for (const keywords of Object.values(languages)) {
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          return severity;
        }
      }
    }
  }
  
  // Default to P3 (infrastructure)
  return 'P3';
}

export function getSeverityLabel(severity, lang = 'en') {
  const labels = {
    en: {
      P0: 'Life Threat',
      P1: 'Basic Needs',
      P2: 'Safety & Rights',
      P3: 'Infrastructure',
      P4: 'Quality of Life'
    },
    hi: {
      P0: 'जान का खतरा',
      P1: 'मूलभूत आवश्यकताएँ',
      P2: 'सुरक्षा और अधिकार',
      P3: 'बुनियादी ढाँचा',
      P4: 'जीवन की गुणवत्ता'
    },
    cg: {
      P0: 'जान के खतरा',
      P1: 'मूलभूत जरूरत',
      P2: 'सुरक्षा अउ हक',
      P3: 'बुनियादी ढाँचा',
      P4: 'जीवन के गुणवत्ता'
    }
  };
  
  return labels[lang]?.[severity] || labels.en[severity];
}

export function getSeverityColor(severity) {
  const colors = {
    P0: 'bg-red-500 text-white',
    P1: 'bg-orange-500 text-white',
    P2: 'bg-yellow-500 text-gray-900',
    P3: 'bg-blue-500 text-white',
    P4: 'bg-gray-400 text-white'
  };
  return colors[severity] || colors.P3;
}

export function getSeverityPulse(severity) {
  return severity === 'P0' ? 'animate-pulse' : '';
}
