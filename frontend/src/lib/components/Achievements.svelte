<script lang="ts">
	import {
		Award,
		BarChart3,
		CalendarDays,
		Cloud,
		Code2,
		Ellipsis,
		ExternalLink,
		Eye,
		GraduationCap,
		LayoutGrid,
		Network,
		TrendingUp,
		Trophy,
		X
	} from '@lucide/svelte';
	import SkeletonImage from '$lib/components/SkeletonImage.svelte';

	type Category = 'web' | 'cloud' | 'networking' | 'marketing' | 'other';
	type Filter = 'all' | Category;

	type Certificate = {
		id: string;
		title: string;
		provider: string;
		category: Category;
		categoryLabel: string;
		description: string;
		date: string;
		tags: string[];
		accent: string;
		image: string;
		verifyUrl: string;
	};

	const filters: { id: Filter; label: string; Icon: typeof LayoutGrid }[] = [
		{ id: 'all', label: 'All Certificates', Icon: LayoutGrid },
		{ id: 'web', label: 'Web Development', Icon: Code2 },
		{ id: 'cloud', label: 'Cloud & DevOps', Icon: Cloud },
		{ id: 'networking', label: 'Networking', Icon: Network },
		{ id: 'marketing', label: 'SEO & Marketing', Icon: BarChart3 },
		{ id: 'other', label: 'Other', Icon: Ellipsis }
	];

	const certificates: Certificate[] = [
		{
			id: 'seo',
			title: 'SEO (Search Engine Optimization)',
			provider: 'DigiSkills.pk Training Program',
			category: 'marketing',
			categoryLabel: 'SEO & Marketing',
			description:
				'Completed comprehensive training on Search Engine Optimization including on-page SEO, off-page SEO, keyword research, and analytics.',
			date: 'Dec 17, 2026',
			tags: ['DigiSkills.pk', 'ID: XQP2YJGMK'],
			accent: '#a3e635',
			image: '/Certificates/01-seo.webp',
			verifyUrl: 'https://digiskills.pk/verify/'
		},
		{
			id: 'google-ai-essentials',
			title: 'Google AI Essentials',
			provider: 'Google · Coursera',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Learned practical AI concepts, prompting techniques, and how to apply generative AI tools productively in everyday work.',
			date: 'Feb 13, 2025',
			tags: ['Google', 'Coursera'],
			accent: '#60a5fa',
			image: '/Certificates/02-google-ai-essentials.webp',
			verifyUrl: 'https://coursera.org/share/b29221c6a11951c44c8b5373b496046c'
		},
		{
			id: 'technical-support',
			title: 'Technical Support Fundamentals',
			provider: 'Google · Coursera',
			category: 'networking',
			categoryLabel: 'Networking',
			description:
				'Covered IT support foundations including hardware, networking, troubleshooting, customer support, and system basics.',
			date: 'Feb 04, 2025',
			tags: ['Google', 'IT Support'],
			accent: '#38bdf8',
			image: '/Certificates/03-technical-support-fundamentals.webp',
			verifyUrl: 'https://coursera.org/share/5ab73297cc4969020995c4adf838d283'
		},
		{
			id: 'success-mindset',
			title: 'Success Mindset',
			provider: 'HP LIFE',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Built a growth-focused mindset for setting goals, staying resilient, and creating habits that support long-term success.',
			date: 'May 31, 2025',
			tags: ['HP LIFE', 'Soft Skills'],
			accent: '#f59e0b',
			image: '/Certificates/04-success-mindset.webp',
			verifyUrl: 'https://www.life-global.org/certificate/54bcc737-e2fa-460e-9c8d-c663a4dcee37'
		},
		{
			id: 'critical-infrastructure',
			title: 'Critical Infrastructure Protection',
			provider: 'OPSWAT Academy',
			category: 'networking',
			categoryLabel: 'Networking',
			description:
				'Understood threats to critical infrastructure and foundational approaches to protect essential systems and assets.',
			date: 'Sep 02, 2025',
			tags: ['OPSWAT Academy', 'Security'],
			accent: '#a855f7',
			image: '/Certificates/05-critical-infrastructure-protection.webp',
			verifyUrl: 'https://learn.opswatacademy.com/certificate/64kbY3fYtA'
		},
		{
			id: 'hp-life-ambassador',
			title: 'HP LIFE Ambassador',
			provider: 'HP LIFE',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Earned the HP LIFE Ambassador badge for completing learning milestones and representing digital skills development.',
			date: 'May 29, 2025',
			tags: ['HP LIFE', 'Ambassador'],
			accent: '#22c55e',
			image: '/Certificates/06-hp-life-ambassador.webp',
			verifyUrl: 'https://www.life-global.org/en/badges/3e7ac791-5e72-4cf7-b71f-f82ada9c5446'
		},
		{
			id: 'business-email',
			title: 'Business Email',
			provider: 'HP LIFE',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Learned professional email communication, structure, tone, and best practices for clear business correspondence.',
			date: 'May 29, 2025',
			tags: ['HP LIFE', 'Communication'],
			accent: '#14b8a6',
			image: '/Certificates/07-business-email.webp',
			verifyUrl: 'https://www.life-global.org/certificate/6545f990-cd37-4a01-b5b3-86af5649a34e'
		},
		{
			id: 'it-business-success',
			title: 'IT for Business Success',
			provider: 'HP LIFE',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Explored how technology supports business operations, productivity, decision-making, and digital transformation.',
			date: 'May 31, 2025',
			tags: ['HP LIFE', 'Business IT'],
			accent: '#818cf8',
			image: '/Certificates/08-it-for-business-success.webp',
			verifyUrl: 'https://www.life-global.org/certificate/1200d2aa-1d1f-4426-becb-ccc3c70525a9'
		},
		{
			id: 'job-interviewing',
			title: 'Job Interviewing',
			provider: 'HP LIFE',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Prepared for interviews with practical techniques for storytelling, confidence, and presenting skills effectively.',
			date: 'Sep 24, 2024',
			tags: ['HP LIFE', 'Career'],
			accent: '#fb7185',
			image: '/Certificates/09-job-interviewing.webp',
			verifyUrl: 'https://www.life-global.org/certificate/d382a308-0869-4f3a-aaa7-e59d0a275797'
		},
		{
			id: 'wordpress',
			title: 'Build a Free Website with WordPress',
			provider: 'Coursera',
			category: 'web',
			categoryLabel: 'Web Development',
			description:
				'Created and customized a free WordPress website with pages, content structure, and essential site-building workflows.',
			date: 'Feb 05, 2025',
			tags: ['Coursera', 'WordPress'],
			accent: '#06b6d4',
			image: '/Certificates/10-wordpress.webp',
			verifyUrl: 'https://coursera.org/share/1e56a63e189436472b90cd5946725afd'
		},
		{
			id: 'microsoft-excel',
			title: 'Using Basic Formulas and Functions in Microsoft Excel',
			provider: 'Coursera',
			category: 'other',
			categoryLabel: 'Other',
			description:
				'Practiced Excel formulas and functions including calculations, SUM/SUMIF, averages, and spreadsheet analysis basics.',
			date: 'Jul 17, 2024',
			tags: ['Coursera', 'Microsoft Excel'],
			accent: '#10b981',
			image: '/Certificates/11-microsoft-excel.webp',
			verifyUrl: 'https://coursera.org/share/47e324fae03d8976d777400309b61ba5'
		}
	];

	const stats = [
		{ Icon: Award, value: '11+', label: 'Certificates Earned' },
		{ Icon: GraduationCap, value: '03+', label: 'Years of Learning' },
		{ Icon: Trophy, value: '100+', label: 'Skills Gained' },
		{ Icon: TrendingUp, value: 'Continuous', label: 'Learning Journey' }
	] as const;

	let activeFilter = $state<Filter>('all');
	let viewing = $state<Certificate | null>(null);

	const visibleCertificates = $derived(
		activeFilter === 'all'
			? certificates
			: certificates.filter((certificate) => certificate.category === activeFilter)
	);

	function openCertificate(certificate: Certificate) {
		viewing = certificate;
		document.body.style.overflow = 'hidden';
	}

	function closeCertificate() {
		viewing = null;
		document.body.style.overflow = '';
	}
</script>

<section id="achievements" class="achievements" aria-label="Achievements">
	<div class="achievements-inner">
		<header class="achievements-hero">
			<p class="achievements-kicker">MY ACHIEVEMENTS</p>
			<h1 class="achievements-title">My <span>Certificates</span></h1>
			<i class="title-dot" aria-hidden="true"></i>
			<p class="achievements-lead">
				Here are some of my professional certifications and achievements that represent my
				continuous learning and growth.
			</p>
		</header>

		<div class="filter-row" role="tablist" aria-label="Certificate filters">
			{#each filters as filter}
				<button
					type="button"
					role="tab"
					class="filter-btn"
					class:active={activeFilter === filter.id}
					aria-selected={activeFilter === filter.id}
					onclick={() => (activeFilter = filter.id)}
				>
					<filter.Icon class="filter-icon" strokeWidth={1.8} />
					{filter.label}
				</button>
			{/each}
		</div>

		<div class="certificate-timeline">
			{#each visibleCertificates as certificate (certificate.id)}
				<article class="certificate-row" style={`--accent:${certificate.accent}`}>
					<div class="timeline-marker" aria-hidden="true"><i></i></div>

					<button
						type="button"
						class="certificate-preview"
						aria-label={`View ${certificate.title} certificate`}
						onclick={() => openCertificate(certificate)}
					>
						<div class="certificate-art">
							<SkeletonImage src={certificate.image} alt={certificate.title} />
						</div>
						<span class="preview-hover" aria-hidden="true">
							<Eye strokeWidth={2} />
						</span>
					</button>

					<div class="certificate-info">
						<p class="category-pill">{certificate.categoryLabel}</p>
						<h2>{certificate.title}</h2>
						<p class="provider">{certificate.provider}</p>
						<p class="description">{certificate.description}</p>
						<ul class="tag-list" aria-label="Certificate details">
							{#each certificate.tags as tag}
								<li>{tag}</li>
							{/each}
						</ul>
					</div>

					<div class="certificate-meta">
						<p class="date"><CalendarDays strokeWidth={1.8} /> {certificate.date}</p>
						<div class="action-row">
							<button
								type="button"
								class="view-btn"
								onclick={() => openCertificate(certificate)}
							>
								View Certificate <Eye strokeWidth={2} />
							</button>
							<a
								class="verify-btn"
								href={certificate.verifyUrl}
								target="_blank"
								rel="noreferrer"
								aria-label={`Verify ${certificate.title} on the issuer website`}
							>
								Verify <ExternalLink strokeWidth={2} />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if visibleCertificates.length === 0}
			<p class="empty-state">No certificates in this category yet.</p>
		{/if}

		<div class="stats-panel">
			{#each stats as stat}
				<article class="stat-item">
					<stat.Icon class="stat-icon" strokeWidth={1.75} />
					<strong>{stat.value}</strong>
					<span>{stat.label}</span>
				</article>
			{/each}
		</div>
	</div>
</section>

{#if viewing}
	<div
		class="cert-modal"
		role="dialog"
		aria-modal="true"
		aria-label={viewing.title}
		tabindex="-1"
		onclick={closeCertificate}
		onkeydown={(e) => {
			if (e.key === 'Escape') closeCertificate();
		}}
	>
		<div
			class="cert-modal-panel"
			style={`--accent:${viewing.accent}`}
			role="presentation"
			onclick={(e) => e.stopPropagation()}
		>
			<button type="button" class="cert-modal-close" aria-label="Close certificate" onclick={closeCertificate}>
				<X strokeWidth={2} />
			</button>
			<div class="certificate-art modal-art">
				<img src={viewing.image} alt={viewing.title} class="cert-modal-img" />
			</div>
			<div class="cert-modal-meta">
				<p>{viewing.title}</p>
				<a
					class="verify-btn"
					href={viewing.verifyUrl}
					target="_blank"
					rel="noreferrer"
				>
					Verify <ExternalLink strokeWidth={2} />
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.achievements {
		min-height: 100dvh;
		color: var(--fg);
		background: transparent;
		isolation: isolate;
	}

	.achievements-inner {
		position: relative;
		z-index: 2;
		width: min(100% - 2rem, 72rem);
		margin-inline: auto;
		padding-block: 7rem 5rem;
	}

	.achievements-hero {
		max-width: 40rem;
		margin-inline: auto;
		text-align: center;
	}

	.achievements-kicker {
		color: var(--muted);
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.24em;
	}

	.achievements-title {
		margin-top: 0.55rem;
		font-size: clamp(2rem, 5vw, 2.85rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 1.05;
	}

	.achievements-title span {
		color: var(--fg);
		text-shadow: 0 0 22px color-mix(in srgb, var(--fg) 28%, transparent);
	}

	.title-dot {
		display: block;
		width: 0.42rem;
		height: 0.42rem;
		margin: 0.8rem auto 0;
		border-radius: 999px;
		background: var(--fg);
		box-shadow: 0 0 14px color-mix(in srgb, var(--fg) 60%, transparent);
	}

	.achievements-lead {
		margin-top: 0.9rem;
		color: var(--muted);
		font-size: 0.92rem;
		font-weight: 500;
		line-height: 1.7;
	}

	.filter-row {
		display: flex;
		gap: 0.35rem;
		margin-top: 2.2rem;
		padding: 0.4rem;
		border: 1px solid var(--nav-border);
		border-radius: 999px;
		background: color-mix(in srgb, var(--fg) 2.5%, var(--bg));
		overflow-x: auto;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}

	.filter-row::-webkit-scrollbar {
		display: none;
	}

	.filter-btn {
		display: inline-flex;
		flex: 1 0 auto;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		min-height: 2.35rem;
		padding: 0.55rem 0.82rem;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--muted);
		font: inherit;
		font-size: 0.71rem;
		font-weight: 600;
		white-space: nowrap;
		cursor: pointer;
		transition:
			color 0.25s ease,
			background-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.filter-icon {
		width: 0.95rem;
		height: 0.95rem;
	}

	.filter-btn:hover {
		color: var(--fg);
		background: color-mix(in srgb, var(--fg) 5%, transparent);
	}

	.filter-btn.active {
		color: var(--fg);
		background: color-mix(in srgb, var(--fg) 9%, transparent);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--fg) 10%, transparent);
	}

	.certificate-timeline {
		position: relative;
		margin-top: 1.7rem;
		padding-left: 2.9rem;
	}

	.certificate-timeline::before {
		content: '';
		position: absolute;
		top: 0.9rem;
		bottom: 0.9rem;
		left: 1rem;
		width: 1px;
		background: color-mix(in srgb, var(--fg) 24%, transparent);
	}

	.certificate-row {
		position: relative;
		display: grid;
		grid-template-columns: minmax(13rem, 17.5rem) minmax(0, 1fr) 8.5rem;
		gap: 1.6rem;
		align-items: center;
		min-height: 12rem;
		padding-block: 1rem;
		border-bottom: 1px solid color-mix(in srgb, var(--fg) 8%, transparent);
	}

	.certificate-row:last-child {
		border-bottom: 0;
	}

	.timeline-marker {
		position: absolute;
		top: 50%;
		left: -2.9rem;
		width: 2rem;
		height: 2rem;
		display: grid;
		place-items: center;
		transform: translateY(-50%);
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 10%, var(--bg));
		border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
		box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 20%, transparent);
	}

	.timeline-marker i {
		width: 0.62rem;
		height: 0.62rem;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
	}

	.certificate-preview {
		position: relative;
		padding: 0.25rem;
		border: 1px solid color-mix(in srgb, var(--accent) 65%, transparent);
		border-radius: 0.7rem;
		background: color-mix(in srgb, var(--accent) 8%, var(--bg));
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent),
			0 0 22px color-mix(in srgb, var(--accent) 18%, transparent);
		overflow: hidden;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease,
			border-color 0.35s ease;
	}

	.certificate-preview:hover,
	.certificate-preview:focus-visible {
		transform: translateY(-4px) scale(1.02);
		border-color: color-mix(in srgb, var(--accent) 90%, transparent);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent),
			0 12px 36px color-mix(in srgb, var(--accent) 28%, transparent);
		outline: none;
	}

	.certificate-preview:hover .certificate-art,
	.certificate-preview:focus-visible .certificate-art {
		transform: scale(1.05);
	}

	.certificate-preview:hover .preview-hover,
	.certificate-preview:focus-visible .preview-hover {
		opacity: 1;
	}

	.preview-hover {
		position: absolute;
		inset: 0.25rem;
		z-index: 2;
		display: grid;
		place-items: center;
		border-radius: 0.45rem;
		background: color-mix(in srgb, #000 42%, transparent);
		color: #fff;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	.preview-hover :global(svg) {
		width: 1.35rem;
		height: 1.35rem;
	}

	.certificate-art {
		position: relative;
		display: block;
		aspect-ratio: 1.58;
		border-radius: 0.45rem;
		overflow: hidden;
		background: color-mix(in srgb, var(--fg) 4%, var(--bg));
		transition: transform 0.45s ease;
	}

	.certificate-art :global(.img-shell),
	.certificate-art :global(.img-real) {
		width: 100%;
		height: 100%;
	}

	.certificate-art :global(.img-real) {
		object-fit: cover;
		object-position: center;
	}

	.cert-modal-img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		background: #0a0a0c;
	}

	.certificate-info {
		min-width: 0;
	}

	.category-pill {
		display: inline-flex;
		padding: 0.28rem 0.48rem;
		border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
		border-radius: 0.35rem;
		background: color-mix(in srgb, var(--accent) 8%, transparent);
		color: var(--accent);
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.certificate-info h2 {
		margin-top: 0.6rem;
		font-size: clamp(1rem, 2vw, 1.2rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1.25;
	}

	.provider {
		margin-top: 0.18rem;
		color: var(--accent);
		font-size: 0.78rem;
		font-weight: 600;
	}

	.description {
		max-width: 36rem;
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.55;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0.7rem 0 0;
		padding: 0;
		list-style: none;
	}

	.tag-list li {
		padding: 0.28rem 0.48rem;
		border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent);
		border-radius: 0.35rem;
		background: color-mix(in srgb, var(--fg) 4%, transparent);
		color: color-mix(in srgb, var(--muted) 80%, var(--fg));
		font-size: 0.62rem;
		font-weight: 600;
	}

	.certificate-meta {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		gap: 1.35rem;
	}

	.action-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	.date,
	.view-btn,
	.verify-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		white-space: nowrap;
	}

	.date {
		color: var(--muted);
		font-size: 0.68rem;
		font-weight: 500;
	}

	.date :global(svg) {
		width: 0.9rem;
		height: 0.9rem;
	}

	.view-btn,
	.verify-btn {
		padding: 0.55rem 0.8rem;
		border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
		border-radius: 0.55rem;
		color: var(--fg);
		font: inherit;
		font-size: 0.72rem;
		font-weight: 600;
		text-decoration: none;
		background: transparent;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease,
			box-shadow 0.25s ease,
			transform 0.25s ease;
	}

	.view-btn :global(svg),
	.verify-btn :global(svg) {
		width: 0.85rem;
		height: 0.85rem;
	}

	.view-btn:hover,
	.verify-btn:hover {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 18%, transparent);
		transform: translateY(-1px);
	}

	.cert-modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: color-mix(in srgb, #000 62%, transparent);
		backdrop-filter: blur(8px);
	}

	.cert-modal-panel {
		position: relative;
		width: min(100%, 42rem);
		padding: 1rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
		background: color-mix(in srgb, var(--fg) 3%, var(--bg));
		box-shadow: 0 24px 60px color-mix(in srgb, #000 45%, transparent);
	}

	.cert-modal-close {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		color: var(--fg);
		cursor: pointer;
	}

	.cert-modal-close :global(svg) {
		width: 1rem;
		height: 1rem;
	}

	.modal-art {
		aspect-ratio: 1.58;
		font-size: 1.15em;
	}

	.cert-modal-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 0.9rem;
	}

	.cert-modal-meta p {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.empty-state {
		padding: 4rem 1rem;
		text-align: center;
		color: var(--muted);
		font-size: 0.85rem;
	}

	.stats-panel {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin-top: 1.8rem;
		padding: 1.2rem 0.6rem;
		border: 1px solid color-mix(in srgb, var(--fg) 14%, transparent);
		border-radius: 1.1rem;
		background: color-mix(in srgb, var(--fg) 2.5%, var(--bg));
		box-shadow: 0 15px 45px color-mix(in srgb, #000 15%, transparent);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 0;
		padding: 0.35rem 1rem;
		text-align: center;
		border-right: 1px solid color-mix(in srgb, var(--fg) 9%, transparent);
	}

	.stat-item:last-child {
		border-right: 0;
	}

	.stat-icon {
		width: 1.75rem;
		height: 1.75rem;
		margin-bottom: 0.55rem;
		color: var(--fg);
		filter: drop-shadow(0 0 7px color-mix(in srgb, var(--fg) 35%, transparent));
	}

	.stat-item strong {
		font-size: clamp(1.15rem, 2.2vw, 1.5rem);
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.025em;
	}

	.stat-item span {
		margin-top: 0.2rem;
		color: var(--muted);
		font-size: 0.67rem;
		font-weight: 500;
	}

	@media (max-width: 900px) {
		.certificate-row {
			grid-template-columns: minmax(11rem, 14rem) minmax(0, 1fr);
			gap: 1.2rem;
		}

		.certificate-meta {
			grid-column: 2;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
		}
	}

	@media (max-width: 640px) {
		.achievements-inner {
			width: min(100% - 1.5rem, 72rem);
			padding-block: 6.7rem 3.5rem;
		}

		.achievements-lead {
			font-size: 0.84rem;
		}

		.filter-row {
			margin-inline: -0.15rem;
			border-radius: 0.9rem;
		}

		.certificate-timeline {
			padding-left: 1.25rem;
		}

		.certificate-timeline::before {
			left: 0.18rem;
		}

		.certificate-row {
			grid-template-columns: 1fr;
			gap: 0.9rem;
			padding-block: 1.25rem;
		}

		.timeline-marker {
			top: 2rem;
			left: -1.25rem;
			width: 0.95rem;
			height: 0.95rem;
		}

		.timeline-marker i {
			width: 0.38rem;
			height: 0.38rem;
		}

		.certificate-preview {
			width: 100%;
		}

		.certificate-info h2 {
			font-size: 1.02rem;
		}

		.certificate-meta {
			grid-column: 1;
			align-self: auto;
		}

		.stats-panel {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0;
			padding: 0.7rem;
		}

		.stat-item {
			padding: 0.85rem 0.4rem;
		}

		.stat-item:nth-child(2) {
			border-right: 0;
		}

		.stat-item:nth-child(-n + 2) {
			border-bottom: 1px solid color-mix(in srgb, var(--fg) 9%, transparent);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.filter-btn,
		.view-btn,
		.verify-btn,
		.certificate-preview,
		.certificate-art,
		.preview-hover {
			transition: none;
		}

		.view-btn:hover,
		.verify-btn:hover,
		.certificate-preview:hover,
		.certificate-preview:focus-visible {
			transform: none;
		}

		.certificate-preview:hover .certificate-art,
		.certificate-preview:focus-visible .certificate-art {
			transform: none;
		}
	}
</style>
