<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import gsap from 'gsap';
	import { Mail, Moon, Sun } from '@lucide/svelte';
	import { applyTheme, getStoredTheme, toggleTheme, type Theme } from '$lib/theme';

	type NavItem =
		| { label: string; href: string; enabled: true }
		| { label: string; enabled: false };

	const links: NavItem[] = [
		{ label: 'Home', href: '/', enabled: true },
		{ label: 'About', href: '/about/', enabled: true },
		{ label: 'Projects', href: '/projects/', enabled: true },
		{ label: 'Skills', enabled: false },
		{ label: 'Experience', enabled: false },
		{ label: 'Contact', enabled: false }
	];

	let open = $state(false);
	let theme = $state<Theme>('dark');
	let navHidden = $state(false);
	let menuMounted = $state(false);
	let animating = $state(false);

	let overlayEl: HTMLDivElement | undefined = $state();
	let panelEl: HTMLElement | undefined = $state();

	const pathname = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const isHome = $derived(pathname === '/');
	const isAbout = $derived(pathname.startsWith('/about'));
	const isProjects = $derived(pathname.startsWith('/projects'));

	onMount(() => {
		theme = getStoredTheme();
		applyTheme(theme);

		let lastY = window.scrollY;

		const onScroll = () => {
			const y = window.scrollY;
			const goingDown = y > lastY;
			if (open || menuMounted) {
				navHidden = false;
			} else if (y < 48) {
				navHidden = false;
			} else if (goingDown && y - lastY > 4) {
				navHidden = true;
			} else if (!goingDown && lastY - y > 4) {
				navHidden = false;
			}
			lastY = y;
		};

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && (open || menuMounted)) void closeMenu();
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('keydown', onKey);
		};
	});

	async function openMenu() {
		if (animating || open) return;
		animating = true;
		navHidden = false;
		menuMounted = true;
		open = true;
		await tick();

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const overlay = overlayEl;
		const panel = panelEl;
		if (reduce || !overlay || !panel) {
			animating = false;
			document.body.style.overflow = 'hidden';
			return;
		}

		document.body.style.overflow = 'hidden';
		gsap.set(overlay, { opacity: 0 });
		gsap.set(panel, { y: -10, opacity: 0, scale: 0.96 });
		gsap.set('.mobile-nav-item', { y: 8, opacity: 0 });

		gsap
			.timeline({
				defaults: { ease: 'power3.out' },
				onComplete: () => {
					animating = false;
				}
			})
			.to(overlay, { opacity: 1, duration: 0.22 }, 0)
			.to(panel, { y: 0, opacity: 1, scale: 1, duration: 0.34 }, 0.02)
			.to('.mobile-nav-item', { y: 0, opacity: 1, duration: 0.26, stagger: 0.035 }, 0.1);
	}

	async function closeMenu() {
		if (animating || !menuMounted) {
			open = false;
			menuMounted = false;
			document.body.style.overflow = '';
			return;
		}

		animating = true;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const overlay = overlayEl;
		const panel = panelEl;

		if (reduce || !overlay || !panel) {
			open = false;
			menuMounted = false;
			animating = false;
			document.body.style.overflow = '';
			return;
		}

		await new Promise<void>((resolve) => {
			gsap
				.timeline({
					defaults: { ease: 'power2.in' },
					onComplete: resolve
				})
				.to('.mobile-nav-item', { y: -4, opacity: 0, duration: 0.12, stagger: 0.02 }, 0)
				.to(panel, { y: -8, opacity: 0, scale: 0.97, duration: 0.22 }, 0.03)
				.to(overlay, { opacity: 0, duration: 0.18 }, 0.05);
		});

		open = false;
		menuMounted = false;
		animating = false;
		document.body.style.overflow = '';
		navHidden = false;
	}

	function toggleMenu() {
		if (open || menuMounted) void closeMenu();
		else void openMenu();
	}

	function onToggleTheme() {
		theme = toggleTheme(theme);
	}

	function goLink() {
		void closeMenu();
	}
</script>

<header
	class="site-header pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5"
	class:site-header-hidden={navHidden && !menuMounted}
>
	<nav
		class="nav-shell pointer-events-auto flex w-full max-w-[980px] items-center justify-between gap-3 px-2 py-2 sm:px-2 sm:py-2.5"
		class:nav-shell-open={menuMounted}
		aria-label="Primary"
	>
		<a href="/" class="signature-link shrink-0" aria-label="Mr. Usman — Home" onclick={goLink}>
			<span class="signature" role="img" aria-hidden="true"></span>
		</a>

		<ul class="desktop-links hidden items-center gap-5 lg:flex xl:gap-6">
			{#each links as link}
				<li>
					{#if link.enabled}
						<a
							href={link.href}
							class="nav-link text-[12px] font-medium tracking-wide transition-colors"
							class:active={(link.href === '/' && isHome) ||
								(link.href.startsWith('/about') && isAbout) ||
								(link.href.startsWith('/projects') && isProjects)}
							onclick={goLink}
						>
							{link.label}
						</a>
					{:else}
						<span class="nav-link text-[12px] font-medium tracking-wide">{link.label}</span>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<button
				type="button"
				class="theme-btn inline-flex h-10 w-10 items-center justify-center rounded-full border transition sm:h-9 sm:w-9"
				aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
				onclick={onToggleTheme}
			>
				{#if theme === 'dark'}
					<Sun class="h-4 w-4" strokeWidth={2} />
				{:else}
					<Moon class="h-4 w-4" strokeWidth={2} />
				{/if}
			</button>

			<span
				class="contact-btn hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-wide lg:inline-flex"
			>
				<Mail class="h-3.5 w-3.5" strokeWidth={2} />
				Contact Us
			</span>

			<button
				type="button"
				class="burger"
				class:burger-open={menuMounted}
				aria-expanded={menuMounted}
				aria-controls="mobile-nav"
				aria-label={menuMounted ? 'Close menu' : 'Open menu'}
				onclick={toggleMenu}
			>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</nav>
</header>

{#if menuMounted}
	<div
		bind:this={overlayEl}
		class="mobile-overlay"
		role="presentation"
		onclick={closeMenu}
	>
		<div
			bind:this={panelEl}
			id="mobile-nav"
			class="mobile-panel"
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<ul class="mobile-list">
				{#each links as link}
					<li class="mobile-nav-item">
						{#if link.enabled}
							<a
								href={link.href}
								class="mobile-link"
								class:active={(link.href === '/' && isHome) ||
									(link.href.startsWith('/about') && isAbout) ||
									(link.href.startsWith('/projects') && isProjects)}
								onclick={goLink}
							>
								{link.label}
							</a>
						{:else}
							<span class="mobile-link mobile-link-static">{link.label}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.site-header {
		transform: translateY(0);
		opacity: 1;
		transition:
			transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.35s ease;
		will-change: transform, opacity;
	}

	.site-header-hidden {
		transform: translateY(-120%);
		opacity: 0;
		pointer-events: none;
	}

	.nav-shell {
		background: transparent;
		border: 0;
		box-shadow: none;
		color: var(--fg);
		transition:
			background-color 0.35s ease,
			border-color 0.35s ease,
			backdrop-filter 0.35s ease;
	}

	@media (max-width: 1023px) {
		.nav-shell {
			border: 1px solid color-mix(in srgb, var(--fg) 10%, transparent);
			border-radius: 1.15rem;
			padding-inline: 0.75rem;
			background: color-mix(in srgb, var(--bg) 72%, transparent);
			backdrop-filter: blur(14px);
			box-shadow: 0 10px 36px color-mix(in srgb, #000 18%, transparent);
		}

		.nav-shell-open {
			border-color: color-mix(in srgb, var(--fg) 18%, transparent);
			background: color-mix(in srgb, var(--bg) 88%, transparent);
		}

		.signature-link {
			transform: translate(0.35rem, 0) !important;
		}
	}

	.signature-link {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		transform: translate(2.35rem, 0.1rem);
	}

	@media (min-width: 640px) {
		.signature-link {
			transform: translate(3.25rem, 0.05rem);
		}
	}

	@media (min-width: 1024px) {
		.signature-link {
			transform: translate(4.25rem, 0);
		}
	}

	.signature {
		display: block;
		width: clamp(7rem, 34vw, 10.5rem);
		height: clamp(1.85rem, 4.8vw, 2.65rem);
		background-color: var(--fg);
		-webkit-mask-image: url('/signature-mask.png');
		mask-image: url('/signature-mask.png');
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: left center;
		mask-position: left center;
		transition: background-color 0.35s ease;
	}

	.nav-link {
		color: var(--nav-link);
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
		letter-spacing: 0.02em;
	}

	a.nav-link:hover {
		color: var(--fg);
	}

	.nav-link.active {
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 6px;
		text-decoration-thickness: 1px;
	}

	.theme-btn {
		border-color: var(--theme-btn-border);
		color: var(--fg);
		background: transparent;
	}

	.theme-btn:hover {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	.contact-btn {
		border-color: color-mix(in srgb, var(--fg) 70%, transparent);
		color: var(--fg);
	}

	/* Burger: mobile only */
	.burger {
		position: relative;
		display: inline-flex;
		width: 2.5rem;
		height: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		border: 1px solid var(--theme-btn-border);
		background: transparent;
		cursor: pointer;
		color: var(--fg);
	}

	@media (min-width: 1024px) {
		.burger {
			display: none !important;
		}
	}

	.burger-line {
		position: absolute;
		left: 50%;
		width: 1rem;
		height: 1.5px;
		border-radius: 999px;
		background: currentColor;
		transform: translateX(-50%);
		transition:
			transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.28s ease,
			top 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.burger-line:nth-child(1) {
		top: calc(50% - 5px);
	}

	.burger-line:nth-child(2) {
		top: 50%;
	}

	.burger-line:nth-child(3) {
		top: calc(50% + 5px);
	}

	.burger-open .burger-line:nth-child(1) {
		top: 50%;
		transform: translateX(-50%) rotate(45deg);
	}

	.burger-open .burger-line:nth-child(2) {
		opacity: 0;
		transform: translateX(-50%) scaleX(0.4);
	}

	.burger-open .burger-line:nth-child(3) {
		top: 50%;
		transform: translateX(-50%) rotate(-45deg);
	}

	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 45;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 4.65rem 0.85rem 1rem;
		background: color-mix(in srgb, #000 28%, transparent);
	}

	@media (min-width: 1024px) {
		.mobile-overlay {
			display: none !important;
		}
	}

	.mobile-panel {
		width: min(11.5rem, 48vw);
		max-height: none;
		height: auto;
		padding: 0.45rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in srgb, var(--fg) 14%, transparent);
		background: color-mix(in srgb, var(--bg) 94%, var(--fg));
		box-shadow: 0 16px 40px color-mix(in srgb, #000 32%, transparent);
		overflow: hidden;
	}

	.mobile-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.15rem;
	}

	.mobile-link {
		display: block;
		padding: 0.62rem 0.8rem;
		border-radius: 0.7rem;
		color: var(--nav-link);
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.mobile-link-static {
		opacity: 0.55;
	}

	a.mobile-link:active {
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	.mobile-link.active {
		color: var(--fg);
		background: color-mix(in srgb, var(--fg) 8%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.site-header,
		.burger-line,
		.mobile-link {
			transition: none;
		}
	}
</style>
