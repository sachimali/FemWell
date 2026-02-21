import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OnboardingWrapper from "../../components/OnboardingWrapper";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";

const MOODS = [
  { id: "great", label: "Great", emoji: "😊" },
  { id: "okay", label: "Okay", emoji: "😐" },
  { id: "struggling", label: "Struggling", emoji: "😔" },
];

const ENERGY_PATTERNS = [
  { id: "consistent", label: "Consistent all day", emoji: "⚡" },
  { id: "morning", label: "Morning person", emoji: "🌅", desc: "Crash in afternoon" },
  { id: "evening", label: "Slow mornings", emoji: "🌙", desc: "Energetic in evening" },
  { id: "tired", label: "Always tired", emoji: "😴" },
];

const STRESS_TOOLS = [
  { id: "meditation", label: "Meditation", emoji: "🧘‍♀️" },
  { id: "yoga", label: "Yoga / Breathing", emoji: "🌬️" },
  { id: "journal", label: "Journaling", emoji: "📔" },
  { id: "therapy", label: "Therapy", emoji: "💬" },
  { id: "walk", label: "Walking / Nature", emoji: "🌿" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "none_stress", label: "None currently", emoji: "🤷‍♀️" },
];

const CAFFEINE = [
  { id: "none", label: "None" },
  { id: "1", label: "1 cup/day" },
  { id: "2_3", label: "2–3 cups" },
  { id: "4plus", label: "4+ cups" },
];

export default function OnboardingStep7({ navigation }: any) {
  const [stress, setStress] = useState(5);
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [stressTools, setStressTools] = useState<string[]>([]);
  const [caffeine, setCaffeine] = useState("");

  const toggleTool = (id: string) => {
    if (id === "none_stress") { setStressTools(["none_stress"]); return; }
    setStressTools((prev) => {
      const without = prev.filter((t) => t !== "none_stress");
      return without.includes(id) ? without.filter((t) => t !== id) : [...without, id];
    });
  };

  const isValid = mood !== "";

  const stressLabel = stress <= 3 ? "😌 Low stress" : stress <= 6 ? "😐 Moderate" : "😰 High stress";
  const stressColor = stress <= 3 ? COLORS.sage : stress <= 6 ? COLORS.peach : COLORS.rose;

  return (
    <OnboardingWrapper
      step={7}
      title={"Mind &\nlifestyle 🧠"}
      subtitle="Mental wellness is part of physical health. Understanding your patterns helps us support you better."
      onNext={() => navigation?.navigate("OnboardingStep8")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.lavender}
      accentLight={COLORS.lavenderLight}
    >
      {/* Stress Slider */}
      <Text style={styles.sectionLabel}>Current Stress Level</Text>
      <View style={styles.sliderCard}>
        <View style={styles.sliderRow}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <TouchableOpacity
              key={n}
              style={[
                styles.sliderDot,
                n <= stress && { backgroundColor: stressColor },
              ]}
              onPress={() => setStress(n)}
            />
          ))}
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderHint}>Very calm</Text>
          <Text style={[styles.sliderValue, { color: stressColor }]}>{stressLabel}</Text>
          <Text style={styles.sliderHint}>Extremely stressed</Text>
        </View>
      </View>

      {/* Mood */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>How's your mood lately?</Text>
      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[styles.moodCard, mood === m.id && styles.moodCardActive]}
            onPress={() => setMood(m.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.moodEmoji}>{m.emoji}</Text>
            <Text style={[styles.moodLabel, mood === m.id && styles.moodLabelActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Energy Pattern */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Energy Throughout the Day</Text>
      <View style={styles.energyGroup}>
        {ENERGY_PATTERNS.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[styles.energyCard, energy === e.id && styles.energyCardActive]}
            onPress={() => setEnergy(e.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.energyEmoji}>{e.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.energyLabel, energy === e.id && styles.energyLabelActive]}>
                {e.label}
              </Text>
              {e.desc && (
                <Text style={[styles.energyDesc, energy === e.id && styles.energyDescActive]}>
                  {e.desc}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.radio,
                energy === e.id && { borderColor: COLORS.lavender, backgroundColor: COLORS.lavender },
              ]}
            >
              {energy === e.id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stress Tools */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Stress Management</Text>
      <View style={styles.chipRow}>
        {STRESS_TOOLS.map((t) => {
          const active = stressTools.includes(t.id);
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggleTool(t.id)}
            >
              <Text style={styles.chipEmoji}>{t.emoji}</Text>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Caffeine */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Daily Caffeine Intake</Text>
      <View style={styles.pillRow}>
        {CAFFEINE.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.pill, caffeine === c.id && styles.pillActive]}
            onPress={() => setCaffeine(c.id)}
          >
            <Text style={[styles.pillText, caffeine === c.id && styles.pillTextActive]}>
              {c.label}
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
  sliderCard: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 16,
    gap: 12,
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
  },
  sliderRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
  },
  sliderDot: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lavenderBorder,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderHint: {
    fontSize: 10,
    color: COLORS.textMuted,
    maxWidth: 70,
    textAlign: "center",
  },
  sliderValue: {
    fontSize: FONTS.sm,
    fontWeight: "700",
  },

  moodRow: { flexDirection: "row", gap: 10 },
  moodCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
    backgroundColor: COLORS.white,
    gap: 6,
  },
  moodCardActive: { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavender },
  moodEmoji: { fontSize: 28 },
  moodLabel: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  moodLabelActive: { color: COLORS.lavender },

  energyGroup: { gap: 8 },
  energyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
    backgroundColor: COLORS.white,
  },
  energyCardActive: { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavender },
  energyEmoji: { fontSize: 20 },
  energyLabel: { fontSize: FONTS.md, fontWeight: "600", color: COLORS.text },
  energyLabelActive: { color: COLORS.lavender },
  energyDesc: { fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 1 },
  energyDescActive: { color: COLORS.lavender },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: "center", justifyContent: "center",
  },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.white },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
    backgroundColor: COLORS.white,
  },
  chipActive: { backgroundColor: COLORS.lavender, borderColor: COLORS.lavender },
  chipEmoji: { fontSize: 13 },
  chipText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  chipTextActive: { color: COLORS.white },

  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
    backgroundColor: COLORS.white,
  },
  pillActive: { backgroundColor: COLORS.lavender, borderColor: COLORS.lavender },
  pillText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  pillTextActive: { color: COLORS.white },
});