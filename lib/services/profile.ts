// lib/services/profile.ts

import { Profile, supabase } from "../supabase";
import { getCurrentUserId } from "./auth";

// ─── Save onboarding data (called after Step 8) ───────────────
export async function saveOnboardingProfile(data: Omit<Profile, "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...data, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ─── Get current user's profile ───────────────────────────────
export async function getProfile(): Promise<Profile | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

// ─── Update specific profile fields ───────────────────────────
export async function updateProfile(updates: Partial<Profile>) {
  const userId = await getCurrentUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}