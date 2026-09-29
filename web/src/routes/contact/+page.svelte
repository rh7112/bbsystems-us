<script lang="ts">
	const phoneDisplay = '(260) 248-1269';
	const phoneHref = '+12602481269';
	const description =
		'Get a quote on IT consulting, PC repair, or a custom Bully Built computer -- send a message, or paste a PCPartPicker list for a build you have in mind.';

	let firstName = $state('');
	let lastName = $state('');
	let contactEmail = $state('');
	let subject = $state('');
	let message = $state('');
	let hasPcPartPickerList = $state(false);
	let pcPartPickerUrl = $state('');
	let status: 'idle' | 'sending' | 'sent' | 'error' = $state('idle');
	let errorMessage = $state('');

	async function submitContactForm(event: SubmitEvent) {
		event.preventDefault();
		status = 'sending';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstName,
					lastName,
					email: contactEmail,
					subject,
					message,
					pcPartPickerUrl: pcPartPickerUrl.trim() || undefined
				})
			});

			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { error?: string } | null;
				throw new Error(body?.error ?? 'Something went wrong. Please try again.');
			}

			status = 'sent';
			firstName = '';
			lastName = '';
			contactEmail = '';
			subject = '';
			message = '';
			hasPcPartPickerList = false;
			pcPartPickerUrl = '';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}
</script>

<svelte:head>
	<title>Contact — BBSystems.US</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://bbsystems.us/contact" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Contact — BBSystems.US" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://bbsystems.us/contact" />
	<meta property="og:site_name" content="BBSystems.US" />
	<meta property="og:image" content="https://bbsystems.us/images/logo.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Contact — BBSystems.US" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://bbsystems.us/images/logo.png" />
</svelte:head>

<section class="border-b border-slate-800">
	<div class="mx-auto max-w-2xl px-4 py-20 sm:px-6">
		<h1 class="text-3xl font-bold text-white sm:text-4xl">Get In Touch</h1>
		<p class="mt-3 text-slate-400">
			Send a message and we'll get back to you — or call/text {phoneDisplay} if it's urgent.
		</p>

		<form onsubmit={submitContactForm} class="mt-10 space-y-6">
			<div class="grid gap-6 sm:grid-cols-2">
				<div>
					<label for="firstName" class="mb-2 block text-sm font-medium text-slate-300">First name</label>
					<input
						id="firstName"
						type="text"
						required
						bind:value={firstName}
						class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
					/>
				</div>
				<div>
					<label for="lastName" class="mb-2 block text-sm font-medium text-slate-300">Last name</label>
					<input
						id="lastName"
						type="text"
						required
						bind:value={lastName}
						class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
					/>
				</div>
			</div>

			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-slate-300">Email</label>
				<input
					id="email"
					type="email"
					required
					bind:value={contactEmail}
					class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
				/>
			</div>

			<div>
				<label for="subject" class="mb-2 block text-sm font-medium text-slate-300">Subject</label>
				<input
					id="subject"
					type="text"
					required
					bind:value={subject}
					class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
				/>
			</div>

			<div>
				<label for="message" class="mb-2 block text-sm font-medium text-slate-300">Message</label>
				<textarea
					id="message"
					required
					rows="5"
					bind:value={message}
					class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
				></textarea>
			</div>

			<div class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						bind:checked={hasPcPartPickerList}
						onchange={() => {
							if (!hasPcPartPickerList) pcPartPickerUrl = '';
						}}
						class="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
					/>
					<span class="text-sm font-medium text-slate-300">
						I have a PCPartPicker list to share for a build
					</span>
				</label>

				{#if hasPcPartPickerList}
					<div class="mt-4">
						<label for="pcPartPickerUrl" class="mb-2 block text-sm font-medium text-slate-300">
							PCPartPicker list URL
						</label>
						<p class="mb-3 text-xs text-slate-500">
							Build your list at
							<a
								href="https://pcpartpicker.com"
								target="_blank"
								rel="noopener noreferrer"
								class="text-cyan-400 hover:underline">pcpartpicker.com</a
							>, use the Share button to get a link, and paste it here — we'll follow up with details and pricing.
						</p>
						<input
							id="pcPartPickerUrl"
							type="url"
							placeholder="https://pcpartpicker.com/list/..."
							bind:value={pcPartPickerUrl}
							class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400"
						/>
					</div>
				{/if}
			</div>

			<button
				type="submit"
				disabled={status === 'sending'}
				class="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{status === 'sending' ? 'Sending…' : 'Send Message'}
			</button>

			{#if status === 'sent'}
				<p class="text-sm text-emerald-400">Thanks — your message is on its way. We'll be in touch.</p>
			{:else if status === 'error'}
				<p class="text-sm text-red-400">{errorMessage}</p>
			{/if}
		</form>
	</div>
</section>
