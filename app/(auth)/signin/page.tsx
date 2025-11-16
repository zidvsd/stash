"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
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
import { motion } from "motion/react";
import Logo from "@/components/Logo";
const supabase = createClient();

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setSigningIn(false);
    if (!error) {
      toast.success("Account created successfully!");
      router.push("/login");
    } else {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen items-center w-full justify-center custom-container  "
    >
      <Card className="w-full max-w-md">
        <div className="self-center">
          <Logo />
        </div>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            {" "}
            Get started with your finance tracking{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="off"
                id="email"
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
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant={"accent"}
              className="w-full mt-2 hover-utility cursor-pointer bg-accent"
              disabled={signingIn}
            >
              {signingIn ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Already have an account link */}
            <p className="mt-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
