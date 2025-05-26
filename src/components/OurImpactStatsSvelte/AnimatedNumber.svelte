<script lang="ts">
	import type { IStatistic } from '@/types/impactStats';

	interface Props extends IStatistic {
		start: number;
		duration?: number;
		'aria-label'?: string;
	}

	let { value, duration = 1500, start = 0, unit, 'aria-label': ariaLabel }: Props = $props();

	let elementRef: HTMLElement;
	let animationId: number;

	// Reactive derived values - very Svelte!
	const endValue = $derived(typeof value === 'string' ? parseInt(value, 10) : value);

	// Single source of truth for animation progress
	let progress = $state(0);

	// Derived animated count - automatically updates when progress changes
	const count = $derived(() => {
		const easeOutQuart = 1 - Math.pow(1 - progress, 4);
		return Math.floor(start + (endValue - start) * easeOutQuart);
	});

	// Clean animation function using Svelte's reactive nature
	function startAnimation() {
		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			progress = Math.min(elapsed / duration, 1);

			if (progress < 1) {
				animationId = requestAnimationFrame(animate);
			}
		};

		animationId = requestAnimationFrame(animate);
	}

	// Svelte action - the most idiomatic way to handle DOM interactions
	function inView(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					startAnimation();
					observer.disconnect(); // Once only
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			},
		};
	}
</script>

<span bind:this={elementRef} use:inView aria-atomic="true" aria-label={ariaLabel}>
	{unit ?? ''}{count().toLocaleString()}
</span>
