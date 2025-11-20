interface RecentActivity {
  method: string;
  created_at: string;
  note?: string;
  category: string;
  amount: number;
}
export interface Profile {
  id: string;
  email?: string;
  name?: string;
  created_at: string;
  monthly_budget: number;
  currency: string;
}
