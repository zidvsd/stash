"use client";

import { TrendingUp } from "lucide-react";
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categories } from "@/lib/categories";

type ChartPieLabelCustomProps = {
  data: {
    category: string;
    amount: number;
    fill?: string;
  }[];
};
const defaultColors = [
  "#EF4444", // red
  "#3B82F6", // blue
  "#10B981", // green
  "#8B5CF6", // violet/purple
  "#F43F5E", // pink/red
  "#EAB308", // yellow (less amber)
  "#6366F1", // indigo
  "#D946EF", // fuchsia
  "#F97316", // orange
];
export function ChartPieLabelCustom({ data }: ChartPieLabelCustomProps) {
  const chartConfig: ChartConfig = {
    visitors: { label: "Visitors" },
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
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h- px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              labelLine={false}
              isAnimationActive={true} // make sure animation is enabled
              animationDuration={800} // optional, controls speed
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
                  ${payload.amount}
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap  items-center justify-center w-full gap-4 text-sm">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{
                backgroundColor:
                  entry.fill || defaultColors[idx % defaultColors.length],
              }}
            ></div>
            <span>{entry.category}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
