<script lang="ts">
	import type { IStatistic } from '@/types/impactStats';
	import AnimatedNumber from './AnimatedNumber.svelte';

	interface Props extends IStatistic {
		start: number;
		duration?: number;
		'aria-label'?: string;
	}

	let { value, unit, text, start }: Props = $props();
</script>

<div class="bg-transparent mt-2 w-max">
	<div class="flex flex-col items-center justify-between text-center">
		<p class="text-lg lg:text-xl font-bold text-tertiary-black-1 font-heading" aria-live="polite">
			{#if value}
				<AnimatedNumber {unit} {value} {start} aria-label={`${unit}${value} ${text}`} />
			{/if}
		</p>
		<p class="text-md font-semibold text-tertiary-black-2 max-w-[80%] mt-1 leading-relaxed">
			{text}
		</p>
	</div>
</div>
