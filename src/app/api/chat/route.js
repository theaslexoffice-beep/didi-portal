import { NextResponse } from 'next/server';
import * as db from '@/lib/data';

// Simple keyword-based chatbot responses
function getDidiResponse(message, language = 'en') {
  const msg = message.toLowerCase();
  
  // Language-specific responses
  const responses = {
    en: {
      greeting: "Namaste! 🙏 I am DIDI, your elder sister. How can I help you today?",
      complaint: "I understand you want to report an issue. Let me help you file a complaint. Please describe the problem.",
      scheme: "I can help you find government schemes you're eligible for! Tell me about yourself - your age, income, and what help you need.",
      legal: "For legal help, I can draft RTI applications, legal notices, and even writ petitions. What legal issue are you facing?",
      emergency: "🚨 This sounds urgent! Call 112 immediately. I'll also find nearby helpers for you.",
      default: "I'm here to help with: 📝 Complaints, 🎁 Schemes, ⚖️ Legal help, 🆘 Emergencies. What do you need?"
    },
    hi: {
      greeting: "नमस्ते! 🙏 मैं DIDI हूँ, आपकी बड़ी बहन। मैं आपकी कैसे मदद कर सकती हूँ?",
      complaint: "मैं समझती हूँ कि आप शिकायत दर्ज करना चाहते हैं। कृपया समस्या बताएं।",
      scheme: "मैं आपको योजनाएँ खोजने में मदद कर सकती हूँ! अपने बारे में बताएं - उम्र, आय, क्या मदद चाहिए।",
      legal: "कानूनी मदद के लिए मैं RTI, नोटिस, याचिका तैयार कर सकती हूँ। कौन सी कानूनी समस्या है?",
      emergency: "🚨 यह जरूरी लगता है! तुरंत 112 पर कॉल करें। मैं आस-पास के सहायकों को भी खोजूंगी।",
      default: "मैं इनमें मदद कर सकती हूँ: 📝 शिकायत, 🎁 योजनाएं, ⚖️ कानूनी सहायता, 🆘 आपातकाल। क्या चाहिए?"
    },
    cg: {
      greeting: "नमस्कार! 🙏 मैं DIDI हवं, तुम्हार बड़े बहिनी। का मदद करं?",
      complaint: "मैं समझत हवं कि तैं शिकायत करना चाहत हस। समस्या बता।",
      scheme: "मैं योजना खोजे म मदद कर सकत हवं! अपन बारे म बता - उमर, आय, का मदद चाही।",
      legal: "कानूनी मदद बर मैं RTI, नोटिस, याचिका बना सकत हवं। का कानूनी परेसानी हे?",
      emergency: "🚨 ए जरूरी लगत हे! तुरंत 112 फोन कर। मैं लगे-पास के मदद करइया ल खोजूं।",
      default: "मैं इहाँ मदद कर सकत हवं: 📝 शिकायत, 🎁 योजना, ⚖️ कानूनी मदद, 🆘 आपातकाल। का चाही?"
    }
  };

  const r = responses[language] || responses.en;
  
  // Keyword matching
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('नमस्ते')) {
    return { response: r.greeting, suggestions: ['File complaint', 'Find schemes', 'Legal help'] };
  }
  
  if (msg.includes('complaint') || msg.includes('problem') || msg.includes('issue') || 
      msg.includes('शिकायत') || msg.includes('समस्या')) {
    return { response: r.complaint, suggestions: ['Health', 'Road', 'Water', 'Electricity', 'Safety'] };
  }
  
  if (msg.includes('scheme') || msg.includes('योजना') || msg.includes('benefit') || msg.includes('सहायता')) {
    return { response: r.scheme, suggestions: ['PM-KISAN', 'Ayushman Bharat', 'PM Awas', 'Pension'] };
  }
  
  if (msg.includes('legal') || msg.includes('rti') || msg.includes('court') || 
      msg.includes('कानूनी') || msg.includes('नोटिस')) {
    return { response: r.legal, suggestions: ['RTI Application', 'Legal Notice', 'Writ Petition', 'CPGRAMS'] };
  }
  
  if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('help') ||
      msg.includes('आपातकाल') || msg.includes('जरूरी') || msg.includes('accident') || msg.includes('fire')) {
    return { response: r.emergency, suggestions: ['Call 112', 'Find hospital', 'Find police'] };
  }
  
  return { response: r.default, suggestions: ['Complaint', 'Schemes', 'Legal', 'Emergency'] };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, citizen_id, language } = body;

    // Validate required fields
    if (!message || !citizen_id) {
      return NextResponse.json(
        { success: false, error: 'Message and citizen_id are required' },
        { status: 400 }
      );
    }

    // Save user message
    await db.saveChatMessage({
      citizen_id,
      message,
      sender: 'user',
      language: language || 'en'
    });

    // Generate DIDI response
    const { response, suggestions } = getDidiResponse(message, language || 'en');

    // Save DIDI response
    await db.saveChatMessage({
      citizen_id,
      message: response,
      sender: 'didi',
      language: language || 'en'
    });

    return NextResponse.json({
      success: true,
      data: {
        response,
        suggestions,
        language: language || 'en'
      }
    });
  } catch (error) {
    console.error('POST /api/chat error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
