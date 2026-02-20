import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import OnboardingWrapper from "./OnboardingWrapper";
import { COLORS, FONTS, RADIUS, SHADOW, TOTAL_STEPS } from "../constants/theme";

const NOTIFICATIONS = [
  { id: "workout", label: "Workout reminders", emoji: "💪", desc: "Daily push to show up" },
  { id: "water", label: "Water reminders", emoji: "💧", desc: "Hydration check-ins" },
  { id: "period", label: "Period predictions", emoji: "🩸", desc: "Cycle phase alerts" },
  { id: "insights", label: "Weekly insights", emoji: "🔍", desc: "Your pattern report" },
  { id: "motivation", label: "Motivational nudges", emoji: "✨", desc: "When you need a boost" },
];

export default function OnboardingStep8({ navigation }: any) {
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    workout: true,
    water: true,
    period: true,
    insights: true,
    motivation: false,
  });
  const [creating, setCreating] = useState(false);

  const toggleNotif = (id: string) => {
    setNotifs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      navigation?.navigate("Dashboard");
    }, 2000);
  };

  return (
    <OnboardingWrapper
      step={8}
      title={"Almost\nthere! 🎉"}
      subtitle="Just set your notification preferences and we'll build your personalised plan."
      onNext={handleCreate}
      onBack={() => navigation?.goBack()}
      nextLabel={creating ? "Building your plan..." : "✨ Create My Plan"}
      nextDisabled={creating}
      accentColor={COLORS.roseDark}
      accentLight={COLORS.roseLight}
    >
      {/* What we built */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>🌸 Your plan includes</Text>
        <View style={styles.summaryList}>
          {[
            "Personalised workout plan",
            "Custom meal plan for your diet",
            "Cycle-synced daily adjustments",
            "ML pattern recognition",
            "AI wellness assistant",
          ].map((item, i) => (
            <View key={i} style={styles.summaryItem}>
              <Text style={styles.summaryDot}>✓</Text>
              <Text style={styles.summaryText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Notifications */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Notification Preferences</Text>
      <View style={styles.notifGroup}>
        {NOTIFICATIONS.map((n) => (
          <View key={n.id} style={styles.notifRow}>
            <Text style={styles.notifEmoji}>{n.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.notifLabel}>{n.label}</Text>
              <Text style={styles.notifDesc}>{n.desc}</Text>
            </View>
            <Switch
              value={notifs[n.id]}
              onValueChange={() => toggleNotif(n.id)}
              trackColor={{ false: COLORS.border, true: COLORS.rose }}
              thumbColor={COLORS.white}
            />
          </View>
        ))}
      </View>

      {/* Privacy assurance */}
      <View style={styles.privacyCard}>
        <Text style={styles.privacyIcon}>🔒</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.privacyTitle}>Your data is yours</Text>
          <Text style={styles.privacyDesc}>
            We never sell your data. Everything stays private, encrypted, and only used to power YOUR plan.
          </Text>
        </View>
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

  summaryCard: {
    backgroundColor: COLORS.roseLight,
    borderRadius: RADIUS.lg,
    padding: 20,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
  },
  summaryTitle: {
    fontSize: FONTS.lg,
    fontWeight: "700",
    color: COLORS.roseDark,
    marginBottom: 14,
  },
  summaryList: { gap: 10 },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  summaryDot: {
    fontSize: FONTS.md,
    color: COLORS.rose,
    fontWeight: "700",
    width: 20,
  },
  summaryText: {
    fontSize: FONTS.md,
    color: COLORS.roseDark,
    fontWeight: "500",
  },

  notifGroup: {
    gap: 4,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  notifRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notifEmoji: { fontSize: 20 },
  notifLabel: {
    fontSize: FONTS.md,
    fontWeight: "600",
    color: COLORS.text,
  },
  notifDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 1,
  },

  privacyCard: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    backgroundColor: COLORS.sageLight,
    borderRadius: RADIUS.md,
    padding: 16,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: COLORS.sageBorder,
  },
  privacyIcon: { fontSize: 24 },
  privacyTitle: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.sage,
    marginBottom: 4,
  },
  privacyDesc: {
    fontSize: FONTS.sm,
    color: COLORS.sage,
    lineHeight: 20,
  },
});