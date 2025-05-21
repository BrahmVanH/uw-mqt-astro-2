export interface Config {
  items: FinancialSecurityAccordionItem[]
}

interface FinancialSecurityAccordionItem {
  title: string; 
  content: {
    text: string;
    link: string;
    linkText?: string;
    link2?: string;
  }
}
