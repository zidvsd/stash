"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

type Expense = {
  amount: number;
  created_at: string;
};

type Props = {
  data: Expense[];
};

const chartConfig = {
  amount: {
    label: "Expenses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineLinear({ data }: Props) {
  const formattedData = [...data]
    .map((item) => {
      const dateObj = new Date(item.created_at);
      return {
        rawDate: dateObj,
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: item.amount,
      };
    })
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">Spending Over Time</CardTitle>
        {/* Add bottom margin for spacing */}
        <CardDescription className="mb-4">Your expense history</CardDescription>
      </CardHeader>

      <CardContent className="px-0 flex-1 pb-0 mt-8">
        <ChartContainer
          className="w-full md:h-full h-[400px]"
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ left: 20, right: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <YAxis
                dataKey="amount"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent label="Expenses" />}
              />

              <Line
                dataKey="amount"
                type="monotone"
                stroke="var(--color-amount)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
