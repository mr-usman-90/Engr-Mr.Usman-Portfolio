<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import { Download, Rocket } from '@lucide/svelte';
	import CvModal from './CvModal.svelte';

	const leftSnippets = [
		`const developer = {
  name: "Engr.Mr.Usman",
  role: "Software Engineer",
  focus: "Building Scalable Solutions"
};`,
		`function solveProblem(problem) {
  // Think, Code, Debug
  return solution;
}`,
		`if (passion === true) {
  keepCoding();
}`
	];

	const rightSnippets = [
		`import React from 'react';
import { useState } from 'react';`,
		`const skills = [
  "JavaScript", "React",
  "Node.js", "Docker", "AWS"
];`,
		`git commit -m "Progress"
git push origin main`
	];

	const socials = [
		{
			label: 'GitHub',
			href: 'https://github.com/engr-mr-usman',
			path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
		},
		{
			label: 'WhatsApp',
			href: 'https://wa.me/923106565892',
			path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
		},
		{
			label: 'Facebook',
			href: 'https://www.facebook.com/mr.usmanjutt90',
			path: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z'
		},
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/engr.mr.usman',
			path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/engr-mr-usman',
			path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		}
	] as const;

	let heroEl: HTMLElement | undefined = $state();
	let leftTyped = $state<string[]>(leftSnippets.map(() => ''));
	let rightTyped = $state<string[]>(rightSnippets.map(() => ''));
	let leftActive = $state(0);
	let rightActive = $state(0);
	let leftDone = $state(false);
	let rightDone = $state(false);
	let cvOpen = $state(false);

	function pressInteractive(node: HTMLElement): Promise<void> {
		gsap.killTweensOf(node);
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return Promise.resolve();

		return new Promise((resolve) => {
			gsap
				.timeline({ onComplete: resolve })
				.to(node, { scale: 0.94, y: 2, duration: 0.14, ease: 'power2.in' })
				.to(node, { scale: 1, y: 0, duration: 0.36, ease: 'power3.out' });
		});
	}

	async function onProjectsClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		e.preventDefault();
		await pressInteractive(e.currentTarget);
		await goto('/projects/');
	}

	async function onDownloadCv(e: MouseEvent & { currentTarget: HTMLButtonElement }) {
		e.preventDefault();
		await pressInteractive(e.currentTarget);
		cvOpen = true;
	}

	async function onSocialClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		e.preventDefault();
		const href = e.currentTarget.href;
		await pressInteractive(e.currentTarget);
		window.open(href, '_blank', 'noopener,noreferrer');
	}

	async function typeSnippets(
		sources: string[],
		onUpdate: (next: string[], active: number) => void,
		onDone: () => void,
		speed = 12
	) {
		const next = sources.map(() => '');
		onUpdate([...next], 0);

		for (let i = 0; i < sources.length; i++) {
			const text = sources[i];
			for (let c = 0; c < text.length; c++) {
				next[i] = text.slice(0, c + 1);
				onUpdate([...next], i);
				await new Promise((r) => setTimeout(r, speed));
			}
			await new Promise((r) => setTimeout(r, 220));
		}

		onDone();
	}

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduce) {
			leftTyped = [...leftSnippets];
			rightTyped = [...rightSnippets];
			leftDone = true;
			rightDone = true;
		} else {
			void typeSnippets(
				leftSnippets,
				(v, a) => {
					leftTyped = v;
					leftActive = a;
				},
				() => (leftDone = true),
				11
			);
			void typeSnippets(
				rightSnippets,
				(v, a) => {
					rightTyped = v;
					rightActive = a;
				},
				() => (rightDone = true),
				11
			);
		}

		if (!heroEl || reduce) return;

		const scope = heroEl;
		const ensureVisible = () => {
			if (!scope.isConnected) return;
			const nodes = scope.querySelectorAll(
				'.hero-cta, .social-item, .hero-name, .hero-role, .hero-sep, .profile-ring'
			);
			if (!nodes.length) return;
			gsap.set(nodes, { autoAlpha: 1, clearProps: 'transform' });
		};

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: 'power3.out' },
				onComplete: ensureVisible
			});

			tl.fromTo(
				'.profile-ring',
				{ scale: 0.82, autoAlpha: 0 },
				{ scale: 1, autoAlpha: 1, duration: 0.85, ease: 'back.out(1.4)' }
			)
				.fromTo('.hero-name', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.35')
				.fromTo('.hero-sep', { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.45 }, '-=0.25')
				.fromTo(
					'.hero-role',
					{ autoAlpha: 0, y: 12 },
					{ autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
					'-=0.2'
				)
				.fromTo(
					'.hero-cta',
					{ autoAlpha: 0, y: 16 },
					{ autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
					'-=0.15'
				)
				.fromTo(
					'.social-item',
					{ autoAlpha: 0, y: 14 },
					{ autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 },
					'-=0.2'
				);

			gsap.to('.profile-glow', {
				boxShadow: '0 0 42px rgba(255,255,255,0.55), 0 0 80px rgba(255,255,255,0.22)',
				duration: 2.4,
				yoyo: true,
				repeat: -1,
				ease: 'sine.inOut'
			});
		}, scope);

		return () => {
			ctx.revert();
		};
	});
</script>

<section
	bind:this={heroEl}
	id="home"
	class="hero relative flex min-h-dvh flex-col overflow-hidden"
	aria-label="Hero"
>
	<div class="hero-radial pointer-events-none absolute inset-0" aria-hidden="true"></div>

	<div class="relative z-10 flex flex-1 flex-col">
		<div
			class="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:py-16 xl:px-8"
		>
			<aside
				class="code-col hidden select-none lg:flex lg:flex-col lg:justify-center lg:gap-10"
				aria-hidden="true"
			>
				{#each leftTyped as snippet, i}
					<pre
						class="code-snippet font-mono text-[11px] leading-relaxed xl:text-xs"
						class:ml-2={i === 1}
						class:ml-6={i === 2}
						>{snippet}{#if !leftDone && leftActive === i}<span class="type-caret">|</span>{/if}</pre
					>
				{/each}
			</aside>

			<div class="hero-center flex flex-col items-center text-center">
				<div
					class="profile-ring profile-glow relative mb-7 h-[148px] w-[148px] rounded-full sm:mb-8 sm:h-[172px] sm:w-[172px] md:h-[188px] md:w-[188px]"
				>
					<img
						src="/profile.png"
						alt="Mr. Usman, Software Engineer"
						width="188"
						height="188"
						fetchpriority="high"
						decoding="async"
						class="profile-img h-full w-full rounded-full border-[3px] object-cover object-[50%_18%]"
					/>
				</div>

				<h1
					class="hero-name font-display text-[clamp(1.55rem,4.2vw,2.55rem)] font-extrabold tracking-[0.06em] uppercase"
				>
					ENGR.MR.USMAN
				</h1>

				<div class="hero-sep my-4 flex w-[min(280px,70vw)] items-center gap-3 sm:my-5" aria-hidden="true">
					<span class="sep-line sep-left h-px flex-1"></span>
					<span class="sep-dot h-1.5 w-1.5 shrink-0 rounded-full"></span>
					<span class="sep-line sep-right h-px flex-1"></span>
				</div>

				<p
					class="hero-role font-display text-[clamp(0.8rem,2vw,1.05rem)] font-semibold tracking-[0.28em] uppercase"
				>
					SOFTWARE ENGINEER
				</p>
				<p
					class="hero-role hero-role-muted mt-2 font-display text-[clamp(0.7rem,1.6vw,0.9rem)] font-medium tracking-[0.26em] uppercase"
				>
					FULL STACK DEVELOPER
				</p>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4">
					<a
						href="/projects/"
						class="hero-cta cta-solid interactive-press inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase sm:px-6 sm:py-3 sm:text-[13px]"
						onclick={onProjectsClick}
					>
						PROJECTS
						<Rocket class="h-4 w-4" strokeWidth={2.25} />
					</a>
					<button
						type="button"
						class="hero-cta cta-ghost interactive-press inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase sm:px-6 sm:py-3 sm:text-[13px]"
						onclick={onDownloadCv}
					>
						DOWNLOAD CV
						<Download class="h-4 w-4" strokeWidth={2.25} />
					</button>
				</div>

				<nav class="mt-7 sm:mt-8" aria-label="Social links">
					<ul class="flex max-w-xl items-stretch justify-center">
						{#each socials as social, i}
							<li class="social-item flex items-center">
								{#if i > 0}
									<span class="social-divider mx-2 h-10 w-px sm:mx-4" aria-hidden="true"></span>
								{/if}
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="interactive-press group flex flex-col items-center gap-2 px-1"
									aria-label={social.label}
									onclick={onSocialClick}
								>
									<span class="social-orb flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11">
										<svg class="social-svg h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true">
											<path d={social.path} />
										</svg>
									</span>
									<span class="social-label text-[10px] font-medium tracking-wide sm:text-[11px]"
										>{social.label}</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<aside
				class="code-col hidden select-none lg:flex lg:flex-col lg:items-end lg:justify-center lg:gap-10"
				aria-hidden="true"
			>
				{#each rightTyped as snippet, i}
					<pre
						class="code-snippet text-right font-mono text-[11px] leading-relaxed xl:text-xs"
						class:mr-2={i === 1}
						class:mr-6={i === 2}
						>{snippet}{#if !rightDone && rightActive === i}<span class="type-caret">|</span>{/if}</pre
					>
				{/each}
			</aside>
		</div>
	</div>
</section>

<CvModal open={cvOpen} onClose={() => (cvOpen = false)} />

<style>
	.hero {
		background: transparent;
		color: var(--fg);
		transition: color 0.35s ease;
	}

	.hero-radial {
		background: radial-gradient(ellipse at center, var(--radial), transparent 55%);
	}

	.code-snippet {
		color: var(--code);
	}

	.profile-img {
		border-color: var(--profile-border);
	}

	.profile-glow {
		box-shadow:
			0 0 28px color-mix(in srgb, var(--fg) 35%, transparent),
			0 0 56px color-mix(in srgb, var(--fg) 16%, transparent);
	}

	.hero-name,
	.hero-role {
		color: var(--fg);
	}

	.hero-role-muted {
		color: var(--muted);
	}

	.sep-left {
		background: linear-gradient(to right, transparent, var(--line));
	}

	.sep-right {
		background: linear-gradient(to left, transparent, var(--line));
	}

	.sep-dot {
		background: var(--fg);
		box-shadow: 0 0 8px color-mix(in srgb, var(--fg) 70%, transparent);
	}

	.cta-solid {
		text-decoration: none;
		background: var(--cta-solid-bg);
		color: var(--cta-solid-fg);
		box-shadow: 0 0 24px color-mix(in srgb, var(--fg) 28%, transparent);
	}

	.cta-ghost {
		border-color: var(--cta-ghost-border);
		color: var(--cta-ghost-fg);
	}

	.social-divider {
		background: var(--divider);
	}

	.social-label {
		color: var(--muted);
		transition: color 0.3s ease;
	}

	.group:hover .social-label {
		color: var(--fg);
	}

	.hero-cta,
	.social-item,
	.hero-name,
	.hero-sep,
	.hero-role,
	.profile-ring {
		opacity: 1;
		visibility: visible;
	}

	.interactive-press {
		transform: translateZ(0);
		will-change: transform;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}

	.social-orb {
		border: 1px solid var(--social-border);
		background: transparent;
		color: var(--fg);
		box-shadow: 0 0 14px var(--social-shadow);
		transition:
			background-color 0.35s ease,
			border-color 0.35s ease,
			box-shadow 0.35s ease,
			color 0.35s ease,
			transform 0.35s ease;
	}

	.social-svg {
		fill: currentColor;
		transition: fill 0.35s ease;
	}

	.group:hover .social-orb {
		background: var(--social-fill-bg);
		border-color: var(--social-fill-bg);
		color: var(--social-fill-fg);
		box-shadow: 0 0 22px color-mix(in srgb, var(--fg) 35%, transparent);
	}

	.type-caret {
		display: inline-block;
		margin-left: 1px;
		color: var(--code-caret);
		animation: blink 0.9s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.font-display {
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
		font-feature-settings: 'ss01' on;
		letter-spacing: inherit;
	}

	.font-mono {
		font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		letter-spacing: 0;
	}

	.hero-name {
		letter-spacing: 0.06em;
		font-weight: 800;
	}

	.hero-cta {
		font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
		letter-spacing: 0.14em;
	}
</style>
