import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="custom-container">
      <h1>Dashboard</h1>
    </div>
  );
}
