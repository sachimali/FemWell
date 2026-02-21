import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OnboardingWrapper from "../../components/OnboardingWrapper";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";

const GOALS = [
  { id: "fat_loss", label: "Lose weight / Burn fat", emoji: "🔥" },
  { id: "muscle", label: "Build muscle / Get toned", emoji: "💪" },
  { id: "strength", label: "Gain strength", emoji: "🏋️‍♀️" },
  { id: "flexibility", label: "Flexibility & mobility", emoji: "🧘‍♀️" },
  { id: "stress", label: "Stress relief", emoji: "🌸" },
  { id: "sleep", label: "Better sleep", emoji: "😴" },
  { id: "energy", label: "Increase energy", emoji: "⚡" },
  { id: "hormones", label: "Balance hormones", emoji: "🌙" },
  { id: "skin", label: "Improve skin & glow", emoji: "✨" },
  { id: "hair", label: "Healthier hair", emoji: "💇‍♀️" },
  { id: "posture", label: "Better posture", emoji: "🦢" },
  { id: "confidence", label: "Feel confident", emoji: "👑" },
];

const WORKOUT_PREFS = [
  {
    id: "gym",
    label: "Gym Girl",
    emoji: "🏋️‍♀️",
    desc: "Weights, machines, HIIT",
  },
  {
    id: "yoga",
    label: "Yoga Girl",
    emoji: "🧘‍♀️",
    desc: "Flows, flexibility, mindfulness",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    emoji: "🌟",
    desc: "Mix of both",
  },
  {
    id: "home",
    label: "Home Workouts",
    emoji: "🏠",
    desc: "No gym, bodyweight / bands",
  },
];

const TIME_OPTIONS = [
  { id: "t1", label: "15–20 min" },
  { id: "t2", label: "20–30 min" },
  { id: "t3", label: "30–45 min" },
  { id: "t4", label: "45–60 min" },
  { id: "t5", label: "60+ min" },
];

const LEVEL_OPTIONS = [
  { id: "beginner", label: "Beginner", desc: "Just starting out" },
  { id: "intermediate", label: "Intermediate", desc: "3–12 months exp." },
  { id: "advanced", label: "Advanced", desc: "1+ year regular training" },
];

export default function OnboardingStep4({ navigation }: any) {
  const [goals, setGoals] = useState<string[]>([]);
  const [workoutPref, setWorkoutPref] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const isValid = goals.length > 0 && workoutPref && time && level;

  return (
    <OnboardingWrapper
      step={4}
      title={"Your goals &\nvibe 🎯"}
      subtitle="Pick up to 3 goals. We'll build your entire plan around what matters most to you."
      onNext={() => navigation?.navigate("OnboardingStep5")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.rose}
      accentLight={COLORS.roseLight}
    >
      {/* Goals */}
      <View style={styles.goalHeader}>
        <Text style={styles.sectionLabel}>Top Goals</Text>
        <Text style={styles.goalCount}>{goals.length}/3 selected</Text>
      </View>
      <View style={styles.goalsGrid}>
        {GOALS.map((g) => {
          const active = goals.includes(g.id);
          const disabled = !active && goals.length >= 3;
          return (
            <TouchableOpacity
              key={g.id}
              style={[
                styles.goalChip,
                active && styles.goalChipActive,
                disabled && styles.goalChipDisabled,
              ]}
              onPress={() => toggleGoal(g.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.goalEmoji}>{g.emoji}</Text>
              <Text
                style={[
                  styles.goalText,
                  active && styles.goalTextActive,
                  disabled && styles.goalTextDisabled,
                ]}
              >
                {g.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Workout Preference */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Workout Preference</Text>
      <View style={styles.prefGrid}>
        {WORKOUT_PREFS.map((w) => (
          <TouchableOpacity
            key={w.id}
            style={[styles.prefCard, workoutPref === w.id && styles.prefCardActive]}
            onPress={() => setWorkoutPref(w.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.prefEmoji}>{w.emoji}</Text>
            <Text
              style={[styles.prefLabel, workoutPref === w.id && styles.prefLabelActive]}
            >
              {w.label}
            </Text>
            <Text
              style={[styles.prefDesc, workoutPref === w.id && styles.prefDescActive]}
            >
              {w.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Daily Time */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Time per Day</Text>
      <View style={styles.pillRow}>
        {TIME_OPTIONS.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.pill, time === t.id && styles.pillActive]}
            onPress={() => setTime(t.id)}
          >
            <Text style={[styles.pillText, time === t.id && styles.pillTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Fitness Level */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Fitness Level</Text>
      <View style={styles.levelGroup}>
        {LEVEL_OPTIONS.map((l) => (
          <TouchableOpacity
            key={l.id}
            style={[styles.levelCard, level === l.id && styles.levelCardActive]}
            onPress={() => setLevel(l.id)}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.levelLabel, level === l.id && styles.levelLabelActive]}>
                {l.label}
              </Text>
              <Text style={[styles.levelDesc, level === l.id && styles.levelDescActive]}>
                {l.desc}
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                level === l.id && { borderColor: COLORS.rose, backgroundColor: COLORS.rose },
              ]}
            >
              {level === l.id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: FONTS.sm,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  goalCount: {
    fontSize: FONTS.sm,
    color: COLORS.rose,
    fontWeight: "600",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  goalChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  goalChipActive: {
    backgroundColor: COLORS.rose,
    borderColor: COLORS.rose,
  },
  goalChipDisabled: {
    opacity: 0.4,
  },
  goalEmoji: { fontSize: 14 },
  goalText: {
    fontSize: FONTS.sm,
    fontWeight: "600",
    color: COLORS.text,
  },
  goalTextActive: { color: COLORS.white },
  goalTextDisabled: { color: COLORS.textLight },

  prefGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  prefCard: {
    width: "47.5%",
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  prefCardActive: {
    backgroundColor: COLORS.roseLight,
    borderColor: COLORS.rose,
  },
  prefEmoji: { fontSize: 22, marginBottom: 2 },
  prefLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  prefLabelActive: { color: COLORS.rose },
  prefDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
  },
  prefDescActive: { color: COLORS.rose },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  pillActive: {
    backgroundColor: COLORS.rose,
    borderColor: COLORS.rose,
  },
  pillText: {
    fontSize: FONTS.sm,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  pillTextActive: { color: COLORS.white },

  levelGroup: { gap: 8 },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  levelCardActive: {
    backgroundColor: COLORS.roseLight,
    borderColor: COLORS.rose,
  },
  levelLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  levelLabelActive: { color: COLORS.rose },
  levelDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  levelDescActive: { color: COLORS.rose },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
});