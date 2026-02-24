// lib/services/dashboard.ts
// Fetches everything needed for the Dashboard in parallel

import { supabase, today } from "../supabase";
import { getCurrentUserId } from "./auth";

export type DashboardData = {
  profile: { name: string; conditions: string[] };
  cycle: { day: number; phase: string; nextPeriodIn: number };
  water: { glasses: number; goal: number };
  sleep: { hours: number | null; quality: string | null };
  calories: { consumed: number; goal: number };
  workout: { done: boolean; name: string | null };
  acne: { severity: number | null };
  weight: { current: number | null; last: number | null };
};

export async function getDashboardData(): Promise<DashboardData> {
  const userId = await getCurrentUserId();
  const todayStr = today();

  // Fetch all in parallel
  const [profile, water, sleep, foods, workout, acne, weights] = await Promise.all([
    supabase.from("profiles").select("name, conditions, water_goal").eq("id", userId).single(),
    supabase.from("water_logs").select("glasses, goal").eq("user_id", userId).eq("log_date", todayStr).single(),
    supabase.from("sleep_logs").select("hours_slept, quality").eq("user_id", userId).eq("log_date", todayStr).single(),
    supabase.from("food_logs").select("calories").eq("user_id", userId).eq("log_date", todayStr),
    supabase.from("workout_sessions").select("completed, workout_type").eq("user_id", userId).eq("session_date", todayStr).single(),
    supabase.from("acne_logs").select("severity").eq("user_id", userId).eq("log_date", todayStr).single(),
    supabase.from("weight_logs").select("weight_kg, log_date").eq("user_id", userId).order("log_date", { ascending: false }).limit(2),
  ]);

  const totalCal = (foods.data || []).reduce((s: number, f: any) => s + (f.calories || 0), 0);
  const weightList = weights.data || [];

  return {
    profile: {
      name: profile.data?.name || "User",
      conditions: profile.data?.conditions || [],
    },
    cycle: {
      day: 12,       // TODO: calculate from period_daily_logs
      phase: "Follicular",
      nextPeriodIn: 16,
    },
    water: {
      glasses: water.data?.glasses || 0,
      goal: water.data?.goal || profile.data?.water_goal || 8,
    },
    sleep: {
      hours: sleep.data?.hours_slept || null,
      quality: sleep.data?.quality || null,
    },
    calories: {
      consumed: totalCal,
      goal: 1650,    // TODO: calculate from profile macros
    },
    workout: {
      done: workout.data?.completed || false,
      name: workout.data?.workout_type || null,
    },
    acne: {
      severity: acne.data?.severity || null,
    },
    weight: {
      current: weightList[0]?.weight_kg || null,
      last: weightList[1]?.weight_kg || null,
    },
  };
}