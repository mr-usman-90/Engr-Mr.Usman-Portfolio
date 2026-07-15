<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let visible = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function isSlowConnection() {
		const nav = navigator as Navigator & {
			connection?: { effectiveType?: string; saveData?: boolean; rtt?: number; downlink?: number };
		};
		const c = nav.connection;
		if (!c) return false;
		if (c.saveData) return true;
		if (c.effectiveType === 'slow-2g' || c.effectiveType === '2g') return true;
		if (typeof c.rtt === 'number' && c.rtt > 450) return true;
		if (typeof c.downlink === 'number' && c.downlink > 0 && c.downlink < 1.2) return true;
		return false;
	}

	function clearTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	beforeNavigate(() => {
		clearTimer();
		visible = false;
		const delay = isSlowConnection() ? 80 : 380;
		timer = setTimeout(() => {
			visible = true;
		}, delay);
	});

	afterNavigate(() => {
		clearTimer();
		visible = false;
	});
</script>

{#if visible}
	<div class="route-skeleton" aria-live="polite" aria-busy="true">
		<div class="sk-nav">
			<span class="bone bone-logo"></span>
			<span class="bone bone-pill"></span>
			<span class="bone bone-circle"></span>
		</div>
		<div class="sk-hero">
			<span class="bone bone-circle-lg"></span>
			<span class="bone bone-title"></span>
			<span class="bone bone-line"></span>
			<span class="bone bone-line short"></span>
			<div class="sk-cta">
				<span class="bone bone-btn"></span>
				<span class="bone bone-btn"></span>
			</div>
		</div>
		<div class="sk-grid">
			{#each Array(3) as _}
				<span class="bone bone-card"></span>
			{/each}
		</div>
	</div>
{/if}

<style>
	.route-skeleton {
		position: fixed;
		inset: 0;
		z-index: 60;
		padding: 1.15rem 1rem 2rem;
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(8px);
		overflow: hidden;
	}

	.sk-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 980px;
		margin: 0.35rem auto 2.5rem;
		gap: 1rem;
	}

	.sk-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		max-width: 42rem;
		margin: 0 auto;
	}

	.sk-cta {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.sk-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		max-width: 72rem;
		margin: 3rem auto 0;
	}

	@media (max-width: 760px) {
		.sk-grid {
			grid-template-columns: 1fr;
		}
	}

	.bone {
		display: block;
		border-radius: 0.75rem;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--fg) 6%, transparent) 0%,
			color-mix(in srgb, var(--fg) 12%, transparent) 50%,
			color-mix(in srgb, var(--fg) 6%, transparent) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.15s ease-in-out infinite;
	}

	.bone-logo {
		width: 7.5rem;
		height: 1.6rem;
		border-radius: 0.4rem;
	}

	.bone-pill {
		flex: 1;
		max-width: 18rem;
		height: 0.85rem;
		border-radius: 999px;
	}

	.bone-circle {
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 999px;
	}

	.bone-circle-lg {
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 999px;
		margin-bottom: 0.4rem;
	}

	.bone-title {
		width: min(20rem, 70vw);
		height: 1.8rem;
	}

	.bone-line {
		width: min(28rem, 85vw);
		height: 0.75rem;
	}

	.bone-line.short {
		width: min(18rem, 60vw);
	}

	.bone-btn {
		width: 7.5rem;
		height: 2.4rem;
		border-radius: 0.65rem;
	}

	.bone-card {
		height: 14rem;
		border-radius: 1.1rem;
	}

	@keyframes shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bone {
			animation: none;
		}
	}
</style>
