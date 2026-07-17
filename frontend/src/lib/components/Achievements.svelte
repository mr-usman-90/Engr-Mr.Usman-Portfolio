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
		Search,
		TrendingUp,
		Trophy,
		X
	} from '@lucide/svelte';

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
		art: 'seo' | 'aws' | 'cisco' | 'meta';
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
			date: 'Nov 17, 2025',
			tags: ['DigiSkills.pk', 'DSTP3.0-Batch-01'],
			accent: '#a3e635',
			art: 'seo',
			verifyUrl: 'https://digiskills.pk/'
		},
		{
			id: 'aws',
			title: 'AWS Certified Cloud Practitioner',
			provider: 'Amazon Web Services',
			category: 'cloud',
			categoryLabel: 'Cloud & DevOps',
			description:
				'Foundational understanding of AWS cloud services, security, architecture, pricing, and support.',
			date: 'Oct 25, 2025',
			tags: ['Amazon Web Services', 'CLF-C02'],
			accent: '#60a5fa',
			art: 'aws',
			verifyUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
		},
		{
			id: 'cybersecurity',
			title: 'Introduction to Cybersecurity',
			provider: 'Cisco Networking Academy',
			category: 'networking',
			categoryLabel: 'Networking',
			description:
				'Learned the basics of cybersecurity, threats, vulnerabilities, and best practices to protect systems and networks.',
			date: 'Sep 10, 2025',
			tags: ['Cisco Networking Academy', 'CCNA Intro'],
			accent: '#a855f7',
			art: 'cisco',
			verifyUrl: 'https://www.netacad.com/courses/introduction-to-cybersecurity'
		},
		{
			id: 'meta-frontend',
			title: 'Meta Front-End Developer',
			provider: 'Meta (Facebook)',
			category: 'web',
			categoryLabel: 'Web Development',
			description:
				'Completed professional certification in front-end development covering HTML, CSS, JavaScript, React, and web design principles.',
			date: 'Aug 20, 2025',
			tags: ['Meta', 'Professional Certificate'],
			accent: '#f59e0b',
			art: 'meta',
			verifyUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
		}
	];

	const stats = [
		{ Icon: Award, value: '04+', label: 'Certificates Earned' },
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
						<div class="certificate-art {certificate.art}">
							{#if certificate.art === 'seo'}
								<div class="art-logo">DigiSkills<span>.pk</span></div>
								<div class="art-seal"><Search strokeWidth={1.5} /></div>
								<strong>TRAINING<br />CERTIFICATE</strong>
								<small>USMAN FAROOQ</small>
							{:else if certificate.art === 'aws'}
								<div class="art-logo aws-logo">aws</div>
								<strong>AWS Certified<br />Cloud Practitioner</strong>
								<small>Amazon Web Services</small>
								<div class="aws-angle"></div>
							{:else if certificate.art === 'cisco'}
								<div class="art-logo cisco-logo">CISCO</div>
								<strong>Introduction to<br />Cybersecurity</strong>
								<small>Networking Academy</small>
								<div class="art-signature">Certified</div>
							{:else}
								<div class="art-logo meta-logo">∞ <span>Meta</span></div>
								<strong>Meta Front-End Developer</strong>
								<small>Professional Certificate</small>
								<div class="art-signature">Certificate</div>
							{/if}
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
			<div class="certificate-art {viewing.art} modal-art">
				{#if viewing.art === 'seo'}
					<div class="art-logo">DigiSkills<span>.pk</span></div>
					<div class="art-seal"><Search strokeWidth={1.5} /></div>
					<strong>TRAINING<br />CERTIFICATE</strong>
					<small>USMAN FAROOQ</small>
				{:else if viewing.art === 'aws'}
					<div class="art-logo aws-logo">aws</div>
					<strong>AWS Certified<br />Cloud Practitioner</strong>
					<small>Amazon Web Services</small>
					<div class="aws-angle"></div>
				{:else if viewing.art === 'cisco'}
					<div class="art-logo cisco-logo">CISCO</div>
					<strong>Introduction to<br />Cybersecurity</strong>
					<small>Networking Academy</small>
					<div class="art-signature">Certified</div>
				{:else}
					<div class="art-logo meta-logo">∞ <span>Meta</span></div>
					<strong>Meta Front-End Developer</strong>
					<small>Professional Certificate</small>
					<div class="art-signature">Certificate</div>
				{/if}
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		aspect-ratio: 1.58;
		padding: 1.05rem 1.2rem;
		border-radius: 0.45rem;
		overflow: hidden;
		color: #172033;
		background:
			linear-gradient(135deg, transparent 55%, rgba(35, 95, 150, 0.12)),
			#f5f4ef;
		transition: transform 0.45s ease;
	}

	.certificate-art::before,
	.certificate-art::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(25, 80, 120, 0.12);
	}

	.certificate-art::before {
		width: 9rem;
		height: 9rem;
		right: -3rem;
		top: -3.5rem;
	}

	.certificate-art::after {
		width: 6rem;
		height: 6rem;
		right: -2rem;
		top: -2rem;
	}

	.art-logo {
		position: absolute;
		top: 0.7rem;
		left: 0.85rem;
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.art-logo span {
		color: #eb6b25;
	}

	.certificate-art strong {
		position: relative;
		z-index: 1;
		font-size: clamp(0.72rem, 1.3vw, 1rem);
		line-height: 1.15;
		letter-spacing: -0.025em;
	}

	.certificate-art small {
		position: relative;
		z-index: 1;
		margin-top: 0.45rem;
		font-size: 0.4rem;
		font-weight: 700;
		letter-spacing: 0.12em;
	}

	.art-seal {
		position: absolute;
		right: 1.2rem;
		top: 50%;
		display: grid;
		place-items: center;
		width: 3.7rem;
		height: 3.7rem;
		color: #2c6388;
		border: 0.35rem solid rgba(51, 124, 166, 0.18);
		border-radius: 50%;
		transform: translateY(-50%);
	}

	.art-seal :global(svg) {
		width: 1.65rem;
	}

	.aws {
		justify-content: flex-end;
		background: linear-gradient(105deg, #f7f7f4 0 72%, #dce8f4 72%);
	}

	.aws-logo {
		font-size: 0.82rem;
		text-transform: lowercase;
	}

	.aws strong {
		margin-bottom: 0.4rem;
	}

	.aws-angle {
		position: absolute;
		inset: 0 0 0 auto;
		width: 28%;
		border-left: 0.45rem solid #4385c6;
		transform: skewX(-10deg);
		transform-origin: bottom;
	}

	.cisco {
		justify-content: flex-end;
		background: linear-gradient(160deg, #e8eff8, #f8f8f6 45%);
	}

	.cisco-logo {
		color: #176698;
		font-size: 0.58rem;
		letter-spacing: 0.08em;
	}

	.meta {
		justify-content: flex-end;
		background: radial-gradient(circle at 78% 20%, #d7edff, transparent 38%), #f8f8f6;
	}

	.meta-logo {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		color: #1769e0;
		font-size: 1rem;
	}

	.meta-logo span {
		color: #26374b;
		font-size: 0.55rem;
	}

	.art-signature {
		position: absolute;
		right: 1rem;
		bottom: 0.85rem;
		font-family: cursive;
		font-size: 0.55rem;
		font-style: italic;
		opacity: 0.6;
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
