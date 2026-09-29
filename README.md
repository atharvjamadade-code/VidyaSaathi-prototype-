# VidyaSaathi (विद्यासाथी) 🎓
### AI-Powered Offline-First Academic & Welfare Companion for Rural & Tribal College Students in Madhya Pradesh

---

## 1. Quick Setup & Execution

```bash
# 1. Install dependencies
npm install

# 2. Run the development server (runs on port 3000)
npm run dev

# 3. Build & verify production bundle
npm run build
```

The application is a mobile-first Progressive Web App (PWA) with Service Worker precaching, client-side IndexedDB persistence (Dexie.js), and zero-network offline architecture.

---

## 2. Environment Variables & Real API Keys

Create a `.env` file (copied from `.env.example`):

| Variable | Required / Optional | Purpose |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional (defaults to grounded local synthesis) | Google AI Studio Gemini API key. When present, enables live generative responses grounded strictly in course note snippets. |
| `BHASHINI_API_KEY` | Optional (integration stub provided) | Digital India Bhashini ULCA NMT inference key for real-time Indic translation. |
| `BHASHINI_USER_ID` | Optional | Bhashini user account ID. |
| `APP_URL` | Auto-injected | Canonical deployment URL. |

---

## 3. The 90-Second Judge Presentation Walkthrough Script

*Target Audience: Hackathon Judges / Evaluators*  
*Total Time: 90 Seconds*

### **[0:00 - 0:15] The Hook & Target Reality**
> "Namaste judges. 65% of undergraduate students in Madhya Pradesh attend government colleges in rural and tribal blocks like Dhar, Barwani, and Jhabua. They rely on shared family smartphones, pay-as-you-go 2G/3G data, and face unreliable connectivity. Most academic apps break completely when the network drops. This is **VidyaSaathi** — built offline-first from the ground up."

### **[0:15 - 0:30] One-Tap Demo Mode & Offline Proof**
> *(Tap **`⚡ Demo Mode`** in the top navigation bar -> Tap **`⚡ Seed Demo Preset`**)*  
> "To prove this works in a room with zero Wi-Fi, I have activated our **Judge Demo Preset**. Meet **Rameshwar Jamra**, a 2nd-year B.A. student from Sardarpur block in Dhar district. Notice the top banner: even if I flip our **Simulate Offline** switch, cutting every server request, not a single screen freezes or throws an error."

### **[0:30 - 0:50] Grounded AI Doubt Solver & Bhashini Translation (Learn Tab)**
> *(Navigate to **Learn** tab -> open history or ask a doubt)*  
> "Here in the Learn tab, Rameshwar studies his compulsory NEP 2020 foundation syllabus. Notice our fundamental safety rule: **Zero ungrounded hallucinations**. The AI only answers questions if a verified course note exists in local storage, citing the exact chapter module. If no note matches, it admits uncertainty and directs him to his college professor. Students can tap **Translate** to preview Hindi and our proof-of-concept Bhili tribal language stub."

### **[0:50 - 1:10] Verified Scholarships & MPTAAS Routing (Scholarships Tab)**
> *(Navigate to **Scholarships** tab)*  
> "Scholarship deadlines are the number-one reason rural students drop out. VidyaSaathi matches Rameshwar against real Madhya Pradesh schemes. Because he is an ST student with ₹72,000 family income in Dhar, the system flags **MPTAAS Post-Matric (99% match)** and **MP Awas Sahayata (₹1,500/month rental)**, showing the exact portal, required Samagra e-KYC documents, and offline deadline reminders."

### **[1:10 - 1:30] Safe Companion & 100% Rule-Based Career Pathways (Career & Buddy)**
> *(Navigate to **Career** tab, then tap **Mentor & Buddy**)*  
> "Our Career tab features an 11-question strengths quiz with **100% deterministic, rule-based scoring** — zero AI guessing — mapping directly to 7 state career paths like MPPSC, Agriculture, and ITI trades.  
> Finally, our AI Buddy provides gentle check-ins and study nudges, but never acts as a doctor. If distress or crisis is detected, it halts conversation immediately and surfaces **Tele-MANAS (14416)**, India's 24/7 national helpline, with one tap to alert his college mentor. Thank you."

---

## 4. Transparent Audit: What is Real vs. What is a Placeholder / Simulation

To maintain total integrity in front of hackathon judges, here is the explicit breakdown of what is fully functioning production code versus simulated prototypes:

### ✅ Real, Fully Functioning Production Implementations
1. **Offline Engine & Database**: Complete IndexedDB (Dexie.js) storage for chat history, downloaded course notes, scholarship bookmarks, mood check-ins, and career quiz results. Operates with 100% functionality with airplane mode active.
2. **Deterministic Rule-Based Career Quiz**: An 11-question scoring engine (`src/content/careerClusters.ts`) that calculates points and affinity percentages across 7 Madhya Pradesh clusters via pure math tables without AI hallucination.
3. **Safety Tripwire & Tele-MANAS Protocol**: Dual-language regex tripwire that detects distress/crisis keywords and immediately halts chit-chat to display direct dialing to Tele-MANAS (`14416` / `1800-891-4416`) and mentor escalation.
4. **Speech-to-Text & Text-to-Speech**: Full browser Web Speech API implementation (`src/services/speech.ts`) supporting voice questions and text read-aloud.
5. **Real Madhya Pradesh Data**: Real state universities (DAVV Indore, Barkatullah Bhopal, RDVV Jabalpur), real colleges (Govt PG College Dhar), real administrative divisions (Sardarpur, Malwa-Nimar belt), and real government portals (MPTAAS `tribal.mp.gov.in`, MP Scholarship Portal 2.0, Samagra e-KYC).
6. **Strict Grounding Architecture**: `askAI()` enforces the non-negotiable rule that answers must cite a retrieved note snippet or return an explicit uncertainty statement.
7. **PWA & Data Saver**: Standalone manifest, service worker offline precache, and 2G Data Saver mode.

### ⚠️ Simulated / Mock / Extension Placeholders (Do Not Overclaim)
1. **Bhashini Translation Stub (`src/services/translate.ts`)**:
   - *Current state*: Clean pass-through stub returning structured mock translations and marking tribal Bhili with a `[Beta Placeholder]` disclaimer.
   - *Production path*: Requires plugging in `BHASHINI_API_KEY` to call the MeitY ULCA inference pipeline endpoint.
2. **Mentor Async Messaging (`src/components/tabs/MentorTab.tsx`)**:
   - *Current state*: Realistic local simulation with 4 MP mentors (professors, alumni in government jobs) and scripted responses.
   - *Production path*: Requires a real WebSocket or Firestore backend for multi-user bidirectional sync.
3. **Live Generative AI (`src/services/ai.ts`)**:
   - *Current state*: Deterministic local synthesizer extracting structured key concepts from verified course notes when no API key is set.
   - *Production path*: Automatically activates `@google/genai` with Gemini 2.5 Flash when `GEMINI_API_KEY` is placed in `.env`.
4. **Bhili Dialect UI**:
   - *Current state*: Clearly labeled `[Beta]` proof-of-concept placeholders for UI chrome only, strictly avoiding synthetic hallucination of tribal grammar.
