import * as React from "react";
import PieChart from "./PieChart";

import {
  config,
  formatCountyStatsForChart,
  getAllCountyNames,
} from "@/config/aliceStats";
import {
  type AliceStatsCardContent,
  type CountyStats,
  type FmtdChartData,
  type FmtdChartDataRecord,
  type HouseholdSurvivalBudgetCategories,
} from "@/types/aliceStats";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SkeletonText from "../Skeleton/Text";
import SkeletonPieChart from "../Skeleton/PieChart";
import type { AliceStatsFieldsContent, RootQueryToAliceStatsConnection } from "@/types/__generated__/types";
import { getDefaultProps } from "@/lib/error";


const CountyButton = React.memo(
  ({
    name,
    isSelected,
    selectionIndex,
    onButtonClick,
  }: {
    name: string;
    isSelected: boolean;
    selectionIndex: number;
    onButtonClick: (e: React.MouseEvent, name: string) => void;
  }) => {
    const buttonClass = React.useMemo(() => {
      return cn(
        "border-2 rounded-[64px] text-xs text-nowrap min-w-fit px-1 py-1 ml-1 cursor-pointer focus:ring-0",
        isSelected
          ? selectionIndex === 0
            ? "bg-primary-blue-4"
            : selectionIndex === 1
              ? "bg-primary-red-3"
              : "bg-primary-yellow-2"
          : "",
      );
    }, [isSelected, selectionIndex]);

    return (
      <button className={buttonClass} onClick={(e) => onButtonClick(e, name)}>
        {capitalizeFirstLetter(name)}
      </button>
    );
  },
);

CountyButton.displayName = "CountyButton";

const ChartDisplay = React.memo(
  ({
    overallStats,
    activeCountyStats,
  }: {
    overallStats: FmtdChartData | null;
    activeCountyStats: FmtdChartData[];
  }) => {
    return (
      <div className={"w-full flex flex-row justify-center items-center my-2"}>
        {overallStats && (
          <PieChart
            key={overallStats.county}
            county={overallStats.county}
            chartData={overallStats.chartData}
            chartConfig={config.chartConfig}
            totalHouseholds={overallStats.totalHouseholds}
          />
        )}
        {activeCountyStats.map((c, i) => {
          const chartData = c.chartData.map((point) => {
            return {
              ...point,
              fill: i === 0 ? point.fill : i === 2 ? point.fill3 : point.fill2,
            };
          });

          return (
            <PieChart
              key={c.county}
              county={c.county}
              chartData={chartData}
              chartConfig={config.chartConfig}
              totalHouseholds={c.totalHouseholds}
            />
          );
        })}
      </div>
    );
  },
);

ChartDisplay.displayName = "ChartDisplay";

interface Props {
  countyNames: string[];
  statsByCounty: FmtdChartDataRecord;
  content: AliceStatsCardContent;
}


export function createProps(wpContent: RootQueryToAliceStatsConnection): Props {
  if (!wpContent?.nodes[0]?.aliceStatsFields) {
    return getDefaultProps<Props>('AliceStats');
  }

  const root = wpContent?.nodes[0]?.aliceStatsFields;
  const statsWpContent = root?.content ?? ({} as AliceStatsFieldsContent);

  const listItems: string[] = [];
  for (let i = 1; i < 5; i++) {
    if (!statsWpContent[`listItem${i}` as keyof typeof statsWpContent]) {
      break;
    }
    listItems.push(statsWpContent[`listItem${i}` as keyof typeof statsWpContent] as string);
  }
  const content: AliceStatsCardContent = {
    heading: statsWpContent?.heading ?? '',
    textWithPopover: statsWpContent.textWithPopover ?? '',
    popoverText: statsWpContent.popoverText ?? '',
    linkText: statsWpContent.linkText ?? '',
    link: statsWpContent.link ?? '',
    text2: statsWpContent.text2 ?? '',
    text3: statsWpContent.text3 ?? '',
    listItems: listItems,
  };

  if (!root?.countyStats) {
    return getDefaultProps<Props>('AliceStats');
  }
  const countyNames = root?.countyStats ? Object.keys(root.countyStats) : [];

  const counties: CountyStats[] = Object.values(root.countyStats)
    ?.map((c, i) => {
      if (typeof c !== 'string') {
        return { ...c, county: countyNames[i] } as CountyStats;
      }
    })
    .filter((c) => c !== undefined);
  const statsByCounty = formatCountyStatsForChart(counties);

  return { countyNames, content, statsByCounty };
}

/**
 *
 * Display component for ALICE Stats pertaining to Michigan and Central Upper Peninsula
 *
 * @returns React component with text and interactive pie chart display
 */
const AliceStats: React.FC<Props> = ({ countyNames, statsByCounty, content }) => {
  // State management
  const [overallStats, setOverallStats] = React.useState<FmtdChartData | null>(
    null,
  );
  const [activeCountyStats, setActiveCountyStats] = React.useState<
    FmtdChartData[]
  >([]);
  const [currentCounty, setCurrentCounty] = React.useState<string>("");
  const [selectedCountyNames, setSelectedCountyNames] = React.useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);


  /**
   * Set initial states for overall and active county ALICE stats
   */
  const initialize = React.useCallback(() => {
    if (statsByCounty) {
      setOverallStats(statsByCounty["overall"]);
    }

    if (currentCounty) {
      setActiveCountyStats([statsByCounty[currentCounty]]);
    }
  }, [currentCounty]);

  /**
   * Updates selected counties list and active county stats list
   * for pie charts to display
   *
   * Re-memoized on selectedCountyNames and activeCountyStats state change
   *
   * @param {React.MouseEvent} e - Button click event
   * @param {string} countyName - Name of selected county
   */
  const handleUpdateSelectedCounties = React.useCallback(
    (e: React.MouseEvent, countyName: string): void => {
      e.preventDefault();
      setSelectedCountyNames((prev) => {
        let newSelectedCounties: string[];

        if (prev.includes(countyName)) {
          newSelectedCounties = prev.filter((n) => n !== countyName);
        } else if (prev.length < 1) {
          newSelectedCounties = [countyName];
        } else if (prev.length < 2) {
          newSelectedCounties = [...prev, countyName];
        } else if (prev.length <= 3) {
          newSelectedCounties = [prev[0], prev[1], countyName];
        } else {
          return prev; // No change
        }

        // Update active county stats based on new selection
        setActiveCountyStats((prevStats) => {
          if (newSelectedCounties.length === 0) {
            return [];
          } else if (prev.includes(countyName)) {
            return prevStats.filter((c) => c.county !== countyName);
          } else if (prev.length < 1) {
            return [statsByCounty[countyName]];
          } else if (prev.length < 2) {
            return [...prevStats, statsByCounty[countyName]];
          } else {
            return [
              prevStats[0],
              prevStats[1],
              statsByCounty[countyName],
            ].filter((_, i) => i < 3);
          }
        });

        // Update overall stats visibility
        if (newSelectedCounties.length >= 3) {
          setOverallStats(null);
        }

        return newSelectedCounties;
      });
    },
    [],
  );

  // Ensure that overall stats pie chart is displayed when
  // no counties are selected
  React.useEffect(() => {
    if (!overallStats && activeCountyStats.length < 3) {
      setOverallStats(statsByCounty["overall"]);
    } else if (activeCountyStats.length > 2) {
      setOverallStats(null);
    }
  }, [activeCountyStats]);

  // Initialize app and set loading state to false on component mount
  React.useEffect(() => {
    initialize();
    setIsLoading(false);
  }, []);

  const listItems = React.useMemo(
    () =>
      content.listItems.map((item) => (
        <li className="text-sm ml-3" key={item}>
          <span className="text-md">{item}</span>
        </li>
      )),
    [content.listItems],
  );

  const countyButtons = React.useMemo(
    () =>
      countyNames.map((name: string, i) => (
        <CountyButton
          key={name}
          name={name}
          isSelected={selectedCountyNames.includes(name)}
          selectionIndex={selectedCountyNames.indexOf(name)}
          onButtonClick={handleUpdateSelectedCounties}
        />
      )),
    [selectedCountyNames, handleUpdateSelectedCounties],
  );

  return (
    <div className="w-[80%] flex mx-auto mb-4 px-4">
      <div className="w-1/2 text-md">
        {isLoading ? (
          <SkeletonText />
        ) : (
          <>
            <h2 className="text-lg mb-2">{content.heading}</h2>
            <DescriptionText
              className="mb-3"
              textWithPopover={content.textWithPopover}
              link={content.link}
              linkText={content.linkText}
              popoverText={content.popoverText}
            />
            <p className="mb-1 ">{content.text2}</p>
            <ul className="list-disc ">{listItems}</ul>
          </>
        )}
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        {/* <div className={cn('w-full grid gap-4 auto-rows-min', getChartContainerStyles(activeCountyStats.length + 1))}> */}
        <h3 className="text-lg">ALICE in the Central UP</h3>
        {isLoading ? (
          <SkeletonPieChart />
        ) : (
          <ChartDisplay
            overallStats={overallStats}
            activeCountyStats={activeCountyStats}
          />
        )}
        <div className="w-3/4 flex flex-wrap  justify-center">
          {countyButtons}
        </div>
      </div>
    </div>
  );
};

/**
 * Props interface for the DescriptionText component
 *
 * Extends React's HTMLAttributes for paragraphs to support all standard
 * paragraph properties while adding custom properties for popover functionality
 * and link rendering.
 *
 * @interface DescriptionTextProps
 * @extends {React.HTMLAttributes<HTMLParagraphElement>}
 *
 * @property {string} textWithPopover - The complete text content that includes a term requiring
 *                                      a popover explanation. This term should match the popoverText.
 * @property {string} popoverText - The specific term within textWithPopover that will trigger
 *                                  the popover when clicked. This exact string will be used to
 *                                  split the textWithPopover into parts.
 * @property {string} linkText - Display text for the optional hyperlink that may appear in the popover.
 *                              Should be concise and descriptive of the destination.
 * @property {string} link - URL for the related resource. Should be a fully qualified URL.
 *                          This link is presented within the popover content.
 *
 * @example
 * ```tsx
 * <DescriptionText
 *   textWithPopover="ALICE calculates the Household Survival Budget for all counties."
 *   popoverText="Household Survival Budget"
 *   linkText="Visit the ALICE Calculator"
 *   link="https://www.unitedforalice.org/household-budgets"
 *   className="my-4 text-neutral-800"
 * />
 * ```
 */
interface DescriptionTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Complete text content containing a term that needs further explanation via popover
   */
  textWithPopover: string;

  /**
   * The exact term within textWithPopover that will trigger the popover
   */
  popoverText: string;

  /**
   * Display text for the hyperlink within the popover
   */
  linkText: string;

  /**
   * URL for the related resource linked from the popover
   */
  link: string;
}

/**
 * Renders text with an interactive popover for a specific term
 *
 * This component takes a text string and identifies a specific term within it that
 * requires additional explanation. That term becomes clickable, and when activated,
 * displays a popover with detailed information and an optional link to further resources.
 *
 * The component:
 * 1. Splits the input text around the popover term
 * 2. Renders the term as a clickable trigger
 * 3. Displays comprehensive information in a popover when clicked
 * 4. Handles complex nested content within the popover
 *
 * @param {DescriptionTextProps} props - Component properties
 * @param {string} props.textWithPopover - Full text content containing the term
 * @param {string} props.popoverText - Term that triggers the popover
 * @param {string} props.linkText - Text for the external resource link
 * @param {string} props.link - URL for the external resource
 * @param {string} [props.className] - Optional CSS classes
 *
 * @returns {React.ReactElement} A paragraph with embedded interactive popover
 */
const DescriptionText = React.memo<DescriptionTextProps>(
  ({ textWithPopover, popoverText, linkText, link, className, ...props }) => {
    const [textA, textB] = React.useMemo(
      () => textWithPopover.split(popoverText),
      [textWithPopover, popoverText],
    );

    /**
     * Extracts and formats budget category research description based on top level strings or nested description objects in parameter
     * Memoized once on component mount
     *
     * @param {HouseholdSurvivalBudgetCategories['description']} description - An array of strings or mix of strings and ExpandedHouseholdBudgetItem
     */
    const getBudgetCategoryDescriptionEls = React.useCallback(
      (description: HouseholdSurvivalBudgetCategories["description"]) => {
        if (typeof description === "string") {
          return [
            <p key={description} className="text-sm mt-1">
              {description}
            </p>,
          ];
        } else {
          return description.map((d) => {
            if (typeof d === "string") {
              return (
                <p className="text-sm mt-1" key={d}>
                  {d}
                </p>
              );
            } else {
              return (
                <p className="text-sm mt-1" key={d.title}>
                  <span className="font-bold">
                    {capitalizeFirstLetter(d.title) + ": "}
                  </span>
                  <span className="ml-[0.5rem]">{d.description}</span>
                </p>
              );
            }
          });
        }
      },
      [],
    );

    /**
     * Extracts and formats ALICE budget category research sources
     * Memoized once on component mount
     *
     * @param {HouseholdSurvivalBudgetCategories['sources']} sources - An array containing a mix of strings and ExpandedSourceItems
     *
     */
    const getBudgetCategorySourcesEl = React.useCallback(
      (sources: HouseholdSurvivalBudgetCategories["sources"]) => {
        if (sources[0] != "") {
          return (
            <p className="mt-2">
              <span className="text-sm font-bold">Sources: </span>
              <span className="text-xs">
                {sources.map((s) => {
                  if (typeof s === "string") {
                    return s + ": ";
                  } else {
                    return `${s.subcategory} - ${s.sources.map((awk, i) => (i + 1 === s.sources.length ? awk : awk + ", "))};`;
                  }
                })}
              </span>
            </p>
          );
        } else {
          return <></>;
        }
      },
      [],
    );

    const popoverContent = React.useMemo(
      () => (
        <PopoverContent
          align="start"
          sideOffset={-400}
          className="max-w-[50vw] max-h-[500px] overflow-y-scroll rounded-sm border-2 border-primary-blue-3"
        >
          <div className="flex flex-col ">
            <div className="space-y-2">
              <h4 className="text-lg font-medium leading-none">
                {config.householdSurvivalBudget.heading}
              </h4>
              <p className="text-sm text-muted-foreground">
                {config.householdSurvivalBudget.text}
              </p>
              <p className="text-sm text-muted-foreground">
                {config.householdSurvivalBudget.text2}
              </p>
            </div>
            <div className="grid grid-cols-2 mb-4">
              {config.householdSurvivalBudget.categories.map((c) => {
                const descriptionEls = getBudgetCategoryDescriptionEls(
                  c.description,
                );
                const sourcesEl = getBudgetCategorySourcesEl(c.sources);
                return (
                  <div key={c.category} className="flex flex-col mt-2">
                    <h5
                      className={cn(
                        "w-min border-2 text-md p-1 rounded-sm",
                        `border-${c.color}`,
                      )}
                    >
                      {c.category}
                    </h5>
                    {descriptionEls}
                    {sourcesEl}
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      ),
      [getBudgetCategoryDescriptionEls, getBudgetCategorySourcesEl],
    );

    return (
      <p {...props} className={cn(className)}>
        {textA}
        <span>
          <Popover>
            <PopoverTrigger asChild className="inline underline cursor-pointer">
              {popoverText}
            </PopoverTrigger>
            {popoverContent}
          </Popover>
        </span>
        {textB}
      </p>
    );
  },
);

DescriptionText.displayName = "DescriptionText";

export default React.memo(AliceStats);
