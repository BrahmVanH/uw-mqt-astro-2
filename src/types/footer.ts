import type { RootQueryToCurrent990FormPdfConnection, RootQueryToUwContactInfoConnection, UwContactInformationFields } from '@/types/__generated__/types';

export interface Config {
	informationLinks?: InformationLink[];
	contactInfo?: UwContactInformationFields;
	socials: SocialLink[];
}

export interface InformationLink {
	name: string;
	text: string;
	url?: string;
	queryField: string;
	querySubField: string;
}

export interface SocialLink {
	link?: string;
	icon: string;
	queryField: string;
}

export enum SocialsFields {
	facebookLink = 'facebookLink',
	instagramLink = 'instagramLink',
	linkedinLink = 'linkedinLink',
}
export interface ContactInfo {
	streetAddress: string;
	city: string;
	state: string;
	zip: string;
	phoneNumber: string;
	googleMapsUrl: string;
	facebookLink: string;
	instagramLink: string;
	linkedinLink: string;
}

export interface FooterComponentQueryResponse {
	current990FormPdfs: RootQueryToCurrent990FormPdfConnection;
	donorPrivacyPolicyPdfs: RootQueryToCurrent990FormPdfConnection;
	giftAcceptancePolicyPdfs: RootQueryToCurrent990FormPdfConnection;
	adminCostPdfs: RootQueryToCurrent990FormPdfConnection;
	uwContactInfos: RootQueryToUwContactInfoConnection;
}
