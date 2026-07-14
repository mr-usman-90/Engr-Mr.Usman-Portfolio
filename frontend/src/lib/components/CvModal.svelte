<script lang="ts">
	import gsap from 'gsap';
	import { Download, ExternalLink, X } from '@lucide/svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	const CV_VIEW =
		'https://drive.google.com/file/d/1YC8c3fZ3pHT_xKiLWOTKqaTiIVATAtar/view?usp=drive_link';
	const CV_PREVIEW = 'https://drive.google.com/file/d/1YC8c3fZ3pHT_xKiLWOTKqaTiIVATAtar/preview';

	let overlayEl: HTMLDivElement | undefined = $state();
	let panelEl: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!open) return;

		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reduce && overlayEl && panelEl) {
			gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' });
			gsap.fromTo(
				panelEl,
				{ opacity: 0, y: 28, scale: 0.96 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
			);
		}

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);

		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener('keydown', onKey);
		};
	});

	function closeSmooth() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !overlayEl || !panelEl) {
			onClose();
			return;
		}

		const tl = gsap.timeline({
			onComplete: onClose
		});
		tl.to(panelEl, { opacity: 0, y: 16, scale: 0.97, duration: 0.22, ease: 'power2.in' }, 0).to(
			overlayEl,
			{ opacity: 0, duration: 0.22, ease: 'power2.in' },
			0
		);
	}

	function onBackdrop(e: MouseEvent) {
		if (e.target === overlayEl) closeSmooth();
	}
</script>

{#if open}
	<div
		bind:this={overlayEl}
		class="cv-overlay"
		role="presentation"
		onclick={onBackdrop}
	>
		<div
			bind:this={panelEl}
			class="cv-panel"
			role="dialog"
			aria-modal="true"
			aria-labelledby="cv-modal-title"
			tabindex="-1"
		>
			<header class="cv-head">
				<div>
					<p class="cv-kicker">RESUME</p>
					<h2 id="cv-modal-title" class="cv-title">CV Preview</h2>
				</div>
				<button type="button" class="cv-close" aria-label="Close CV preview" onclick={closeSmooth}>
					<X class="h-5 w-5" strokeWidth={2} />
				</button>
			</header>

			<div class="cv-frame-wrap">
				<iframe
					title="Mr. Usman CV Preview"
					src={CV_PREVIEW}
					class="cv-frame"
					loading="lazy"
					allow="autoplay"
				></iframe>
			</div>

			<footer class="cv-foot">
				<a
					href={CV_VIEW}
					target="_blank"
					rel="noopener noreferrer"
					class="cv-download"
				>
					<Download class="h-4 w-4" strokeWidth={2.25} />
					Download CV
					<ExternalLink class="h-3.5 w-3.5 opacity-70" strokeWidth={2} />
				</a>
			</footer>
		</div>
	</div>
{/if}

<style>
	.cv-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: color-mix(in srgb, #000 72%, transparent);
		backdrop-filter: blur(8px);
	}

	.cv-panel {
		width: min(920px, 100%);
		max-height: min(92dvh, 920px);
		display: flex;
		flex-direction: column;
		border-radius: 1.15rem;
		border: 1px solid var(--nav-border);
		background: color-mix(in srgb, var(--bg) 92%, var(--fg));
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
		overflow: hidden;
	}

	.cv-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.15rem 0.85rem;
		border-bottom: 1px solid var(--nav-border);
	}

	.cv-kicker {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		color: var(--muted);
	}

	.cv-title {
		margin-top: 0.15rem;
		font-size: 1.1rem;
		font-weight: 800;
		color: var(--fg);
		letter-spacing: -0.02em;
	}

	.cv-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.35rem;
		height: 2.35rem;
		border-radius: 999px;
		border: 1px solid var(--theme-btn-border);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		transition: background-color 0.25s ease;
	}

	.cv-close:hover {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	.cv-frame-wrap {
		flex: 1;
		min-height: 0;
		background: #0a0a0a;
	}

	.cv-frame {
		display: block;
		width: 100%;
		height: min(62dvh, 640px);
		border: 0;
		background: #111;
	}

	.cv-foot {
		display: flex;
		justify-content: center;
		padding: 1rem 1.15rem 1.15rem;
		border-top: 1px solid var(--nav-border);
	}

	.cv-download {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.75rem 1.25rem;
		border-radius: 0.75rem;
		background: var(--cta-solid-bg);
		color: var(--cta-solid-fg);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
		box-shadow: 0 0 22px color-mix(in srgb, var(--fg) 22%, transparent);
		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
	}

	.cv-download:hover {
		transform: translateY(-2px);
		opacity: 0.95;
	}
</style>
