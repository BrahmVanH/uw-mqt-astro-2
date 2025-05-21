import type { Config, FooterComponentQueryResponse, InformationLink, SocialLink } from '@/types/footer';
import { footerQuery } from '@/lib/API/queries';
import { getContent } from '@/lib/API';

import type { Props } from '@/components/Footer.astro';
import type { UwContactInformationFields } from '@/types/__generated__/types';
import { getDefaultProps } from '@/lib/error';

const content: Config = {
	informationLinks: [
		{
			name: 'current 990 tax form',
			text: 'Current IRS Form 990',
			queryField: 'current990FormPdfs',
			querySubField: 'current990FormPDFFields',
		},
		{
			name: 'donor privacy policy',
			text: 'Donor Privacy Policy',
			queryField: 'donorPrivacyPolicyPdfs',
			querySubField: 'donorPrivacyPolicyPDFFields',
		},
		{
			name: 'gift acceptance policy',
			text: 'Gift Acceptance Policy',
			queryField: 'giftAcceptancePolicyPdfs',
			querySubField: 'giftAcceptancePolicyPDFFields',
		},
		{
			name: 'admin costs',
			text: 'Admin Costs',
			queryField: 'adminCostPdfs',
			querySubField: 'adminCostsPDFFields',
		},
	],
	socials: [
		{ icon: 'facebook', queryField: 'facebookLink' },
		{
			icon: 'linkedin',
			queryField: 'linkedinLink',
		},
		{ icon: 'instagram', queryField: 'instagramLink' },
	],
};

export async function getFooterData(): Promise<FooterComponentQueryResponse> {
	try {
		const response = await getContent(footerQuery);
		if (response.errors) {
			throw new Error(response.errors[0].message);
		}
		const footerData = response.data;

		if (!footerData) {
			throw new Error('No data returned from API');
		}

		return footerData;
	} catch (error) {
		return getDefaultProps<FooterComponentQueryResponse>('footer getFooterData');
	}
}

export async function createProps(): Promise<Props> {
	try {
		const wpContent = await getFooterData();
		if (!wpContent) {
			throw new Error('no wpContent in footer createProps');
		}
		const informationLinkConfig = content.informationLinks ?? [];

		const informationLinks = informationLinkConfig.map((linkObj: InformationLink) => {
			const field = wpContent[linkObj.queryField as keyof typeof wpContent];
			if (!field?.nodes?.[0]) return { ...linkObj, url: undefined };

			return {
				url: (field.nodes[0] as any)[linkObj.querySubField]?.pdfFile?.node?.mediaItemUrl as string,
				...linkObj,
			};
		});

		const contactInfo = wpContent?.uwContactInfos?.nodes[0].uWContactInformationFields;

		if (!contactInfo) {
			throw new Error('No contact information found in footer create  props');
		}

		const socials = content.socials.map((social: SocialLink) => {
			return {
				...social,
				link: contactInfo[social.queryField as keyof UwContactInformationFields] as string,
			};
		});
		return { informationLinks, socials, contactInfo };
	} catch (error) {
		return getDefaultProps<Props>(`Error in footer createProps: ${error}`);
	}
}

export default content;
