<script lang="ts" module>
	export interface Props {
		href?: string;
		color: 'black' | 'white' | 'blue' | 'purple';
		className?: string;
		ariaLabel: string;
		text?: string;
		size: 'sm' | 'md' | 'lg' | 'xl';
		openInNewTab?: boolean;
	}
</script>

<script lang="ts">
	let { href, color = 'black', className, ariaLabel, text = 'Learn more', size = 'md', openInNewTab = true }: Props = $props();

	const buttonStyles = {
		black: 'bg-transparent border-black text-black lg:hover:bg-black/5 lg:active:bg-black/10',
		white: 'bg-transparent border-white text-white lg:hover:bg-white/10 lg:active:bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]',
		blue: 'bg-transparent border-primary-blue-2 text-black lg:hover:bg-primary-blue-2/5 lg:active:bg-primary-blue-2/10',
		purple: 'bg-tertiary-purple-2 text-white lg:hover:bg-tertiary-purple-3 lg:active:bg-tertiary-purple-4 shadow-[0_0_15px_rgba(0,0,0,0.1)]',
	};

	const sizeStyles = {
		sm: 'text-xs lg:text-sm rounded-lg px-1 py-[1px] border-[3px]',
		md: ' rounded-lg px-2 py-0 border-[3px]',
		lg: 'text-md lg:text-lg px-4 py-2 border-[4px]',
		xl: 'text-xl lg:text-2xl rounded-lg px-8 py-3 border-[5px]',
	};
</script>

<a
	class="{className} w-min text-nowrap leading-none uppercase font-semibold font-body no-underline rounded-lg lg:transform lg:transition-all lg:duration-200 lg:ease-out lg:active:scale-[0.98] lg:hover:-translate-y-[2px] lg:hover:shadow-lg lg:hover:scale-[102%] active:translate-y-0 active:shadow-md {buttonStyles[
		color
	]} {sizeStyles[size]} "
	{href}
	aria-label={ariaLabel}
	rel={openInNewTab ? 'noopener noreferrer' : ''}
	target={openInNewTab ? '_blank' : ''}
	data-astro-prefetch="tap"
>
	{text}
</a>
