<script lang="ts">
	import { cn } from '@/lib/utils';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	interface Props {
		href?: string;
		text: string;
		ariaLabel: string;
		onclick?: () => void;
		className?: string;
		role?: string;
		'aria-expanded'?: boolean;
		'aria-haspopup'?: boolean;
	}

	let { href, text, ariaLabel, onclick, className = '', role, 'aria-expanded': ariaExpanded, 'aria-haspopup': ariaHaspopup }: Props = $props();

	const commonClasses = cn('py-2 text-wrap text-pretty  lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 lg:focus:ring-primary-blue-1', className);
</script>

{#snippet link(href: Props['href'])}
	<a {href} class="items-start {commonClasses}" aria-label={ariaLabel} {role} data-astro-prefetch="tap">
		{text.toUpperCase()}
	</a>
{/snippet}

{#snippet btn(onclick: Props['onclick'])}
	<button {onclick} type="button" class="flex items-center m-0 w-min text-left {commonClasses}" aria-label={ariaLabel} {role} aria-expanded={ariaExpanded} aria-haspopup={ariaHaspopup}>
		<span>{text.toUpperCase()}</span>
		<ChevronDown className="relative top-[1px] ml-1 h-2 w-2 xl:h-3 xl:w-3" aria-hidden="true" />
	</button>
{/snippet}

{#if onclick}
	{@render btn(onclick)}
{:else if href}
	{@render link(href)}
{/if}
