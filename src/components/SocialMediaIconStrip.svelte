<script lang="ts">
	import facebook from '@/icons/facebook.svg';
	import instagram from '@/icons/instagram.svg';
	import linkedin from '@/icons/linkedin.svg';

	import type { Props } from '@/types/socialsIconStrip';

	// Imported types
	// interface Props {
	// 	socials: SocialLink[];
	// }

	// enum SocialIcons {
	// 	facebook = 'facebook',
	// 	instagram = 'instagram',
	// 	linkedin = 'linkedin',
	// }

	let { socials }: Props = $props();

	const socialsIcons = {
		facebook: facebook,
		instagram: instagram,
		linkedin: linkedin,
	};
</script>

<nav class="z-50 flex flex-row w-full justify-end mt-8 pr-4 [&>*]:ml-4 last:mr-4" aria-label="Social media links">
	{#each socials as social}
		{#if social.icon}
			<a data-astro-prefetch="tap" href={social.link} target="_blank" rel="noreferrer" class="p-2 focus:outline-none focus:ring-2 focus:ring-primary-blue-2">
				<img loading="lazy" decoding="async" src={socialsIcons[social.icon as keyof typeof socialsIcons].src} class="h-6 w-6" alt={`Follow us on ${social.icon}`} height={18} width={18} />
			</a>
		{/if}
	{/each}
</nav>
