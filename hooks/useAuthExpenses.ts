import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useExpensesStore } from "@/store/expenseStore";
import { getExpenses } from "@/lib/supabase/expenses";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/types/profile";
import { useProfileStore } from "@/store/profileStore";
import { useCallback } from "react";
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setRedirecting(true);
        router.replace("/login");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  return { user, loading, redirecting };
}

export function useRedirectIfAuth(redirectTo = "/") {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo); // redirect if already logged in
    }
  }, [user, loading, router, redirectTo]);
}

export function useAuthExpenses(user: any) {
  const { expenses, setExpenses } = useExpensesStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchExpenses = async () => {
      const expensesData = await getExpenses(supabase, user.id);
      setExpenses(expensesData ?? []);
      setLoading(false);
    };

    if (expenses.length === 0) fetchExpenses();
    else {
      setLoading(false);
    }
  }, [user, expenses.length, setExpenses]);

  return { expenses, loading };
}

export function useAuthProfile(user: any) {
  const { profile, setProfile } = useProfileStore(); // Zustand store
  const [loading, setLoading] = useState(true);

  // Fetch function can be reused for refetch
  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!error) {
      setProfile(data ?? null);

      if (data?.currency) {
        useExpensesStore.getState().setCurrency(data.currency);
      }
    } else {
      console.error("Error fetching profile:", error.message);
    }

    setLoading(false);
  }, [user, setProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Return refetch function
  return { profile, loading, refetchProfile: fetchProfile };
}
