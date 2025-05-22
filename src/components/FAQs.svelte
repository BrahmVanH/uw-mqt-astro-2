<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/';
	import type { Props } from '@/types/faqs';

	// Props type imported from config
	// interface Props {
	// 	title: string;
	// 	items: FaqItem[];
	// }

	let { title, items }: Props = $props();

	let value = $state<string>();

	const handleOnValueChange = (v: string) => {
		value = v;
	};
</script>

<section class="w-full flex flex-col justify-center items-center p-4">
	{#if title}
		<h2 id="faqs" class="text-2xl">
			{title}
		</h2>
	{/if}
	<Accordion type="single" {value} onValueChange={handleOnValueChange} class="w-full max-w-3xl mx-auto space-y-2">
		{#each items as item, index}
			<AccordionItem value={`item-${index}`} class="group  px-4 border-none  transition-all duration-300lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]">
				<AccordionTrigger
					class="flex items-center my-4 w-full justify-between py-6 text-lg text-left font-body text-primary-blue-2 transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1"
				>
					{item.question}
				</AccordionTrigger>
				<AccordionContent class="animate-fade-in overflow-hidden text-md">
					<div>
						<p class="text-tertiary-black-2 leading-relaxed">{item.answer}</p>
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
