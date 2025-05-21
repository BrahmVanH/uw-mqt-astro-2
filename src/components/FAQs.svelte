<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/';
	import { getDefaultProps } from '@/lib/error';
	import type { RootQueryToFaqConnection } from '@/types/__generated__/types';

	interface Props {
		title: string;
		items: FaqItem[];
	}

	interface FaqItem {
		question: string;
		answer: string;
	}

	let { title, items }: Props = $props();

	let value = $state<string>();

	const handleOnValueChange = (v: string) => {
		value = v;
	};

	export function createProps(graphQLQueryResponse: RootQueryToFaqConnection): Props {
		if (!graphQLQueryResponse) {
			return getDefaultProps<Props>('faqs');
		}
		const root = graphQLQueryResponse?.nodes[0]?.fAQFields;

		const title = root?.sectionTitle as string;

		const itemsObj = root?.questions;

		let itemsArr: FaqItem[] = [];

		if (!itemsObj) return { title, items: [] };
		for (let i = 0; i < 10; i++) {
			itemsArr.push({
				question: itemsObj[`question${i + 1}` as keyof typeof itemsObj] as string,
				answer: itemsObj[`answer${i + 1}` as keyof typeof itemsObj] as string,
			});
		}
		const items = itemsArr.filter((item) => item.question && item.answer);
		return { title, items };
	}
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
