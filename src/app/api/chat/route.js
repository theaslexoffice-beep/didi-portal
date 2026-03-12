import { NextResponse } from 'next/server';
import { saveChatMessage, getChatHistory } from '@/lib/db';

// DIDI's personality-driven responses
const DIDI_SYSTEM = {
  en: `You are DIDI, a caring elder sister figure from Bilaspur, Chhattisgarh. You are warm, empathetic, supportive, and solutions-oriented. You help citizens with their problems — whether it's land disputes, police matters, school issues, or any other grievance. You speak in a friendly, personal tone. You guide people on their rights, suggest filing complaints on the portal, and reassure them that their voice matters. You are NOT a government official — you are a citizen's ally. Keep responses short and helpful. If someone shares a serious problem, acknowledge their pain and suggest next steps.`,
  hi: `तुम दीदी हो — बिलासपुर, छत्तीसगढ़ की एक प्यारी बड़ी बहन। तुम गर्मजोशी से भरी, सहानुभूतिपूर्ण, सहायक और समाधान-उन्मुख हो। तुम नागरिकों को उनकी समस्याओं में मदद करती हो — चाहे भूमि विवाद हो, पुलिस मामला, स्कूल समस्या, या कोई भी शिकायत। तुम दोस्ताना और व्यक्तिगत लहजे में बात करती हो। लोगों को उनके अधिकारों के बारे में बताती हो, पोर्टल पर शिकायत दर्ज करने का सुझाव देती हो। जवाब छोटे और मददगार रखो।`,
  cg: `तैं दीदी आस — बिलासपुर, छत्तीसगढ़ के एक मयारू बड़े बहिनी। तैं गरमी ले भरे, दया वाली, मदद करइया अउ समाधान खोजइया आस। तैं नागरिक मन ला उँखर समस्या म मदद करथस। तैं दोस्ताना अउ अपन भासा म बात करथस। मनखे मन ला उँखर हक़ बारे म बतावस, पोर्टल म शिकायत दर्ज करे के सुझाव देवस। जवाब छोटे अउ काम के रखव।`,
};

function generateDidiResponse(message, lang = 'en') {
  const msg = message.toLowerCase();
  const l = lang;

  // Contextual responses based on keywords
  if (msg.includes('land') || msg.includes('जमीन') || msg.includes('भूइँ') || msg.includes('property')) {
    const responses = {
      en: "I understand land and property issues can be very stressful. 💛 Here's what I suggest:\n\n1. **File a complaint** on our portal with all details and documents\n2. Keep copies of your land records, sale deed, and any correspondence\n3. You have the right to file an RTI to know the status of your application\n4. If needed, we can help connect you with legal aid for filing a writ petition\n\nDon't worry — you're not alone in this. Share the details and we'll fight together! 💪",
      hi: "मैं समझती हूँ कि जमीन की समस्या बहुत तनावपूर्ण होती है। 💛 मेरा सुझाव है:\n\n1. हमारे पोर्टल पर सभी दस्तावेज़ों के साथ **शिकायत दर्ज करें**\n2. अपने भूमि रिकॉर्ड, बिक्री विलेख की प्रतियाँ रखें\n3. आप RTI दायर करके अपने आवेदन की स्थिति जान सकते हैं\n4. ज़रूरत पड़ने पर हम क़ानूनी सहायता से जोड़ सकते हैं\n\nचिंता मत करो — तुम अकेले नहीं हो! 💪",
      cg: "मैं समझत हवन कि जमीन के झगरा बहुत तनाव वाला होथे। 💛 मोर सुझाव हे:\n\n1. हमर पोर्टल म सब कागजात संग **शिकायत दर्ज करव**\n2. अपन भूमि रिकॉर्ड, बिक्री पत्र के नकल रखव\n3. तुमन RTI दायर करके अपन आवेदन के हाल जान सकत हव\n4. जरूरत पड़े ले हमन क़ानूनी मदद ले जोड़बो\n\nचिंता झन करव — तुमन अकेले नइ हव! 💪",
    };
    return responses[l] || responses.en;
  }

  if (msg.includes('police') || msg.includes('arrest') || msg.includes('पुलिस') || msg.includes('गिरफ्तार')) {
    const responses = {
      en: "Police matters are serious. 🙏 Here's what you should know:\n\n1. **File a complaint immediately** on our portal — document everything\n2. If someone is wrongly arrested, they have the right to legal representation\n3. The family should be informed within 24 hours of arrest\n4. We can help connect you with free legal aid services\n\nPlease share the full details — I will make sure your voice reaches the right people.",
      hi: "पुलिस मामले गंभीर हैं। 🙏 ये जानना ज़रूरी है:\n\n1. हमारे पोर्टल पर **तुरंत शिकायत दर्ज करें** — सब कुछ दस्तावेज़ करें\n2. गलत गिरफ्तारी में हर व्यक्ति को वकील का अधिकार है\n3. गिरफ्तारी के 24 घंटे में परिवार को सूचित किया जाना चाहिए\n4. हम मुफ्त कानूनी सहायता से जोड़ सकते हैं\n\nपूरी जानकारी बताएँ — मैं आपकी आवाज़ सही लोगों तक पहुँचाऊँगी।",
      cg: "पुलिस मामला गंभीर हे। 🙏 ये जाने बर जरूरी हे:\n\n1. हमर पोर्टल म **तुरंत शिकायत दर्ज करव**\n2. गलत गिरफ्तारी म हर मनखे ला वकील के हक़ हे\n3. गिरफ्तारी के 24 घंटा म परिवार ला बताना जरूरी हे\n4. हमन मुफ्त कानूनी मदद ले जोड़बो\n\nपूरा बात बतावव — मैं तुँहर आवाज़ सही जगह पहुँचाहूँ।",
    };
    return responses[l] || responses.en;
  }

  if (msg.includes('school') || msg.includes('teacher') || msg.includes('education') || msg.includes('स्कूल') || msg.includes('शिक्षा') || msg.includes('पढ़ई')) {
    const responses = {
      en: "Education problems affect our children's future. 📚 Here's what we can do:\n\n1. **Document the issue** — what exactly is happening at the school?\n2. File a complaint on our portal with details\n3. We will escalate to the District Education Officer\n4. Every child has the Right to Education — this is non-negotiable\n\nTell me more about what's happening — DIDI will make sure someone listens.",
      hi: "शिक्षा की समस्या बच्चों के भविष्य को प्रभावित करती है। 📚\n\n1. **समस्या दर्ज करें** — स्कूल में ठीक से क्या हो रहा है?\n2. पोर्टल पर शिकायत दर्ज करें\n3. हम ज़िला शिक्षा अधिकारी तक पहुँचाएँगे\n4. हर बच्चे को शिक्षा का अधिकार है\n\nबताइए क्या हो रहा है — दीदी सुनिश्चित करेगी कि कोई सुने।",
      cg: "पढ़ई के समस्या लइका मन के भविष्य खराब करथे। 📚\n\n1. **समस्या लिखव** — स्कूल म ठीक से का होवत हे?\n2. पोर्टल म शिकायत दर्ज करव\n3. हमन ज़िला शिक्षा अफसर तक पहुँचाबो\n4. हर लइका ला पढ़ई के हक़ हे\n\nबतावव का होवत हे — दीदी देखही कि कोई सुने।",
    };
    return responses[l] || responses.en;
  }

  if (msg.includes('help') || msg.includes('मदद') || msg.includes('कइसे')) {
    const responses = {
      en: "Of course, I'm here to help! Here's how DIDI works:\n\n1. 📝 **Submit a complaint** on our portal — just need your WhatsApp number and problem description\n2. 👀 Our team reviews and verifies every complaint\n3. 📬 We escalate to the right authorities via official letters and emails\n4. 📱 You get updates on WhatsApp\n5. 📢 If authorities don't respond, we amplify on social media\n\nWhat would you like to do?",
      hi: "बिल्कुल, मैं मदद के लिए यहाँ हूँ! दीदी ऐसे काम करती है:\n\n1. 📝 पोर्टल पर **शिकायत दर्ज करें** — बस व्हाट्सएप नंबर और समस्या बतानी है\n2. 👀 हमारी टीम हर शिकायत की जाँच करती है\n3. 📬 हम सही अधिकारियों को पत्र और ईमेल भेजते हैं\n4. 📱 व्हाट्सएप पर अपडेट मिलता है\n5. 📢 अगर अधिकारी जवाब नहीं दें तो सोशल मीडिया पर आवाज़ उठाते हैं\n\nआप क्या करना चाहेंगे?",
      cg: "बिलकुल, मैं मदद बर इहाँ हवन! दीदी अइसे काम करथे:\n\n1. 📝 पोर्टल म **शिकायत दर्ज करव** — बस व्हाट्सएप नंबर अउ समस्या बतावव\n2. 👀 हमर टीम हर शिकायत जाँचथे\n3. 📬 हमन सही अफसर ला चिट्ठी अउ ईमेल भेजथन\n4. 📱 व्हाट्सएप म अपडेट मिलही\n5. 📢 अफसर जवाब नइ दें त सोशल मीडिया म आवाज़ उठाथन\n\nतुमन का करना चाहत हव?",
    };
    return responses[l] || responses.en;
  }

  // Default empathetic response
  const defaults = {
    en: "I hear you. 🙏 Thank you for sharing this with me. Every problem matters, and you're brave for speaking up.\n\nI'd suggest:\n1. **Submit a formal complaint** on our portal so we can track and escalate it\n2. Include any photos, documents, or details that support your case\n3. We'll follow up with the relevant authorities\n\nRemember — you're not alone. DIDI is with you. 💪",
    hi: "मैं सुन रही हूँ। 🙏 मुझसे बताने के लिए धन्यवाद। हर समस्या मायने रखती है, और बोलने की हिम्मत रखना बहादुरी है।\n\nमेरा सुझाव:\n1. पोर्टल पर **शिकायत दर्ज करें** ताकि हम इसे ट्रैक और आगे बढ़ा सकें\n2. कोई भी फ़ोटो, दस्तावेज़ या जानकारी शामिल करें\n3. हम संबंधित अधिकारियों से संपर्क करेंगे\n\nयाद रखो — तुम अकेले नहीं हो। दीदी तुम्हारे साथ है। 💪",
    cg: "मैं सुनत हवन। 🙏 मोला बताए बर धन्यवाद। हर समस्या मायने रखथे, अउ बोले के हिम्मत रखना बहादुरी आय।\n\nमोर सुझाव:\n1. पोर्टल म **शिकायत दर्ज करव** ताकि हमन इला ट्रैक अउ आगे बढ़ा सकन\n2. कोनो फ़ोटो, कागजात या जानकारी जोड़व\n3. हमन सही अफसर ले संपर्क करबो\n\nयाद रखव — तुमन अकेले नइ हव। दीदी तुँहर संग हे। 💪",
  };
  return defaults[l] || defaults.en;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, sessionId, lang } = body;

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Message and sessionId required' }, { status: 400 });
    }

    // Save user message
    saveChatMessage(sessionId, 'user', message, lang || 'en');

    // Generate DIDI response
    const response = generateDidiResponse(message, lang || 'en');

    // Save bot response
    saveChatMessage(sessionId, 'didi', response, lang || 'en');

    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
