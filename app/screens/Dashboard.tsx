import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { COLORS, FONTS, RADIUS, SHADOW } from "../constants/theme";

const { width } = Dimensions.get("window");

// ─── Mock Data ───────────────────────────────────────────────
const USER = {
  name: "Priya",
  cycleDay: 12,
  phase: "Follicular",
  nextPeriod: 16,
  conditions: ["PCOS"],
};

const PHASE_CONFIG: Record<string, {
  emoji: string; tagline: string; energy: string;
  color: string; light: string; border: string; tip: string;
}> = {
  Menstrual: {
    emoji: "🌑", tagline: "Rest & restore", energy: "Low",
    color: "#C4748A", light: "#F9EEF1", border: "#EDD8E0",
    tip: "Gentle yoga & iron-rich foods today 🍃",
  },
  Follicular: {
    emoji: "🌱", tagline: "Energy rising — go get it!", energy: "High",
    color: "#6AAB7B", light: "#EAF4EC", border: "#C8E6CF",
    tip: "Perfect day for heavy lifting & protein 💪",
  },
  Ovulation: {
    emoji: "🌕", tagline: "Peak performance mode", energy: "Peak",
    color: "#E8956D", light: "#FDF0EA", border: "#F5CDB0",
    tip: "Your strongest day — go for PRs! 🔥",
  },
  Luteal: {
    emoji: "🌘", tagline: "Ease into it", energy: "Moderate",
    color: "#A98CC4", light: "#F3EDF9", border: "#E0D4F0",
    tip: "Focus on complex carbs & magnesium 🍫",
  },
};

const phase = PHASE_CONFIG[USER.phase];

// ─── Sub-components ──────────────────────────────────────────

function CycleBanner() {
  return (
    <View style={[styles.banner, { backgroundColor: phase.light, borderColor: phase.border }]}>
      <View style={styles.bannerLeft}>
        <View style={styles.bannerTopRow}>
          <Text style={styles.bannerEmoji}>{phase.emoji}</Text>
          <View style={[styles.phasePill, { backgroundColor: phase.color }]}>
            <Text style={styles.phasePillText}>{USER.phase} Phase</Text>
          </View>
        </View>
        <Text style={[styles.bannerTagline, { color: phase.color }]}>{phase.tagline}</Text>
        <Text style={styles.bannerSub}>
          Day {USER.cycleDay} · Next period in{" "}
          <Text style={{ fontWeight: "700" }}>{USER.nextPeriod} days</Text>
        </Text>
      </View>

      <View style={styles.bannerRight}>
        <View style={[styles.dayCircle, { borderColor: phase.color }]}>
          <Text style={[styles.dayNumber, { color: phase.color }]}>{USER.cycleDay}</Text>
          <Text style={[styles.dayLabel, { color: phase.color }]}>Day</Text>
        </View>
      </View>
    </View>
  );
}

function TipCard() {
  return (
    <View style={[styles.tipCard, { backgroundColor: phase.light, borderColor: phase.border }]}>
      <Text style={styles.tipIcon}>💡</Text>
      <Text style={[styles.tipText, { color: phase.color }]}>{phase.tip}</Text>
    </View>
  );
}

function WaterTracker() {
  const [glasses, setGlasses] = useState(4);
  const goal = 8;
  return (
    <View style={styles.trackerCard}>
      <View style={styles.trackerHeader}>
        <Text style={styles.trackerTitle}>💧 Water</Text>
        <Text style={styles.trackerSub}>{glasses}/{goal} glasses</Text>
      </View>
      <View style={styles.waterGlasses}>
        {Array.from({ length: goal }, (_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setGlasses(i + 1)}
            style={[
              styles.glassBtn,
              i < glasses && styles.glassBtnFilled,
            ]}
          >
            <Text style={styles.glassEmoji}>{i < glasses ? "💧" : "○"}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(glasses / goal) * 100}%`, backgroundColor: "#6BAED6" },
          ]}
        />
      </View>
      <TouchableOpacity
        style={styles.quickAddBtn}
        onPress={() => setGlasses((g) => Math.min(g + 1, goal))}
      >
        <Text style={styles.quickAddText}>+ Add glass</Text>
      </TouchableOpacity>
    </View>
  );
}

function SleepCard() {
  return (
    <View style={styles.trackerCard}>
      <View style={styles.trackerHeader}>
        <Text style={styles.trackerTitle}>😴 Sleep</Text>
        <Text style={styles.trackerSub}>Last night</Text>
      </View>
      <Text style={styles.sleepHours}>7h 20m</Text>
      <View style={styles.sleepStars}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Text key={s} style={{ fontSize: 16 }}>{s <= 4 ? "⭐" : "☆"}</Text>
        ))}
      </View>
      <Text style={styles.sleepNote}>Good sleep — workouts will feel strong today 💪</Text>
    </View>
  );
}

function QuickTrackers() {
  const trackers = [
    { emoji: "🩸", label: "Period", value: "Day 12", color: COLORS.rose, light: COLORS.roseLight },
    { emoji: "📸", label: "Acne", value: "Log today", color: COLORS.lavender, light: COLORS.lavenderLight },
    { emoji: "💇", label: "Hair Fall", value: "Log today", color: COLORS.peach, light: COLORS.peachLight },
    { emoji: "🍕", label: "Cheat Meal", value: "None logged", color: COLORS.sage, light: COLORS.sageLight },
  ];

  return (
    <View style={styles.quickGrid}>
      {trackers.map((t, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.quickCard, { backgroundColor: t.light, borderColor: t.color + "40" }]}
          activeOpacity={0.8}
        >
          <Text style={styles.quickEmoji}>{t.emoji}</Text>
          <Text style={[styles.quickLabel, { color: t.color }]}>{t.label}</Text>
          <Text style={styles.quickValue}>{t.value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function WorkoutPreview() {
  const exercises = [
    "Barbell Hip Thrusts · 4×10",
    "Romanian Deadlifts · 4×8",
    "Bulgarian Split Squats · 3×10",
    "Cable Kickbacks · 3×12",
  ];

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>💪 Today's Workout</Text>
          <Text style={styles.sectionSub}>Lower Body Strength · 45 min</Text>
        </View>
        <View style={[styles.energyBadge, { backgroundColor: phase.light }]}>
          <Text style={[styles.energyText, { color: phase.color }]}>
            {phase.energy} energy ⚡
          </Text>
        </View>
      </View>

      <View style={styles.exerciseList}>
        {exercises.map((ex, i) => (
          <View key={i} style={styles.exerciseRow}>
            <View style={[styles.exerciseDot, { backgroundColor: COLORS.rose }]} />
            <Text style={styles.exerciseText}>{ex}</Text>
          </View>
        ))}
        <Text style={styles.moreText}>+3 more exercises</Text>
      </View>

      <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
        <Text style={styles.startBtnText}>Start Workout →</Text>
      </TouchableOpacity>
    </View>
  );
}

function MealPreview() {
  const meals = [
    { time: "Breakfast", name: "Moong Dal Chilla + Paneer", cal: 420, done: true },
    { time: "Snack", name: "Greek Yogurt + Chia Seeds", cal: 150, done: true },
    { time: "Lunch", name: "Quinoa Buddha Bowl", cal: 480, done: false },
    { time: "Dinner", name: "Paneer Tikka + Salad", cal: 500, done: false },
  ];

  const totalCal = meals.reduce((s, m) => s + m.cal, 0);
  const consumed = meals.filter((m) => m.done).reduce((s, m) => s + m.cal, 0);

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>🍽️ Today's Meals</Text>
          <Text style={styles.sectionSub}>
            {consumed} / {totalCal} kcal · PCOS-optimised
          </Text>
        </View>
        <TouchableOpacity style={styles.logFoodBtn}>
          <Text style={styles.logFoodText}>+ Log</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(consumed / totalCal) * 100}%`, backgroundColor: COLORS.peach },
          ]}
        />
      </View>

      <View style={styles.mealList}>
        {meals.map((m, i) => (
          <View key={i} style={[styles.mealRow, m.done && styles.mealRowDone]}>
            <View style={styles.mealLeft}>
              <Text style={styles.mealDone}>{m.done ? "✓" : "○"}</Text>
              <View>
                <Text style={styles.mealTime}>{m.time}</Text>
                <Text style={[styles.mealName, m.done && styles.mealNameDone]}>
                  {m.name}
                </Text>
              </View>
            </View>
            <Text style={styles.mealCal}>{m.cal} cal</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function InsightCard() {
  return (
    <View style={[styles.insightCard]}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightIcon}>🔍</Text>
        <Text style={styles.insightTitle}>New Pattern Found</Text>
        <View style={styles.confidencePill}>
          <Text style={styles.confidenceText}>89% confidence</Text>
        </View>
      </View>
      <Text style={styles.insightText}>
        "When you sleep less than 6 hours, your acne severity increases by{" "}
        <Text style={{ fontWeight: "700", color: COLORS.roseDark }}>40%</Text> within 48 hours."
      </Text>
      <TouchableOpacity>
        <Text style={styles.insightLink}>View all insights →</Text>
      </TouchableOpacity>
    </View>
  );
}

function AIChat() {
  const suggestions = [
    "Why am I bloated today?",
    "Best exercises for PCOS?",
    "I'm craving chocolate 🍫",
  ];

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>🤖 Ask FemWell AI</Text>
      <Text style={styles.sectionSub}>Your personal wellness assistant</Text>
      <View style={styles.chatSuggestions}>
        {suggestions.map((s, i) => (
          <TouchableOpacity key={i} style={styles.suggestionChip} activeOpacity={0.8}>
            <Text style={styles.suggestionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.chatInputBox} activeOpacity={0.8}>
        <Text style={styles.chatPlaceholder}>Ask anything about your health...</Text>
        <Text style={styles.chatSend}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning 🌸</Text>
            <Text style={styles.userName}>{USER.name}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </TouchableOpacity>
        </View>

        {/* Cycle Banner */}
        <CycleBanner />

        {/* Tip */}
        <TipCard />

        {/* Water + Sleep side by side */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}><WaterTracker /></View>
          <View style={{ flex: 1 }}><SleepCard /></View>
        </View>

        {/* Quick Trackers */}
        <Text style={styles.heading}>Today's Trackers</Text>
        <QuickTrackers />

        {/* Workout */}
        <Text style={styles.heading}>Your Plan</Text>
        <WorkoutPreview />

        {/* Meals */}
        <MealPreview />

        {/* ML Insight */}
        <Text style={styles.heading}>Insights</Text>
        <InsightCard />

        {/* AI Chat */}
        <AIChat />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 16 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { fontSize: FONTS.sm, color: COLORS.textMuted, fontWeight: "500" },
  userName: { fontSize: FONTS.xxl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.5 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.rose,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: COLORS.white, fontWeight: "800", fontSize: FONTS.lg },

  // Banner
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: 18,
    marginBottom: 10,
  },
  bannerLeft: { flex: 1, gap: 6 },
  bannerTopRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bannerEmoji: { fontSize: 22 },
  phasePill: {
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 50,
  },
  phasePillText: { color: COLORS.white, fontSize: FONTS.xs, fontWeight: "700" },
  bannerTagline: { fontSize: FONTS.lg, fontWeight: "800", letterSpacing: -0.3 },
  bannerSub: { fontSize: FONTS.sm, color: COLORS.textMuted },
  bannerRight: { marginLeft: 16 },
  dayCircle: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 2.5,
    alignItems: "center", justifyContent: "center",
  },
  dayNumber: { fontSize: FONTS.xxl, fontWeight: "800", lineHeight: 32 },
  dayLabel: { fontSize: 10, fontWeight: "600" },

  // Tip
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    padding: 12,
    marginBottom: 16,
  },
  tipIcon: { fontSize: 18 },
  tipText: { flex: 1, fontSize: FONTS.sm, fontWeight: "500", lineHeight: 18 },

  // Row
  row: { flexDirection: "row", gap: 12, marginBottom: 4 },

  // Tracker cards
  trackerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    gap: 8,
  },
  trackerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  trackerTitle: { fontSize: FONTS.md, fontWeight: "700", color: COLORS.text },
  trackerSub: { fontSize: FONTS.xs, color: COLORS.textMuted },

  // Water
  waterGlasses: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  glassBtn: {
    width: 28, height: 28,
    borderRadius: 14,
    alignItems: "center", justifyContent: "center",
  },
  glassBtnFilled: {},
  glassEmoji: { fontSize: 16 },
  quickAddBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F4FD",
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 50,
  },
  quickAddText: { fontSize: FONTS.xs, color: "#6BAED6", fontWeight: "700" },

  // Sleep
  sleepHours: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  sleepStars: { flexDirection: "row", gap: 2 },
  sleepNote: { fontSize: FONTS.xs, color: COLORS.textMuted, lineHeight: 16 },

  // Progress bar
  progressBarTrack: {
    height: 5, backgroundColor: COLORS.border,
    borderRadius: 4, overflow: "hidden",
  },
  progressBarFill: { height: 5, borderRadius: 4 },

  // Quick grid
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  quickCard: {
    width: (width - 50) / 2,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    padding: 14,
    gap: 4,
  },
  quickEmoji: { fontSize: 24, marginBottom: 2 },
  quickLabel: { fontSize: FONTS.sm, fontWeight: "700" },
  quickValue: { fontSize: FONTS.xs, color: COLORS.textMuted },

  // Section cards
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 14,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  sectionTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text },
  sectionSub: { fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 2 },

  // Workout
  energyBadge: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 50,
  },
  energyText: { fontSize: FONTS.xs, fontWeight: "700" },
  exerciseList: { gap: 8 },
  exerciseRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  exerciseDot: { width: 6, height: 6, borderRadius: 3 },
  exerciseText: { fontSize: FONTS.sm, color: COLORS.text, fontWeight: "500" },
  moreText: { fontSize: FONTS.xs, color: COLORS.textMuted, marginLeft: 16 },
  startBtn: {
    backgroundColor: COLORS.roseDark,
    borderRadius: RADIUS.md,
    height: 50,
    alignItems: "center", justifyContent: "center",
  },
  startBtnText: { color: COLORS.white, fontWeight: "700", fontSize: FONTS.md },

  // Meals
  logFoodBtn: {
    backgroundColor: COLORS.roseLight,
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
  },
  logFoodText: { fontSize: FONTS.sm, color: COLORS.rose, fontWeight: "700" },
  mealList: { gap: 10 },
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealRowDone: { opacity: 0.6 },
  mealLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  mealDone: { fontSize: 16, color: COLORS.sage, fontWeight: "700", width: 20 },
  mealTime: { fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", fontWeight: "600" },
  mealName: { fontSize: FONTS.sm, color: COLORS.text, fontWeight: "600" },
  mealNameDone: { textDecorationLine: "line-through", color: COLORS.textMuted },
  mealCal: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "600" },

  // Insight
  insightCard: {
    backgroundColor: COLORS.roseLight,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    padding: 18,
    marginBottom: 14,
    gap: 10,
  },
  insightHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  insightIcon: { fontSize: 20 },
  insightTitle: { flex: 1, fontSize: FONTS.md, fontWeight: "700", color: COLORS.text },
  confidencePill: {
    backgroundColor: COLORS.rose,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 50,
  },
  confidenceText: { fontSize: 10, color: COLORS.white, fontWeight: "700" },
  insightText: { fontSize: FONTS.sm, color: COLORS.text, lineHeight: 22 },
  insightLink: { fontSize: FONTS.sm, color: COLORS.rose, fontWeight: "700" },

  // AI Chat
  chatSuggestions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  suggestionChip: {
    backgroundColor: COLORS.roseLight,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    borderRadius: 50,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  suggestionText: { fontSize: FONTS.xs, color: COLORS.rose, fontWeight: "600" },
  chatInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  chatPlaceholder: { flex: 1, fontSize: FONTS.sm, color: COLORS.textLight },
  chatSend: { fontSize: FONTS.xl, color: COLORS.rose, fontWeight: "700" },

  // Headings
  heading: {
    fontSize: FONTS.lg,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.3,
    marginBottom: 10,
    marginTop: 6,
  },
});