<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const phoneDisplay = '(260) 248-1269';
	const phoneHref = '+12602481269';
	let navOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>BBSystems.US — IT Consulting, PC Repair & Custom Computer Builds</title>
	<meta
		name="description"
		content="IT consulting, PC repair, and custom Bully Built computers serving Pierceton, IN and the surrounding area — on-site and remote support nationwide."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-950 text-slate-100">
	<header class="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
			<a href="/" class="flex items-center gap-3">
				<img src="/images/logo.png" alt="BBSystems.US logo" class="h-10 w-10 object-contain" />
				<span class="text-lg font-bold tracking-tight text-white">BBSystems<span class="text-cyan-400">.US</span></span>
			</a>

			<nav class="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
				<a href="#services" class="transition hover:text-cyan-400">Services</a>
				<a href="#builds" class="transition hover:text-cyan-400">Builds</a>
				<a href="#service-area" class="transition hover:text-cyan-400">Service Area</a>
				<a href="#contact" class="transition hover:text-cyan-400">Contact</a>
			</nav>

			<a
				href="tel:{phoneHref}"
				class="hidden rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 md:inline-block"
			>
				Call/Text {phoneDisplay}
			</a>

			<button
				class="text-slate-200 md:hidden"
				aria-label="Toggle menu"
				aria-expanded={navOpen}
				onclick={() => (navOpen = !navOpen)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					{#if navOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		{#if navOpen}
			<nav class="flex flex-col gap-1 border-t border-slate-800 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-300 md:hidden">
				<a href="#services" class="rounded px-2 py-2 hover:bg-slate-900" onclick={() => (navOpen = false)}>Services</a>
				<a href="#builds" class="rounded px-2 py-2 hover:bg-slate-900" onclick={() => (navOpen = false)}>Builds</a>
				<a href="#service-area" class="rounded px-2 py-2 hover:bg-slate-900" onclick={() => (navOpen = false)}>Service Area</a>
				<a href="#contact" class="rounded px-2 py-2 hover:bg-slate-900" onclick={() => (navOpen = false)}>Contact</a>
				<a href="tel:{phoneHref}" class="mt-2 rounded-full bg-cyan-500 px-4 py-2 text-center font-semibold text-slate-950">
					Call/Text {phoneDisplay}
				</a>
			</nav>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer id="contact" class="border-t border-slate-800 bg-slate-950">
		<div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
			<div>
				<div class="flex items-center gap-3">
					<img src="/images/logo.png" alt="BBSystems.US logo" class="h-9 w-9 object-contain" />
					<span class="text-lg font-bold text-white">BBSystems.US</span>
				</div>
				<p class="mt-3 text-sm text-slate-400">
					IT consulting, PC repair, and custom Bully Built computers. Call or text anytime with a question or to
					schedule an appointment.
				</p>
			</div>

			<div class="text-sm text-slate-400">
				<h3 class="mb-3 text-xs font-semibold tracking-wide text-slate-200 uppercase">Contact</h3>
				<ul class="space-y-2">
					<li>
						<a href="tel:{phoneHref}" class="transition hover:text-cyan-400">Call: {phoneDisplay}</a>
					</li>
					<li>
						<a href="sms:{phoneHref}" class="transition hover:text-cyan-400">Text: {phoneDisplay}</a>
					</li>
					<li>820 W Tower St, Pierceton, IN 46562</li>
				</ul>
			</div>

			<div class="text-sm text-slate-400">
				<h3 class="mb-3 text-xs font-semibold tracking-wide text-slate-200 uppercase">Service Area</h3>
				<ul class="space-y-2">
					<li>On-site: within a 90-mile radius</li>
					<li>Remote support: anywhere in the USA</li>
				</ul>
			</div>
		</div>

		<div class="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
			&copy; {new Date().getFullYear()} BBSystems.US. All rights reserved.
		</div>
	</footer>
</div>
