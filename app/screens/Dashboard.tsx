import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, PHASE_CONFIG, RADIUS, SHADOW } from "../../constants/theme";

const { width } = Dimensions.get("window");

// Mock data — will come from Supabase later
const USER = { name: "Priya", cycleDay: 12, phase: "Follicular" as keyof typeof PHASE_CONFIG, nextPeriod: 16 };
const phase = PHASE_CONFIG[USER.phase];

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ label, value, sub, accentColor }: {
  label: string; value: string; sub: string; accentColor: string;
}) {
  return (
    <View style={[styles.statCard, SHADOW.sm]}>
      <View style={[styles.statAccent, { backgroundColor: accentColor }]} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSub}>{sub}</Text>
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────
function SectionHeader({ title, action, onAction }: {
  title: string; action?: string; onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Cycle Phase Banner ───────────────────────────────────────
function CyclePhaseBanner() {
  return (
    <View style={[styles.phaseBanner, { backgroundColor: phase.light, borderColor: phase.border }]}>
      {/* Left: phase info */}
      <View style={styles.phaseLeft}>
        <View style={styles.phaseTopRow}>
          <View style={[styles.phaseBadge, { backgroundColor: phase.color }]}>
            <Text style={styles.phaseBadgeText}>{phase.label} Phase</Text>
          </View>
          <Text style={[styles.phaseDays, { color: phase.color }]}>{phase.days}</Text>
        </View>
        <Text style={styles.phaseWorkout}>{phase.workoutFocus}</Text>
        <Text style={styles.phaseNutrition}>{phase.nutritionFocus}</Text>
      </View>

      {/* Right: day + energy */}
      <View style={styles.phaseRight}>
        <View style={[styles.dayCircle, { borderColor: phase.color }]}>
          <Text style={[styles.dayNum, { color: phase.color }]}>{USER.cycleDay}</Text>
          <Text style={[styles.dayLbl, { color: phase.color }]}>day</Text>
        </View>
        <View style={[styles.energyTag, { backgroundColor: phase.color + "18" }]}>
          <Text style={[styles.energyText, { color: phase.color }]}>
            {phase.energy} energy
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Today Summary Row ────────────────────────────────────────
function TodaySummary() {
  const [water] = useState(4);
  const stats = [
    { label: "Water",   value: `${water}/8`,  unit: "glasses", color: "#6BAED6" },
    { label: "Sleep",   value: "7h 20m",       unit: "last night", color: COLORS.lavender },
    { label: "Period",  value: `Day ${USER.cycleDay}`, unit: `${USER.nextPeriod}d until next`, color: COLORS.rose },
    { label: "Calories", value: "870",         unit: "/ 1,650 kcal", color: COLORS.peach },
  ];

  return (
    <View style={styles.summaryGrid}>
      {stats.map((s, i) => (
        <View key={i} style={[styles.summaryCard, SHADOW.sm]}>
          <View style={[styles.summaryBar, { backgroundColor: s.color }]} />
          <Text style={styles.summaryLabel}>{s.label}</Text>
          <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
          <Text style={styles.summaryUnit}>{s.unit}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Today's Workout Card ─────────────────────────────────────
function WorkoutCard() {
  return (
    <View style={[styles.card, SHADOW.sm]}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.cardLabel}>TODAY'S WORKOUT</Text>
          <Text style={styles.cardTitle}>Lower Body Strength</Text>
          <Text style={styles.cardSub}>45 min · Cycle Day {USER.cycleDay} optimised</Text>
        </View>
        <View style={[styles.intensityBadge, { backgroundColor: phase.light, borderColor: phase.border }]}>
          <Text style={[styles.intensityText, { color: phase.color }]}>{phase.intensity}</Text>
          <Text style={[styles.intensityLabel, { color: phase.color }]}>intensity</Text>
        </View>
      </View>

      <View style={styles.exercisePreview}>
        {["Barbell Hip Thrusts  4×10", "Romanian Deadlifts  4×8", "Bulgarian Split Squats  3×10"].map((ex, i) => (
          <View key={i} style={styles.exerciseRow}>
            <View style={[styles.exDot, { backgroundColor: phase.color }]} />
            <Text style={styles.exText}>{ex}</Text>
          </View>
        ))}
        <Text style={styles.moreText}>+4 more exercises</Text>
      </View>

      <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: COLORS.roseDark }, SHADOW.rose]}>
        <Text style={styles.primaryBtnText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Today's Meals Card ───────────────────────────────────────
function MealsCard() {
  const meals = [
    { name: "Moong Dal Chilla + Paneer", cal: 420, done: true },
    { name: "Greek Yogurt + Chia Seeds", cal: 150, done: true },
    { name: "Quinoa Buddha Bowl", cal: 480, done: false },
    { name: "Paneer Tikka + Salad", cal: 500, done: false },
  ];
  const consumed = meals.filter((m) => m.done).reduce((s, m) => s + m.cal, 0);
  const total = meals.reduce((s, m) => s + m.cal, 0);

  return (
    <View style={[styles.card, SHADOW.sm]}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.cardLabel}>TODAY'S MEALS</Text>
          <Text style={styles.cardTitle}>PCOS-Optimised Plan</Text>
          <Text style={styles.cardSub}>{consumed} / {total} kcal consumed</Text>
        </View>
        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineBtnText}>+ Log food</Text>
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {
          width: `${(consumed / total) * 100}%`,
          backgroundColor: COLORS.peach,
        }]} />
      </View>

      {/* Meal rows */}
      <View style={styles.mealList}>
        {meals.map((m, i) => (
          <View key={i} style={styles.mealRow}>
            <View style={[styles.mealDot, { backgroundColor: m.done ? COLORS.sage : COLORS.border }]} />
            <Text style={[styles.mealName, m.done && styles.mealNameDone]}>{m.name}</Text>
            <Text style={styles.mealCal}>{m.cal} cal</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Insight Nudge ────────────────────────────────────────────
function InsightNudge() {
  return (
    <View style={[styles.insightCard, SHADOW.sm]}>
      <View style={styles.insightLeft}>
        <View style={styles.insightIconBox}>
          <Text style={styles.insightIconText}>ML</Text>
        </View>
      </View>
      <View style={styles.insightRight}>
        <View style={styles.insightTopRow}>
          <Text style={styles.insightTitle}>New Pattern Detected</Text>
          <View style={styles.confidencePill}>
            <Text style={styles.confidenceText}>89%</Text>
          </View>
        </View>
        <Text style={styles.insightText}>
          Sleep under 6 hours increases acne severity by 40% within 48 hours — based on your last 60 days.
        </Text>
        <TouchableOpacity>
          <Text style={styles.insightLink}>View all insights</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Quick Actions ────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { label: "Log water",    sub: "4 / 8 glasses",        color: "#6BAED6", light: "#E8F4FD" },
    { label: "Log acne",     sub: "Not logged today",      color: COLORS.lavender, light: COLORS.lavenderLight },
    { label: "Log hair fall",sub: "Not logged today",      color: COLORS.peach, light: COLORS.peachLight },
    { label: "Log weight",   sub: "Last: 68.5 kg",         color: COLORS.sage, light: COLORS.sageLight },
  ];

  return (
    <View style={styles.quickGrid}>
      {actions.map((a, i) => (
        <TouchableOpacity key={i} style={[styles.quickCard, { borderColor: a.color + "30", backgroundColor: a.light }, SHADOW.sm]} activeOpacity={0.75}>
          <View style={[styles.quickDot, { backgroundColor: a.color }]} />
          <Text style={[styles.quickLabel, { color: a.color }]}>{a.label}</Text>
          <Text style={styles.quickSub}>{a.sub}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
export default function Dashboard({ onProfilePress }: { onProfilePress?: () => void }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>{USER.name}</Text>
          </View>
          <TouchableOpacity style={styles.avatar} onPress={onProfilePress}>
            <Text style={styles.avatarText}>{USER.name[0]}</Text>
          </TouchableOpacity>
        </View>

        {/* Cycle Phase */}
        <CyclePhaseBanner />

        {/* Today's summary */}
        <SectionHeader title="Today at a Glance" />
        <TodaySummary />

        {/* Quick log actions */}
        <SectionHeader title="Quick Log" action="See all" />
        <QuickActions />

        {/* Workout */}
        <SectionHeader title="Workout" action="Full plan" />
        <WorkoutCard />

        {/* Meals */}
        <SectionHeader title="Nutrition" action="Full plan" />
        <MealsCard />

        {/* ML Insight */}
        <SectionHeader title="Latest Insight" action="All insights" />
        <InsightNudge />

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const CARD_WIDTH = (width - 52) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  userName: {
    fontSize: FONTS.xxl,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.rose,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: FONTS.lg,
  },

  // Phase Banner
  phaseBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: 18,
    marginBottom: 24,
  },
  phaseLeft: { flex: 1, gap: 6 },
  phaseTopRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  phaseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  phaseBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.xs,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  phaseDays: { fontSize: FONTS.sm, fontWeight: "600" },
  phaseWorkout: { fontSize: FONTS.sm, color: COLORS.text, fontWeight: "600" },
  phaseNutrition: { fontSize: FONTS.xs, color: COLORS.textMuted },
  phaseRight: { alignItems: "center", gap: 8, marginLeft: 14 },
  dayCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNum: { fontSize: FONTS.xxl, fontWeight: "800", lineHeight: 30 },
  dayLbl: { fontSize: 9, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  energyTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  energyText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: FONTS.lg,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  sectionAction: {
    fontSize: FONTS.sm,
    color: COLORS.rose,
    fontWeight: "600",
  },

  // Summary grid
  summaryGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 12,
    gap: 3,
    overflow: "hidden",
  },
  summaryBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 8,
  },
  summaryValue: {
    fontSize: FONTS.lg,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  summaryUnit: {
    fontSize: 9,
    color: COLORS.textMuted,
    lineHeight: 13,
  },

  // Quick actions
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  quickCard: {
    width: CARD_WIDTH,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    padding: 14,
    gap: 6,
  },
  quickDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  quickLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
  },
  quickSub: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
  },

  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: FONTS.lg,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  cardSub: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Intensity badge
  intensityBadge: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  intensityText: {
    fontSize: FONTS.xl,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  intensityLabel: {
    fontSize: 9,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Exercises
  exercisePreview: { gap: 8 },
  exerciseRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  exDot: { width: 5, height: 5, borderRadius: 3 },
  exText: { fontSize: FONTS.sm, color: COLORS.text, fontWeight: "500" },
  moreText: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginLeft: 15,
    fontStyle: "italic",
  },

  // Buttons
  primaryBtn: {
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: FONTS.md,
    letterSpacing: 0.3,
  },
  outlineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.roseLight,
  },
  outlineBtnText: {
    fontSize: FONTS.sm,
    color: COLORS.rose,
    fontWeight: "700",
  },

  // Progress bar
  progressTrack: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: 4, borderRadius: 4 },

  // Meal rows
  mealList: { gap: 10 },
  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mealDot: { width: 8, height: 8, borderRadius: 4 },
  mealName: { flex: 1, fontSize: FONTS.sm, color: COLORS.text, fontWeight: "500" },
  mealNameDone: { color: COLORS.textMuted, textDecorationLine: "line-through" },
  mealCal: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "600" },

  // Insight
  insightCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.roseBorder,
    marginBottom: 14,
  },
  insightLeft: {},
  insightIconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.roseLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
  },
  insightIconText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.roseDark,
    letterSpacing: 0.5,
  },
  insightRight: { flex: 1, gap: 6 },
  insightTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  insightTitle: {
    flex: 1,
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  confidencePill: {
    backgroundColor: COLORS.roseDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  confidenceText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: "700",
  },
  insightText: {
    fontSize: FONTS.sm,
    color: COLORS.text,
    lineHeight: 20,
  },
  insightLink: {
    fontSize: FONTS.sm,
    color: COLORS.rose,
    fontWeight: "700",
  },

  // Stat card
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 14,
    overflow: "hidden",
    gap: 3,
  },
  statAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderTopLeftRadius: RADIUS.md,
    borderBottomLeftRadius: RADIUS.md,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    paddingLeft: 10,
  },
  statValue: {
    fontSize: FONTS.lg,
    fontWeight: "800",
    color: COLORS.text,
    paddingLeft: 10,
  },
  statSub: {
    fontSize: 10,
    color: COLORS.textMuted,
    paddingLeft: 10,
  },
});