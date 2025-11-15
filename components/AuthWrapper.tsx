"use client";
import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { usePathname } from "next/navigation";
type AuthWrapperProps = {
  children: ReactNode;
};
export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) router.refresh(); // refresh to trigger layout re-render if needed
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase, router]);

  if (session) {
    return (
      <AuthenticatedLayout pathname={pathname}>{children}</AuthenticatedLayout>
    );
  } else {
    return (
      <main className="min-h-screen flex items-center justify-center">
        {children}
      </main>
    );
  }
}
