export interface Config {
  cards: Card[];
}

export interface Card {
  title: string;
  text: string;
  icon: string;
  headingBgColor: HeadingBgColor;
  iconColor: IconColor;
}

export enum HeadingBgColor {
  YELLOW = "primary-yellow-2",
  BLUE = "primary-blue-2",
  RED = "primary-red-2",
}

export enum IconColor {
  YELLOW = "primary-yellow-1",
  BLUE = "primary-blue-1",
  RED = "primary-red-1",
}
