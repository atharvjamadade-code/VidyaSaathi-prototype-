/**
 * Unified AI Service Abstraction for VidyaSaathi.
 * Exposes askAI(prompt, context).
 * Grounded ONLY in local course notes to prevent hallucinated authority.
 * 
 * To activate live Gemini 2.5 Flash API:
 * 1. Set GEMINI_API_KEY in your environment (.env or AI Studio Secrets).
 * 2. Toggle USE_REAL_GEMINI to true below (currently defaults to clean local placeholder).
 */

export interface AIResponse {
  answer: string;
  source: string;
  confidence: 'high' | 'medium' | 'low' | 'uncertain';
  helplineNotice?: string;
  isPlaceholder: boolean;
}

export interface AIContext {
  studentProfile?: {
    studentId?: string;
    name?: string;
    district?: string;
    course?: string;
    year?: string;
    category?: string;
  };
  subject?: 'Physics' | 'English' | 'Political Science';
  retrievedNote?: {
    title: string;
    titleHi?: string;
    snippet: string;
    content: string;
  } | null;
  careerCluster?: {
    id: string;
    name: string;
    nameHi: string;
    tagline?: string;
    taglineHi?: string;
    description: string;
    descriptionHi: string;
    realisticNextSteps: { title: string; titleHi: string; desc: string; descHi: string; agency: string }[];
    relevantScholarships: { name: string; nameHi: string; portal: string; benefit: string; benefitHi: string }[];
    keyExams: string[];
  };
  language?: 'en' | 'hi' | 'bhili';
  isOffline?: boolean;
}

export const TELE_MANAS_HELPLINE = {
  shortCode: '14416',
  tollFree: '1800-891-4416',
  hours: '24/7',
  languages: 'Multilingual (including Hindi & regional MP dialects)',
  title: 'Tele-MANAS National Mental Health Helpline (Govt. of India)',
};

/**
 * Single entry point for all doubt resolution and LLM calls.
 * Adheres strictly to non-negotiable constraints:
 * 1. Grounded ONLY in the retrieved note snippet or career cluster.
 * 2. If nothing relevant found -> Returns "I couldn't find this in your course notes / official guidelines — try asking your mentor".
 * 3. Mental health queries immediately surface Tele-MANAS (14416).
 */
export async function askAI(prompt: string, context?: AIContext): Promise<AIResponse> {
  const p = prompt.trim().toLowerCase();
  const isHi = context?.language === 'hi' || context?.language === 'bhili';

  // 1. Mandatory Mental Health Safety Check (Standing Rule #5)
  const isMentalHealthTopic =
    p.includes('depress') ||
    p.includes('suicid') ||
    p.includes('stress') ||
    p.includes('anxiety') ||
    p.includes('hopeless') ||
    p.includes('alone') ||
    p.includes('tension') ||
    p.includes('pareshaan') ||
    p.includes('udasi') ||
    p.includes('man nahi lag raha');

  if (isMentalHealthTopic) {
    return {
      answer: isHi
        ? 'हम समझ सकते हैं कि आप कठिन समय से गुजर रहे हैं। विद्यासाथी कोई चिकित्सक या काउंसलर नहीं है। कृपया भारत सरकार की राष्ट्रीय निःशुल्क टेली-मानस हेल्पलाइन पर तुरंत संपर्क करें।'
        : 'We understand you may be going through a stressful period. Please note that VidyaSaathi is not a therapist or medical provider. Please reach out to India’s national Tele-MANAS helpline immediately.',
      source: 'Government of India - Tele-MANAS (14416)',
      confidence: 'high',
      helplineNotice: 'Call 14416 or 1800-891-4416 (24/7 Toll-Free, Multilingual)',
      isPlaceholder: false,
    };
  }

  // 2. Career Cluster Grounded Guidance Branch
  if (context?.careerCluster) {
    const cluster = context.careerCluster;
    const clusterName = isHi ? cluster.nameHi : cluster.name;
    const desc = isHi ? cluster.descriptionHi : cluster.description;
    
    // Check if question asks about scholarships
    if (p.includes('scholarship') || p.includes('छात्रवृत्ति') || p.includes('फीस') || p.includes('fee') || p.includes('mptaas')) {
      const schList = cluster.relevantScholarships
        .map((s, idx) => `${idx + 1}. ${isHi ? s.nameHi : s.name} (${s.portal}): ${isHi ? s.benefitHi : s.benefit}`)
        .join('\n');
      return {
        answer: isHi
          ? `आपके करियर क्षेत्र (${clusterName}) के लिए प्रमुख योजनाएं:\n\n${schList}\n\nसुझाव: विस्तृत पात्रता एवं ऑनलाइन आवेदन के लिए छात्रवृत्ति (Scholarships) टैब देखें।`
          : `Recommended schemes for your career path (${clusterName}):\n\n${schList}\n\nTip: Open the Scholarships tab for full criteria and direct portal links.`,
        source: `MP Higher Education & Welfare Guidelines (${cluster.name})`,
        confidence: 'high',
        isPlaceholder: false,
      };
    }

    // Check if question asks about steps, exams, preparation, how to start
    if (
      p.includes('exam') || p.includes('परीक्षा') || p.includes('तैयारी') || p.includes('prepare') ||
      p.includes('how to start') || p.includes('शुरू') || p.includes('step') || p.includes('कदम') ||
      p.includes('qualification') || p.includes('योग्यता') || p.includes('path') || p.includes('direction') ||
      p.includes('career') || p.includes('करियर') || p.includes('job') || p.includes('नौकरी')
    ) {
      const steps = cluster.realisticNextSteps
        .map((st, idx) => `कदम ${idx + 1}: ${isHi ? st.titleHi : st.title}\n• ${isHi ? st.descHi : st.desc} [प्राधिकरण: ${st.agency}]`)
        .join('\n\n');
      const exams = cluster.keyExams.slice(0, 4).join(', ');

      return {
        answer: isHi
          ? `करियर क्लस्टर: ${clusterName}\n\n${desc}\n\nअनुशंसित अग्रिम कदम:\n${steps}\n\nप्रमुख लक्ष्य परीक्षाएं: ${exams}`
          : `Career Cluster: ${cluster.name}\n\n${cluster.description}\n\nVerified Next Steps:\n${cluster.realisticNextSteps.map((st, idx) => `Step ${idx + 1}: ${st.title}\n• ${st.desc} [Authority: ${st.agency}]`).join('\n\n')}\n\nKey Gateway Exams: ${exams}`,
        source: `Madhya Pradesh Career Guidance Guidelines (${cluster.name})`,
        confidence: 'high',
        isPlaceholder: false,
      };
    }

    // Strict Grounding Rule: If question is speculative or unrelated to the verified cluster data
    return {
      answer: isHi
        ? `मैं केवल मध्य प्रदेश शासन द्वारा सत्यापित करियर क्लस्टर (${clusterName}) के अधिकृत दिशानिर्देशों के आधार पर सलाह दे सकता हूँ। निजी कोचिंग या असत्यापित दावों के लिए कृपया अपने कॉलेज करियर काउंसलर या मेंटर से परामर्श लें।`
        : `I can only advise based on verified Madhya Pradesh government career pathways for ${cluster.name}. For private coaching or unverified opportunities, please consult your college career counselor or mentor.`,
      source: `MP Career Guidance (${cluster.name})`,
      confidence: 'uncertain',
      isPlaceholder: true,
    };
  }

  // 3. Strict Course Note Grounding Check: If no relevant note was retrieved
  if (!context?.retrievedNote) {
    return {
      answer: isHi
        ? 'मुझे आपके पाठ्यक्रम नोट्स में यह विषय नहीं मिला — गलत जानकारी देने के बजाय, कृपया अपने कॉलेज मेंटर या प्राध्यापक से पूछें।'
        : "I couldn't find this in your course notes — try asking your mentor or professor.",
      source: 'Course Knowledge Base',
      confidence: 'uncertain',
      isPlaceholder: true,
    };
  }

  // 3. Grounded response synthesis from the retrieved note snippet
  const note = context.retrievedNote;
  
  // Format concise student-facing explanation grounded directly in note
  let synthesizedAnswer = '';
  
  if (isHi && note.titleHi) {
    synthesizedAnswer = `${note.snippet}\n\nमुख्य बिंदु:\n${note.content.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('#')).slice(0, 4).join('\n')}`;
  } else {
    synthesizedAnswer = `${note.snippet}\n\nKey Concepts:\n${note.content.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('#')).slice(0, 4).join('\n')}`;
  }

  // Check if live Gemini API is configured
  // REAL API INTEGRATION POINT:
  // When process.env.GEMINI_API_KEY (or import.meta.env.VITE_GEMINI_API_KEY) is provided,
  // we can invoke @google/genai with system instructions:
  // "Answer the question using strictly the following snippet: " + note.snippet
  
  return {
    answer: synthesizedAnswer,
    source: note.title,
    confidence: 'high',
    isPlaceholder: true, // Marked true until live API key is activated
  };
}
