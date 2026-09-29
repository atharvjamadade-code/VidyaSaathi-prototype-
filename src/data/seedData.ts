import { ScholarshipRecord, DownloadedLesson } from '../db';

export const INITIAL_SCHOLARSHIPS: ScholarshipRecord[] = [
  {
    id: 'mptaas-post-matric-st',
    name: 'MPTAAS Post-Matric Scholarship for ST Students',
    nameHi: 'एमपीटास्क (MPTAAS) अनुसूचित जनजाति पोस्ट-मैट्रिक छात्रवृत्ति योजना',
    department: 'Tribal Affairs Department, Govt. of Madhya Pradesh',
    targetCategory: ['ST'],
    eligibleDistricts: ['Dhar', 'Barwani', 'Jhabua', 'Alirajpur', 'Mandla', 'Dindori', 'Khargone', 'All MP'],
    deadline: '2026-11-30',
    portalUrl: 'https://www.tribal.mp.gov.in/mptaas',
    isBookmarked: true,
    matchScore: 98,
  },
  {
    id: 'mmvy-higher-ed',
    name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
    nameHi: 'मुख्यमंत्री मेधावी विद्यार्थी योजना',
    department: 'Department of Higher Education, Govt. of Madhya Pradesh',
    targetCategory: ['ST', 'SC', 'OBC', 'General-EWS'],
    eligibleDistricts: ['All 55 MP Districts'],
    deadline: '2026-10-31',
    portalUrl: 'http://scholarshipportal.mp.nic.in/MedhaviChhatra',
    isBookmarked: false,
    matchScore: 88,
  },
  {
    id: 'gaon-ki-beti',
    name: 'Gaon Ki Beti Yojana (Rural Girl Student Incentive)',
    nameHi: 'गांव की बेटी योजना (ग्रामीण छात्राओं हेतु)',
    department: 'Higher Education Department, MP',
    targetCategory: ['All Rural Girl Students in MP'],
    eligibleDistricts: ['All MP Rural Gram Panchayats'],
    deadline: '2026-12-15',
    portalUrl: 'http://scholarshipportal.mp.nic.in',
    isBookmarked: true,
    matchScore: 92,
  },
  {
    id: 'nsp-post-matric-sc',
    name: 'National Scholarship Portal (NSP) - Post Matric for SC Students',
    nameHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) - अनुसूचित जाति पोस्ट मैट्रिक',
    department: 'Ministry of Social Justice and Empowerment, Govt. of India',
    targetCategory: ['SC'],
    eligibleDistricts: ['All MP Districts'],
    deadline: '2026-11-15',
    portalUrl: 'https://scholarships.gov.in',
    isBookmarked: false,
    matchScore: 85,
  },
];

export const INITIAL_OFFLINE_LESSONS: DownloadedLesson[] = [
  {
    id: 'ug-foundation-hindi-mp',
    title: 'बी.ए./बी.एससी./बी.कॉम. आधार पाठ्यक्रम (Foundation Course: भाषा एवं संस्कृति)',
    subject: 'Higher Education Foundation',
    language: 'hi',
    summary: 'मध्य प्रदेश उच्च शिक्षा विभाग के राष्ट्रीय शिक्षा नीति (NEP) पाठ्यक्रम अनुसार हिंदी भाषा और मध्य प्रदेश की लोक संस्कृति।',
    content: '# मध्य प्रदेश की लोक संस्कृति एवं बोलियां\n\nमध्य प्रदेश में बुंदेली, बघेली, मालवी, निमाड़ी, गोंडी और भीली प्रमुख लोक बोलियां हैं। धार, झाबुआ, बड़वानी, और मंडला अंचल में भीली और गोंडी संस्कृति का समृद्ध इतिहास है।',
    downloadedAt: Date.now(),
    sizeBytes: 12400,
  },
  {
    id: 'scholarship-document-checklist',
    title: 'MPTAAS & Scholarship Offline Document Checklist',
    subject: 'Scholarship Guidance',
    language: 'en',
    summary: 'Essential documents checklist for MP scholarship e-KYC and college nodal verification.',
    content: '# MPTAAS Verification Checklist\n1. Samagra ID (e-KYC verified)\n2. Digital Caste Certificate (High-resolution barcode)\n3. MP Domicile Certificate (Mool Niwas)\n4. Income Certificate (within valid financial year)\n5. Aadhaar-seeded Bank Account (NPCI active)\n6. College Admission Receipt & Scholar No.',
    downloadedAt: Date.now(),
    sizeBytes: 8900,
  }
];

export const MP_TARGET_DISTRICTS = [
  { name: 'Dhar', nameHi: 'धार', zone: 'Malwa Tribal Belt' },
  { name: 'Barwani', nameHi: 'बड़वानी', zone: 'Nimar Tribal Belt' },
  { name: 'Jhabua', nameHi: 'झाबुआ', zone: 'Bhíl Belt' },
  { name: 'Alirajpur', nameHi: 'आलीराजपुर', zone: 'Bhíl Belt' },
  { name: 'Mandla', nameHi: 'मंडला', zone: 'Gondwana Belt' },
  { name: 'Dindori', nameHi: 'डिंडौरी', zone: 'Baiga-Gond Belt' },
  { name: 'Khargone', nameHi: 'खरगोन', zone: 'West Nimar' },
  { name: 'Sheopur', nameHi: 'श्योपुर', zone: 'Chambal Belt' },
  { name: 'Chhindwara', nameHi: 'छिंदवाड़ा', zone: 'Satpura Tribal Belt' },
  { name: 'Betul', nameHi: 'बैतूल', zone: 'Korku-Gond Belt' },
];
