<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';

	let { ref = $bindable(null), value = $bindable(), disabled = $bindable(false), ...restProps }: AccordionPrimitive.RootProps = $props();
</script>

<AccordionPrimitive.Root bind:ref bind:value={value as never} {disabled} data-disabled={disabled} data-slot="accordion" {...restProps} />
