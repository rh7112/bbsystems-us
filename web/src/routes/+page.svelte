<script lang="ts">
	import { reveal, spotlight, countUp } from '#lib/actions';

	const phoneDisplay = '(260) 248-1269';
	const phoneHref = '+12602481269';
	const reviewsUrl =
		'https://www.google.com/maps/search/?api=1&query=BBSystems.US+820+W+Tower+St+Pierceton+IN+46562';
	const mapsUrl = 'https://maps.app.goo.gl/hNE1DM1Uy4cAfbpw7';
	const description =
		'IT consulting, PC repair, and custom Bully Built computers serving Pierceton, IN and the surrounding area — on-site and remote support nationwide.';

	// Heroicons (outline, MIT) path data, one per service card.
	const services = [
		{
			name: 'Hardware Solutions',
			icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z',
			items: [
				'PC Repair, Upgrade Hardware, Data Recovery, Backup or Destruction',
				"Custom built computers to fit your computing needs — ask about our current Bully Builds in stock",
				'3D Printing'
			]
		},
		{
			name: 'IT Support — Remote & Local',
			icon: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25',
			items: [
				'Support calls: help, advice, service, FAQ, remote access',
				'Installing and configuring computer hardware, software, systems, networks, printers, etc.',
				'Repair for breakdowns and failures in system hardware'
			]
		},
		{
			name: 'Data Science Solutions',
			icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
			items: [
				'Large database design, querying, and extraction',
				'Uploading, automating, and analysis',
				'Mass modifying, deleting, and more'
			]
		},
		{
			name: 'Website Design & Hosting',
			icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
			items: [
				'Custom websites, from a single-page site to a larger business build',
				'We design, build, and host it for you',
				'Ongoing management & maintenance available',
				'Reach out for pricing — every project is scoped individually'
			]
		}
	];

	const gallery = [
		{ src: '/images/gallery/build-front.jpg', alt: 'Custom build with illuminated ASUS ROG front panel' },
		{ src: '/images/gallery/build-cooling.jpg', alt: 'Interior shot of a build with RGB cooling and cable management' },
		{ src: '/images/gallery/build-rog.jpg', alt: 'Republic of Gamers themed build with a BBSystems.US decal' },
		{ src: '/images/gallery/build-white.jpg', alt: 'All-white custom build with RGB fans' },
		{ src: '/images/gallery/build-green-rgb.jpg', alt: 'Custom build with green RGB fan lighting' },
		{ src: '/images/gallery/build-red-rgb.jpg', alt: 'Custom build with red and rainbow RGB lighting' }
	];

	const steps = [
		{ title: 'Reach out', body: 'Request an appointment or send a message — call/text works too if it’s urgent.' },
		{ title: 'Diagnose & quote', body: 'We work out what’s wrong (or what you need) and agree on pricing with you directly.' },
		{ title: 'Fixed or built', body: 'Repairs, upgrades, builds, support, or a new website — handled on-site or remotely.' }
	];

	// ---- Hero typing line ----
	const phrases = ['PC repair', 'custom builds', 'IT support', 'data solutions', 'website design'];
	let typed = $state(phrases[0]);

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let phrase = 0;
		let chars = phrases[0].length;
		let deleting = true; // first phrase is already shown; start by erasing it
		let timer: ReturnType<typeof setTimeout>;

		const tick = () => {
			const current = phrases[phrase];
			if (deleting) {
				chars -= 1;
			} else {
				chars += 1;
			}
			typed = current.slice(0, Math.max(0, chars));

			let delay = deleting ? 35 : 75;
			if (!deleting && chars >= current.length) {
				deleting = true;
				delay = 1600;
			} else if (deleting && chars <= 0) {
				deleting = false;
				phrase = (phrase + 1) % phrases.length;
				delay = 300;
			}
			timer = setTimeout(tick, delay);
		};
		timer = setTimeout(tick, 2200);

		return () => clearTimeout(timer);
	});

	// ---- Gallery lightbox ----
	let lightbox = $state<number | null>(null);
	let closeButton = $state<HTMLButtonElement>();

	function openLightbox(index: number) {
		lightbox = index;
	}
	function closeLightbox() {
		lightbox = null;
	}
	function step(delta: number) {
		if (lightbox === null) return;
		lightbox = (lightbox + delta + gallery.length) % gallery.length;
	}
	function onKeydown(event: KeyboardEvent) {
		if (lightbox === null) return;
		if (event.key === 'Escape') closeLightbox();
		else if (event.key === 'ArrowRight') step(1);
		else if (event.key === 'ArrowLeft') step(-1);
	}

	$effect(() => {
		if (lightbox === null) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeButton?.focus();
		return () => {
			document.body.style.overflow = previous;
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>BBSystems.US — IT Consulting, PC Repair & Custom Computer Builds</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://bbsystems.us/" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="BBSystems.US — IT Consulting, PC Repair & Custom Computer Builds" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://bbsystems.us/" />
	<meta property="og:site_name" content="BBSystems.US" />
	<meta property="og:image" content="https://bbsystems.us/images/logo.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="BBSystems.US — IT Consulting, PC Repair & Custom Computer Builds" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://bbsystems.us/images/logo.png" />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden border-b border-slate-800">
	<div class="circuit-grid pointer-events-none absolute inset-0"></div>
	<div class="orb -top-24 -left-24 h-80 w-80 bg-cyan-500/40"></div>
	<div class="orb -top-10 right-0 h-72 w-72 bg-purple-500/40 [animation-delay:-6s]"></div>

	<div class="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
		<p class="text-sm font-semibold tracking-widest text-cyan-400 uppercase">Pierceton, IN</p>
		<h1 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
			IT Consulting, PC Repair &amp; <span class="gradient-text">Custom Computers</span>
		</h1>

		<!-- Decorative typing line; the screen-reader text below is static. -->
		<p
			class="mt-6 inline-flex items-center rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-2 font-mono text-sm text-slate-300 sm:text-base"
			aria-hidden="true"
		>
			<span class="mr-2 text-cyan-400">&gt;</span>
			<span>we handle&nbsp;</span>
			<span class="min-w-[1ch] text-cyan-300">{typed}</span><span class="caret h-4 text-cyan-400 sm:h-5"></span>
		</p>
		<p class="sr-only">Services: {phrases.join(', ')}.</p>

		<p class="mt-6 max-w-2xl text-lg text-slate-300">
			Hardware repair, custom Bully Built PCs, remote and local IT support, and data solutions — request an
			appointment to get things diagnosed, or reach out with a question.
		</p>
		<div class="mt-8 flex flex-wrap gap-4">
			<a
				href="/#contact"
				class="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/30"
			>
				Request an Appointment
			</a>
			<a
				href="tel:{phoneHref}"
				class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-400"
			>
				Call/Text {phoneDisplay}
			</a>
		</div>
	</div>
</section>

<!-- Quick facts -->
<section class="border-b border-slate-800 bg-slate-900/40">
	<dl class="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-8 sm:px-6 md:grid-cols-4">
		<div class="px-2 py-3 text-center" use:reveal={0}>
			<dt class="text-xs tracking-wide text-slate-400 uppercase">Google rating</dt>
			<dd class="text-3xl font-extrabold text-white">
				<span use:countUp={{ to: 5, decimals: 1 }}>5.0</span>
			</dd>
		</div>
		<div class="px-2 py-3 text-center" use:reveal={80}>
			<dt class="text-xs tracking-wide text-slate-400 uppercase">On-site radius</dt>
			<dd class="text-3xl font-extrabold text-white">
				<span use:countUp={{ to: 90 }}>90</span> <span class="text-lg text-cyan-400">miles</span>
			</dd>
		</div>
		<div class="px-2 py-3 text-center" use:reveal={160}>
			<dt class="text-xs tracking-wide text-slate-400 uppercase">Service lines</dt>
			<dd class="text-3xl font-extrabold text-white">
				<span use:countUp={{ to: 4 }}>4</span>
			</dd>
		</div>
		<div class="px-2 py-3 text-center" use:reveal={240}>
			<dt class="text-xs tracking-wide text-slate-400 uppercase">Remote support</dt>
			<dd class="text-3xl font-extrabold text-white">Anywhere in the USA</dd>
		</div>
	</dl>
</section>

<!-- Services -->
<section id="services" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
	<div use:reveal>
		<h2 class="text-3xl font-bold text-white">What We Do</h2>
		<p class="mt-3 max-w-2xl text-slate-400">
			Pricing is worked out with you directly based on what you need — request an appointment to get a quote.
		</p>
	</div>

	<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
		{#each services as service, i (service.name)}
			<div
				class="spot rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
				use:spotlight
				use:reveal={i * 90}
			>
				<span
					class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-6 w-6"
						aria-hidden="true"
					>
						<path d={service.icon} />
					</svg>
				</span>
				<h3 class="text-xl font-semibold text-cyan-400">{service.name}</h3>
				<ul class="mt-4 space-y-3 text-sm text-slate-300">
					{#each service.items as item (item)}
						<li class="flex gap-2">
							<span class="mt-1 text-cyan-500">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<!-- How it works -->
<section class="border-t border-slate-800 bg-slate-900/30">
	<div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
		<h2 class="text-3xl font-bold text-white" use:reveal>How It Works</h2>
		<ol class="mt-12 grid gap-8 md:grid-cols-3">
			{#each steps as stepItem, i (stepItem.title)}
				<li class="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6" use:reveal={i * 120}>
					<span class="font-mono text-4xl font-extrabold text-cyan-500/30">0{i + 1}</span>
					<h3 class="mt-2 text-lg font-semibold text-white">{stepItem.title}</h3>
					<p class="mt-2 text-sm text-slate-400">{stepItem.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- Builds / Gallery -->
<section id="builds" class="border-t border-slate-800">
	<div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
		<div use:reveal>
			<h2 class="text-3xl font-bold text-white">Bully Builds</h2>
			<p class="mt-3 max-w-2xl text-slate-400">
				A few recent custom builds — tap a photo to see it larger. Ask what's currently in stock.
			</p>
		</div>

		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each gallery as photo, i (photo.src)}
				<button
					type="button"
					class="photo border border-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
					aria-label="View larger: {photo.alt}"
					onclick={() => openLightbox(i)}
					use:reveal={(i % 3) * 90}
				>
					<img src={photo.src} alt={photo.alt} loading="lazy" class="aspect-square w-full object-cover" />
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Service area + reviews -->
<section id="service-area" class="border-t border-slate-800 bg-slate-900/30">
	<div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="spot rounded-2xl border border-slate-800 bg-slate-900/50 p-8" use:spotlight use:reveal>
				<h2 class="text-2xl font-bold text-white">Service Area</h2>
				<ul class="mt-4 space-y-2 text-slate-300">
					<li><span class="font-semibold text-cyan-400">On-site:</span> within a 90-mile radius of Pierceton, IN</li>
					<li><span class="font-semibold text-cyan-400">Remote support:</span> anywhere in the USA</li>
				</ul>
			</div>

			<div class="spot rounded-2xl border border-slate-800 bg-slate-900/50 p-8" use:spotlight use:reveal={120}>
				<h2 class="text-2xl font-bold text-white">
					<span class="text-amber-400" aria-hidden="true">★★★★★</span> 5.0 Rating on Google
				</h2>
				<p class="mt-4 text-slate-300">
					See what customers are saying on our Google Business listing.
				</p>
				<a
					href={reviewsUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-6 inline-block rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
				>
					Read Reviews on Google →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Contact CTA -- the actual form now lives at /contact (also where the
     PCPartPicker list flow lives), so this is just a pointer there rather
     than a second copy of the same form. -->
<section id="contact" class="relative overflow-hidden border-t border-slate-800">
	<div class="orb top-0 left-1/2 h-64 w-64 -translate-x-1/2 bg-cyan-500/30"></div>
	<div class="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6" use:reveal>
		<h2 class="text-3xl font-bold text-white">Get In Touch</h2>
		<p class="mt-3 text-slate-400">
			Send a message to get a diagnostic scheduled or ask a question — we'll get back to you. Call/text
			{phoneDisplay} if it's urgent.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400"
			>
				Contact Us
			</a>
			<a
				href="tel:{phoneHref}"
				class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-400"
			>
				Call {phoneDisplay}
			</a>
		</div>
	</div>
</section>

<!-- Address + map -- requested in GH issue #21. Uses an OpenStreetMap
     embed rather than Google Maps: no API key, no billing account, no
     signup -- OSM's embed URL is just a bounding box + marker, entirely
     free. The address itself still links to the Google Maps location
     Cruz provided, since that's a plain hyperlink (no API involved) and
     opens in whatever maps app the visitor already uses. -->
<section class="border-t border-slate-800 bg-slate-900/30">
	<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6" use:reveal>
		<h2 class="text-3xl font-bold text-white">Find Us</h2>
		<a
			href={mapsUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-3 inline-block text-lg text-slate-300 transition hover:text-cyan-400"
		>
			820 W Tower St, Pierceton, IN 46562
		</a>
		<div class="mt-8 overflow-hidden rounded-2xl border border-slate-800">
			<iframe
				title="Map showing BBSystems.US's location in Pierceton, IN"
				src="https://www.openstreetmap.org/export/embed.html?bbox=-85.717383%2C41.198644%2C-85.709383%2C41.204644&layer=mapnik&marker=41.201644%2C-85.713383"
				class="h-96 w-full"
				loading="lazy"
			></iframe>
		</div>
	</div>
</section>

<!-- Gallery lightbox -->
{#if lightbox !== null}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-label="Build photo viewer"
		onclick={(event) => {
			if (event.target === event.currentTarget) closeLightbox();
		}}
	>
		<figure class="lightbox-in flex max-h-full max-w-5xl flex-col items-center gap-3">
			<img
				src={gallery[lightbox].src}
				alt={gallery[lightbox].alt}
				class="max-h-[80vh] w-auto rounded-xl border border-slate-700 object-contain shadow-2xl"
			/>
			<figcaption class="text-center text-sm text-slate-300">
				{gallery[lightbox].alt}
				<span class="ml-2 text-slate-500">{lightbox + 1} / {gallery.length}</span>
			</figcaption>
		</figure>

		<button
			type="button"
			bind:this={closeButton}
			class="absolute top-4 right-4 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
			onclick={closeLightbox}
		>
			Close ✕
		</button>
		<button
			type="button"
			class="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-lg text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
			aria-label="Previous photo"
			onclick={() => step(-1)}
		>
			←
		</button>
		<button
			type="button"
			class="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-lg text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
			aria-label="Next photo"
			onclick={() => step(1)}
		>
			→
		</button>
	</div>
{/if}
