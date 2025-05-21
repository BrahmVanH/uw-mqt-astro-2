export interface Config {
  title: string;
  heading: string;
  leadershipLevelsTable: {
    title: string;
    columns: {
      level: string;
      annualGiftAmount: string;
      minimumGiftAmount: string;
      monthlyGiftIncludingFees: string;
    }[];
  };
  moreOptions: {
    heading: string;
    subheading?: string;
    text: string;
    link: string;
    linkText: string;
  }[];
  
}
