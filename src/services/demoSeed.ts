/**
 * Realistic Fictional Demo Preset for VidyaSaathi Presentations.
 * Pre-seeds a complete 2nd-year B.A. student from the Dhar tribal belt of Western Madhya Pradesh.
 * Enables zero-typing, bulletproof judge demonstrations under spotty/offline Wi-Fi.
 */

import { db, ChatMessage, MoodCheckIn, ScholarshipRecord, CareerQuizResultRecord } from '../db';
import { INITIAL_SCHOLARSHIPS, INITIAL_OFFLINE_LESSONS } from '../data/seedData';
import { MP_CAREER_CLUSTERS } from '../content/careerClusters';

export interface StudentProfileData {
  studentId: string;
  name: string;
  nameHi: string;
  age: number;
  gender: string;
  course: string;
  courseHi: string;
  year: string;
  college: string;
  collegeHi: string;
  district: string;
  districtHi: string;
  block: string;
  category: string;
  categoryHi: string;
  familyIncomeAnnual: number;
  familyIncomeFormatted: string;
  samagraId: string;
  mptaasProfileId: string;
  hostelStatus: string;
  hostelStatusHi: string;
  bankAccountSeeded: boolean;
  avatarSeed: string;
}

export const DEMO_STUDENT_PROFILE: StudentProfileData = {
  studentId: 'MP-DHAR-2024-88412',
  name: 'Rameshwar "Ramesh" Jamra',
  nameHi: 'रामेश्वर "रमेश" जामरा',
  age: 19,
  gender: 'Male',
  course: 'B.A. (History, Political Science & Hindi Literature)',
  courseHi: 'बी.ए. द्वितीय वर्ष (इतिहास, राजनीति विज्ञान एवं हिन्दी साहित्य)',
  year: '2nd Year (Semester 3)',
  college: 'Govt. Post Graduate College, Dhar (Affiliated to DAVV Indore)',
  collegeHi: 'शासकीय स्नातकोत्तर महाविद्यालय, धार (देवी अहिल्या वि.वि. संबद्ध)',
  district: 'Dhar',
  districtHi: 'धार (मालवा-निमाड़ आदिवासी अंचल)',
  block: 'Sardarpur Tehsil',
  category: 'Scheduled Tribe (ST / Bhil-Bhilala)',
  categoryHi: 'अनुसूचित जनजाति (ST / भील-भिलाला)',
  familyIncomeAnnual: 72000,
  familyIncomeFormatted: '₹72,000 / वर्ष (कृषि एवं ग्रामीण श्रम)',
  samagraId: '184920412',
  mptaasProfileId: 'ST-DHAR-2024-88412',
  hostelStatus: 'Day Scholar (Commuting 14 km by state bus)',
  hostelStatusHi: 'डे-स्कॉलर (सरदारपुर गांव से धार बस द्वारा आवागमन)',
  bankAccountSeeded: true,
  avatarSeed: 'rameshwar-jamra',
};

export const DEMO_CHAT_MESSAGES: Omit<ChatMessage, 'id'>[] = [
  {
    sender: 'student',
    text: 'म.प्र. उच्च शिक्षा NEP आधार पाठ्यक्रम के अनुसार मालवा और निमाड़ की प्रमुख लोक कलाएं क्या हैं?',
    timestamp: Date.now() - 3600 * 1000 * 48,
    syncStatus: 'synced',
    source: 'UG Foundation: Language & MP Culture (NEP 2020)',
  },
  {
    sender: 'ai',
    text: `म.प्र. उच्च शिक्षा फाउंडेशन नोट्स के अनुसार प्रमुख लोक कलाएं:\n\n1. माच (Maach): मालवा अंचल का पारंपरिक लोकनाट्य जो खुले मंच पर प्रस्तुत किया जाता है।\n2. पिथोरा (Pithora): भील एवं भिलाला जनजाति की पवित्र दीवार भित्ति चित्रकला।\n3. गणगौर एवं भगोरिया: निमाड़ व झाबुआ-धार अंचल के प्रमुख लोकोत्सव।\n\nस्रोत: शासकीय उच्च शिक्षा आधार पाठ्यक्रम (NEP 2020) मॉड्यूल 1`,
    timestamp: Date.now() - 3600 * 1000 * 48 + 3000,
    syncStatus: 'synced',
    source: 'UG Foundation: Language & MP Culture (NEP 2020)',
  },
  {
    sender: 'student',
    text: 'Sir, how do I apply for MPTAAS Post-Matric scholarship if my college counter verification is pending?',
    timestamp: Date.now() - 3600 * 1000 * 20,
    syncStatus: 'synced',
    source: 'MPTAAS & MMVY Step-by-Step Offline Guide',
  },
  {
    sender: 'ai',
    text: `According to the MP Tribal Affairs Department guidelines:\n\n1. Ensure your Samagra ID e-KYC is biometric/OTP verified.\n2. Verify that your Aadhaar is NPCI-seeded to your active bank account.\n3. Take your printed MPTAAS Application Slip + College Admission Fee Receipt to Counter #3 (Scholarship Clerk) at Govt. PG College Dhar for batch biometric sign-off.\n\nSource: MPTAAS & MMVY Step-by-Step Offline Guide`,
    timestamp: Date.now() - 3600 * 1000 * 20 + 2500,
    syncStatus: 'synced',
    source: 'MPTAAS & MMVY Step-by-Step Offline Guide',
  },
];

export const DEMO_MOOD_HISTORY: Omit<MoodCheckIn, 'id'>[] = [
  {
    date: new Date(Date.now() - 86400 * 1000 * 14).toISOString().split('T')[0],
    mood: 'good',
    notes: '2nd year classes started on schedule. Collected Political Science and History books from Dhar college library.',
    timestamp: Date.now() - 86400 * 1000 * 14,
  },
  {
    date: new Date(Date.now() - 86400 * 1000 * 7).toISOString().split('T')[0],
    mood: 'neutral',
    notes: 'Bus from Sardarpur had mechanical breakdown twice this week. Feeling slight fatigue with daily travel.',
    timestamp: Date.now() - 86400 * 1000 * 7,
  },
  {
    date: new Date(Date.now() - 86400 * 1000 * 2).toISOString().split('T')[0],
    mood: 'stressed',
    notes: 'Mid-term test timetable announced. Need to balance family soybean harvest work and college exam revision.',
    timestamp: Date.now() - 86400 * 1000 * 2,
  },
];

export const DEMO_CAREER_QUIZ_RESULT = {
  topClusterId: 'govt_civil_services',
  scores: {
    govt_civil_services: 38,
    teaching_education: 24,
    agriculture_allied: 20,
    entrepreneurship_business: 18,
    healthcare_allied: 12,
    skilling_iti_trades: 14,
    engineering_polytechnic: 8,
  },
  completedAt: Date.now() - 86400 * 1000 * 3,
};

/**
 * Seed all realistic demo data across IndexedDB and localStorage.
 */
export async function seedDemoData(): Promise<void> {
  try {
    // 1. Save student profile in localStorage
    localStorage.setItem('vidyasaathi_demo_mode', 'true');
    localStorage.setItem('vidyasaathi_student_profile', JSON.stringify(DEMO_STUDENT_PROFILE));

    // 2. Seed career quiz result
    localStorage.setItem('vidyasaathi_career_quiz', JSON.stringify(DEMO_CAREER_QUIZ_RESULT));
    
    // Clear and re-populate career quiz table in Dexie
    await db.careerQuizResult.clear();
    const cluster = MP_CAREER_CLUSTERS.govt_civil_services;
    const careerRecord: CareerQuizResultRecord = {
      clusterId: 'govt_civil_services',
      clusterName: cluster.name,
      clusterNameHi: cluster.nameHi,
      scores: DEMO_CAREER_QUIZ_RESULT.scores,
      completedAt: DEMO_CAREER_QUIZ_RESULT.completedAt,
    };
    await db.careerQuizResult.add(careerRecord);

    // 3. Seed pre-filled chat history
    await db.chatHistory.clear();
    for (const msg of DEMO_CHAT_MESSAGES) {
      await db.chatHistory.add(msg as ChatMessage);
    }

    // 4. Seed pre-filled mood history
    await db.moodCheckIns.clear();
    for (const mood of DEMO_MOOD_HISTORY) {
      await db.moodCheckIns.add(mood as MoodCheckIn);
    }

    // 5. Seed pre-filled Q&A cache for Learn tab
    await db.qaCache.clear();
    await db.qaCache.add({
      studentId: DEMO_STUDENT_PROFILE.studentId,
      subject: 'Political Science',
      question: 'What is the legislative procedure for passing an Ordinary Bill in the MP Vidhan Sabha?',
      answer: 'An Ordinary Bill passes through three readings: Introduction, Detailed Clause Discussion, and Final Voting. Once passed by simple majority, it is sent to the Governor for assent under Article 200 of the Constitution.',
      sourceTitle: 'MP Legislative Structure & State Governance (Module 2)',
      isOfflineAnswer: true,
      timestamp: Date.now() - 3600 * 1000 * 36,
    });
    await db.qaCache.add({
      studentId: DEMO_STUDENT_PROFILE.studentId,
      subject: 'Physics',
      question: 'What is the physical significance of conservation of angular momentum in rotating systems?',
      answer: 'If no external torque acts on a closed physical system, its total angular momentum remains constant (L = Iω). When moment of inertia decreases, angular velocity increases proportionally.',
      sourceTitle: 'Rotational Dynamics & Conservation Laws (Physics Unit 1)',
      isOfflineAnswer: true,
      timestamp: Date.now() - 3600 * 1000 * 18,
    });

    // 6. Seed scholarships if empty or reload
    const currentSchCount = await db.scholarships.count();
    if (currentSchCount === 0) {
      await db.scholarships.bulkAdd(INITIAL_SCHOLARSHIPS);
    }

    // 7. Seed offline lessons if empty
    const currentLessonCount = await db.downloadedLessons.count();
    if (currentLessonCount === 0) {
      await db.downloadedLessons.bulkAdd(INITIAL_OFFLINE_LESSONS);
    }

    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('vidyasaathi_demo_mode_changed', { detail: { active: true } }));
  } catch (err) {
    console.error('Failed to seed demo data:', err);
    throw err;
  }
}

/**
 * Clear demo mode state and return to fresh baseline.
 */
export async function clearDemoData(): Promise<void> {
  try {
    localStorage.removeItem('vidyasaathi_demo_mode');
    localStorage.removeItem('vidyasaathi_student_profile');
    localStorage.removeItem('vidyasaathi_career_quiz');
    
    await db.chatHistory.clear();
    await db.moodCheckIns.clear();
    await db.careerQuizResult.clear();

    window.dispatchEvent(new CustomEvent('vidyasaathi_demo_mode_changed', { detail: { active: false } }));
  } catch (err) {
    console.error('Failed to clear demo data:', err);
    throw err;
  }
}

/**
 * Check if demo mode is currently active.
 */
export function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('vidyasaathi_demo_mode') === 'true';
}

/**
 * Get active student profile (demo or default).
 */
export function getActiveStudentProfile(): StudentProfileData {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vidyasaathi_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
  }
  return DEMO_STUDENT_PROFILE;
}
