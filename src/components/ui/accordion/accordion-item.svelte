<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import { cn } from '@/lib/utils.ts';

	let { ref = $bindable(null), class: className, disabled = $bindable(false), ...restProps }: AccordionPrimitive.ItemProps = $props();
</script>

<AccordionPrimitive.Item bind:ref data-slot="accordion-item" {disabled} class={cn('border-b last:border-b-0', className)} {...restProps} />
