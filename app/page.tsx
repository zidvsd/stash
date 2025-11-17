import { Button } from "@/components/ui/button";
import RecentExpenses from "@/components/RecentExpenses";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getExpenses } from "@/lib/supabase/expenses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Calendar, DollarSign } from "lucide-react";
import { filterLastMonthExpenses, getTotalExpenses } from "@/lib/expenses";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  footer?: string;
};

function StatCard({ title, value, icon, footer }: StatCardProps) {
  return (
    <Card className="w-full space-y-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{value}</CardContent>
      {footer && (
        <CardFooter className="text-neutral-500 mt-2">{footer}</CardFooter>
      )}
    </Card>
  );
}

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const data = await getExpenses(supabase, session.user.id);
  const lastMonthExpenses = filterLastMonthExpenses(data);
  const totalLastMonth = getTotalExpenses(lastMonthExpenses);
  const totalExpenses = getTotalExpenses(data);

  return (
    <div className="custom-container pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <span className="text-neutral-500">
            Track your expenses and spending
          </span>
        </div>
        <Link href="/add-expense">
          <Button className="flex items-center gap-2" variant="accent">
            <span className="text-2xl">+</span>
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Last Month"
          value={`$${totalLastMonth}`}
          icon={<Calendar className="text-accent" />}
          footer="Previous month spending"
        />
        <StatCard
          title="Total Transactions"
          value={data.length}
          icon={<Calendar className="text-accent" />}
          footer="All recorded expenses"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses}`}
          icon={<DollarSign className="text-accent" />}
          footer="All-time spending"
        />
      </div>

      {/* recent expenses  */}
      <section>
        <RecentExpenses expenses={data} />
      </section>
    </div>
  );
}
