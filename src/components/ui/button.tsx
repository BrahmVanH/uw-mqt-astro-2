import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "uppercase bg-primary text-primary-foreground lg:hover:bg-primary/90",
        destructive:
          "uppercase bg-destructive text-destructive-foreground lg:hover:bg-destructive/90",
        outline:
          "uppercase border border-input bg-background lg:hover:bg-accent lg:hover:text-accent-foreground",
        secondary:
          "uppercase bg-secondary text-secondary-foreground lg:hover:bg-secondary/80",
        ghost: "uppercase lg:hover:bg-accent lg:hover:text-accent-foreground",
        link: "uppercase text-primary underline-offset-4 lg:hover:underline",
        donate:
          "relative uppercase overflow-hidden rounded-lg leading-none  text-tertiary-black-2 shadow-lg transition-all duration-300 lg:hover:scale-105 lg:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
        privacy:
          "relative uppercase overflow-hidden rounded-sm leading-none text-white shadow-lg transition-all duration-300 lg:hover:scale-105 lg:hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
        form: "bg-transparent rounded-[16px] leading-none shadow-sm font-donate-form normal-case",
        close: "text-primary-foreground",
      },
      size: {
        default: "px-4 py-2",
        sm: "lg:py-1 text-sm lg:text-md px-1 lg:px-3",
        lg: "py-2  text-md font-semibold px-5",
        xl: "py-2  text-lg font-semibold px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonStyles = {
  donate: {
    background: `linear-gradient(135deg, #FAD42F 0%, #FFBA00 100%)`,
  },
  privacy: {
    background: `linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)`,
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(`${buttonVariants({ variant, size, className })} `)}
      style={
        variant === "donate"
          ? buttonStyles.donate
          : variant === "privacy"
            ? buttonStyles.privacy
            : {}
      }
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button };
