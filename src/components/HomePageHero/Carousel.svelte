<script lang="ts">
  import { cn } from '@/lib/utils';
  import LearnMoreBtn from '../LearnMoreBtn.svelte';
  import { onMount, onDestroy } from 'svelte';

  export interface Props {
    featureItems: HomePageHeroFeature[];
    isPriority: boolean;
    timer: number;
  }

  export interface HomePageHeroFeature {
    title: string;
    priority: boolean;
    text: string;
    subtext: string;
    link: string;
    linkText: string;
    linkTwo?: string;
    linkTextTwo?: string;
    img?: string;
    imgAlt?: string;
    optionalMedia?: string;
    optionalMediaTitle?: string;
  }

  let { featureItems, isPriority, timer }: Props = $props();

  console.log('feature items: ', featureItems);

  let currentGroupIndex = $state(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let isHovered = $state(false);
  let isTransitioning = $state(false);
  let stupidDebuggingChange = $state(false);

  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;

  const itemsPerPage = $derived(() => (isPriority ? 2 : 3));

  function parseItemsGroups(items: HomePageHeroFeature[]) {
    let featureItemsMut = [...items];

    let itemsGroups: HomePageHeroFeature[][] = [];

    const iterations = Math.ceil(items.length / itemsPerPage());
    for (let i = 0; i < iterations; i++) {
      if (featureItemsMut.length >= itemsPerPage()) {
        const group = featureItemsMut.slice(0, itemsPerPage());
        const rest = featureItemsMut.slice(itemsPerPage());

        itemsGroups.push(group);
        featureItemsMut = rest;
      } else if (featureItemsMut.length > 0) {
        itemsGroups.push(featureItemsMut);
        break;
      }
    }

    return itemsGroups;
  }

  let itemsGroups = $derived(parseItemsGroups(featureItems));

  function shouldFlexGrow(itemGroup: HomePageHeroFeature[], index: number) {
    if (itemGroup.length % itemsPerPage() === 0) {
      return true;
    } else {
      if (index === itemGroup.length - 1) {
        return false;
      }
    }
    return true;
  }

  function nextPage() {
    if (isTransitioning || itemsGroups.length <= 1) return;

    isTransitioning = true;

    const currentPage = document.getElementById(`${carouselId}-item-${currentGroupIndex}`);
    const nextPageIndex = (currentGroupIndex + 1) % itemsGroups.length;
    const nextPage = document.getElementById(`${carouselId}-item-${nextPageIndex}`);

    if (!currentPage || !nextPage) {
      isTransitioning = false;
      return;
    }

    // Set z-index for proper layering
    currentPage.style.zIndex = '10';
    nextPage.style.zIndex = '10';

    // Animate current page out to the left
    currentPage.style.transform = 'translateX(-100%)';
    currentPage.style.opacity = '0';

    // Position next page to the right and make it invisible initially
    nextPage.style.transform = 'translateX(100%)';
    nextPage.style.opacity = '0';

    setTimeout(() => {
      // Animate next page in from the right to center
      nextPage.style.transform = 'translateX(0)';
      nextPage.style.opacity = '1';

      setTimeout(() => {
        currentPage.style.zIndex = '0';
        currentGroupIndex = nextPageIndex;
        isTransitioning = false;
      }, 1000);
    }, 100);
  }

  function startAutoPlay() {
    stopAutoPlay();

    if (itemsGroups.length > 1 && !isHovered) {
      intervalId = setInterval(() => {
        if (!isHovered && !isTransitioning) {
          nextPage();
        }
      }, timer * 1000);
    }
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleMouseEnter() {
    isHovered = true;
    stopAutoPlay();
  }

  function handleMouseLeave() {
    isHovered = false;
    setTimeout(() => {
      if (!isHovered) {
        startAutoPlay();
      }
    }, 100);
  }

  onMount(() => {
    const initialDelay = isPriority ? 0 : 3000;

    setTimeout(() => {
      startAutoPlay();
    }, initialDelay);
  });

  onDestroy(() => {
    stopAutoPlay();
  });
</script>

<section class="w-full h-full relative overflow-hidden" data-carousel-id={carouselId}>
  <div class="relative w-full h-full flex items-center justify-center">
    {#each itemsGroups as itemGroup, groupIndex}
      <div
        id={`${carouselId}-item-${groupIndex}`}
        aria-controls={`${carouselId}-item-${groupIndex}`}
        class="carousel-item absolute inset-0 w-full"
      >
        <div
          class="w-full md:w-[50vw] h-full mx-auto flex flex-col md:gap-4 rounded-xl md:overflow-hidden"
          role="group"
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
        >
          {#each itemGroup as item, itemIndex}
            <div
              class={cn(
                shouldFlexGrow(itemGroup, itemIndex) ? 'md:flex-1' : '',
                'carousel-page w-full flex flex-col justify-center transition-all duration-700 ease-out',
              )}
              data-page={itemIndex}
              data-carousel-id={carouselId}
              style="animation-delay: {itemIndex * 200}ms"
            >
              <div
                class="group flex flex-row items-center justify-evenly bg-primary-blue-1/20 backdrop-blur-md border border-primary-blue-4/30 rounded-xl p-2 hover:bg-primary-blue-1/30 transition-all duration-300 w-full h-full"
                role="region"
              >
                {#if item.img}
                  <div
                    class={cn(
                      isPriority ? 'min-w-[40%]' : '',
                      'max-w-[40%] relative md:overflow-hidden p-4 bg-transparent',
                    )}
                  >
                    <img
                      src={item.img}
                      alt={item.imgAlt ?? ''}
                      class=" h-full max-h-[400px] aspect-auto mx-auto group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="md:absolute inset-0 bg-linear-to-r from-primary-blue-2/50 to-transparent"></div>
                  </div>
                {/if}
                <div class="p-2 max-w-[40%]">
                  <h3 class="text-xl font-bold mb-3 text-tertiary-black-2">{item.title}</h3>
                  <p class="text-tertiary-black-2 mb-3 leading-relaxed w-7/8">{item.text}</p>
                  {#if item.subtext}
                    <span class="text-tertiary-black-2 font-semibold text-sm">{item.subtext}</span>
                  {/if}
                  <div class="flex flex-col justify-between items-center gap-2 mt-2">
                    {#if item.linkText}
                      <LearnMoreBtn
                        size="md"
                        text={item.linkText}
                        href={item.link}
                        openInNewTab={item.link.startsWith('http')}
                        color="white"
                        ariaLabel={item.linkText}
                      />
                    {/if}
                    {#if item.linkTextTwo}
                      <LearnMoreBtn
                        size="md"
                        text={item.linkTextTwo}
                        href={item.linkTwo}
                        color="white"
                        ariaLabel={item.linkTextTwo}
                      />
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .carousel-page {
    transition:
      transform 1s ease-in-out,
      opacity 1s ease-in-out;
  }

  .carousel-item {
    transition:
      transform 1000ms ease-in-out,
      opacity 1000ms ease-in-out;
    /* All items start off-screen to the right except the first */
    transform: translateX(100%);
    opacity: 0;
    z-index: 0;
  }

  .carousel-item:first-child {
    transform: translateX(0);
    opacity: 1;
    z-index: 10;
  }
  @keyframes fadeInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .carousel-page {
    animation: fadeInUp 0.6s ease-out forwards;
  }
</style>
