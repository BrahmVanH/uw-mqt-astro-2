import type { RootQueryToValuesHistoryConnection, ValuesHistory } from '@/types/__generated__/types';

export interface Config {
	content: {
		heading: string;
		subheading: string;
		ourMission: {
			title: string;
			text: string;
		};
		ourValues: {
			title: string;
			values: string[];
		};
	};
	imageOne?: Image;
	imageTwo?: Image;
	imageThree?: Image;
}

interface Image {
	src: string;
	alt: string;
	height: number;
	width: number;
}

export interface ValuesHistoryPageQueryResponse {
	valuesHistories: RootQueryToValuesHistoryConnection;
}

export interface ValuesHistoryPageQueryResponse extends ValuesHistory {}
