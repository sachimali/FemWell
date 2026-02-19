import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import OnboardingWrapper from "./OnboardingWrapper";
import { COLORS, FONTS, RADIUS } from "./theme";

const CONDITIONS = [
  { id: "pcos", label: "PCOS", emoji: "🌸", desc: "Polycystic Ovary Syndrome" },
  { id: "pcod", label: "PCOD", emoji: "🌼", desc: "Polycystic Ovarian Disease" },
  { id: "hypo", label: "Hypothyroid", emoji: "🦋", desc: "Underactive thyroid" },
  { id: "hyper", label: "Hyperthyroid", emoji: "⚡", desc: "Overactive thyroid" },
  { id: "diabetes", label: "Diabetes", emoji: "🍃", desc: "Type 1 or Type 2" },
  { id: "endo", label: "Endometriosis", emoji: "💜", desc: "Endometrial tissue growth" },
  { id: "anemia", label: "Anemia", emoji: "🩸", desc: "Low iron / haemoglobin" },
  { id: "vitd", label: "Vitamin D Deficiency", emoji: "☀️", desc: "Low Vitamin D levels" },
  { id: "irregular", label: "Irregular Periods", emoji: "📅", desc: "Unpredictable cycle" },
  { id: "insulin", label: "Insulin Resistance", emoji: "🔬", desc: "Pre-diabetic condition" },
  { id: "joint", label: "Joint Problems", emoji: "🦴", desc: "Knee, hip, or back pain" },
  { id: "none", label: "None of the above", emoji: "✨", desc: "Generally healthy" },
];

export default function OnboardingStep2({ navigation }: any) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (id === "none") {
      setSelected(["none"]);
      return;
    }
    setSelected((prev) => {
      const without = prev.filter((s) => s !== "none");
      return without.includes(id)
        ? without.filter((s) => s !== id)
        : [...without, id];
    });
  };

  const isValid = selected.length > 0;

  return (
    <OnboardingWrapper
      step={2}
      title={"Your health,\nyour story 🦋"}
      subtitle="This helps us create a safe plan tailored to your body. Select all that apply."
      onNext={() => navigation?.navigate("OnboardingStep3")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.lavender}
      accentLight={COLORS.lavenderLight}
    >
      <View style={styles.grid}>
        {CONDITIONS.map((c) => {
          const active = selected.includes(c.id);
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => toggle(c.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>{c.emoji}</Text>
              <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>
                {c.label}
              </Text>
              <Text style={[styles.cardDesc, active && styles.cardDescActive]}>
                {c.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected.length > 0 && !selected.includes("none") && (
        <View style={styles.note}>
          <Text style={styles.noteText}>
            💡 We'll personalise your workouts, meals, and insights for{" "}
            {selected.length} condition{selected.length > 1 ? "s" : ""}.
          </Text>
        </View>
      )}
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "47.5%",
    borderWidth: 1.5,
    borderColor: COLORS.lavenderBorder,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  cardActive: {
    backgroundColor: COLORS.lavenderLight,
    borderColor: COLORS.lavender,
  },
  emoji: { fontSize: 22, marginBottom: 2 },
  cardLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardLabelActive: { color: COLORS.lavender },
  cardDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  cardDescActive: { color: COLORS.lavender },
  note: {
    marginTop: 20,
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 14,
  },
  noteText: {
    fontSize: FONTS.sm,
    color: COLORS.lavender,
    lineHeight: 20,
    fontWeight: "500",
  },
});