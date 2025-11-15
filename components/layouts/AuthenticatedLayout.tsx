"use client";
import { AnimatePresence, motion } from "motion/react";
import SidebarWrapper from "@/components/nav/SidebarWrapper";
import NavbarWrapper from "@/components/nav/NavbarWrapper";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  pathname: string; // Pass current pathname from parent for AnimatePresence key
}

export default function AuthenticatedLayout({
  children,
  pathname,
}: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <div className="flex-1 flex flex-col">
        <NavbarWrapper />

        {/* motion wrapper */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname} // Changing key triggers animation
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 p-4"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
