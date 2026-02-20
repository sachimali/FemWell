import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../constants/theme";

interface Props {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}

function PlaceholderScreen({ emoji, title, subtitle, color }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
        <View style={[styles.badge, { backgroundColor: color + "20", borderColor: color + "40" }]}>
          <Text style={[styles.badgeText, { color }]}>Coming soon 🚧</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function TrackScreen() {
  return (
    <PlaceholderScreen
      emoji="📊"
      title="Daily Trackers"
      subtitle="Water, Period, Sleep, Acne, Hair Fall & Food Log"
      color={COLORS.rose}
    />
  );
}

export function PlanScreen() {
  return (
    <PlaceholderScreen
      emoji="✨"
      title="Your Plan"
      subtitle="Personalised workouts & cycle-synced meal plans"
      color={COLORS.lavender}
    />
  );
}

export function InsightsScreen() {
  return (
    <PlaceholderScreen
      emoji="💡"
      title="Insights"
      subtitle="ML-powered patterns & AI wellness assistant"
      color={COLORS.sage}
    />
  );
}

export function ProfileScreen() {
  return (
    <PlaceholderScreen
      emoji="👑"
      title="My Profile"
      subtitle="Settings, health conditions & progress reports"
      color={COLORS.peach}
    />
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emoji: { fontSize: 56, marginBottom: 8 },
  title: { fontSize: FONTS.xxl, fontWeight: "800", letterSpacing: -0.5, textAlign: "center" },
  sub: {
    fontSize: FONTS.md,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  badge: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  badgeText: { fontSize: FONTS.sm, fontWeight: "700" },
});