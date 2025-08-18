<script lang="ts">
	import { capitalizeFirstLetter } from '@/lib/utils';

	interface Props {
		isLoading: boolean;
		displayedSubCategories: string[];
		selectedSubCategories: string[];
		getSubCategoryBgColor: (i: number) => string;
		handleSelectedSubCategories: (e: Event, subCategory: string) => void;
	}

	let { isLoading, displayedSubCategories, getSubCategoryBgColor, handleSelectedSubCategories, selectedSubCategories }: Props = $props();
</script>

<div class="w-full flex justify-center mt-1 xl:mt-0 xl:justify-start">
	{#if !isLoading}
		<div class="flex items-center">
			{#if displayedSubCategories.length > 0}
				<p class="text-sm xl:text-md">Filter:</p>
			{/if}

			{#each displayedSubCategories as sub, i}
				<button
					class="border-2 rounded-[64px] text-nowrap text-sm min-w-fit px-2 py-1 ml-2 focus:ring-0 xl:text-md
                        {selectedSubCategories.includes(sub) ? getSubCategoryBgColor(i) : ''}"
					onclick={(e) => handleSelectedSubCategories(e, sub)}
				>
					{capitalizeFirstLetter(sub)}
				</button>
			{/each}
		</div>
	{/if}
</div>
