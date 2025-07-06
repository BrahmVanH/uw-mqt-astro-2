<script lang="ts">
	// import programs from '@/lib/data/housing.json';
	import ProgramCard from './ProgramCard.svelte';
	import { CategoryNames, type AliceHubProgram } from '@/types/aliceHub';

	interface Props {
		filter: string[];
		programs: AliceHubProgram[] | [];
	}
	// Props
	let { filter: externalFilter, programs }: Props = $props();

	let filter = $state(externalFilter || []);


	let previousExternalFilter = $state(JSON.stringify(externalFilter || []));

	// This effect won't create an infinite loop because it checks for changes first
	$effect(() => {
		const currentExternalFilterStr = JSON.stringify(externalFilter || []);

		// Only update if the filter actually changed
		if (currentExternalFilterStr !== previousExternalFilter) {
			filter = externalFilter || [];
			previousExternalFilter = currentExternalFilterStr;
		}
	});

	let allPrograms: AliceHubProgram[] = $state([...programs]);
	let filteredPrograms = $state(allPrograms);

	// Filter programs when filter changes
	$effect(() => {
		if (!filter?.length) {
			filteredPrograms = allPrograms;
		} else {
			filteredPrograms = allPrograms.filter((p) => filter.some((c) => p?.type?.includes(c)));
		}
	});
</script>

<div class="h-full p-[16px] max-h-[75vh] overflow-hidden justify-self-center rounded-md my-2 px-4">
	<div class="w-full h-min flex flex-col justify-between">
		<h2 class="text-xl">Housing Programs</h2>

		<!-- Programs List -->
		<div class="flex flex-col items-center gap-[16px] h-[80vh] overflow-y-scroll border-t-2 border-tertiary-black-3 p-2">
			{#each filteredPrograms as program (program.name)}
				<ProgramCard category={CategoryNames.HOUSING} {program} />
			{/each}
		</div>
	</div>
</div>
