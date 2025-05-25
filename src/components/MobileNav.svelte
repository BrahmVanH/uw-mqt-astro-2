<script lang="ts" module>
	interface Props {
		socials: SocialLink[];
	}
</script>

<script lang="ts">
	import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet/';
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

	const { navTabs } = config;

	let tabSetBreadcrumbs = $state<NavTab[][]>([]);
	let currentParentTab = $state<NavTab | null>(null);

	// derived state that will run when the tabSetBreadcrumbs var is updated - if the length is greater than one, showGoBackBtn is true
	let showGoBackBtn = $derived(tabSetBreadcrumbs.length > 1);

	const setTabSetBreadcrumbs = (tss: NavTab[][]) => {
		tabSetBreadcrumbs = tss;
	};

	const openTabSet = (tabSet: NavTab[], parentTab: NavTab) => {
		tabSetBreadcrumbs = [...tabSetBreadcrumbs, tabSet];
		currentParentTab = parentTab;
	};
</script>

<Sheet bind:open>
	<SheetTrigger class="absolute lg:hidden right-4 top-3 text-2xl border-0 shadow-none p-0 h-min" aria-label="Open navigation menu" aria-haspopup="true">
		<img loading="lazy" decoding="async" class="w-[24px] text-primary-blue-2 font-semibold" src={hamburgerMenuIcon.src} alt="Menu" />
	</SheetTrigger>
	<SheetContent
		showGoBackButton={showGoBackBtn}
		{tabSetBreadcrumbs}
		handleGoBack={() => setTabSetBreadcrumbs(tabSetBreadcrumbs.slice(0, -1))}
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
							className="text-primary-blue-2 font-semibold self-start "
							href={currentParentTab?.href ?? ''}
							text={currentParentTab?.title ?? ''}
							ariaLabel={`Return to ${currentParentTab?.title ?? 'previous menu'}`}
							role="menuitem"
						/>
					</div>
				{/if}
				<!-- DISPLAY TABSET AT END OF ARRAY  -->
				{#each tabSetBreadcrumbs[tabSetBreadcrumbs.length - 1] as { title, href, navTabs }}
					<BtnOrLink
						className="max-w-[80%] w-full self-start text-primary-blue-2 font-semibold "
						onclick={navTabs ? () => openTabSet(navTabs, { title, href }) : undefined}
						href={navTabs ? undefined : href}
						text={title}
						ariaLabel={navTabs ? `Open ${title} submenu` : `Navigate to ${title}`}
						role="menuitem"
						aria-expanded={navTabs ? false : undefined}
						aria-haspopup={navTabs ? true : undefined}
					/>
				{/each}
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
	</SheetContent>
</Sheet>
