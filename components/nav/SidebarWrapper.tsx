"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`hidden md:block bg-card border-r border-r-gray-300 dark:border-r-transparent  transition-all duration-300 ${
        isCollapsed ? "w-auto" : "w-60"
      }`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
}
