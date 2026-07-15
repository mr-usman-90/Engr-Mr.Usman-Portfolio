<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Briefcase,
		Code2,
		GraduationCap,
		Languages,
		Mail,
		MapPin,
		Phone,
		Rocket,
		User,
		Users
	} from '@lucide/svelte';

	const detailsLeft = [
		{ Icon: User, label: 'Name', value: 'Engr.Mr.Usman' },
		{ Icon: Code2, label: 'Role', value: 'Software Engineer' },
		{ Icon: Briefcase, label: 'Experience', value: '3+ Years' },
		{ Icon: Mail, label: 'Email', value: 'engr.mr.usman@gmail.com', href: 'mailto:engr.mr.usman@gmail.com' }
	] as const;

	const detailsRight = [
		{ Icon: Phone, label: 'Phone', value: '+92 310 6565892', href: 'tel:+923106565892' },
		{ Icon: MapPin, label: 'Location', value: 'Multan, Pakistan' },
		{ Icon: Briefcase, label: 'Freelance', value: 'Available' },
		{ Icon: Languages, label: 'Languages', value: 'English, Urdu' }
	] as const;

	const stats = [
		{ Icon: Rocket, value: '20+', label: 'Projects Completed' },
		{ Icon: Briefcase, value: '3+', label: 'Years Experience' },
		{ Icon: Code2, value: '10+', label: 'Technologies Mastered' },
		{ Icon: Users, value: '15+', label: 'Happy Clients' }
	] as const;

	const education = [
		{
			year: '2024 - 2026',
			title: "Engineer in Software's",
			place: 'Software Engineering Track',
			meta: 'Advanced software engineering practice & systems design'
		},
		{
			year: '2023 - 2024',
			title: 'Cloud Computing Certification',
			place: 'Global Tech Institute (Demo)',
			meta: 'Cloud architecture, deployment models, and managed services fundamentals'
		},
		{
			year: '2022 - 2023',
			title: 'Computer Networking Diploma',
			place: 'Network Academy Multan (Demo)',
			meta: 'LAN/WAN, TCP/IP, routing basics, and network security foundations'
		},
		{
			year: '2020 - 2024',
			title: 'BS in Computer Science',
			place: 'Bahauddin Zakariya University Multan',
			meta: 'CGPA: 3.5/4.0'
		},
		{
			year: '2018 - 2020',
			title: 'ICS Computer Science',
			place: 'Govt. Millat Graduate College Multan',
			meta: 'Marks: 80%'
		},
		{
			year: '2016 - 2018',
			title: 'Matriculation',
			place: 'City School Multan',
			meta: 'Marks: 85%'
		}
	] as const;

	const experience = [
		{
			year: 'July 2026 - Present',
			title: 'Founder & CEO',
			place: 'Prime Softnox Solutions',
			meta: 'Founded and launched a software company focused on modern, scalable digital products and client solutions.'
		},
		{
			year: '2024 - Present',
			title: 'Cloud Computing Specialist',
			place: 'Prime Softnox Solutions',
			meta: 'Designed and managed cloud deployments, storage, and scalable infrastructure for client products.'
		},
		{
			year: '2023 - Present',
			title: 'Networking Engineer (Part-time)',
			place: 'Nexus Link Solutions (Demo)',
			meta: 'Configured networks, troubleshooting connectivity, and supporting secure local/remote infrastructure.'
		},
		{
			year: '2023 - Present',
			title: 'Software Engineer',
			place: 'Tech Solutions Inc.',
			meta: 'Developed full-stack web applications using modern frameworks.'
		},
		{
			year: '2022 - 2023',
			title: 'Frontend Developer',
			place: 'Digital Creations',
			meta: 'Built responsive UIs and improved website performance.'
		},
		{
			year: '2021 - 2022',
			title: 'Junior Developer',
			place: 'StartUp Hub',
			meta: 'Assisted in frontend development and bug fixing.'
		}
	] as const;

	const techRows = [
		[
			{ name: 'JavaScript', src: '/tech/javascript.png' },
			{ name: 'TypeScript', src: '/tech/typescript.png' },
			{ name: 'Prisma', src: '/tech/prisma.png' },
			{ name: 'Zod', src: '/tech/zod.png' },
			{ name: 'Fastify', src: '/tech/fastify.png' },
			{ name: 'SvelteKit', src: '/tech/sveltekit.png' }
		],
		[
			{ name: 'MongoDB', src: '/tech/mongodb.png' },
			{ name: 'Docker', src: '/tech/docker.png' },
			{ name: 'Supabase', src: '/tech/supabase.png' },
			{ name: 'Firebase', src: '/tech/firebase.png' },
			{ name: 'GitHub', src: '/tech/github.png' },
			{ name: 'AWS', src: '/tech/aws.png', sub: 'EC2 · S3 · Lambda' }
		],
		[
			{ name: 'Cloud Computing', src: '/tech/cloud.svg' },
			{ name: 'Networking', src: '/tech/networking.svg' },
			{ name: 'Tailwind CSS', src: '/tech/tailwind.png' },
			{ name: 'React', src: '/tech/react.png' },
			{ name: 'Next.js', src: '/tech/nextjs.svg' },
			{ name: 'Node.js', src: '/tech/node.png' },
			{ name: 'Express.js', src: '/tech/express.png' },
			{ name: 'PostgreSQL', src: '/tech/postgresql.png' }
		]
	] as const;

	const typePhrases = ['Engr.Mr.Usman', 'Software Engineer', 'Full Stack Developer'] as const;
	let typedName = $state('Engr.Mr.Usman');
	let showCaret = $state(true);

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			typedName = typePhrases[0];
			showCaret = false;
			return;
		}

		let cancelled = false;

		const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

		const run = async () => {
			let index = 0;
			while (!cancelled) {
				const phrase = typePhrases[index % typePhrases.length];

				typedName = '';
				for (let i = 0; i < phrase.length; i++) {
					if (cancelled) return;
					typedName = phrase.slice(0, i + 1);
					await wait(72);
				}

				await wait(1800);

				for (let i = phrase.length; i >= 0; i--) {
					if (cancelled) return;
					typedName = phrase.slice(0, i);
					await wait(38);
				}

				await wait(280);
				index += 1;
			}
		};

		void run();
		return () => {
			cancelled = true;
		};
	});
</script>

<section id="about" class="about relative" aria-label="About">
	<div class="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
		<div class="grid items-start gap-10 lg:grid-cols-[240px_1fr] lg:gap-14 xl:grid-cols-[260px_1fr]">
			<div class="flex flex-col items-center text-center lg:items-center">
				<div
					class="profile-ring profile-glow relative h-[148px] w-[148px] rounded-full sm:h-[172px] sm:w-[172px] md:h-[188px] md:w-[188px]"
				>
					<img
						src="/profile.png"
						alt="Engr. Mr. Usman"
						width="188"
						height="188"
						loading="lazy"
						decoding="async"
						class="profile-img h-full w-full rounded-full border-[3px] object-cover object-[50%_18%]"
					/>
				</div>
				<span class="about-sign mt-5" role="img" aria-label="Usman Farooq signature"></span>
			</div>

			<div class="about-intro">
				<p class="about-kicker">ABOUT ME</p>
				<h2 class="about-title mt-2">
					Hi, I'm
					<span class="typed-wrap">
						<span class="typed-text">{typedName}</span>{#if showCaret}<span class="type-caret">|</span>{/if}
					</span>
				</h2>
				<p class="about-copy mt-2 max-w-2xl">
					A passionate Software Engineer skilled in building modern, scalable, and high-performance web
					applications. I love solving problems with clean code and innovative solutions. I also have
					hands-on expertise and experience in <strong>Cloud Computing</strong> and
					<strong>Networking</strong>.
					<br />
					I am the <strong>Founder &amp; CEO</strong> of
					<strong>Prime Softnox Solutions</strong>, a software company launched in
					<strong>July 2026</strong>.
				</p>

				<div class="details-grid mt-8">
					<div class="details-col">
						{#each detailsLeft as item}
							<div class="detail-item">
								<span class="detail-icon" aria-hidden="true">
									<item.Icon class="h-4 w-4" strokeWidth={1.75} />
								</span>
								<div class="min-w-0">
									<p class="detail-label">{item.label}</p>
									{#if 'href' in item && item.href}
										<a class="detail-value detail-link" href={item.href}>{item.value}</a>
									{:else}
										<p class="detail-value">{item.value}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
					<div class="details-col">
						{#each detailsRight as item}
							<div class="detail-item">
								<span class="detail-icon" aria-hidden="true">
									<item.Icon class="h-4 w-4" strokeWidth={1.75} />
								</span>
								<div class="min-w-0">
									<p class="detail-label">{item.label}</p>
									{#if 'href' in item && item.href}
										<a class="detail-value detail-link" href={item.href}>{item.value}</a>
									{:else}
										<p class="detail-value">{item.value}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="stats-grid mt-12">
			{#each stats as stat}
				<article class="stat-card hover-lift">
					<span class="stat-icon" aria-hidden="true">
						<stat.Icon class="h-5 w-5" strokeWidth={1.75} />
					</span>
					<p class="stat-value">{stat.value}</p>
					<p class="stat-label">{stat.label}</p>
				</article>
			{/each}
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
			<section class="panel-card hover-lift" aria-labelledby="education-heading">
				<header class="panel-head">
					<span class="panel-icon" aria-hidden="true">
						<GraduationCap class="h-4 w-4" strokeWidth={1.75} />
					</span>
					<h3 id="education-heading">EDUCATION</h3>
				</header>
				<ol class="timeline">
					{#each education as item}
						<li class="timeline-item">
							<span class="timeline-dot" aria-hidden="true"></span>
							<p class="timeline-year">{item.year}</p>
							<p class="timeline-title">{item.title}</p>
							<p class="timeline-place">{item.place}</p>
							<p class="timeline-meta">{item.meta}</p>
						</li>
					{/each}
				</ol>
			</section>

			<section class="panel-card hover-lift" aria-labelledby="experience-heading">
				<header class="panel-head">
					<span class="panel-icon" aria-hidden="true">
						<Briefcase class="h-4 w-4" strokeWidth={1.75} />
					</span>
					<h3 id="experience-heading">EXPERIENCE</h3>
				</header>
				<ol class="timeline timeline-compact">
					{#each experience as item}
						<li class="timeline-item">
							<span class="timeline-dot" aria-hidden="true"></span>
							<p class="timeline-year">{item.year}</p>
							<p class="timeline-title">{item.title}</p>
							<p class="timeline-place">{item.place}</p>
							<p class="timeline-meta">{item.meta}</p>
						</li>
					{/each}
				</ol>
			</section>
		</div>

		<section class="panel-card hover-lift mt-10" aria-labelledby="tech-heading">
			<header class="panel-head">
				<span class="panel-icon" aria-hidden="true">
					<Code2 class="h-4 w-4" strokeWidth={1.75} />
				</span>
				<h3 id="tech-heading">TECHNOLOGIES & TOOLS</h3>
			</header>

			{#each techRows as row, rowIndex}
				<ul
					class="tech-grid"
					class:tech-grid-wide={row.length > 6}
					class:tech-grid-follow={rowIndex > 0}
					aria-label={`Technologies row ${rowIndex + 1}`}
				>
					{#each row as tech}
						<li class="tech-item">
							<img
								src={tech.src}
								alt=""
								width="64"
								height="64"
								loading="lazy"
								decoding="async"
								class="tech-icon"
							/>
							<span class="tech-name">{tech.name}</span>
							{#if 'sub' in tech && tech.sub}
								<span class="tech-sub">{tech.sub}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/each}
		</section>
	</div>
</section>

<style>
	.about {
		color: var(--fg);
		background: transparent;
		isolation: isolate;
	}

	.profile-ring {
		box-sizing: content-box;
	}

	.profile-img {
		border-color: var(--profile-border);
	}

	.profile-glow {
		box-shadow:
			0 0 28px color-mix(in srgb, var(--fg) 35%, transparent),
			0 0 56px color-mix(in srgb, var(--fg) 16%, transparent);
	}

	.about-sign {
		display: block;
		width: 9.5rem;
		height: 2.4rem;
		background-color: var(--fg);
		-webkit-mask-image: url('/signature-mask.png');
		mask-image: url('/signature-mask.png');
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
	}

	.about-intro {
		text-align: center;
	}

	.about-copy {
		margin-inline: auto;
	}

	@media (min-width: 1024px) {
		.about-intro {
			text-align: left;
		}

		.about-copy {
			margin-inline: 0;
		}
	}

	.about-kicker {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.22em;
		color: var(--muted);
	}

	.about-title {
		font-size: clamp(1.4rem, 3.2vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		min-height: 1.4em;
		margin-bottom: 0;
	}

	.typed-wrap {
		display: inline;
		white-space: nowrap;
	}

	.typed-text {
		color: var(--fg);
	}

	.type-caret {
		display: inline-block;
		margin-left: 2px;
		color: color-mix(in srgb, var(--fg) 70%, transparent);
		animation: blink 0.9s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.about-copy {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--muted);
		font-weight: 500;
	}

	.about-copy :global(strong) {
		color: var(--fg);
		font-weight: 700;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.1rem 0.75rem;
		text-align: left;
	}

	.details-col {
		display: grid;
		gap: 1.1rem;
	}

	@media (min-width: 640px) {
		.details-grid {
			gap: 1.25rem 2rem;
		}

		.details-col {
			gap: 1.25rem;
		}
	}

	.detail-item {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
	}

	@media (min-width: 640px) {
		.detail-item {
			gap: 0.75rem;
		}
	}

	.detail-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.85rem;
		height: 1.85rem;
		border-radius: 0.55rem;
		border: 1px solid var(--theme-btn-border);
		color: var(--fg);
		flex-shrink: 0;
	}

	@media (min-width: 640px) {
		.detail-icon {
			width: 2rem;
			height: 2rem;
		}
	}

	.detail-label {
		font-size: 0.68rem;
		color: var(--muted);
		font-weight: 500;
	}

	@media (min-width: 640px) {
		.detail-label {
			font-size: 0.72rem;
		}
	}

	.detail-value {
		margin-top: 0.1rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--fg);
		word-break: break-word;
		line-height: 1.35;
	}

	@media (min-width: 640px) {
		.detail-value {
			font-size: 0.92rem;
		}
	}

	.detail-link {
		text-decoration: none;
	}

	.detail-link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.stat-card,
	.panel-card {
		border: 1px solid var(--nav-border);
		border-radius: 1.1rem;
		background: color-mix(in srgb, var(--fg) 2.5%, var(--bg));
		transition:
			transform 0.35s ease,
			border-color 0.35s ease,
			box-shadow 0.35s ease,
			background-color 0.35s ease;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.stats-grid {
			gap: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.stat-card {
		padding: 1rem 0.75rem;
		text-align: center;
	}

	@media (min-width: 640px) {
		.stat-card {
			padding: 1.25rem 1.1rem;
		}
	}

	.panel-card {
		padding: 1.25rem 1.2rem 1.4rem;
		height: 100%;
	}

	.hover-lift:hover {
		transform: translateY(-4px);
		border-color: color-mix(in srgb, var(--fg) 28%, transparent);
		box-shadow: 0 14px 36px color-mix(in srgb, var(--fg) 8%, transparent);
		background: color-mix(in srgb, var(--fg) 4.5%, var(--bg));
	}

	.stat-icon {
		display: inline-flex;
		color: var(--fg);
		margin-bottom: 0.65rem;
	}

	.stat-value {
		font-size: 1.35rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	@media (min-width: 640px) {
		.stat-value {
			font-size: 1.55rem;
		}
	}

	.stat-label {
		margin-top: 0.2rem;
		font-size: 0.72rem;
		color: var(--muted);
		font-weight: 500;
		line-height: 1.3;
	}

	@media (min-width: 640px) {
		.stat-label {
			font-size: 0.82rem;
		}
	}

	.panel-head {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.05rem;
	}

	.panel-head h3 {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
	}

	.panel-icon {
		display: inline-flex;
		color: var(--fg);
	}

	.timeline {
		list-style: none;
		margin: 0;
		padding: 0 0 0 1.2rem;
		border-left: 1px solid color-mix(in srgb, var(--fg) 18%, transparent);
		display: grid;
		gap: 1.15rem;
	}

	.timeline-compact {
		gap: 0.95rem;
	}

	.timeline-item {
		position: relative;
		padding-left: 0.15rem;
	}

	.timeline-dot {
		position: absolute;
		left: calc(-1.2rem - 0.5px);
		top: 0.42em;
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 9999px;
		background: var(--fg);
		box-shadow: 0 0 10px color-mix(in srgb, var(--fg) 65%, transparent);
		transform: translateX(-50%);
	}

	.timeline-year {
		font-size: 0.74rem;
		color: var(--muted);
		font-weight: 500;
	}

	.timeline-title {
		margin-top: 0.15rem;
		font-size: 0.95rem;
		font-weight: 700;
	}

	.timeline-place {
		margin-top: 0.12rem;
		font-size: 0.84rem;
		color: color-mix(in srgb, var(--muted) 85%, var(--fg));
		font-weight: 500;
	}

	.timeline-meta {
		margin-top: 0.2rem;
		font-size: 0.78rem;
		color: var(--muted);
		line-height: 1.45;
	}

	.tech-grid {
		list-style: none;
		margin: 0;
		padding: 0.55rem 0 0.15rem;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.1rem 0.45rem;
		align-items: start;
		justify-items: center;
	}

	.tech-grid-follow {
		margin-top: 0.95rem;
		padding-top: 0.95rem;
		border-top: 1px solid color-mix(in srgb, var(--fg) 8%, transparent);
	}

	@media (min-width: 640px) {
		.tech-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 1.35rem 0.85rem;
		}

		.tech-grid-wide {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}

	.tech-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		text-align: center;
	}

	.tech-icon {
		width: clamp(2.55rem, 11.5vw, 3rem);
		height: clamp(2.55rem, 11.5vw, 3rem);
		object-fit: contain;
		filter: grayscale(1) brightness(1.15) contrast(1.05);
		transition:
			filter 0.3s ease,
			transform 0.3s ease;
	}

	@media (min-width: 640px) {
		.tech-icon {
			width: 3.35rem;
			height: 3.35rem;
		}
	}

	@media (min-width: 1024px) {
		.tech-icon {
			width: 3.85rem;
			height: 3.85rem;
		}
	}

	:global([data-theme='light']) .tech-icon {
		filter: grayscale(1) brightness(0.55) contrast(1.15);
	}

	.tech-item:hover .tech-icon {
		transform: translateY(-3px) scale(1.06);
		filter: grayscale(1) brightness(1.35) contrast(1.08);
	}

	:global([data-theme='light']) .tech-item:hover .tech-icon {
		filter: grayscale(1) brightness(0.35) contrast(1.2);
	}

	.tech-name {
		font-size: 0.62rem;
		font-weight: 600;
		color: var(--muted);
		line-height: 1.2;
		max-width: 4.8rem;
	}

	@media (min-width: 640px) {
		.tech-name {
			font-size: 0.7rem;
			max-width: 5.5rem;
		}
	}

	.tech-sub {
		font-size: 0.55rem;
		color: color-mix(in srgb, var(--muted) 80%, transparent);
		line-height: 1.2;
		max-width: 5.5rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.hover-lift:hover {
			transform: none;
		}

		.type-caret {
			animation: none;
		}
	}
</style>
