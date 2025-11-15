"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`hidden md:block bg-card border-r border-r-neutral-300 transition-all duration-300 ${
        isCollapsed ? "w-14" : "w-60"
      }`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
}
