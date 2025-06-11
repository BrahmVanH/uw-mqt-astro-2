<script lang="ts">
  import programs from "@/lib/data/childcare.json";
  import ProgramCard from "./ProgramCard.svelte";

  import { CategoryNames } from "@/types/aliceHub";
</script>

<div
  class="h-full p-[16px] max-h-[75vh] overflow-hidden justify-self-center rounded-md my-2 px-4"
>
  <div class="w-full h-min flex flex-col justify-between">
    <h2 class="text-xl">Childcare Programs</h2>

    <!-- Programs List -->
    <div
      class="flex flex-col items-center gap-[16px] h-[80vh] overflow-y-scroll border-t-2 border-tertiary-black-3 p-2"
    >
      {#each programs as program (program.name)}
        <ProgramCard category={CategoryNames.CHILDCARE} {program} />
      {/each}
    </div>
  </div>
</div>
