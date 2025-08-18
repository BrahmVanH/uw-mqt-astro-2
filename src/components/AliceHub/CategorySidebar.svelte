<script lang="ts">
	import { btnIcons } from '@/config/aliceHub';
	import { capitalizeFirstLetter, cn } from '@/lib/utils';
	import type { AliceCategory, CategoryNames } from '@/types/aliceHub';

	interface Props {
		categories: AliceCategory[];
		unavailableCategories: string[];
		activeCategory: string | null;
		setActiveCategory: (e: Event, category: CategoryNames, subCategories: string[]) => void;
	}

	let { categories, unavailableCategories, activeCategory, setActiveCategory }: Props = $props();
</script>

<div class="h-min flex flex-row flex-wrap xl:flex-col xl:gap-2 justify-center xl:justify-start mx-2 xl:mr-4 mt-2">
	{#each categories.filter((c) => !unavailableCategories.includes(c.name)) as { name, color, icon, subCategories }}
		<button
			class={cn(
				'w-1/4 xl:w-min flex items-center justify-center xl:justify-end rounded-sm text-md xl:text-lg p-0 px-2 mx-4 xl:mx-0 xl:px-5 xl:overflow-hidden lg:transition-all lg:duration-150 lg:hover:cursor-pointer',
				`text-${color} ring-${color}`,
				activeCategory === name ? 'ring-2 focus:ring-2' : '',
			)}
			onclick={(e) => setActiveCategory(e, name, subCategories)}
		>
			<img class="w-8 p-1" src={btnIcons[icon]} alt="{name} icon" />
			<p class="font-bold">{capitalizeFirstLetter(name)}</p>
		</button>
	{/each}
</div>
