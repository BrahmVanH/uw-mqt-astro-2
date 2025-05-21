import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface Props {
  href?: string;
  text: string;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
  role?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: boolean;
}

const ButtonOrLink: React.FC<Props> = ({
  href,
  text,
  ariaLabel,
  onClick,
  className = "",
  role,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHaspopup,
}) => {
  const commonClasses = cn(
    "py-2 text-wrap text-pretty  lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 lg:focus:ring-primary-blue-1",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn("items-start", commonClasses)}
        aria-label={ariaLabel}
        role={role}
      >
        {text.toUpperCase()}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={cn("flex items-center m-0 w-min text-left", commonClasses)}
        aria-label={ariaLabel}
        role={role}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
      >
        <span>{text.toUpperCase()}</span>
        <ChevronDown
          className="relative top-[1px] ml-1 h-2 w-2 xl:h-3 xl:w-3"
          aria-hidden="true"
        />
      </button>
    );
  }
};

export default ButtonOrLink;
