import { create } from "zustand";
import { Expense } from "@/lib/types/expense";

interface ExpensesState {
  currency: string;
  expenses: Expense[];
  setExpenses: (data: Expense[]) => void;
  setCurrency: (currency: string) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  expenses: [],
  currency: "PHP",
  setExpenses: (data) => set({ expenses: data }),

  setCurrency: (currency) => set({ currency }),

  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),

  removeExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),

  updateExpense: (updated: Expense) =>
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === updated.id ? updated : e)),
    })),
}));
