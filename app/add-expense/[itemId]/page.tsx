"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useExpensesStore } from "@/store/expenseStore";
import { useAuthExpenses } from "@/hooks/useAuthExpenses";
import { updateExpense as updateSupabaseExpense } from "@/lib/supabase/expenses";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/categories";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateExpenseForm() {
  const router = useRouter();
  const params = useParams();
  const { expenses } = useAuthExpenses();
  const matchItem = expenses.find((item) => item.id === params.itemId);

  const { updateExpense: updateLocal } = useExpensesStore();

  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (matchItem) {
      setAmount(matchItem.amount);
      setCategory(matchItem.category ?? "");
      setNote(matchItem.note ?? "");
    }
  }, [matchItem]);

  const handleUpdateExpense = async () => {
    if (!matchItem) return;
    if (amount === "" || amount < 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    try {
      const updatedExpense = { ...matchItem, amount, category, note };
      const data = await updateSupabaseExpense(updatedExpense);

      // update local store
      updateLocal(data);

      toast.success("Expense updated successfully!");
      router.push("/"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      toast.error("Failed to update expense.");
    }
  };

  if (!expenses.length)
    return (
      <div className="max-w-2xl mx-auto mt-6 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  if (!matchItem)
    return <div className="custom-container">Expense not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6 dark:bg-sidebar-primary rounded-lg shadow-md p-6 border-neutral-300 border dark:border-transparent space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold ">Update Expense</h2>
        <span className="text-sm text-neutral-400">
          Edit the information below to update your expense
        </span>
      </div>

      {/* Amount */}
      <div>
        <Label htmlFor="amount">Amount($)</Label>
        <Input
          id="amount"
          type="number"
          min={0}
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Enter amount"
          className="mt-2"
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category" className="mb-2">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Note */}
      <div>
        <Label htmlFor="note">Note / Description</Label>
        <Textarea
          id="note"
          value={note}
          className="mt-2"
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="accent"
          onClick={handleUpdateExpense}
          className="w-1/2 sm:w-3/4"
        >
          Update Expense
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
