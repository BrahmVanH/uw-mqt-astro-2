<script lang="ts" module>
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
			carouselItems,
		};
	}

	export interface Props {
		carouselItems: CarouselItem[];
	}

	export interface CarouselItem {
		title: string;
		text: string;
		image: string;
		imageAlt: string;
		link?: string;
		linkText?: string;
	}
</script>

<script lang="ts">
	import { getStringPreview } from '@/lib/utils';
	import LearnMoreBtn from './LearnMoreBtn.svelte';
	import placeholderImg from '@/image/placeholder.svg';

	import type { ImpactCarouselFieldsCarouselItemsItem2, ImpactCarouselFieldsCarouselItemsItem3, RootQueryToImpactCarouselConnection } from '@/types/__generated__/types';
	import { getDefaultProps } from '@/lib/error';

	// Imported types
	// interface Props {
	// 	carouselItems: CarouselItem[];
	// }

	// interface CarouselItem {
	// 	title: string;
	// 	text: string;
	// 	image: string;
	// 	imageAlt: string;
	// 	link?: string;
	// 	linkText?: string;
	// }

	let { carouselItems }: Props = $props();

	let selectedItem = $state<CarouselItem | null>(carouselItems?.[0] || null);

	const handleSelectItem = (item: CarouselItem) => {
		selectedItem = item;
	};
</script>

<section
	id="our-impact-carousel"
	class="w-full relative flex flex-col lg:grid grid-cols-3 auto-rows-auto lg:gap-4 max-w-[80%] lg:max-w-full mx-auto px-0 lg:px-8 text-pretty my-8 py-8"
	aria-labelledby="success-stories-heading"
>
	<h2 id="success-stories-heading" class="text-xl lg:text-2xl w-full text-center mb-1 lg:mb-2">Success Stories</h2>
	{#if selectedItem}
		<div class="relative z-20 w-full mx-auto row-start-1 col-span-3 flex flex-col lg:flex-row justify-center items-start bg-transparent">
			<div class="w-full lg:w-1/2 h-auto">
				<img
					src={selectedItem.image ?? placeholderImg}
					alt={selectedItem.imageAlt}
					class="shadow-lg object-cover aspect-auto mx-auto max-h-[400px]"
					loading="lazy"
					decoding="async"
					height={400}
					width={400}
				/>
			</div>
			<article class="w-full lg:w-1/2 p-0 lg:p-6 mb-4 lg:ml-2">
				<h3 class="text-lg lg:text-xl font-bold mt-2 mb-2 lg:mb-4">{selectedItem.title}</h3>
				<p class="mb-8 text-md md:text-md text-pretty leading-relaxed">{selectedItem.text}</p>
				{#if selectedItem.link && selectedItem.linkText}
					<LearnMoreBtn size="md" text={selectedItem.linkText} href={selectedItem.link} openInNewTab={true} color="blue" ariaLabel="Learn more about our impact" />
				{/if}
			</article>
		</div>
	{/if}

	<div
		style="scrollbarWidth: thin;"
		role="tablist"
		aria-label="Success stories"
		class="z-20 relative w-full col-span-3
          flex gap-4
          overflow-x-scroll
          snap-x snap-mandatory
          scroll-smooth
          
          pb-4"
	>
		{#each carouselItems as item, index}
			<button
				id={`carousel-item-${index}`}
				role="tab"
				aria-selected={selectedItem?.title === item.title}
				aria-controls={`carousel-item-${index}`}
				onclick={() => handleSelectItem(item)}
				class="cursor-pointer snap-center shrink-0 w-[65vw] md:w-[45vw] transition-all duration-300 border-primary-blue-4 border-2"
				class:ring-2={selectedItem?.title === item.title}
				class:ring-primary-blue-2={selectedItem?.title === item.title}
				class:transform={selectedItem?.title === item.title}
				class:scale-95={selectedItem?.title === item.title}
				class:hover:shadow-sm={selectedItem?.title !== item.title}
			>
				<div class="w-full h-full p-1 lg:p-2 flex flex-row items-center">
					<div class="w-1/2 h-auto">
						<img src={item.image} alt={item.imageAlt} class="w-full aspect-auto lg:h-[150px] object-cover" role="presentation" loading="lazy" decoding="async" height={150} width={150} />
					</div>
					<p class="hidden sm:block text-sm w-1/2 ml-2 my-auto leading-relaxed">{getStringPreview(item.text, 175)}</p>
					<p class="sm:hidden text-sm w-1/2 ml-1 lg:ml-4 my-auto">{getStringPreview(item.text, 50)}</p>
				</div>
			</button>
		{/each}
	</div>
</section>
