<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mr.Usman-Software Engineer</title>
	<meta
		name="description"
		content="Premium portfolio of Mr. Usman — Software Engineer & DevOps Engineer. Building scalable solutions with modern web technologies."
	/>
	<meta name="author" content="Mr. Usman" />
	<meta name="theme-color" content="#050505" />
	<meta property="og:title" content="Mr.Usman-Software Engineer" />
	<meta
		property="og:description"
		content="Software Engineer & DevOps Engineer portfolio. Projects, skills, and experience."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/profile.png" />
	<meta name="twitter:card" content="summary" />
	<link rel="canonical" href="https://usmanfarooq.dev/" />
</svelte:head>

<Navbar />
{@render children()}
