import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title?: string;
  role?: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, rel, target, role, ...props }, ref) => {
    return (
      <li role="none">
        <NavigationMenuLink data-astro-prefetch asChild>
          <a
            rel={rel}
            target={target}
            ref={ref}
            role={role}
            className={cn(
              "block text-black select-none space-y-1 p-2 leading-none no-underline outline-none",
              className,
            )}
            {...props}
          >
            {title}
            {children}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default ListItem;
