export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  note?: string | null;
  created_at: string;
}
