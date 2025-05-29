export interface Config {
  commonStyles: {
    navContent: string;
    navContentLeft: string;
    navContentRight: string;
    navHeading: string;
    navTrigger: string;
    accordionContent: string;
  };
  navTabs: NavTab[];
  helpfulLinks: NavTab[]
}

export interface NavTab {
  title: string;
  href: string;
  navTabs?: NavTab[];
}
