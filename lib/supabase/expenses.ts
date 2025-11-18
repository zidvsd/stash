import { error } from "console";
import { supabase } from "./client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Expense } from "../types/expense";
// fetch expenses for a user
export async function getExpenses(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  console.log(data);

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

// update expense
export async function updateExpense(expense: Expense) {
  const { id, user_id, ...updates } = expense;

  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// delete an expense
export async function deleteExpense(id: string) {
  const { data, error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw error;

  return data;
}
