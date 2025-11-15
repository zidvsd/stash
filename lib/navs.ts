import { Home, BarChart2, PlusCircle, User } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Add Expense", href: "/add-expense", icon: PlusCircle },
  { name: "Profile", href: "/profile", icon: User },
];
