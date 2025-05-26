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
  YELLOW = "var(--primary-yellow-2)",
  BLUE = "var(--primary-blue-2)",
  RED = "var(--primary-red-1)",
}

export enum IconColor {
  YELLOW = "var(--primary-yellow-1)",
  BLUE = "var(--primary-blue-1)",
  RED = "var(--primary-red-2)",
}
