import { getDefaultProps } from '@/lib/error';
import type { RootQueryToFaqConnection } from '@/types/__generated__/types';
import type { Props, FaqItem } from '@/types/faqs';

export const createProps = (graphQLQueryResponse: RootQueryToFaqConnection): Props => {
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
};
