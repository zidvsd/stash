"use client";
import { useExpensesStore } from "@/store/expenseStore";
import { Button } from "@/components/ui/button";
import RecentExpenses from "@/components/RecentExpenses";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getExpenses } from "@/lib/supabase/expenses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Calendar, DollarSign } from "lucide-react";
import { filterLastMonthExpenses, getTotalExpenses } from "@/lib/expenses";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  title: string;
  value?: string | number;
  icon: React.ReactNode;
  footer?: string;
  loading?: boolean;
};

function StatCard({ title, value, icon, footer, loading }: StatCardProps) {
  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">
        {loading ? <Skeleton className="h-8 w-24" /> : value}
      </CardContent>
      {footer && (
        <CardFooter className="text-neutral-500 mt-2">
          {loading ? <Skeleton className="h-4 w-32" /> : footer}
        </CardFooter>
      )}
    </Card>
  );
}

export default function Home() {
  const { expenses, setExpenses } = useExpensesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) redirect("/login");

      const expensesData = await getExpenses(supabase, session.user.id);
      setExpenses(expensesData);
    }
    if (expenses.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [expenses.length, setExpenses]);

  const totalExpenses = getTotalExpenses(expenses);
  const lastMonthExpenses = filterLastMonthExpenses(expenses);
  const totalLastMonth = getTotalExpenses(lastMonthExpenses);

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
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses}`}
          icon={<DollarSign className="text-accent" />}
          footer="All-time spending"
          loading={loading}
        />
        <StatCard
          title="Last Month"
          value={`$${totalLastMonth}`}
          icon={<Calendar className="text-accent" />}
          footer="Previous month spending"
          loading={loading}
        />
        <StatCard
          title="Total Transactions"
          value={expenses.length}
          icon={<Calendar className="text-accent" />}
          footer="All recorded expenses"
          loading={loading}
        />
      </div>

      {/* Recent Expenses */}
      <section className="mt-4">
        {loading ? (
          // Skeleton for recent expenses
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
