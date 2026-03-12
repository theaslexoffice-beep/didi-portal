-- DIDI 2.0 Government Schemes Seed Data
-- Auto-generated from src/lib/seed-schemes.js
-- Total schemes: 58
-- Run this AFTER migration.sql

-- 1. Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
  'प्रधानमंत्री किसान सम्मान निधि',
  'Direct income support of ₹6,000 per year to small and marginal farmer families, paid in three equal installments of ₹2,000 each.',
  'छोटे और सीमांत किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, ₹2,000 की तीन समान किस्तों में।',
  'Ministry of Agriculture & Farmers Welfare',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["farmer"],"land_required":true,"special_conditions":"Must own cultivable land. Excludes institutional landholders, income tax payers, government employees."}',
  '₹6,000/year in 3 installments of ₹2,000 directly to bank account',
  'https://pmkisan.gov.in/',
  '["Aadhaar Card","Bank Account (linked to Aadhaar)","Land ownership documents / Khasra-Khatauni","Mobile number"]',
  'agriculture'
);

-- 2. Pradhan Mantri Fasal Bima Yojana (PMFBY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
  'प्रधानमंत्री फसल बीमा योजना',
  'Comprehensive crop insurance covering pre-sowing to post-harvest losses due to natural calamities, pests, and diseases. Premium: 2% for Kharif, 1.5% for Rabi, 5% for horticulture.',
  'प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण बुवाई से पहले से लेकर कटाई के बाद तक के नुकसान को कवर करने वाली व्यापक फसल बीमा।',
  'Ministry of Agriculture & Farmers Welfare',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["farmer"],"land_required":true,"special_conditions":"Both loanee and non-loanee farmers eligible. Compulsory for loanee farmers."}',
  'Up to 90% premium subsidy; full sum insured for crop loss due to natural calamities',
  'https://pmfby.gov.in/',
  '["Aadhaar Card","Land records (Khasra/Khatauni)","Sowing certificate","Bank account details"]',
  'agriculture'
);

-- 3. Kisan Credit Card (KCC)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Kisan Credit Card (KCC)',
  'किसान क्रेडिट कार्ड',
  'Credit facility for farmers to meet short-term credit requirements for cultivation, post-harvest expenses, and consumption needs. Interest subvention of 2%, additional 3% prompt repayment incentive.',
  'किसानों के लिए खेती, कटाई के बाद के खर्च और उपभोग की जरूरतों के लिए अल्पकालिक ऋण सुविधा।',
  'Ministry of Agriculture & Farmers Welfare / Department of Financial Services',
  'central',
  '{"age_min":18,"age_max":75,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["farmer","sharecropper","tenant_farmer"],"land_required":false,"special_conditions":"Farmers, tenant farmers, oral lessees, and sharecroppers eligible. Fishery and animal husbandry farmers also covered."}',
  'Credit limit up to ₹3 lakh; effective interest rate 4% for timely repayment; accidental insurance cover ₹50,000',
  'https://pmkisan.gov.in/Rpt_KCC_Progressive.aspx',
  '["Aadhaar Card","Land records / lease agreement","Bank account passbook","Passport-size photo"]',
  'agriculture'
);

-- 4. Soil Health Card Scheme
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Soil Health Card Scheme',
  'मृदा स्वास्थ्य कार्ड योजना',
  'Free soil testing and health card issued to farmers every 2 years with recommendations for nutrient management to improve soil health and crop productivity.',
  'किसानों को मिट्टी की स्वास्थ्य और फसल उत्पादकता में सुधार के लिए मुफ्त मिट्टी परीक्षण और सिफारिशें।',
  'Ministry of Agriculture & Farmers Welfare',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["farmer"],"land_required":true,"special_conditions":"All farmers owning agricultural land eligible."}',
  'Free soil testing; personalized soil health card with fertilizer recommendations',
  'https://soilhealth.dac.gov.in/',
  '["Land ownership documents","Aadhaar Card","Soil sample"]',
  'agriculture'
);

-- 5. PM Kisan Maandhan Yojana (Old Age Pension for Farmers)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'PM Kisan Maandhan Yojana (Old Age Pension for Farmers)',
  'प्रधानमंत्री किसान मानधन योजना',
  'Voluntary pension scheme for small and marginal farmers (18-40 years). Monthly contribution ₹55-200 based on age. ₹3,000/month pension after 60 years.',
  'छोटे और सीमांत किसानों के लिए स्वैच्छिक पेंशन योजना। 60 वर्ष के बाद ₹3,000/माह पेंशन।',
  'Ministry of Agriculture & Farmers Welfare',
  'central',
  '{"age_min":18,"age_max":40,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["farmer"],"land_required":true,"special_conditions":"Landholding up to 2 hectares; not covered under NPS/EPFO/ESIC; not income tax payer."}',
  '₹3,000/month pension after 60 years; family pension ₹1,500/month if subscriber dies',
  'https://maandhan.in/',
  '["Aadhaar Card","Land records (showing land up to 2 hectares)","Bank account passbook or cheque","IFSC code"]',
  'agriculture'
);

-- 6. Rajiv Gandhi Kisan Nyay Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Rajiv Gandhi Kisan Nyay Yojana (Chhattisgarh)',
  'राजीव गांधी किसान न्याय योजना',
  'Chhattisgarh state scheme providing input subsidy of ₹9,000 per acre to farmers growing paddy, maize, sugarcane, and arhar on their land.',
  'छत्तीसगढ़ राज्य योजना जो धान, मक्का, गन्ना और अरहर उगाने वाले किसानों को ₹9,000 प्रति एकड़ इनपुट सब्सिडी प्रदान करती है।',
  'Department of Agriculture, Chhattisgarh Government',
  'state',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":["farmer"],"land_required":true,"special_conditions":"Farmers of Chhattisgarh who grow paddy, maize, sugarcane, or arhar (pigeon pea) on their land."}',
  '₹9,000 per acre input subsidy paid directly to bank account',
  'https://rgkny.cg.nic.in/',
  '["Aadhaar Card","Land records (B1/P2)","Bank account passbook","Crop details"]',
  'agriculture'
);

-- 7. Godhan Nyay Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Godhan Nyay Yojana (Chhattisgarh)',
  'गोधन न्याय योजना',
  'Chhattisgarh state scheme purchasing cow dung from cattle owners at ₹2 per kg. Dung used to make vermicompost and organic fertilizer.',
  'छत्तीसगढ़ राज्य योजना जो पशुपालकों से ₹2 प्रति किलोग्राम की दर से गोबर खरीदती है। गोबर से वर्मीकम्पोस्ट और जैविक खाद बनाई जाती है।',
  'Department of Agriculture, Chhattisgarh Government',
  'state',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":["cattle_owner","farmer"],"land_required":false,"special_conditions":"Must own cattle (cow/buffalo). Can sell cow dung at Gauthans (cow shelters)."}',
  '₹2 per kg for cow dung; regular income for cattle owners',
  'https://godhannyay.cgstate.gov.in/',
  '["Aadhaar Card","Bank account details","Cattle ownership proof (if available)"]',
  'agriculture'
);

-- 8. Rajiv Gandhi Gramin Bhumiheen Krishi Mazdoor Nyay Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Rajiv Gandhi Gramin Bhumiheen Krishi Mazdoor Nyay Yojana (Chhattisgarh)',
  'राजीव गांधी ग्रामीण भूमिहीन कृषि मजदूर न्याय योजना',
  'Chhattisgarh state scheme providing ₹6,000/year financial assistance to landless agricultural labourers.',
  'छत्तीसगढ़ राज्य योजना जो भूमिहीन कृषि मजदूरों को ₹6,000/वर्ष वित्तीय सहायता प्रदान करती है।',
  'Department of Agriculture, Chhattisgarh Government',
  'state',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":["agricultural_labourer"],"land_required":false,"special_conditions":"Landless agricultural labourers; must not own agricultural land."}',
  '₹6,000 per year directly to bank account',
  'https://rggbkmny.cg.nic.in/',
  '["Aadhaar Card","Bank account passbook","Self-declaration of being landless agricultural labourer"]',
  'agriculture'
);

-- 9. Pradhan Mantri Jan Arogya Yojana (PM-JAY / Ayushman Bharat)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Jan Arogya Yojana (PM-JAY / Ayushman Bharat)',
  'प्रधानमंत्री जन आरोग्य योजना (आयुष्मान भारत)',
  'World''s largest health insurance scheme providing ₹5 lakh per family per year for secondary and tertiary care hospitalization. Cashless treatment at empanelled hospitals.',
  'दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना जो द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार ₹5 लाख प्रति वर्ष प्रदान करती है।',
  'Ministry of Health & Family Welfare',
  'central',
  '{"age_min":0,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Based on SECC 2011 database. Automatic eligibility for families in deprivation categories (D1-D7) and occupational categories (11 types). Check eligibility at website."}',
  '₹5 lakh/family/year health cover; 1,949 procedures covered; pre and post hospitalization; no cap on family size or age',
  'https://pmjay.gov.in/',
  '["Aadhaar Card","Ration Card","Mobile number","Family ID verification at hospital"]',
  'health'
);

-- 10. Pradhan Mantri Matru Vandana Yojana (PMMVY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
  'प्रधानमंत्री मातृ वंदना योजना',
  'Direct cash benefit of ₹5,000 in three installments to pregnant women and lactating mothers for first living child. Compensates wage loss and ensures proper nutrition.',
  'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को पहले जीवित बच्चे के लिए तीन किस्तों में ₹5,000 की प्रत्यक्ष नकद सहायता।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":18,"age_max":45,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Pregnant women and lactating mothers for first living child. Excludes government employees and those under other similar schemes."}',
  '₹5,000 in 3 installments: ₹1,000 (early registration), ₹2,000 (6 months pregnancy after 1 ANC), ₹2,000 (after child birth & 1st vaccination)',
  'https://pmmvy.wcd.gov.in/',
  '["Aadhaar Card","Bank account or Post Office passbook","MCP Card (Mother & Child Protection)","Identity proof"]',
  'health'
);

-- 11. Rashtriya Swasthya Bima Yojana (RSBY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Rashtriya Swasthya Bima Yojana (RSBY)',
  'राष्ट्रीय स्वास्थ्य बीमा योजना',
  'Health insurance scheme for BPL families. Now largely merged into PM-JAY in most states. Provides hospitalization cover.',
  'बीपीएल परिवारों के लिए स्वास्थ्य बीमा योजना। अधिकांश राज्यों में अब PM-JAY में विलय।',
  'Ministry of Labour & Employment (now under PM-JAY)',
  'central',
  '{"age_min":0,"age_max":100,"income_max":null,"categories":["below_poverty_line"],"gender":["male","female"],"states":["select_states"],"occupation":null,"land_required":false,"special_conditions":"BPL families; largely replaced by PM-JAY. Check state implementation."}',
  'Hospitalization cover (varies by state); merged with PM-JAY in most states',
  'https://pmjay.gov.in/',
  '["BPL Card","Aadhaar Card","Ration Card"]',
  'health'
);

-- 12. Janani Suraksha Yojana (JSY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Janani Suraksha Yojana (JSY)',
  'जननी सुरक्षा योजना',
  'Safe motherhood intervention promoting institutional delivery. Cash assistance: Rural ₹1,400, Urban ₹1,000. Integrated with ASHA workers.',
  'संस्थागत प्रसव को बढ़ावा देने वाला सुरक्षित मातृत्व हस्तक्षेप। नकद सहायता: ग्रामीण ₹1,400, शहरी ₹1,000।',
  'Ministry of Health & Family Welfare',
  'central',
  '{"age_min":18,"age_max":45,"income_max":null,"categories":["below_poverty_line","sc","st"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Pregnant women from BPL families. All pregnant women in Low Performing States (LPS). Age >= 19 years."}',
  'Cash assistance: Rural LPS ₹1,400, Rural HPS ₹700; Urban ₹1,000; ASHA incentive ₹600 (rural) / ₹400 (urban)',
  'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
  '["BPL Card / SECC list","Aadhaar Card","Bank account","MCP Card"]',
  'health'
);

-- 13. Rashtriya Bal Swasthya Karyakram (RBSK)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Rashtriya Bal Swasthya Karyakram (RBSK)',
  'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम',
  'Child health screening and early intervention for 4 Ds: Defects at birth, Deficiencies, Diseases, Development delays. Free screening at schools and Anganwadis.',
  'बच्चों की स्वास्थ्य जांच और शीघ्र हस्तक्षेप: जन्म दोष, कमियां, बीमारियां, विकास में देरी। स्कूलों और आंगनवाड़ियों में मुफ्त जांच।',
  'Ministry of Health & Family Welfare',
  'central',
  '{"age_min":0,"age_max":18,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Children from birth to 18 years; free health screening at schools and Anganwadi centres."}',
  'Free health screening; referral for treatment; surgery and management of conditions',
  'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=819&lid=221',
  '["School enrollment / Anganwadi registration","Aadhaar (if available)"]',
  'health'
);

-- 14. National Programme for Prevention and Control of Cancer, Diabetes, CVD & Stroke (NPCDCS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Programme for Prevention and Control of Cancer, Diabetes, CVD & Stroke (NPCDCS)',
  'राष्ट्रीय कैंसर, मधुमेह, हृदय रोग और स्ट्रोक रोकथाम और नियंत्रण कार्यक्रम',
  'Opportunistic screening for diabetes, hypertension, and common cancers at primary health centres. Early diagnosis and treatment.',
  'प्राथमिक स्वास्थ्य केंद्रों पर मधुमेह, उच्च रक्तचाप और सामान्य कैंसर की जांच। शीघ्र निदान और उपचार।',
  'Ministry of Health & Family Welfare',
  'central',
  '{"age_min":30,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Individuals above 30 years for diabetes/hypertension screening; specific protocols for cancer screening."}',
  'Free screening at government health facilities; early detection; referral for treatment',
  'https://dghs.gov.in/content/1363_3_NationalProgrammePreventionControl.aspx',
  '["Aadhaar Card (for registration)","No documents required for screening at PHC"]',
  'health'
);

-- 15. Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
  'प्रधानमंत्री सुरक्षित मातृत्व अभियान',
  'Free antenatal care (ANC) on 9th of every month at government health facilities. Minimum package includes blood/urine tests, BP, weight, ultrasound, IFA tablets.',
  'सरकारी स्वास्थ्य सुविधाओं पर हर महीने की 9 तारीख को मुफ्त प्रसवपूर्व देखभाल। न्यूनतम पैकेज में रक्त/मूत्र परीक्षण, बीपी, वजन, अल्ट्रासाउंड, आयरन की गोलियां शामिल।',
  'Ministry of Health & Family Welfare',
  'central',
  '{"age_min":18,"age_max":45,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"All pregnant women; ANC on 9th of every month at designated health facilities."}',
  'Free comprehensive ANC checkup including blood tests, BP, ultrasound, IFA tablets; high-risk pregnancy identification',
  'https://pmsma.nhp.gov.in/',
  '["MCP Card","Aadhaar Card (preferable)","Walk-in on 9th of month at nearest PHC/CHC"]',
  'health'
);

-- 16. Mukhyamantri Haat Bazaar Clinic Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Mukhyamantri Haat Bazaar Clinic Yojana (Chhattisgarh)',
  'मुख्यमंत्री हाट बाजार क्लीनिक योजना',
  'Chhattisgarh state scheme providing mobile health clinics in weekly rural markets (haats). Free OPD, basic medicines, diagnostic tests for rural population.',
  'छत्तीसगढ़ राज्य योजना जो साप्ताहिक ग्रामीण बाजारों (हाटों) में मोबाइल स्वास्थ्य क्लीनिक प्रदान करती है। ग्रामीण आबादी के लिए मुफ्त ओपीडी, बुनियादी दवाएं, नैदानिक ​​परीक्षण।',
  'Department of Health, Chhattisgarh Government',
  'state',
  '{"age_min":0,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Rural population of Chhattisgarh; clinics set up in weekly haats/bazaars."}',
  'Free OPD consultation; basic medicines; diagnostic tests; health screening',
  'https://cghealth.nic.in/',
  '["No documents required","Walk-in to mobile clinic on haat day"]',
  'health'
);

-- 17. Samagra Shiksha Abhiyan
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Samagra Shiksha Abhiyan',
  'समग्र शिक्षा अभियान',
  'Integrated scheme for school education from pre-school to Class 12. Free textbooks, uniforms, mid-day meals, teacher training, infrastructure development.',
  'प्री-स्कूल से कक्षा 12 तक स्कूली शिक्षा के लिए एकीकृत योजना। मुफ्त पाठ्यपुस्तकें, वर्दी, मध्याह्न भोजन, शिक्षक प्रशिक्षण, बुनियादी ढांचा विकास।',
  'Ministry of Education',
  'central',
  '{"age_min":3,"age_max":18,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"All children enrolled in government and government-aided schools."}',
  'Free textbooks; free uniforms; mid-day meals; quality improvement grants; infrastructure',
  'https://samagra.education.gov.in/',
  '["School enrollment","Birth certificate (for admission)"]',
  'education'
);

-- 18. PM POSHAN (Mid-Day Meal Scheme)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'PM POSHAN (Mid-Day Meal Scheme)',
  'प्रधानमंत्री पोषण (मध्याह्न भोजन योजना)',
  'Hot cooked meal provided to children in Classes 1-8 in government and aided schools. Aims to improve nutritional status and encourage school attendance.',
  'सरकारी और सहायता प्राप्त स्कूलों में कक्षा 1-8 के बच्चों को गर्म पका हुआ भोजन। पोषण स्थिति में सुधार और स्कूल उपस्थिति को प्रोत्साहित करना।',
  'Ministry of Education',
  'central',
  '{"age_min":6,"age_max":14,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Children studying in Classes 1-8 in government, government-aided, and local body schools."}',
  'Free nutritious hot cooked meal on all school days; minimum 200 days per year',
  'https://pmposhan.education.gov.in/',
  '["School enrollment (automatic coverage)"]',
  'education'
);

-- 19. National Scholarship Portal (NSP) - Pre-Matric Scholarship (SC/ST/OBC)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Scholarship Portal (NSP) - Pre-Matric Scholarship (SC/ST/OBC)',
  'राष्ट्रीय छात्रवृत्ति पोर्टल - प्री-मैट्रिक छात्रवृत्ति',
  'Scholarships for SC/ST/OBC students studying in Classes 9-10. Day scholars: ₹225-750/month; Hostellers: ₹525-1,200/month depending on class.',
  'कक्षा 9-10 में पढ़ने वाले अनुसूचित जाति/जनजाति/ओबीसी छात्रों के लिए छात्रवृत्ति। दिन विद्वान: ₹225-750/माह; छात्रावासी: ₹525-1,200/माह।',
  'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
  'central',
  '{"age_min":10,"age_max":18,"income_max":250000,"categories":["sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Students of SC/ST/OBC category in Classes 9-10; parental income up to ₹2.5 lakh/year; studying in government or recognized schools."}',
  'Class 9: ₹225-525/month; Class 10: ₹750-1,200/month (higher for hostellers)',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","Caste Certificate (SC/ST/OBC)","Income Certificate","Previous year marksheet","Bank account passbook","Bonafide certificate from school"]',
  'education'
);

-- 20. National Scholarship Portal (NSP) - Post-Matric Scholarship (SC/ST/OBC)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Scholarship Portal (NSP) - Post-Matric Scholarship (SC/ST/OBC)',
  'राष्ट्रीय छात्रवृत्ति पोर्टल - पोस्ट-मैट्रिक छात्रवृत्ति',
  'Scholarships for SC/ST/OBC students studying in Classes 11-12 and higher education. ₹230-1,200/month for day scholars; ₹380-3,800/month for hostellers.',
  'कक्षा 11-12 और उच्च शिक्षा में पढ़ने वाले अनुसूचित जाति/जनजाति/ओबीसी छात्रों के लिए छात्रवृत्ति।',
  'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
  'central',
  '{"age_min":16,"age_max":35,"income_max":250000,"categories":["sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"SC/ST/OBC students in post-matric courses (Class 11 onwards); parental income up to ₹2.5 lakh/year."}',
  'Class 11-12: ₹230-380/month; Graduation/PG: ₹550-3,800/month; Books/stationery allowance; study tour charges',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","Caste Certificate","Income Certificate","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'education'
);

-- 21. Sukanya Samriddhi Yojana
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Sukanya Samriddhi Yojana',
  'सुकन्या समृद्धि योजना',
  'Small deposit scheme for girl child under Beti Bachao Beti Padhao. 8.2% interest rate (tax-free). Can be opened till girl is 10 years old. Matures at 21 years.',
  'बेटी बचाओ बेटी पढ़ाओ के तहत बालिका के लिए छोटी जमा योजना। 8.2% ब्याज दर (कर मुक्त)। बालिका के 10 वर्ष की आयु तक खोला जा सकता है। 21 वर्ष में परिपक्व।',
  'Ministry of Finance / Ministry of Women & Child Development',
  'central',
  '{"age_min":0,"age_max":10,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Account opened by parent/guardian for girl child below 10 years. Maximum 2 accounts per family (3 if twins/triplets)."}',
  '8.2% annual interest (compounded yearly); tax-free under Sec 80C; maturity at 21 years; partial withdrawal allowed after 18',
  'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
  '["Birth certificate of girl child","Parent/Guardian Aadhaar Card","Address proof","Passport-size photo of girl child and parent","Minimum deposit ₹250"]',
  'education'
);

-- 22. Beti Bachao Beti Padhao
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Beti Bachao Beti Padhao',
  'बेटी बचाओ बेटी पढ़ाओ',
  'Campaign to address declining Child Sex Ratio and promote girls'' education. Implementation through multi-sectoral interventions including SSA scholarships and Sukanya Samriddhi.',
  'घटते बाल लिंगानुपात को संबोधित करने और बालिकाओं की शिक्षा को बढ़ावा देने के लिए अभियान।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":0,"age_max":18,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Girl children; awareness campaigns and scholarships under the umbrella campaign."}',
  'Awareness campaigns; integrated with scholarships and SSY; education support in target districts',
  'https://wcd.nic.in/bbbp-schemes',
  '["Varies by component","Birth certificate","School enrollment"]',
  'education'
);

-- 23. National Means-cum-Merit Scholarship (NMMS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Means-cum-Merit Scholarship (NMMS)',
  'राष्ट्रीय मींस-कम-मेरिट छात्रवृत्ति',
  'Scholarship for meritorious students of economically weaker sections studying in Class 9-12. ₹12,000/year (₹1,000/month for 12 months).',
  'आर्थिक रूप से कमजोर वर्गों के मेधावी छात्रों के लिए छात्रवृत्ति जो कक्षा 9-12 में पढ़ रहे हैं। ₹12,000/वर्ष।',
  'Ministry of Education',
  'central',
  '{"age_min":13,"age_max":18,"income_max":150000,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Students who passed Class 8 from government schools; parental income ≤ ₹1.5 lakh/year; must pass NMMS exam."}',
  '₹12,000 per year (₹1,000/month) for Classes 9-12',
  'https://scholarships.gov.in/',
  '["Class 8 marksheet (minimum 55% / 50% for SC/ST)","Income Certificate","Aadhaar Card","Bank account passbook","School bonafide certificate"]',
  'education'
);

-- 24. Swami Atmanand English Medium Schools (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Swami Atmanand English Medium Schools (Chhattisgarh)',
  'स्वामी आत्मानंद अंग्रेजी माध्यम स्कूल',
  'Chhattisgarh state government''s network of English-medium schools providing quality education at par with private schools. Free admission, books, and mid-day meals.',
  'छत्तीसगढ़ राज्य सरकार के अंग्रेजी माध्यम स्कूलों का नेटवर्क जो निजी स्कूलों के बराबर गुणवत्तापूर्ण शिक्षा प्रदान करता है। मुफ्त प्रवेश, किताबें और मध्याह्न भोजन।',
  'Department of Education, Chhattisgarh Government',
  'state',
  '{"age_min":3,"age_max":18,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Domicile of Chhattisgarh; admission through entrance test/lottery in competitive areas."}',
  'Free quality English-medium education; free textbooks; free uniforms; CBSE/CGBSE curriculum; modern infrastructure',
  'https://eduportal.cg.nic.in/',
  '["Birth certificate","Aadhaar Card","Address proof","Previous school TC (if applicable)","Passport-size photo"]',
  'education'
);

-- 25. Pradhan Mantri Awas Yojana - Gramin (PMAY-G)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
  'प्रधानमंत्री आवास योजना - ग्रामीण',
  'Financial assistance of ₹1.2 lakh (plain areas) or ₹1.3 lakh (hilly/difficult areas) for construction of pucca house with toilet in rural areas.',
  'ग्रामीण क्षेत्रों में शौचालय के साथ पक्का मकान बनाने के लिए ₹1.2 लाख (मैदानी क्षेत्र) या ₹1.3 लाख (पहाड़ी/कठिन क्षेत्र) की वित्तीय सहायता।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc","below_poverty_line"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Homeless or living in kutcha/dilapidated house; exclusion criteria: pucca house ownership, motorized vehicle, government employee, income tax payer."}',
  '₹1.2 lakh (plains) / ₹1.3 lakh (hilly) in installments; toilet construction assistance ₹12,000 (from SBM); 90/95 days MGNREGA wage employment',
  'https://pmayg.nic.in/',
  '["Aadhaar Card","Bank account passbook","SECC 2011 data verification","Job card (for MGNREGA wage benefit)","Sworn affidavit (no pucca house owned)"]',
  'housing'
);

-- 26. Pradhan Mantri Awas Yojana - Urban (PMAY-U)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
  'प्रधानमंत्री आवास योजना - शहरी',
  'Affordable housing for urban poor. 4 verticals: In-situ slum redevelopment, Credit Linked Subsidy (interest subsidy on home loans), Affordable Housing in Partnership, Beneficiary-led construction (₹1.5 lakh subsidy).',
  'शहरी गरीबों के लिए किफायती आवास। 4 घटक: स्वस्थाने झुग्गी पुनर्विकास, ऋण लिंक्ड सब्सिडी, साझेदारी में किफायती आवास, लाभार्थी-नेतृत्व निर्माण (₹1.5 लाख सब्सिडी)।',
  'Ministry of Housing & Urban Affairs',
  'central',
  '{"age_min":18,"age_max":70,"income_max":null,"categories":["general","sc","st","obc","ews","lig","mig"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"EWS (income up to ₹3 lakh/year), LIG (₹3-6 lakh), MIG-I (₹6-12 lakh), MIG-II (₹12-18 lakh); no pucca house in India in beneficiary or family name."}',
  'EWS/LIG: ₹1.5 lakh subsidy; MIG-I: ₹2.35 lakh interest subsidy; MIG-II: ₹2.30 lakh interest subsidy; depends on vertical',
  'https://pmaymis.gov.in/',
  '["Aadhaar Card","Income certificate","Bank account details","Affidavit (no pucca house owned)","Property documents (if applicable)","Caste certificate (if SC/ST/OBC)"]',
  'housing'
);

-- 27. Swachh Bharat Mission - Gramin (Toilet Construction)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Swachh Bharat Mission - Gramin (Toilet Construction)',
  'स्वच्छ भारत मिशन - ग्रामीण (शौचालय निर्माण)',
  'Financial incentive of ₹12,000 for construction of individual household latrines (IHHL) in rural areas. Eliminates open defecation.',
  'ग्रामीण क्षेत्रों में व्यक्तिगत घरेलू शौचालय (आईएचएचएल) के निर्माण के लिए ₹12,000 की वित्तीय प्रोत्साहन। खुले में शौच को समाप्त करता है।',
  'Ministry of Jal Shakti (Department of Drinking Water & Sanitation)',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Rural households without toilet; preference to SC/ST, small & marginal farmers, landless labourers, physically handicapped, women-headed households."}',
  '₹12,000 for toilet construction in installments; additional support for elderly/differently-abled',
  'https://swachhbharatmission.gov.in/sbmcms/index.htm',
  '["Aadhaar Card","Bank account passbook","Application through Gram Panchayat"]',
  'housing'
);

-- 28. Deendayal Antyodaya Yojana - National Urban Livelihoods Mission (Shelter for Urban Homeless)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Deendayal Antyodaya Yojana - National Urban Livelihoods Mission (Shelter for Urban Homeless)',
  'दीनदयाल अंत्योदय योजना - राष्ट्रीय शहरी आजीविका मिशन (शहरी बेघरों के लिए आश्रय)',
  'Provision of shelters equipped with basic amenities for urban homeless. Permanent shelters, community kitchens, and support services.',
  'शहरी बेघरों के लिए बुनियादी सुविधाओं से लैस आश्रयों का प्रावधान। स्थायी आश्रय, सामुदायिक रसोई और सहायता सेवाएं।',
  'Ministry of Housing & Urban Affairs',
  'central',
  '{"age_min":0,"age_max":100,"income_max":null,"categories":["urban_homeless","destitute"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Urban homeless persons; no permanent shelter."}',
  'Free shelter with dormitory beds, toilets, bathing facilities; community kitchen; counseling services',
  'https://nulm.gov.in/',
  '["No documents required for shelter access","Aadhaar (for enrollment in support programs)"]',
  'housing'
);

-- 29. Pradhan Mantri Ujjwala Yojana 2.0
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Ujjwala Yojana 2.0',
  'प्रधानमंत्री उज्ज्वला योजना 2.0',
  'Free LPG connection to women from poor households. Includes first refill and hotplate free of cost. Deposit-free LPG connection.',
  'गरीब परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन। पहला रिफिल और हॉटप्लेट मुफ्त। जमा-मुक्त एलपीजी कनेक्शन।',
  'Ministry of Petroleum & Natural Gas',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["below_poverty_line","sc","st","pmay","aay"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Women from SECC-2011 BPL families, PMAY beneficiaries, AAY, Most Backward Classes, forest dwellers, tea/ex-tea garden tribes, islands, river islands."}',
  'Free LPG connection (no security deposit); free first refill; free hotplate; EMI facility for stove',
  'https://www.pmuy.gov.in/',
  '["Aadhaar Card","BPL Card / PMAY proof / SECC verification","Bank account or Jan Dhan account","Address proof","Passport-size photo"]',
  'housing'
);

-- 30. Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
  'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम',
  'Legal guarantee of 100 days of wage employment per rural household per year. ₹221/day wage in Chhattisgarh (2024-25). Work within 5 km of residence or 10% extra wage.',
  'प्रति ग्रामीण परिवार प्रति वर्ष 100 दिनों के वेतन रोजगार की कानूनी गारंटी। छत्तीसगढ़ में ₹221/दिन मजदूरी (2024-25)। निवास के 5 किमी के भीतर काम या 10% अतिरिक्त मजदूरी।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["rural","unskilled_labour"],"land_required":false,"special_conditions":"Adult members of rural households willing to do unskilled manual work."}',
  '100 days guaranteed employment/household/year; ₹221/day in CG; unemployment allowance if work not provided within 15 days',
  'https://nrega.nic.in/',
  '["Job card application at Gram Panchayat","Aadhaar Card","Bank account details","Passport-size photo","Address proof"]',
  'employment'
);

-- 31. Pradhan Mantri MUDRA Yojana (Micro Units Development & Refinance Agency)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri MUDRA Yojana (Micro Units Development & Refinance Agency)',
  'प्रधानमंत्री मुद्रा योजना',
  'Collateral-free loans to micro/small enterprises and self-employed. 3 categories: Shishu (up to ₹50,000), Kishor (₹50,001 - ₹5 lakh), Tarun (₹5-10 lakh).',
  'सूक्ष्म/लघु उद्यमों और स्व-रोजगार के लिए संपार्श्विक-मुक्त ऋण। 3 श्रेणियां: शिशु (₹50,000 तक), किशोर (₹50,001 - ₹5 लाख), तरुण (₹5-10 लाख)।',
  'Ministry of Finance',
  'central',
  '{"age_min":18,"age_max":65,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["self_employed","micro_entrepreneur","small_business"],"land_required":false,"special_conditions":"Non-corporate, non-farm small/micro enterprises; income-generating activities in manufacturing, trading, services."}',
  'Shishu: up to ₹50,000; Kishor: ₹50,001-₹5 lakh; Tarun: ₹5-10 lakh; no collateral; reasonable interest rates',
  'https://www.mudra.org.in/',
  '["Business plan / project report","Aadhaar Card","PAN Card","Address proof","Bank statements (6 months)","Proof of business entity","Quotations for equipment (if applicable)"]',
  'employment'
);

-- 32. Stand-Up India Scheme
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Stand-Up India Scheme',
  'स्टैंड-अप इंडिया योजना',
  'Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs for greenfield enterprises in manufacturing, services, or trading.',
  'विनिर्माण, सेवाओं या व्यापार में ग्रीनफील्ड उद्यमों के लिए अनुसूचित जाति/जनजाति और महिला उद्यमियों के लिए ₹10 लाख से ₹1 करोड़ के बीच बैंक ऋण।',
  'Ministry of Finance',
  'central',
  '{"age_min":18,"age_max":65,"income_max":null,"categories":["sc","st","women"],"gender":["male","female"],"states":["all"],"occupation":["entrepreneur"],"land_required":false,"special_conditions":"At least one SC/ST and one woman entrepreneur per bank branch; for greenfield projects (new enterprises); manufacturing/services/trading sector."}',
  'Loan ₹10 lakh - ₹1 crore; repayment up to 7 years; handholding support through convergence with govt schemes',
  'https://www.standupmitra.in/',
  NULL,
  'employment'
);

-- 33. PM SVANidhi (PM Street Vendor's AtmaNirbhar Nidhi)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'PM SVANidhi (PM Street Vendor''s AtmaNirbhar Nidhi)',
  'प्रधानमंत्री स्वनिधि योजना',
  'Collateral-free working capital loan of ₹10,000 to street vendors. Interest subsidy @7% on timely repayment. Digital transaction cashback up to ₹100/month.',
  'फेरीवालों को ₹10,000 का संपार्श्विक-मुक्त कार्यशील पूंजी ऋण। समय पर चुकौती पर 7% ब्याज सब्सिडी। डिजिटल लेनदेन कैशबैक ₹100/माह तक।',
  'Ministry of Housing & Urban Affairs',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"special_conditions":"Street vendors vending in urban areas as on/before 24 March 2020; holding Certificate of Vending/Letter of Recommendation/ID Card"}',
  '₹10,000 working capital loan; 7% interest subsidy on timely repayment; digital transaction cashback ₹100/month; on repayment, eligible for ₹20,000 2nd loan',
  'https://pmsvanidhi.mohua.gov.in/',
  '["Aadhaar Card","Bank account passbook","Certificate of Vending / Letter of Recommendation from ULB / Survey ID","Passport-size photo"]',
  'employment'
);

-- 34. Pradhan Mantri Kaushal Vikas Yojana (PMKVY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
  'प्रधानमंत्री कौशल विकास योजना',
  'Skill training and certification program for Indian youth. Free training in 40+ sectors. Monetary reward of ₹8,000 on certification. Job fair/placement support.',
  'भारतीय युवाओं के लिए कौशल प्रशिक्षण और प्रमाणन कार्यक्रम। 40+ क्षेत्रों में मुफ्त प्रशिक्षण। प्रमाणन पर ₹8,000 का मौद्रिक पुरस्कार।',
  'Ministry of Skill Development & Entrepreneurship',
  'central',
  '{"age_min":15,"age_max":45,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["unemployed","school_dropout","college_dropout"],"land_required":false,"special_conditions":"Indian citizens; dropouts or unemployed youth; age 15-45 years typically (varies by course)"}',
  'Free skill training (150-600 hours); monetary reward ₹8,000 on certification; job placement assistance; government-recognized certificate',
  'https://www.pmkvyofficial.org/',
  '["Aadhaar Card","Educational qualification certificate (if any)","Bank account details","Passport-size photo"]',
  'employment'
);

-- 35. National Apprenticeship Promotion Scheme (NAPS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Apprenticeship Promotion Scheme (NAPS)',
  'राष्ट्रीय प्रशिक्षुता प्रोत्साहन योजना',
  'Promotes apprenticeship training by providing stipend support of 25% (max ₹1,500/month) to employers. Apprentices get hands-on training and stipend.',
  'प्रशिक्षुता प्रशिक्षण को बढ़ावा देता है, नियोक्ताओं को वृत्तिका सहायता का 25% (अधिकतम ₹1,500/माह) प्रदान करता है। प्रशिक्षुओं को व्यावहारिक प्रशिक्षण और वृत्तिका मिलती है।',
  'Ministry of Skill Development & Entrepreneurship',
  'central',
  '{"age_min":14,"age_max":40,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["student","job_seeker"],"land_required":false,"special_conditions":"Minimum 5th pass for optional trades; 8th pass for designated trades; freshers and existing workers can be apprentices"}',
  'Apprenticeship training 6 months to 4 years; stipend as per Apprenticeship Act (min ₹9,000-12,000/month); govt contribution 25% of stipend to employer',
  'https://apprenticeshipindia.gov.in/',
  '["Aadhaar Card","Educational certificates","Bank account details","Passport-size photo"]',
  'employment'
);

-- 36. Pradhan Mantri Vishwakarma Yojana
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Vishwakarma Yojana',
  'प्रधानमंत्री विश्वकर्मा योजना',
  'End-to-end support for artisans and craftspeople (18 traditional trades). Skill training, toolkit incentive ₹15,000, credit support up to ₹3 lakh at concessional rate, marketing support.',
  'कारीगरों और शिल्पकारों के लिए संपूर्ण सहायता (18 पारंपरिक व्यापार)। कौशल प्रशिक्षण, टूलकिट प्रोत्साहन ₹15,000, रियायती दर पर ₹3 लाख तक का ऋण, विपणन सहायता।',
  'Ministry of Micro, Small & Medium Enterprises',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["artisan","craftsperson","carpenter","blacksmith","goldsmith","weaver","sculptor","cobbler","mason","boat_maker","armorer","lock_smith","hammer_and_toolkit_maker","barber","garland_maker","washerman","tailor","fishing_net_maker"],"land_required":false,"special_conditions":"Engaged in respective trades; family-based traditional businesses; self-employed; not availed similar credit-based schemes in last 5 years"}',
  'Skill training + stipend ₹500/day; toolkit ₹15,000; 1st loan ₹1 lakh @ 5%; 2nd loan ₹2 lakh @ 5%; digital marketing; quality certification; brand promotion',
  'https://pmvishwakarma.gov.in/',
  '["Aadhaar Card","Proof of traditional trade/occupation (self-declaration or community certificate)","Bank account details","Mobile number"]',
  'employment'
);

-- 37. Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)',
  'दीनदयाल अंत्योदय योजना - राष्ट्रीय ग्रामीण आजीविका मिशन',
  'Poverty alleviation through SHG formation, skill training, bank linkage, and livelihood promotion for rural poor women.',
  'ग्रामीण गरीब महिलाओं के लिए एसएचजी गठन, कौशल प्रशिक्षण, बैंक लिंकेज और आजीविका संवर्धन के माध्यम से गरीबी उन्मूलन।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["below_poverty_line","rural_poor","women"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Rural poor households; preference to women; SHG formation mandatory for most benefits"}',
  'Revolving fund ₹15,000 per SHG; community investment fund ₹1-1.3 lakh; bank linkage; interest subvention; skill training; livelihood support',
  'https://nrlm.gov.in/',
  '["Aadhaar Card","Bank account details (SHG account)","SECC/BPL data","SHG registration documents"]',
  'employment'
);

-- 38. Deendayal Antyodaya Yojana - National Urban Livelihoods Mission (DAY-NULM)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Deendayal Antyodaya Yojana - National Urban Livelihoods Mission (DAY-NULM)',
  'दीनदयाल अंत्योदय योजना - राष्ट्रीय शहरी आजीविका मिशन',
  'Poverty reduction among urban poor through skill training, self-employment, shelters, and vendor support. SHG formation, bank credit linkage.',
  'कौशल प्रशिक्षण, स्व-रोजगार, आश्रय और विक्रेता सहायता के माध्यम से शहरी गरीबों के बीच गरीबी में कमी। एसएचजी गठन, बैंक ऋण लिंकेज।',
  'Ministry of Housing & Urban Affairs',
  'central',
  '{"age_min":18,"age_max":100,"income_max":null,"categories":["urban_poor","below_poverty_line"],"gender":["male","female"],"states":["all"],"occupation":["street_vendor","waste_picker","self_employed"],"land_required":false,"special_conditions":"Urban poor households; street vendors; waste pickers; urban homeless"}',
  'Skill training; subsidy for self-employment (15% general, 25% SC/ST); SHG revolving fund ₹10,000; interest subvention on bank loans; shelter for homeless',
  'https://nulm.gov.in/',
  '["Aadhaar Card","Address proof","Income certificate / BPL card","Bank account details"]',
  'employment'
);

-- 39. Mahtari Vandan Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Mahtari Vandan Yojana (Chhattisgarh)',
  'महतारी वंदन योजना',
  'Chhattisgarh state scheme providing ₹1,000 per month (₹12,000/year) to married women aged 21-60 years. Direct bank transfer. Empowering women financially.',
  'छत्तीसगढ़ राज्य योजना जो 21-60 वर्ष की विवाहित महिलाओं को ₹1,000 प्रति माह (₹12,000/वर्ष) प्रदान करती है। सीधे बैंक हस्तांतरण। महिलाओं को आर्थिक रूप से सशक्त बनाना।',
  'Department of Women & Child Development, Chhattisgarh Government',
  'state',
  '{"age_min":21,"age_max":60,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Married women resident of Chhattisgarh; age 21-60 years as on 1 January of scheme year"}',
  '₹1,000 per month (₹12,000 annually) directly to bank account',
  'https://mahtarivandan.cgstate.gov.in/',
  '["Aadhaar Card","Bank account passbook","Marriage certificate or affidavit","Address proof (Chhattisgarh)","Passport-size photo"]',
  'women'
);

-- 40. Pradhan Mantri Matru Vandana Yojana (PMMVY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
  'प्रधानमंत्री मातृ वंदना योजना',
  'Cash benefit of ₹5,000 in three installments to pregnant women and lactating mothers for first living child. Compensates wage loss and ensures proper nutrition.',
  'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को पहले जीवित बच्चे के लिए तीन किस्तों में ₹5,000 की नकद सहायता।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":18,"age_max":45,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Pregnant women and lactating mothers for first living child. Excludes government employees."}',
  '₹5,000 in 3 installments: ₹1,000 (early registration), ₹2,000 (after 1 ANC at 6 months), ₹2,000 (after child birth & vaccination)',
  'https://pmmvy.wcd.gov.in/',
  '["Aadhaar Card","Bank account passbook","MCP Card","Identity proof"]',
  'women'
);

-- 41. One Stop Centre Scheme (Sakhi)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'One Stop Centre Scheme (Sakhi)',
  'वन स्टॉप सेंटर योजना (सखी)',
  'Support to women affected by violence (domestic, sexual, emotional, psychological, economic). 24x7 helpline, temporary shelter, police assistance, legal aid, medical aid, counseling.',
  'हिंसा (घरेलू, यौन, भावनात्मक, मनोवैज्ञानिक, आर्थिक) से प्रभावित महिलाओं को सहायता। 24x7 हेल्पलाइन, अस्थायी आश्रय, पुलिस सहायता, कानूनी सहायता, चिकित्सा सहायता, परामर्श।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":0,"age_max":100,"income_max":null,"categories":["general","sc","st","obc"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Women affected by violence, irrespective of age, class, caste, religion, marital status"}',
  'Emergency response; temporary shelter (up to 5 days); police assistance; legal counseling; medical aid; psycho-social counseling; video conferencing for court',
  'https://wcd.nic.in/schemes/one-stop-centre-scheme-1',
  '["No documents required for emergency access","Contact nearest One Stop Centre or dial 181 (Women Helpline)"]',
  'women'
);

-- 42. National Creche Scheme
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Creche Scheme',
  'राष्ट्रीय शिशुगृह योजना',
  'Day care facilities for children (6 months to 6 years) of working mothers. Creches provide nutrition, early childhood education, health checkups, immunization tracking.',
  'कामकाजी माताओं के बच्चों (6 महीने से 6 वर्ष) के लिए दिन देखभाल सुविधाएं। शिशुगृह पोषण, प्रारंभिक बचपन शिक्षा, स्वास्थ्य जांच, टीकाकरण ट्रैकिंग प्रदान करते हैं।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":0.5,"age_max":6,"income_max":12000,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Children of working mothers earning up to ₹12,000/month; priority to children below 3 years"}',
  'Free day care 7.5-8 hours/day; nutritious food; early stimulation; health checkups; safe environment while mother works',
  'https://wcd.nic.in/schemes/national-creche-scheme-children-working-mothers',
  '["Mother''s employment certificate","Income certificate","Child''s birth certificate","Aadhaar Card (mother)","Address proof"]',
  'women'
);

-- 43. Integrated Child Development Services (ICDS) - Anganwadi Services
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Integrated Child Development Services (ICDS) - Anganwadi Services',
  'एकीकृत बाल विकास सेवाएं (आईसीडीएस) - आंगनवाड़ी सेवाएं',
  'Comprehensive package of services for children under 6 years and pregnant/lactating mothers: supplementary nutrition, immunization, health checkups, referral, preschool education.',
  '6 वर्ष से कम उम्र के बच्चों और गर्भवती/स्तनपान कराने वाली माताओं के लिए सेवाओं का व्यापक पैकेज: पूरक पोषण, टीकाकरण, स्वास्थ्य जांच, रेफरल, प्रीस्कूल शिक्षा।',
  'Ministry of Women & Child Development',
  'central',
  '{"age_min":0,"age_max":6,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Children under 6 years; pregnant women; lactating mothers (up to 6 months after delivery)"}',
  'Supplementary nutrition; immunization; health checkups; growth monitoring; preschool education; nutrition & health education for mothers',
  'https://wcd.nic.in/schemes/integrated-child-development-services-icds',
  '["Birth certificate / age proof (child)","Mother''s Aadhaar Card","Address proof","MCP Card (for pregnant/lactating mothers)"]',
  'women'
);

-- 44. National Social Assistance Programme (NSAP) - Indira Gandhi National Old Age Pension Scheme (IGNOAPS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Social Assistance Programme (NSAP) - Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
  'राष्ट्रीय सामाजिक सहायता कार्यक्रम - इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
  'Monthly pension to BPL elderly persons. Central: ₹200/month (60-79 years), ₹500/month (80+ years). States add their contribution (CG adds ~₹150-350).',
  'बीपीएल वृद्ध व्यक्तियों को मासिक पेंशन। केंद्रीय: ₹200/माह (60-79 वर्ष), ₹500/माह (80+ वर्ष)। राज्य अपना योगदान जोड़ते हैं (सीजी ~₹150-350 जोड़ता है)।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":60,"age_max":120,"income_max":null,"categories":["below_poverty_line"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"BPL households; 60+ years age; not receiving pension from any other government scheme"}',
  '₹200-500/month (central) + state contribution (varies); in CG total ~₹350-650/month depending on age',
  'https://nsap.nic.in/',
  '["Aadhaar Card","Age proof (birth certificate / school certificate / domicile)","BPL Card / SECC verification","Bank account passbook","Passport-size photo"]',
  'senior'
);

-- 45. Atal Pension Yojana (APY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Atal Pension Yojana (APY)',
  'अटल पेंशन योजना',
  'Voluntary pension scheme for unorganized sector workers. Guaranteed pension of ₹1,000-₹5,000/month after 60 years based on contribution. Govt co-contribution for eligible subscribers (till 2020).',
  'असंगठित क्षेत्र के श्रमिकों के लिए स्वैच्छिक पेंशन योजना। योगदान के आधार पर 60 वर्ष के बाद ₹1,000-₹5,000/माह की गारंटीकृत पेंशन।',
  'Ministry of Finance / PFRDA',
  'central',
  '{"age_min":18,"age_max":40,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":["unorganized_sector"],"land_required":false,"special_conditions":"Age 18-40 at entry; not covered under EPF/NPS/ESIC; not income tax payer; bank account mandatory"}',
  'Guaranteed pension ₹1,000-₹5,000/month after 60 years (choice of subscriber); pension to spouse on subscriber''s death; return of corpus to nominee if both die',
  'https://npscra.nsdl.co.in/scheme-details.php',
  '["Aadhaar Card","Bank account (with auto-debit facility)","Mobile number","Enrollment through bank/post office"]',
  'senior'
);

-- 46. Pradhan Mantri Vaya Vandana Yojana (PMVVY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Vaya Vandana Yojana (PMVVY)',
  'प्रधानमंत्री वय वंदना योजना',
  'Pension scheme for senior citizens (60+ years) by LIC. Assured return 7.4%/year for 10 years. Purchase price ₹1,56,658 - ₹15 lakh. Monthly/quarterly/half-yearly/yearly pension options.',
  'एलआईसी द्वारा वरिष्ठ नागरिकों (60+ वर्ष) के लिए पेंशन योजना। 10 वर्षों के लिए 7.4%/वर्ष सुनिश्चित रिटर्न। खरीद मूल्य ₹1,56,658 - ₹15 लाख।',
  'Ministry of Finance / LIC',
  'central',
  '{"age_min":60,"age_max":120,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Indian citizens aged 60 years and above; scheme currently CLOSED (last extended till March 2023); check LIC for reopening"}',
  '7.4% assured return for 10 years; monthly/quarterly/half-yearly/yearly pension; purchase price ₹1.56 lakh to ₹15 lakh; loan facility up to 75% of purchase price',
  'https://www.licindia.in/Products/Pension-Plans/Pradhan-Mantri-Vaya-Vandana-Yojana',
  '["Age proof","Aadhaar Card / PAN Card","Bank account details","Passport-size photo"]',
  'senior'
);

-- 47. NSAP - Indira Gandhi National Widow Pension Scheme (IGNWPS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'NSAP - Indira Gandhi National Widow Pension Scheme (IGNWPS)',
  'इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना',
  'Monthly pension to BPL widows aged 40-79 years. Central contribution ₹300/month (40-79 years), ₹500/month (80+ years). States add their share.',
  '40-79 वर्ष की बीपीएल विधवाओं को मासिक पेंशन। केंद्रीय योगदान ₹300/माह (40-79 वर्ष), ₹500/माह (80+ वर्ष)। राज्य अपना हिस्सा जोड़ते हैं।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":40,"age_max":120,"income_max":null,"categories":["below_poverty_line"],"gender":["female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"BPL widows; age 40-79 years; not receiving any other pension"}',
  '₹300-500/month (central) + state contribution; total varies by state',
  'https://nsap.nic.in/',
  '["Aadhaar Card","Husband''s death certificate","Age proof","BPL Card","Bank account passbook"]',
  'senior'
);

-- 48. NSAP - Indira Gandhi National Disability Pension Scheme (IGNDPS)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'NSAP - Indira Gandhi National Disability Pension Scheme (IGNDPS)',
  'इंदिरा गांधी राष्ट्रीय विकलांगता पेंशन योजना',
  'Monthly pension to BPL persons with severe and multiple disabilities (80%+ disability). Central: ₹300/month (18-79 years), ₹500/month (80+ years). States add contribution.',
  'गंभीर और एकाधिक विकलांगता (80%+ विकलांगता) वाले बीपीएल व्यक्तियों को मासिक पेंशन। केंद्रीय: ₹300/माह (18-79 वर्ष), ₹500/माह (80+ वर्ष)।',
  'Ministry of Rural Development',
  'central',
  '{"age_min":18,"age_max":120,"income_max":null,"categories":["below_poverty_line","disabled"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"BPL households; 80% or more disability certified by medical authority"}',
  '₹300-500/month (central) + state contribution; medical board disability certificate required',
  'https://nsap.nic.in/',
  '["Aadhaar Card","Disability certificate (80%+ from medical board)","BPL Card","Age proof","Bank account passbook"]',
  'senior'
);

-- 49. Post Matric Scholarship for SC Students
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Post Matric Scholarship for SC Students',
  'अनुसूचित जाति के छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति',
  'Scholarship for SC students studying in Class 11-12 and higher education. Maintenance allowance ₹230-12,000/month; reimbursement of compulsory fees.',
  'कक्षा 11-12 और उच्च शिक्षा में पढ़ने वाले अनुसूचित जाति के छात्रों के लिए छात्रवृत्ति। रखरखाव भत्ता ₹230-12,000/माह; अनिवार्य शुल्क की प्रतिपूर्ति।',
  'Ministry of Social Justice & Empowerment',
  'central',
  '{"age_min":16,"age_max":35,"income_max":250000,"categories":["sc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"SC category; post-matric studies (Class 11 onwards); parental income ≤ ₹2.5 lakh/year"}',
  'Maintenance allowance (day scholar/hosteller); books & stationery; study tour; thesis typing; reader charges for blind students; compulsory fee reimbursement',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","SC Caste Certificate","Income Certificate (≤ ₹2.5 lakh/year)","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'sc_st_obc'
);

-- 50. Post Matric Scholarship for ST Students
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Post Matric Scholarship for ST Students',
  'अनुसूचित जनजाति के छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति',
  'Scholarship for ST students in Class 11-12 and higher. Similar benefits to SC scholarship: maintenance allowance, fee reimbursement, book grant.',
  'कक्षा 11-12 और उच्च शिक्षा में अनुसूचित जनजाति के छात्रों के लिए छात्रवृत्ति। अनुसूचित जाति छात्रवृत्ति के समान लाभ।',
  'Ministry of Tribal Affairs',
  'central',
  '{"age_min":16,"age_max":35,"income_max":250000,"categories":["st"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"ST category; post-matric studies; parental income ≤ ₹2.5 lakh/year"}',
  'Maintenance allowance; books & stationery allowance; study tour charges; compulsory fees; thesis typing for research scholars',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","ST Caste Certificate (issued by competent authority)","Income Certificate","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'sc_st_obc'
);

-- 51. Post Matric Scholarship for OBC Students
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Post Matric Scholarship for OBC Students',
  'ओबीसी छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति',
  'Scholarship for OBC (non-creamy layer) students in Class 11-12 and higher. Maintenance allowance, fee reimbursement, study material grant.',
  'कक्षा 11-12 और उच्च शिक्षा में ओबीसी (नॉन-क्रीमी लेयर) छात्रों के लिए छात्रवृत्ति।',
  'Ministry of Social Justice & Empowerment',
  'central',
  '{"age_min":16,"age_max":35,"income_max":100000,"categories":["obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"OBC (non-creamy layer); post-matric studies; parental income ≤ ₹1 lakh/year (for Central scheme)"}',
  'Maintenance allowance (hosteller/day scholar); compulsory fees; books/stationery',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","OBC (Non-Creamy Layer) Certificate (valid for current year)","Income Certificate (≤ ₹1 lakh/year)","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'sc_st_obc'
);

-- 52. National Fellowship for SC/ST Students (PhD/M.Phil)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'National Fellowship for SC/ST Students (PhD/M.Phil)',
  'अनुसूचित जाति/जनजाति छात्रों के लिए राष्ट्रीय फैलोशिप (पीएचडी/एम.फिल)',
  'Fellowship for SC/ST students pursuing M.Phil and PhD. Fellowship ₹31,000/month (initial 2 years), ₹35,000/month (remaining period). Contingency grant ₹10,000-20,000/year. HRA as per rules.',
  'एम.फिल और पीएचडी करने वाले अनुसूचित जाति/जनजाति छात्रों के लिए फैलोशिप। फैलोशिप ₹31,000/माह (शुरुआती 2 साल), ₹35,000/माह (शेष अवधि)। आकस्मिकता अनुदान ₹10,000-20,000/वर्ष।',
  'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs / UGC',
  'central',
  '{"age_min":22,"age_max":35,"income_max":600000,"categories":["sc","st"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"SC/ST students pursuing regular full-time M.Phil/PhD in Indian universities/institutions; parental income ≤ ₹6 lakh/year; NET/GATE not mandatory"}',
  'Fellowship ₹31,000-35,000/month; contingency ₹10,000/year (humanities/social sciences) to ₹20,000/year (sciences); HRA; escort reader allowance for blind; duration: M.Phil 2 years, PhD 5 years',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","SC/ST Caste Certificate","Income Certificate (≤ ₹6 lakh/year)","Admission proof (PhD/M.Phil enrollment)","Research proposal","NOC from supervisor","Bank account passbook"]',
  'sc_st_obc'
);

-- 53. Dr. Ambedkar Pre-Matric and Post-Matric Scholarship for DNT (CG)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Dr. Ambedkar Pre-Matric and Post-Matric Scholarship for DNT (CG)',
  'डॉ. अंबेडकर प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रवृत्ति (विमुक्त घुमक्कड़ और अर्ध घुमक्कड़ जनजाति)',
  'Scholarship for students from Denotified, Nomadic, and Semi-Nomadic Tribes (DNT) by Government of India. Covers Classes 9-10 (Pre-Matric) and Class 11 onwards (Post-Matric).',
  'भारत सरकार द्वारा विमुक्त, घुमंतू और अर्ध-घुमंतू जनजातियों (डीएनटी) के छात्रों के लिए छात्रवृत्ति। कक्षा 9-10 (प्री-मैट्रिक) और कक्षा 11 onwards (पोस्ट-मैट्रिक) को कवर करता है।',
  'Ministry of Social Justice & Empowerment',
  'central',
  '{"age_min":13,"age_max":35,"income_max":250000,"categories":["dnt"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Students from DNT categories; parental income ≤ ₹2.5 lakh/year; studying in Classes 9-10 (Pre-Matric) or 11+ (Post-Matric)"}',
  'Pre-Matric: ₹225-750/month; Post-Matric: ₹230-12,000/month; fee reimbursement; books/stationery allowance',
  'https://scholarships.gov.in/',
  '["Aadhaar Card","DNT Caste Certificate","Income Certificate (≤ ₹2.5 lakh/year)","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'sc_st_obc'
);

-- 54. Chhattisgarh Scholarship for SC/ST/OBC Students (State)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Chhattisgarh Scholarship for SC/ST/OBC Students (State)',
  'छत्तीसगढ़ अनुसूचित जाति/जनजाति/ओबीसी छात्रों के लिए छात्रवृत्ति (राज्य)',
  'Chhattisgarh state scholarships for SC/ST/OBC students. Includes pre-matric, post-matric, and higher education scholarships. State adds top-up to central schemes and provides state-specific benefits.',
  'अनुसूचित जाति/जनजाति/ओबीसी छात्रों के लिए छत्तीसगढ़ राज्य छात्रवृत्ति। प्री-मैट्रिक, पोस्ट-मैट्रिक और उच्च शिक्षा छात्रवृत्ति शामिल है। राज्य केंद्रीय योजनाओं में टॉप-अप जोड़ता है और राज्य-विशिष्ट लाभ प्रदान करता है।',
  'Department of SC/ST/OBC Welfare, Chhattisgarh Government',
  'state',
  '{"age_min":10,"age_max":35,"income_max":250000,"categories":["sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Domicile of Chhattisgarh; SC/ST/OBC categories; parental income limit varies by scheme"}',
  'Varies by class/course; state supplements central schemes; free textbooks; hostel subsidies; coaching assistance',
  'https://eduportal.cg.nic.in/ or https://scholarship.cg.nic.in/',
  '["Aadhaar Card","Caste Certificate (SC/ST/OBC)","Income Certificate","Domicile Certificate (Chhattisgarh)","Previous year marksheet","Fee receipt","Bank account passbook"]',
  'sc_st_obc'
);

-- 55. Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
  'प्रधानमंत्री जीवन ज्योति बीमा योजना',
  'Life insurance scheme. Annual premium ₹436 for ₹2 lakh life cover. Age 18-50 years. Covers death due to any reason. Renewable yearly.',
  'जीवन बीमा योजना। ₹2 लाख जीवन कवर के लिए वार्षिक प्रीमियम ₹436। आयु 18-50 वर्ष। किसी भी कारण से मृत्यु को कवर करता है।',
  'Ministry of Finance',
  'central',
  '{"age_min":18,"age_max":50,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Bank account holder; age 18-50 years at enrollment; auto-debit consent for annual premium"}',
  '₹2 lakh death cover; annual renewable; premium ₹436/year',
  'https://www.jansuraksha.gov.in/',
  '["Bank account with auto-debit facility","Aadhaar Card","Age proof"]',
  'livelihood'
);

-- 56. Pradhan Mantri Suraksha Bima Yojana (PMSBY)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
  'प्रधानमंत्री सुरक्षा बीमा योजना',
  'Accidental insurance scheme. Annual premium ₹20 for ₹2 lakh cover (death/total disability) and ₹1 lakh (partial disability). Age 18-70 years.',
  'दुर्घटना बीमा योजना। ₹2 लाख कवर (मृत्यु/पूर्ण विकलांगता) और ₹1 लाख (आंशिक विकलांगता) के लिए वार्षिक प्रीमियम ₹20। आयु 18-70 वर्ष।',
  'Ministry of Finance',
  'central',
  '{"age_min":18,"age_max":70,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["all"],"occupation":null,"land_required":false,"special_conditions":"Bank account holder; age 18-70 years; auto-debit for annual premium ₹20"}',
  'Accidental death: ₹2 lakh; total permanent disability: ₹2 lakh; partial disability: ₹1 lakh; premium ₹20/year',
  'https://www.jansuraksha.gov.in/',
  '["Bank account","Aadhaar Card","Auto-debit consent"]',
  'livelihood'
);

-- 57. Mukhyamantri Mitan Yojana (Chhattisgarh)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Mukhyamantri Mitan Yojana (Chhattisgarh)',
  'मुख्यमंत्री मितान योजना',
  'Chhattisgarh doorstep delivery of government services and certificates. Birth/death certificates, domicile, caste, income certificates delivered at home. Minimal fees.',
  'छत्तीसगढ़ सरकारी सेवाओं और प्रमाणपत्रों की घर पर डिलीवरी। जन्म/मृत्यु प्रमाणपत्र, अधिवास, जाति, आय प्रमाणपत्र घर पर। न्यूनतम शुल्क।',
  'Department of General Administration, Chhattisgarh Government',
  'state',
  '{"age_min":0,"age_max":120,"income_max":null,"categories":["general","sc","st","obc"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Residents of Chhattisgarh; apply online or through Mitan centers"}',
  'Doorstep delivery of certificates; ration card, domicile, caste, income certificates; minimal fees ₹20-50; delivered in 3-7 days',
  'https://mitan.cg.nic.in/',
  '["Aadhaar Card","Application form (online)","Supporting documents (varies by service)","Address proof"]',
  'livelihood'
);

-- 58. Chhattisgarh Food Security Scheme (₹1/kg Rice)
INSERT INTO schemes (
  name, name_hi, description, description_hi, ministry, level,
  eligibility, benefits, apply_url, documents_needed, category
) VALUES (
  'Chhattisgarh Food Security Scheme (₹1/kg Rice)',
  'छत्तीसगढ़ खाद्य सुरक्षा योजना (₹1/किलो चावल)',
  'Chhattisgarh provides rice at ₹1 per kg to all ration cardholders (priority & non-priority). Much cheaper than NFSA rate (₹2-3/kg). 35 kg/family/month.',
  'छत्तीसगढ़ सभी राशन कार्डधारकों (प्राथमिकता और गैर-प्राथमिकता) को ₹1 प्रति किलो पर चावल प्रदान करता है। एनएफएसए दर (₹2-3/किलो) से बहुत सस्ता। 35 किग्रा/परिवार/माह।',
  'Department of Food & Civil Supplies, Chhattisgarh Government',
  'state',
  '{"age_min":0,"age_max":120,"income_max":null,"categories":["general","sc","st","obc","below_poverty_line"],"gender":["male","female"],"states":["Chhattisgarh"],"occupation":null,"land_required":false,"special_conditions":"Valid ration card holders in Chhattisgarh (yellow or green card)"}',
  'Rice at ₹1/kg; quota 35 kg/family/month; quality custom-milled rice (not broken)',
  'https://khadya.cg.nic.in/',
  '["Ration Card (Chhattisgarh)","Aadhaar Card linked to ration card"]',
  'livelihood'
);

-- Total schemes inserted: 58
-- Categories:
-- - Agriculture: 8
-- - Health: 8
-- - Education: 8
-- - Housing: 5
-- - Employment: 9
-- - Women: 5
-- - Senior Citizens: 5
-- - SC/ST/OBC: 6
-- - Livelihood: 4
