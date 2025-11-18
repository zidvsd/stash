"use client";
import Link from "next/link";
import { navItems } from "@/lib/navs";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DarkModeToggle } from "../DarkModeToggle";
import { useExpensesStore } from "@/store/expenseStore";
export default function Sidebar({
  isCollapsed = false,
  toggleCollapse,
  onMobileLinkClick,
}: {
  isCollapsed?: boolean;
  toggleCollapse?: () => void; // desktop collapse toggle
  onMobileLinkClick?: () => void; // mobile sidebar close
}) {
  const { setExpenses } = useExpensesStore();
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut(); // uses correct client
      if (error) throw error;

      toast.success("Logged out successfully.");
      // clear expense store
      setExpenses([]);

      router.push("/login");
    } catch (err: any) {
      toast.error("Logout failed: " + err.message);
    } finally {
      setLoggingOut(false);
    }
  };
  return (
    <aside
      className={`dark:bg-sidebar-primary flex flex-col py-4 px-2 ${
        isCollapsed ? "w-12" : "w-60"
      } transition-width duration-300 sticky top-0 h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-bold">Stash</h2>}
        {/* Collapse button only visible on md+ */}
        <button
          onClick={toggleCollapse}
          className="p-1 hover:bg-gray-200 dark:hover:bg-accent hover-utility rounded-md hidden md:block cursor-pointer"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onMobileLinkClick?.()} // only closes on mobile
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 hover-utility dark:hover:bg-accent ${
                isActive
                  ? "bg-gray-300 dark:bg-accent dark:text-white font-semibold"
                  : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>
      {/* logout */}

      <div className="mt-auto space-y-2">
        {/* dark mode toggle  */}

        <div className="flex items-center gap-2">
          {/* Collapse button only visible on md+ */}
          <DarkModeToggle />
          {!isCollapsed && <h2 className=" ">Theme</h2>}
        </div>

        {/* logout */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="flex items-center cursor-pointer hover-utility gap-2 w-full justify-center"
          disabled={loggingOut}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && (loggingOut ? "Logging out..." : "Logout")}
        </Button>
      </div>
    </aside>
  );
}
