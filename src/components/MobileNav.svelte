<script lang="ts">
  import * as Sheet from "../components/ui/sheet/index";
  import { NavTab } from "./../types/nav";
  import type { SocialLink } from "../types/footer";
  import config from "../config/nav";
  interface Props {
    socials: SocialLink[];
  }

  let { socials }: Props = $props();

  const { navTabs } = config;

  let tabSetBreadcrumbs = $state<NavTab[][]>();
  let currentParentTab = $state<NavTab | null>(null);

  // derived state that will run when the tabSetBreadcrumbs var is updated - if the length is greater than one, showGoBackBtn is true
  let showGoBackBtn = $derived(() => {
    if (tabSetBreadcrumbs.length > 1) {
      return true;
    } else {
      return false;
    }
  });

  const handleOpenTabSet = (tabSet: NavTab[], parentTab: NavTab) => {
    tabSetBreadcrumbs = [...tabSetBreadcrumbs, tabSet];
    currentParentTab = parentTab;
  };
</script>

<Sheet.Root>
  <Sheet.Trigger class="absolute lg:hidden right-4 top-3">
    
  </Sheet.Trigger>
</Sheet.Root>
