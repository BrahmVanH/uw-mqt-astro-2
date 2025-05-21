import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import historyOfContent from "@/config/historyOf";
import BulletIcon from "@/icons/bullet.svg";

interface Props {
  className?: string;
}
const HistoryOfAccordion: React.FC<Props> = ({ className }) => {
  const [value, setValue] = React.useState<string>("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const volumes = historyOfContent?.volumes;

  return (
    <section
      className={`${className} w-full flex flex-col justify-center items-center lg:p-4`}
      aria-labelledby="history-title"
    >
      <h2
        id="history-title"
        className="text-xl lg:text-2xl font-bold text-primary-blue-2 text-center mb-2"
      >
        {historyOfContent.title}
      </h2>
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={handleValueChange}
        className="w-full max-w-3xl mx-auto space-y-2"
      >
        {volumes?.map((volume, index) => (
          <AccordionItem
            key={index}
            value={`volume-${index}`}
            className="group px-4 border-none transition-all duration-300"
          >
            <AccordionTrigger className="flex items-center w-full justify-between py-6 text-lg font-body transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1">
              {volume.rangeString}
            </AccordionTrigger>
            <AccordionContent className="animate-fade-in text-md">
              <div className="pb-6 pt-2 space-y-4">
                {volume?.yearEntries?.map((yearEntry) => (
                  <div key={yearEntry.year}>
                    <h3 className="text-tertiary-black-1 font-bold my-auto">
                      {yearEntry?.year}
                    </h3>
                    <ul className="lg:pl-4 list-none">
                      {yearEntry?.entries?.map((entry, index) => (
                        <li
                          key={index}
                          className="text-tertiary-black-1 flex flex-row items-start mt-4"
                        >
                          <span
                            className="mr-1 lg:mx-2 mt-1"
                            aria-hidden="true"
                          >
                            <img
                              loading="lazy"
                              decoding="async"
                              src={BulletIcon.src}
                              alt=""
                              width={10}
                              height={10}
                              role="presentation"
                            />
                          </span>
                          <p className="mx-0 lg:mx-2 my-auto w-full lg:w-[80%] text-md text-left leading-relaxed">
                            {entry}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
HistoryOfAccordion.displayName = "HistoryOfAccordion";
export default HistoryOfAccordion;
