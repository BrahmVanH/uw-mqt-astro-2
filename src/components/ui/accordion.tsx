import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem: React.FC<
  React.ComponentProps<typeof AccordionPrimitive.Item>
> = ({ className, ...props }) => (
  <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  openTo?: "down" | "left";
}
const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
  openTo = "down",
  ...props
}) => (
  <AccordionPrimitive.Trigger
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all lg:hover:underline ",
      openTo === "down"
        ? "[&[data-state=open]>svg]:rotate-180"
        : "[&[data-state=open]>svg]:rotate-90",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent: React.FC<
  React.ComponentProps<typeof AccordionPrimitive.Content>
> = ({ className, children, ...props }) => (
  <AccordionPrimitive.Content
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
