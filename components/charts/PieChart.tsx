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
import { getCurrencySymbol } from "@/lib/utils";

type ChartPieLabelCustomProps = {
  data: {
    category: string;
    amount: number;
    fill?: string;
  }[];
  currency?: string;
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

export function ChartPieLabelCustom({
  data,
  currency = "PHP", // fallback currency
}: ChartPieLabelCustomProps) {
  const chartConfig: ChartConfig = {
    pie: { label: "Spending" },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">Spending by Category</CardTitle>
        <CardDescription>
          Distribution of expenses across categories
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                formatter={(value: number) =>
                  `${getCurrencySymbol(currency)}${value.toFixed(2)}`
                }
              />
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                labelLine={false}
                label={({
                  payload,
                  index,
                  x,
                  y,
                  textAnchor,
                  dominantBaseline,
                }) => (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    dominantBaseline={dominantBaseline}
                    fill={
                      payload.fill ||
                      defaultColors[index % defaultColors.length]
                    }
                  >
                    {getCurrencySymbol(currency)}
                    {payload.amount.toFixed(2)}
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
