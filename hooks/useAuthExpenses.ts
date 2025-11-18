import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useExpensesStore } from "@/store/expenseStore";
import { getExpenses } from "@/lib/supabase/expenses";
import { redirect } from "next/navigation";

export function useAuthExpenses() {
  const { expenses, setExpenses } = useExpensesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) redirect("/login");

      const expensesData = await getExpenses(supabase, session.user.id);
      setExpenses(expensesData);
      setLoading(false);
    }

    if (expenses.length === 0) {
      fetchExpenses();
    } else {
      setLoading(false);
    }
  }, [expenses.length, setExpenses]);

  return { expenses, loading };
}
