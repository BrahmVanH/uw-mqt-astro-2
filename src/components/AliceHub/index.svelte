<script lang="ts">
	import { Suspense, suspend } from '@svelte-drama/suspense';

	import ParagraphWithLink from '../ParagraphWithLink.svelte';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	import ErrorDisplay from '../ErrorDisplay.svelte';

	import { btnIcons, config, getSubCategoryBgColor } from '../../config/aliceHub';
	import aliceHubBg from '@/image/overlapping-blue-circle-outlines-01.svg';

	import { AppError, ErrorCode } from '@/lib/error';
	import { capitalizeFirstLetter, cn } from '@/lib/utils';

	import { CategoryNames } from '../../types/aliceHub';
	import type { UserGeo } from '@/types/alice';

	const UNAVAILABLE_CATEGORIES = [CategoryNames.HEALTHCARE, CategoryNames.MISCELLANEOUS, CategoryNames.TAXES, CategoryNames.TECHNOLOGY, CategoryNames.TRANSPORTATION];

	// Lazy-loaded components

	const PantryMapConsole = import('../AlicePantryMap/index.svelte').then((p) => p.default);
	const HousingHub = import('./Housing.svelte').then((p) => p.default);
	const FoodHub = import('./Food.svelte').then((p) => p.default);
	const ChildcareHub = import('./Childcare.svelte').then((p) => p.default);

	// Props
	let { userGeoData }: { userGeoData: UserGeo } = $props();

	// State management
	let isLoading = $state<boolean>(false);
	let error = $state<AppError | null>(null);
	let activeCategory = $state<string | null>(null);
	let displayedSubCategories = $state<string[]>([]);
	let selectedSubCategories = $state<string[]>([]);

	const { heading, paragraphWithLink, categories } = config;

	function handleError(e: Error | AppError, message: string, context: Record<string, any> | undefined) {
		if (e instanceof Error) {
			throw new AppError({
				message,
				code: ErrorCode.UNKNOWN_ERROR,
				cause: e,
				context,
			});
		} else {
			throw e;
		}
	}
	/**
	 * Handles user clicks to set active ALICE category content to be displayed
	 */
	function handleSetActiveCategory(e: Event, category: CategoryNames, subCategories: string[]) {
		// Set loading state and reset error state var
		isLoading = true;
		error = null;
		e.preventDefault();

		if (!Object.values(CategoryNames).includes(category)) {
			error = new AppError({
				message: 'Unaccepted ALICE category name',
				code: ErrorCode.VALIDATION_ERROR,
				context: { providedCategory: category },
			});
		}

		if (category === activeCategory) {
			activeCategory = null;
			selectedSubCategories = [];
			displayedSubCategories = [];
			isLoading = false;
			return;
		}

		selectedSubCategories = [];
		activeCategory = category;
		displayedSubCategories = subCategories;

		isLoading = false;
	}

	/**
	 * Handles setting selected subcategory state. Selects or deselects subcategory
	 */
	function handleSelectedSubCategories(e: Event, subCategory: string) {
		e.preventDefault();
		if (selectedSubCategories.includes(subCategory)) {
			selectedSubCategories = selectedSubCategories.filter((s) => s != subCategory);
		} else {
			selectedSubCategories = [...selectedSubCategories, subCategory];
		}
	}

	$effect(() => {
		if (error) {
			throw error;
		}
	});
</script>

{#if error}
	<ErrorDisplay {error} />
{:else}
	<div class="relative overflow-hidden flex flex-col items-center justify-center mb-8">
		<!-- Header -->
		<div class="z-10 w-full max-w-[1500px] flex flex-col items-start bg-transparent text-start ml-4 mb-4 px-4 [&>p]:text-md">
			<h1 class="text-xl">{heading}</h1>
			<ParagraphWithLink className="w-1/2 my-2" {paragraphWithLink} />
			<p>{paragraphWithLink.text2}</p>
		</div>

		<div class="max-w-[1500px] w-full flex flex-row justify-center mx-auto">
			<!-- Category Sidebar -->
			<div class="h-min flex flex-col gap-2 mr-4 mt-4">
				{#each categories.filter((c) => !UNAVAILABLE_CATEGORIES.includes(c.name)) as { name, color, icon, subCategories }}
					<button
						class={cn(
							'w-min flex items-center justify-end rounded-sm text-lg p-0 px-3 overflow-hidden transition-all duration-150 hover:cursor-pointer',
							`text-${color} ring-${color}`,
							activeCategory === name ? 'ring-2 focus:ring-2' : '',
						)}
						onclick={(e) => handleSetActiveCategory(e, name, subCategories)}
					>
						<img class="w-3 p-0" src={btnIcons[icon]} alt="{name} icon" />
						<!-- <span class="iconify {icon} w-4 h-4"></span> -->
						<p class="font-bold text-lg">{capitalizeFirstLetter(name)}</p>
					</button>
				{/each}
			</div>

			<!-- Main Content Area -->
			<div class="alice-view relative min-w-[70vw] overflow-y-scroll flex flex-col items-center justify-center">
				{#if !isLoading && activeCategory === null}
					<img class="absolute top-0 right-[25%] z-0 w-full h-full" src={aliceHubBg.src} alt="overlapping circle graphic" loading="lazy" decoding="async" />
				{/if}

				<!-- Subcategory Buttons -->
				<div class="w-full flex">
					{#if !isLoading}
						<div class="flex items-center">
							{#if displayedSubCategories.length > 0}
								<p class="text-md">Filter:</p>
							{/if}

							{#each displayedSubCategories as sub, i}
								<button
									class="border-2 rounded-[64px] text-nowrap min-w-fit px-2 py-1 ml-2 focus:ring-0
                        {selectedSubCategories.includes(sub) ? getSubCategoryBgColor(i) : ''}"
									onclick={(e) => handleSelectedSubCategories(e, sub)}
								>
									{capitalizeFirstLetter(sub)}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Content Area -->
				<div class="min-w-[100%]">
					{#if isLoading}
						<LoadingSpinner />
					{:else if activeCategory === null}
						<div class="relative w-full min-h-[80vh] flex flex-row justify-center items-center">
							<div class="w-[40%] flex flex-col text-center items-center">
								<h3 class="w-full text-xl">Central Upper Peninsula ALICE Hub</h3>
								<p class="w-3/4 mt-2 text-md">Here you will find a great many of the assistance programs offered across the CUP.</p>
							</div>
							<div class="flex flex-row justify-center w-1/2 gap-2">
								<div class="w-1/4 rounded-md border-4 border-primary-red-3 p-1">
									<h4 class="text-lg normal-case">Get Help</h4>
									<p>Navigate through each ALICE category on the left to view the many assistance programs offered across the UP</p>
								</div>
								<div class="w-1/4 rounded-md border-4 border-tertiary-purple-1 p-1">
									<h4 class="text-lg normal-case">Give</h4>
									<p>As you browse the various categories, please note the opportunities to donate your time or resources directly to the organizations that make these programs possible.</p>
								</div>
							</div>
						</div>
					{:else if activeCategory === CategoryNames.FOOD}
						{#if selectedSubCategories.includes('programs') || selectedSubCategories.length === 0}
							<Suspense onerror={(e) => handleError(e, 'Error loading Food Programs Component', undefined)}>
								{#snippet loading()}
									<LoadingSpinner />
								{/snippet}
								{#snippet children()}
									{#await suspend(FoodHub) then FoodHub}
										<FoodHub {userGeoData} />
									{/await}
								{/snippet}
							</Suspense>
						{/if}
						{#if selectedSubCategories.includes('food pantries') || selectedSubCategories.length === 0}
							<!-- <Suspense
                onerror={(e) =>
                  handleError(
                    e,
                    "Error loading Food Pantry Map Console Component",
                    undefined,
                  )}
              >
                {#snippet loading()}
                  <LoadingSpinner />
                {/snippet}
                {#snippet children(suspend)}
                  {#await suspend(PantryMapConsole) then PantryMapConsole}
                    <PantryMapConsole />
                  {/await}
                {/snippet}
              </Suspense> -->
							<Suspense onerror={(e) => handleError(e, 'Error loading Food Programs Component', undefined)}>
								{#snippet loading()}
									<LoadingSpinner />
								{/snippet}
								{#snippet children()}
									{#await suspend(PantryMapConsole) then PantryMapConsole}
										<PantryMapConsole initialUserGeoData={userGeoData} />
									{/await}
								{/snippet}
							</Suspense>
						{/if}
					{:else if activeCategory === CategoryNames.HOUSING}
						<Suspense onerror={(e) => handleError(e, 'Error loading Housing Programs Console Component', undefined)}>
							{#snippet loading()}
								<LoadingSpinner />
							{/snippet}
							{#snippet children()}
								{#await suspend(HousingHub) then HousingHub}
									<HousingHub filter={selectedSubCategories} />
								{/await}
							{/snippet}
						</Suspense>
					{:else if activeCategory === CategoryNames.CHILDCARE}
						<Suspense onerror={(e) => handleError(e, 'Error loading Childcare Programs Console Component', undefined)}>
							{#snippet loading()}
								<LoadingSpinner />
							{/snippet}
							{#snippet children()}
								{#await suspend(ChildcareHub) then ChildcareHub}
									<ChildcareHub />
								{/await}
							{/snippet}
						</Suspense>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
