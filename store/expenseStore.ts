import { create } from "zustand";
import { Expense } from "@/lib/types/expense";

interface ExpensesState {
  expenses: Expense[];
  setExpenses: (data: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  expenses: [],
  setExpenses: (data) => set({ expenses: data }),
  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  removeExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
  updateExpense: (updated: Expense) =>
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === updated.id ? updated : e)),
    })),
}));
