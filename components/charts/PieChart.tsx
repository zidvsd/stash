"use client";

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

type ChartPieLabelCustomProps = {
  data: {
    category: string;
    amount: number;
    fill?: string;
  }[];
};

const defaultColors = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F43F5E",
  "#EAB308",
  "#6366F1",
  "#D946EF",
  "#F97316",
];

export function ChartPieLabelCustom({ data }: ChartPieLabelCustomProps) {
  const chartConfig: ChartConfig = {
    pie: { label: "Spending" },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>
          Distribution of expenses across categories
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {/* Use ChartContainer to provide context for ChartTooltip */}
        <ChartContainer config={chartConfig} className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Tooltip will now work */}
              <ChartTooltip
                content={
                  <ChartTooltipContent nameKey="amount" hideLabel={false} />
                }
              />
              <Pie
                key={data.map((d) => d.amount).join("-")} // force remount
                data={data}
                dataKey="amount"
                nameKey="category"
                labelLine={false}
                isAnimationActive={true}
                animationDuration={800}
                animationEasing="ease-out"
                label={({ payload, ...props }) => (
                  <text
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill={
                      payload.fill ||
                      defaultColors[props.index % defaultColors.length]
                    }
                  >
                    ${payload.amount.toFixed(2)}
                  </text>
                )}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.fill || defaultColors[index % defaultColors.length]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-center w-full gap-4 text-sm">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{
                backgroundColor:
                  entry.fill || defaultColors[idx % defaultColors.length],
              }}
            />
            <span>{entry.category}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
