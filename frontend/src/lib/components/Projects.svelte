<script lang="ts">
	import {
		ArrowUpRight,
		Briefcase,
		Code2,
		Ellipsis,
		ExternalLink,
		Globe,
		LayoutGrid,
		Monitor,
		Rocket,
		Users
	} from '@lucide/svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import SkeletonImage from '$lib/components/SkeletonImage.svelte';
	import ProjectModal from '$lib/components/ProjectModal.svelte';

	const stats = [
		{ Icon: Rocket, value: '20+', label: 'Projects Completed' },
		{ Icon: Briefcase, value: '3+', label: 'Years Experience' },
		{ Icon: Code2, value: '10+', label: 'Technologies Mastered' },
		{ Icon: Users, value: '15+', label: 'Happy Clients' }
	] as const;

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
		images: string[];
		liveUrl: string;
		codeUrl: string;
	};

	const galleryPool = [
		'/projects/school.jpg',
		'/projects/pos.jpg',
		'/projects/ecommerce.jpg',
		'/projects/inventory.jpg',
		'/projects/portfolio.jpg',
		'/projects/tasks.jpg',
		'/projects/school.jpg',
		'/projects/ecommerce.jpg',
		'/projects/pos.jpg',
		'/projects/inventory.jpg'
	] as const;

	function withGallery(cover: string): string[] {
		const rest = galleryPool.filter((src) => src !== cover);
		const mixed = [cover, ...rest, ...galleryPool];
		return mixed.slice(0, 10);
	}

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
			images: withGallery('/projects/school.jpg'),
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
			images: withGallery('/projects/pos.jpg'),
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
			images: withGallery('/projects/ecommerce.jpg'),
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
			images: withGallery('/projects/inventory.jpg'),
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
			images: withGallery('/projects/portfolio.jpg'),
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
			images: withGallery('/projects/tasks.jpg'),
			liveUrl: '#',
			codeUrl: 'https://github.com/engr-mr-usman'
		}
	];

	let activeFilter = $state<Filter>('all');
	let selected = $state<Project | null>(null);

	const visibleProjects = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	function openProject(project: Project) {
		selected = project;
	}
</script>

<section id="projects" class="projects" aria-label="Projects">
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

		<div class="stats-grid">
			{#each stats as stat}
				<article class="stat-card">
					<span class="stat-icon" aria-hidden="true">
						<stat.Icon class="h-5 w-5" strokeWidth={1.75} />
					</span>
					<p class="stat-value">{stat.value}</p>
					<p class="stat-label">{stat.label}</p>
				</article>
			{/each}
		</div>

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
				<div
					class="project-card"
					style={`--theme:${project.theme}`}
					role="button"
					tabindex="0"
					aria-label={`Open ${project.title} details`}
					onclick={() => openProject(project)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openProject(project);
						}
					}}
				>
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
							<span class="card-link">
								Live Demo
								<ExternalLink class="h-3.5 w-3.5" strokeWidth={2} />
							</span>
							<span class="card-link">
								View Code
								<GithubIcon class="h-3.5 w-3.5" />
							</span>
						</div>
					</div>
				</div>
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

{#if selected}
	<ProjectModal project={selected} onClose={() => (selected = null)} />
{/if}

<style>
	.projects {
		color: var(--fg);
		background: transparent;
		isolation: isolate;
		min-height: 100dvh;
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

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		margin-top: 1.75rem;
		max-width: 56rem;
		margin-inline: auto;
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
		border: 1px solid var(--nav-border);
		border-radius: 1.1rem;
		background: color-mix(in srgb, var(--fg) 2.5%, var(--bg));
		padding: 1rem 0.75rem;
		text-align: center;
		transition:
			transform 0.35s ease,
			border-color 0.35s ease,
			box-shadow 0.35s ease,
			background-color 0.35s ease;
	}

	@media (min-width: 640px) {
		.stat-card {
			padding: 1.25rem 1.1rem;
		}
	}

	.stat-card:hover {
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
		cursor: pointer;
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease,
			border-color 0.35s ease;
	}

	.project-card:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--theme) 70%, transparent);
		outline-offset: 3px;
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
		.cta-btn,
		.stat-card {
			transition: none;
		}

		.project-card:hover,
		.stat-card:hover {
			transform: none;
		}
	}
</style>
