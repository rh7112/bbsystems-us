// Footer background: faint rising binary digits plus glowing circuit traces
// whose colors cycle through the RGB spectrum. Purely decorative (the canvas
// is aria-hidden and pointer-events-none). It pauses while off screen, and
// visitors who prefer reduced motion get a single static frame.

const prefersReducedMotion = () =>
	typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

type Path = { pts: [number, number][]; len: number; pos: number; speed: number; offset: number };
type Column = { x: number; y: number; speed: number; chars: string[] };

const GLYPH = 16; // px between binary rows/columns
const TRAIL = 16; // glyphs per binary column

const bit = () => (Math.random() < 0.5 ? '0' : '1');

export function circuitFooter(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const reduced = prefersReducedMotion();
	let w = 0;
	let h = 0;
	let t = 0;
	let raf = 0;
	let visible = true;
	let paths: Path[] = [];
	let columns: Column[] = [];

	function build() {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		w = canvas.clientWidth;
		h = canvas.clientHeight;
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

		// Fewer, wider-spaced columns and traces on small screens.
		const colSpacing = w < 640 ? GLYPH * 2 : GLYPH;
		columns = Array.from({ length: Math.floor(w / colSpacing) }, (_, i) => ({
			x: i * colSpacing + 4,
			y: h * Math.random(),
			speed: 0.6 + Math.random() * 1.4,
			chars: Array.from({ length: TRAIL }, bit)
		}));

		const count = Math.max(6, Math.round(w / (w < 640 ? 70 : 46)));
		paths = Array.from({ length: count }, (_, i) => {
			const x0 = ((i + 0.5) * w) / count;
			const dir = Math.random() < 0.5 ? -1 : 1;
			const y1 = h - (25 + Math.random() * 45);
			const x2 = x0 + dir * (18 + Math.random() * 30);
			const y2 = y1 - (18 + Math.random() * 30);
			const y3 = h - (Math.min(h * 0.6, 130) + Math.random() * Math.min(h * 0.4, 110));
			const pts: [number, number][] = [
				[x0, h + 5],
				[x0, y1],
				[x2, y2],
				[x2, y3]
			];
			let len = 0;
			for (let k = 1; k < pts.length; k++) {
				len += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
			}
			return {
				pts,
				len,
				pos: Math.random() * len * 2,
				speed: 1.2 + Math.random() * 1.6,
				offset: i * (360 / count)
			};
		});
	}

	function strokePath(p: Path) {
		ctx!.beginPath();
		ctx!.moveTo(p.pts[0][0], p.pts[0][1]);
		for (let k = 1; k < p.pts.length; k++) ctx!.lineTo(p.pts[k][0], p.pts[k][1]);
		ctx!.stroke();
	}

	function drawBinary(alpha: number) {
		ctx!.font = '14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
		ctx!.textBaseline = 'top';
		for (const col of columns) {
			if (!reduced) {
				col.y -= col.speed;
				if (col.y < -TRAIL * GLYPH) col.y = h + Math.random() * h * 0.6;
				if (Math.random() < 0.08) col.chars[Math.floor(Math.random() * TRAIL)] = bit();
			}
			for (let i = 0; i < TRAIL; i++) {
				const a = (1 - i / TRAIL) * alpha;
				ctx!.fillStyle = i === 0 ? `rgba(235,242,250,${a})` : `rgba(150,175,205,${a * 0.8})`;
				ctx!.fillText(col.chars[i], col.x, col.y + i * GLYPH);
			}
		}
	}

	function drawTraces() {
		for (const p of paths) {
			const hue = (t * 1.2 + p.offset) % 360;
			ctx!.setLineDash([]);
			ctx!.lineWidth = 1.5;
			ctx!.strokeStyle = `hsla(${hue},90%,55%,0.3)`;
			strokePath(p);

			const end = p.pts[3];
			ctx!.fillStyle = `hsla(${hue},90%,60%,0.7)`;
			ctx!.beginPath();
			ctx!.arc(end[0], end[1], 2.6, 0, Math.PI * 2);
			ctx!.fill();

			if (!reduced) {
				p.pos += p.speed;
				if (p.pos > p.len + 80) p.pos = -40;
			}
			ctx!.setLineDash([70, p.len + 400]);
			ctx!.lineDashOffset = -(p.pos - 70);
			ctx!.lineWidth = 2.4;
			ctx!.strokeStyle = `hsl(${hue},100%,68%)`;
			ctx!.shadowColor = `hsl(${hue},100%,60%)`;
			ctx!.shadowBlur = 12;
			strokePath(p);
			ctx!.shadowBlur = 0;
		}
		ctx!.setLineDash([]);
	}

	function frame() {
		t++;
		ctx!.globalCompositeOperation = 'source-over';
		ctx!.clearRect(0, 0, w, h);
		drawBinary(0.4);
		drawTraces();

		// Fade everything out toward the top of the footer.
		ctx!.globalCompositeOperation = 'destination-in';
		const fade = ctx!.createLinearGradient(0, 0, 0, h);
		fade.addColorStop(0, 'rgba(0,0,0,0)');
		fade.addColorStop(1, 'rgba(0,0,0,1)');
		ctx!.fillStyle = fade;
		ctx!.fillRect(0, 0, w, h);

		if (!reduced && visible) raf = requestAnimationFrame(frame);
	}

	function start() {
		cancelAnimationFrame(raf);
		frame();
	}

	build();
	start();

	const ro = new ResizeObserver(() => {
		build();
		start();
	});
	ro.observe(canvas);

	let io: IntersectionObserver | undefined;
	if (!reduced && typeof IntersectionObserver !== 'undefined') {
		io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
			else cancelAnimationFrame(raf);
		});
		io.observe(canvas);
	}

	return {
		destroy() {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io?.disconnect();
		}
	};
}
