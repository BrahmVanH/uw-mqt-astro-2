<script lang="ts">
	import { getStringPreview } from '@/lib/utils';
	import LearnMoreBtn from './LearnMoreBtn.svelte';
	import placeholderImg from '@/image/placeholder.svg';

	import type { CarouselItem, Props } from '@/types/ourImpactCarousel';

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

	let selectedItem = $state<CarouselItem>(carouselItems[0]);

	const handleSelectItem = (item: CarouselItem) => {
		selectedItem = item;
	};
</script>

<section
	id="our-impact-carousel"
	class="w-full relative flex flex-col lg:grid grid-cols-3 auto-rows-auto lg:gap-4 max-w-[80%] lg:max-w-full mx-auto px-0 lg:px-8 text-pretty mt-1"
	aria-labelledby="success-stories-heading"
>
	<h2 id="success-stories-heading" class="text-xl lg:text-2xl w-full text-center mb-1 lg:mb-2">Success Stories</h2>
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
			<h3 class="text-lg lg:text-xl font-bold mt-2 mb-2 lg:mb-4">{selectedItem?.title}</h3>
			<p class="mb-3 text-md md:text-md text-pretty leading-relaxed">{selectedItem?.text}</p>
			{#if selectedItem.link && selectedItem.linkText}
				<LearnMoreBtn size="md" text={selectedItem.linkText} href={selectedItem.link} openInNewTab={true} color="blue" ariaLabel="Learn more about our impact" />
			{/if}
		</article>
	</div>

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
				aria-selected={selectedItem.title === item.title}
				aria-controls={`carousel-item-${index}`}
				onclick={() => handleSelectItem(item)}
				class={`
              snap-center
              shrink-0
              w-[65vw] md:w-[45vw]
              transition-all duration-300 border-primary-blue-4 border-2
              ${selectedItem.title === item.title ? 'ring-2 ring-primary-blue-2 transform scale-95' : 'hover:shadow-sm'}
            `}
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
