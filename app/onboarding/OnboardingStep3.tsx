import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OnboardingWrapper from "./OnboardingWrapper";
import { COLORS, FONTS, RADIUS, SHADOW, TOTAL_STEPS } from "../constants/theme";

const BODY_TYPES = [
  {
    id: "ecto",
    label: "Ectomorph",
    emoji: "🌿",
    desc: "Naturally lean, fast metabolism",
  },
  {
    id: "meso",
    label: "Mesomorph",
    emoji: "💪",
    desc: "Athletic build, gains muscle easily",
  },
  {
    id: "endo",
    label: "Endomorph",
    emoji: "🌸",
    desc: "Curvy, slower metabolism",
  },
  {
    id: "unsure",
    label: "Not Sure",
    emoji: "🤔",
    desc: "We'll figure it out together",
  },
];

const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentary", emoji: "🛋️", desc: "Desk job, minimal movement" },
  { id: "light", label: "Lightly Active", emoji: "🚶‍♀️", desc: "Exercise 1–3 days/week" },
  { id: "moderate", label: "Moderately Active", emoji: "🏃‍♀️", desc: "Exercise 3–5 days/week" },
  { id: "very", label: "Very Active", emoji: "⚡", desc: "Intense exercise 6–7 days/week" },
];

const SLEEP_OPTIONS = [
  { id: "s1", label: "< 5 hrs" },
  { id: "s2", label: "5–6 hrs" },
  { id: "s3", label: "6–7 hrs" },
  { id: "s4", label: "7–8 hrs" },
  { id: "s5", label: "8+ hrs" },
];

const WATER_OPTIONS = [
  { id: "w1", label: "< 4 glasses" },
  { id: "w2", label: "4–6 glasses" },
  { id: "w3", label: "6–8 glasses" },
  { id: "w4", label: "8+ glasses" },
];

export default function OnboardingStep3({ navigation }: any) {
  const [bodyType, setBodyType] = useState("");
  const [activity, setActivity] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");

  const isValid = bodyType && activity;

  return (
    <OnboardingWrapper
      step={3}
      title={"Body &\nlifestyle 🌿"}
      subtitle="Help us understand your daily rhythm so we can match your plan to your real life."
      onNext={() => navigation?.navigate("OnboardingStep4")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.sage}
      accentLight={COLORS.sageLight}
    >
      {/* Body Type */}
      <Text style={styles.sectionLabel}>Body Type</Text>
      <View style={styles.grid2}>
        {BODY_TYPES.map((b) => (
          <TouchableOpacity
            key={b.id}
            style={[styles.card, bodyType === b.id && styles.cardActiveSage]}
            onPress={() => setBodyType(b.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{b.emoji}</Text>
            <Text style={[styles.cardLabel, bodyType === b.id && styles.labelActiveSage]}>
              {b.label}
            </Text>
            <Text style={[styles.cardDesc, bodyType === b.id && styles.descActiveSage]}>
              {b.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity Level */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Activity Level</Text>
      <View style={styles.listGroup}>
        {ACTIVITY_LEVELS.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={[styles.rowCard, activity === a.id && styles.rowCardActiveSage]}
            onPress={() => setActivity(a.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.rowEmoji}>{a.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, activity === a.id && styles.labelActiveSage]}>
                {a.label}
              </Text>
              <Text style={[styles.rowDesc, activity === a.id && styles.descActiveSage]}>
                {a.desc}
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                activity === a.id && { borderColor: COLORS.sage, backgroundColor: COLORS.sage },
              ]}
            >
              {activity === a.id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sleep */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Average Sleep per Night
      </Text>
      <View style={styles.pillRow}>
        {SLEEP_OPTIONS.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.pill, sleep === s.id && styles.pillActiveSage]}
            onPress={() => setSleep(s.id)}
          >
            <Text style={[styles.pillText, sleep === s.id && styles.pillTextActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Water */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Daily Water Intake
      </Text>
      <View style={styles.pillRow}>
        {WATER_OPTIONS.map((w) => (
          <TouchableOpacity
            key={w.id}
            style={[styles.pill, water === w.id && styles.pillActiveSage]}
            onPress={() => setWater(w.id)}
          >
            <Text style={[styles.pillText, water === w.id && styles.pillTextActive]}>
              {w.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: FONTS.sm,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "47.5%",
    borderWidth: 1.5,
    borderColor: COLORS.sageBorder,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  cardActiveSage: {
    backgroundColor: COLORS.sageLight,
    borderColor: COLORS.sage,
  },
  emoji: { fontSize: 22, marginBottom: 2 },
  cardLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  labelActiveSage: { color: COLORS.sage },
  cardDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  descActiveSage: { color: COLORS.sage },

  listGroup: { gap: 8 },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.sageBorder,
    backgroundColor: COLORS.white,
  },
  rowCardActiveSage: {
    backgroundColor: COLORS.sageLight,
    borderColor: COLORS.sage,
  },
  rowEmoji: { fontSize: 20 },
  rowLabel: {
    fontSize: FONTS.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  rowDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 1,
  },
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
    borderColor: COLORS.sageBorder,
    backgroundColor: COLORS.white,
  },
  pillActiveSage: {
    backgroundColor: COLORS.sage,
    borderColor: COLORS.sage,
  },
  pillText: {
    fontSize: FONTS.sm,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  pillTextActive: { color: COLORS.white },
});