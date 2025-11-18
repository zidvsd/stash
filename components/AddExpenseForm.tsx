"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";
import { supabase } from "@/lib/supabase/client";
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
import { toast } from "sonner";
import { useExpensesStore } from "@/store/expenseStore";
export default function AddExpenseForm() {
  const { addExpense } = useExpensesStore();
  const [amount, setAmount] = useState<number | "">(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("User not authenticated.");
      setLoading(false);
      return;
    }

    // Insert the expense
    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          user_id: user.id,
          amount: Number(amount),
          category,
          note,
        },
      ])
      .select();

    setLoading(false);

    if (error) {
      toast.error("Failed to add expense.");
    } else if (data && data[0]) {
      addExpense(data[0]);
      toast.success("Expense added successfully!");
      // Clear form
      setAmount(0);
      setCategory("");
      setNote("");
    }
  };

  const handleReroute = () => {
    router.push("/");
  };
  return (
    <div className="max-w-2xl mx-auto mt-6 dark:bg-sidebar-primary rounded-lg shadow-md p-6 border-neutral-300 border dark:border-transparent">
      <h2 className="text-xl font-bold ">Expense details</h2>
      <span className="text-sm text-neutral-400">
        Fill in the information below to track your expense
      </span>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {/* Amount */}
        <div>
          <Label htmlFor="amount">Amount($)</Label>
          <Input
            autoComplete="off"
            id="amount"
            type="number"
            min={0}
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Enter amount"
            required
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
          <Label className="mb-2" htmlFor="note">
            Note / Description
          </Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant={"accent"}
            type="submit"
            className="w-1/2 sm:w-3/4"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Expense"}
          </Button>
          {/* cancel */}
          <Button
            variant={"outline"}
            className="flex-1"
            type="button"
            onClick={handleReroute}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
