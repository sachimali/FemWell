import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OnboardingWrapper from "../../components/OnboardingWrapper";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";

const REGULARITY = [
  { id: "regular", label: "Regular", emoji: "📅", desc: "Predictable cycle" },
  { id: "irregular", label: "Irregular", emoji: "🌊", desc: "Unpredictable" },
  { id: "none", label: "No periods", emoji: "⏸️", desc: "Amenorrhea" },
  { id: "skip", label: "Prefer not to say", emoji: "🤐", desc: "I'll add this later" },
];

const FLOW = [
  { id: "light", label: "Light", emoji: "💧" },
  { id: "moderate", label: "Moderate", emoji: "💧💧" },
  { id: "heavy", label: "Heavy", emoji: "💧💧💧" },
];

const SYMPTOMS = [
  { id: "cramps", label: "Cramps", emoji: "😣" },
  { id: "mood", label: "Mood swings", emoji: "😤" },
  { id: "bloating", label: "Bloating", emoji: "🫃" },
  { id: "fatigue", label: "Fatigue", emoji: "😴" },
  { id: "acne", label: "Acne", emoji: "😶" },
  { id: "headache", label: "Headaches", emoji: "🤕" },
  { id: "back", label: "Back pain", emoji: "🦴" },
  { id: "cravings", label: "Cravings", emoji: "🍫" },
  { id: "breast", label: "Breast pain", emoji: "💗" },
  { id: "insomnia", label: "Insomnia", emoji: "🌙" },
  { id: "anxiety", label: "Anxiety", emoji: "😰" },
  { id: "none", label: "None / Minimal", emoji: "✨" },
];

const REPRO_GOALS = [
  { id: "wellness", label: "General wellness", emoji: "🌸" },
  { id: "ttc", label: "Trying to conceive", emoji: "👶" },
  { id: "pregnant", label: "Currently pregnant", emoji: "🤰" },
  { id: "postpartum", label: "Postpartum (0–12 mo)", emoji: "🍼" },
  { id: "breastfeeding", label: "Breastfeeding", emoji: "💛" },
];

export default function OnboardingStep6({ navigation }: any) {
  const [regularity, setRegularity] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodDuration, setPeriodDuration] = useState("5");
  const [flow, setFlow] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [reproGoal, setReproGoal] = useState("");

  const toggleSymptom = (id: string) => {
    if (id === "none") { setSymptoms(["none"]); return; }
    setSymptoms((prev) => {
      const without = prev.filter((s) => s !== "none");
      return without.includes(id) ? without.filter((s) => s !== id) : [...without, id];
    });
  };

  const showCycleDetails = regularity === "regular";
  const isValid = regularity !== "";

  return (
    <OnboardingWrapper
      step={6}
      title={"Your cycle &\nwellness 🌸"}
      subtitle="Your menstrual cycle is the foundation of your personalised plan. This is completely private."
      onNext={() => navigation?.navigate("OnboardingStep7")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.rose}
      accentLight={COLORS.roseLight}
    >
      {/* Regularity */}
      <Text style={styles.sectionLabel}>Are your periods regular?</Text>
      <View style={styles.grid}>
        {REGULARITY.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[styles.card, regularity === r.id && styles.cardActive]}
            onPress={() => setRegularity(r.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{r.emoji}</Text>
            <Text style={[styles.cardLabel, regularity === r.id && styles.cardLabelActive]}>
              {r.label}
            </Text>
            <Text style={[styles.cardDesc, regularity === r.id && styles.cardDescActive]}>
              {r.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cycle Details (only if regular) */}
      {showCycleDetails && (
        <>
          <View style={styles.cyclePair}>
            <View style={styles.cycleField}>
              <Text style={styles.sectionLabel}>Cycle Length</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setCycleLength((v) => String(Math.max(21, parseInt(v) - 1)))}
                >
                  <Text style={styles.counterBtnText}>−</Text>
                </TouchableOpacity>
                <View style={styles.counterValue}>
                  <Text style={styles.counterNumber}>{cycleLength}</Text>
                  <Text style={styles.counterUnit}>days</Text>
                </View>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setCycleLength((v) => String(Math.min(45, parseInt(v) + 1)))}
                >
                  <Text style={styles.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cycleField}>
              <Text style={styles.sectionLabel}>Period Duration</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setPeriodDuration((v) => String(Math.max(1, parseInt(v) - 1)))}
                >
                  <Text style={styles.counterBtnText}>−</Text>
                </TouchableOpacity>
                <View style={styles.counterValue}>
                  <Text style={styles.counterNumber}>{periodDuration}</Text>
                  <Text style={styles.counterUnit}>days</Text>
                </View>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => setPeriodDuration((v) => String(Math.min(10, parseInt(v) + 1)))}
                >
                  <Text style={styles.counterBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Flow */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Flow Intensity</Text>
          <View style={styles.flowRow}>
            {FLOW.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[styles.flowCard, flow === f.id && styles.flowCardActive]}
                onPress={() => setFlow(f.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.flowEmoji}>{f.emoji}</Text>
                <Text style={[styles.flowLabel, flow === f.id && styles.flowLabelActive]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Symptoms */}
      {regularity !== "none" && regularity !== "skip" && regularity !== "" && (
        <>
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Common Symptoms</Text>
          <View style={styles.chipRow}>
            {SYMPTOMS.map((s) => {
              const active = symptoms.includes(s.id);
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleSymptom(s.id)}
                >
                  <Text style={styles.chipEmoji}>{s.emoji}</Text>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {/* Reproductive Goal */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Current Focus</Text>
      <View style={styles.reproGroup}>
        {REPRO_GOALS.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[styles.reproCard, reproGoal === g.id && styles.reproCardActive]}
            onPress={() => setReproGoal(g.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.reproEmoji}>{g.emoji}</Text>
            <Text style={[styles.reproLabel, reproGoal === g.id && styles.reproLabelActive]}>
              {g.label}
            </Text>
            <View
              style={[
                styles.radio,
                reproGoal === g.id && { borderColor: COLORS.rose, backgroundColor: COLORS.rose },
              ]}
            >
              {reproGoal === g.id && <View style={styles.radioDot} />}
            </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 4,
  },
  card: {
    width: "47.5%",
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  cardActive: {
    backgroundColor: COLORS.roseLight,
    borderColor: COLORS.rose,
  },
  emoji: { fontSize: 22, marginBottom: 2 },
  cardLabel: { fontSize: FONTS.md, fontWeight: "700", color: COLORS.text },
  cardLabelActive: { color: COLORS.rose },
  cardDesc: { fontSize: FONTS.xs, color: COLORS.textMuted },
  cardDescActive: { color: COLORS.rose },

  cyclePair: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cycleField: { flex: 1 },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    padding: 8,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.roseLight,
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnText: {
    fontSize: 20,
    color: COLORS.rose,
    fontWeight: "600",
    lineHeight: 24,
  },
  counterValue: { alignItems: "center" },
  counterNumber: {
    fontSize: FONTS.xxl,
    fontWeight: "800",
    color: COLORS.text,
  },
  counterUnit: { fontSize: FONTS.xs, color: COLORS.textMuted },

  flowRow: {
    flexDirection: "row",
    gap: 10,
  },
  flowCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  flowCardActive: {
    backgroundColor: COLORS.roseLight,
    borderColor: COLORS.rose,
  },
  flowEmoji: { fontSize: 18 },
  flowLabel: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  flowLabelActive: { color: COLORS.rose },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  chipActive: { backgroundColor: COLORS.rose, borderColor: COLORS.rose },
  chipEmoji: { fontSize: 13 },
  chipText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  chipTextActive: { color: COLORS.white },

  reproGroup: { gap: 8 },
  reproCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  reproCardActive: { backgroundColor: COLORS.roseLight, borderColor: COLORS.rose },
  reproEmoji: { fontSize: 20 },
  reproLabel: { flex: 1, fontSize: FONTS.md, fontWeight: "600", color: COLORS.text },
  reproLabelActive: { color: COLORS.rose },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: "center", justifyContent: "center",
  },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.white },
});