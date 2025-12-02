<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb/';
  import { capitalizeFirstLetter } from '@/lib/utils';
  import BreadcrumbLink from '../ui/breadcrumb/breadcrumb-link.svelte';

  interface Props {
    path: string;
  }

  interface Crumb {
    title: string;
    path: string;
  }

  let { path }: Props = $props();

  let crumbs: Crumb[] = $derived(getCrumbsFromPath(path));

  function getCrumbsFromPath(p: string) {
    if (p === '/') {
      return [];
    }
    const parts = p.split('/');
    return parts.map((part, i) => {
      if (i === 0) {
        return {
          title: 'Home',
          path: '/',
        };
      } else {
        return { title: capitalizeFirstLetter(part), path: parts.slice(0, i + 1).join('/') };
      }
    });
  }

  function formatBreadcrumbName(n: string) {
    if (!n.includes('-')) {
      return n;
    }

    const nameArr = n.split('-');
    return nameArr.map(n => capitalizeFirstLetter(n)).join(' ');
  }
</script>

<Breadcrumb class="my-auto text-xs">
  <BreadcrumbList class="items-center">
    {#each crumbs as crumb, i}
      {#if i === crumbs.length - 1}
        <BreadcrumbItem class="flex items-start">
          <BreadcrumbLink href={crumb.path}>{formatBreadcrumbName(crumb.title)}</BreadcrumbLink>
        </BreadcrumbItem>
      {:else}
        <BreadcrumbItem class="flex items-start">
          <BreadcrumbLink href={crumb.path}>{formatBreadcrumbName(crumb.title)}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="" />
      {/if}
    {/each}
  </BreadcrumbList>
</Breadcrumb>
