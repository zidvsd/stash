"use client";
import { useState } from "react";
import { PanelLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../Logo";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop

  return (
    <>
      <div className="custom-container border-b sticky z-50 top-0 bg-background border-b-neutral-300 dark:border-b-gray-700 py-4 flex items-center justify-between">
        {/* Mobile toggle */}
        <button
          className="p-2 md:hidden rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer hover-utility"
          onClick={() => setIsSidebarOpen(true)}
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <div className="">
          <Logo />
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="fixed inset-0 z-50 flex md:hidden"
          >
            <div className=" bg-card border-r sticky  border-r-neutral-300 dark:border-r-gray-700">
              <Sidebar onMobileLinkClick={() => setIsSidebarOpen(false)} />
            </div>
            <div
              className="flex-1 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
