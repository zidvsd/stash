"use client";

import { User, DollarSign, Settings, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { currencies } from "@/lib/currencies";
import { useAuthProfile } from "@/hooks/useAuthExpenses";
import { getInitials, capitalizeTwoWords } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { updateProfile } from "@/lib/supabase/profile";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuthExpenses";
export default function Page() {
  const { user } = useAuth();
  const { profile, loading, refetchProfile } = useAuthProfile(user);

  const [form, setForm] = useState<{
    name: string;
    currency: string;
    monthly_budget: string;
  }>({
    name: "",
    currency: "PHP",
    monthly_budget: "5000",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);

  // Sync form with profile
  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name || "",
      currency: profile.currency || "PHP",
      monthly_budget: profile.monthly_budget
        ? String(profile.monthly_budget)
        : "5000",
    });
  }, [profile?.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const newErrors: { [key: string]: string } = {};

    // NAME: must be exactly 2 words
    const trimmed = form.name.trim();
    const words = trimmed.split(/\s+/);

    if (trimmed.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    } else if (words.length !== 2) {
      newErrors.name = "Name must contain exactly two words.";
    }

    // CURRENCY
    if (!form.currency) {
      newErrors.currency = "Please select a currency.";
    }

    // MONTHLY BUDGET
    const budgetNumber = Number(form.monthly_budget);
    if (isNaN(budgetNumber) || budgetNumber < 5000) {
      toast.error("Monthly budget must be greater than 5000");
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    if (!profile?.id) return;

    setSaving(true);

    try {
      const budgetNumber = Number(form.monthly_budget);

      await updateProfile({
        ...profile,
        name: capitalizeTwoWords(form.name),
        currency: form.currency,
        monthly_budget: budgetNumber,
      });

      toast.success("Profile successfully updated!");
      await refetchProfile();
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const renderCardSkeleton = (h: string = "h-44") => (
    <Skeleton className={`w-full ${h} rounded-md`} />
  );

  return (
    <div className="flex flex-col gap-6 mt-6 max-w-3xl w-full lg:mx-auto">
      {/* Header */}
      <div className="flex flex-col w-full lg:items-center lg:text-center">
        <h1 className="text-3xl font-semibold">
          {loading ? <Skeleton className="h-8 w-48" /> : "Profile Settings"}
        </h1>
        <span className="text-gray-500 font-light">
          {loading ? (
            <Skeleton className="h-4 w-64 mt-1" />
          ) : (
            "Manage your account and preferences"
          )}
        </span>
      </div>

      {/* Profile Header */}
      {loading ? (
        renderCardSkeleton()
      ) : (
        <Card className="flex flex-col gap-6 text-left">
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <User className="text-accent w-5 h-5" />
              <h1 className="text-2xl font-semibold">Personal Information</h1>
            </div>
            <span className="text-sm text-gray-400">
              Update your profile details
            </span>
          </CardHeader>

          <CardContent className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
              {getInitials(form.name || "User")}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-medium">Profile Picture</h2>
              <span className="text-sm text-neutral-500">
                Avatar based on your initials
              </span>
            </div>
          </CardContent>

          {/* Email */}
          <CardContent className="flex flex-col gap-1 border-t-neutral-300 dark:border-t-gray-600 border-t mx-4 px-0">
            <h3 className="font-medium mt-4">Email</h3>
            <Input
              disabled
              type="email"
              placeholder={profile?.email || "Johndoe@gmail.com"}
              className="bg-gray-100 font-light"
            />
            <span className="text-sm font-light text-gray-400">
              Email cannot be changed
            </span>
          </CardContent>

          {/* Name */}
          <CardContent className="flex flex-col gap-1 border-t-neutral-300 dark:border-t-gray-600 border-t mx-4 px-0">
            <h3 className="font-medium mt-4">Name</h3>
            <Input
              name="name"
              value={form.name}
              placeholder="John Doe"
              className="font-light"
              onChange={handleChange}
            />
            <span className="text-sm font-light text-gray-400">
              Update your display name
            </span>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      {loading ? (
        renderCardSkeleton()
      ) : (
        <Card>
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <Settings className="text-accent w-5 h-5" />
              <h1 className="text-2xl font-semibold">Preferences</h1>
            </div>
            <span className="text-sm text-gray-400">
              Customize your experience
            </span>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2 w-48">
              <label className="text-sm font-medium">Currency</label>
              <Select
                value={form.currency}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>

                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.symbol} {c.name} ({c.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Budget */}
      {loading ? (
        renderCardSkeleton()
      ) : (
        <Card>
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <DollarSign className="text-accent w-5 h-5" />
              <h1 className="text-2xl font-semibold">Budget & Goals</h1>
            </div>
            <span className="text-sm text-gray-400">
              Set your financial targets
            </span>
          </CardHeader>

          <CardContent className="flex flex-col gap-1">
            <Input
              className="mt-2"
              type="number"
              name="monthly_budget"
              value={form.monthly_budget}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, monthly_budget: e.target.value }))
              }
              placeholder="5000"
            />
            <span className="text-sm font-light text-gray-400">
              Set a monthly spending limit to track your expenses
            </span>
          </CardContent>
        </Card>
      )}

      {/* Account Created */}
      {loading ? (
        renderCardSkeleton()
      ) : (
        <Card>
          <CardHeader className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <Calendar className="text-accent w-5 h-5" />
              <h1 className="text-2xl font-semibold">Account Info</h1>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-1">
            <h3 className="font-medium text-md mt-2">Account Created</h3>
            <Input
              disabled
              type="text"
              value={
                profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"
              }
              className="bg-gray-100 font-light"
            />
            <span className="text-sm font-light text-gray-400">
              The date this account was created
            </span>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <Button
          type="button"
          onClick={handleSubmit}
          variant="accent"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
