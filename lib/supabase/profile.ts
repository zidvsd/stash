import { Profile } from "../types/profile";
import { supabase } from "./client";
import { SupabaseClient } from "@supabase/supabase-js";

// fetch profile
export async function getProfile(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// update profile
export async function updateProfile(profile: Profile) {
  const { id, ...updates } = profile;

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
