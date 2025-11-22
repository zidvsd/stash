import { Expense } from "./types/expense";

// Filter expenses for last month
export function filterLastMonthExpenses(
  expenses: { created_at: string; amount: number }[]
) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed, current month
  // start of last month
  const startLastMonth = new Date(year, month - 1, 1);
  // end of last month
  const endLastMonth = new Date(year, month, 0, 23, 59, 59, 999);

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.created_at); // ISO → Date
    return expenseDate >= startLastMonth && endLastMonth <= endLastMonth;
  });
}
// filter last 7
// Calculate total expenses
export function getTotalExpenses(expenses: { amount: number }[]) {
  return expenses
    .reduce((total, expense) => total + expense.amount, 0)
    .toFixed(2);
}

// calculate average daily spending
export function getDailyAvgSpending(expenses: Expense[]) {
  if (expenses.length === 0) return 0;

  const dailyTotals: Record<string, number> = {};

  for (const expense of expenses) {
    // extract date
    const date = expense.created_at.split("T")[0];

    dailyTotals[date] = (dailyTotals[date] || 0) + expense.amount;
  }

  // sum daily total
  const total = Object.values(dailyTotals).reduce((sum, val) => sum + val, 0);

  // avg = total / number of days

  return total / Object.keys(dailyTotals).length;
}

// get most frequent expense category
export function getCategoryFrequency(expenses: Expense[]) {
  const categoryFrequency: Record<string, number> = {};
  let maxCount = 0;
  let mostFrequentCategory = "";

  for (const expense of expenses) {
    const cat = expense.category;
    categoryFrequency[cat] = (categoryFrequency[cat] || 0) + 1;

    if (categoryFrequency[cat] > maxCount) {
      maxCount = categoryFrequency[cat];
      mostFrequentCategory = cat;
    }
  }

  return mostFrequentCategory;
}

// get total spendings per category
export function getTotalPerCategory(expenses: Expense[]) {
  return expenses.reduce((acc: Record<string, number>, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});
}
