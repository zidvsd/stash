import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useExpensesStore } from "@/store/expenseStore";
import { getExpenses } from "@/lib/supabase/expenses";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/types/profile";
import { useProfileStore } from "@/store/useProfileStore";
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  return { user, loading };
}

export function useAuthExpenses() {
  const { expenses, setExpenses } = useExpensesStore();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authLoading || !user) return;

    const fetchExpenses = async () => {
      const expensesData = await getExpenses(supabase, user.id);
      setExpenses(expensesData ?? []);
      setLoading(false);
    };

    if (expenses.length === 0) {
      fetchExpenses();
    } else {
      setLoading(false);
    }
  }, [authLoading, user, expenses.length, setExpenses]);

  return { expenses, loading: loading || authLoading };
}

export function useAuthProfile() {
  const { user, loading: authLoading } = useAuth();
  const { profile, setProfile } = useProfileStore(); // Zustand store
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(); // maybeSingle returns null if no row exists

    if (error) {
      console.error("Error fetching profile:", error.message);
    } else {
      setProfile(data ?? null); // update global store
    }
    setLoading(false);
  };
  useEffect(() => {
    if (authLoading || !user) return;
    fetchProfile();
  }, [authLoading, user?.id, setProfile]);

  return {
    profile,
    loading: loading || authLoading,
    refetchProfile: fetchProfile,
  };
}
