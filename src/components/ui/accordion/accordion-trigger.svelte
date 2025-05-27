<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { cn, type WithoutChild } from '@/lib/utils.ts';

	let {
		ref = $bindable(null),
		class: className,
		level = $bindable(3),
		disabled = $bindable(false),
		children,
		openTo = 'down',
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps['level'];
		disabled?: boolean;
		openTo?: 'down' | 'left';
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		data-slot="accordion-trigger"
		bind:ref
		{disabled}
		class={cn(
			'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
			openTo === 'down' ? '[&[data-state=open]>svg]:rotate-180' : '[&[data-state=open]>svg]:rotate-90',
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDownIcon class="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
