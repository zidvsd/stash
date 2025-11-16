import { supabase } from "./client";

// fetch expenses for a user
export async function getExpenses(userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

//add an expense
export async function addExpense({
  userId,
  amount,
  category,
  note,
}: {
  userId: string;
  amount: number;
  category: string;
  note?: string;
}) {
  const { data, error } = await supabase.from("expenses").insert([
    {
      user_id: userId,
      amount,
      category,
      note,
    },
  ]);
  if (error) throw error;

  return data;
}
