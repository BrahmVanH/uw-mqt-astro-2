"use client";

import * as React from "react";
import { } from "lucide-react";
import { Label, Pie, PieChart as Chart } from "recharts";
import { type AliceChartConfig, type AliceChartData } from "@/types/aliceStats";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * Props interface for custom PieChart component
 *
 * @property {string} county - The name of the county who's ALICE stats will be displayed
 * @property {AliceChartData[]} chartData - Array of data points formatted for recharts Pie component chart
 * @property {AliceChartConfig} chartConfig - Config object for chart
 * @property {number} totalHouseholds - Total number of households polled in county
 */
interface Props {
  county: string;
  chartData: AliceChartData[];
  chartConfig: AliceChartConfig;
  totalHouseholds: number;
}

/** Renders a pie chart with an custom tooltip
 *
 * This component takes in chart data, a config object, total amount of households, and a county name
 * to display a pie chart
 *
 * @param {string} county - The name of the county who's ALICE stats will be displayed
 * @param {AliceChartData[]} chartData - Array of data points formatted for recharts Pie component chart
 * @param {AliceChartConfig} chartConfig - Config object for chart
 * @param {number} totalHouseholds - Total number of households polled in county
 *
 * @returns {React.ReactElement} A pie chart with a custom tooltip
 */
const PieChart: React.FC<Props> = ({
  chartData,
  chartConfig,
  totalHouseholds,
  county,
}) => {
  return (
    <Card className="flex flex-col xl:aspect-square w-full xl:w-1/3 border-0">
      <CardContent className=" w-1/2 mx-auto xl:w-full ">
        <ChartContainer
          config={chartConfig as unknown as ChartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full relative"
        >
          <Chart className="relative w-2 xl:w-full" width={76} height={76}>
            {chartConfig && (
              <ChartTooltip
                wrapperClassName="border-2 border-primary-blue-4 font-serious"
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, label) => {
                      const fmtdLabel = chartConfig[label as keyof typeof chartConfig].label;
                      const percentOfHouseholds =
                        typeof value === "number"
                          ? Math.round((value / totalHouseholds) * 100)
                          : null;
                      return (
                        <div className="p-2 ">
                          {fmtdLabel && <p className="m-0">{fmtdLabel}</p>}
                          <p className="m-0">{`${value.toLocaleString()} Households (${percentOfHouseholds ?? ""}%)`}</p>
                        </div>
                      );
                    }}
                  />
                }
              />
            )}
            <Pie

              data={chartData}
              dataKey="total"
              nameKey="incomeLevel"
              innerRadius={"90%"}
              outerRadius={"100%"}
              strokeWidth={5}
              animationBegin={county === "overall" ? 100 : 0}
            >
              <Label
                className=""
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl text-black font-bold"
                        >
                          {totalHouseholds.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Households
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </Chart>
        </ChartContainer>
        <CardFooter className="p-2">
          <h2 className="text-md m-auto">{county}</h2>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PieChart;
