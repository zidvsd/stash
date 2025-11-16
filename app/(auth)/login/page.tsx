"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { motion } from "motion/react";

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error("Login failed. Check your credentials.");
    } else {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center w-full justify-center custom-container"
    >
      <Card className="w-full max-w-md">
        <div className="self-center">
          <Logo />
        </div>
        <CardHeader>
          <CardTitle className="text-center text-xl">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            {" "}
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              variant={"accent"}
              type="submit"
              className="w-full mt-2 hover-utility cursor-pointer bg-accent"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Not yet signed up link */}
            <p className="mt-2 text-center text-sm text-gray-500">
              Not yet signed up?{" "}
              <Link href="/signin" className="text-blue-500 hover:underline ">
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
