<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import 'lenis/dist/lenis.css';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let lenis: Lenis | null = null;
		let tickerBound = false;

		const canUseSmooth = () =>
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth >= 768;

		const destroyLenis = () => {
			if (lenis) {
				lenis.destroy();
				lenis = null;
			}
			document.documentElement.classList.remove('lenis-active');
		};

		const setupLenis = () => {
			destroyLenis();
			if (!canUseSmooth()) return;

			lenis = new Lenis({
				lerp: 0.08,
				smoothWheel: true,
				syncTouch: false,
				wheelMultiplier: 1,
				touchMultiplier: 1.1,
				autoRaf: false,
				anchors: true
			});

			lenis.on('scroll', ScrollTrigger.update);
			document.documentElement.classList.add('lenis-active');

			if (!tickerBound) {
				gsap.ticker.add((time) => {
					lenis?.raf(time * 1000);
				});
				gsap.ticker.lagSmoothing(0);
				tickerBound = true;
			}
		};

		if (!reduce) setupLenis();

		const onResize = () => {
			if (reduce) return;
			setupLenis();
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
			destroyLenis();
		};
	});
</script>
