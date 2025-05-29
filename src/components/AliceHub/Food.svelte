<script lang="ts">
	import programs from '@/lib/devData/food-programs.json';
	import ProgramCard from './ProgramCard.svelte';
	import { CategoryNames, type AliceHubProgram } from '@/types/aliceHub';
	import type { UserGeo } from '@/types/alice';

	// Props
	let { userGeoData }: { userGeoData: UserGeo } = $props();

	// State
	let filteredPrograms: AliceHubProgram[] = [...programs];
</script>

<div class="h-full p-[16px] max-h-[75vh] overflow-hidden justify-self-center rounded-md my-4 px-4">
	<div class="w-full h-min flex flex-col justify-between">
		<h2 class="text-xl">Food Assistance Programs</h2>

		<!-- Programs List -->
		<div class="flex flex-col items-center gap-[16px] h-[80vh] overflow-y-scroll border-t-2 border-tertiary-black-3 p-2">
			{#each filteredPrograms as program (program.name)}
				<ProgramCard category={CategoryNames.FOOD} {program} />
			{/each}
		</div>
	</div>
</div>
