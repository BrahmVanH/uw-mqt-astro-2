<script lang="ts">
	import { capitalizeFirstLetter } from '@/lib/utils';
	import { ServiceAreas } from '@/types/alice';
	import type { AliceHubProgram, CategoryNames } from '@/types/aliceHub';

	interface Props {
		program: AliceHubProgram;
		category: CategoryNames;
		className?: string;
	}

	let { program, category, className }: Props = $props();

	/**
	 * Formats service areas for display, handling single/multiple areas and special cases
	 */
	function getServiceAreasDisplay(serviceAreas: ServiceAreas[]) {
		if (serviceAreas.length > 1) {
			return serviceAreas.map((area) => `${capitalizeFirstLetter(area)} County`);
		} else if (serviceAreas[0] === ServiceAreas.ALL) {
			return ['Central Upper Peninsula'];
		} else {
			return [`${capitalizeFirstLetter(serviceAreas[0])} County`];
		}
	}

	// Format service areas for display
	let serviceAreasDisplay = $derived(getServiceAreasDisplay(program.serviceAreas as ServiceAreas[]));
</script>

<div data-category={category} class="card-decal relative min-w-full min-h-[500px] xl:min-h-[350px] flex flex-col overflow-hidden rounded-lg px-4 [&>*]:mb-2 [&>*]:mx-2 [&>*]:z-10 {className}">
	<div class="mt-2">
		<h2 class="text-lg">{program.name}</h2>
		<p class="text-md">{program.provider}</p>
	</div>

	<div>
		<p class="text-sm">{program.description}</p>
	</div>

	<div class="w-full h-full flex flex-col xl:flex-row">
		<div class="w-full flex flex-row xl:w-auto xl:flex-row">
			{#if serviceAreasDisplay.length > 0}
				<div class="w-1/2 xl:w-1/3 flex flex-col xl:h-full justify-between">
					<div>
						<p class="font-medium text-md text-nowrap">Available to Residents of:</p>
						<ul class="list-disc ml-4 text-left">
							{#each serviceAreasDisplay as area}
								<li class="text-xs">
									<p class="text-sm">{area}</p>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			{#if program.requirements.length > 0}
				<div class="hidden xl:flex xl:flex-col xl:flex-1 xl:mx-4">
					<p class="font-medium text-md">Eligibility:</p>
					<ul class="list-disc text-sm pl-1 ml-4">
						{#each program.requirements as requirement}
							<li class="text-xs">
								<p class="text-sm">{requirement}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="circles-unite-animation-container relative text-primary-blue-2 mx-auto my-auto text-sm lg:text-md flex items-center justify-center p-0" aria-label="Learn more about this program">
				<div class="circles-unite-animation-circle-1"></div>
				<div class="circles-unite-animation-circle-2"></div>
				<div class="circles-unite-animation-anchor-wrapper z-[1000]">
					<a href={program.link} class="text-center mx-auto font-semibold font-body no-underline" rel="noopener noreferrer" target="_blank"> Learn more </a>
				</div>
			</div>
		</div>

		{#if program.requirements.length > 0}
			<div class="w-full mt-4 xl:hidden">
				<p class="font-medium text-md">Eligibility:</p>
				<ul class="list-disc text-sm pl-1 ml-4">
					{#each program.requirements as requirement}
						<li class="text-xs">
							<p class="text-sm">{requirement}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>
