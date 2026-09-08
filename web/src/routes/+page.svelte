<script lang="ts">
	const phoneDisplay = '(260) 248-1269';
	const phoneHref = '+12602481269';
	const reviewsUrl =
		'https://www.google.com/maps/search/?api=1&query=BBSystems.US+820+W+Tower+St+Pierceton+IN+46562';
	const description =
		'IT consulting, PC repair, and custom Bully Built computers serving Pierceton, IN and the surrounding area — on-site and remote support nationwide.';

	const services = [
		{
			name: 'Hardware Solutions',
			items: [
				'PC Repair, Upgrade Hardware, Data Recovery, Backup or Destruction',
				"Custom built computers to fit your computing needs — ask about our current Bully Builds in stock",
				'3D Printing'
			]
		},
		{
			name: 'IT Support — Remote & Local',
			items: [
				'Support calls: help, advice, service, FAQ, remote access',
				'Installing and configuring computer hardware, software, systems, networks, printers, etc.',
				'Repair for breakdowns and failures in system hardware'
			]
		},
		{
			name: 'Data Science Solutions',
			items: [
				'Large database design, querying, and extraction',
				'Uploading, automating, and analysis',
				'Mass modifying, deleting, and more'
			]
		},
		{
			name: 'Website Design & Hosting',
			items: [
				'Website builds start at $500–$1,000+, depending on how static vs. dynamic the site needs to be — single-page sites fall at the lower end, larger business sites can run well beyond that',
				'We design, build, and host it for you',
				'Management & maintenance starts at $20+/mo, depending on the breadth of the project'
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

</script>

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
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.15),transparent_40%)]"
	></div>
	<div class="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
		<p class="text-sm font-semibold tracking-widest text-cyan-400 uppercase">Pierceton, IN</p>
		<h1 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
			IT Consulting, PC Repair &amp; Custom Computers
		</h1>
		<p class="mt-6 max-w-2xl text-lg text-slate-300">
			Hardware repair, custom Bully Built PCs, remote and local IT support, and data solutions — request an
			appointment to get things diagnosed, or reach out with a question.
		</p>
		<div class="mt-8 flex flex-wrap gap-4">
			<a
				href="/#contact"
				class="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
			>
				Request an Appointment
			</a>
			<a
				href="tel:{phoneHref}"
				class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
			>
				Call/Text {phoneDisplay}
			</a>
		</div>
	</div>
</section>

<!-- Services -->
<section id="services" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
	<h2 class="text-3xl font-bold text-white">What We Do</h2>
	<p class="mt-3 max-w-2xl text-slate-400">
		Pricing is worked out with you directly based on what you need — request an appointment to get a quote.
	</p>

	<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
		{#each services as service (service.name)}
			<div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
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

<!-- Builds / Gallery -->
<section id="builds" class="border-t border-slate-800 bg-slate-900/30">
	<div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
		<h2 class="text-3xl font-bold text-white">Bully Builds</h2>
		<p class="mt-3 max-w-2xl text-slate-400">A few recent custom builds. Ask what's currently in stock.</p>

		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each gallery as photo (photo.src)}
				<div class="overflow-hidden rounded-xl border border-slate-800">
					<img
						src={photo.src}
						alt={photo.alt}
						loading="lazy"
						class="aspect-square w-full object-cover transition duration-300 hover:scale-105"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Service area + reviews -->
<section id="service-area" class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
	<div class="grid gap-8 md:grid-cols-2">
		<div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
			<h2 class="text-2xl font-bold text-white">Service Area</h2>
			<ul class="mt-4 space-y-2 text-slate-300">
				<li><span class="font-semibold text-cyan-400">On-site:</span> within a 90-mile radius of Pierceton, IN</li>
				<li><span class="font-semibold text-cyan-400">Remote support:</span> anywhere in the USA</li>
			</ul>
		</div>

		<div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
			<h2 class="text-2xl font-bold text-white">5.0 Rating on Google</h2>
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
</section>

<!-- Contact CTA -- the actual form now lives at /contact (also where the
     PCPartPicker list flow lives), so this is just a pointer there rather
     than a second copy of the same form. -->
<section id="contact" class="border-t border-slate-800 bg-slate-900/30">
	<div class="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
		<h2 class="text-3xl font-bold text-white">Get In Touch</h2>
		<p class="mt-3 text-slate-400">
			Send a message to get a diagnostic scheduled or ask a question — we'll get back to you. Call/text
			{phoneDisplay} if it's urgent.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
			>
				Contact Us
			</a>
			<a
				href="tel:{phoneHref}"
				class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-400"
			>
				Call {phoneDisplay}
			</a>
		</div>
	</div>
</section>
