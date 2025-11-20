"use client";
import { useExpensesStore } from "@/store/expenseStore";
import { Button } from "@/components/ui/button";
import RecentExpenses from "@/components/RecentExpenses";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getExpenses } from "@/lib/supabase/expenses";
import { useAuthExpenses } from "@/hooks/useAuthExpenses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import { filterLastMonthExpenses, getTotalExpenses } from "@/lib/expenses";
import { Skeleton } from "@/components/ui/skeleton";

export type StatCardProps = {
  title: string;
  value?: string | number;
  icon: React.ReactNode;
  footer?: string;
  loading?: boolean;
};

export function StatCard({
  title,
  value,
  icon,
  footer,
  loading,
}: StatCardProps) {
  if (loading) {
    return <Skeleton className="w-full h-36 rounded-md" />;
  }

  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{value}</CardContent>
      {footer && (
        <CardFooter className="text-neutral-500 mt-2">{footer}</CardFooter>
      )}
    </Card>
  );
}

export default function Home() {
  const { expenses, loading } = useAuthExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const lastMonthExpenses = filterLastMonthExpenses(expenses);
  const totalLastMonth = getTotalExpenses(lastMonthExpenses);

  // Array for rendering skeleton StatCards
  const skeletonCards = Array(3).fill(0);

  return (
    <div className="pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">
            {loading ? <Skeleton className="h-8 w-48" /> : "Dashboard"}
          </h1>
          <span className="text-neutral-500">
            {loading ? (
              <Skeleton className="h-4 w-64 mt-1" />
            ) : (
              "Track your expenses and spending"
            )}
          </span>
        </div>
        <Link href="/add-expense">
          <Button className="flex items-center gap-2" variant="accent">
            <span className="text-2xl">+</span>
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {loading ? (
          skeletonCards.map((_, i) => (
            <Skeleton key={i} className="w-full h-36 rounded-md" />
          ))
        ) : (
          <>
            <StatCard
              title="Total Expenses"
              value={`$${totalExpenses}`}
              icon={<DollarSign className="text-accent" />}
              footer="All-time spending"
            />
            <StatCard
              title="Last Month"
              value={`$${totalLastMonth}`}
              icon={<TrendingUp className="text-accent" />}
              footer="Previous month spending"
            />
            <StatCard
              title="Total Transactions"
              value={expenses.length}
              icon={<Calendar className="text-accent" />}
              footer="All recorded expenses"
            />
          </>
        )}
      </div>

      {/* Recent Expenses */}
      <section className="mt-4">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        ) : (
          <RecentExpenses loading={loading} />
        )}
      </section>
    </div>
  );
}
