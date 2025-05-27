<script lang="ts">
	import { cn } from '@/lib/utils';
	import { NavigationMenu } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLAnchorElement> {
		title: string;
		role: string;
		href: string;
		rel?: string;
		target?: string;
	}

	let { class: className, title, children, role, href, ...props }: Props = $props();
</script>

<NavigationMenu.Item role="none">
	<NavigationMenu.Link data-astro-prefetch>
		<a {role} {href} class={cn('block text-black select-none space-y-1 p-2 leading-none no-underline outline-none', className)} {...props}>
			{title}
			{children}
		</a>
	</NavigationMenu.Link>
</NavigationMenu.Item>
