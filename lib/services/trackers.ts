// lib/services/trackers.ts
// One file for all daily tracker operations

import { supabase, today, WaterLog, SleepLog, AcneLog, HairFallLog, WeightLog, FoodLog, PeriodDailyLog, WorkoutSession, ExerciseLog, CheatMealLog } from "../supabase";
import { getCurrentUserId } from "./auth";

// ============================================================
// WATER
// ============================================================
export async function getTodayWater(): Promise<WaterLog | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("water_logs").select("*")
    .eq("user_id", userId).eq("log_date", today()).single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertWater(glasses: number) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("water_logs").upsert(
    { user_id: userId, log_date: today(), glasses, updated_at: new Date().toISOString() },
    { onConflict: "user_id,log_date" }
  );
  if (error) throw error;
}

export async function getWaterHistory(days = 30): Promise<WaterLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("water_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// SLEEP
// ============================================================
export async function getTodaySleep(): Promise<SleepLog | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("sleep_logs").select("*")
    .eq("user_id", userId).eq("log_date", today()).single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertSleep(log: Omit<SleepLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("sleep_logs")
    .upsert({ user_id: userId, ...log }, { onConflict: "user_id,log_date" });
  if (error) throw error;
}

export async function getSleepHistory(days = 30): Promise<SleepLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("sleep_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// ACNE
// ============================================================
export async function getTodayAcne(): Promise<AcneLog | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("acne_logs").select("*")
    .eq("user_id", userId).eq("log_date", today()).single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertAcne(log: Omit<AcneLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("acne_logs")
    .upsert({ user_id: userId, ...log }, { onConflict: "user_id,log_date" });
  if (error) throw error;
}

export async function getAcneHistory(days = 60): Promise<AcneLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("acne_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// HAIR FALL
// ============================================================
export async function getTodayHairFall(): Promise<HairFallLog | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("hair_fall_logs").select("*")
    .eq("user_id", userId).eq("log_date", today()).single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertHairFall(log: Omit<HairFallLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("hair_fall_logs")
    .upsert({ user_id: userId, ...log }, { onConflict: "user_id,log_date" });
  if (error) throw error;
}

export async function getHairFallHistory(days = 60): Promise<HairFallLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("hair_fall_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// WEIGHT
// ============================================================
export async function upsertWeight(weight_kg: number, notes?: string) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("weight_logs")
    .upsert({ user_id: userId, log_date: today(), weight_kg, notes }, { onConflict: "user_id,log_date" });
  if (error) throw error;
}

export async function getWeightHistory(days = 90): Promise<WeightLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("weight_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// PERIOD
// ============================================================
export async function logPeriodDay(log: Omit<PeriodDailyLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("period_daily_logs")
    .upsert({ user_id: userId, ...log }, { onConflict: "user_id,log_date" });
  if (error) throw error;
}

export async function getPeriodHistory(months = 6): Promise<PeriodDailyLog[]> {
  const userId = await getCurrentUserId();
  const since = new Date();
  since.setMonth(since.getMonth() - months);
  const { data, error } = await supabase
    .from("period_daily_logs").select("*").eq("user_id", userId)
    .gte("log_date", since.toISOString().split("T")[0])
    .order("log_date", { ascending: false });
  if (error) throw error;
  return data || [];
}

// ============================================================
// FOOD LOG
// ============================================================
export async function logFood(entry: Omit<FoodLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("food_logs").insert({ user_id: userId, ...entry });
  if (error) throw error;
}

export async function getTodayFoodLogs(): Promise<FoodLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("food_logs").select("*").eq("user_id", userId).eq("log_date", today())
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function deleteFoodLog(id: string) {
  const { error } = await supabase.from("food_logs").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// WORKOUT
// ============================================================
export async function startWorkoutSession(session: Omit<WorkoutSession, "user_id" | "id">): Promise<string> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("workout_sessions").insert({ user_id: userId, ...session }).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function logExercise(exercise: Omit<ExerciseLog, "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("exercise_logs").insert({ ...exercise, user_id: userId });
  if (error) throw error;
}

export async function getWorkoutHistory(days = 30): Promise<WorkoutSession[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("workout_sessions").select("*, exercise_logs(*)")
    .eq("user_id", userId).order("session_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}

// ============================================================
// CHEAT MEALS
// ============================================================
export async function logCheatMeal(entry: Omit<CheatMealLog, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("cheat_meal_logs").insert({ user_id: userId, ...entry });
  if (error) throw error;
}

export async function getCheatMealHistory(days = 60): Promise<CheatMealLog[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("cheat_meal_logs").select("*").eq("user_id", userId)
    .order("log_date", { ascending: false }).limit(days);
  if (error) throw error;
  return data || [];
}