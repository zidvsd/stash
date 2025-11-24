"use client";
import { ChartPieLabelCustom } from "@/components/charts/PieChart";
import { ChartLineLinear } from "@/components/charts/LineChart";
import { StatCard } from "../page";
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
import { useAuthProfile, useAuth } from "@/hooks/useAuthExpenses";
export default function page() {
  const { user } = useAuth();
  const { expenses, loading: expensesLoading } = useAuthExpenses(user);
  const { profile, loading: profileLoading } = useAuthProfile(user);
  const loading = expensesLoading || profileLoading;
  const currency = profile?.currency || "PHP";
  // Show skeletons while loading

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-6" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>

        <section className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <Skeleton className="h-80 w-full rounded-md" />
          <Skeleton className="h-80 w-full rounded-md" />
        </section>
      </div>
    );
  }
  // Empty state if no expenses after loading
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
  // Compute analytics after loading
  const mostFrequentCategory = getCategoryFrequency(expenses);
  const totalExpenses = getTotalExpenses(expenses);
  const avgDailySpend = getDailyAvgSpending(expenses).toFixed(2);

  const categoryTotals = Object.entries(getTotalPerCategory(expenses)).map(
    ([category, amount]) => ({ category, amount })
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <span className="text-neutral-500">Visualize your spending patterns</span>
      {/* Stat Cards */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Total Expenses"
          currency={currency}
          isCurrency={true}
          value={totalExpenses}
          icon={<DollarSign className="text-accent" />}
        />

        <StatCard
          title="Top Category"
          value={mostFrequentCategory}
          icon={<TrendingUp className="text-accent" />}
        />

        <StatCard
          title="Avg Daily Spend"
          currency={currency}
          isCurrency={true}
          value={avgDailySpend}
          icon={<Calendar className="text-accent" />}
        />
      </div>

      {/* Charts */}
      <section className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <ChartPieLabelCustom
          currency={profile?.currency ?? "PHP"}
          data={categoryTotals}
        />
        <ChartLineLinear data={expenses} />
      </section>
    </div>
  );
}
