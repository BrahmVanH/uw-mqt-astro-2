import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import type { StatisticProps } from './index.astro';

const AnimatedNumber: React.FC<StatisticProps> = ({ value, duration = 1500, start = 0, unit, 'aria-label': ariaLabel }) => {
	const [count, setCount] = React.useState(start);
	const [hasAnimated, setHasAnimated] = React.useState(false);

	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	React.useEffect(() => {
		if (!inView || hasAnimated) return;

		const endValue = typeof value === 'string' ? parseInt(value, 10) : value;
		const startTime = performance.now();
		setHasAnimated(true);

		const animate = () => {
			const currentTime = performance.now();
			const progress = Math.min((currentTime - startTime) / duration, 1);

			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(start + (endValue - start) * easeOutQuart));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}, [value, duration, start, inView, hasAnimated]);

	return (
		<span ref={ref} aria-atomic='true' aria-label={ariaLabel}>
			{unit ?? ''}
			{count.toLocaleString()}
		</span>
	);
};

export default AnimatedNumber;
