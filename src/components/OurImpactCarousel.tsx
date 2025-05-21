import * as React from 'react';
import type { ImpactCarouselFieldsCarouselItemsItem2, ImpactCarouselFieldsCarouselItemsItem3, RootQueryToImpactCarouselConnection } from '@/types/__generated__/types';
import { getStringPreview } from '@/lib/utils';
import LearnMoreBtn from './LearnMoreBtn';
import placeholderImg from '@/image/placeholder.svg';
import { getDefaultProps, onImageError } from '@/lib/error';

export interface Props {
	carouselItems: CarouselItem[];
	bgImgSrc: string;
	bgImgAlt: string;
}

interface CarouselItem {
	title: string;
	text: string;
	image: string;
	imageAlt: string;
	link?: string;
	linkText?: string;
}

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
		bgImgSrc: root?.bgImg?.node?.sourceUrl ?? onImageError('Missing image in OurImpactCarousel').src,
		bgImgAlt: root?.bgImg?.node?.altText ?? 'placeholder image',
		carouselItems,
	};
}

const OurImpactCarousel: React.FC<Props> = ({ carouselItems }) => {
	const [selectedItem, setSelectedItem] = React.useState(carouselItems[0]);

	const handleSelectItem = React.useCallback((item: CarouselItem) => {
		setSelectedItem(item);
	}, []);

	return (
		<section
			id='our-impact-carousel'
			className='w-full relative flex flex-col lg:grid grid-cols-3 auto-rows-auto lg:gap-4 max-w-[80%] lg:max-w-full mx-auto px-0 lg:px-8 text-pretty mt-1'
			aria-labelledby='success-stories-heading'>
			<h2 id='success-stories-heading' className='text-xl lg:text-2xl w-full text-center mb-1 lg:mb-2'>
				Success Stories
			</h2>
			<div className='relative z-20 w-full mx-auto row-start-1 col-span-3 flex flex-col lg:flex-row justify-center items-start bg-transparent'>
				<div className='w-full lg:w-1/2 h-auto'>
					{selectedItem.image && (
						<img src={selectedItem.image} alt={selectedItem.imageAlt} className='shadow-lg object-cover aspect-auto mx-auto max-h-[400px]' loading='lazy' decoding='async' height={400} width={400} />
					)}
				</div>
				<article className='w-full lg:w-1/2 p-0 lg:p-6 mb-4 lg:ml-2'>
					<h3 className='text-lg lg:text-xl font-bold mt-2 mb-2 lg:mb-4'>{selectedItem?.title}</h3>
					<p className='mb-3 text-md md:text-md text-pretty leading-relaxed'>{selectedItem?.text}</p>
					{selectedItem.link && selectedItem.linkText && (
						<LearnMoreBtn size='md' text={selectedItem.linkText} href={selectedItem.link} openInNewTab={true} color='blue' ariaLabel='Learn more about our impact' />
					)}
				</article>
			</div>

			<div
				style={{ scrollbarWidth: 'thin' }}
				role='tablist'
				aria-label='Success stories'
				className='z-20 relative w-full col-span-3
          flex gap-4 
          overflow-x-scroll 
          snap-x snap-mandatory
          scroll-smooth 
          
          pb-4'>
				{carouselItems?.map((item: CarouselItem, index: number) => (
					<button
						id={`carousel-item-${index}`}
						key={item.title}
						role='tab'
						aria-selected={selectedItem.title === item.title}
						aria-controls={`carousel-item-${index}`}
						onClick={() => handleSelectItem(item)}
						className={`
              snap-center
              shrink-0
              w-[65vw] md:w-[45vw]
              transition-all duration-300 border-primary-blue-4 border-2
              ${selectedItem.title === item.title ? 'ring-2 ring-primary-blue-2 transform scale-95' : 'hover:shadow-sm'}
            `}>
						<div className='w-full h-full p-1 lg:p-2 flex flex-row items-center'>
							<div className='w-1/2 h-auto'>
								<img src={item.image} alt={item.imageAlt} className='w-full aspect-auto lg:h-[150px] object-cover' role='presentation' loading='lazy' decoding='async' height={150} width={150} />
							</div>
							<p className='hidden sm:block text-sm w-1/2 ml-2 my-auto leading-relaxed'>{getStringPreview(item.text, 175)}</p>
							<p className='sm:hidden text-sm w-1/2 ml-1 lg:ml-4 my-auto'>{getStringPreview(item.text, 50)}</p>
						</div>
					</button>
				))}
			</div>
		</section>
	);
};

export default OurImpactCarousel;
