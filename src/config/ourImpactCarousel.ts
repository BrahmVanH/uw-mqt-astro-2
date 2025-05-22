import { getDefaultProps, onImageError } from '@/lib/error';
import type { ImpactCarouselFieldsCarouselItemsItem2, ImpactCarouselFieldsCarouselItemsItem3, RootQueryToImpactCarouselConnection } from '@/types/__generated__/types';
import type { Props } from '@/types/ourImpactCarousel';

export function createProps(wpContent: RootQueryToImpactCarouselConnection): Props {
	if (!wpContent || !wpContent.nodes || wpContent?.nodes?.length === 0 || !wpContent.nodes[0]?.impactCarouselFields) {
		return getDefaultProps<Props>('impactCarousel createProps');
	}
	const root = wpContent?.nodes[0]?.impactCarouselFields;

	const carouselItemsObj = root?.carouselItems;

	if (!carouselItemsObj) {
		return getDefaultProps<Props>('impactCarousel createProps carouselItemsObj');
	}

	const carouselItemsArr = Object.keys(carouselItemsObj)
		.map((key) => carouselItemsObj[key as keyof typeof carouselItemsObj])
		.filter((item): item is ImpactCarouselFieldsCarouselItemsItem2 | ImpactCarouselFieldsCarouselItemsItem3 => item !== null && item !== undefined);
	const carouselItems = carouselItemsArr
		.map((item) => ({
			title: item?.title as string,
			text: item?.text as string,
			image: item?.image?.node?.sourceUrl ?? '',
			imageAlt: item?.image?.node?.altText ?? 'placeholder image',
			link: item?.link ?? '',
			linkText: item?.linkText ?? '',
		}))
		.filter((item) => item.title && item.text)
		.reverse();

	return {
		carouselItems
	};
}
