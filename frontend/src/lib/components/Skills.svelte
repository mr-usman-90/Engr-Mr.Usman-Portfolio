<script lang="ts">
	import {
		Boxes,
		Cloud,
		Code2,
		Database,
		LayoutGrid,
		Server,
		Wrench
	} from '@lucide/svelte';

	type Category =
		| 'all'
		| 'languages'
		| 'frameworks'
		| 'backend'
		| 'database'
		| 'cloud'
		| 'tools';

	type Skill = {
		id: string;
		name: string;
		src: string;
		description: string;
		level: number;
		category: Exclude<Category, 'all'>;
		side: 'left' | 'right';
		tags?: string[];
		blackOnLight?: boolean;
	};

	const filters: { id: Category; label: string; Icon: typeof LayoutGrid }[] = [
		{ id: 'all', label: 'All', Icon: LayoutGrid },
		{ id: 'languages', label: 'Languages', Icon: Code2 },
		{ id: 'frameworks', label: 'Frameworks', Icon: Boxes },
		{ id: 'backend', label: 'Backend', Icon: Server },
		{ id: 'database', label: 'Database', Icon: Database },
		{ id: 'cloud', label: 'Cloud & DevOps', Icon: Cloud },
		{ id: 'tools', label: 'Tools & Others', Icon: Wrench }
	];

	const skills: Skill[] = [
		{
			id: 'javascript',
			name: 'JavaScript',
			src: '/tech/javascript.png',
			description: 'Dynamic programming language for modern web development.',
			level: 95,
			category: 'languages',
			side: 'left'
		},
		{
			id: 'typescript',
			name: 'TypeScript',
			src: '/tech/typescript.png',
			description: 'Typed superset of JavaScript for scalable applications.',
			level: 90,
			category: 'languages',
			side: 'right'
		},
		{
			id: 'prisma',
			name: 'Prisma',
			src: '/tech/prisma.png',
			description: 'Next-gen ORM for Node.js and TypeScript.',
			level: 85,
			category: 'backend',
			side: 'left'
		},
		{
			id: 'zod',
			name: 'Zod',
			src: '/tech/zod.png',
			description: 'TypeScript-first schema validation with static inference.',
			level: 85,
			category: 'backend',
			side: 'right'
		},
		{
			id: 'fastify',
			name: 'Fastify',
			src: '/tech/fastify.png',
			description: 'Fast and low-overhead web framework for Node.js.',
			level: 90,
			category: 'backend',
			side: 'left',
			blackOnLight: true
		},
		{
			id: 'sveltekit',
			name: 'SvelteKit',
			src: '/tech/sveltekit.png',
			description: 'Powerful framework for building fast web apps.',
			level: 90,
			category: 'frameworks',
			side: 'right'
		},
		{
			id: 'mongodb',
			name: 'MongoDB',
			src: '/tech/mongodb.png',
			description: 'NoSQL database for modern, scalable applications.',
			level: 85,
			category: 'database',
			side: 'left'
		},
		{
			id: 'docker',
			name: 'Docker',
			src: '/tech/docker.png',
			description: 'Containerization platform for consistent deployments.',
			level: 90,
			category: 'cloud',
			side: 'right'
		},
		{
			id: 'supabase',
			name: 'Supabase',
			src: '/tech/supabase.png',
			description: 'Backend as a service with PostgreSQL, Auth & APIs.',
			level: 85,
			category: 'database',
			side: 'left'
		},
		{
			id: 'firebase',
			name: 'Firebase',
			src: '/tech/firebase.png',
			description: "Google's platform for building web and mobile apps.",
			level: 85,
			category: 'database',
			side: 'right'
		},
		{
			id: 'github',
			name: 'GitHub',
			src: '/tech/github.png',
			description: 'Version control and collaboration platform.',
			level: 95,
			category: 'tools',
			side: 'left'
		},
		{
			id: 'aws',
			name: 'AWS',
			src: '/tech/aws.png',
			description: 'Cloud platform for scalable and reliable applications.',
			level: 90,
			category: 'cloud',
			side: 'right',
			tags: ['EC2', 'S3', 'Lambda'],
			blackOnLight: true
		},
		{
			id: 'cloud',
			name: 'Cloud Computing',
			src: '/tech/cloud.svg',
			description: 'Delivering computing services over the internet.',
			level: 85,
			category: 'cloud',
			side: 'left',
			blackOnLight: true
		},
		{
			id: 'networking',
			name: 'Networking',
			src: '/tech/networking.svg',
			description: 'Understanding networks, protocols and infrastructure.',
			level: 80,
			category: 'cloud',
			side: 'right',
			blackOnLight: true
		},
		{
			id: 'tailwind',
			name: 'Tailwind CSS',
			src: '/tech/tailwind.png',
			description: 'Utility-first CSS framework for fast UI development.',
			level: 95,
			category: 'frameworks',
			side: 'left'
		},
		{
			id: 'react',
			name: 'React',
			src: '/tech/react.png',
			description: 'JavaScript library for building user interfaces.',
			level: 90,
			category: 'frameworks',
			side: 'right'
		},
		{
			id: 'nextjs',
			name: 'Next.js',
			src: '/tech/nextjs.svg',
			description: 'React framework for production-ready applications.',
			level: 90,
			category: 'frameworks',
			side: 'left'
		},
		{
			id: 'nodejs',
			name: 'Node.js',
			src: '/tech/node.png',
			description: 'JavaScript runtime for building scalable server-side apps.',
			level: 90,
			category: 'backend',
			side: 'right'
		},
		{
			id: 'express',
			name: 'Express.js',
			src: '/tech/express.png',
			description: 'Minimal and flexible Node.js web framework.',
			level: 90,
			category: 'backend',
			side: 'left'
		},
		{
			id: 'postgresql',
			name: 'PostgreSQL',
			src: '/tech/postgresql.png',
			description: 'Advanced relational database for modern applications.',
			level: 85,
			category: 'database',
			side: 'right'
		}
	];

	let activeFilter = $state<Category>('all');

	const visibleSkills = $derived(
		activeFilter === 'all' ? skills : skills.filter((s) => s.category === activeFilter)
	);

	const rows = $derived.by(() => {
		if (activeFilter === 'all') {
			const left = skills.filter((s) => s.side === 'left');
			const right = skills.filter((s) => s.side === 'right');
			const count = Math.max(left.length, right.length);
			return Array.from({ length: count }, (_, i) => ({
				left: left[i] ?? null,
				right: right[i] ?? null
			}));
		}

		const list = visibleSkills;
		const out: { left: Skill | null; right: Skill | null }[] = [];
		for (let i = 0; i < list.length; i += 2) {
			out.push({ left: list[i] ?? null, right: list[i + 1] ?? null });
		}
		return out;
	});
</script>

<section id="skills" class="skills" aria-label="Skills">
	<div class="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
		<div class="skills-shell">
			<header class="skills-hero">
				<h1 class="skills-title">TECHNOLOGIES I WORK WITH</h1>
			</header>

			<div class="filter-row" role="tablist" aria-label="Skill filters">
				{#each filters as filter}
					<button
						type="button"
						role="tab"
						class="filter-btn"
						class:active={activeFilter === filter.id}
						aria-selected={activeFilter === filter.id}
						onclick={() => (activeFilter = filter.id)}
					>
						<filter.Icon class="h-3.5 w-3.5" strokeWidth={2} />
						{filter.label}
					</button>
				{/each}
			</div>

			<div class="timeline" aria-live="polite">
				{#each rows as row, rowIndex}
					<div class="timeline-row">
						<div class="timeline-side left">
							{#if row.left}
								{@render skillCard(row.left, 'left')}
							{/if}
						</div>

						<div class="timeline-spine" aria-hidden="true">
							<span class="timeline-node" class:glow={rowIndex === 0}></span>
						</div>

						<div class="timeline-side right">
							{#if row.right}
								{@render skillCard(row.right, 'right')}
							{/if}
						</div>
					</div>
				{/each}
			</div>

			{#if rows.length === 0}
				<p class="empty-state">No technologies in this category yet.</p>
			{/if}
		</div>
	</div>
</section>

{#snippet skillCard(skill: Skill, align: 'left' | 'right')}
	<article class="skill-card" class:align-left={align === 'left'} class:align-right={align === 'right'}>
		<span class="skill-dot" aria-hidden="true"></span>
		<div class="skill-main">
			<img
				src={skill.src}
				alt=""
				width="44"
				height="44"
				loading="lazy"
				decoding="async"
				class="skill-icon"
				class:black-on-light={skill.blackOnLight}
			/>
			<div class="skill-copy">
				<h2 class="skill-name">{skill.name}</h2>
				<p class="skill-desc">{skill.description}</p>
			</div>
		</div>
		<div class="skill-meter">
			<div class="meter-track" aria-hidden="true">
				<span class="meter-fill" style={`width:${skill.level}%`}></span>
			</div>
			<span class="meter-value">{skill.level}%</span>
		</div>
		{#if skill.tags?.length}
			<p class="skill-tags">{skill.tags.join(' - ')}</p>
		{/if}
	</article>
{/snippet}

<style>
	.skills {
		color: var(--fg);
		background: transparent;
		isolation: isolate;
		min-height: 100dvh;
	}

	.skills-shell {
		border: 1px solid var(--nav-border);
		border-radius: 1.35rem;
		background: color-mix(in srgb, var(--fg) 2.2%, var(--bg));
		padding: 1.35rem 1rem 1.6rem;
	}

	@media (min-width: 640px) {
		.skills-shell {
			padding: 1.75rem 1.5rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		.skills-shell {
			padding: 2rem 2rem 2.25rem;
		}
	}

	.skills-hero {
		text-align: center;
	}

	.skills-title {
		font-size: clamp(1.05rem, 2.4vw, 1.35rem);
		font-weight: 800;
		letter-spacing: 0.12em;
		line-height: 1.25;
	}

	.filter-row {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.35rem;
		justify-content: flex-start;
		margin-top: 1.35rem;
		overflow-x: auto;
		padding-bottom: 0.35rem;
		scrollbar-width: thin;
		-webkit-overflow-scrolling: touch;
	}

	@media (min-width: 1100px) {
		.filter-row {
			flex-wrap: wrap;
			justify-content: center;
			overflow: visible;
			gap: 0.55rem;
		}
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		flex-shrink: 0;
		border: none;
		background: transparent;
		color: var(--muted);
		font-size: 0.78rem;
		font-weight: 600;
		padding: 0.45rem 0.55rem;
		border-radius: 0.55rem;
		cursor: pointer;
		position: relative;
		transition: color 0.25s ease;
		white-space: nowrap;
	}

	.filter-btn:hover {
		color: var(--fg);
	}

	.filter-btn.active {
		color: var(--fg);
	}

	.filter-btn.active::after {
		content: '';
		position: absolute;
		left: 0.45rem;
		right: 0.45rem;
		bottom: 0.1rem;
		height: 2px;
		border-radius: 999px;
		background: #38bdf8;
		box-shadow: 0 0 12px color-mix(in srgb, #38bdf8 70%, transparent);
	}

	.timeline {
		position: relative;
		margin-top: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.95rem;
	}

	.timeline-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		position: relative;
	}

	@media (min-width: 900px) {
		.timeline-row {
			grid-template-columns: 1fr 1.1rem 1fr;
			gap: 0;
			align-items: stretch;
		}
	}

	.timeline-side {
		min-width: 0;
	}

	.timeline-spine {
		display: none;
	}

	@media (min-width: 900px) {
		.timeline-spine {
			display: flex;
			justify-content: center;
			position: relative;
		}

		.timeline-spine::before {
			content: '';
			position: absolute;
			top: -0.95rem;
			bottom: -0.95rem;
			width: 1px;
			background: color-mix(in srgb, var(--fg) 18%, transparent);
		}

		.timeline-row:first-child .timeline-spine::before {
			top: 50%;
		}

		.timeline-row:last-child .timeline-spine::before {
			bottom: 50%;
		}

		.timeline-node {
			position: relative;
			z-index: 1;
			align-self: center;
			width: 0.7rem;
			height: 0.7rem;
			border-radius: 999px;
			border: 2px solid var(--fg);
			background: var(--bg);
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg) 90%, transparent);
		}

		.timeline-node.glow {
			box-shadow:
				0 0 0 3px color-mix(in srgb, var(--bg) 90%, transparent),
				0 0 16px color-mix(in srgb, var(--fg) 45%, transparent);
		}
	}

	.skill-card {
		position: relative;
		border: 1px solid var(--nav-border);
		border-radius: 0.95rem;
		background: color-mix(in srgb, var(--fg) 3.5%, var(--bg));
		padding: 0.95rem 1rem 0.9rem;
		height: 100%;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease,
			background-color 0.3s ease;
	}

	.skill-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in srgb, var(--fg) 26%, transparent);
		box-shadow: 0 12px 28px color-mix(in srgb, var(--fg) 7%, transparent);
		background: color-mix(in srgb, var(--fg) 5%, var(--bg));
	}

	.skill-dot {
		display: none;
	}

	@media (min-width: 900px) {
		.skill-card.align-left .skill-dot,
		.skill-card.align-right .skill-dot {
			display: block;
			position: absolute;
			top: 50%;
			width: 0.42rem;
			height: 0.42rem;
			border-radius: 999px;
			background: var(--fg);
			transform: translateY(-50%);
		}

		.skill-card.align-left .skill-dot {
			right: -0.55rem;
		}

		.skill-card.align-right .skill-dot {
			left: -0.55rem;
		}

		.timeline-side.left {
			padding-right: 1.15rem;
		}

		.timeline-side.right {
			padding-left: 1.15rem;
		}
	}

	.skill-main {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.skill-icon {
		width: 2.4rem;
		height: 2.4rem;
		object-fit: contain;
		flex-shrink: 0;
		filter: drop-shadow(0 0 8px color-mix(in srgb, var(--fg) 12%, transparent));
	}

	:global([data-theme='light']) .skill-icon.black-on-light {
		filter: brightness(0);
	}

	.skill-copy {
		min-width: 0;
	}

	.skill-name {
		font-size: 0.98rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.2;
	}

	.skill-desc {
		margin-top: 0.28rem;
		font-size: 0.78rem;
		line-height: 1.45;
		color: var(--muted);
		font-weight: 500;
	}

	.skill-meter {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.65rem;
		margin-top: 0.85rem;
	}

	.meter-track {
		height: 3px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--fg) 12%, transparent);
		overflow: hidden;
	}

	.meter-fill {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: color-mix(in srgb, var(--fg) 88%, transparent);
	}

	.meter-value {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--muted);
		min-width: 2.4rem;
		text-align: right;
	}

	.skill-tags {
		margin-top: 0.55rem;
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	.empty-state {
		text-align: center;
		margin-top: 2rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.skill-card:hover {
			transform: none;
		}
	}
</style>
