"use client";

import { FolderMinus, Trash2, Pencil } from "lucide-react"; // Trash2 for delete action
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useExpensesStore } from "@/store/expenseStore";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteExpense } from "@/lib/supabase/expenses";

type RecentExpensesProps = {
  loading?: boolean;
};

export default function RecentExpenses({ loading }: RecentExpensesProps) {
  const { expenses, removeExpense } = useExpensesStore();
  const router = useRouter();
  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      removeExpense(id);
      toast.success("Item successfully deleted.");
    } catch (err: any) {
      toast.error("Delete failed.");
    }
  };
  const handleEditExpense = (id: string) => {
    if (!id) return toast.error("Unable to edit item.");
    router.push(`/add-expense/${id}`);
  };
  if (loading) {
    // Show skeletons for loading
    return (
      <div className="mt-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

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
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto w-full">
            <table className="w-full text-left table-auto border-collapse mt-4 ">
              <thead>
                <tr className="text-gray-800 dark:text-gray-200 ">
                  <th className="px-4 py-3 border-b border-neutral-300 dark:border-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 border-b border-neutral-300 dark:border-gray-700">
                    Category
                  </th>
                  <th className="px-4 py-3 border-b border-neutral-300 dark:border-gray-700">
                    Note
                  </th>
                  <th className="px-4 py-3 border-b border-neutral-300 dark:border-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 border-b border-neutral-300 dark:border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr
                    key={expense.id}
                    className={`
          group transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
          ${
            index !== 0
              ? "border-t border-neutral-300 dark:border-gray-700"
              : ""
          }
        `}
                  >
                    <td className="px-4 py-3">
                      {new Date(expense.created_at).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full">
                        {expense.category}
                      </span>
                    </td>

                    <td className="px-4 py-3">{expense.note || "-"}</td>

                    <td className="px-4 py-3 font-bold">
                      ${expense.amount.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 flex items-center gap-2">
                      <Button
                        onClick={() => handleEditExpense(expense.id)}
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-blue-500/20 hover:text-blue-500"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 hover:bg-red-500/20 transition"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Do you want to
                              delete this expense?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 lg:hidden mt-2">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="rounded-xl border border-neutral-300 dark:border-neutral-700 p-4 shadow-sm dark:shadow-none bg-white dark:bg-transparent dark:border-none transition hover:shadow-md"
              >
                {/* Top Row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <div className="flex gap-1.5">
                    <Button
                      onClick={() => handleEditExpense(expense.id)}
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-blue-500/20 hover:text-blue-500"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      onClick={() => handleDeleteExpense(expense.id)}
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(expense.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* Category */}
                <div className="mb-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-neutral-200 dark:bg-neutral-700">
                    {expense.category}
                  </span>
                </div>

                {/* Note */}
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {expense.note || null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
