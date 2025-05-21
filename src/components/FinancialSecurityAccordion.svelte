<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/';

	import config from '@/config/financialSecurityAccordion';
	import LearnMoreBtn from './LearnMoreBtn.svelte';

	const items = config.items;

	let value = $state<string>();

	const handleOnValueChange = (v: string) => {
		value = v;
	};
</script>

<section class="w-full flex justify-center p-4">
	<Accordion type="single" {value} onValueChange={handleOnValueChange} class=" w-full max-w-3xl mx-auto space-y-2">
		{#each items as item, index}
			<AccordionItem value={`item-${index}`} class="group  px-4 border-none  transition-all duration-300 lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]">
				<AccordionTrigger
					class="flex items-center w-full justify-between py-6 text-lg font-body text-primary-blue-2 transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1"
				>
					{item.title}
				</AccordionTrigger>
				<AccordionContent class="animate-fade-in overflow-hidden text-md">
					<div class="pb-6 pt-2 space-y-4">
						<p class="text-tertiary-black-1 leading-relaxed">
							{item.content.text}
						</p>
						<div class="flex flex-col sm:flex-row gap-1 sm:gap-2 pt-2">
							<LearnMoreBtn
								text={item.content.linkText ?? 'Learn more'}
								size="md"
								href={item.content.link}
								ariaLabel={`learn more about ${item.title}`}
								color="blue"
								openInNewTab={item.content.link.split('')[0] !== '/'}
							/>
							{#if item.content.link2}
								<LearnMoreBtn size="md" href={item.content.link2} ariaLabel={`learn more about ${item.title}`} color="blue" openInNewTab={false} />
							{/if}
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
