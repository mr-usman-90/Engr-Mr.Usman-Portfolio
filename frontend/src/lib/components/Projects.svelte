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
		Users,
	} from "@lucide/svelte";
	import GithubIcon from "$lib/components/icons/GithubIcon.svelte";
	import SkeletonImage from "$lib/components/SkeletonImage.svelte";
	import ProjectModal from "$lib/components/ProjectModal.svelte";

	const stats = [
		{ Icon: Rocket, value: "12+", label: "Projects Completed" },
		{ Icon: Briefcase, value: "3+", label: "Years Experience" },
		{ Icon: Code2, value: "10+", label: "Technologies Mastered" },
		{ Icon: Users, value: "15+", label: "Happy Clients" },
	] as const;

	type Category = "web" | "www" | "fullstack" | "other";
	type Filter = "all" | Category;

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

	const filters: { id: Filter; label: string; Icon: typeof LayoutGrid }[] = [
		{ id: "all", label: "All Projects", Icon: LayoutGrid },
		{ id: "web", label: "Web Applications", Icon: Globe },
		{ id: "www", label: "World Wide Web", Icon: Monitor },
		{ id: "fullstack", label: "Full Stack", Icon: Code2 },
		{ id: "other", label: "Other", Icon: Ellipsis },
	];

	const projects: Project[] = [
		{
			id: "prime-softnox",
			title: "Smarter Software - Better Tomorrow",
			description:
				"Prime Softnox Solutions is a registered software company delivering modern SaaS, POS, ERP, and Custom Software solutions using the latest technologies. We provide flexible, scalable, user-friendly, and fully maintained software to help businesses",
			category: "www",
			categoryLabel: "World Wide Web",
			tech: ["HTML5", "CSS3", "JavaScript", "Tailwind", "GSAP"],
			theme: "#f59e0b",
			image: "/projects/P.S.N.S/01-p.s.n.s.webp",
			images: [
				"/projects/P.S.N.S/01-p.s.n.s.webp",
				"/projects/P.S.N.S/02-p.s.n.s.webp",
				"/projects/P.S.N.S/03-p.s.n.s.webp",
				"/projects/P.S.N.S/04-p.s.n.s.webp",
				"/projects/P.S.N.S/05-p.s.n.s.webp",
				"/projects/P.S.N.S/06-p.s.n.s.webp",
				"/projects/P.S.N.S/07-p.s.n.s.webp",
				"/projects/P.S.N.S/08-p.s.n.s.webp",
				"/projects/P.S.N.S/09-p.s.n.s.webp",
				"/projects/P.S.N.S/10-p.s.n.s.webp",
			],
			liveUrl: "https://primesoftnoxsolutions-2.vercel.app/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "school",
			title: "School Management System",
			description:
				"Complete school management with student records, attendance tracking, and grades in one place.",
			category: "fullstack",
			categoryLabel: "Full Stack",
			tech: ["React", "Node.js", "MongoDB", "Tailwind"],
			theme: "#a855f7",
			image: "/projects/School/01-school.webp",
			images: [
				"/projects/School/01-school.webp",
				"/projects/School/02-school.webp",
				"/projects/School/03-school.webp",
				"/projects/School/04-school.webp",
				"/projects/School/05-school.webp",
				"/projects/School/06-school.webp",
				"/projects/School/07-school.webp",
				"/projects/School/08-school.webp",
				"/projects/School/09-school.webp",
				"/projects/School/10-school.webp",
			],
			liveUrl: "https://school-management-system-live-demo.vercel.app/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "blog",
			title: "Blog Website",
			description:
				"Clean blog platform for publishing articles, browsing categories, and reading posts with a smooth modern UI.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["HTML5", "CSS3", "JavaScript", "Tailwind"],
			theme: "#10b981",
			image: "/projects/Blog/01-Blog.webp",
			images: [
				"/projects/Blog/01-Blog.webp",
				"/projects/Blog/02-Blog.webp",
				"/projects/Blog/03-Blog.webp",
				"/projects/Blog/04-Blog.webp",
				"/projects/Blog/05-Blog.webp",
				"/projects/Blog/06-Blog.webp",
				"/projects/Blog/07-Blog.webp",
				"/projects/Blog/08-Blog.webp",
				"/projects/Blog/09-Blog.webp",
				"/projects/Blog/10-Blog.webp",
			],
			liveUrl: "https://blog-website-alpha-inky.vercel.app/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "portfolio",
			title: "Personal Portfolio Website",
			description:
				"Responsive portfolio to showcase work and skills, polished with modern motion.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["HTML", "CSS", "JavaScript", "GSAP"],
			theme: "#8b5cf6",
			image: "/projects/Portfolio-website/01-PFW.webp",
			images: [
				"/projects/Portfolio-website/01-PFW.webp",
				"/projects/Portfolio-website/02-PFW.webp",
				"/projects/Portfolio-website/03-PFW.webp",
				"/projects/Portfolio-website/04-PFW.webp",
				"/projects/Portfolio-website/05-PFW.webp",
				"/projects/Portfolio-website/06-PFW.webp",
				"/projects/Portfolio-website/07-PFW.webp",
				"/projects/Portfolio-website/08-PFW.webp",
				"/projects/Portfolio-website/09-PFW.webp",
				"/projects/Portfolio-website/10-PFW.webp",
			],
			liveUrl: "https://mr-usman-90.github.io/GFX-Mr.Usman-Portfolio/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "inventory-management",
			title: "Inventory Management App",
			description:
				"Full stack inventory system for stock tracking, product records, and live reports in one dashboard.",
			category: "fullstack",
			categoryLabel: "Full Stack",
			tech: ["Next.js", "Tailwind", "Stripe", "MongoDB"],
			theme: "#3b82f6",
			image: "/projects/Bricks-Manufcturing/01-BM.webp",
			images: [
				"/projects/Bricks-Manufcturing/01-BM.webp",
				"/projects/Bricks-Manufcturing/02-BM.webp",
				"/projects/Bricks-Manufcturing/03-BM.webp",
				"/projects/Bricks-Manufcturing/04-BM.webp",
				"/projects/Bricks-Manufcturing/05-BM.webp",
				"/projects/Bricks-Manufcturing/06-BM.webp",
				"/projects/Bricks-Manufcturing/07-BM.webp",
				"/projects/Bricks-Manufcturing/08-BM.webp",
				"/projects/Bricks-Manufcturing/09-BM.webp",
				"/projects/Bricks-Manufcturing/10-BM.webp",
			],
			liveUrl: "#",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "tasks",
			title: "Social Media Website",
			description:
				"A modern social media platform featuring real-time messaging, interactive feeds, user profiles, secure authentication, and seamless collaboration.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["HTML5", "CSS3", "JavaScript", "Tailwind"],
			theme: "#06b6d4",
			image: "/projects/Social-Media-Website/01-SM.webp",
			images: [
				"/projects/Social-Media-Website/01-SM.webp",
				"/projects/Social-Media-Website/02-SM.webp",
				"/projects/Social-Media-Website/03-SM.webp",
				"/projects/Social-Media-Website/04-SM.webp",
				"/projects/Social-Media-Website/05-SM.webp",
				"/projects/Social-Media-Website/06-SM.webp",
				"/projects/Social-Media-Website/07-SM.webp",
				"/projects/Social-Media-Website/08-SM.webp",
				"/projects/Social-Media-Website/09-SM.webp",
				"/projects/Social-Media-Website/10-SM.webp",
			],
			liveUrl: "https://mr-usman-90.github.io/Social-Media-Website/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "proedu-lms",
			title: "ProEdu LMS",
			description:
				"A modern learning management system for managing courses, students, assignments, and educational workflows in one place.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["React", "Node.js", "MongoDB", "Tailwind"],
			theme: "#fb7185",
			image: "/projects/LMS-Website/01-LMS.webp",
			images: [
				"/projects/LMS-Website/01-LMS.webp",
				"/projects/LMS-Website/02-LMS.webp",
				"/projects/LMS-Website/04-LMS.webp",
				"/projects/LMS-Website/05-LMS.webp",
				"/projects/LMS-Website/06-LMS.webp",
				"/projects/LMS-Website/07-LMS.webp",
				"/projects/LMS-Website/08-LMS.webp",
				"/projects/LMS-Website/09-LMS.webp",
				"/projects/LMS-Website/10-LMS.webp",
				"/projects/LMS-Website/01-LMS.webp",
			],
			liveUrl: "https://mr-usman-90.github.io/LMS-Website/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "thumbnail-go",
			title: "Thumbnail Go",
			description:
				"Describe your idea and let our AI generate a stunning, click-worthy thumbnail in seconds.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["HTML5", "CSS3", "JavaScript", "Tailwind"],
			theme: "#14b8a6",
			image: "/projects/Thumbnailgo/01-TNG.webp",
			images: [
				"/projects/Thumbnailgo/02-TNG.webp",
				"/projects/Thumbnailgo/03-TNG.webp",
				"/projects/Thumbnailgo/04-TNG.webp",
				"/projects/Thumbnailgo/05-TNG.webp",
				"/projects/Thumbnailgo/06-TNG.webp",
				"/projects/Thumbnailgo/07-TNG.webp",
				"/projects/Thumbnailgo/08-TNG.webp",
				"/projects/Thumbnailgo/09-TNG.webp",
				"/projects/Thumbnailgo/10-TNG.webp",
				"/projects/Thumbnailgo/01-TNG.webp",
			],
			liveUrl: "https://thumbnailgo.com/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "guardians-of-the-galaxy",
			title: "Guardians of the Galaxy",
			description:
				"An immersive movie booking experience to explore showtimes, reserve seats, and dive into the cosmic world of Guardians of the Galaxy.",
			category: "web",
			categoryLabel: "Web Application",
			tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
			theme: "#f97316",
			image: "/projects/QuickShow/01-QS.webp",
			images: [
				"/projects/QuickShow/01-QS.webp",
				"/projects/QuickShow/03-QS.webp",
				"/projects/QuickShow/04-QS.webp",
				"/projects/QuickShow/05-QS.webp",
				"/projects/QuickShow/06-QS.webp",
				"/projects/QuickShow/07-QS.webp",
				"/projects/QuickShow/08-QS.webp",
				"/projects/QuickShow/09-QS.webp",
				"/projects/QuickShow/10-QS.webp",
				"/projects/QuickShow/01-QS.webp",
			],
			liveUrl: "https://quickshow.vercel.app/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "ugc-ai",
			title: "Create viral UGC in seconds",
			description:
				"Upload product images and a model photo our AI instantly produces professional lifestyle imagery and short-form videos optimized for commercials & Reels.",
			category: "fullstack",
			categoryLabel: "Full Stack",
			tech: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
			theme: "#22c55e",
			image: "/projects/UGC-Ai/01-UGC.webp",
			images: [
				"/projects/UGC-Ai/01-UGC.webp",
				"/projects/UGC-Ai/02-UGC.webp",
				"/projects/UGC-Ai/03-UGC.webp",
				"/projects/UGC-Ai/04-UGC.webp",
				"/projects/UGC-Ai/05-UGC.webp",
				"/projects/UGC-Ai/06-UGC.webp",
				"/projects/UGC-Ai/03-UGC.webp",
				"/projects/UGC-Ai/04-UGC.webp",
				"/projects/UGC-Ai/05-UGC.webp",
				"/projects/UGC-Ai/06-UGC.webp",
			],
			liveUrl: "https://www.makeugcad.com/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "quickdine-restaurant",
			title: "Quickdine Restaurant",
			description:
				"EXQUISITE DINING EXPERIENCES Curation for the Discerning Palette.",
			category: "fullstack",
			categoryLabel: "Full Stack",
			tech: ["React", "Express.js", "MongoDB", "Socket.io"],
			theme: "#6366f1",
			image: "/projects/QuickDine-Restaurant/01-QDR.webp",
			images: [
				"/projects/QuickDine-Restaurant/01-QDR.webp",
				"/projects/QuickDine-Restaurant/02-QDR.webp",
				"/projects/QuickDine-Restaurant/03-QDR.webp",
				"/projects/QuickDine-Restaurant/04-QDR.webp",
				"/projects/QuickDine-Restaurant/05-QDR.webp",
				"/projects/QuickDine-Restaurant/06-QDR.webp",
				"/projects/QuickDine-Restaurant/07-QDR.webp",
				"/projects/QuickDine-Restaurant/08-QDR.webp",
				"/projects/QuickDine-Restaurant/09-QDR.webp",
				"/projects/QuickDine-Restaurant/10-QDR.webp",
			],
			liveUrl: "https://quickdine-gs.vercel.app/",
			codeUrl: "https://github.com/engr-mr-usman",
		},
		{
			id: "workflow-planner",
			title: "Workflow Planner App",
			description:
				"Fast web application for organizing work, prioritizing tasks, and keeping team progress visible.",
			category: "www",
			categoryLabel: "World Wide Web",
			tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
			theme: "#0ea5e9",
			image: "/projects/TMA/00.webp",
			images: [
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
				"/projects/TMA/00.webp",
			],
			liveUrl: "#",
			codeUrl: "https://github.com/engr-mr-usman",
		},
	];

	let activeFilter = $state<Filter>("all");
	let selected = $state<Project | null>(null);

	const visibleProjects = $derived(
		activeFilter === "all"
			? projects
			: projects.filter((p) => p.category === activeFilter),
	);

	function openProject(project: Project) {
		selected = project;
	}
</script>

<section id="projects" class="projects" aria-label="Projects">
	<div
		class="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32"
	>
		<header class="projects-hero">
			<p class="projects-kicker">MY WORK</p>
			<h1 class="projects-title">My Projects</h1>
			<span class="projects-dot" aria-hidden="true"></span>
			<p class="projects-lead">
				Here are some of my selected projects. Each project is built
				with passion, modern technologies and clean code.
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
						if (e.key === "Enter" || e.key === " ") {
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
								<ExternalLink
									class="h-3.5 w-3.5"
									strokeWidth={2}
								/>
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

	:global(html[data-theme="light"]) .projects {
		isolation: auto;
		background:
			radial-gradient(
				ellipse 85% 55% at 12% 8%,
				color-mix(in srgb, #93c5fd 32%, transparent),
				transparent 58%
			),
			radial-gradient(
				ellipse 70% 50% at 88% 18%,
				color-mix(in srgb, #99f6e4 26%, transparent),
				transparent 55%
			),
			radial-gradient(
				ellipse 75% 45% at 50% 92%,
				color-mix(in srgb, #cbd5e1 35%, transparent),
				transparent 60%
			);
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

	:global(html[data-theme="light"]) .stat-card {
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.42);
		backdrop-filter: blur(22px) saturate(1.45);
		-webkit-backdrop-filter: blur(22px) saturate(1.45);
		box-shadow:
			0 8px 28px rgba(15, 23, 42, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.55);
	}

	:global(html[data-theme="light"]) .stat-card:hover {
		background: rgba(255, 255, 255, 0.28);
		border-color: rgba(255, 255, 255, 0.58);
		box-shadow:
			0 14px 36px rgba(15, 23, 42, 0.06),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
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

	:global(html[data-theme="light"]) .filter-btn {
		background: rgba(255, 255, 255, 0.18);
		border: 1px solid rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(18px) saturate(1.4);
		-webkit-backdrop-filter: blur(18px) saturate(1.4);
		box-shadow:
			0 4px 16px rgba(15, 23, 42, 0.03),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	:global(html[data-theme="light"]) .filter-btn:hover {
		background: rgba(255, 255, 255, 0.32);
		border-color: rgba(255, 255, 255, 0.55);
	}

	:global(html[data-theme="light"]) .filter-btn.active {
		background: rgba(10, 10, 10, 0.72);
		color: #fff;
		border-color: rgba(10, 10, 10, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		box-shadow: 0 0 18px color-mix(in srgb, #0a0a0a 14%, transparent);
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

	:global(html[data-theme="light"]) .project-card {
		background: rgba(255, 255, 255, 0.14);
		border: 1px solid rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(24px) saturate(1.5);
		-webkit-backdrop-filter: blur(24px) saturate(1.5);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 14%, transparent),
			0 12px 40px rgba(15, 23, 42, 0.04),
			0 0 24px color-mix(in srgb, var(--theme) 10%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.55);
	}

	:global(html[data-theme="light"]) .project-card:hover {
		background: rgba(255, 255, 255, 0.26);
		border-color: rgba(255, 255, 255, 0.58);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 26%, transparent),
			0 18px 48px rgba(15, 23, 42, 0.07),
			0 0 32px color-mix(in srgb, var(--theme) 14%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	:global(html[data-theme="light"]) .preview {
		border-color: rgba(255, 255, 255, 0.35);
		background: color-mix(in srgb, var(--theme) 6%, rgba(255, 255, 255, 0.28));
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
	}

	:global(html[data-theme="light"]) .tech-tags li {
		background: rgba(255, 255, 255, 0.18);
		border: 1px solid rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		color: color-mix(in srgb, var(--muted) 55%, var(--fg));
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
		transition:
			opacity 0.2s ease,
			color 0.2s ease;
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

	:global(html[data-theme="light"]) .cta-bar {
		background: rgba(255, 255, 255, 0.16);
		border: 1px solid rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(22px) saturate(1.45);
		-webkit-backdrop-filter: blur(22px) saturate(1.45);
		box-shadow:
			0 10px 36px rgba(15, 23, 42, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.55);
	}

	:global(html[data-theme="light"]) .cta-btn {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.45);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	:global(html[data-theme="light"]) .cta-btn:hover {
		background: rgba(255, 255, 255, 0.34);
		border-color: color-mix(in srgb, var(--fg) 28%, transparent);
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
