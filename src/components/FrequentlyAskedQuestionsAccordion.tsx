import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import type { RootQueryToFaqConnection } from '@/types/__generated__/types';
import { getDefaultProps } from '@/lib/error';

export interface Props {
	title: string;
	items: FaqItem[];
}

interface FaqItem {
	question: string;
	answer: string;
}

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

const FrequentlyAskedQuestionsAccordion: React.FC<Props> = ({ title, items }) => {
	const [value, setValue] = React.useState('');

	return (
		<section className='w-full flex flex-col justify-center items-center p-4'>
			{title && (
				<h2 id='faqs' className='text-2xl '>
					{title}
				</h2>
			)}
			<Accordion type='single' collapsible value={value} onValueChange={setValue} className='w-full max-w-3xl mx-auto space-y-2'>
				{items?.map((item, index) => (
					<AccordionItem key={index} value={`item-${index}`} className='group  px-4 border-none  transition-all duration-300lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]'>
						<AccordionTrigger className='flex items-center my-4 w-full justify-between py-6 text-lg text-left font-body text-primary-blue-2 transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1'>
							{item.question}
						</AccordionTrigger>
						<AccordionContent className='animate-fade-in overflow-hidden text-md'>
							<div>
								<p className='text-tertiary-black-2 leading-relaxed'>{item.answer}</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};

export default FrequentlyAskedQuestionsAccordion;
