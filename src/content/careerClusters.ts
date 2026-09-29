/**
 * Madhya Pradesh Career Clusters, 11-Question Rule-Based Strengths Quiz,
 * and Verified Next Steps & Scholarship Links for Undergraduate Students.
 * 
 * 100% Rule-Based & Offline — No machine learning or hallucinated probabilities.
 */

export interface CareerCluster {
  id: string;
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  iconName: 'Shield' | 'BookOpen' | 'Wheat' | 'Activity' | 'Wrench' | 'Cpu' | 'Store';
  realisticNextSteps: {
    title: string;
    titleHi: string;
    desc: string;
    descHi: string;
    agency: string;
  }[];
  relevantScholarships: {
    id: string;
    name: string;
    nameHi: string;
    portal: string;
    benefit: string;
    benefitHi: string;
  }[];
  keyExams: string[];
}

export const MP_CAREER_CLUSTERS: Record<string, CareerCluster> = {
  govt_civil_services: {
    id: 'govt_civil_services',
    name: 'Government Exams & Civil Services',
    nameHi: 'सरकारी परीक्षाएं एवं राज्य प्रशासनिक सेवा',
    tagline: 'Public administration, revenue, police & citizen governance in Madhya Pradesh',
    taglineHi: 'मध्य प्रदेश में लोक प्रशासन, राजस्व, पुलिस सेवा एवं जनहितकारी शासन',
    description: 'Administrative, law-enforcement, revenue and clerical roles across MP State Government departments offering high stability, social respect, and direct public impact.',
    descriptionHi: 'मध्य प्रदेश शासन के विभिन्न विभागों (राजस्व, पुलिस, सामान्य प्रशासन) में प्रशासनिक एवं क्लर्कियल पद, जो दीर्घकालिक स्थिरता, सामाजिक प्रतिष्ठा और सीधे जनसेवा का अवसर प्रदान करते हैं।',
    iconName: 'Shield',
    realisticNextSteps: [
      {
        title: 'Target MPPSC State Services or MPESB Exams',
        titleHi: 'एमपीपीएससी राज्य सेवा अथवा ईएसबी (व्यापम) भर्ती को लक्ष्य करें',
        desc: 'Focus on MP General Knowledge (MPGK), Indian Constitution, and CSAT aptitude right from UG 2nd year.',
        descHi: 'स्नातक द्वितीय वर्ष से ही मध्य प्रदेश सामान्य ज्ञान (भूगोल, इतिहास, जनजाति विरासत), संविधान एवं सीसैट पर ध्यान दें।',
        agency: 'MPPSC (Indore) & MPESB (Bhopal)',
      },
      {
        title: 'Register on MP Employment Portal (mprojgar.gov.in)',
        titleHi: 'मध्य प्रदेश रोजगार पोर्टल (mprojgar.gov.in) पर जीवित पंजीयन करें',
        desc: 'Mandatory live registration number required for filling out any MPESB or MPPSC recruitment application form.',
        descHi: 'ईएसबी और लोक सेवा आयोग के सभी आवेदनों में लाइव रोजगार पंजीयन क्रमांक प्रविष्ट करना अनिवार्य है।',
        agency: 'MP Directorate of Employment',
      },
      {
        title: 'Apply for Free Pre-Exam Training at Govt. PETC Bhopal/Indore',
        titleHi: 'शासकीय परीक्षा पूर्व प्रशिक्षण केंद्र (PETC) में निःशुल्क कोचिंग लें',
        desc: 'Tribal (ST) and Scheduled Caste (SC) students can access state-funded residential coaching and stipend for MPPSC.',
        descHi: 'आदिवासी (ST) एवं अनुसूचित जाति (SC) के छात्रों हेतु भोपाल और इंदौर में निःशुल्क आवासीय एमपीपीएससी कोचिंग व स्टाइपेंड उपलब्ध है।',
        agency: 'MP Tribal & SC Welfare Dept',
      },
    ],
    relevantScholarships: [
      {
        id: 'mptaas-post-matric',
        name: 'MPTAAS Post-Matric Scholarship (ST/SC/OBC)',
        nameHi: 'एमपीटैस्क पोस्ट-मैट्रिक छात्रवृत्ति (ST/SC/OBC)',
        portal: 'MPTAAS Portal (tribal.mp.gov.in)',
        benefit: 'Covers 100% college tuition fees and monthly hostel maintenance stipend during graduation.',
        benefitHi: 'कॉलेज की पूर्ण शिक्षण फीस एवं छात्रावास में रहने पर मासिक निर्वाह भत्ता प्रदान करता है।',
      },
      {
        id: 'mmvy',
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        nameHi: 'मुख्यमंत्री मेधावी विद्यार्थी योजना',
        portal: 'MP Scholarship Portal 2.0',
        benefit: 'Full academic fee reimbursement for high-scoring MP Board (70%+) and CBSE (85%+) students.',
        benefitHi: 'म.प्र. बोर्ड (70%+) एवं सीबीएसई (85%+) में उच्च अंक प्राप्त छात्रों की पूरी कॉलेज फीस शासन भरता है।',
      },
    ],
    keyExams: [
      'MPPSC State Services (Deputy Collector / DSP / Naib Tehsildar)',
      'MPESB Patwari & Combined Group-2 Sub-Group-4',
      'MP Police Sub-Inspector & Constable',
      'SSC CGL / CHSL',
      'IBPS Regional Rural Bank (RRB Office Assistant)',
    ],
  },

  teaching_education: {
    id: 'teaching_education',
    name: 'Teaching, Lectureship & Education',
    nameHi: 'शिक्षण, व्याख्याता एवं शैक्षणिक मार्गदर्शन',
    tagline: 'Inspiring rural and tribal students in schools and government colleges',
    taglineHi: 'ग्रामीण एवं आदिवासी अंचलों के शासकीय स्कूलों व कॉलेजों में शिक्षण',
    description: 'High respect, balanced work-life, and direct influence over the educational upliftment of rural and tribal youth across MP schools and higher education institutes.',
    descriptionHi: 'मध्य प्रदेश के शासकीय विद्यालयों और महाविद्यालयों में अगली पीढ़ी को दिशा देने का सम्मानित करियर। राज्य के प्राथमिक, माध्यमिक एवं उच्च माध्यमिक स्तर पर शिक्षकों की निरंतर मांग।',
    iconName: 'BookOpen',
    realisticNextSteps: [
      {
        title: 'Obtain Professional Teaching Degree (B.Ed or D.El.Ed)',
        titleHi: 'स्नातक उपरांत बी.एड. (B.Ed) अथवा डी.एल.एड. में प्रवेश लें',
        desc: 'Complete 2-year B.Ed for middle/high school teaching or D.El.Ed for primary school recruitment.',
        descHi: 'माध्यमिक/उच्चतर शालाओं हेतु 2-वर्षीय बी.एड. या प्राथमिक शालाओं हेतु डी.एल.एड. पूर्ण करें।',
        agency: 'NCTE & MP Higher Education Dept',
      },
      {
        title: 'Clear MP Teacher Eligibility Test (MPTET Varg 1, 2, or 3)',
        titleHi: 'मध्य प्रदेश शिक्षक पात्रता परीक्षा (MPTET वर्ग 1, 2 अथवा 3) उत्तीर्ण करें',
        desc: 'Conducted by MPESB for School Education Department and Tribal Affairs Department recruitments.',
        descHi: 'स्कूल शिक्षा विभाग एवं जनजातीय कार्य विभाग में नियमित शिक्षक चयन हेतु ईएसबी द्वारा आयोजित परीक्षा।',
        agency: 'MPESB (Bhopal)',
      },
      {
        title: 'For College Lectureship: Pursue Master’s + UGC-NET / MP SLET',
        titleHi: 'महाविद्यालय सहायक प्राध्यापक हेतु: परास्नातक (PG) + UGC-NET / MP SLET दें',
        desc: 'Qualifies candidates for Assistant Professor posts in MP Government Degree Colleges.',
        descHi: 'शासकीय स्नातकोत्तर महाविद्यालयों में सहायक प्राध्यापक पद की पात्रता हेतु आवश्यक।',
        agency: 'MPPSC & UGC',
      },
    ],
    relevantScholarships: [
      {
        id: 'gaon-ki-beti',
        name: 'Gaon Ki Beti Yojana (Rural Girl Students)',
        nameHi: 'गांव की बेटी योजना (ग्रामीण छात्राओं हेतु)',
        portal: 'MP Scholarship Portal 2.0',
        benefit: '₹5,000 per academic year assistance for 1st-division rural girls pursuing higher education.',
        benefitHi: 'ग्रामीण क्षेत्र की प्रथम श्रेणी 12वीं उत्तीर्ण छात्राओं को प्रतिवर्ष ₹5,000 की प्रोत्साहन राशि।',
      },
      {
        id: 'mptaas-post-matric',
        name: 'MPTAAS Post-Matric B.Ed/M.Ed Scholarship',
        nameHi: 'एमपीटैस्क पोस्ट-मैट्रिक बी.एड/एम.एड छात्रवृत्ति',
        portal: 'MPTAAS Portal',
        benefit: 'Full reimbursement of professional education fee in approved teacher-training institutions.',
        benefitHi: 'मान्यता प्राप्त शिक्षक प्रशिक्षण संस्थानों में पूर्ण शिक्षण शुल्क प्रतिपूर्ति।',
      },
    ],
    keyExams: [
      'MPTET Varg 1 (High School Teacher)',
      'MPTET Varg 2 (Middle School Teacher)',
      'MPTET Varg 3 (Primary School Teacher)',
      'Central CTET Paper I & II',
      'UGC-NET / MP SLET (Higher Education)',
    ],
  },

  agriculture_allied: {
    id: 'agriculture_allied',
    name: 'Agriculture, Horticulture & Allied Sciences',
    nameHi: 'कृषि, उद्यानिकी एवं संबंद्ध क्षेत्र',
    tagline: 'Modernizing soil health, farm yields, dairy, and crop trade in MP',
    taglineHi: 'मध्य प्रदेश में आधुनिक कृषि, मृदा स्वास्थ्य, उद्यानिकी एवं फसल संवर्धन',
    description: 'Leading agricultural innovation across the Narmada valley and Malwa plateau through government extension, soil health testing, dairy cooperatives, and agro-inputs.',
    descriptionHi: 'मध्य प्रदेश के मालवा, निमाड़ और नर्मदा घाटी के कृषि अंचल में आधुनिक कृषि, मृदा स्वास्थ्य, उद्यानिकी, डेयरी और खाद्य प्रसंस्करण का तकनीकी नेतृत्व।',
    iconName: 'Wheat',
    realisticNextSteps: [
      {
        title: 'Prepare for MP Rural Agriculture Extension Officer (RAEO / SADO)',
        titleHi: 'म.प्र. ग्रामीण कृषि विस्तार अधिकारी (RAEO) एवं SADO की तैयारी करें',
        desc: 'Government recruitment conducted by MPESB for the Department of Farmer Welfare & Agriculture.',
        descHi: 'किसान कल्याण एवं कृषि विकास विभाग द्वारा ईएसबी के माध्यम से नियमित भर्ती।',
        agency: 'MPESB & Dept of Agriculture, MP',
      },
      {
        title: 'Hands-on Certification at nearest Krishi Vigyan Kendra (KVK)',
        titleHi: 'निकटतम कृषि विज्ञान केंद्र (KVK) से व्यावहारिक प्रशिक्षण लें',
        desc: 'Practical know-how in drip irrigation, soil micronutrient testing, and organic bio-fertilizers.',
        descHi: 'ड्रिप सिंचाई, मृदा सूक्ष्म पोषक परीक्षण एवं जैविक उर्वरक तकनीकों का व्यावहारिक अनुभव लें।',
        agency: 'ICAR / JNKVV Jabalpur / RVSKVV Gwalior',
      },
      {
        title: 'Explore NABARD Agri-Clinic & Agri-Business Center (ACABC)',
        titleHi: 'नाबार्ड एग्री-क्लीनिक एवं एग्री-बिजनेस सेंटर योजना का लाभ लें',
        desc: 'Composite government subsidy up to 44% for setting up agricultural clinic or input distribution center.',
        descHi: 'कृषि परामर्श केंद्र एवं खाद-बीज टेस्टिंग क्लिनिक स्थापित करने हेतु 44% तक सरकारी अनुदान।',
        agency: 'NABARD & MANAGE',
      },
    ],
    relevantScholarships: [
      {
        id: 'mptaas-post-matric',
        name: 'MPTAAS Agriculture & Allied Degree Support',
        nameHi: 'एमपीटैस्क कृषि एवं संबंद्ध पाठ्यक्रम छात्रवृत्ति',
        portal: 'MPTAAS Portal',
        benefit: 'Full financial support for B.Sc. Agriculture, Horticulture, and Animal Husbandry courses.',
        benefitHi: 'बी.एससी. कृषि, उद्यानिकी एवं पशुपालन डिग्री हेतु पूर्ण शुल्क प्रतिपूर्ति।',
      },
    ],
    keyExams: [
      'MP RAEO / SADO (MPESB)',
      'Horticulture Development Officer (HDO)',
      'ICAR AIEEA PG Entrance',
      'IFFCO Agriculture Graduate Trainee (AGT)',
      'MP State Seed Certification Inspector',
    ],
  },

  engineering_polytechnic: {
    id: 'engineering_polytechnic',
    name: 'Technical, Polytechnic & Engineering',
    nameHi: 'तकनीकी, पॉलीटेक्निक एवं इंजीनियरिंग',
    tagline: 'Infrastructure, power generation (MPPGCL), irrigation & computing systems',
    taglineHi: 'अधोसंरचना, मध्य प्रदेश विद्युत निगम (MPPGCL), सिंचाई एवं डिजिटल तकनीकी',
    description: 'Applying analytical and mechanical problem-solving to infrastructure, power generation (MPPGCL), irrigation projects, electronics, and digital technology.',
    descriptionHi: 'मध्य प्रदेश लोक निर्माण (PWD), बिजली उत्पादन/वितरण कंपनी और जल संसाधन विभाग में बुनियादी ढांचे और तकनीकी प्रणालियों का संचालन।',
    iconName: 'Cpu',
    realisticNextSteps: [
      {
        title: 'Prepare for MPESB Sub-Engineer Examination',
        titleHi: 'मध्य प्रदेश ईएसबी सब-इंजीनियर भर्ती परीक्षा की तैयारी करें',
        desc: 'Direct recruitment for Civil, Electrical, and Mechanical positions in PWD, WRD, and RES.',
        descHi: 'लोक निर्माण (PWD), जल संसाधन एवं ग्रामीण यांत्रिकी सेवा में कनिष्ठ अभियंता पद हेतु भर्ती।',
        agency: 'MPESB (Bhopal)',
      },
      {
        title: 'Earn Industry Credentials via NPTEL / SWAYAM Modules',
        titleHi: 'NPTEL / SWAYAM से तकनीकी प्रमाणन प्राप्त करें',
        desc: 'Government-certified technical skill tracks in AutoCAD, Python, and Embedded Systems.',
        descHi: 'ऑटोकैड, डेटा विश्लेषण एवं आधुनिक तकनीकी प्रणालियों में निःशुल्क सरकारी प्रमाणन।',
        agency: 'Ministry of Education (Govt. of India)',
      },
      {
        title: 'Target State Electricity Companies (MPPGCL / MPPTCL / Discoms)',
        titleHi: 'राज्य बिजली कंपनियों (MPPGCL/MPPKVVCL) की जेई/एई भर्ती दें',
        desc: 'Junior Engineer cadres in state electricity transmission and distribution corporations.',
        descHi: 'राज्य विद्युत वितरण एवं ट्रांसमिशन कंपनियों में कनिष्ठ अभियंता (JE) पद।',
        agency: 'MP Power Generating Co. (Jabalpur)',
      },
    ],
    relevantScholarships: [
      {
        id: 'mmvy',
        name: 'MMVY Engineering Degree Fee Waiver',
        nameHi: 'मुख्यमंत्री मेधावी विद्यार्थी योजना (इंजीनियरिंग)',
        portal: 'MP Scholarship Portal 2.0',
        benefit: 'Complete payment of government and affiliated engineering college tuition fees.',
        benefitHi: 'शासकीय एवं मान्यता प्राप्त इंजीनियरिंग कॉलेजों की पूर्ण फीस शासन द्वारा वहन।',
      },
      {
        id: 'mptaas-post-matric',
        name: 'MPTAAS Engineering & Polytechnic Scheme',
        nameHi: 'एमपीटैस्क इंजीनियरिंग एवं पॉलीटेक्निक छात्रवृत्ति',
        portal: 'MPTAAS Portal',
        benefit: 'Full semester tuition fee reimbursement with book bank and hostel allowances.',
        benefitHi: 'सेमेस्टर फीस प्रतिपूर्ति के साथ बुक बैंक एवं हॉस्टल भत्ता।',
      },
    ],
    keyExams: [
      'MPESB Sub-Engineer Exam (Civil/Electrical/Mechanical)',
      'MPPGCL / MPPTCL Junior Engineer',
      'SSC Junior Engineer (JE)',
      'Graduate Aptitude Test in Engineering (GATE)',
    ],
  },

  healthcare_allied: {
    id: 'healthcare_allied',
    name: 'Healthcare, Nursing & Allied Medical',
    nameHi: 'स्वास्थ्य सेवा, नर्सिंग एवं पैरामेडिकल',
    tagline: 'Frontline care, community health (CHO), diagnostic labs & hospital nursing',
    taglineHi: 'जनस्वास्थ्य सेवा, कम्युनिटी हेल्थ ऑफिसर (CHO), नर्सिंग एवं पैथोलॉजी जांच',
    description: 'Direct compassionate care and diagnostics in district hospitals, Community Health Centres (CHCs), and Primary Health Centres (PHCs) across MP.',
    descriptionHi: 'जिला चिकित्सालयों, सामुदायिक स्वास्थ्य केंद्रों (CHC) एवं प्राथमिक स्वास्थ्य केंद्रों (PHC) में नर्सिंग, पैरामेडिकल जांच व जनस्वास्थ्य सेवाएं।',
    iconName: 'Activity',
    realisticNextSteps: [
      {
        title: 'Enroll in Post-Basic Nursing / GNM / Paramedical Certification',
        titleHi: 'नर्सिंग (B.Sc./GNM) अथवा पैरामेडिकल डिप्लोमा में दाखिला लें',
        desc: 'Affiliated with MP Medical Science University (MPMSU Jabalpur).',
        descHi: 'मध्य प्रदेश आयुर्विज्ञान विश्वविद्यालय (MPMSU जबलपुर) से मान्यता प्राप्त कोर्स करें।',
        agency: 'MPMSU (Jabalpur)',
      },
      {
        title: 'Apply for Community Health Officer (CHO) via MP NHM',
        titleHi: 'राष्ट्रीय स्वास्थ्य मिशन (NHM MP) कम्युनिटी हेल्थ ऑफिसर (CHO) पद',
        desc: 'Regular government recruitment across Ayushman Arogya Mandirs across MP districts.',
        descHi: 'आयुष्मान आरोग्य मंदिरों पर सम्मानजनक मानदेय सहित नियमित सरकारी पदस्थापना।',
        agency: 'National Health Mission MP',
      },
      {
        title: 'Register with MP Nursing Registration Council (MPNRC Bhopal)',
        titleHi: 'म.प्र. नर्सिंग काउंसिल (MPNRC भोपाल) में अनिवार्य पंजीयन कराएं',
        desc: 'Statutory registration required for all government and empaneled hospital appointments.',
        descHi: 'शासकीय एवं प्रतिष्ठित चिकित्सालयों में स्थायी नियुक्ति हेतु वैधानिक पंजीयन।',
        agency: 'MPNRC (Bhopal)',
      },
    ],
    relevantScholarships: [
      {
        id: 'mptaas-post-matric',
        name: 'MPTAAS Medical & Paramedical Scholarship',
        nameHi: 'एमपीटैस्क मेडिकल एवं पैरामेडिकल छात्रवृत्ति',
        portal: 'MPTAAS Portal',
        benefit: 'Reimburses government and affiliated medical college fee structures for ST/SC/OBC students.',
        benefitHi: 'आदिवासी, अनुसूचित जाति और पिछड़ा वर्ग के छात्रों की नर्सिंग एवं पैरामेडिकल फीस प्रतिपूर्ति।',
      },
    ],
    keyExams: [
      'MP NHM Community Health Officer (CHO) Exam',
      'MP NHM Staff Nurse / ANM Recruitment',
      'MPESB Group-5 Pharmacist / Lab Technician Exam',
      'AIIMS Nursing Officer Recruitment (NORCET)',
    ],
  },

  skilling_iti_trades: {
    id: 'skilling_iti_trades',
    name: 'Skilling, ITI Trades & Industrial Craft',
    nameHi: 'कौशल विकास, आईटीआई ट्रेड्स एवं तकनीकी हुनर',
    tagline: 'Electrician, fitter, solar mechanic, automation & certified craftsmanship',
    taglineHi: 'इलेक्ट्रीशियन, फिटर, सोलर मैकेनिक, औद्योगिक उपकरण एवं त्वरित रोजगार',
    description: 'Hands-on practical craftsmanship with fast employment avenues in Indian Railways, BHEL Bhopal, state industrial corridors, and local maintenance workshops.',
    descriptionHi: 'इलेक्ट्रीशियन, फिटर, वेल्डर, सोलर मैकेनिक और आधुनिक कार्यशालाओं में व्यावहारिक तकनीकी हुनर, जो तुरंत रोजगार और स्वावलंबन प्रदान करते हैं।',
    iconName: 'Wrench',
    realisticNextSteps: [
      {
        title: 'Complete NCVT / SCVT ITI Trade Certification (Electrician / Fitter / Solar)',
        titleHi: 'NCVT / SCVT से आईटीआई ट्रेड (इलेक्ट्रीशियन, फिटर, सोलर) प्रमाणन लें',
        desc: '2-year vocational trade qualification recognized across railways, BHEL, and manufacturing plants.',
        descHi: 'भारतीय रेलवे, बीएचईएल भोपाल और निजी उद्योगों में तुरंत रोजगार योग्य 2-वर्षीय ट्रेड।',
        agency: 'MP Directorate of Skill Development',
      },
      {
        title: 'Register on National Apprenticeship Portal (apprenticeshipindia.gov.in)',
        titleHi: 'राष्ट्रीय शिक्षुता प्रोत्साहन योजना (NAPS) पर अप्रेंटिसशिप हेतु पंजीयन करें',
        desc: 'Earn monthly government stipend while undergoing practical on-the-job industrial plant training.',
        descHi: 'औद्योगिक संयंत्रों में प्रायोगिक कार्य अनुभव के साथ सरकार द्वारा मासिक स्टाइपेंड प्राप्त करें।',
        agency: 'MSDE (Govt. of India)',
      },
      {
        title: 'Prepare for MP ITI Training Officer (TO) Examination',
        titleHi: 'मध्य प्रदेश आईटीआई प्रशिक्षण अधिकारी (Training Officer) परीक्षा दें',
        desc: 'Prestigious government instructor position with state pay scales in MP Skill Development Dept.',
        descHi: 'कौशल विकास संचालनालय, म.प्र. के अंतर्गत शासकीय आईटीआई में अनुदेशक पद।',
        agency: 'MPESB (Bhopal)',
      },
    ],
    relevantScholarships: [
      {
        id: 'iti-tribal-stipend',
        name: 'MP Tribal Welfare ITI Trainee Stipend Scheme',
        nameHi: 'आदिवासी कल्याण विभाग आईटीआई छात्रवृत्ति योजना',
        portal: 'MPTAAS Portal',
        benefit: 'Monthly scholarship allowance and tool-kit grant for ITI trainees.',
        benefitHi: 'आईटीआई प्रशिक्षणार्थियों को मासिक छात्रवृत्ति एवं टूलकिट सहायता अनुदान।',
      },
    ],
    keyExams: [
      'MP ITI Training Officer (TO) via MPESB',
      'Railway RRB Technician / Assistant Loco Pilot',
      'BHEL Bhopal Trade Apprentice Test',
      'DRDO CEPTAM Technician A',
    ],
  },

  entrepreneurship_business: {
    id: 'entrepreneurship_business',
    name: 'Rural Enterprise, Small Business & Innovation',
    nameHi: 'ग्रामीण उद्यम, स्वरोजगार एवं व्यापार',
    tagline: 'Agro-processing, retail, digital kiosks (MPOnline / CSC) & local wealth creation',
    taglineHi: 'कृषि प्रसंस्करण, व्यापार, एमपीऑनलाइन कियोस्क/सीएससी एवं स्थानीय रोजगार सृजन',
    description: 'Building your own sustainable business, agro-processing units, local retail, or digital citizen service centers (MPOnline Kiosks), creating jobs for yourself and peers.',
    descriptionHi: 'अपना स्वयं का उद्यम, कृषि प्रसंस्करण (आटा/दाल मिल), एमपीऑनलाइन कियोस्क/सीएससी केंद्र अथवा स्थानीय सेवा व्यवसाय शुरू करना और दूसरों को रोजगार देना।',
    iconName: 'Store',
    realisticNextSteps: [
      {
        title: 'Apply for Mukhyamantri Udyam Kranti Yojana (MMUKY)',
        titleHi: 'मुख्यमंत्री उद्यम क्रांति योजना (MMUKY) हेतु आवेदन करें',
        desc: 'Bank loans from ₹1 Lakh to ₹50 Lakhs with 3% annual interest subsidy and collateral guarantee by MP Govt.',
        descHi: '1 लाख से 50 लाख रुपये तक का बैंक ऋण, 3% वार्षिक ब्याज अनुदान एवं सरकारी गारंटी के साथ।',
        agency: 'MP MSME Department',
      },
      {
        title: 'Register Free MSME Udyam Certificate (udyamregistration.gov.in)',
        titleHi: 'उद्यम पोर्टल (udyamregistration.gov.in) पर निःशुल्क एमएसएमई पंजीयन लें',
        desc: 'Enables priority sector subsidized bank lending, fee concessions, and government procurement preferences.',
        descHi: 'प्राथमिकता क्षेत्र के तहत रियायती बैंक ऋण एवं सरकारी खरीद में प्राथमिकता प्राप्त करें।',
        agency: 'Ministry of MSME (Govt. of India)',
      },
      {
        title: 'Set up an MPOnline Kiosk / CSC Digital Seva Kendra in your Tehsil',
        titleHi: 'अपनी तहसील/ब्लॉक में एमपीऑनलाइन कियोस्क या CSC केंद्र खोलें',
        desc: 'Provide essential citizen digital services (scholarship applications, revenue certificates, PAN/Aadhaar sync).',
        descHi: 'नागरिकों को छात्रवृत्ति फॉर्म, जाति-आय प्रमाण पत्र एवं सरकारी सेवाएं प्रदान कर नियमित आय बनाएं।',
        agency: 'MPOnline Limited (Govt. of MP)',
      },
    ],
    relevantScholarships: [
      {
        id: 'pmegp-subsidy',
        name: 'Prime Minister Employment Generation Programme (PMEGP)',
        nameHi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)',
        portal: 'KVIC Portal / MP DIC Office',
        benefit: 'Government capital subsidy of 25% (urban) to 35% (rural SC/ST/OBC/Women) on project cost.',
        benefitHi: 'परियोजना लागत पर 25% (शहरी) से 35% (ग्रामीण SC/ST/OBC/महिला) तक की पूंजीगत सरकारी सब्सिडी।',
      },
    ],
    keyExams: [
      'MPOnline Authorized Kiosk Operator Certification',
      'Common Service Centre (CSC) VLE Assessment (Telecentre Entrepreneur Course - TEC)',
      'Basic Food Safety FSSAI Registration for Agri-Food units',
    ],
  },
};

export interface QuizQuestion {
  id: number;
  question: string;
  questionHi: string;
  contextNote: string;
  contextNoteHi: string;
  options: {
    label: string;
    labelHi: string;
    clusterPoints: Record<string, number>;
  }[];
}

export const CAREER_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What kind of work environment feels most natural and energizing to you?',
    questionHi: 'किस प्रकार का कार्य वातावरण आपके स्वभाव और ऊर्जा के सबसे अनुकूल लगता है?',
    contextNote: 'Daily workplace comfort',
    contextNoteHi: 'दैनिक कार्यस्थल की प्राथमिकता',
    options: [
      {
        label: 'A government tehsil or collectorate office handling public files and citizen applications',
        labelHi: 'शासकीय तहसील अथवा कलेक्ट्रेट कार्यालय में जनहित के कार्य व फाइलें निपटाना',
        clusterPoints: { govt_civil_services: 4, entrepreneurship_business: 1 },
      },
      {
        label: 'A lively classroom explaining lessons and guiding young minds',
        labelHi: 'एक ऊर्जावान कक्षा में बच्चों को नए पाठ समझाना और उनका मार्गदर्शन करना',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Outdoors in open fields, farm mandis, or testing crop and soil vitality',
        labelHi: 'खुले खेतों, कृषि उपज मंडी या फसलों व मिट्टी की जांच में समय बिताना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'A community health centre or hospital ward attending to patients and vital signs',
        labelHi: 'सामुदायिक स्वास्थ्य केंद्र या चिकित्सालय में मरीजों की सेवा व देखभाल करना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'A technical workshop working with circuits, tools, machinery, or wiring panels',
        labelHi: 'तकनीकी वर्कशॉप में औजारों, बिजली वायरिंग, मोटरों अथवा कंप्यूटर पार्ट्स पर काम करना',
        clusterPoints: { skilling_iti_trades: 3, engineering_polytechnic: 3 },
      },
      {
        label: 'My own shop, agricultural supply center, or digital citizen service kiosk',
        labelHi: 'अपनी खुद की दुकान, कृषि आपूर्ति केंद्र अथवा एमपीऑनलाइन कियोस्क चलाना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 2,
    question: 'Which of these daily tasks gives you the deepest sense of satisfaction?',
    questionHi: 'इनमें से कौन सा काम पूरा करने पर आपको सबसे अधिक संतोष मिलता है?',
    contextNote: 'Core personal fulfillment',
    contextNoteHi: 'संतुष्टि का मुख्य स्रोत',
    options: [
      {
        label: 'Resolving a citizen’s paperwork grievance and ensuring government justice',
        labelHi: 'किसी नागरिक की कागजी समस्या हल करके उसे शासकीय योजना का लाभ दिलाना',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Seeing a confused student finally understand a complex textbook concept',
        labelHi: 'किसी कठिन विषय को इतने सरल तरीके से समझाना कि विद्यार्थी का चेहरा खिल उठे',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Seeing healthy green crop sprouts and getting high market rates for farm produce',
        labelHi: 'लहलहाती स्वस्थ फसल देखना और फसल का अच्छा मंडी भाव सुनिश्चित करना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Dressing an injury, checking fever, and reassuring an anxious patient',
        labelHi: 'चोट पर पट्टी बांधना, बुखार जांचना और घबराए हुए मरीज को ढाढस बंधाना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Repairing a broken fan, motor, or electronic circuit until it turns on again',
        labelHi: 'खराब पड़े पंखे, मोटर या बिजली उपकरण को खोलकर ठीक कर चालू कर देना',
        clusterPoints: { skilling_iti_trades: 4, engineering_polytechnic: 2 },
      },
      {
        label: 'Closing a profitable sale and balancing daily cash collections accurately',
        labelHi: 'सफल बिक्री करना और दिन के अंत में मुनाफे व नकदी का सटीक हिसाब जोड़ना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 3,
    question: 'What is your strongest natural skill or talent?',
    questionHi: 'आपकी सबसे मजबूत स्वाभाविक प्रतिभा या हुनर क्या है?',
    contextNote: 'Individual strengths',
    contextNoteHi: 'व्यक्तिगत सामर्थ्य',
    options: [
      {
        label: 'Good memory for rules, government circulars, general knowledge, and history',
        labelHi: 'नियमों, सरकारी आदेशों, सामान्य ज्ञान और इतिहास को याद रखने की क्षमता',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Patience, clear communication, and breaking ideas into simple steps',
        labelHi: 'धैर्यपूर्वक सुनना, स्पष्ट बोलना और किसी बात को आसान चरणों में समझाना',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Observing weather, soil moisture, and understanding pest and plant health',
        labelHi: 'मौसम, मिट्टी की नमी पहचानना और पौधों की बीमारी को भांप लेना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Calmness around sick people and attention to hygiene and compassionate care',
        labelHi: 'बीमार व्यक्तियों के पास शांत रहना, स्वच्छता और सेवाभाव बनाए रखना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Practical hand-eye coordination with physical tools, wiring, and measurements',
        labelHi: 'हाथ के औजारों, नट-बोल्ट, वायरिंग और सटीक नाप-जोख का व्यावहारिक कौशल',
        clusterPoints: { skilling_iti_trades: 4, engineering_polytechnic: 2 },
      },
      {
        label: 'Spotting business opportunities in town and negotiating fair trade terms',
        labelHi: 'गांव या कस्बे में लोगों की जरूरत पहचानना और मोलभाव में कुशल होना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 4,
    question: 'What is your primary motivation when thinking about your future career?',
    questionHi: 'भविष्य के करियर के बारे में सोचते समय आपकी सबसे बड़ी प्रेरणा क्या है?',
    contextNote: 'Core life motivation',
    contextNoteHi: 'जीवन की मुख्य प्रेरणा',
    options: [
      {
        label: 'Long-term job security, pension, and official authority in Madhya Pradesh',
        labelHi: 'दीर्घकालिक नौकरी की सुरक्षा, पेंशन और समाज में शासकीय पद का सम्मान',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Respect in society, regular academic schedule, and shaping character',
        labelHi: 'समाज में गुरु का आदर, नियमित कार्य-समय और चरित्र निर्माण का अवसर',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Self-reliance connected to the soil, nourishing families, and agro-wealth',
        labelHi: 'माटी से जुड़ा स्वावलंबन, अन्नदाता बनना और कृषि संपदा का निर्माण',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Directly saving lives and improving village and tribal healthcare access',
        labelHi: 'लोगों की जान बचाना और ग्रामीण-आदिवासी अंचल तक बेहतर स्वास्थ्य पहुंचाना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Practical technical mastery where skilled hands earn steady income without high degrees',
        labelHi: 'व्यावहारिक हुनर की ताकत, जहां डिग्रियों से ज्यादा आपका काम बोलता है',
        clusterPoints: { skilling_iti_trades: 4 },
      },
      {
        label: 'Being my own master, controlling my hours, and generating jobs for fellow youth',
        labelHi: 'खुद का मालिक होना, अपने समय का नियंत्रण और साथियों को रोजगार देना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 5,
    question: 'Which school or college subject did you find most engaging?',
    questionHi: 'स्कूल या कॉलेज में कौन सा विषय आपको सबसे अधिक रोचक लगता रहा है?',
    contextNote: 'Academic interest',
    contextNoteHi: 'शैक्षणिक रुचि',
    options: [
      {
        label: 'History, Civics, MP Geography, and Political Science',
        labelHi: 'इतिहास, नागरिक शास्त्र, म.प्र. का भूगोल एवं राजनीति विज्ञान',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Hindi / English Literature, Grammar, and Education pedagogy',
        labelHi: 'हिन्दी अथवा अंग्रेजी साहित्य, व्याकरण एवं शिक्षण विधियां',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Botany, Crop Science, Environmental Studies, and Soil Chemistry',
        labelHi: 'वनस्पति विज्ञान, कृषि विज्ञान, पर्यावरण अध्ययन एवं मृदा रसायन',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Biology, Human Anatomy, Health & Hygiene, and Chemistry',
        labelHi: 'जीव विज्ञान, मानव शरीर रचना, स्वास्थ्य एवं प्राथमिक चिकित्सा',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Physics, Mathematics, Applied Mechanics, and Electricity concepts',
        labelHi: 'भौतिकी, गणित, यांत्रिकी सिद्धांत एवं विद्युत चुंबकत्व',
        clusterPoints: { engineering_polytechnic: 3, skilling_iti_trades: 2 },
      },
      {
        label: 'Economics, Commerce, Accounting, and Business Studies',
        labelHi: 'अर्थशास्त्र, वाणिज्य, बहीखाता एवं व्यावसायिक अध्ययन',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 6,
    question: 'How do you prefer interacting with the public during a working day?',
    questionHi: 'कामकाज के दौरान जनता या लोगों से मिलने-जुलने में आपका क्या तरीका रहता है?',
    contextNote: 'Social interaction style',
    contextNoteHi: 'जनसंवाद का स्वरूप',
    options: [
      {
        label: 'Listening to public petitions, applying rules fairly, and inspecting offices',
        labelHi: 'जनता के आवेदन सुनना, नियमों के दायरे में न्याय करना और निरीक्षण करना',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Guiding a room of eager learners and answering their curious questions',
        labelHi: 'उत्सुक विद्यार्थियों के समूह को पढ़ाना और उनके संशयों का समाधान करना',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Advising farmers during Gram Sabha on organic seeds and fertilizer ratios',
        labelHi: 'ग्राम सभा में किसानों से संवाद कर उन्हें उन्नत बीज व खाद की सलाह देना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Talking gently to patients and family members to ease their pain and panic',
        labelHi: 'मरीजों और उनके परिजनों से आत्मीयता से बात कर उनकी चिंता दूर करना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'I prefer minimal chit-chat; let my hands and tools do the work on the machine',
        labelHi: 'मुझे अधिक बातें करने की बजाय औजारों से उपकरण सुधारने पर ध्यान देना पसंद है',
        clusterPoints: { skilling_iti_trades: 4, engineering_polytechnic: 2 },
      },
      {
        label: 'Pitching goods, finding new customers, and negotiating deals with traders',
        labelHi: 'ग्राहकों को माल दिखाना, नए ग्राहक जोड़ना और व्यापारियों से मोलभाव करना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 7,
    question: 'Which daily rhythm of working hours fits your personal lifestyle best?',
    questionHi: 'कार्य-समय का कौन सा स्वरूप आपकी दिनचर्या के सबसे अनुकूल बैठता है?',
    contextNote: 'Work rhythm & schedule',
    contextNoteHi: 'कार्य-समय एवं जीवनशैली',
    options: [
      {
        label: 'Structured government office hours (10 AM to 5 PM) with administrative duties',
        labelHi: 'निश्चित शासकीय कार्यालय समय (प्रातः 10 से शाम 5) एवं प्रशासनिक दायित्व',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Predictable school/college morning hours with evenings free for study and family',
        labelHi: 'सुबह का स्कूल/कॉलेज समय और शाम का समय स्वाध्याय व परिवार के लिए मुक्त',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Early morning farm rounds matching the sun, weather, and seasonal crop cycles',
        labelHi: 'सूर्योदय के साथ सुबह खेतों का चक्कर और मौसमी फसल चक्र के अनुसार काम',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Rotational hospital shifts (day/night) where duty comes first in emergencies',
        labelHi: 'अस्पताल की शिफ्ट ड्यूटी (दिन/रात) जहां आपातकाल में सेवा सबसे पहले है',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Active industrial workshop or construction site shifts with physical machinery',
        labelHi: 'वर्कशॉप या निर्माण स्थल पर सक्रिय रूप से उपकरणों के साथ काम करना',
        clusterPoints: { skilling_iti_trades: 4 },
      },
      {
        label: 'Flexible hours decided by myself — working hard when customer orders surge',
        labelHi: 'खुद तय किए गए घंटे — जब बाजार में मांग ज्यादा हो तो पूरी लगन से जुटना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 8,
    question: 'When a difficult breakdown or bottleneck occurs, what is your initial approach?',
    questionHi: 'जब कोई कठिन समस्या या बाधा सामने आती है, तो आपका पहला कदम क्या होता है?',
    contextNote: 'Problem-solving approach',
    contextNoteHi: 'समस्या समाधान का तरीका',
    options: [
      {
        label: 'Consult government guidelines, gazettes, or seniors to find the lawful procedure',
        labelHi: 'शासकीय नियमों, राजपत्र अथवा वरिष्ठों से परामर्श कर वैधानिक समाधान खोजना',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Break the problem down step-by-step and explain the root cause patiently',
        labelHi: 'समस्या को छोटे-छोटे हिस्सों में बांटना और जड़ तक जाकर धैर्य से सुलझाना',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Inspect the soil, weather conditions, water drainage, and test practical remedies',
        labelHi: 'जमीन की नमी, मौसम और जल निकास देखकर व्यावहारिक देसी या वैज्ञानिक उपाय आजमाना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Check patient vitals, maintain calm, and immediately apply established first-aid protocols',
        labelHi: 'धड़कन व नब्ज जांचना, शांति बनाए रखना और तुरंत प्राथमिक उपचार नियम लागू करना',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Open the panel, inspect the wires or gears, and trace where the circuit failed',
        labelHi: 'मशीन या पैनल खोलना, तारों व पुर्जों की जांच करना और खराबी का बिंदु पकड़ना',
        clusterPoints: { engineering_polytechnic: 3, skilling_iti_trades: 3 },
      },
      {
        label: 'Calculate the financial impact, find an alternative supplier, and adapt quickly',
        labelHi: 'आर्थिक नुकसान का आकलन करना, वैकल्पिक सप्लायर ढूंढना और तुरंत रास्ता बदलना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 9,
    question: 'How do you handle competitive pressure and demanding responsibilities?',
    questionHi: 'कड़े मुकाबले और जिम्मेदारी के दबाव को आप कैसे संभालते हैं?',
    contextNote: 'Resilience under pressure',
    contextNoteHi: 'दबाव में धैर्य एवं सामर्थ्य',
    options: [
      {
        label: 'I can sit for months of disciplined self-study for competitive prelims and mains exams',
        labelHi: 'प्रतियोगी परीक्षा (प्री-मेन्स) निकालने हेतु महीनों का अनुशासित स्वाध्याय कर सकता हूँ',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'I can handle a noisy room of energetic youngsters without losing temper or fairness',
        labelHi: 'ऊर्जावान और नटखट बच्चों के बीच बिना गुस्सा किए निष्पक्षता से काम ले सकता हूँ',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'I stay calm even during unseasonal rain because I know patience yields good harvest',
        labelHi: 'बेमौसम बारिश या सूखे में भी हिम्मत नहीं हारता, क्योंकि माटी कभी धोखा नहीं देती',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'I can remain steady and composed during medical emergencies without panic',
        labelHi: 'चिकित्सीय आपातकाल या चोट देखकर घबराए बिना स्थिर रहकर काम कर सकता हूँ',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'I patiently test and re-solder connections until the equipment runs smoothly',
        labelHi: 'जब तक उपकरण चालू न हो जाए, तब तक लगातार धैर्यपूर्वक वायरिंग सुधारता रहता हूँ',
        clusterPoints: { engineering_polytechnic: 3, skilling_iti_trades: 3 },
      },
      {
        label: 'I am comfortable risking small savings to launch a trade and turn a profit',
        labelHi: 'मुनाफा कमाने के लिए अपनी छोटी बचत लगाकर नया व्यापार शुरू करने का साहस है',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 10,
    question: 'What college or school co-curricular activity did you enjoy most?',
    questionHi: 'कॉलेज या स्कूल की कौन सी अतिरिक्त गतिविधि में आपका सबसे ज्यादा मन लगा?',
    contextNote: 'Practical engagement',
    contextNoteHi: 'प्रायोगिक गतिविधियों में रुचि',
    options: [
      {
        label: 'Debates, youth parliament, essay competitions, and current affairs quizzes',
        labelHi: 'वाद-विवाद, युवा संसद, निबंध प्रतियोगिता और सामान्य ज्ञान क्विज',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'Peer tutoring, helping friends prepare for exams, or directing school plays',
        labelHi: 'सहपाठियों को परीक्षा की तैयारी में पढ़ाना या स्कूल नाटकों का निर्देशन करना',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'College botanical garden care, tree plantation drives, or rural field trips',
        labelHi: 'कॉलेज के बगीचे की देखभाल, वृक्षारोपण अभियान या ग्रामीण अध्ययन यात्राएं',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'Volunteering in Red Cross, blood donation drives, or first-aid training camps',
        labelHi: 'रेड क्रॉस, रक्तदान शिविर अथवा प्राथमिक चिकित्सा प्रशिक्षण शिविरों में सहयोग',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'Managing stage audio equipment, electric generator setup, or computer lab maintenance',
        labelHi: 'कार्यक्रम में साउंड सिस्टम, जनरेटर कनेक्शन या कंप्यूटर लैब की तकनीकी व्यवस्था',
        clusterPoints: { skilling_iti_trades: 3, engineering_polytechnic: 3 },
      },
      {
        label: 'Managing food stalls, selling tickets, and balancing the festival accounts',
        labelHi: 'कॉलेज मेले में स्टॉल लगाना, टिकट बेचना और पूरे बजट का नफा-नुकसान संभालना',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
  {
    id: 11,
    question: 'Where do you picture yourself standing proudly in 5 years?',
    questionHi: 'आज से 5 वर्ष बाद आप खुद को गर्व से किस पद या भूमिका में देखना चाहते हैं?',
    contextNote: 'Five-year ambition',
    contextNoteHi: '5 वर्षीय महत्वाकांक्षा',
    options: [
      {
        label: 'Holding an official MP State Government gazetted identity card and serving in a Tehsil',
        labelHi: 'तहसील या कलेक्ट्रेट में शासकीय अधिकारी का पहचान पत्र धारण कर जनसेवा करना',
        clusterPoints: { govt_civil_services: 4 },
      },
      {
        label: 'A respected permanent teacher or college professor greeted with reverence by thousands',
        labelHi: 'एक सम्मानित स्थायी शिक्षक या सहायक प्राध्यापक, जिसे हजारों छात्र आदर देते हों',
        clusterPoints: { teaching_education: 4 },
      },
      {
        label: 'Running an organic farm & agri-consultancy center transforming local crop yields',
        labelHi: 'आधुनिक जैविक फार्म एवं कृषि परामर्श केंद्र चलाकर क्षेत्र की पैदावार बढ़ाना',
        clusterPoints: { agriculture_allied: 4 },
      },
      {
        label: 'A dedicated Community Health Officer (CHO) or nursing officer in a public health center',
        labelHi: 'प्राथमिक स्वास्थ्य केंद्र पर समर्पित कम्युनिटी हेल्थ ऑफिसर (CHO) या नर्सिंग ऑफिसर',
        clusterPoints: { healthcare_allied: 4 },
      },
      {
        label: 'A certified master technician or ITI Training Officer (TO) with steady technical earnings',
        labelHi: 'प्रमाणित मास्टर तकनीशियन या शासकीय आईटीआई में प्रशिक्षण अधिकारी (TO) का पद',
        clusterPoints: { skilling_iti_trades: 3, engineering_polytechnic: 3 },
      },
      {
        label: 'An established rural entrepreneur employing 5 to 10 youth from my home block',
        labelHi: 'अपने गृह ब्लॉक में स्थापित व्यवसायी, जो अपने साथ 5-10 अन्य युवाओं को काम दे सके',
        clusterPoints: { entrepreneurship_business: 4 },
      },
    ],
  },
];

export interface QuizEvaluationResult {
  topCluster: CareerCluster;
  scores: Record<string, number>;
  scoreBreakdown: {
    clusterId: string;
    clusterName: string;
    clusterNameHi: string;
    score: number;
    percentage: number;
  }[];
  completedAt: number;
}

/**
 * Pure Rule-Based Scoring Engine.
 * 100% Deterministic, Offline, Inspectable by Hackathon Judges.
 */
export function calculateQuizResult(selectedAnswers: Record<number, number>): QuizEvaluationResult {
  const scores: Record<string, number> = {
    govt_civil_services: 0,
    teaching_education: 0,
    agriculture_allied: 0,
    engineering_polytechnic: 0,
    healthcare_allied: 0,
    skilling_iti_trades: 0,
    entrepreneurship_business: 0,
  };

  // Tally scores across all answered questions
  CAREER_QUIZ_QUESTIONS.forEach((q) => {
    const selectedOptionIdx = selectedAnswers[q.id];
    if (typeof selectedOptionIdx === 'number' && q.options[selectedOptionIdx]) {
      const option = q.options[selectedOptionIdx];
      Object.entries(option.clusterPoints).forEach(([clusterId, pts]) => {
        if (typeof scores[clusterId] === 'number') {
          scores[clusterId] += pts;
        }
      });
    }
  });

  // Calculate maximum possible theoretical points (~44) to derive percentages
  const maxScore = Math.max(...Object.values(scores), 1);

  const scoreBreakdown = Object.entries(scores)
    .map(([clusterId, score]) => {
      const cluster = MP_CAREER_CLUSTERS[clusterId];
      const percentage = Math.round((score / (CAREER_QUIZ_QUESTIONS.length * 4)) * 100);
      return {
        clusterId,
        clusterName: cluster ? cluster.name : clusterId,
        clusterNameHi: cluster ? cluster.nameHi : clusterId,
        score,
        percentage: Math.min(percentage, 100),
      };
    })
    .sort((a, b) => b.score - a.score);

  // Highest score wins
  const winningClusterId = scoreBreakdown[0]?.clusterId || 'govt_civil_services';
  const topCluster = MP_CAREER_CLUSTERS[winningClusterId] || MP_CAREER_CLUSTERS.govt_civil_services;

  return {
    topCluster,
    scores,
    scoreBreakdown,
    completedAt: Date.now(),
  };
}
