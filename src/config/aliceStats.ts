import { CategoryColors, CategoryNames } from '@/types/aliceHub';
import { ChartColorsBlue, ChartColorsRed, ChartColorsYellow, ChartLabels, type AliceChartData, type Config, type CountyStats, type FmtdChartData, type FmtdChartDataRecord } from '@/types/aliceStats';

export const config: Config = {
	content: {
		heading: 'MI Upper Peninsula - Overview',
		textWithPopover:
			'United For ALICE calculates the cost of household essentials for all counties in Michigan. These costs, outlined in the Household Survival Budget, are calculated for various household sizes and compositions.',
		popoverText: 'Household Survival Budget',
		link: 'https://www.unitedforalice.org/household-budgets/michigan#survival-budget-calculator',
		linkText: 'Visit the ALICE HSB Calculator',
		text2:
			'At the time of the most recent report (2022), household costs in every county in Michigan were well above the Federal Poverty Level of $13,590 for a single adult and $27,750 for a family of four.',
		text3: "Of the Upper Peninsula's 127,590 households in 2022…",
		listItems: [
			'15% earned below the Federal Poverty Level (FPL)',
			'30% were ALICE, in households that earned above the FPL but not enough to afford the basics in the communities where they live',
			'Together, 45% of households in Michigan were below the ALICE Threshold (poverty + ALICE divided by total households)',
		],
	},
	countyAliceStats: [
		{
			county: 'overall',
			totalHouseholds: 127590,
			percentBelowFPL: Math.round(18582.1 / 127590) * 100,
			belowFPL: 18582.1,
			percentBelowAlice: Math.round(38816.9 / 127590) * 100,
			belowAlice: 38816.9,
			percentAboveAlice: Math.round(70127.38 / 127590) * 100,
			aboveAlice: 70127.38,
		},
		{
			county: 'goegebic',
			totalHouseholds: 6937,
			percentBelowFPL: 16,
			belowFPL: 6937 * 0.16,
			percentBelowAlice: 35,
			belowAlice: 6937 * 0.35,
			percentAboveAlice: 49,
			aboveAlice: 6937 * 0.49,
		},
		{
			county: 'ontonogan',
			totalHouseholds: 2872,
			percentBelowFPL: 14,
			belowFPL: 2872 * 0.14,
			percentBelowAlice: 37,
			belowAlice: 2872 * 0.37,
			percentAboveAlice: 49,
			aboveAlice: 2872 * 0.49,
		},
		{
			county: 'houghton',
			totalHouseholds: 14173,
			percentBelowFPL: 19,
			belowFPL: 14173 * 0.19,
			percentBelowAlice: 32,
			belowAlice: 14173 * 0.32,
			percentAboveAlice: 50,
			aboveAlice: 14173 * 0.5,
		},
		{
			county: 'kewenaw',
			totalHouseholds: 1065,
			percentBelowFPL: 7,
			belowFPL: 1065 * 0.07,
			percentBelowAlice: 34,
			belowAlice: 1065 * 0.34,
			percentAboveAlice: 59,
			aboveAlice: 1065 * 0.59,
		},
		{
			county: 'iron',
			totalHouseholds: 5190,
			percentBelowFPL: 14,
			belowFPL: 5190 * 0.14,
			percentBelowAlice: 33,
			belowAlice: 5190 * 0.33,
			percentAboveAlice: 52,
			aboveAlice: 5190 * 0.52,
		},
		{
			county: 'baraga',
			totalHouseholds: 3241,
			percentBelowFPL: 14,
			belowFPL: 3241 * 0.14,
			percentBelowAlice: 39,
			belowAlice: 3241 * 0.39,
			percentAboveAlice: 47,
			aboveAlice: 3241 * 0.47,
		},
		{
			county: 'marquette',
			totalHouseholds: 28633,
			percentBelowFPL: 14,
			belowFPL: 28633 * 0.14,
			percentBelowAlice: 26,
			belowAlice: 28633 * 0.26,
			percentAboveAlice: 60,
			aboveAlice: 28633 * 0.6,
		},
		{
			county: 'dickinson',
			totalHouseholds: 11560,
			percentBelowFPL: 10,
			belowFPL: 11560 * 0.1,
			percentBelowAlice: 27,
			belowAlice: 11560 * 0.27,
			percentAboveAlice: 62,
			aboveAlice: 11560 * 0.62,
		},
		{
			county: 'menominee',
			totalHouseholds: 9971,
			percentBelowFPL: 12,
			belowFPL: 9971 * 0.12,
			percentBelowAlice: 35,
			belowAlice: 9971 * 0.35,
			percentAboveAlice: 53,
			aboveAlice: 9971 * 0.53,
		},
		{
			county: 'alger',
			totalHouseholds: 3274,
			percentBelowFPL: 13,
			belowFPL: 3274 * 0.13,
			percentBelowAlice: 39,
			belowAlice: 3274 * 0.39,
			percentAboveAlice: 48,
			aboveAlice: 3274 * 0.48,
		},
		{
			county: 'delta',
			totalHouseholds: 15851,
			percentBelowFPL: 15,
			belowFPL: 15851 * 0.15,
			percentBelowAlice: 30,
			belowAlice: 15851 * 0.3,
			percentAboveAlice: 55,
			aboveAlice: 15851 * 0.55,
		},
		{
			county: 'schoolcraft',
			totalHouseholds: 3785,
			percentBelowFPL: 14,
			belowFPL: 3785 * 0.14,
			percentBelowAlice: 30,
			belowAlice: 3785 * 0.3,
			percentAboveAlice: 55,
			aboveAlice: 3785 * 0.55,
		},
		{
			county: 'luce',
			totalHouseholds: 2065,
			percentBelowFPL: 19,
			belowFPL: 2065 * 0.19,
			percentBelowAlice: 32,
			belowAlice: 2065 * 0.32,
			percentAboveAlice: 49,
			aboveAlice: 2065 * 0.49,
		},
		{
			county: 'mackinac',
			totalHouseholds: 5226,
			percentBelowFPL: 16,
			belowFPL: 5226 * 0.16,
			percentBelowAlice: 25,
			belowAlice: 5226 * 0.25,
			percentAboveAlice: 59,
			aboveAlice: 5226 * 0.59,
		},
		{
			county: 'chippewa',
			totalHouseholds: 13747,
			percentBelowFPL: 16,
			belowFPL: 13747 * 0.16,
			percentBelowAlice: 31,
			belowAlice: 13747 * 0.31,
			percentAboveAlice: 53,
			aboveAlice: 13747 * 0.53,
		},
	],
	chartConfig: {
		totalHouseholds: {
			label: 'Households',
		},
		belowFPL: {
			label: 'Below FPL',
			color: ChartColorsBlue.BLUE2,
		},
		belowAlice: {
			label: 'Below ALICE',
			color: ChartColorsBlue.BLUE3,
		},
		aboveAlice: {
			label: 'Above ALICE',
			color: ChartColorsBlue.BLUE1,
		},
	},
	householdSurvivalBudget: {
		heading: 'The ALICE Household Survival Budget',
		text: 'The Household Survival Budget reflects the minimum cost to live and work in the current economy. This budget is the basis for determining whether households are above or below the ALICE Threshold by county.',
		text2: 'Below are the sources and descriptions of each cost',
		categories: [
			{
				category: CategoryNames.HOUSING,
				color: CategoryColors.HOUSING,
				description: [
					{
						title: 'rent',
						description:
							'Fair Market Rent (40th percentile) for an efficiency, one-bedroom, or two-bedroom apartment (based on family size), adjusted in metro areas using the American Community Survey (ACS) – minus utilities.',
					},
					{
						title: 'utilities',
						description: 'As captured by the Consumer Expenditure Survey (CEX)',
					},
					{
						title: 'update',
						description: 'Cost of rent and utilities now shown separately.',
					},
				],
				sources: [
					{ subcategory: 'Rent', sources: ['U.S. Department of Housing and Urban Development', 'ACS metro housing costs.'] },
					{ subcategory: 'Utility costs', sources: ['CEX'] },
				],
			},
			{
				category: CategoryNames.CHILDCARE,
				color: CategoryColors.CHILDCARE,
				description: 'Cost for registered Family Child Care Homes for infants (0–2 years), preschool-age (3–4), and school-age children (5–12).',
				sources: ['State agency responsible for child care cost reporting'],
			},
			{
				category: CategoryNames.FOOD,
				color: CategoryColors.FOOD,
				description: [
					'USDA Thrifty Food Plan by age with county variation from Feeding America',
					{
						title: 'update',
						description:
							' Change in legislation requires the USDA Thrifty Food Plans to reflect the cost for resource-constrained households to purchase a healthy, practical diet, starting in 2021, increasing costs from prior years.',
					},
				],
				sources: ['U.S. Department of Agriculture (USDA)', 'Feeding America'],
			},
			{
				category: CategoryNames.TRANSPORTATION,
				color: CategoryColors.TRANSPORTATION,
				description: ['Operating costs for a car (based on average daily miles by age, cost per mile, license, fees, and insurance), or public transportation where viable'],
				sources: ['Federal Highway Administration', 'AAA', { subcategory: 'car costs', sources: ['The Zebra (car costs)'] }, { subcategory: 'public transportation', sources: ['CEX'] }],
			},
			{
				category: CategoryNames.TECHNOLOGY,
				color: CategoryColors.TECHNOLOGY,
				description: [
					'Basic home internet and an unlimited smartphone plan for each adult in the household',
					{
						title: 'update',
						description:
							' To reflect the finding that the majority of Americans now have home broadband, basic broadband internet has been added to technology costs. The smartphone plan has been updated to include an unlimited (albeit less expensive than the previous 10G version) smartphone plan for each adult in the household.',
					},
				],
				sources: ['Consumer Reports'],
			},
			{
				category: CategoryNames.HEALTHCARE,
				color: CategoryColors.HEALTHCARE,
				description: [
					'Health insurance premiums based on employer-sponsored health insurance plus out-of-pocket costs for $40K–$69K households by age, weighted with the poor health multiplier. For senior budget, cost of Medicare Part A and B, out-of-pocket costs, plus average out-of-pocket spending for the top five chronic diseases as reported by CMS.',
				],
				sources: ['Centers for Medicare and Medicaid Services (CMS)', 'CEX (health)', 'Medical Expenditure Panel Survey (MEPS)'],
			},
			{
				category: CategoryNames.TAXES,
				color: CategoryColors.TAXES,
				description: ['Federal, state, and local taxes (payments), as well as tax credits, including the Child Tax Credit and the Child and Dependent Care Tax Credit.'],
				sources: ['Internal Revenue Service', 'Tax Foundation'],
			},
			{
				category: CategoryNames.MISCELLANEOUS,
				color: CategoryColors.MISCELLANEOUS,
				description: ['Cost overruns estimated at 10% of the budget, excluding taxes, to cover one-time unanticipated costs in the other categories.'],
				sources: [''],
			},
		],
	},
};

export function formatCountyStatsForChart<T extends string>(countyAliceStats: CountyStats[]): FmtdChartDataRecord {
	const countyChartColorsYellow = Object.values(ChartColorsYellow);
	const countyChartColorsBlue = Object.values(ChartColorsBlue);
	const countyChartColorsRed = Object.values(ChartColorsRed);
	let countyStats = countyAliceStats.reduce((obj, county) => {
		obj[county.county] = {
			county: county.county,
			totalHouseholds: county.totalHouseholds,
			chartData: [
				{
					incomeLevel: ChartLabels.Label1,
					total: county.belowFPL ?? county.totalHouseholds / 3,
					fill: county.county === 'overall' ? countyChartColorsYellow[0] : countyChartColorsBlue[0],
					fill2: countyChartColorsRed[0],
					fill3: countyChartColorsYellow[0],
				},
				{
					incomeLevel: ChartLabels.Label2,
					total: county.belowAlice ?? county.totalHouseholds / 3,
					fill: county.county === 'overall' ? countyChartColorsYellow[1] : countyChartColorsBlue[1],
					fill2: countyChartColorsRed[1],
					fill3: countyChartColorsYellow[1],
				},
				{
					incomeLevel: ChartLabels.Label3,
					total: county.aboveAlice ?? county.totalHouseholds / 3,
					fill: county.county === 'overall' ? countyChartColorsYellow[2] : countyChartColorsBlue[2],
					fill2: countyChartColorsRed[2],
					fill3: countyChartColorsYellow[2],
				},
			] as AliceChartData[],
		} as FmtdChartData;
		return obj;
	}, {});

	return countyStats as Record<T, FmtdChartData>;
}

export function getAllCountyNames(countyAliceStats: CountyStats[]): string[] {
	return countyAliceStats.map((c) => c.county).filter((c) => c != 'overall');
}
