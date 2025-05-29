import AliceHousingIcon from '@/icons/alice-housing.svg';
import ChildCareIcon from '@/icons/alice-childcare.svg';
import FoodIcon from '@/icons/alice-food.svg';
import TransportationIcon from '@/icons/alice-transportation.svg';
import TechnologyIcon from '@/icons/alice-technology.svg';
import HealthcareIcon from '@/icons/alice-healthcare.svg';
import TaxesIcon from '@/icons/alice-taxes.svg';
import MiscellaneousIcon from '@/icons/alice-misc.svg';

import { CategoryColors, CategoryIcons, CategoryNames, type Config } from '@/types/aliceHub';
/**
 * Configuration for ALICE Report categories buttons
 *
 * @description controls the button text and colors for ALICE Report categories on the United for ALICE page
 */

export const config: Config = {
	heading: 'ALICE in Action',
	paragraphWithLink: {
		link: 'https://www.unitedforalice.org/overview',
		linkText: 'UnitedforALICE',
		text: "The research and attention towards ALICE offered by the UnitedforALICE research organization aims to inspire growth and innovation towards programs that offer financial stability. Across Michigan's Upper Peninsula, there are a great many programs offering assistance with housing and food insecurity, childcare, and many of the other needs of ALICE.",
		text2: 'Use the hub below to explore the many assistance programs offered across the UP',
	},
	categories: [
		{
			name: CategoryNames.HOUSING,
			color: CategoryColors.HOUSING,
			icon: CategoryIcons.HOUSING,
			subCategories: ['home rehabilitation', 'rent', 'utilities', 'miscellaneous'],
		},
		{
			name: CategoryNames.CHILDCARE,
			color: CategoryColors.CHILDCARE,
			icon: CategoryIcons.CHILDCARE,
			subCategories: [],
		},
		{
			name: CategoryNames.FOOD,
			color: CategoryColors.FOOD,
			icon: CategoryIcons.FOOD,
			subCategories: ['food pantries', 'programs'],
		},
		{
			name: CategoryNames.TRANSPORTATION,
			color: CategoryColors.TRANSPORTATION,
			icon: CategoryIcons.TRANSPORTATION,
			subCategories: [],
		},
		{
			name: CategoryNames.TECHNOLOGY,
			color: CategoryColors.TECHNOLOGY,
			icon: CategoryIcons.TECHNOLOGY,
			subCategories: [],
		},
		{
			name: CategoryNames.HEALTHCARE,
			color: CategoryColors.HEALTHCARE,
			icon: CategoryIcons.HEALTHCARE,
			subCategories: [],
		},
		{
			name: CategoryNames.TAXES,
			color: CategoryColors.TAXES,
			icon: CategoryIcons.TAXES,
			subCategories: [],
		},
		{
			name: CategoryNames.MISCELLANEOUS,
			color: CategoryColors.MISCELLANEOUS,
			icon: CategoryIcons.MISCELLANEOUS,
			subCategories: [],
		},
	],
};

export const btnIcons = {
	'alice-housing': AliceHousingIcon,
	'alice-childcare': ChildCareIcon,
	'alice-food': FoodIcon,
	'alice-transportation': TransportationIcon,
	'alice-technology': TechnologyIcon,
	'alice-healthcare': HealthcareIcon,
	'alice-taxes': TaxesIcon,
	'alice-misc': MiscellaneousIcon,
};

const subCategoryBtnBgColorClasses = ['bg-primary-blue-4', 'bg-primary-red-4', 'bg-primary-yellow-4'];

export const getSubCategoryBgColor = (i: number) => {
	if (i < 2) return subCategoryBtnBgColorClasses[i];
	let k = i;

	while (k > 2) {
		k = k - 3;
	}

	return subCategoryBtnBgColorClasses[k];
};
