import type { Config } from '@/types/aliceDataDescription';

export const config: Config = {
	heading: 'ALICE Data',
	text: 'The driving force behind United For ALICE is our data and metrics. There were 35 million ALICE households (29%) nationwide in 2018. Combined with households below the Federal Poverty Level (FPL), a total of 51 million U.S. households (42%) struggle to make ends meet. When we use data to illustrate the pervasiveness of financial hardship in the United States, we include the following metrics:',
	metrics: [
		{ title: 'ALICE', text: 'Asset Limited, Income Constrained, Employed — households with income above the FPL, but below the basic cost of living.' },
		{
			title: 'Household Survival Budget',
			text: 'The bare-minimum cost of household basics (housing, child care, food, transportation, health care, and a smartphone plan, plus taxes and a small contingency). Calculated at the county level for various household types, including a Senior Survival Budget.',
		},
		{ title: 'ALICE Threshold of Financial Survival', text: 'The average income that a household needs to afford the basics defined by the Household Survival Budget for each county.' },
		{ title: 'Below ALICE Threshold', text: 'Includes both poverty-level and ALICE households — all households unable to afford the basics.' },
		{ title: 'ALICE Essentials Index', text: 'A national standardized measure of the change over time in the costs of household basics included in the Household Survival Budget' },
	],
	link: 'https://www.unitedforalice.org/household-budgets/michigan#survival-budget-calculator',
	linkText: 'Visit the ALICE HSB Calculator',
};
