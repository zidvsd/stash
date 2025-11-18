import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useExpensesStore } from "@/store/expenseStore";
import { getExpenses } from "@/lib/supabase/expenses";
import { useRouter } from "next/navigation";

export function useAuthExpenses() {
  const { expenses, setExpenses } = useExpensesStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchExpenses() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        router.push("/login");
        return;
      }

      const expensesData = await getExpenses(supabase, session.user.id);
      setExpenses(expensesData ?? []);
      setLoading(false);
    }

    // Only fetch if store is empty
    if (expenses.length === 0) {
      fetchExpenses();
    } else {
      setLoading(false); // we already have data
    }
  }, [router, setExpenses, expenses.length]);

  return { expenses, loading };
}
