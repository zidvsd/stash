// Filter expenses for last month
export function filterLastMonthExpenses(
  data: { created_at: string; amount: number }[]
) {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return data.filter((expense) => {
    const expenseDate = new Date(expense.created_at); // ISO → Date
    return expenseDate >= thirtyDaysAgo && expenseDate <= today;
  });
}
// filter last 7
// Calculate total expenses
export function getTotalExpenses(data: { amount: number }[]) {
  return data.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
}
