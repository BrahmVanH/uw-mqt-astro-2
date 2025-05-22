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
