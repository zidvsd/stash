// Filter expenses for last month
export function filterLastMonthExpenses(
  data: { created_at: string; amount: number }[]
) {
  const today = new Date();

  // Get last month in UTC
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth(); // current month 0-11

  const firstDayLastMonthUTC = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const lastDayLastMonthUTC = new Date(Date.UTC(year, month, 0, 23, 59, 59));

  return data.filter((expense) => {
    const expenseDate = new Date(expense.created_at); // already UTC
    return (
      expenseDate >= firstDayLastMonthUTC && expenseDate <= lastDayLastMonthUTC
    );
  });
}
// Calculate total expenses
export function getTotalExpenses(data: { amount: number }[]) {
  return data.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
}
