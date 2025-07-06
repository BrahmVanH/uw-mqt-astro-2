import type { ParagraphWithLink } from ".";

export type Config = {
  heading: string;
  paragraphWithLink: ParagraphWithLink;
  categories: AliceCategory[];
};



export interface AliceCategory {
  name: CategoryNames;
  color: CategoryColors;
  icon: CategoryIcons;
  subCategories: string[];
}

export enum CategoryNames {
  HOUSING = 'housing',
  CHILDCARE = 'childcare',
  FOOD = 'food',
  TRANSPORTATION = 'transportation',
  TECHNOLOGY = 'technology',
  HEALTHCARE = 'healthcare',
  TAXES = 'taxes',
  MISCELLANEOUS = 'miscellaneous',
}

export enum CategoryColors {
  HOUSING = 'primary-blue-1',
  CHILDCARE = 'primary-yellow-1',
  FOOD = 'primary-yellow-2',
  TRANSPORTATION = 'primary-red-2',
  TECHNOLOGY = 'tertiary-purple-2',
  HEALTHCARE = 'primary-blue-2',
  TAXES = 'secondary-green-2',
  MISCELLANEOUS = 'tertiary-black-1',
}

export enum CategoryIcons {
  HOUSING = 'alice-housing',
  CHILDCARE = 'alice-childcare',
  FOOD = 'alice-food',
  TRANSPORTATION = 'alice-transportation',
  TECHNOLOGY = 'alice-technology',
  HEALTHCARE = 'alice-healthcare',
  TAXES = 'alice-taxes',
  MISCELLANEOUS = 'alice-misc',
}


export type AliceHubProgram = {
  name: string;
  category: CategoryNames;
  provider: string;
  description: string;
  link?: string;
  serviceAreas: string[];
  requirements: string[];
  type?: string[];
}