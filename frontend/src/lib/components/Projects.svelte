<script lang="ts">
	import {
		ArrowUpRight,
		Code2,
		Ellipsis,
		ExternalLink,
		Globe,
		LayoutGrid,
		Monitor,
		Rocket
	} from '@lucide/svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import SkeletonImage from '$lib/components/SkeletonImage.svelte';

	type Category = 'web' | 'desktop' | 'fullstack' | 'other';
	type Filter = 'all' | Category;

	type Project = {
		id: string;
		title: string;
		description: string;
		category: Category;
		categoryLabel: string;
		tech: string[];
		theme: string;
		image: string;
		liveUrl: string;
		codeUrl: string;
	};

	const filters: { id: Filter; label: string; Icon: typeof LayoutGrid }[] = [
		{ id: 'all', label: 'All Projects', Icon: LayoutGrid },
		{ id: 'web', label: 'Web Applications', Icon: Globe },
		{ id: 'desktop', label: 'Desktop Applications', Icon: Monitor },
		{ id: 'fullstack', label: 'Full Stack', Icon: Code2 },
		{ id: 'other', label: 'Other', Icon: Ellipsis }
	];

	const projects: Project[] = [
		{
			id: 'school',
			title: 'School Management System',
			description:
				'Complete school management with student records, attendance tracking, and grades in one place.',
			category: 'fullstack',
			categoryLabel: 'Full Stack',
			tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
			theme: '#a855f7',
			image: '/projects/school.jpg',
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		},
		{
			id: 'pos',
			title: 'POS System for Retail Store',
			description:
				'Retail POS with inventory control, live sales tracking, and a clear analytics dashboard.',
			category: 'fullstack',
			categoryLabel: 'Full Stack',
			tech: ['React', 'Express.js', 'MongoDB', 'Socket.io'],
			theme: '#10b981',
			image: '/projects/pos.jpg',
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		},
		{
			id: 'ecommerce',
			title: 'E-Commerce Website',
			description:
				'Modern storefront with product catalog, shopping cart, and secure Stripe checkout.',
			category: 'web',
			categoryLabel: 'Web Application',
			tech: ['Next.js', 'Tailwind', 'Stripe', 'MongoDB'],
			theme: '#3b82f6',
			image: '/projects/ecommerce.jpg',
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		},
		{
			id: 'inventory',
			title: 'Inventory Management App',
			description:
				'Desktop inventory app for stock levels, product tracking, and printable reports.',
			category: 'desktop',
			categoryLabel: 'Desktop Application',
			tech: ['Electron', 'SQLite', 'JavaScript'],
			theme: '#f59e0b',
			image: '/projects/inventory.jpg',
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		},
		{
			id: 'portfolio',
			title: 'Personal Portfolio Website',
			description:
				'Responsive portfolio to showcase work and skills, polished with modern motion.',
			category: 'web',
			categoryLabel: 'Web Application',
			tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
			theme: '#8b5cf6',
			image: '/projects/portfolio.jpg',
			liveUrl: '/',
			codeUrl: 'https://github.com/engr-mr-usman'
		},
		{
			id: 'tasks',
			title: 'Task Management App',
			description:
				'Collaborative task board with real-time sync, drag-and-drop, and team workflows.',
			category: 'web',
			categoryLabel: 'Web Application',
			tech: ['React', 'Firebase', 'Tailwind', 'Framer Motion'],
			theme: '#06b6d4',
			image: '/projects/tasks.jpg',
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		}
	];

	let activeFilter = $state<Filter>('all');

	const visibleProjects = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);
</script>

<section id="projects" class="projects" aria-label="Projects">
	<div class="projects-grid-bg" aria-hidden="true"></div>

	<div class="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
		<header class="projects-hero">
			<p class="projects-kicker">MY WORK</p>
			<h1 class="projects-title">My Projects</h1>
			<span class="projects-dot" aria-hidden="true"></span>
			<p class="projects-lead">
				Here are some of my selected projects. Each project is built with passion, modern
				technologies and clean code.
			</p>
		</header>

		<div class="filter-row" role="tablist" aria-label="Project filters">
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

		<div class="cards-grid">
			{#each visibleProjects as project (project.id)}
				<article class="project-card" style={`--theme:${project.theme}`}>
					<div class="preview">
						<SkeletonImage src={project.image} />
					</div>

					<div class="card-body">
						<p class="card-category">
							<span class="card-dot" aria-hidden="true"></span>
							{project.categoryLabel}
						</p>
						<h2 class="card-title">{project.title}</h2>
						<p class="card-desc">{project.description}</p>

						<ul class="tech-tags">
							{#each project.tech as tag}
								<li>{tag}</li>
							{/each}
						</ul>

						<div class="card-footer">
							<a
								class="card-link"
								href={project.liveUrl}
								target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
								rel="noreferrer"
							>
								Live Demo
								<ExternalLink class="h-3.5 w-3.5" strokeWidth={2} />
							</a>
							<a class="card-link" href={project.codeUrl} target="_blank" rel="noreferrer">
								View Code
								<GithubIcon class="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if visibleProjects.length === 0}
			<p class="empty-state">No projects in this category yet.</p>
		{/if}

		<div class="cta-bar">
			<div class="cta-left">
				<span class="cta-icon" aria-hidden="true">
					<Rocket class="h-5 w-5" strokeWidth={1.75} />
				</span>
				<p class="cta-text">
					<strong>Have a project in mind?</strong>
					<span>Let's build something amazing together.</span>
				</p>
			</div>
			<a class="cta-btn" href="mailto:engr.mr.usman@gmail.com">
				Let's Talk
				<ArrowUpRight class="h-4 w-4" strokeWidth={2} />
			</a>
		</div>
	</div>
</section>

<style>
	.projects {
		color: var(--fg);
		background: transparent;
		isolation: isolate;
		min-height: 100dvh;
	}

	.projects-grid-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		background-image:
			linear-gradient(var(--grid-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
		background-size: 56px 56px;
		opacity: 0.9;
		mask-image: radial-gradient(ellipse at center, black 38%, transparent 88%);
	}

	.projects-hero {
		text-align: center;
		max-width: 38rem;
		margin-inline: auto;
	}

	.projects-kicker {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.22em;
		color: var(--muted);
	}

	.projects-title {
		margin-top: 0.55rem;
		font-size: clamp(1.85rem, 4.5vw, 2.65rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.projects-dot {
		display: block;
		width: 0.45rem;
		height: 0.45rem;
		margin: 0.85rem auto 0;
		border-radius: 999px;
		background: var(--fg);
		box-shadow: 0 0 14px color-mix(in srgb, var(--fg) 55%, transparent);
	}

	.projects-lead {
		margin-top: 0.95rem;
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--muted);
		font-weight: 500;
	}

	.filter-row {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.55rem;
		justify-content: flex-start;
		margin-top: 2rem;
		overflow-x: auto;
		padding-bottom: 0.35rem;
		scrollbar-width: thin;
		-webkit-overflow-scrolling: touch;
	}

	@media (min-width: 900px) {
		.filter-row {
			flex-wrap: wrap;
			justify-content: center;
			overflow: visible;
		}
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		flex-shrink: 0;
		padding: 0.55rem 0.95rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		background: color-mix(in srgb, var(--fg) 3%, var(--bg));
		color: var(--fg);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease,
			color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.filter-btn:hover {
		border-color: color-mix(in srgb, var(--fg) 28%, transparent);
		background: color-mix(in srgb, var(--fg) 6%, var(--bg));
	}

	.filter-btn.active {
		background: #fff;
		color: #0a0a0a;
		border-color: #fff;
		box-shadow: 0 0 22px color-mix(in srgb, #fff 35%, transparent);
	}

	:global([data-theme='light']) .filter-btn.active {
		background: #0a0a0a;
		color: #fff;
		border-color: #0a0a0a;
		box-shadow: 0 0 18px color-mix(in srgb, #0a0a0a 18%, transparent);
	}

	.cards-grid {
		margin-top: 1.75rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.15rem;
	}

	@media (min-width: 700px) {
		.cards-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.cards-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.35rem;
		}
	}

	.project-card {
		display: flex;
		flex-direction: column;
		border-radius: 1.15rem;
		border: 1px solid color-mix(in srgb, var(--theme) 55%, transparent);
		background: color-mix(in srgb, var(--fg) 2.5%, var(--bg));
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 18%, transparent),
			0 0 28px color-mix(in srgb, var(--theme) 22%, transparent);
		overflow: hidden;
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease,
			border-color 0.35s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 35%, transparent),
			0 0 36px color-mix(in srgb, var(--theme) 32%, transparent);
	}

	.preview {
		position: relative;
		margin: 0.85rem 0.85rem 0;
		aspect-ratio: 16 / 10;
		border-radius: 0.85rem;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent);
		background: color-mix(in srgb, var(--theme) 12%, #0b0b0e);
	}

	.preview :global(.img-real) {
		transition:
			opacity 0.35s ease,
			transform 0.45s ease;
	}

	.project-card:hover .preview :global(.img-real.is-ready) {
		transform: scale(1.04);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem 1.05rem 1.05rem;
	}

	.card-category {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
		color: var(--muted);
		font-weight: 500;
	}

	.card-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--theme);
		box-shadow: 0 0 10px color-mix(in srgb, var(--theme) 70%, transparent);
	}

	.card-title {
		margin-top: 0.45rem;
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.25;
	}

	.card-desc {
		margin-top: 0.45rem;
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--muted);
		font-weight: 500;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		overflow: hidden;
		min-height: calc(1.55em * 3);
	}

	.tech-tags {
		list-style: none;
		margin: 0.85rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tech-tags li {
		padding: 0.28rem 0.55rem;
		border-radius: 0.4rem;
		border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent);
		background: color-mix(in srgb, var(--fg) 5%, transparent);
		font-size: 0.68rem;
		font-weight: 600;
		color: color-mix(in srgb, var(--muted) 70%, var(--fg));
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: auto;
		padding-top: 1rem;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--fg);
		text-decoration: none;
		opacity: 0.88;
		transition: opacity 0.2s ease, color 0.2s ease;
	}

	.card-link:hover {
		opacity: 1;
		color: var(--theme);
	}

	.empty-state {
		margin-top: 2rem;
		text-align: center;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.cta-bar {
		margin-top: 2.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: stretch;
		padding: 1.15rem 1.2rem;
		border-radius: 1.1rem;
		border: 1px solid var(--nav-border);
		background: color-mix(in srgb, var(--fg) 3%, var(--bg));
	}

	@media (min-width: 760px) {
		.cta-bar {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 1.15rem 1.4rem;
		}
	}

	.cta-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.cta-icon {
		display: inline-flex;
		color: var(--fg);
		flex-shrink: 0;
	}

	.cta-text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		font-size: 0.92rem;
		line-height: 1.4;
	}

	.cta-text strong {
		font-weight: 700;
		color: var(--fg);
	}

	.cta-text span {
		color: var(--muted);
		font-weight: 500;
		font-size: 0.86rem;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		align-self: stretch;
		padding: 0.7rem 1.15rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--fg) 55%, transparent);
		color: var(--fg);
		text-decoration: none;
		font-size: 0.86rem;
		font-weight: 600;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease;
	}

	@media (min-width: 760px) {
		.cta-btn {
			align-self: auto;
		}
	}

	.cta-btn:hover {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
		border-color: var(--fg);
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card,
		.filter-btn,
		.card-link,
		.cta-btn {
			transition: none;
		}

		.project-card:hover {
			transform: none;
		}
	}
</style>
