export interface TopicNote {
  id: string;
  subject: 'Physics' | 'English' | 'Political Science';
  title: string;
  titleHi: string;
  keywords: string[];
  snippet: string;
  content: string;
}

export const KNOWLEDGE_BASE: TopicNote[] = [
  // ==================== PHYSICS (UG LEVEL) ====================
  {
    id: 'phy-1',
    subject: 'Physics',
    title: "Newton's Laws and Conservation of Linear Momentum",
    titleHi: 'न्यूटन के गति नियम एवं रेखीय संवेग संरक्षण',
    keywords: ['newton', 'momentum', 'force', 'conservation', 'mass', 'acceleration', 'inertia', 'impulse', 'collision'],
    snippet: "Newton's second law defines force as the rate of change of momentum (F = dp/dt). When the net external force acting on an isolated system is zero, the total linear momentum remains constant.",
    content: `## Newton's Laws and Conservation of Linear Momentum
1. First Law (Law of Inertia): An object continues in its state of rest or uniform motion in a straight line unless acted upon by a net external force.
2. Second Law: The rate of change of linear momentum of a body is directly proportional to the applied force and occurs in the direction of the force: F = dp/dt = m*a (for constant mass).
3. Third Law: To every action, there is an equal and opposite reaction (F_12 = -F_21).
4. Principle of Conservation of Linear Momentum: In the absence of external forces (F_ext = 0), dp_total/dt = 0, meaning total initial momentum equals total final momentum. This applies to rocket propulsion and elastic/inelastic collisions.`,
  },
  {
    id: 'phy-2',
    subject: 'Physics',
    title: 'Carnot Cycle and the Second Law of Thermodynamics',
    titleHi: 'कार्नो चक्र एवं ऊष्मागतिकी का द्वितीय नियम',
    keywords: ['carnot', 'thermodynamics', 'entropy', 'efficiency', 'engine', 'heat', 'reversible', 'isothermal', 'adiabatic', 'kelvin', 'clausius'],
    snippet: "The Carnot cycle is an ideal reversible thermodynamic cycle operating between hot reservoir T1 and cold reservoir T2. Its maximum theoretical efficiency is eta = 1 - (T2/T1).",
    content: `## Carnot Cycle and the Second Law of Thermodynamics
The Carnot engine operates through four reversible processes:
1. Isothermal Expansion (at constant source temperature T1, absorbing heat Q1).
2. Adiabatic Expansion (temperature drops from T1 to sink temperature T2, no heat transfer).
3. Isothermal Compression (at constant sink temperature T2, rejecting heat Q2).
4. Adiabatic Compression (temperature rises from T2 back to T1).

Efficiency: eta = Work Done / Heat Supplied = 1 - (Q2/Q1) = 1 - (T2/T1).
Carnot's Theorem: No heat engine operating between two given temperatures can be more efficient than a Carnot engine.
Second Law of Thermodynamics: Kelvin-Planck statement states it is impossible to convert all absorbed heat entirely into work. Clausius statement states heat cannot spontaneously flow from a colder to a hotter body without external work.`,
  },
  {
    id: 'phy-3',
    subject: 'Physics',
    title: "Interference of Light and Young's Double Slit Experiment",
    titleHi: 'प्रकाश का व्यतिकरण एवं यंग का द्वि-स्लिट प्रयोग',
    keywords: ['interference', 'young', 'slit', 'wave', 'fringe', 'optics', 'constructive', 'destructive', 'wavelength', 'diffraction'],
    snippet: "Interference is the superposition of two coherent light waves resulting in alternating bright and dark fringes. The fringe width beta is given by beta = (lambda * D) / d.",
    content: `## Interference of Light & Young's Double Slit Experiment
Conditions for Sustained Interference:
1. Sources must be coherent (constant phase difference).
2. Waves must have equal or nearly equal amplitudes and same wavelength.
3. Slit separation (d) must be small compared to distance to screen (D).

Path Difference Analysis:
- Constructive Interference (Bright Fringe): Path difference delta = n * lambda (where n = 0, 1, 2...). Fringe position: y_n = (n * lambda * D) / d.
- Destructive Interference (Dark Fringe): Path difference delta = (2n - 1) * (lambda / 2). Fringe position: y_n = ((2n - 1) * lambda * D) / (2d).
- Fringe Width (beta): Spacing between two consecutive bright or dark fringes: beta = (lambda * D) / d. Fringe width increases with wavelength and screen distance, and decreases with larger slit spacing.`,
  },
  {
    id: 'phy-4',
    subject: 'Physics',
    title: "Photoelectric Effect and Einstein's Equation",
    titleHi: 'प्रकाश विद्युत प्रभाव एवं आइंस्टीन का समीकरण',
    keywords: ['photoelectric', 'einstein', 'photon', 'work function', 'threshold frequency', 'electron', 'stopping potential', 'quantum'],
    snippet: "The photoelectric effect proves the particle nature of light. Photons transfer energy h*nu to electrons; if h*nu > work function phi_0, photoelectrons are ejected with maximum kinetic energy K_max = h*nu - phi_0.",
    content: `## Photoelectric Effect and Einstein's Equation
Key Experimental Observations:
1. Emission is instantaneous (< 10^-9 s) with no time lag.
2. Below a certain threshold frequency (nu_0), no photoelectrons are emitted regardless of light intensity.
3. Maximum kinetic energy of photoelectrons depends only on frequency of light, not on intensity.
4. The number of photoelectrons emitted per second is directly proportional to light intensity.

Einstein's Photoelectric Equation:
Energy of incident photon = Work Function + Maximum Kinetic Energy of ejected electron
h * nu = phi_0 + K_max = h * nu_0 + (1/2) * m * v_max^2
If V_0 is the stopping potential: e * V_0 = K_max = h * (nu - nu_0). This discovery led to the 1921 Nobel Prize for Albert Einstein.`,
  },
  {
    id: 'phy-5',
    subject: 'Physics',
    title: 'Simple Harmonic Motion and Damped Oscillations',
    titleHi: 'सरल आवर्त गति एवं अवमंदित दोलन',
    keywords: ['shm', 'harmonic', 'oscillator', 'damping', 'frequency', 'resonance', 'spring', 'amplitude', 'differential equation'],
    snippet: "SHM occurs when restoring force is directly proportional to displacement and directed toward the equilibrium position (F = -k*x). Damped oscillations involve frictional resistive forces proportional to velocity.",
    content: `## Simple Harmonic Motion (SHM) & Damped Oscillators
1. Undamped SHM:
Equation of motion: d^2x/dt^2 + omega_0^2 * x = 0, where natural angular frequency omega_0 = sqrt(k/m).
Displacement: x(t) = A * cos(omega_0 * t + phi). Total mechanical energy E = (1/2) * k * A^2 is conserved.

2. Damped Harmonic Oscillator:
Differential Equation: m * (d^2x/dt^2) + b * (dx/dt) + k * x = 0, where b is the damping coefficient.
Rewritten: d^2x/dt^2 + 2*gamma*(dx/dt) + omega_0^2 * x = 0 (gamma = b / (2m)).

Three Cases of Damping:
- Underdamping (gamma < omega_0): Oscillations with exponentially decaying amplitude A(t) = A_0 * exp(-gamma*t).
- Critical Damping (gamma = omega_0): System returns to equilibrium in the fastest possible time without oscillating (used in galvanometer, car shock absorbers).
- Overdamping (gamma > omega_0): System sluggishly returns to equilibrium without oscillating.`,
  },
  {
    id: 'phy-6',
    subject: 'Physics',
    title: "Maxwell's Equations and Electromagnetic Wave Propagation",
    titleHi: 'मैक्सवेल के समीकरण एवं विद्युतचुंबकीय तरंगें',
    keywords: ['maxwell', 'electromagnetic', 'displacement current', 'gauss', 'faraday', 'ampere', 'light', 'electric field', 'magnetic field'],
    snippet: "Maxwell unified electricity and magnetism into four fundamental equations, introducing displacement current I_d = eps_0 * (dPhi_E/dt) and predicting EM waves propagating at speed c = 1/sqrt(mu_0 * eps_0).",
    content: `## Maxwell's Equations and EM Wave Propagation
The four fundamental equations in differential form:
1. Gauss's Law for Electrostatics: div(E) = rho / eps_0 (Electric charges produce divergence in electric fields).
2. Gauss's Law for Magnetism: div(B) = 0 (No magnetic monopoles exist; magnetic field lines form closed loops).
3. Faraday's Law of Induction: curl(E) = -dB/dt (A changing magnetic field induces a circulating electric field).
4. Ampere-Maxwell Law: curl(B) = mu_0 * J + mu_0 * eps_0 * (dE/dt) (Both conduction current J and changing electric field / displacement current produce magnetic fields).

Electromagnetic Waves:
Combining these equations yields the wave equation for electric and magnetic fields:
nabla^2(E) = mu_0 * eps_0 * (d^2E/dt^2)
Speed of EM Waves in vacuum: c = 1 / sqrt(mu_0 * eps_0) approx 3 x 10^8 m/s.
E and B are mutually perpendicular to each other and to the direction of propagation (transverse waves).`,
  },

  // ==================== ENGLISH (UG LEVEL) ====================
  {
    id: 'eng-1',
    subject: 'English',
    title: 'Plot Structure and Themes in English Short Fiction',
    titleHi: 'अंग्रेजी लघु कथाओं में कथानक संरचना एवं केंद्रीय भाव',
    keywords: ['plot', 'short story', 'theme', 'climax', 'exposition', 'character', 'resolution', 'fiction', 'narrative', 'freytags pyramid'],
    snippet: "Classic short fiction follows Freytag's Pyramid: exposition, inciting incident, rising action, climax, falling action, and dénouement. The theme is the central underlying human insight of the narrative.",
    content: `## Plot Structure and Themes in English Short Fiction
1. Freytag's Dramatic Pyramid:
- Exposition: Introduces setting, protagonist, and atmospheric background.
- Inciting Incident: The disruptive event that triggers the central conflict.
- Rising Action: Escalation of obstacles, subplots, and character dilemmas.
- Climax: The turning point of highest emotional tension where the decisive choice is made.
- Falling Action: The consequences of the climax unfold.
- Dénouement (Resolution): The conflict concludes, revealing altered character states.

2. Analyzing Themes:
A theme is never merely a one-word topic (like 'love' or 'war'); it is an authorial proposition about human nature (e.g., 'Unchecked ambition erodes moral integrity'). In Indian English short fiction (like R.K. Narayan or Mulk Raj Anand), recurring themes include the tension between tradition and modernity, societal caste constraints, and village communal life.`,
  },
  {
    id: 'eng-2',
    subject: 'English',
    title: 'Active and Passive Voice Transformation Rules',
    titleHi: 'वाच्य परिवर्तन (Active and Passive Voice) के नियम',
    keywords: ['active voice', 'passive voice', 'grammar', 'verb', 'tense', 'past participle', 'subject', 'object', 'by agent'],
    snippet: "Active voice emphasizes the doer (Subject + Verb + Object), whereas passive voice emphasizes the recipient/action (Object + auxiliary 'to be' + Past Participle V3 + by + Subject).",
    content: `## Active and Passive Voice Transformation Rules
Formula: Object of active sentence becomes the Subject of passive sentence.
Passive Verb Structure = Helping Verb (form of 'be') + Past Participle (V3).

Tense Transformations:
1. Simple Present: Active 'write/writes' -> Passive 'is/am/are written'. (e.g., 'She writes an essay' -> 'An essay is written by her').
2. Simple Past: Active 'wrote' -> Passive 'was/were written'. (e.g., 'The collector visited Dhar college' -> 'Dhar college was visited by the collector').
3. Present Continuous: Active 'is writing' -> Passive 'is being written'.
4. Present Perfect: Active 'has written' -> Passive 'has been written'.
5. Modals (can, must, should): Active 'can do' -> Passive 'can be done'.

Academic & Official Writing Note:
Passive voice is preferred in official government orders, scientific reports, and administrative circulars where the actor is unknown, obvious, or less important than the result (e.g., 'The scholarship application was approved').`,
  },
  {
    id: 'eng-3',
    subject: 'English',
    title: 'Critical Appreciation of R.K. Narayan’s "The Guide"',
    titleHi: 'आर.के. नारायण के उपन्यास "द गाइड" की समीक्षा',
    keywords: ['narayan', 'the guide', 'raju', 'rosie', 'malgudi', 'transformation', 'drought', 'fasting', 'literature', 'indian english'],
    snippet: "R.K. Narayan's masterpiece 'The Guide' chronicles Raju's ironic evolution from a deceitful tourist guide in fictional Malgudi to an unintentional saint who dies fasting during a severe village drought.",
    content: `## Critical Appreciation of R.K. Narayan's "The Guide" (1958)
Background & Setting:
Set in Narayan's iconic fictional town of Malgudi (South India), 'The Guide' won the Sahitya Akademi Award in 1960.

Key Character Arcs:
- Raju: A charming, opportunistic tourist guide known as 'Railway Raju'. He helps Rosie (a classical dancer trapped in an oppressive marriage to scholar Marco) become a celebrated artist, but his possessiveness lands him in jail for forgery.
- Rosie (Nalini): Symbolizes the revival of classical Indian dance (Bharatnatyam) liberated from patriarchal prejudice.
- Velan: The gullible yet devout villager of Mangala who mistaking Raju's silence for spiritual wisdom, initiates Raju's sanctification.

Major Themes:
1. Irony and Destiny: Raju plays the role of a holy swami so convincingly that he becomes trapped in the villagers' collective faith.
2. Self-Realization through Renunciation: In the climactic chapter, Raju decides to fast sincerely for rain, transforming from a con artist into a genuine martyr.
3. Narrative Technique: Masterful use of double narrative perspective alternating between first-person recollection and third-person omniscient narration.`,
  },
  {
    id: 'eng-4',
    subject: 'English',
    title: 'Formal Letter and Official Email Writing Format',
    titleHi: 'औपचारिक पत्र एवं आधिकारिक ईमेल लेखन प्रारूप',
    keywords: ['formal letter', 'email', 'application', 'principal', 'format', 'salutation', 'subject line', 'leave', 'scholarship'],
    snippet: "Formal letters require sender address, date, receiver designation/address, concise subject line, formal salutation, three-paragraph body, courteous complimentary close, and signature.",
    content: `## Formal Letter and Official Email Writing Format
Standard Structure for College & Official MP Applications:
1. Sender's Address & Date: Top left corner.
2. Receiver's Designation & Address: e.g., 'To, The Principal, Govt. Post Graduate College, Barwani (M.P.)'.
3. Subject Line: High-contrast, precise summary (e.g., 'Subject: Application for MPTAAS Scholarship Document Verification').
4. Salutation: 'Respected Sir/Madam,' (avoid informal 'Dear Sir').
5. Body (3 Paragraphs):
   - Paragraph 1 (Introduction): State purpose directly with student enrollment/scholar number.
   - Paragraph 2 (Details): Explain relevant context, dates, or missing fee receipt numbers.
   - Paragraph 3 (Conclusion): Action requested ('I kindly request you to attest the enclosed documents at the earliest').
6. Complimentary Close: 'Yours faithfully,' or 'Yours obediently,' followed by full student name and contact number.

Email Etiquette Rule:
Never leave the subject line blank. Avoid texting abbreviations (u, ur, thx). Attachments should be named clearly (e.g., 'Pooja_Bhil_Caste_Certificate.pdf').`,
  },
  {
    id: 'eng-5',
    subject: 'English',
    title: 'Poetic Devices: Metaphor, Simile, and Personification',
    titleHi: 'काव्य उपकरण: रूपक, उपमा एवं मानवीकरण अलंकार',
    keywords: ['poetic devices', 'metaphor', 'simile', 'personification', 'alliteration', 'figures of speech', 'literature', 'poetry'],
    snippet: "Simile compares two distinct things using 'like' or 'as'. Metaphor makes a direct implicit comparison without 'like/as'. Personification endows non-human objects with human attributes.",
    content: `## Poetic Devices & Figures of Speech
1. Simile:
A direct comparison between two unlike objects having at least one common quality, using explicit comparative markers 'like' or 'as'.
Example: 'The tribal youth ran like the mountain wind' / 'Her resolve was as steady as the Satpura hills'.

2. Metaphor:
An implied, condensed comparison where one thing is stated directly to be another.
Example: 'Time is a thief' / 'Education is the passport to liberation'. In Tagore's Gitanjali: 'The world is a marketplace of souls'.

3. Personification:
Bestowing human emotions, intentions, or actions upon animals, inanimate objects, or abstract concepts.
Example: 'The river Narmada whispered ancient folklore to the evening breeze'.

4. Alliteration:
Repetition of consonant sounds at the beginning of adjacent or closely connected words.
Example: 'Fair breeze blew, the white foam flew' (Coleridge's Rime of the Ancient Mariner).`,
  },
  {
    id: 'eng-6',
    subject: 'English',
    title: 'Rules of Subject-Verb Concord (Agreement)',
    titleHi: 'कर्ता-क्रिया सामंजस्य (Subject-Verb Agreement) के नियम',
    keywords: ['subject verb agreement', 'concord', 'grammar', 'singular', 'plural', 'either or', 'neither nor', 'collective noun'],
    snippet: "Subject-verb concord dictates that a singular subject takes a singular verb, while a plural subject takes a plural verb. Intervening phrases or compound subjects follow specific grammatical proximity rules.",
    content: `## Rules of Subject-Verb Concord (Agreement)
Fundamental Rule: Singular Subject -> Singular Verb (is, was, has, writes); Plural Subject -> Plural Verb (are, were, have, write).

Crucial Rules for Competitive & UG Exams:
1. 'Either...or' and 'Neither...nor': The verb agrees with the subject nearest to it.
   - Example: 'Neither the professor nor the students were in the library.'
   - Example: 'Either the students or the teacher is responsible.'
2. Words connected by 'as well as', 'along with', 'in addition to', 'with': The verb agrees strictly with the FIRST subject.
   - Example: 'The principal, along with all college lecturers, is attending the Bhopal meeting.'
3. Collective Nouns (family, jury, committee): Take singular verbs when functioning as a unified body, but plural verbs if members act individually.
   - Example: 'The committee has submitted its scholarship report.'
4. Indefinite Pronouns: 'Each', 'everyone', 'someone', 'nobody', 'either', 'neither' always take singular verbs.
   - Example: 'Each of the tribal scholarship applicants has received Samagra e-KYC.'`,
  },

  // ==================== POLITICAL SCIENCE (UG LEVEL) ====================
  {
    id: 'pol-1',
    subject: 'Political Science',
    title: 'The Preamble to the Constitution of India: Philosophy and Ideals',
    titleHi: 'भारतीय संविधान की प्रस्तावना: दर्शन एवं आदर्श',
    keywords: ['preamble', 'constitution', 'sovereign', 'socialist', 'secular', 'democratic', 'republic', 'justice', 'liberty', 'equality', 'kesavananda bharati'],
    snippet: "The Preamble embodies the soul of the Indian Constitution, declaring India to be a Sovereign, Socialist, Secular, Democratic Republic committed to Justice, Liberty, Equality, and Fraternity.",
    content: `## The Preamble to the Constitution of India
Origin: Based on Jawaharlal Nehru's 'Objective Resolution' adopted by the Constituent Assembly on January 22, 1947.

Key Terms & Philosophical Pillars:
1. Sovereign: Absolute internal supremacy and total external independence without subordination to foreign power.
2. Socialist: Democratic socialism aiming to eliminate poverty, ignorance, and inequality of opportunity (added by 42nd Constitutional Amendment Act, 1976).
3. Secular: State has no official religion; all religions enjoy equal status, respect, and protection from the state (Article 25-28).
4. Democratic: Government derives authority from the will of the people expressed through universal adult franchise (Article 326).
5. Republic: The head of state (President of India) is elected, not hereditary.
6. Objectives: Justice (Social, Economic, Political); Liberty of thought, expression, belief, faith, and worship; Equality of status and opportunity; Fraternity assuring the dignity of the individual and unity/integrity of the nation.

Legal Status:
In the landmark Kesavananda Bharati case (1973), the Supreme Court ruled that the Preamble IS part of the Constitution and can be amended under Article 368 without altering the 'Basic Structure'.`,
  },
  {
    id: 'pol-2',
    subject: 'Political Science',
    title: 'Fundamental Rights (Articles 12 to 35) and Article 32',
    titleHi: 'मौलिक अधिकार (अनुच्छेद 12 से 35) एवं अनुच्छेद 32',
    keywords: ['fundamental rights', 'constitution', 'article 32', 'article 21', 'article 14', 'writs', 'habeas corpus', 'mandamus', 'dr ambedkar'],
    snippet: "Part III of the Constitution guarantees six Fundamental Rights to citizens. Article 32 provides the Right to Constitutional Remedies via Supreme Court writs, called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar.",
    content: `## Fundamental Rights (Part III, Articles 12-35)
Six Recognized Fundamental Rights:
1. Right to Equality (Articles 14–18): Equality before law (Art 14), prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth (Art 15), equality of opportunity in public employment (Art 16), abolition of untouchability (Art 17).
2. Right to Freedom (Articles 19–22): Six freedoms of speech, assembly, association, movement, residence, and profession (Art 19); protection in conviction (Art 20); Protection of Life and Personal Liberty (Art 21, expanded to include privacy, clean environment, free legal aid); Right to Education (Art 21A).
3. Right against Exploitation (Articles 23–24): Prohibition of human trafficking and forced labour (Art 23), prohibition of employment of children in factories (Art 24).
4. Right to Freedom of Religion (Articles 25–28): Freedom of conscience and free profession, practice, and propagation.
5. Cultural and Educational Rights (Articles 29–30): Protection of interests of minorities and right of minorities to establish educational institutions.
6. Right to Constitutional Remedies (Article 32): Empowers citizens to move Supreme Court for enforcement of rights. Dr. Ambedkar termed Article 32 the 'heart and soul of the Constitution'.

Five Prerogative Writs:
- Habeas Corpus: 'To have the body' (safeguard against illegal detention).
- Mandamus: 'We command' (orders public official to perform statutory duty).
- Prohibition: Issued by higher court to lower court preventing jurisdictional overreach.
- Certiorari: Quashes an order passed by a lower court/tribunal without jurisdiction.
- Quo-Warranto: Inquires into legality of claim of a person to a public office.`,
  },
  {
    id: 'pol-3',
    subject: 'Political Science',
    title: 'Directive Principles of State Policy (DPSP) - Part IV',
    titleHi: 'राज्य के नीति निर्देशक तत्व (भाग IV, अनुच्छेद 36-51)',
    keywords: ['dpsp', 'directive principles', 'part iv', 'socialist', 'gandhian', 'welfare state', 'non-justiciable', 'article 40', 'uniform civil code'],
    snippet: "DPSPs contained in Part IV (Articles 36-51) are non-justiciable constitutional guidelines borrowed from Ireland, aiming to establish socio-economic democracy and a welfare state in India.",
    content: `## Directive Principles of State Policy (DPSP)
Constitutional Position: Part IV, Articles 36 to 51. Borrowed from the Irish Constitution of 1937.
Nature: Non-justiciable in a court of law (Article 37 explicitly states that principles are fundamental in the governance of the country, and it shall be the duty of the State to apply these principles in making laws).

Classification of Principles:
1. Socialistic Principles:
   - Adequate means of livelihood for all citizens (Art 39a).
   - Prevention of concentration of wealth (Art 39c).
   - Equal pay for equal work for men and women (Art 39d).
   - Right to work, education, and public assistance (Art 41).
2. Gandhian Principles:
   - Organization of Village Panchayats (Art 40).
   - Promotion of cottage industries in rural areas (Art 43).
   - Promotion of educational and economic interests of SCs, STs, and other weaker sections (Art 46 - vital for MP tribal welfare).
   - Prohibition of intoxicating drinks and drugs (Art 47).
   - Prohibition of slaughter of cows and calves (Art 48).
3. Liberal-Intellectual Principles:
   - Uniform Civil Code for citizens (Art 44).
   - Protection and improvement of environment and forests (Art 48A).
   - Separation of Judiciary from Executive (Art 50).
   - Promotion of international peace and security (Art 51).`,
  },
  {
    id: 'pol-4',
    subject: 'Political Science',
    title: 'Panchayati Raj System (73rd Amendment) and PESA Act in MP',
    titleHi: 'पंचायती राज व्यवस्था (73वां संशोधन) एवं म.प्र. में पेसा (PESA) कानून',
    keywords: ['panchayati raj', '73rd amendment', 'gram sabha', 'pesa', 'tribal', 'madhya pradesh', 'local self government', 'balwant rai mehta', 'dhar', 'mandla'],
    snippet: "The 73rd Constitutional Amendment Act (1992) constitutionalized a 3-tier Panchayati Raj system. In tribal Fifth Schedule areas of MP, the PESA Act (1996) empowers Gram Sabhas to manage forest produce, land disputes, and development funds.",
    content: `## Panchayati Raj System & PESA Act 1996 in Madhya Pradesh
1. 73rd Amendment Act 1992 (Part IX, Articles 243 to 243-O, 11th Schedule):
- Creates a 3-tier structure: Gram Panchayat (village), Janpad Panchayat (block), Zilla Panchayat (district).
- Gram Sabha: The foundational body consisting of all registered village voters.
- Mandatory 33% reservation for women (Madhya Pradesh was among the first states to increase women reservation to 50%).
- Five-year fixed tenure; State Election Commission conducts elections.
- 29 functional items listed in the 11th Schedule.

2. PESA Act 1996 (Panchayats Extension to Scheduled Areas):
Applies to Fifth Schedule tribal areas across MP (including Dhar, Jhabua, Alirajpur, Barwani, Mandla, Dindori, Shahdol).
Key Powers of Tribal Gram Sabhas under MP PESA Rules:
- Prior mandatory consultation before acquiring tribal land.
- Ownership and regulation of Minor Forest Produce (Tendu patta, Mahua, Harra, Amla).
- Management of local water bodies and minor mineral mining leases.
- Control over money-lending to tribals and enforcement of alcohol prohibition/regulation.
- Direct distribution of development and scholarship relief funds.`,
  },
  {
    id: 'pol-5',
    subject: 'Political Science',
    title: 'Separation of Powers and Checks & Balances in Indian Governance',
    titleHi: 'शक्तियों का पृथक्करण एवं नियंत्रण और संतुलन की व्यवस्था',
    keywords: ['separation of powers', 'parliament', 'judiciary', 'executive', 'checks and balances', 'judicial review', 'basic structure', 'montesquieu'],
    snippet: "The Indian Constitution adopts an organic separation of powers between Legislature, Executive, and Judiciary, reinforced by mutual checks and balances rather than rigid departmental compartmentalization.",
    content: `## Separation of Powers and Checks & Balances
Origins: Propounded by French philosopher Montesquieu to preserve civil liberty by preventing arbitrary autocracy.

Three Organs of the State:
1. Legislature (Parliament / MP Vidhan Sabha): Enacts laws, budgets, and exercises financial accountability.
2. Executive (President / Governor, Prime Minister / Chief Minister, Civil Administration): Implements and administers statutory laws.
3. Judiciary (Supreme Court, MP High Court Jabalpur, Subordinate Courts): Interprets laws, protects fundamental rights, and arbitrates constitutional disputes.

Checks and Balances Mechanism:
- Judicial Review: Judiciary can strike down parliamentary enactments and executive actions that violate Fundamental Rights or the Basic Structure.
- Executive Accountability: Ministers are collectively responsible to the elected lower house (Lok Sabha / Vidhan Sabha). A motion of no-confidence removes the cabinet.
- Judicial Appointments & Impeachment: Judges are appointed by the President via Collegium consultation and can only be removed through rigorous parliamentary impeachment for proven misbehavior.`,
  },
  {
    id: 'pol-6',
    subject: 'Political Science',
    title: 'Federalism in India: Union-State Relations and the Seventh Schedule',
    titleHi: 'भारतीय संघवाद: केंद्र-राज्य संबंध एवं सातवीं अनुसूची',
    keywords: ['federalism', 'union list', 'state list', 'concurrent list', 'seventh schedule', 'article 356', 'finance commission', 'quasi-federal'],
    snippet: "India is described as a 'Union of States' (Article 1) with strong unitary tendencies (Quasi-Federal). Legislative powers are distributed across Union, State, and Concurrent lists in the Seventh Schedule.",
    content: `## Federalism in India & Union-State Relations
Nature of Indian Federalism:
K.C. Wheare described the Indian Constitution as 'Quasi-Federal'. B.R. Ambedkar affirmed: 'The Constitution is federal in times of peace, and unitary during emergencies.'

Legislative Distribution (Seventh Schedule):
1. Union List (List I - 100 items): Defense, Foreign Affairs, Atomic Energy, Railways, National Banking, Telecom (exclusive jurisdiction of Parliament).
2. State List (List II - 61 items): Public Order, Police, Public Health, Agriculture, Land Revenue, Panchayati Raj (exclusive jurisdiction of State Legislatures).
3. Concurrent List (List III - 52 items): Criminal Law, Marriage, Education (transferred from State List by 42nd Amendment), Forests, Trade Unions (both can legislate, but Parliamentary law prevails in case of repugnancy under Article 254).
4. Residuary Powers (Article 248): Vested exclusively in the Union Parliament (e.g., Cyber Law, Artificial Intelligence).

Financial Relations:
Goods and Services Tax (GST) Council operates on cooperative federalism. The Finance Commission (Article 280) recommends tax revenue distribution between the Union and States every 5 years.`,
  },
];

/**
 * Lightweight local keyword retrieval engine.
 * Computes match score against title and content tokens without requiring external vector DB.
 */
export function retrieveRelevantNote(
  subject: 'Physics' | 'English' | 'Political Science',
  query: string
): { note: TopicNote; score: number } | null {
  const qClean = query.toLowerCase();
  const queryTokens = qClean
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (queryTokens.length === 0) return null;

  // Filter notes by subject
  const subjectNotes = KNOWLEDGE_BASE.filter(
    (n) => n.subject.toLowerCase() === subject.toLowerCase()
  );

  let bestMatch: TopicNote | null = null;
  let highestScore = 0;

  for (const note of subjectNotes) {
    let score = 0;
    const titleLower = note.title.toLowerCase();
    const titleHiLower = note.titleHi.toLowerCase();
    const snippetLower = note.snippet.toLowerCase();
    const contentLower = note.content.toLowerCase();

    for (const token of queryTokens) {
      // Direct keyword hit (high weight)
      if (note.keywords.some((k) => k.toLowerCase().includes(token))) {
        score += 8;
      }
      // Title match (very high weight)
      if (titleLower.includes(token) || titleHiLower.includes(token)) {
        score += 10;
      }
      // Snippet match
      if (snippetLower.includes(token)) {
        score += 4;
      }
      // Content occurrence
      if (contentLower.includes(token)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = note;
    }
  }

  // Minimum threshold to prevent hallucinations / low confidence guesses
  if (highestScore < 6 || !bestMatch) {
    return null;
  }

  return { note: bestMatch, score: highestScore };
}
