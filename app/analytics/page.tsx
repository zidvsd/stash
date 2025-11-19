"use client";
import { ChartPieLabelCustom } from "@/components/charts/PieChart";
import { ChartLineLinear } from "@/components/charts/LineChart";
import { StatCard } from "../page";
import { useExpensesStore } from "@/store/expenseStore";
import { useAuthExpenses } from "@/hooks/useAuthExpenses";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, Calendar, FolderMinus } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  getTotalExpenses,
  getDailyAvgSpending,
  getCategoryFrequency,
  getTotalPerCategory,
} from "@/lib/expenses";
export default function page() {
  const { expenses, loading } = useAuthExpenses();

  const mostFrequentCategory = getCategoryFrequency(expenses);
  const totalExpenses = getTotalExpenses(expenses);
  const avgDailySpend = getDailyAvgSpending(expenses).toFixed(2);

  const categoryTotals = Object.entries(getTotalPerCategory(expenses)).map(
    ([category, amount]) => ({ category, amount })
  );

  if (!expenses || expenses.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderMinus className="text-accent w-12 h-12" />
          </EmptyMedia>
          <EmptyTitle>No expenses to analyze yet</EmptyTitle>
          <EmptyDescription>Add some expenses to see insights</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold">
        {loading ? <Skeleton className="h-8 w-48" /> : "Analytics"}
      </h1>
      <span className="text-neutral-500">
        {loading ? (
          <Skeleton className="h-4 w-64 mt-1" />
        ) : (
          "Visualize your spending patterns"
        )}
      </span>
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
        <ChartPieLabelCustom data={categoryTotals} />
        {/* <ChartLineLinear /> */}
      </section>
    </div>
  );
}
