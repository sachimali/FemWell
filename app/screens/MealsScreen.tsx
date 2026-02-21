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
const PHASE = "Follicular" as keyof typeof PHASE_CONFIG;
const phase = PHASE_CONFIG[PHASE];

const MEALS = [
  {
    time: "Breakfast · 8:00 AM",
    name: "Moong Dal Chilla + Paneer",
    desc: "High protein, low GI — PCOS optimised",
    cal: 420, protein: 28, carbs: 38, fat: 12,
    done: true,
  },
  {
    time: "Mid-Morning · 11:00 AM",
    name: "Greek Yogurt + Chia + Berries",
    desc: "Antioxidants support follicular phase",
    cal: 180, protein: 14, carbs: 18, fat: 5,
    done: true,
  },
  {
    time: "Lunch · 1:00 PM",
    name: "Quinoa Buddha Bowl",
    desc: "Iron + fibre combo for cycle support",
    cal: 480, protein: 22, carbs: 55, fat: 14,
    done: false,
  },
  {
    time: "Snack · 4:30 PM",
    name: "Almonds + Dark Chocolate",
    desc: "Magnesium snack for hormonal balance",
    cal: 210, protein: 6, carbs: 16, fat: 14,
    done: false,
  },
  {
    time: "Dinner · 7:30 PM",
    name: "Paneer Tikka + Roti + Salad",
    desc: "Lean protein + complex carb dinner",
    cal: 520, protein: 32, carbs: 42, fat: 16,
    done: false,
  },
];

const TOTAL_CAL   = MEALS.reduce((s, m) => s + m.cal, 0);
const TOTAL_PRO   = MEALS.reduce((s, m) => s + m.protein, 0);
const TOTAL_CARBS = MEALS.reduce((s, m) => s + m.carbs, 0);
const TOTAL_FAT   = MEALS.reduce((s, m) => s + m.fat, 0);
const DONE_CAL    = MEALS.filter(m => m.done).reduce((s, m) => s + m.cal, 0);

const PHASE_NUTRITION: Record<string, { title: string; tips: string[] }> = {
  Menstrual:  { title: "Iron & Anti-inflammatory", tips: ["Increase iron: spinach, lentils, tofu", "Omega-3s reduce cramps: flaxseed, walnuts", "Avoid processed sugar & dairy", "Warm soups & herbal teas"] },
  Follicular: { title: "Lean Protein & Complex Carbs", tips: ["High protein supports muscle building", "Complex carbs fuel rising energy", "Fermented foods boost oestrogen metabolism", "Lots of vegetables & fibre"] },
  Ovulation:  { title: "Fibre & Antioxidants", tips: ["Fibre helps flush excess oestrogen", "Antioxidant-rich berries & greens", "Light, colourful meals", "Increase hydration"] },
  Luteal:     { title: "Magnesium & B6 Focus", tips: ["Magnesium reduces bloating & mood swings", "B6-rich foods: bananas, chickpeas, salmon", "Complex carbs reduce PMS cravings", "Dark chocolate in moderation"] },
};

const nutrition = PHASE_NUTRITION[PHASE];

function MacroBar({ value, total, color }: { value: number; total: number; color: string }) {
  return (
    <View style={styles.macroBar}>
      <View style={[styles.macroFill, { width: `${Math.min((value / total) * 100, 100)}%` as any, backgroundColor: color }]} />
    </View>
  );
}

function MealsScreen() {
  const [activeDay, setActiveDay] = useState(3);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenLabel}>CYCLE-SYNCED</Text>
            <Text style={styles.screenTitle}>Meal Plan</Text>
          </View>
          <TouchableOpacity style={[styles.logBtn, SHADOW.sm]}>
            <Text style={styles.logBtnText}>+ Log food</Text>
          </TouchableOpacity>
        </View>

        {/* ── Day selector ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayRow}>
          {days.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayPill, activeDay === i && styles.dayPillActive]}
              onPress={() => setActiveDay(i)}
            >
              <Text style={[styles.dayPillText, activeDay === i && styles.dayPillTextActive]}>{d}</Text>
              {i === 3 && <View style={[styles.todayDot, { backgroundColor: activeDay === 3 ? COLORS.white : COLORS.rose }]} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Calorie summary ── */}
        <View style={[styles.calCard, SHADOW.sm]}>
          <View style={styles.calRow}>
            <View style={styles.calBlock}>
              <Text style={styles.calNum}>{DONE_CAL}</Text>
              <Text style={styles.calLabel}>consumed</Text>
            </View>
            <View style={[styles.calCircle, { borderColor: phase.color }]}>
              <Text style={[styles.calCircleNum, { color: phase.color }]}>{TOTAL_CAL - DONE_CAL}</Text>
              <Text style={[styles.calCircleLabel, { color: phase.color }]}>remaining</Text>
            </View>
            <View style={styles.calBlock}>
              <Text style={styles.calNum}>{TOTAL_CAL}</Text>
              <Text style={styles.calLabel}>goal</Text>
            </View>
          </View>

          {/* Overall progress */}
          <View style={styles.calBar}>
            <View style={[styles.calBarFill, { width: `${(DONE_CAL / TOTAL_CAL) * 100}%` as any, backgroundColor: phase.color }]} />
          </View>

          {/* Macros */}
          <View style={styles.macros}>
            {[
              { label: "Protein",  val: TOTAL_PRO,   unit: "g", color: COLORS.rose,     goal: 120 },
              { label: "Carbs",    val: TOTAL_CARBS,  unit: "g", color: COLORS.peach,    goal: 180 },
              { label: "Fat",      val: TOTAL_FAT,    unit: "g", color: COLORS.lavender, goal: 60  },
            ].map((m, i) => (
              <View key={i} style={styles.macroItem}>
                <Text style={styles.macroLabel}>{m.label}</Text>
                <Text style={[styles.macroVal, { color: m.color }]}>{m.val}{m.unit}</Text>
                <MacroBar value={m.val} total={m.goal} color={m.color} />
                <Text style={styles.macroGoal}>/ {m.goal}{m.unit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Phase nutrition ── */}
        <View style={[styles.phaseCard, { backgroundColor: phase.light, borderColor: phase.border }]}>
          <View style={[styles.phaseBar, { backgroundColor: phase.color }]} />
          <View style={styles.phaseBody}>
            <Text style={[styles.phaseTitle, { color: phase.color }]}>{PHASE} Focus: {nutrition.title}</Text>
            <View style={styles.phaseTips}>
              {nutrition.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <View style={[styles.tipDot, { backgroundColor: phase.color }]} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Meal list ── */}
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        <View style={styles.mealList}>
          {MEALS.map((meal, i) => (
            <View key={i} style={[styles.mealCard, meal.done && styles.mealCardDone, SHADOW.sm]}>
              <View style={[styles.mealStatus, { backgroundColor: meal.done ? COLORS.sage : COLORS.border }]} />
              <View style={styles.mealBody}>
                <View style={styles.mealTopRow}>
                  <View style={styles.mealLeft}>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                    <Text style={[styles.mealName, meal.done && styles.mealNameDone]}>{meal.name}</Text>
                    <Text style={styles.mealDesc}>{meal.desc}</Text>
                  </View>
                  <View style={styles.mealRight}>
                    <Text style={[styles.mealCal, meal.done && { color: COLORS.textMuted }]}>{meal.cal}</Text>
                    <Text style={styles.mealCalLabel}>kcal</Text>
                  </View>
                </View>
                <View style={styles.mealMacros}>
                  <Text style={styles.mealMacroText}>P: {meal.protein}g</Text>
                  <Text style={styles.mealMacroDot}>·</Text>
                  <Text style={styles.mealMacroText}>C: {meal.carbs}g</Text>
                  <Text style={styles.mealMacroDot}>·</Text>
                  <Text style={styles.mealMacroText}>F: {meal.fat}g</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MealsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  screenLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  screenTitle: { fontSize: FONTS.xxl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.8, marginTop: 2 },
  logBtn: { backgroundColor: COLORS.roseDark, paddingHorizontal: 14, paddingVertical: 9, borderRadius: RADIUS.md },
  logBtnText: { color: COLORS.white, fontWeight: "700", fontSize: FONTS.sm },

  dayRow: { marginBottom: 20 },
  dayPill: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: RADIUS.full, backgroundColor: COLORS.white, marginRight: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: "center" },
  dayPillActive: { backgroundColor: COLORS.roseDark, borderColor: COLORS.roseDark },
  dayPillText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  dayPillTextActive: { color: COLORS.white },
  todayDot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },

  calCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border, gap: 14 },
  calRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  calBlock: { alignItems: "center", gap: 2 },
  calNum: { fontSize: FONTS.xl, fontWeight: "800", color: COLORS.text },
  calLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "500" },
  calCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, alignItems: "center", justifyContent: "center" },
  calCircleNum: { fontSize: FONTS.xl, fontWeight: "800" },
  calCircleLabel: { fontSize: 9, fontWeight: "600" },
  calBar: { height: 5, backgroundColor: COLORS.border, borderRadius: 4, overflow: "hidden" },
  calBarFill: { height: 5, borderRadius: 4 },

  macros: { flexDirection: "row", gap: 12 },
  macroItem: { flex: 1, gap: 4 },
  macroLabel: { fontSize: FONTS.xs, fontWeight: "700", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 },
  macroVal: { fontSize: FONTS.md, fontWeight: "800" },
  macroBar: { height: 4, backgroundColor: COLORS.border, borderRadius: 3, overflow: "hidden" },
  macroFill: { height: 4, borderRadius: 3 },
  macroGoal: { fontSize: 9, color: COLORS.textMuted },

  phaseCard: { borderRadius: RADIUS.lg, borderWidth: 1.5, marginBottom: 24, flexDirection: "row", overflow: "hidden" },
  phaseBar: { width: 4 },
  phaseBody: { flex: 1, padding: 16, gap: 10 },
  phaseTitle: { fontSize: FONTS.md, fontWeight: "800" },
  phaseTips: { gap: 6 },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  tipDot: { width: 5, height: 5, borderRadius: 3 },
  tipText: { fontSize: FONTS.sm, color: COLORS.text, flex: 1, lineHeight: 18 },

  sectionTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.3, marginBottom: 12 },

  mealList: { gap: 10 },
  mealCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", overflow: "hidden" },
  mealCardDone: { opacity: 0.65 },
  mealStatus: { width: 4 },
  mealBody: { flex: 1, padding: 14, gap: 8 },
  mealTopRow: { flexDirection: "row", gap: 10 },
  mealLeft: { flex: 1, gap: 2 },
  mealRight: { alignItems: "flex-end" },
  mealTime: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 },
  mealName: { fontSize: FONTS.md, fontWeight: "700", color: COLORS.text },
  mealNameDone: { textDecorationLine: "line-through", color: COLORS.textMuted },
  mealDesc: { fontSize: FONTS.xs, color: COLORS.textMuted, lineHeight: 16 },
  mealCal: { fontSize: FONTS.xl, fontWeight: "800", color: COLORS.text },
  mealCalLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: "600" },
  mealMacros: { flexDirection: "row", alignItems: "center", gap: 6 },
  mealMacroText: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "600" },
  mealMacroDot: { fontSize: FONTS.xs, color: COLORS.border },
});