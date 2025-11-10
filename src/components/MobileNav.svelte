<script lang="ts" module>
	interface Props {
		socials: SocialLink[];
	}
</script>

<script lang="ts">
	import * as Sheet from '@/components/ui/sheet/index.ts';
	import { Button } from '@/components/ui/button/';
	import config from '../config/nav';
	import logo from '@/image/logo-no-text.svg';
	import hamburgerMenuIcon from '@/icons/hambuger-menu.svg';

	import type { NavTab } from '@/types/nav';
	import type { SocialLink } from '@/types/socialsIconStrip';
	import BtnOrLink from './BtnOrLink.svelte';
	import LearnMoreBtn from './LearnMoreBtn.svelte';
	import SocialMediaIconStrip from './SocialMediaIconStrip.svelte';

	let { socials }: Props = $props();

	let open = $state(false);

	const { navTabs, helpfulLinks } = config;

	let tabSetBreadcrumbs = $state<NavTab[][]>([]);
	let currentParentTab = $state<NavTab | null>(null);

	let showGoBackBtn = $derived(tabSetBreadcrumbs.length > 1);

	const handleGoBack = () => {
		const prevBreadcrumbs = tabSetBreadcrumbs.slice(0, -1);

		tabSetBreadcrumbs = prevBreadcrumbs;

		if (prevBreadcrumbs.length <= 1) {
			currentParentTab = null;
		} else {
			const parentTabIndex = prevBreadcrumbs.length - 2;
			if (parentTabIndex >= 0) {
				const currentTabSet = prevBreadcrumbs[prevBreadcrumbs.length - 1];
				currentParentTab = findParentTab(parentTabIndex, currentTabSet);
			}
		}
	};

	function findParentTab(parentTabIndex: number, currentTabSet: NavTab[]): NavTab | null {
		if (parentTabIndex < 0 || !tabSetBreadcrumbs[parentTabIndex]) {
			return null;
		}

		for (const tab of tabSetBreadcrumbs[parentTabIndex]) {
			if (tab.navTabs && arraysMatch(tab.navTabs, currentTabSet)) {
				return tab;
			}
		}

		return null;
	}

	function arraysMatch(arr1: NavTab[], arr2: NavTab[]): boolean {
		return arr1.some((tab1) => arr2.some((tab2) => tab1.title === tab2.title && tab1.href === tab2.href));
	}

	const openTabSet = (tabSet: NavTab[], parentTab: NavTab) => {
		tabSetBreadcrumbs = [...tabSetBreadcrumbs, tabSet];
		currentParentTab = parentTab;
	};

	$effect(() => {
		if (tabSetBreadcrumbs.length === 0) {
			tabSetBreadcrumbs = [navTabs];
		}
	});
</script>

<Sheet.Root bind:open>
	<div class="relative lg:hidden z-10 w-full flex justify-between p-2">
		<a data-astro-prefetch class="flex items-center" href="/">
			{#if logo.src}
				<img loading="lazy" decoding="async" class="h-[50px] xl:h-[75px] w-auto font-heading object-cover" src={logo.src} alt="United Way Logo" width={200} height={100} />
			{/if}
		</a>
		<Sheet.Trigger class="p-2 text-2xl border-0 shadow-none" aria-label="Open navigation menu" aria-haspopup="true">
			<img loading="lazy" decoding="async" class="w-[24px] text-primary-blue-2 font-semibold" src={hamburgerMenuIcon.src} alt="Menu" />
		</Sheet.Trigger>
	</div>
	<Sheet.Content
		{showGoBackBtn}
		{tabSetBreadcrumbs}
		{handleGoBack}
		class=" w-full text-primary-blue-2 font-semibold overflow-y-auto scroll-x-visible pt-1 pb-1"
		side={'left'}
		aria-label="Navigation menu"
	>
		<nav aria-label="Main navigation">
			<div class="w-full bg-transparent flex items-center justify-center">
				<a class="content" href="/" aria-label="Home page">
					<img loading="lazy" decoding="async" src={logo.src} alt="United Way of Marquette County Logo" class="relative w-24 h-24" width={50} height={50} />
				</a>
			</div>
			<div class="mt-2 ml-4 w-full flex flex-col items-start space-y-2 text-white text-xl text-left" role="menu">
				{#if showGoBackBtn}
					<div class="border-b-2 border-primary-blue-1 w-full py-2" role="none">
						<!-- DISPLAY ROOT OF TABSET AS LINK AT TOP OF NAV -->
						<BtnOrLink
							className="text-primary-blue-2 font-semibold self-start text-xl"
							href={currentParentTab?.href ?? ''}
							text={currentParentTab?.title ?? ''}
							ariaLabel={`Return to ${currentParentTab?.title ?? 'previous menu'}`}
							role="menuitem"
						/>
					</div>
				{/if}
				<!-- DISPLAY TABSET AT END OF ARRAY  -->
				{#if tabSetBreadcrumbs[tabSetBreadcrumbs.length - 1]}
					{#each tabSetBreadcrumbs[tabSetBreadcrumbs.length - 1] as { title, href, navTabs }}
						<BtnOrLink
							className="max-w-[80%] w-full self-start text-primary-blue-2 font-semibold text-lg text-nowrap"
							onclick={navTabs ? () => openTabSet(navTabs, { title, href }) : undefined}
							href={navTabs ? undefined : href}
							text={title}
							ariaLabel={navTabs ? `Open ${title} submenu` : `Navigate to ${title}`}
							role="menuitem"
							aria-expanded={navTabs ? false : undefined}
							aria-haspopup={navTabs ? true : undefined}
						/>
					{/each}
				{/if}
				{#if tabSetBreadcrumbs.length === 1}
					{#each helpfulLinks as { title, href }}
						<BtnOrLink className="max-w-[80%] w-full self-start text-primary-blue-2 font-semibold text-lg text-nowrap" {href} text={title} ariaLabel={`Navigate to ${title}`} role="menuitem" />
					{/each}
				{/if}
			</div>
			<!-- DONATE BUTTON -->

			<div class="flex flex-col items-center justify-center w-full list-none mt-4" role="none">
				<LearnMoreBtn
					text="Donate"
					href="/donate"
					size="lg"
					className=" px-8  justify-self-center"
					color="blue"
					ariaLabel="Make a donation to the united way of marquette county"
					openInNewTab={true}
				/>
			</div>
			<SocialMediaIconStrip {socials} />
		</nav>
	</Sheet.Content>
</Sheet.Root>
