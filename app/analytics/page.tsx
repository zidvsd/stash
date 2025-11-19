"use client";
import { ChartPieLabelCustom } from "@/components/charts/PieChart";
import { ChartLineLinear } from "@/components/charts/LineChart";
import { StatCard } from "../page";
import { useExpensesStore } from "@/store/expenseStore";
import { useAuthExpenses } from "@/hooks/useAuthExpenses";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

import {
  getTotalExpenses,
  getDailyAvgSpending,
  getCategoryFrequency,
} from "@/lib/expenses";
export default function page() {
  const { expenses, loading } = useAuthExpenses();

  const mostFrequentCategory = getCategoryFrequency(expenses);
  const totalExpenses = getTotalExpenses(expenses);
  const avgDailySpend = getDailyAvgSpending(expenses).toFixed(2);
  console.log(expenses);
  return (
    <div className=" ">
      <h1 className="text-2xl font-bold full">Analytics</h1>
      <p>Visualize your spending patterns</p>

      <div className="w-full grid grid-cols-1  lg:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses}`}
          icon={<DollarSign className="text-accent" />}
          footer="All-time spending"
          loading={loading}
        />
        <StatCard
          title="Top Category"
          value={`${mostFrequentCategory}`}
          icon={<TrendingUp className="text-accent" />}
          footer="Previous month spending"
          loading={loading}
        />
        <StatCard
          title="Avg Daily Spend"
          value={`$${avgDailySpend}`}
          icon={<Calendar className="text-accent" />}
          footer=""
          loading={loading}
        />
      </div>

      <section className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <ChartPieLabelCustom />
        <ChartLineLinear />
      </section>
    </div>
  );
}
