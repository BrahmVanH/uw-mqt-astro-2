export interface Config {
  donationValuesMonthly: DonationValue[];
  donationValuesOneTime: DonationValue[];
  faqs: Faq[];
}

export interface DonationValue {
  id: string;
  value: number;
  label: string;
}

interface Faq {
  question: string;
  answer: string;
}
