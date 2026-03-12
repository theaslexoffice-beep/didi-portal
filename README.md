# 🙏 DIDI — Citizen Grievance Redressal Portal

**"अपनी समस्या हमारे साथ बाँटें"** — *Share your problems with us*

A civic tech platform for citizen grievance redressal, piloted in **Bilaspur, Chhattisgarh**.

---

## 🎯 What Is This?

DIDI is a **parallel grievance redressal system** that empowers citizens to:

1. **Submit complaints** via a simple web form (WhatsApp number + complaint description)
2. **Chat with DIDI** — a caring, empathetic AI elder sister who guides people on their rights
3. **Track public complaints** — approved complaints are displayed publicly (no private data exposed)
4. **Moderate via Admin Panel** — review, approve, reject, or mark complaints as resolved

**DIDI's role:** Not a government service — a **citizen's ally**. She listens, guides, and helps people navigate their rights with warmth and clarity.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/theaslegal/.openclaw/workspace/didi-portal
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Portal is live at: **http://localhost:3001**

### 3. Admin Panel
- URL: **http://localhost:3001/admin**
- Password: `didi-admin-2026` (set in `.env.local`)

---

## 📂 Project Structure

```
didi-portal/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── page.js             # Main portal (Hero, Form, Complaints, Chat)
│   │   ├── admin/page.js       # Admin moderation panel
│   │   ├── globals.css         # Tailwind + custom styles
│   │   └── api/
│   │       ├── complaints/route.js  # POST/GET complaints
│   │       ├── admin/route.js       # Admin auth + moderation
│   │       └── chat/route.js        # DIDI chatbot API
│   ├── i18n/
│   │   └── translations.js     # English, Hindi, Chhattisgarhi translations
│   └── lib/
│       └── db.js               # SQLite database (better-sqlite3)
├── public/                     # Static assets
├── didi.db                     # SQLite database (auto-created)
├── .env.local                  # Environment variables
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🗄️ Database Schema

**SQLite** (`better-sqlite3`) with two tables:

### 1. `complaints`
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key (auto-increment) |
| name | TEXT | Default: 'Anonymous' |
| whatsapp | TEXT | Required (10 digits) |
| email | TEXT | Optional |
| category | TEXT | land, police, education, health, etc. |
| description | TEXT | Required — full complaint text |
| status | TEXT | pending / approved / rejected / resolved |
| created_at | DATETIME | Auto |
| updated_at | DATETIME | Auto |
| admin_notes | TEXT | Optional |

### 2. `chat_messages`
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key |
| session_id | TEXT | Unique per user chat session |
| role | TEXT | 'user' or 'didi' |
| message | TEXT | Full message text |
| lang | TEXT | en / hi / cg |
| created_at | DATETIME | Auto |

---

## 🌐 API Endpoints

### 1. `/api/complaints`
- **GET** — Fetch approved/resolved complaints (public)
- **POST** — Submit a new complaint (auto-status: pending)

**Request:**
```json
POST /api/complaints
{
  "name": "Rajesh Kumar",
  "whatsapp": "9876543210",
  "email": "rajesh@example.com",
  "category": "land",
  "description": "मेरी जमीन पर अवैध कब्जा है। पुलिस मदद नहीं कर रही।"
}
```

**Response:**
```json
{
  "success": true,
  "id": 42,
  "message": "Complaint submitted successfully"
}
```

---

### 2. `/api/admin`
Admin panel API (requires auth header).

**GET** — Fetch complaints (filter: pending | all)
```bash
GET /api/admin?filter=pending
Authorization: Bearer didi-admin-2026
```

**PATCH** — Update complaint status
```json
PATCH /api/admin
Authorization: Bearer didi-admin-2026
{
  "id": 42,
  "status": "approved",
  "adminNotes": "Verified via RTI request. Escalating to SDM."
}
```

---

### 3. `/api/chat`
DIDI chatbot API — contextual responses based on keywords.

**Request:**
```json
POST /api/chat
{
  "message": "मुझे जमीन के मामले में मदद चाहिए",
  "sessionId": "chat_abc123",
  "lang": "hi"
}
```

**Response:**
```json
{
  "success": true,
  "response": "मैं समझती हूँ कि जमीन की समस्या बहुत तनावपूर्ण होती है। 💛 मेरा सुझाव है:\n\n1. हमारे पोर्टल पर सभी दस्तावेज़ों के साथ **शिकायत दर्ज करें**\n2. अपने भूमि रिकॉर्ड, बिक्री विलेख की प्रतियाँ रखें\n3. आप RTI दायर करके अपने आवेदन की स्थिति जान सकते हैं\n4. ज़रूरत पड़ने पर हम क़ानूनी सहायता से जोड़ सकते हैं\n\nचिंता मत करो — तुम अकेले नहीं हो! 💪"
}
```

---

## 💬 DIDI Chatbot — How It Works

DIDI is **keyword-based** (no LLM needed for MVP) with **contextual empathy** built in.

### Personality Traits:
- **Warm** — नमस्ते, मैं दीदी हूँ — आपकी अपनी डिजिटल बड़ी बहन। 🙏
- **Empathetic** — "मैं समझती हूँ कि यह तनावपूर्ण है।"
- **Solutions-oriented** — Always suggests next steps (file complaint, RTI, legal aid, etc.)
- **Multilingual** — Responds in English, Hindi, Chhattisgarhi based on user's language

### Keyword Detection:
- **Land issues** → Guides on RTI, land records, writ petitions
- **Police matters** → Explains arrest rights, legal aid, family notification rules
- **School/Education** → Right to Education, District Education Officer escalation
- **General** → Empathetic acknowledgment + portal submission CTA

### Future Enhancement:
For production, integrate **OpenAI/Gemini** for dynamic responses with memory.

---

## 🎨 Design & Branding

**Color Palette:**
- **Terracotta Red** (`#c4532e`) — Chhattisgarh tribal roots, earthy warmth
- **Teal Green** (`#0d9488`) — Trust, action, growth
- **Mustard Yellow** (`#eab308`) — Optimism, energy

**Fonts:**
- **Inter** — Clean, modern UI text
- **Noto Sans Devanagari** — Readable Hindi/Chhattisgarhi

**Logo:** 🙏 (Namaste emoji) + DIDI wordmark

---

## 🌍 Multilingual Support

Currently supports **3 languages**:
1. **English (EN)** — Default
2. **हिन्दी (HI)** — Full Hindi UI and DIDI responses
3. **छत्तीसगढ़ी (CG)** — Chhattisgarhi UI and DIDI responses

**Language switcher** in top-right (EN | हि | छ.ग.)

All translations live in `src/i18n/translations.js`.

---

## 🛡️ Admin Panel

**URL:** `/admin`  
**Password:** Set in `.env.local` as `ADMIN_PASSWORD`

### Features:
- **Pending queue** — Review new complaints
- **Approve** — Make complaint public
- **Reject** — Hide complaint (spam/invalid)
- **Resolve** — Mark as solved (shows ✅ badge on public list)
- **Admin notes** — Internal notes (not shown publicly)

### Workflow:
1. Citizen submits complaint → Status: **pending**
2. Admin reviews → Approves or Rejects
3. Approved complaints appear on `/complaints`
4. Once resolved → Admin marks **resolved** (still public, with ✅)

---

## 🔐 Environment Variables

Create `.env.local`:

```bash
# Admin password for /admin panel
ADMIN_PASSWORD=didi-admin-2026

# Optional: OpenAI for future chatbot upgrade
# OPENAI_API_KEY=sk-...

# Optional: WhatsApp Cloud API for notifications
# WHATSAPP_PHONE_NUMBER_ID=...
# WHATSAPP_ACCESS_TOKEN=...
```

---

## 🚢 Deployment Options

### 1. **Vercel** (Recommended for MVP)
```bash
npm install -g vercel
vercel
```

**Note:** SQLite works on Vercel but is ephemeral (resets on deploy). For production, switch to Supabase/PostgreSQL.

---

### 2. **Supabase + Vercel** (Production-Ready)
Replace SQLite with Supabase PostgreSQL:

1. Create Supabase project
2. Create tables:
```sql
CREATE TABLE complaints (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT 'Anonymous',
  whatsapp TEXT NOT NULL,
  email TEXT,
  category TEXT DEFAULT 'other',
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT
);

CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  lang TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Replace `src/lib/db.js` with Supabase client
4. Deploy to Vercel

---

### 3. **Self-Hosted (VPS/Railway/Fly.io)**
```bash
npm run build
npm start
```

Runs on port 3000 (or `PORT` env var).

---

## 📋 Next Steps for Production

### 1. **WhatsApp Integration**
- Use **Meta Cloud API** to accept complaints via WhatsApp
- Auto-create complaints from WhatsApp messages
- Send status updates back to users

### 2. **Email/Letter Escalation**
- When complaint is approved → Auto-draft letter to relevant authority
- BCC DIDI admin email
- Track response time

### 3. **Social Media Amplification**
- If no response within 7 days → Auto-post on Twitter/Facebook
- Tag relevant government handles
- Public pressure tactic

### 4. **Advanced DIDI Chatbot**
Replace keyword matching with:
- **OpenAI/Gemini** — Dynamic, context-aware responses
- **RAG (Retrieval-Augmented Generation)** — Knowledge base of laws, RTI templates, case studies
- **Multi-turn conversations** — Memory of past user issues

### 5. **Mobile App**
- React Native or Flutter
- Push notifications for complaint status
- Offline-first with sync

### 6. **Analytics Dashboard**
- Complaint trends by category/location
- Resolution time metrics
- Heatmap of issues by ward/locality

---

## 🧪 Testing the Portal

### Manual Testing Checklist:
- [ ] Submit a complaint (pending status)
- [ ] Admin login → Approve complaint
- [ ] Check `/complaints` → Complaint appears publicly
- [ ] Chat with DIDI in EN/HI/CG
- [ ] Switch language → All UI updates
- [ ] Mark complaint as resolved → ✅ badge shows

### API Testing:
```bash
# Submit complaint
curl -X POST http://localhost:3001/api/complaints \
  -H "Content-Type: application/json" \
  -d '{"whatsapp":"9876543210","category":"land","description":"Test issue"}'

# Approve via admin
curl -X PATCH http://localhost:3001/api/admin \
  -H "Authorization: Bearer didi-admin-2026" \
  -H "Content-Type: application/json" \
  -d '{"id":1,"status":"approved"}'

# Fetch public complaints
curl http://localhost:3001/api/complaints

# Chat with DIDI
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"help with police issue","sessionId":"test1","lang":"en"}'
```

---

## 📖 Vision Recap

**DIDI is not just a complaints portal.**

It's a **movement** to restore citizen voice in a system where grievances often go unheard.

**Impact Goals:**
1. **Executive Accountability** — Force timely responses via escalation
2. **Legislative Insight** — Complaint data reveals policy gaps
3. **Judicial Access** — Connect citizens with legal aid for PILs
4. **Media Amplification** — Public complaints = public pressure

**Brand Promise:**  
> *तुम अकेले नहीं हो। दीदी तुम्हारे साथ है।*  
> You're not alone. DIDI is with you. 💪

---

## 🙏 Credits

**Built by:** Donna (AI COO, The AS Lex)  
**For:** Abhinav Swarnkar (Harvey) — Founder, The AS Lex  
**Tech Stack:** Next.js 14, React, Tailwind CSS, SQLite, better-sqlite3  
**Design Inspiration:** Chhattisgarh tribal art + modern civic tech UX  

---

## 📜 License

**Open Source** — MIT License (pending Harvey's confirmation)

Built for the people of Bilaspur. Built with love. 🙏
