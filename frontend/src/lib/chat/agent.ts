export type ChatLang = 'en' | 'roman' | 'urdu';

type Intent =
	| 'greeting'
	| 'about'
	| 'website'
	| 'education'
	| 'experience'
	| 'skills'
	| 'tools'
	| 'projects'
	| 'certificates'
	| 'contact'
	| 'cv'
	| 'social'
	| 'location'
	| 'freelance'
	| 'out_of_scope';

const INTENT_PATTERNS: { intent: Intent; patterns: RegExp[] }[] = [
	{
		intent: 'greeting',
		patterns: [
			/^(hi+|hello+|helo+|hey+|salam|assalam|aoa|hola)[!?.]*$/i,
			/\b(kya\s*hal|kais[ea]|kese\s*ho|how\s*are\s*you|کیسے|کیا\s*حال)\b/i
		]
	},
	{ intent: 'cv', patterns: [/\b(cv|resume|resumé|سی\s*وی)\b/i] },
	{
		intent: 'certificates',
		patterns: [
			/\bcertificat\w*\b/i,
			/\bachievement\w*\b/i,
			/\b(digiskills|seo\s*cert|google\s*ai|hp\s*life|opswat|wordpress\s*cert|excel\s*cert|سرٹیفکیٹ)\b/i
		]
	},
	{
		intent: 'projects',
		patterns: [
			/\bprojects?\b/i,
			/\b(thumbnail\s*go|quickdine|quick\s*show|guardians|ugc|proedu|lms|school\s*management|prime\s*softnox|inventory|social\s*media|workflow\s*planner|پروجیکٹ)\b/i
		]
	},
	{
		intent: 'website',
		patterns: [
			/\b(portfolio\s*(website|site|page)?|this\s*(website|site)|your\s*(website|site)|pages?\s*(on|of)?\s*(the\s*)?(site|portfolio)?|website\s*(pages?|sections?)|usmanfarooq\.dev|پورٹ\s*فولیو\s*ویب\s*سائٹ)\b/i
		]
	},
	{
		intent: 'skills',
		patterns: [/\bskills?\b/i, /\btech\s*stack\b/i, /\btechnolog\w*\b/i, /\b(مہارت|ٹیک\s*اسٹیک)\b/i]
	},
	{
		intent: 'tools',
		patterns: [/\btools?\b/i, /\b(github|docker|framework\w*|languages?|ٹول)\b/i]
	},
	{
		intent: 'education',
		patterns: [/\beducat\w*\b/i, /\b(degree|university|bzu|college|پڑھائی|ڈگری)\b/i]
	},
	{
		intent: 'experience',
		patterns: [/\bexperience\b/i, /\b(work\s*history|jobs?|career|founder|ceo|تجربہ)\b/i]
	},
	{
		intent: 'about',
		patterns: [/\b(about\s*(you|yourself)?|who\s*are\s*you|introduce|bio|اپنے\s*بارے|کون\s*ہو)\b/i]
	},
	{
		intent: 'contact',
		patterns: [/\b(contact|email|phone|call|reach|رابطہ|ای\s*میل|فون)\b/i]
	},
	{
		intent: 'social',
		patterns: [/\b(social|linkedin|instagram|facebook|سوشل)\b/i]
	},
	{
		intent: 'location',
		patterns: [/\b(where\s*(are|do)\s*you|location|based|city|live|kid[hr]|kahan|کہاں|کدر|ملتان)\b/i]
	},
	{
		intent: 'freelance',
		patterns: [/\b(freelance|hire|available|hiring)\b/i]
	},
	{
		intent: 'out_of_scope',
		patterns: [/\b(online\s*ho\s*ja|whatsapp\s*pr|go\s*online|meet\s*me|girlfriend|politics|password)\b/i]
	}
];

const KEYWORD_INTENTS: { intent: Intent; keys: string[] }[] = [
	{ intent: 'projects', keys: ['project', 'projects', 'thumbnail', 'quickdine', 'quickshow', 'lms', 'پروجیکٹ'] },
	{
		intent: 'certificates',
		keys: ['certificate', 'certificates', 'certification', 'certifications', 'achievement', 'achievements']
	},
	{ intent: 'website', keys: ['website', 'portfolio', 'pages', 'usmanfarooq'] },
	{ intent: 'education', keys: ['education', 'degree', 'university', 'college', 'تعلیم', 'پڑھائی'] },
	{ intent: 'experience', keys: ['experience', 'career', 'job', 'تجربہ'] },
	{ intent: 'skills', keys: ['skill', 'skills', 'stack', 'technology', 'technologies'] },
	{ intent: 'tools', keys: ['tool', 'tools'] },
	{ intent: 'contact', keys: ['contact', 'email', 'phone', 'رابطہ'] },
	{ intent: 'cv', keys: ['cv', 'resume'] },
	{ intent: 'social', keys: ['social', 'linkedin', 'instagram', 'facebook'] },
	{ intent: 'location', keys: ['location', 'where', 'multan', 'kahan', 'kidr', 'kidhr'] },
	{ intent: 'about', keys: ['about', 'yourself', 'introduce', 'bio'] },
	{ intent: 'freelance', keys: ['freelance', 'hire', 'hiring', 'available'] },
	{ intent: 'greeting', keys: ['hi', 'hello', 'helo', 'hey', 'salam', 'aoa'] }
];

function normalizeQuery(text: string): string {
	return text
		.trim()
		.toLowerCase()
		.replace(/[?!.,;:]+$/g, '')
		.replace(/\s+/g, ' ');
}

function detectIntent(text: string): Intent {
	const normalized = normalizeQuery(text);

	for (const { intent, patterns } of INTENT_PATTERNS) {
		if (patterns.some((p) => p.test(normalized))) return intent;
	}

	const tokens = normalized.split(/[^a-z0-9\u0600-\u06FF]+/).filter(Boolean);
	for (const { intent, keys } of KEYWORD_INTENTS) {
		if (tokens.some((t) => keys.includes(t))) return intent;
		if (keys.some((k) => k.length > 3 && normalized.includes(k))) return intent;
	}

	return 'out_of_scope';
}

const CV_URL =
	'https://drive.google.com/file/d/13BA0Xwe1t5-2jtTYuNjZyVIENjmf4D-L/view?usp=sharing';

const RESPONSES: Record<Intent, Record<ChatLang, string>> = {
	greeting: {
		en: "Hello! Engr.Mr.Usman here — Software Engineer & Full Stack Developer. Ask me about my portfolio website, projects, skills, education, experience, certifications, CV, or how to contact me.",
		roman:
			"Hello there! Engr.Mr.Usman here. Main theek hoon, Allah ka shukr! Main yahan apne portfolio, projects, certifications, skills, education aur contact ke bare mein batane ke liye hoon. Feel free to ask!",
		urdu: 'السلام علیکم! میں Engr.Mr.Usman ہوں — سافٹ ویئر انجینئر اور فل اسٹیک ڈیولپر۔ میرے پورٹ فولیو، پروجیکٹس، مہارتوں، تعلیم، تجربے، سرٹیفکیٹس، سی وی یا رابطے کے بارے میں پوچھیں۔'
	},
	about: {
		en: "I'm Engr.Mr.Usman (Usman Farooq) — a Software Engineer & Full Stack Developer with 3+ years of experience. I build modern, scalable web apps, work with Cloud Computing & Networking, and I'm Founder & CEO of Prime Softnox Solutions (since July 2026). Based in Multan, Pakistan. Portfolio: https://usmanfarooq.dev/",
		roman:
			"Main Engr.Mr.Usman (Usman Farooq) hoon — Software Engineer & Full Stack Developer, 3+ saal ka experience. Modern scalable web apps banata hoon, Cloud Computing aur Networking pe kaam karta hoon. July 2026 se Prime Softnox Solutions ka Founder & CEO hoon. Multan, Pakistan. Portfolio: https://usmanfarooq.dev/",
		urdu: 'میں Engr.Mr.Usman (عثمان فاروق) ہوں — سافٹ ویئر انجینئر اور فل اسٹیک ڈیولپر، تین سے زائد سال کا تجربہ۔ جولائی 2026 سے Prime Softnox Solutions کا بانی اور سی ای او ہوں۔ ملتان، پاکستان۔ پورٹ فولیو: https://usmanfarooq.dev/'
	},
	website: {
		en: "My portfolio website (https://usmanfarooq.dev/) includes:\n• Home — intro, Download CV, social links\n• About — bio, education, experience\n• Projects — 12 selected projects with demos\n• Skills — technologies & proficiency\n• Achievements — 11+ certificates with verify links\n• Contact — email & socials\n• Live Chat — this assistant\n(Blog is not available yet.)",
		roman:
			"Mere portfolio (https://usmanfarooq.dev/) pe ye pages hain:\n• Home — intro, Download CV, socials\n• About — bio, education, experience\n• Projects — 12 projects + demos\n• Skills — technologies\n• Achievements — 11+ certificates\n• Contact — email & socials\n• Live Chat — ye assistant\n(Blog abhi available nahi.)",
		urdu: 'میرے پورٹ فولیو (https://usmanfarooq.dev/) پر یہ صفحات ہیں:\n• Home، About، Projects، Skills، Achievements، Contact، Live Chat\n(بلاگ ابھی دستیاب نہیں۔)'
	},
	education: {
		en: "Education highlights:\n• BS Computer Science — BZU Multan (2020–2024), CGPA 3.5/4.0\n• Software Engineering Track (2024–2026)\n• Cloud Computing Certification — Global Tech Institute (2023–2024)\n• Computer Networking Diploma — Network Academy Multan (2022–2023)\n• ICS — Govt. Millat Graduate College Multan (80%)\n• Matriculation — City School Multan (85%)\nMore detail is on the About page.",
		roman:
			"Education:\n• BS Computer Science — BZU Multan (2020–2024), CGPA 3.5/4.0\n• Software Engineering Track (2024–2026)\n• Cloud Computing Certification — Global Tech Institute\n• Computer Networking Diploma — Network Academy Multan\n• ICS — Millat College Multan (80%)\n• Matric — City School Multan (85%)\nAbout page pe detail mil jayegi.",
		urdu: 'تعلیم:\n• بی ایس کمپیوٹر سائنس — بی زیڈ یو ملتان (2020–2024)، سی جی پی اے 3.5/4.0\n• سافٹ ویئر انجینئرنگ ٹریک (2024–2026)\n• کلاؤڈ کمپیوٹنگ سرٹیفیکیشن\n• کمپیوٹر نیٹ ورکنگ ڈپلومہ\n• آئی سی ایس — ملت کالج ملتان (80%)\n• میٹرک — سٹی اسکول ملتان (85%)'
	},
	experience: {
		en: "Experience:\n• Founder & CEO — Prime Softnox Solutions (July 2026 – Present)\n• Cloud Computing Specialist — Prime Softnox Solutions (2024 – Present)\n• Networking Engineer (Part-time) — Nexus Link Solutions (2023 – Present)\n• Software Engineer — Tech Solutions Inc. (2023 – Present)\n• Frontend Developer — Digital Creations (2022–2023)\n• Junior Developer — StartUp Hub (2021–2022)\nFull timeline is on the About page.",
		roman:
			"Experience:\n• Founder & CEO — Prime Softnox Solutions (July 2026 – Present)\n• Cloud Computing Specialist — Prime Softnox Solutions\n• Networking Engineer — Nexus Link Solutions (part-time)\n• Software Engineer — Tech Solutions Inc.\n• Frontend Developer — Digital Creations\n• Junior Developer — StartUp Hub\nKul 3+ saal ka professional experience. About page pe detail hai.",
		urdu: 'تجربہ:\n• بانی و سی ای او — Prime Softnox Solutions (جولائی 2026 – حال)\n• کلاؤڈ کمپیوٹنگ ماہر — Prime Softnox Solutions\n• نیٹ ورکنگ انجینئر — Nexus Link Solutions\n• سافٹ ویئر انجینئر — Tech Solutions Inc.\n• فرنٹ اینڈ ڈیولپر — Digital Creations\n• جونیئر ڈیولپر — StartUp Hub'
	},
	skills: {
		en: "Tech stack highlights (Skills page):\n• Languages: JavaScript (95%), TypeScript (90%)\n• Frameworks: SvelteKit, React, Next.js, Tailwind CSS\n• Backend: Node.js, Express, Fastify, Prisma, Zod\n• Databases: PostgreSQL, MongoDB, Supabase, Firebase\n• Cloud/DevOps: Docker, AWS (EC2, S3, Lambda), Networking\n• Tools: GitHub (95%)",
		roman:
			"Mera tech stack (Skills page):\n• Languages: JavaScript, TypeScript\n• Frameworks: SvelteKit, React, Next.js, Tailwind\n• Backend: Node.js, Express, Fastify, Prisma, Zod\n• Databases: PostgreSQL, MongoDB, Supabase, Firebase\n• Cloud/DevOps: Docker, AWS, Networking\n• Tools: GitHub",
		urdu: 'ٹیک اسٹیک (Skills صفحہ):\n• زبانیں: JavaScript، TypeScript\n• فریم ورکس: SvelteKit، React، Next.js، Tailwind\n• بیک اینڈ: Node.js، Express، Fastify، Prisma، Zod\n• ڈیٹا بیس: PostgreSQL، MongoDB، Supabase، Firebase\n• کلاؤڈ/ڈیواپس: Docker، AWS، Networking\n• ٹولز: GitHub'
	},
	tools: {
		en: "Tools & technologies I use include GitHub, Docker, AWS, Tailwind CSS, Node.js, Prisma, Zod, and modern frameworks (React, Next.js, SvelteKit). Cloud Computing and Networking are also part of my toolkit. See the Skills page for levels.",
		roman:
			"Main GitHub, Docker, AWS, Tailwind, Node.js, Prisma, Zod aur modern frameworks (React, Next.js, SvelteKit) use karta hoon. Cloud Computing aur Networking bhi mere tools mein hain. Skills page pe levels hain.",
		urdu: 'روزمرہ ٹولز میں GitHub، Docker، AWS، Tailwind، Node.js، Prisma، Zod اور جدید فریم ورکس شامل ہیں۔ Skills صفحہ پر تفصیل ہے۔'
	},
	projects: {
		en: "Selected projects on my Projects page (12+):\n1. Smarter Software - Better Tomorrow (Prime Softnox) — https://primesoftnoxsolutions-2.vercel.app/\n2. School Management System — https://school-management-system-live-demo.vercel.app/\n3. Blog Website — https://blog-website-alpha-inky.vercel.app/\n4. Personal Portfolio Website — https://mr-usman-90.github.io/GFX-Mr.Usman-Portfolio/\n5. Inventory Management App — demo coming soon\n6. Social Media Website — https://mr-usman-90.github.io/Social-Media-Website/\n7. ProEdu LMS — https://mr-usman-90.github.io/LMS-Website/\n8. Thumbnail Go (AI thumbnails) — https://thumbnailgo.com/\n9. Guardians of the Galaxy / QuickShow — https://quickshow.vercel.app/\n10. Create viral UGC in seconds — https://www.makeugcad.com/\n11. Quickdine Restaurant — https://quickdine-gs.vercel.app/\n12. Workflow Planner App — demo coming soon\nCode: https://github.com/engr-mr-usman",
		roman:
			"Mere Projects page pe selected projects (12+):\n1. Prime Softnox — primesoftnoxsolutions-2.vercel.app\n2. School Management System\n3. Blog Website\n4. Personal Portfolio Website\n5. Inventory Management App\n6. Social Media Website\n7. ProEdu LMS\n8. Thumbnail Go — thumbnailgo.com\n9. Guardians of the Galaxy / QuickShow — quickshow.vercel.app\n10. UGC AI — makeugcad.com\n11. Quickdine Restaurant — quickdine-gs.vercel.app\n12. Workflow Planner App\nGitHub: https://github.com/engr-mr-usman",
		urdu: 'پروجیکٹس صفحہ پر منتخب پروجیکٹس (12+):\n1. Prime Softnox Solutions\n2. School Management System\n3. Blog Website\n4. Personal Portfolio\n5. Inventory Management\n6. Social Media Website\n7. ProEdu LMS\n8. Thumbnail Go\n9. Guardians of the Galaxy / QuickShow\n10. UGC AI\n11. Quickdine Restaurant\n12. Workflow Planner\nکوڈ: https://github.com/engr-mr-usman'
	},
	certificates: {
		en: "Certificates on my Achievements page (11+):\n• SEO — DigiSkills.pk (Dec 17, 2026) — ID: XQP2YJGMK — https://digiskills.pk/verify/\n• Google AI Essentials — Coursera (Feb 13, 2025)\n• Technical Support Fundamentals — Google/Coursera (Feb 04, 2025)\n• Success Mindset — HP LIFE (May 31, 2025)\n• Critical Infrastructure Protection — OPSWAT Academy (Sep 02, 2025)\n• HP LIFE Ambassador (May 29, 2025)\n• Business Email — HP LIFE (May 29, 2025)\n• IT for Business Success — HP LIFE (May 31, 2025)\n• Job Interviewing — HP LIFE (Sep 24, 2024)\n• WordPress — Coursera (Feb 05, 2025)\n• Microsoft Excel Formulas — Coursera (Jul 17, 2024)\nOpen Achievements to view certificates and verify links.",
		roman:
			"Achievements page pe certificates (11+):\n• SEO — DigiSkills.pk (ID: XQP2YJGMK)\n• Google AI Essentials\n• Technical Support Fundamentals\n• Success Mindset — HP LIFE\n• Critical Infrastructure Protection — OPSWAT\n• HP LIFE Ambassador\n• Business Email, IT for Business Success, Job Interviewing — HP LIFE\n• WordPress & Microsoft Excel — Coursera\nVerify links Achievements page pe hain.",
		urdu: 'Achievements صفحہ پر 11+ سرٹیفکیٹس ہیں — DigiSkills SEO، Google AI Essentials، Technical Support، HP LIFE کورسز، OPSWAT، WordPress، Excel وغیرہ۔ تصدیقی لنکس اسی صفحے پر ہیں۔'
	},
	contact: {
		en: "You can reach me at:\n• Email: engr.mr.usman@gmail.com\n• Phone / WhatsApp: +92 310 6565892\n• WhatsApp: https://wa.me/923106565892\n• Location: Multan, Pakistan\nOr use the Contact page on this site.",
		roman:
			"Contact:\n• Email: engr.mr.usman@gmail.com\n• Phone / WhatsApp: +92 310 6565892\n• Link: https://wa.me/923106565892\n• Location: Multan, Pakistan\nContact page bhi available hai.",
		urdu: 'رابطہ:\n• ای میل: engr.mr.usman@gmail.com\n• فون / واٹس ایپ: +92 310 6565892\n• مقام: ملتان، پاکستان\nContact صفحہ بھی موجود ہے۔'
	},
	cv: {
		en: `View / download my CV:\n${CV_URL}\nOr use Download CV on the Home page.`,
		roman: `CV yahan se dekho / download karo:\n${CV_URL}\nHome page pe Download CV button bhi hai.`,
		urdu: `سی وی یہاں سے دیکھ / ڈاؤن لوڈ کریں:\n${CV_URL}`
	},
	social: {
		en: "Social links:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram: https://www.instagram.com/engr.mr.usman\n• Facebook: https://www.facebook.com/mr.usmanjutt90\n• WhatsApp: https://wa.me/923106565892",
		roman:
			"Social links:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram: https://www.instagram.com/engr.mr.usman\n• Facebook: https://www.facebook.com/mr.usmanjutt90\n• WhatsApp: https://wa.me/923106565892",
		urdu: 'سوشل میڈیا:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram / Facebook / WhatsApp لنکس Home اور Contact صفحے پر ہیں۔'
	},
	location: {
		en: "I'm based in Multan, Pakistan.",
		roman: 'Main Multan, Pakistan mein hoon.',
		urdu: 'میں ملتان، پاکستان میں مقیم ہوں۔'
	},
	freelance: {
		en: "Yes — I'm available for freelance work. Email engr.mr.usman@gmail.com or WhatsApp +92 310 6565892.",
		roman:
			"Haan, main freelance ke liye available hoon. Email: engr.mr.usman@gmail.com ya WhatsApp: +92 310 6565892.",
		urdu: 'جی ہاں، میں فری لانس کے لیے دستیاب ہوں۔ ای میل یا واٹس ایپ پر رابطہ کریں۔'
	},
	out_of_scope: {
		en: "I don't have that information on my portfolio. Ask me about this website's pages, my projects, certifications, skills, education, experience, CV, or how to contact me!",
		roman:
			"Ye info mere portfolio pe nahi hai. Website pages, projects, certifications, skills, education, experience, CV, ya contact ke bare mein pooch sakte ho!",
		urdu: 'یہ معلومات میرے پورٹ فولیو پر دستیاب نہیں۔ ویب سائٹ، پروجیکٹس، سرٹیفکیٹس، مہارتوں، تعلیم، تجربے یا رابطے کے بارے میں پوچھیں!'
	}
};

export function detectLang(text: string): ChatLang {
	if (/[\u0600-\u06FF]/.test(text)) return 'urdu';
	const romanHints =
		/\b(kya|hai|hoon|hun|main|mein|tum|aap|kid[hr]|kahan|kese|kaisa|batao|mujhe|nahi|haan|theek|shukr|salam|kaam|bare)\b/i;
	if (romanHints.test(text)) return 'roman';
	return 'en';
}

export function localReply(message: string): string {
	return RESPONSES[detectIntent(message)][detectLang(message)];
}

export type ChatHistoryItem = { role: 'user' | 'assistant'; content: string };

const API_BASE = (import.meta.env.PUBLIC_API_URL as string | undefined)?.replace(/\/$/, '') ||
	'http://localhost:3001';

export async function askAgent(
	message: string,
	history: ChatHistoryItem[] = []
): Promise<string> {
	try {
		const res = await fetch(`${API_BASE}/api/chat`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message, history })
		});

		if (res.ok) {
			const data = (await res.json()) as { reply?: string };
			if (data.reply?.trim()) return data.reply.trim();
		}
	} catch {
		/* backend offline — local fallback */
	}

	return localReply(message);
}
