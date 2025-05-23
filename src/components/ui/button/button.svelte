<script lang="ts" module>
	import { cn, type WithElementRef } from "@/lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      variant: {
        default:
          "uppercase bg-primary text-primary-foreground lg:hover:bg-primary/90",
        destructive:
          "uppercase bg-destructive text-destructive-foreground lg:hover:bg-destructive/90",
        outline:
          "uppercase border border-input bg-background lg:hover:bg-accent lg:hover:text-accent-foreground",
        secondary:
          "uppercase bg-secondary text-secondary-foreground lg:hover:bg-secondary/80",
        ghost: "uppercase lg:hover:bg-accent lg:hover:text-accent-foreground",
        link: "uppercase text-primary underline-offset-4 lg:hover:underline",
        donate:
          "relative uppercase overflow-hidden rounded-lg leading-none  text-tertiary-black-2 shadow-lg transition-all duration-300 lg:hover:scale-105 lg:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
        privacy:
          "relative uppercase overflow-hidden rounded-sm leading-none text-white shadow-lg transition-all duration-300 lg:hover:scale-105 lg:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
        form: "bg-transparent rounded-[16px] leading-none shadow-sm font-donate-form normal-case",
        close: "text-primary-foreground",
      },
      size: {
        default: "px-4 py-2",
        sm: "lg:py-1 text-sm lg:text-md px-1 lg:px-3",
        lg: "py-2  text-md font-semibold px-5",
        xl: "py-2  text-lg font-semibold px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
	});

	


	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className, variant === "donate"
		? "donate-btn"
		: variant === "privacy"
			? "privacy-btn"
			: '')}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}


<style>
	.donate-btn {

		background: linear-gradient(135deg, #FAD42F 0%, #FFBA00 100%);
	}

	.privacy-btn {
    background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%),

	}
</style>