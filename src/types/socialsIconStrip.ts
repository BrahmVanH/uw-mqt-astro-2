export interface Props {
	socials: SocialLink[];
}

export interface SocialLink {
	link?: string;
	icon: string;
	queryField: string;
}

export enum SocialIcons {
	facebook = 'facebook',
	instagram = 'instagram',
	linkedin = 'linkedin',
}
