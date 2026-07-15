<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let stageEl: HTMLDivElement | undefined = $state();

	afterNavigate(() => {
		if (!stageEl) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			gsap.set(stageEl, { clearProps: 'all' });
			return;
		}

		gsap.fromTo(
			stageEl,
			{ opacity: 0, y: 22 },
			{ opacity: 1, y: 0, duration: 0.58, ease: 'power3.out', clearProps: 'transform' }
		);
	});
</script>

<div bind:this={stageEl} class="page-stage" data-path={page.url.pathname}>
	{@render children()}
</div>

<style>
	.page-stage {
		min-height: 100dvh;
		will-change: opacity, transform;
	}
</style>
