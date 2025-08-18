<script module lang="ts">
	function destringifyWpArr(arrStr: string) {
		if (!arrStr) {
			return [];
		}

		if (!arrStr.includes('<br />\n')) {
			return [arrStr];
		}
		const arr = arrStr.split('<br />\n');

		return arr;
	}

	export function createHubPrograms(wpContent: RootQueryToAliceHubProgramConnection): Props['programsByCategory'] {
		if (!wpContent?.nodes.length) {
			return getDefaultProps<Props['programsByCategory']>('AliceHubPrograms');
		}

		const programNodes = wpContent?.nodes;

		const programs: AliceHubProgram[] = programNodes
			.map((n) => ({
				...n.aliceHubProgramFields,
				serviceAreas: destringifyWpArr(n.aliceHubProgramFields?.serviceAreas ?? ''),
				requirements: destringifyWpArr(n.aliceHubProgramFields?.requirements ?? ''),
			}))
			.filter((n) => n !== undefined) as unknown as AliceHubProgram[];

		if (!programs) {
			return getDefaultProps<Props['programsByCategory']>('AliceHubPrograms');
		}

		const categories = Object.values(CategoryNames);
		let programsByCategory: AliceHubProgramsByCategory = {} as AliceHubProgramsByCategory;

		if (!programs) {
			return getDefaultProps<Props['programsByCategory']>('AliceHubPrograms');
		}

		for (let program of programs) {
			const category = program.category[0] as CategoryNames;
			if (!programsByCategory[category]) {
				programsByCategory[category] = [program];
				continue;
			}
			programsByCategory[category].push(program);
		}

		for (let category of categories) {
			if (!programsByCategory[category]) {
				programsByCategory[category] = [];
			}
		}

		return programsByCategory;
	}
</script>

<script lang="ts">
	import { Suspense, suspend } from '@svelte-drama/suspense';

	import ParagraphWithLink from '../ParagraphWithLink.svelte';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	import ErrorDisplay from '../ErrorDisplay.svelte';

	import {  config, getSubCategoryBgColor } from '../../config/aliceHub';
	import aliceHubBg from '@/image/overlapping-blue-circle-outlines-01.svg';

	import { AppError, ErrorCode, getDefaultProps } from '@/lib/error';

	import { CategoryNames, type AliceHubProgram, type AliceHubProgramsByCategory } from '@/types/aliceHub';
	import type { UserGeo } from '@/types/alice';
	import type { RootQueryToAliceHubProgramConnection } from '@/types/__generated__/types';
	import SubCategoryBtns from './SubCategoryBtns.svelte';
	import CategorySidebar from './CategorySidebar.svelte';
	import DefaultCard from './DefaultCard.svelte';

	interface Props {
		programsByCategory: AliceHubProgramsByCategory;
		userGeoData: UserGeo;
	}
	// Lazy-loaded components

	const PantryMapConsole = import('../AlicePantryMap/index.svelte').then((p) => p.default);
	const HousingHub = import('./Housing.svelte').then((p) => p.default);
	const FoodHub = import('./Food.svelte').then((p) => p.default);
	const ChildcareHub = import('./Childcare.svelte').then((p) => p.default);

	// Props
	let { programsByCategory, userGeoData }: Props = $props();

	let unavailableCategories: string[] = [];
	for (const [k, v] of Object.entries(programsByCategory)) {
		if (v.length === 0) {
			unavailableCategories.push(k as CategoryNames);
		}
	}

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
	function setActiveCategory(e: Event, category: CategoryNames, subCategories: string[]) {
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
	<div
		class="relative xl:overflow-hidden flex flex-col items-center justify-center mb-8
                border border-gray-200 rounded-lg shadow-sm bg-gray-50/30
                xl:border-0 xl:shadow-none xl:bg-transparent xl:rounded-none"
	>
		<!-- Header -->
		<div class="z-10 w-full max-w-[1500px] flex flex-col items-start bg-transparent text-start ml-4 mb-4 px-4 [&>p]:text-md">
			<h1 class="text-xl">{heading}</h1>
			<ParagraphWithLink className="w-full xl:w-1/2 my-2" {paragraphWithLink} />
			<p>{paragraphWithLink.text2}</p>
		</div>

		<div
			class="max-w-[1500px] w-full flex flex-col xl:flex-row items-center xl:items-start justify-center mx-auto
                    p-2 xl:p-0 rounded-md xl:rounded-none"
		>
			<!-- Category Sidebar -->
			<CategorySidebar {categories} {unavailableCategories} {activeCategory} {setActiveCategory} />

			<div
				class="alice-view relative min-w-[70vw] xl:overflow-y-scroll flex flex-col items-center justify-center
                        bg-white/50 rounded-md shadow-inner border border-gray-100 p-1 mt-1
                        xl:bg-transparent xl:shadow-none xl:border-0 xl:p-0 xl:mt-0"
			>
				{#if !isLoading && activeCategory === null}
					<img class="hidden xl:block absolute right-[25%] z-0 w-full h-full" src={aliceHubBg.src} alt="overlapping circle graphic" loading="lazy" decoding="async" />
				{/if}

				<!-- Subcategory Buttons -->
				<SubCategoryBtns {isLoading} {displayedSubCategories} {selectedSubCategories} {getSubCategoryBgColor} {handleSelectedSubCategories} />

				<!-- Content Area -->
				<div class="min-w-[100%]">
					{#if isLoading}
						<LoadingSpinner />
					{:else if activeCategory === null}
						<DefaultCard />
					{:else if activeCategory === CategoryNames.FOOD}
						{#if selectedSubCategories.includes('programs') || selectedSubCategories.length === 0}
							<Suspense onerror={(e) => handleError(e, 'Error loading Food Programs Component', undefined)}>
								{#snippet loading()}
									<LoadingSpinner />
								{/snippet}
								{#snippet children()}
									{#await suspend(FoodHub) then FoodHub}
										<FoodHub programs={programsByCategory[CategoryNames.FOOD]} {userGeoData} />
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
									<HousingHub programs={programsByCategory[CategoryNames.HOUSING]} filter={selectedSubCategories} />
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
									<ChildcareHub programs={programsByCategory[CategoryNames.CHILDCARE]} />
								{/await}
							{/snippet}
						</Suspense>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
