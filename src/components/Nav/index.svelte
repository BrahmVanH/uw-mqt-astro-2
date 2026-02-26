<script lang="ts">
  import { NavigationMenu } from 'bits-ui';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';

  import navContent from '@/config/nav';
  import LearnMoreBtn from '@/components/LearnMoreBtn.svelte';
  import Accordion from './Accordion.svelte';
  import ListItem from './ListItem.svelte';
  import Breadcrumb from './Breadcrumb.svelte';

  import { cn, isExternalUrl } from '@/lib/utils';

  import logo from '@/image/logo-mqt-2.svg';

  interface Props {
    path: string;
  }

  let { path }: Props = $props();

  // svelte-ignore state_referenced_locally
  let bgColor = path === '/' ? 'transparent' : 'white';

  const { navTabs, helpfulLinks, commonStyles } = navContent;
  const helpfulLinksGridColsClass = helpfulLinks.length > 4 ? 'grid-cols-' + helpfulLinks.length : 'grid-cols-4';
</script>

<nav>
  <NavigationMenu.Root class="  bg-{bgColor} w-full hidden lg:flex lg:flex-col ">
    <div
      class="relative z-50 flex flex-1 items-center justify-between text-lg px-2 lg:px-4 py-1 border-b-2 border-primary-blue-3"
    >
      <a data-astro-prefetch class="flex items-center" href="/">
        {#if logo.src}
          <img
            loading="lazy"
            decoding="async"
            class="h-[50px] xl:h-[75px] w-auto font-heading object-cover"
            src={logo.src}
            alt="United Way Logo"
            width={200}
            height={100}
          />
        {/if}
      </a>
      <NavigationMenu.List
        class="flex group lg:flex-1 list-none lg:items-center lg:justify-center space-x-8"
        role="menubar"
      >
        {#each navTabs as { title, href, navTabs: nts }}
          {#if !nts}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                data-astro-prefetch
                class={cn(
                  commonStyles.navTrigger,
                  'bg-transparent group inline-flex h-full w-max items-center justify-center   px-4 py-2  transition-colors ',
                )}
                {href}
                role="menuitem"
              >
                {title}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          {:else}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                class={cn(
                  'group inline-flex h-10 w-max items-center justify-center  bg-transparent px-4 py-2 font-medium transition-colors  lg:hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ',
                  commonStyles.navTrigger,
                )}
                role="menuitem"
                aria-haspopup="true"
              >
                {title}
                <ChevronDown
                  class="relative top-px ml-1 size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                class="absolute bg-white/95 backdrop-blur-sm top-[-30px] w-[700px] rounded-lg border border-gray-200/60 shadow-lg ring-1 ring-black/5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
                role="menu"
              >
                <NavigationMenu.Sub>
                  <div class={commonStyles.navContent}>
                    <div class={commonStyles.navContentLeft}>
                      <p class={commonStyles.navHeading}>{title}</p>
                      <LearnMoreBtn
                        ariaLabel={'Learn more'}
                        text="Learn more"
                        color="blue"
                        href={href === '/about' ? navTabs[1].href : href}
                        size="md"
                        openInNewTab={false}
                      />
                    </div>
                    <NavigationMenu.List class={commonStyles.navContentRight}>
                      {#each nts as link}
                        {#if link.navTabs}
                          <div class="content">
                            <Accordion {link} styles={commonStyles} />
                          </div>
                        {:else}
                          <ListItem
                            data-astro-prefetch
                            href={link.href}
                            title={link.title}
                            class={commonStyles.navTrigger}
                            rel={isExternalUrl(link.href) ? 'noopener noreferrer' : undefined}
                            target={isExternalUrl(link.href) ? '_blank' : undefined}
                            role="menuitem"
                          />
                        {/if}
                      {/each}
                    </NavigationMenu.List>
                  </div>
                </NavigationMenu.Sub>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          {/if}
        {/each}

        <NavigationMenu.Item>
          <LearnMoreBtn
            text="Donate"
            href="/donate"
            size="md"
            className=" max-h-5 font-semibold"
            openInNewTab={true}
            color="black"
            ariaLabel="Make a donation to the united way of marquette county"
          />
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div class="absolute left-1/4 xl:left-[50%] top-full flex w-full">
        <NavigationMenu.Viewport
          class="origin-top-center rounded-none relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full  border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-(--radix-navigation-menu-viewport-width)"
        />
      </div>
    </div>
    <!-- <div class=" flex flex-row justify-end border-b-2 border-primary-blue-3">
			<NavigationMenu.List class={cn(helpfulLinksGridColsClass, ' w-1/2   grid  group  lg:flex-1 list-none lg:items-center lg:justify-center space-x-4')}>
				{#each helpfulLinks as { title, href }}
					<NavigationMenu.Item>
						<NavigationMenu.Link
							data-astro-prefetch
							class={cn('group inline-flex h-min w-max items-center justify-center uppercase text-sm  px-4 py-1  transition-colors ')}
							{href}
							role="menuitem"
						>
							{title}
						</NavigationMenu.Link>
					</NavigationMenu.Item>
				{/each}
			</NavigationMenu.List>
		</div> -->
    <div
      class="flex flex-row justify-between bg-linear-to-b z-10 from-white to-gray-50/30 border-b border-gray-200/40 px-8"
    >
      <Breadcrumb {path} />
      <NavigationMenu.List class="flex items-center gap-6 px-6 py-3 font-semibold">
        {#each helpfulLinks as { title, href }}
          <NavigationMenu.Item>
            <NavigationMenu.Link
              class="relative text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-blue-2 after:transition-all after:duration-300 hover:after:w-full"
              {href}
            >
              {title}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        {/each}
      </NavigationMenu.List>
    </div>
  </NavigationMenu.Root>
</nav>
