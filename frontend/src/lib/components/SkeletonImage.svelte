<script lang="ts">
	let {
		src,
		alt = '',
		class: className = ''
	}: {
		src: string;
		alt?: string;
		class?: string;
	} = $props();

	let loaded = $state(false);
	let showSkeleton = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		loaded = false;
		showSkeleton = false;
		if (timer) clearTimeout(timer);

		const nav = navigator as Navigator & {
			connection?: { effectiveType?: string; downlink?: number; rtt?: number };
		};
		const c = nav.connection;
		const slow =
			c?.effectiveType === 'slow-2g' ||
			c?.effectiveType === '2g' ||
			(typeof c?.rtt === 'number' && c.rtt > 450) ||
			(typeof c?.downlink === 'number' && c.downlink > 0 && c.downlink < 1.2);

		timer = setTimeout(() => {
			if (!loaded) showSkeleton = true;
		}, slow ? 40 : 280);

		return () => {
			if (timer) clearTimeout(timer);
		};
	});

	function onLoad() {
		loaded = true;
		showSkeleton = false;
	}
</script>

<span class="img-shell {className}">
	{#if showSkeleton && !loaded}
		<span class="img-bone" aria-hidden="true"></span>
	{/if}
	<img
		{src}
		{alt}
		width="640"
		height="400"
		loading="lazy"
		decoding="async"
		class="img-real"
		class:is-ready={loaded}
		onload={onLoad}
	/>
</span>

<style>
	.img-shell {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.img-bone {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--fg) 6%, transparent) 0%,
			color-mix(in srgb, var(--fg) 12%, transparent) 50%,
			color-mix(in srgb, var(--fg) 6%, transparent) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.15s ease-in-out infinite;
	}

	.img-real {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0;
		transition: opacity 0.35s ease, transform 0.45s ease;
	}

	.img-real.is-ready {
		opacity: 1;
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
		.img-bone {
			animation: none;
		}

		.img-real {
			transition: none;
		}
	}
</style>
