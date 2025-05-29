<script lang="ts">
  import { LatLng } from "leaflet";
  import Card from "./Card.svelte";
  import type { FoodPantry } from "@/types/alice";

  // Props
  let {
    sortedPantries,
    handleFocusPantryLocation,
  }: {
    sortedPantries: FoodPantry[];
    handleFocusPantryLocation: (coordinates: LatLng) => void;
  } = $props();
</script>

<div class="grid grid-cols-1 gap-2 p-2 max-h-100% overflow-y-auto">
  {#each sortedPantries as pantry (pantry.name)}
    <button
      class="content"
      onclick={() =>
        handleFocusPantryLocation(new LatLng(pantry.geo.lat, pantry.geo.lng))}
    >
      <Card {pantry} />
    </button>
  {/each}
</div>
