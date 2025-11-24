"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "./ui/progress";
import { useProfileStore } from "@/store/profileStore";
import { filterLastMonthExpenses, getTotalExpenses } from "@/lib/expenses";
import { getCurrencySymbol } from "@/lib/utils";
import { Expense } from "@/lib/types/expense";
import { TrendingUp } from "lucide-react";
type MonthlyBudgetProps = {
  expenses: Expense[];
  currency: string;
};

export default function MonthlyBudget({
  expenses,
  currency,
}: MonthlyBudgetProps) {
  const { profile } = useProfileStore();

  const monthlyBudget = Number(profile?.monthly_budget) || 0;

  const thisMonthExpenses = filterLastMonthExpenses(expenses);
  const totalThisMonth = Number(getTotalExpenses(thisMonthExpenses));

  const percentage =
    monthlyBudget > 0
      ? Math.min((totalThisMonth / monthlyBudget) * 100, 100)
      : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex text-2xl justify-between items-center">
          Monthly Budget
          <TrendingUp className="text-accent" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between">
          <span className="text-sm text-neutral-600 dark:text-gray-400">
            Spent this month
          </span>
          <p className=" ">
            {getCurrencySymbol(currency)}
            {totalThisMonth.toFixed(2)} / {getCurrencySymbol(currency)}
            {monthlyBudget.toFixed(2)}
          </p>
        </div>

        <Progress value={percentage} />

        <p className="text-sm text-neutral-500">
          {percentage.toFixed(2)}% used
        </p>
      </CardContent>
    </Card>
  );
}
