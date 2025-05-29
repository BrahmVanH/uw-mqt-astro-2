import type { CategoryColors, CategoryNames } from './aliceHub';

export interface Config {
	content: AliceStatsCardContent;
	countyAliceStats: CountyStats[];
	chartConfig: AliceChartConfig;
	householdSurvivalBudget: HouseholdSurvivalBudget;
}

type AliceStatsCardContent = {
	heading: string;
	textWithPopover: string;
	popoverText: string;
	linkText: string;
	link: string;
	text2: string;
	text3: string;
	listItems: string[];
};

export type CountyStats = {
	county: string;
	totalHouseholds: number;
	percentBelowFPL: number;
	belowFPL: number;
	percentBelowAlice: number;
	belowAlice: number;
	percentAboveAlice: number;
	aboveAlice: number;
};

type HouseholdSurvivalBudget = { heading: string; text: string; text2: string; categories: HouseholdSurvivalBudgetCategories[] };

export type HouseholdSurvivalBudgetCategories = {
	category: CategoryNames;
	color: CategoryColors;
	description: string | (string | ExpandedBudgetItemDescription)[];
	sources: (string | ExpandedSourceItem)[];
};

export type ExpandedBudgetItemDescription = {
	title: string;
	description: string;
};

type ExpandedSourceItem = {
	subcategory: string;
	sources: string[];
};

export type AliceChartConfig = {
	totalHouseholds: {
		label: string;
	};
	belowFPL: {
		label: string;
		color: ChartColorsBlue | ChartColorsRed | ChartColorsYellow;
	};
	belowAlice: {
		label: string;
		color: ChartColorsBlue | ChartColorsRed | ChartColorsYellow;
	};
	aboveAlice: {
		label: string;
		color: ChartColorsBlue | ChartColorsRed | ChartColorsYellow;
	};
};

export interface FmtdChartDataRecord extends Record<string, FmtdChartData> {}

export interface FmtdChartData {
	county: string;
	totalHouseholds: number;
	chartData: AliceChartData[];
}

export interface AliceChartData {
	incomeLevel: ChartLabels;
	total: number;
	fill: ChartColorsYellow | ChartColorsBlue | ChartColorsRed;
	fill2: ChartColorsRed;
	fill3: ChartColorsYellow;
}

export enum ChartColorsYellow {
	YELLOW1 = 'var(--primary-yellow-2)',
	YELLOW2 = 'var(--primary-yellow-1)',
	YELLOW3 = 'var(--primary-yellow-4)',
}

export enum ChartColorsV2 {
	PURPLE = 'var(--tertiary-purple-1)',
	GREEN = 'var(--secondary-green-1)',
	YELLOW = 'var(--primary-yellow-1)',
}

export enum ChartColorsV3 {
	BLACK = 'var(--tertiary-black-2)',
	GREEN = 'var(--secondary-green-1)',
	RED = 'var(--primary-red-1)',
}

export enum ChartColorsBlue {
	BLUE1 = 'var(--primary-blue-2)',
	BLUE2 = 'var(--primary-blue-1)',
	BLUE3 = 'var(--primary-blue-4)',
}
export enum ChartColorsRed {
	RED1 = 'var(--primary-red-2)',
	RED2 = 'var(--primary-red-3)',
	RED3 = 'var(--primary-red-4)',
}

export enum ChartLabels {
	Label1 = 'belowFPL',
	Label2 = 'belowAlice',
	Label3 = 'aboveAlice',
}
