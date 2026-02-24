// lib/supabase.ts
// Place this at: lib/supabase.ts (create lib/ folder at project root)

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// ─── Get these from Supabase Dashboard → Settings → API ───────
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,       // persists session on device
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ─── TypeScript Types (mirrors your schema exactly) ───────────

export type Profile = {
  id: string;
  name: string;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  goal_weight_kg?: number;
  diet_type?: string;
  fitness_level?: string;
  workout_pref?: string;
  body_type?: string;
  activity_level?: string;
  sleep_hours?: string;
  water_goal?: number;
  conditions?: string[];
  allergies?: string[];
  cuisines?: string[];
  goals?: string[];
  food_dislikes?: string;
  created_at?: string;
  updated_at?: string;
};

export type WaterLog = {
  id?: string;
  user_id?: string;
  log_date: string;   // "YYYY-MM-DD"
  glasses: number;
  goal?: number;
};

export type SleepLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  hours_slept: number;
  quality?: "Poor" | "Fair" | "Good" | "Great";
  notes?: string;
};

export type AcneLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  severity: number;
  locations?: string[];
  photo_url?: string;
  notes?: string;
};

export type HairFallLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  count?: number;
  range_label?: string;
  notes?: string;
};

export type WeightLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  weight_kg: number;
  notes?: string;
};

export type FoodLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  meal_type?: string;
  food_name: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  is_cheat_meal?: boolean;
  notes?: string;
};

export type PeriodDailyLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  flow_intensity?: string;
  symptoms?: string[];
  notes?: string;
};

export type WorkoutSession = {
  id?: string;
  user_id?: string;
  session_date: string;
  workout_type?: string;
  duration_min?: number;
  cycle_day?: number;
  cycle_phase?: string;
  energy_level?: number;
  notes?: string;
  completed?: boolean;
};

export type ExerciseLog = {
  id?: string;
  session_id: string;
  user_id?: string;
  exercise_name: string;
  muscle_group?: string;
  sets_completed?: number;
  reps?: string;
  weight_kg?: number;
  notes?: string;
};

export type CheatMealLog = {
  id?: string;
  user_id?: string;
  log_date: string;
  log_time?: string;
  food_name?: string;
  stress_level?: number;
  mood?: string;
  trigger?: string;
  notes?: string;
};

export type Insight = {
  id?: string;
  user_id?: string;
  category: string;
  title: string;
  finding: string;
  confidence_pct?: number;
  data_points?: number;
  action?: string;
  is_active?: boolean;
  generated_at?: string;
};

export type DailySummary = {
  id?: string;
  user_id?: string;
  summary_date: string;
  cycle_day?: number;
  cycle_phase?: string;
  water_glasses?: number;
  sleep_hours?: number;
  acne_severity?: number;
  hair_fall_count?: number;
  weight_kg?: number;
  calories_eaten?: number;
  workout_done?: boolean;
};

// ─── Helper ───────────────────────────────────────────────────
export const today = () => new Date().toISOString().split("T")[0];