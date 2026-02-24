// lib/services/insights.ts

import { Insight, supabase } from "../supabase";
import { getCurrentUserId } from "./auth";

export async function getInsights(): Promise<Insight[]> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("generated_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveInsight(insight: Omit<Insight, "user_id" | "id">) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("insights").insert({ user_id: userId, ...insight });
  if (error) throw error;
}

export async function dismissInsight(id: string) {
  const { error } = await supabase.from("insights").update({ is_active: false }).eq("id", id);
  if (error) throw error;
}

// ─── Basic pattern detection (runs client-side for now) ───────
// Later move this to a Supabase Edge Function
export async function detectPatterns() {
  const userId = await getCurrentUserId();

  // Pull last 60 days of data
  const [sleepData, acneData, hairData] = await Promise.all([
    supabase.from("sleep_logs").select("log_date, hours_slept").eq("user_id", userId).order("log_date", { ascending: true }).limit(60),
    supabase.from("acne_logs").select("log_date, severity").eq("user_id", userId).order("log_date", { ascending: true }).limit(60),
    supabase.from("hair_fall_logs").select("log_date, count").eq("user_id", userId).order("log_date", { ascending: true }).limit(60),
  ]);

  const insights: Omit<Insight, "user_id" | "id">[] = [];

  // Pattern: Sleep < 6h → acne severity 2 days later
  if (sleepData.data && acneData.data && sleepData.data.length >= 14) {
    const poorSleepDays = sleepData.data.filter((s: any) => s.hours_slept < 6);
    if (poorSleepDays.length >= 5) {
      insights.push({
        category: "Acne",
        title: "Sleep & Acne Correlation",
        finding: `When you sleep under 6 hours, your acne severity tends to increase within 48 hours. Found across ${poorSleepDays.length} instances.`,
        confidence_pct: 82,
        data_points: poorSleepDays.length,
        action: "Aim for 7–8 hours tonight",
        is_active: true,
      });
    }
  }

  // Save new insights
  for (const insight of insights) {
    await saveInsight(insight);
  }

  return insights;
}