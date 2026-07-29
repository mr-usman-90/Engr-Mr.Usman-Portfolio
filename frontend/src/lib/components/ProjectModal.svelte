<script lang="ts">
	import { onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ChevronLeft, ChevronRight, ExternalLink, X } from '@lucide/svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';

	type Project = {
		id: string;
		title: string;
		description: string;
		theme: string;
		images: string[];
		liveUrl: string;
		codeUrl: string;
	};

	let {
		project,
		onClose
	}: {
		project: Project;
		onClose: () => void;
	} = $props();

	let overlayEl: HTMLDivElement | undefined = $state();
	let panelEl: HTMLDivElement | undefined = $state();
	let trackEl: HTMLDivElement | undefined = $state();
	let index = $state(0);
	let autoTimer: ReturnType<typeof setInterval> | null = null;
	let paused = $state(false);

	const count = $derived(project.images.length);

	function goTo(next: number) {
		if (!count) return;
		index = ((next % count) + count) % count;
		updateTrack(true);
	}

	function prev() {
		goTo(index - 1);
		restartAuto();
	}

	function next() {
		goTo(index + 1);
		restartAuto();
	}

	function updateTrack(animate: boolean) {
		if (!trackEl) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (animate && !reduce) {
			gsap.to(trackEl, { xPercent: -index * 100, duration: 0.45, ease: 'power3.out' });
		} else {
			gsap.set(trackEl, { xPercent: -index * 100 });
		}
	}

	function startAuto() {
		stopAuto();
		if (count < 2) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		autoTimer = setInterval(() => {
			if (paused) return;
			index = (index + 1) % count;
			updateTrack(true);
		}, 3200);
	}

	function stopAuto() {
		if (autoTimer) {
			clearInterval(autoTimer);
			autoTimer = null;
		}
	}

	function restartAuto() {
		startAuto();
	}

	function closeSmooth() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		stopAuto();
		if (reduce || !overlayEl || !panelEl) {
			onClose();
			return;
		}
		gsap
			.timeline({ onComplete: onClose })
			.to(panelEl, { opacity: 0, y: 18, scale: 0.97, duration: 0.22, ease: 'power2.in' }, 0)
			.to(overlayEl, { opacity: 0, duration: 0.22, ease: 'power2.in' }, 0);
	}

	function onBackdrop(e: MouseEvent) {
		if (e.target === overlayEl) closeSmooth();
	}

	$effect(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reduce && overlayEl && panelEl) {
			gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' });
			gsap.fromTo(
				panelEl,
				{ opacity: 0, y: 28, scale: 0.96 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.42,
					ease: 'power3.out',
					// Leave no residual transform — GPU layers from scale make images look soft/blurry
					clearProps: 'transform'
				}
			);
		}

		queueMicrotask(() => {
			updateTrack(false);
			startAuto();
		});

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeSmooth();
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		};
		window.addEventListener('keydown', onKey);

		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener('keydown', onKey);
			stopAuto();
		};
	});

	onDestroy(() => stopAuto());
</script>

<div
	bind:this={overlayEl}
	class="pm-overlay"
	role="presentation"
	onclick={onBackdrop}
>
	<div
		bind:this={panelEl}
		class="pm-panel"
		style={`--theme:${project.theme}`}
		role="dialog"
		aria-modal="true"
		aria-labelledby="project-modal-title"
		tabindex="-1"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		onmouseenter={() => (paused = true)}
		onmouseleave={() => (paused = false)}
	>
		<button type="button" class="pm-close" aria-label="Close project details" onclick={closeSmooth}>
			<X class="h-4 w-4" strokeWidth={2} />
		</button>

		<div class="pm-carousel" aria-roledescription="carousel" aria-label="Project screenshots">
			<div class="pm-viewport">
				<div bind:this={trackEl} class="pm-track">
					{#each project.images as src, i}
						<figure class="pm-slide">
							<img
								src={src}
								alt={`${project.title} screenshot ${i + 1}`}
								width="1920"
								height="1080"
								loading={i === 0 ? 'eager' : 'lazy'}
								decoding="async"
								fetchpriority={i === 0 ? 'high' : 'auto'}
								draggable="false"
							/>
						</figure>
					{/each}
				</div>
			</div>

			<button type="button" class="pm-arrow pm-arrow-left" aria-label="Previous image" onclick={prev}>
				<ChevronLeft class="h-5 w-5" strokeWidth={2} />
			</button>
			<button type="button" class="pm-arrow pm-arrow-right" aria-label="Next image" onclick={next}>
				<ChevronRight class="h-5 w-5" strokeWidth={2} />
			</button>

			<div class="pm-dots" aria-label="Slide indicators">
				{#each project.images as _, i}
					<button
						type="button"
						class="pm-dot"
						class:active={i === index}
						aria-label={`Go to image ${i + 1}`}
						aria-current={i === index ? 'true' : undefined}
						onclick={() => {
							goTo(i);
							restartAuto();
						}}
					></button>
				{/each}
			</div>
		</div>

		<div class="pm-body">
			<h2 id="project-modal-title" class="pm-title">{project.title}</h2>
			<p class="pm-desc">{project.description}</p>
		</div>

		<div class="pm-actions">
			<a
				class="pm-btn pm-btn-live"
				href={project.liveUrl}
				target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
				rel="noreferrer"
			>
				Live Demo
				<ExternalLink class="h-4 w-4" strokeWidth={2} />
			</a>
			<a class="pm-btn pm-btn-code" href={project.codeUrl} target="_blank" rel="noreferrer">
				View Code
				<GithubIcon class="h-4 w-4" />
			</a>
		</div>
	</div>
</div>

<style>
	.pm-overlay {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1.25rem;
		background: color-mix(in srgb, #000 62%, transparent);
		backdrop-filter: blur(10px);
	}

	.pm-panel {
		position: relative;
		width: min(820px, 92vw);
		max-height: min(82dvh, 760px);
		overflow: auto;
		border-radius: 1.15rem;
		border: 1px solid color-mix(in srgb, var(--theme) 45%, transparent);
		background: color-mix(in srgb, var(--fg) 3%, var(--bg));
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 18%, transparent),
			0 24px 64px color-mix(in srgb, #000 42%, transparent),
			0 0 40px color-mix(in srgb, var(--theme) 18%, transparent);
		padding: 0.85rem 0.85rem 1rem;
		/* Avoid creating a persistent scaled compositing layer */
		transform: none;
	}

	:global(html[data-theme="light"]) .pm-panel {
		background: rgba(255, 255, 255, 0.78);
		border: 1px solid rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(28px) saturate(1.5);
		-webkit-backdrop-filter: blur(28px) saturate(1.5);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--theme) 12%, transparent),
			0 24px 64px rgba(15, 23, 42, 0.1),
			0 0 36px color-mix(in srgb, var(--theme) 10%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.95);
	}

	:global(html[data-theme="light"]) .pm-overlay {
		background: color-mix(in srgb, #94a3b8 35%, transparent);
		backdrop-filter: blur(14px) saturate(1.25);
		-webkit-backdrop-filter: blur(14px) saturate(1.25);
	}

	:global(html[data-theme="light"]) .pm-close {
		background: rgba(255, 255, 255, 0.72);
		border-color: rgba(255, 255, 255, 0.88);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
	}

	.pm-close {
		position: absolute;
		top: 0.85rem;
		right: 0.85rem;
		z-index: 3;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--fg) 16%, transparent);
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		color: var(--fg);
		cursor: pointer;
	}

	.pm-carousel {
		position: relative;
		margin-top: 0.35rem;
	}

	.pm-viewport {
		overflow: hidden;
		border-radius: 0.95rem;
		border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent);
		aspect-ratio: 16 / 9;
		background: #0a0a0c;
	}

	.pm-track {
		display: flex;
		height: 100%;
	}

	.pm-slide {
		margin: 0;
		flex: 0 0 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: #0a0a0c;
	}

	.pm-slide img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		display: block;
		image-rendering: auto;
		-webkit-user-drag: none;
		/* Keep bitmap sharp; avoid GPU blur from parent filters/transforms */
		transform: translateZ(0);
		backface-visibility: hidden;
	}

	.pm-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--fg) 18%, transparent);
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		color: var(--fg);
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
	}

	.pm-arrow:hover {
		border-color: color-mix(in srgb, var(--theme) 55%, transparent);
		background: color-mix(in srgb, var(--theme) 14%, var(--bg));
	}

	.pm-arrow-left {
		left: 0.65rem;
	}

	.pm-arrow-right {
		right: 0.65rem;
	}

	.pm-dots {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.75rem;
	}

	.pm-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		border: 0;
		padding: 0;
		cursor: pointer;
		background: color-mix(in srgb, var(--fg) 28%, transparent);
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.pm-dot.active {
		background: var(--theme);
		transform: scale(1.25);
		box-shadow: 0 0 10px color-mix(in srgb, var(--theme) 55%, transparent);
	}

	.pm-body {
		margin-top: 0.85rem;
		padding-inline: 0.2rem;
	}

	.pm-title {
		font-size: 1.08rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.25;
	}

	.pm-desc {
		margin-top: 0.4rem;
		font-size: 0.84rem;
		line-height: 1.55;
		color: var(--muted);
		font-weight: 500;
	}

	.pm-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin-top: 0.95rem;
		padding-inline: 0.15rem;
	}

	.pm-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		flex: 1 1 9rem;
		padding: 0.65rem 0.9rem;
		border-radius: 999px;
		text-decoration: none;
		font-size: 0.82rem;
		font-weight: 600;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease,
			color 0.25s ease;
	}

	.pm-btn-live {
		background: var(--theme);
		color: #0a0a0a;
		border: 1px solid transparent;
	}

	.pm-btn-live:hover {
		filter: brightness(1.08);
	}

	.pm-btn-code {
		border: 1px solid color-mix(in srgb, var(--fg) 35%, transparent);
		color: var(--fg);
		background: transparent;
	}

	.pm-btn-code:hover {
		border-color: var(--fg);
		background: color-mix(in srgb, var(--fg) 7%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.pm-arrow,
		.pm-dot,
		.pm-btn {
			transition: none;
		}
	}
</style>
