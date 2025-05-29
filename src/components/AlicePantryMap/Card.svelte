<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { FoodPantry, PantryHours } from "@/types/alice";

  // Props
  let { pantry, className = "" }: { pantry: FoodPantry; className?: string } =
    $props();

  // Helper functions
  function getHoursStrings(hoursObj: PantryHours): string[] {
    const filtered = Object.fromEntries(
      Object.entries(hoursObj).filter(([_, v]) => v != ""),
    );
    const days = Object.keys(filtered);
    const hours = Object.values(filtered);

    return days.map((day, i) => `${day.toUpperCase()} ${hours[i]}`);
  }

  // Computed values
  let hours = $derived(
    typeof pantry.hours === "string"
      ? pantry.hours
      : getHoursStrings(pantry.hours),
  );
</script>

<div
  class="flex flex-col p-[16px] h-min border-2 border-primary-blue-4 rounded-lg {className}"
>
  <div class="flex flex-row items-start">
    <div class="w-1/2">
      <h2 class="text-lg text-left">{pantry.name}</h2>
      {#if pantry.phone}
        <div class="flex flex-row items-center">
          <Icon
            icon="line-md:phone"
            class="text-black bg-transparent w-2 h-2 mr-1"
          />
          <p>{pantry.phone}</p>
        </div>
      {/if}
      <div class="flex flex-row items-center">
        <Icon
          icon="line-md:map-marker"
          class="text-black bg-transparent w-2 h-2 mr-1"
        />
        <div class="flex flex-col items-center">
          <p>{pantry.address.street}</p>
          <p>
            {pantry.address.city}, {pantry.address.state}
            {pantry.address.zip}
          </p>
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <ul class="list-disc">
        {#if typeof hours === "string"}
          <li class="text-xs ml-3">
            <span class="text-sm">
              {hours}
            </span>
          </li>
        {:else}
          {#each hours as day}
            <li class="text-xs ml-3">
              <span class="text-sm">{day}</span>
            </li>
          {/each}
        {/if}
      </ul>
      <ul class="flex flex-col">
        {#each pantry.flags as flag}
          <li class="text-xs ml-3">
            <span class="text-sm">{flag}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="justify-self-end w-full">
    <!-- buttons could go here -->
  </div>
</div>
