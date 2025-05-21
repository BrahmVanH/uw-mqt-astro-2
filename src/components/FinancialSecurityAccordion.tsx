import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import config from "@/config/financialSecurityAccordion";
import LearnMoreBtn from "./LearnMoreBtn";

const FinancialSecurityAccordion: React.FC = () => {
  const items = config.items;
  const [value, setValue] = React.useState("");

  return (
    <section className="w-full flex justify-center p-4">
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
        className=" w-full max-w-3xl mx-auto space-y-2"
      >
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="group  px-4 border-none  transition-all duration-300 lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]"
          >
            <AccordionTrigger className="flex items-center w-full justify-between py-6 text-lg font-body text-primary-blue-2 transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="animate-fade-in overflow-hidden text-md">
              <div className="pb-6 pt-2 space-y-4">
                <p className="text-tertiary-black-1 leading-relaxed">
                  {item.content.text}
                </p>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2  pt-2">
                  <LearnMoreBtn
                    text={item.content.linkText ?? "Learn more"}
                    size="md"
                    href={item.content.link}
                    ariaLabel={`learn more about ${item.title}`}
                    color="blue"
                    useBg={false}
                    openInNewTab={item.content.link.split("")[0] !== "/"}
                  />
                  {item.content.link2 && (
                    <LearnMoreBtn
                      size="md"
                      href={item.content.link2}
                      ariaLabel={`learn more about ${item.title}`}
                      color="blue"
                      useBg={false}
                      openInNewTab={false}
                    />
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FinancialSecurityAccordion;
