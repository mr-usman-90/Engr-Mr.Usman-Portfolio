<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let stageEl: HTMLDivElement | undefined = $state();

	afterNavigate(({ type }) => {
		if (!stageEl) return;

		// Instant restore for browser back/forward — no fade/slide delay.
		if (type === 'popstate') {
			gsap.set(stageEl, { clearProps: 'all' });
			return;
		}

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			gsap.set(stageEl, { clearProps: 'all' });
			return;
		}

		gsap.fromTo(
			stageEl,
			{ opacity: 0, y: 18 },
			{
				opacity: 1,
				y: 0,
				duration: 0.55,
				ease: 'power3.out',
				clearProps: 'all'
			}
		);
	});
</script>

<div bind:this={stageEl} class="page-stage" data-path={page.url.pathname}>
	{@render children()}
</div>

<style>
	.page-stage {
		position: relative;
		z-index: 1;
		min-height: 100dvh;
	}
</style>
