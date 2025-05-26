import * as React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LearnMoreBtn from "./LearnMoreBtn";
import hamburgerMenuIcon from "@/icons/hambuger-menu.svg";
import navContent from "@/config/nav";
import type { NavTab } from "@/types/nav";
import ButtonOrLink from "./ButtonOrLink";
import type { SocialLink } from "@/types/socialsIconStrip";
import SocialMediaIconStrip from ".ediaIconStrip";
import logo from "@/image/logo-no-text.svg";
export interface Props {
  socials: SocialLink[];
}

const MobileNav: React.FC<Props> = ({ socials }) => {
  const { navTabs } = navContent;

  const [tabSetBreadCrumbs, setTabSetBreadCrumbs] = React.useState<NavTab[][]>([
    navTabs,
  ]);

  const [currentParentTab, setCurrentParentTab] = React.useState<NavTab | null>(
    null,
  );

  const [showGoBackButton, setShowGoBackButton] = React.useState(false);

  const handleOpenTabSet = React.useCallback(
    (tabSet: NavTab[], parentTab: NavTab) => {
      setTabSetBreadCrumbs((prev) => [...prev, tabSet]);
      setCurrentParentTab(parentTab);
    },
    [],
  );

  React.useEffect(() => {
    if (tabSetBreadCrumbs.length > 1) {
      setShowGoBackButton(true);
    } else {
      setShowGoBackButton(false);
    }
  }, [tabSetBreadCrumbs]);

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute lg:hidden right-4 top-3">
        <Button
          variant={"outline"}
          className="text-2xl border-0 shadow-none p-0 h-min"
          aria-label="Open navigation menu"
          aria-haspopup="true"
        >
          <img
            loading="lazy"
            decoding="async"
            className="w-[24px] text-primary-blue-2 font-semibold"
            src={hamburgerMenuIcon.src}
            alt="Menu"
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        showGoBackButton={showGoBackButton}
        tabSetBreadCrumbs={tabSetBreadCrumbs}
        handleGoBack={() => setTabSetBreadCrumbs((prev) => prev.slice(0, -1))}
        className=" w-full text-primary-blue-2 font-semibold overflow-y-auto scroll-x-visible pt-1 pb-1"
        side={"left"}
        aria-label="Navigation menu"
      >
        <nav aria-label="Main navigation" role="navigation">
          <div className="w-full  bg-transparent flex items-center justify-center">
            <a className="content" href="/" aria-label="Home page">
              <img
                loading="lazy"
                decoding="async"
                src={logo.src}
                alt="United Way of Marquette County Logo"
                className="relative w-24 h-24"
                width={50}
                height={50}
              />
            </a>
          </div>
          <div
            className="mt-2 ml-4 w-full flex flex-col items-start space-y-2 text-white text-xl text-left"
            role="menu"
          >
            {showGoBackButton && (
              <div
                className="border-b-2 border-primary-blue-1 w-full py-2"
                role="none"
              >
                {/* DISPLAY ROOT OF TABSET AS LINK AT TOP OF NAV */}
                <ButtonOrLink
                  data-astro-prefetch="tap"
                  className="text-primary-blue-2 font-semibold self-start "
                  href={currentParentTab?.href ?? ""}
                  text={currentParentTab?.title ?? ""}
                  ariaLabel={`Return to ${currentParentTab?.title ?? "previous menu"}`}
                  role="menuitem"
                />
              </div>
            )}
            {/* DISPLAY TABSET AT END OF ARRAY */}
            {tabSetBreadCrumbs[tabSetBreadCrumbs.length - 1]?.map(
              ({ title, href, navTabs }) => (
                <ButtonOrLink
                  data-astro-prefetch="tap"
                  className="max-w-[80%] w-full self-start text-primary-blue-2 font-semibold "
                  key={title}
                  onClick={
                    navTabs
                      ? () => handleOpenTabSet(navTabs, { title, href })
                      : undefined
                  }
                  href={navTabs ? undefined : href}
                  text={title}
                  ariaLabel={
                    navTabs ? `Open ${title} submenu` : `Navigate to ${title}`
                  }
                  role="menuitem"
                  aria-expanded={navTabs ? false : undefined}
                  aria-haspopup={navTabs ? true : undefined}
                />
              ),
            )}
          </div>
          {/* DONATE BUTTON */}
          <div
            className="flex flex-col items-center justify-center w-full list-none mt-4"
            role="none"
          >
            <LearnMoreBtn
              data-astro-prefetch="tap"
              text="Donate"
              href="/donate"
              size="lg"
              className=" px-8  justify-self-center"
              color="blue"
              useBg={false}
              ariaLabel="Make a donation to the united way of marquette county"
              openInNewTab={true}
              role="menuitem"
            />
          </div>
          <SocialMediaIconStrip socials={socials} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
