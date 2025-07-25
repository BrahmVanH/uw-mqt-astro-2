<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const sheetVariants = tv({
		base: 'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
		variants: {
			side: {
				top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
				bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
				left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
				right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	});

	export type Side = VariantProps<typeof sheetVariants>['side'];
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import xBlue from '@/icons/x-blue.svg';
	import arrowLeftBlue from '@/icons/arrow-left-blue.svg';
	import type { Snippet } from 'svelte';
	import SheetOverlay from './sheet-overlay.svelte';
	import { cn, type WithoutChildrenOrChild } from '@/lib/utils';
	import type { NavTab } from '@/types/nav';

	let {
		ref = $bindable(null),
		class: className,
		side = 'right',
		portalProps,
		tabSetBreadcrumbs,
		showGoBackBtn,
		handleGoBack,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: SheetPrimitive.PortalProps;
		side?: Side;
		tabSetBreadcrumbs: NavTab[][];
		showGoBackBtn?: boolean;
		handleGoBack?: () => void;
		children: Snippet;
	} = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content bind:ref data-slot="sheet-content" class={cn(sheetVariants({ side }), className)} {...restProps}>
		{@render children?.()}
		{#if tabSetBreadcrumbs.length > 1}
			<button class="absolute top-4 left-4" onclick={handleGoBack}>
				<img loading="lazy" decoding="async" src={arrowLeftBlue.src} height={24} width={22} alt="go back icon" color="white" class="bg-transparent aspect-auto" />
				<span class="sr-only">Go back</span>
			</button>
		{/if}
		<SheetPrimitive.Close class="absolute right-4 top-4  ">
			<img loading="lazy" decoding="async" class="bg-transparent aspect-auto" src={xBlue.src} height={20} width={18} alt="close icon" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPrimitive.Portal>
