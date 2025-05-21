import type { Config } from "@/types/donationForm.ts";
const config: Config = {
  donationValuesMonthly: [
    { id: "1", value: 250, label: "$250" },
    { id: "2", value: 130, label: "$130" },
    { id: "3", value: 75, label: "$75" },
    { id: "4", value: 45, label: "$45" },
    { id: "5", value: 30, label: "$30" },
    { id: "6", value: 20, label: "$20" },
  ],

  donationValuesOneTime: [
    { id: "1", value: 600, label: "$600" },
    { id: "2", value: 300, label: "$300" },
    { id: "3", value: 150, label: "$150" },
    { id: "4", value: 90, label: "$90" },
    { id: "5", value: 55, label: "$55" },
    { id: "6", value: 35, label: "$35" },
  ],
  faqs: [
    {
      question: "Is my donation secure?",
      answer:
        "Yes, we use industry-standard SSL technology to keep your information secure. We partner with Stripe, the industry's established payment processor trusted by some of the world's largest companies. Your sensitive financial information never touches our servers. We send all data directly to Stripe's PCI-compliant servers through SSL.",
    },
    {
      question: "Is this donation tax-deductible?",
      answer:
        "Your gift is tax deductible as per your local regulations, as we are a tax exempt organization. We will email you a donation receipt. Please keep this, as it is your official record to claim this donation as a tax deduction.",
    },
    {
      question: "Can I cancel my recurring donation?",
      answer:
        "Of course. You always remain in full control of your recurring donation, and you’re free to change or cancel it at any time.",
    },
  ],
};

export default config;
