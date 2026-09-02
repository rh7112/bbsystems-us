import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';

interface Env {
	ASSETS: { fetch(request: Request): Promise<Response> };
	EMAIL: { send(message: EmailMessage): Promise<void> };
}

interface ContactPayload {
	firstName?: string;
	lastName?: string;
	email?: string;
	subject?: string;
	message?: string;
	pcPartPickerUrl?: string;
}

// PCPartPicker list-share links are just public URLs -- this only checks
// the hostname, not that the list itself resolves, matching the "plain
// text field + validation that it looks like a pcpartpicker.com link,
// nothing more exotic" scope from the issue this came from.
function isPcPartPickerUrl(value: string): boolean {
	try {
		const host = new URL(value).hostname.toLowerCase();
		return host === 'pcpartpicker.com' || host.endsWith('.pcpartpicker.com');
	} catch {
		return false;
	}
}

// Contact form mail goes straight to Cruz's working inbox rather than
// support@bbsystems.us -- that address doesn't exist as a real mailbox yet
// (see the root README's "Restoring support@ and admin@ email" section),
// and any destination the send_email binding uses has to be a verified
// address in Cloudflare Email Routing regardless of which address it is.
const CONTACT_TO = 'bbsystemsus@gmail.com';
const CONTACT_FROM = 'contact-form@bbsystems.us';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/api/contact') {
			if (request.method !== 'POST') {
				return new Response('Method not allowed', { status: 405 });
			}
			return handleContact(request, env);
		}

		return env.ASSETS.fetch(request);
	}
};

async function handleContact(request: Request, env: Env): Promise<Response> {
	let body: ContactPayload;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request body' }, 400);
	}

	const firstName = body.firstName?.trim();
	const lastName = body.lastName?.trim();
	const email = body.email?.trim();
	const subject = body.subject?.trim();
	const message = body.message?.trim();
	const pcPartPickerUrl = body.pcPartPickerUrl?.trim();

	if (!firstName || !lastName || !email || !subject || !message) {
		return json({ error: 'All fields are required' }, 400);
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Invalid email address' }, 400);
	}
	if (pcPartPickerUrl && !isPcPartPickerUrl(pcPartPickerUrl)) {
		return json({ error: "That doesn't look like a PCPartPicker link" }, 400);
	}

	const msg = createMimeMessage();
	msg.setSender({ name: 'BBSystems.US Contact Form', addr: CONTACT_FROM });
	msg.setRecipient(CONTACT_TO);
	msg.setSubject(`[Contact Form] ${subject}`);
	msg.setHeader('Reply-To', new Mailbox(email));
	msg.addMessage({
		contentType: 'text/plain',
		data: `From: ${firstName} ${lastName} <${email}>\n\n${message}${
			pcPartPickerUrl ? `\n\nPCPartPicker list: ${pcPartPickerUrl}` : ''
		}`
	});

	const emailMessage = new EmailMessage(CONTACT_FROM, CONTACT_TO, msg.asRaw());

	try {
		await env.EMAIL.send(emailMessage);
	} catch (err) {
		console.error('Failed to send contact form email', err);
		return json({ error: 'Could not send right now -- please call or text instead.' }, 502);
	}

	return json({ ok: true });
}

function json(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}
