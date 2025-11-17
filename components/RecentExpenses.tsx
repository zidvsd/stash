"use client";

import { Expense } from "@/lib/types/expense";
import { FolderMinus, Trash2, Pencil } from "lucide-react"; // Trash2 for delete action
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RecentExpensesProps = {
  expenses: Expense[];
};

export default function RecentExpenses({ expenses }: RecentExpensesProps) {
  if (!expenses || expenses.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderMinus className="text-accent w-12 h-12" />
          </EmptyMedia>
          <EmptyTitle>No Recent Expenses</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t recorded any expenses yet. Add your first expense
            to get started.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="mt-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left table-auto border-collapse mt-4">
            <thead>
              <tr className="text-gray-400">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Note</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="  hover:bg-neutral-300 dark:hover:bg-gray-700 hover-utility "
                >
                  <td className="px-4 py-2">
                    {new Date(expense.created_at).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2">{expense.category}</td>
                  <td className="px-4 py-2">{expense.note || "-"}</td>
                  <td className="px-4 py-2 font-bold">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 cursor-pointer hover:text-white"
                    >
                      <Pencil className="w-4 h-4 " />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 cursor-pointer hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
