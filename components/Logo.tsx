"use client";
import Image from "next/image";
import Link from "next/link";
import { Wallet } from "lucide-react";
export default function Logo() {
  return (
    <Link href={"/"} className="fill-white text-white flex items-center gap-2">
      <Wallet className="bg-accent size-12 p-2 rounded-full text-white" />
    </Link>
  );
}
