// Small progressive-enhancement actions for the homepage. Everything renders
// fully visible from the static HTML; these only add motion once the page
// hydrates, and do nothing at all for visitors who prefer reduced motion.

const prefersReducedMotion = () =>
	typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fade/slide an element in the first time it scrolls into view. */
export function reveal(node: HTMLElement, delay = 0) {
	if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;

	// Anything already on screen stays put -- hiding it on hydrate would just
	// flash the hero. Only content below the fold gets the entrance.
	if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

	node.style.transitionDelay = `${delay}ms`;
	node.classList.add('reveal');

	const io = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('reveal-in');
				io.disconnect();
			}
		},
		{ threshold: 0.12 }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
}

/** Make a card's glow follow the pointer via --mx / --my custom properties. */
export function spotlight(node: HTMLElement) {
	if (prefersReducedMotion()) return;

	const move = (event: PointerEvent) => {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
		node.style.setProperty('--my', `${event.clientY - rect.top}px`);
	};
	node.addEventListener('pointermove', move);

	return { destroy: () => node.removeEventListener('pointermove', move) };
}

/** Count a number up from 0 when it scrolls into view. Final value is the
 *  element's own text, so no-JS / reduced-motion visitors just see it. */
export function countUp(node: HTMLElement, options: { to: number; decimals?: number }) {
	if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
	if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

	const { to, decimals = 0 } = options;
	node.textContent = (0).toFixed(decimals);

	let frame = 0;
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			io.disconnect();
			const duration = 1200;
			const start = performance.now();
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / duration);
				const eased = 1 - Math.pow(1 - t, 3);
				node.textContent = (to * eased).toFixed(decimals);
				if (t < 1) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		},
		{ threshold: 0.6 }
	);
	io.observe(node);

	return {
		destroy: () => {
			io.disconnect();
			cancelAnimationFrame(frame);
		}
	};
}
