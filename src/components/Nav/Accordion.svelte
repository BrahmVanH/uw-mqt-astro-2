<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/';
	import { NavigationMenu } from 'bits-ui';

	import type { Config, NavTab } from '@/types/nav';
	import ListItem from './ListItem.svelte';
	import { cn, isExternalUrl } from '@/lib/utils';

	interface Props {
		link: NavTab;
		styles: Config['commonStyles'];
	}

	let { link, styles }: Props = $props();

	let value = $state<string>();

	const handleOnMouseEnter = (e: MouseEvent) => {
		e.preventDefault();
		value = link.title;
	};

	const handleOnMouseLeave = (e: MouseEvent) => {
		e.preventDefault();
		value = '';
	};
</script>

<Accordion {value} type="single" class="hidden lg:block w-full max-w-3xl mx-auto relative" onmouseleave={handleOnMouseLeave} role="menu">
	<AccordionItem value={link.title} class="group border-none flex-row transition-all duration-300lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]" role="none">
		<AccordionTrigger
			class={`${styles.navTrigger} py-0lg:hover:bg-accent lg:hover:text-accent-foreground lg:hover:scale-105lg:hover:transition-all focus:bg-accent focus:text-accent-foreground`}
			onmouseenter={handleOnMouseEnter}
			openTo="left"
			role="menuitem"
			aria-haspopup="true"
		>
			<a data-astro-prefetch class="h-full py-2 my-0" href={link.href} role="menuitem">
				{link.title}
			</a>
		</AccordionTrigger>
		<AccordionContent class={`${styles.accordionContent} animate-slide-right  bg-white/95 backdrop-blur-sm  rounded-lg border border-gray-200/60 shadow-lg ring-2 ring-black/5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52`} role="menu">
			<div class="flex flex-col bg-transparent">
				<ul>
					{#if link.navTabs}
						<NavigationMenu.List>
							{#each link.navTabs as { href, title }}
								<ListItem
									data-astro-prefetch
									class={cn(styles.navTrigger, 'ml-2 xl:text-[18px] border-b-2 border-tertiary-black-3  lg:hover:scale-105 lg:hover:transition-all')}
									{href}
									{title}
									rel={isExternalUrl(href) ? 'noopener noreferrer' : undefined}
									target={isExternalUrl(href) ? '_blank' : undefined}
									role="menuitem"
								/>
							{/each}
						</NavigationMenu.List>
					{/if}
				</ul>
			</div>
		</AccordionContent>
	</AccordionItem>
</Accordion>
