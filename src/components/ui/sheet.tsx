import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import xBlue from "@/icons/x-blue.svg";
import arrowLeftBlue from "@/icons/arrow-left-blue.svg";

import { cn } from "@/lib/utils";
import type { NavTab } from "@/types/nav";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay: React.FC<
  React.ComponentProps<typeof SheetPrimitive.Overlay>
> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-1000 data-[state=open]:duration-1000",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:translate-x-[-100%] data-[state=open]:translate-x-0 sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:translate-x-[100%] data-[state=open]:translate-x-0 sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  tabSetBreadCrumbs: NavTab[][];
  showGoBackButton?: boolean;
  handleGoBack?: () => void;
}

const SheetContent: React.FC<SheetContentProps> = ({
  side = "right",
  className,
  children,
  tabSetBreadCrumbs,
  showGoBackButton,
  handleGoBack,
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {tabSetBreadCrumbs.length > 1 && (
        <button className="absolute top-4 left-4" onClick={handleGoBack}>
          <img
            loading="lazy"
            decoding="async"
            src={arrowLeftBlue.src}
            height={24}
            width={22}
            alt="go back icon"
            color="white"
            className="bg-transparent aspect-auto"
          />
          <span className="sr-only">Go back</span>
        </button>
      )}
      <SheetPrimitive.Close className="absolute right-4 top-4  ">
        <img
          loading="lazy"
          decoding="async"
          className="bg-transparent aspect-auto"
          src={xBlue.src}
          height={20}
          width={18}
          alt="close icon"
        />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle: React.FC<
  React.ComponentProps<typeof SheetPrimitive.Title>
> = ({ className, ...props }) => (
  <SheetPrimitive.Title
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription: React.FC<
  React.ComponentProps<typeof SheetPrimitive.Description>
> = ({ className, ...props }) => (
  <SheetPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
