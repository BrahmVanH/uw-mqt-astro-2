<!-- Panel.svelte -->
<script lang="ts">
	import { LatLng } from 'leaflet';
	import Card from './Card.svelte';
	import type { FoodPantry } from '@/types/alice';

	// Props
	let {
		sortedPantries,
		handleFocusPantryLocation,
	}: {
		sortedPantries: FoodPantry[];
		handleFocusPantryLocation: (coordinates: LatLng) => void;
	} = $props();
</script>

<!-- Mobile: horizontal scroll, Desktop: vertical grid -->
<div class="flex flex-row gap-2 p-2 overflow-x-auto xl:grid xl:grid-cols-1 xl:overflow-x-hidden xl:overflow-y-auto xl:max-h-full">
	{#each sortedPantries as pantry (pantry.name)}
		<button class="flex-shrink-0 xl:flex-shrink" onclick={() => handleFocusPantryLocation(new LatLng(pantry.geo.lat, pantry.geo.lng))}>
			<Card {pantry} />
		</button>
	{/each}
</div>
