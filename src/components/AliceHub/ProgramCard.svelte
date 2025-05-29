<script lang="ts">
	import { capitalizeFirstLetter } from '@/lib/utils';
	import { ServiceAreas } from '@/types/alice';
	import type { AliceHubProgram, CategoryNames } from '@/types/aliceHub';

	// Props

	interface Props {
		program: AliceHubProgram;
		category: CategoryNames;
		className?: string;
	}

	let { program, category, className }: Props = $props();

	// Component functions
	function getServiceAreasDisplay(serviceAreas: ServiceAreas[]) {
		if (serviceAreas.length > 1) {
			return serviceAreas.map((area) => `${capitalizeFirstLetter(area)} County`);
		} else if (serviceAreas[0] === ServiceAreas.ALL) {
			return ['Central Upper Peninsula'];
		} else {
			return [`${capitalizeFirstLetter(serviceAreas[0])} County`];
		}
	}

	// Derived values
	let serviceAreasDisplay = $derived(getServiceAreasDisplay(program.serviceAreas as ServiceAreas[]));
</script>

<div data-category={category} class="card-decal program-card relative min-w-full min-h-[350px] flex flex-col overflow-hidden rounded-lg [&>*]:mb-2 [&>*]:mx-2 [&>*]:z-10 {className}">
	<div class="mt-2">
		<h2 class="text-lg">{program.name}</h2>
		<p class="text-md">{program.provider}</p>
	</div>

	<div>
		<p class="text-sm">{program.description}</p>
	</div>

	<div class="w-full h-full flex flex-row">
		<div class="w-1/3 flex flex-col h-full justify-between">
			<div>
				<p class="font-medium text-md text-nowrap">Available to Residents of:</p>

				<!-- Service Areas Section -->
				{#if serviceAreasDisplay.length > 1}
					<ul class="list-none">
						{#each serviceAreasDisplay as area}
							<li>
								<p>{area}</p>
							</li>
						{/each}
					</ul>
				{:else}
					<p>{serviceAreasDisplay[0]}</p>
				{/if}
			</div>
		</div>

		<!-- Requirements List -->
		<ul class="max-w-[50%] inline list-disc text-sm pl-1">
			<p class="font-medium text-md">Eligibility:</p>
			{#each program.requirements as requirement}
				<li>
					<p>{requirement}</p>
				</li>
			{/each}
		</ul>

		<!-- Learn More Link -->
		<div class="circles-unite-animation-container relative text-primary-blue-2 mx-auto my-auto text-sm lg:text-md flex items-center justify-center p-0" aria-label="Learn more about this program">
			<div class="circles-unite-animation-circle-1"></div>
			<div class="circles-unite-animation-circle-2"></div>
			<div class="circles-unit-animation-anchor-wrapper z-[1000]">
				<a href={program.link} class="text-center mx-auto font-semibold font-body no-underline" rel="noopener noreferrer" target="_blank"> Learn more </a>
			</div>
		</div>
	</div>
</div>
