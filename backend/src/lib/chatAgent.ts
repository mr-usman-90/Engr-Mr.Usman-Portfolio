import { SYSTEM_PROMPT } from '../knowledge/portfolio.js';
import type { ChatRequest } from '../schemas/chat.js';

export type ChatLang = 'en' | 'roman' | 'urdu';

type Intent =
	| 'greeting'
	| 'about'
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
	{ intent: 'cv', patterns: [/\b(cv|resume|resumé|ڈاؤن\s*لوڈ\s*سی\s*وی|سی\s*وی)\b/i] },
	{
		intent: 'certificates',
		patterns: [
			/\bcertificat\w*\b/i,
			/\bachievement\w*\b/i,
			/\b(aws\s*cert|digiskills|cisco|meta\s*front|سندی|سرٹیفکیٹ)\b/i
		]
	},
	{
		intent: 'projects',
		patterns: [
			/\bprojects?\b/i,
			/\b(portfolio\s*site|e-?commerce|school\s*management|پروجیکٹ)\b/i,
			/\bpos\b/i
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
		patterns: [
			/\beducat\w*\b/i,
			/\b(degree|university|bzu|college|schooling|پڑھائی|ڈگری|یونیورسٹی)\b/i
		]
	},
	{
		intent: 'experience',
		patterns: [/\bexperience\b/i, /\b(work\s*history|jobs?|career|founder|ceo|تجربہ|نوکری)\b/i]
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
		patterns: [
			/\b(where\s*(are|do)\s*you|location|based|city|live|kid[hr]|kahan|کہاں|کدر|ملتان)\b/i
		]
	},
	{
		intent: 'freelance',
		patterns: [/\b(freelance|hire|available|hiring|کام\s*کرو)\b/i]
	},
	{
		intent: 'out_of_scope',
		patterns: [
			/\b(online\s*ho\s*ja|whatsapp\s*pr|go\s*online|meet\s*me|girlfriend|politics|password)\b/i
		]
	}
];

/** Keyword fallback when regex is too strict (e.g. short one-word queries). */
const KEYWORD_INTENTS: { intent: Intent; keys: string[] }[] = [
	{ intent: 'projects', keys: ['project', 'projects', 'پروجیکٹ'] },
	{ intent: 'certificates', keys: ['certificate', 'certificates', 'certification', 'certifications', 'achievement', 'achievements'] },
	{ intent: 'education', keys: ['education', 'degree', 'university', 'college', 'تعلیم', 'پڑھائی'] },
	{ intent: 'experience', keys: ['experience', 'career', 'job', 'تجربہ'] },
	{ intent: 'skills', keys: ['skill', 'skills', 'stack', 'technology', 'technologies'] },
	{ intent: 'tools', keys: ['tool', 'tools'] },
	{ intent: 'contact', keys: ['contact', 'email', 'phone', 'رابطہ'] },
	{ intent: 'cv', keys: ['cv', 'resume'] },
	{ intent: 'social', keys: ['social', 'linkedin', 'instagram', 'facebook', 'github'] },
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
const RESPONSES: Record<Intent, Record<ChatLang, string>> = {
	greeting: {
		en: "Hello! Engr.Mr.Usman here — Software Engineer & Full Stack Developer. Ask me about my projects, skills, education, experience, certifications, CV, or how to contact me.",
		roman:
			"Hello there! Engr.Mr.Usman here. Main theek hoon, Allah ka shukr! It's great to hear from you. Main yahan apne kaam, experience, projects, certifications aur skills ke bare mein batane ke liye hoon. Feel free to ask!",
		urdu: 'السلام علیکم! میں Engr.Mr.Usman ہوں — سافٹ ویئر انجینئر اور فل اسٹیک ڈیولپر۔ میرے پروجیکٹس، مہارتوں، تعلیم، تجربے، سرٹیفکیٹس، سی وی یا رابطے کے بارے میں پوچھیں۔'
	},
	about: {
		en: "I'm Engr.Mr.Usman (Usman Farooq) — a Software Engineer & Full Stack Developer with 3+ years of experience. I build modern, scalable web apps, work with Cloud Computing & Networking, and I'm Founder & CEO of Prime Softnox Solutions (since July 2026). Based in Multan, Pakistan.",
		roman:
			"Main Engr.Mr.Usman (Usman Farooq) hoon — Software Engineer & Full Stack Developer, 3+ saal ka experience. Modern scalable web apps banata hoon, Cloud Computing aur Networking pe kaam karta hoon. July 2026 se Prime Softnox Solutions ka Founder & CEO hoon. Multan, Pakistan mein rehta hoon.",
		urdu: 'میں Engr.Mr.Usman (عثمان فاروق) ہوں — سافٹ ویئر انجینئر اور فل اسٹیک ڈیولپر، تین سے زائد سال کا تجربہ۔ جدید اور اسکیل ایبل ویب ایپس بناتا ہوں۔ جولائی 2026 سے Prime Softnox Solutions کا بانی اور سی ای او ہوں۔ ملتان، پاکستان میں مقیم ہوں۔'
	},
	education: {
		en: "Education highlights:\n• BS Computer Science — BZU Multan (2020–2024), CGPA 3.5/4.0\n• Software Engineering Track (2024–2026)\n• Cloud Computing Certification — Global Tech Institute (2023–2024)\n• Computer Networking Diploma — Network Academy Multan (2022–2023)\n• ICS — Govt. Millat Graduate College Multan (80%)\n• Matriculation — City School Multan (85%)",
		roman:
			"Education:\n• BS Computer Science — BZU Multan (2020–2024), CGPA 3.5/4.0\n• Software Engineering Track (2024–2026)\n• Cloud Computing Certification — Global Tech Institute\n• Computer Networking Diploma — Network Academy Multan\n• ICS — Millat College Multan (80%)\n• Matric — City School Multan (85%)",
		urdu: 'تعلیم:\n• بی ایس کمپیوٹر سائنس — بی زیڈ یو ملتان (2020–2024)، سی جی پی اے 3.5/4.0\n• سافٹ ویئر انجینئرنگ ٹریک (2024–2026)\n• کلاؤڈ کمپیوٹنگ سرٹیفیکیشن — Global Tech Institute\n• کمپیوٹر نیٹ ورکنگ ڈپلومہ — Network Academy Multan\n• آئی سی ایس — ملت کالج ملتان (80%)\n• میٹرک — سٹی اسکول ملتان (85%)'
	},
	experience: {
		en: "Experience:\n• Founder & CEO — Prime Softnox Solutions (July 2026 – Present)\n• Cloud Computing Specialist — Prime Softnox Solutions (2024 – Present)\n• Networking Engineer (Part-time) — Nexus Link Solutions (2023 – Present)\n• Software Engineer — Tech Solutions Inc. (2023 – Present)\n• Frontend Developer — Digital Creations (2022–2023)\n• Junior Developer — StartUp Hub (2021–2022)",
		roman:
			"Experience:\n• Founder & CEO — Prime Softnox Solutions (July 2026 – Present)\n• Cloud Computing Specialist — Prime Softnox Solutions\n• Networking Engineer — Nexus Link Solutions (part-time)\n• Software Engineer — Tech Solutions Inc.\n• Frontend Developer — Digital Creations\n• Junior Developer — StartUp Hub\nKul mila kar 3+ saal ka professional experience.",
		urdu: 'تجربہ:\n• بانی و سی ای او — Prime Softnox Solutions (جولائی 2026 – حال)\n• کلاؤڈ کمپیوٹنگ ماہر — Prime Softnox Solutions\n• نیٹ ورکنگ انجینئر — Nexus Link Solutions\n• سافٹ ویئر انجینئر — Tech Solutions Inc.\n• فرنٹ اینڈ ڈیولپر — Digital Creations\n• جونیئر ڈیولپر — StartUp Hub'
	},
	skills: {
		en: "Tech stack highlights:\n• Languages: JavaScript (95%), TypeScript (90%)\n• Frameworks: SvelteKit, React, Next.js, Tailwind CSS\n• Backend: Node.js, Express, Fastify, Prisma, Zod\n• Databases: PostgreSQL, MongoDB, Supabase, Firebase\n• Cloud/DevOps: Docker, AWS (EC2, S3, Lambda), Networking\n• Tools: GitHub (95%)\nAsk about any specific technology if you want more detail!",
		roman:
			"Mera tech stack:\n• Languages: JavaScript, TypeScript\n• Frameworks: SvelteKit, React, Next.js, Tailwind\n• Backend: Node.js, Express, Fastify, Prisma, Zod\n• Databases: PostgreSQL, MongoDB, Supabase, Firebase\n• Cloud/DevOps: Docker, AWS, Networking\n• Tools: GitHub\nKisi specific skill ke bare mein poochna ho to batao!",
		urdu: 'ٹیک اسٹیک:\n• زبانیں: JavaScript، TypeScript\n• فریم ورکس: SvelteKit، React، Next.js، Tailwind\n• بیک اینڈ: Node.js، Express، Fastify، Prisma، Zod\n• ڈیٹا بیس: PostgreSQL، MongoDB، Supabase، Firebase\n• کلاؤڈ/ڈیواپس: Docker، AWS، Networking\n• ٹولز: GitHub'
	},
	tools: {
		en: "Tools & technologies I use daily include GitHub, Docker, AWS, Tailwind CSS, Node.js tooling, Prisma, Zod, and modern frontend frameworks (React, Next.js, SvelteKit). Cloud Computing and Networking are also part of my toolkit.",
		roman:
			"Main rozana GitHub, Docker, AWS, Tailwind, Node.js, Prisma, Zod aur modern frameworks (React, Next.js, SvelteKit) use karta hoon. Cloud Computing aur Networking bhi mere tools mein shamil hain.",
		urdu: 'روزمرہ ٹولز میں GitHub، Docker، AWS، Tailwind، Node.js، Prisma، Zod اور جدید فریم ورکس (React، Next.js، SvelteKit) شامل ہیں۔ کلاؤڈ کمپیوٹنگ اور نیٹ ورکنگ بھی میرے کام کا حصہ ہیں۔'
	},
	projects: {
		en: "Top projects on my portfolio:\n1. School Management System — React, Node.js, MongoDB, Tailwind\n2. POS System for Retail — React, Express, MongoDB, Socket.io\n3. E-Commerce Website — Next.js, Tailwind, Stripe, MongoDB\n4. Inventory Management App — Electron, SQLite\n5. Personal Portfolio — HTML, CSS, JS, GSAP (live at usmanfarooq.dev)\n6. Task Management App — React, Firebase, Tailwind, Framer Motion\nCode: https://github.com/engr-mr-usman",
		roman:
			"Mere top projects:\n1. School Management System\n2. POS System for Retail\n3. E-Commerce Website\n4. Inventory Management App (Electron)\n5. Personal Portfolio — usmanfarooq.dev\n6. Task Management App\nCode GitHub pe: https://github.com/engr-mr-usman",
		urdu: 'اہم پروجیکٹس:\n1. اسکول مینجمنٹ سسٹم\n2. ریٹیل کے لیے پی او ایس سسٹم\n3. ای کامرس ویب سائٹ\n4. انوینٹری مینجمنٹ ایپ\n5. پرسنل پورٹ فولیو — usmanfarooq.dev\n6. ٹاسک مینجمنٹ ایپ\nکوڈ: https://github.com/engr-mr-usman'
	},
	certificates: {
		en: "Certificates:\n• SEO — DigiSkills.pk (Nov 17, 2025)\n• AWS Certified Cloud Practitioner — Amazon Web Services (Oct 25, 2025)\n• Introduction to Cybersecurity — Cisco Networking Academy (Sep 10, 2025)\n• Meta Front-End Developer — Meta / Coursera (Aug 20, 2025)\nSee more on the Achievements page of this portfolio.",
		roman:
			"Certificates:\n• SEO — DigiSkills.pk (Nov 2025)\n• AWS Cloud Practitioner (Oct 2025)\n• Cybersecurity Intro — Cisco (Sep 2025)\n• Meta Front-End Developer (Aug 2025)\nAchievements page pe detail mil jayegi.",
		urdu: 'سرٹیفکیٹس:\n• ایس ای او — DigiSkills.pk (نومبر 2025)\n• اے ڈبلیو ایس کلاؤڈ پریکٹیشنر (اکتوبر 2025)\n• سائبر سیکیورٹی تعارف — Cisco (ستمبر 2025)\n• میٹا فرنٹ اینڈ ڈیولپر (اگست 2025)'
	},
	contact: {
		en: "You can reach me at:\n• Email: engr.mr.usman@gmail.com\n• Phone / WhatsApp: +92 310 6565892 (https://wa.me/923106565892)\n• Location: Multan, Pakistan\nThere's also a Contact page on this site.",
		roman:
			"Contact:\n• Email: engr.mr.usman@gmail.com\n• Phone / WhatsApp: +92 310 6565892\n• WhatsApp link: https://wa.me/923106565892\n• Location: Multan, Pakistan",
		urdu: 'رابطہ:\n• ای میل: engr.mr.usman@gmail.com\n• فون / واٹس ایپ: +92 310 6565892\n• مقام: ملتان، پاکستان'
	},
	cv: {
		en: "You can view/download my CV here:\nhttps://drive.google.com/file/d/1YC8c3fZ3pHT_xKiLWOTKqaTiIVATAtar/view?usp=drive_link\nOr use the Download CV button on the Home page.",
		roman:
			"Mera CV yahan se dekh / download kar sakte ho:\nhttps://drive.google.com/file/d/1YC8c3fZ3pHT_xKiLWOTKqaTiIVATAtar/view?usp=drive_link\nHome page pe Download CV button bhi hai.",
		urdu: 'میرا سی وی یہاں سے دیکھ / ڈاؤن لوڈ کر سکتے ہیں:\nhttps://drive.google.com/file/d/1YC8c3fZ3pHT_xKiLWOTKqaTiIVATAtar/view?usp=drive_link\nہوم پیج پر Download CV بٹن بھی موجود ہے۔'
	},
	social: {
		en: "Social links:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram: https://www.instagram.com/engr.mr.usman\n• Facebook: https://www.facebook.com/mr.usmanjutt90\n• WhatsApp: https://wa.me/923106565892",
		roman:
			"Social links:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram: https://www.instagram.com/engr.mr.usman\n• Facebook: https://www.facebook.com/mr.usmanjutt90\n• WhatsApp: https://wa.me/923106565892",
		urdu: 'سوشل میڈیا:\n• GitHub: https://github.com/engr-mr-usman\n• LinkedIn: https://www.linkedin.com/in/engr-mr-usman\n• Instagram: https://www.instagram.com/engr.mr.usman\n• Facebook: https://www.facebook.com/mr.usmanjutt90\n• WhatsApp: https://wa.me/923106565892'
	},
	location: {
		en: "I'm based in Multan, Pakistan.",
		roman: 'Main Multan, Pakistan mein hoon.',
		urdu: 'میں ملتان، پاکستان میں مقیم ہوں۔'
	},
	freelance: {
		en: "Yes — I'm available for freelance work. Email engr.mr.usman@gmail.com or WhatsApp +92 310 6565892 to discuss a project.",
		roman:
			"Haan, main freelance ke liye available hoon. Project discuss karne ke liye email: engr.mr.usman@gmail.com ya WhatsApp: +92 310 6565892.",
		urdu: 'جی ہاں، میں فری لانس کام کے لیے دستیاب ہوں۔ پروجیکٹ کے لیے ای میل engr.mr.usman@gmail.com یا واٹس ایپ +92 310 6565892 پر رابطہ کریں۔'
	},
	out_of_scope: {
		en: "I don't have that information on my portfolio. Feel free to ask about my projects, certifications, skills, education, experience, CV, or how to contact me!",
		roman:
			"I don't have that information on my portfolio. Feel free to ask about my projects, certifications, skills, education, experience, ya contact details!",
		urdu: 'یہ معلومات میرے پورٹ فولیو پر دستیاب نہیں۔ میرے پروجیکٹس، سرٹیفکیٹس، مہارتوں، تعلیم، تجربے یا رابطے کے بارے میں ضرور پوچھیں!'
	}
};

export function detectLang(text: string): ChatLang {
	if (/[\u0600-\u06FF]/.test(text)) return 'urdu';
	const romanHints =
		/\b(kya|hai|hoon|hun|main|mein|tum|aap|kid[hr]|kahan|kese|kaisa|batao|mujhe|nahi|haan|theek|shukr|salam|kaam|bare|mein)\b/i;
	if (romanHints.test(text)) return 'roman';
	return 'en';
}

export function localReply(message: string): string {
	const lang = detectLang(message);
	const intent = detectIntent(message);
	return RESPONSES[intent][lang];
}

type LlmMessage = { role: 'system' | 'user' | 'assistant'; content: string };

function resolveLlmConfig(): { apiKey: string; baseUrl: string; model: string } | null {
	const groqKey = process.env.GROQ_API_KEY?.trim();
	const openaiKey = process.env.OPENAI_API_KEY?.trim();

	if (groqKey) {
		return {
			apiKey: groqKey,
			baseUrl: (process.env.OPENAI_BASE_URL ?? 'https://api.groq.com/openai/v1').replace(/\/$/, ''),
			model: process.env.OPENAI_MODEL ?? 'llama-3.3-70b-versatile'
		};
	}

	if (openaiKey) {
		return {
			apiKey: openaiKey,
			baseUrl: (process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, ''),
			model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
		};
	}

	return null;
}

async function llmReply(req: ChatRequest): Promise<string | null> {
	const config = resolveLlmConfig();
	if (!config) return null;

	const messages: LlmMessage[] = [
		{ role: 'system', content: SYSTEM_PROMPT },
		...req.history.map((m) => ({ role: m.role, content: m.content })),
		{ role: 'user', content: req.message }
	];

	const response = await fetch(`${config.baseUrl}/chat/completions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: config.model,
			temperature: 0.4,
			max_tokens: 700,
			messages
		})
	});

	if (!response.ok) {
		const body = await response.text().catch(() => '');
		throw new Error(`LLM request failed (${response.status}): ${body.slice(0, 200)}`);
	}

	const data = (await response.json()) as {
		choices?: { message?: { content?: string } }[];
	};

	const content = data.choices?.[0]?.message?.content?.trim();
	return content || null;
}

export async function generateChatReply(req: ChatRequest): Promise<{
	reply: string;
	provider: 'llm' | 'local';
}> {
	try {
		const llm = await llmReply(req);
		if (llm) return { reply: llm, provider: 'llm' };
	} catch (error) {
		console.error('[chat] LLM fallback to local agent:', error);
	}

	return { reply: localReply(req.message), provider: 'local' };
}
