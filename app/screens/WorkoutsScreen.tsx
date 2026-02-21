import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS, PHASE_CONFIG, RADIUS, SHADOW } from "../../constants/theme";

const PHASE = "Follicular" as keyof typeof PHASE_CONFIG;
const phase = PHASE_CONFIG[PHASE];

const WEEK = [
  { day: "Mon", name: "Lower Body",       type: "Strength", done: true,  today: false },
  { day: "Tue", name: "Upper Body",       type: "Strength", done: true,  today: false },
  { day: "Wed", name: "Recovery",         type: "Yoga",     done: false, today: false },
  { day: "Thu", name: "Full Body HIIT",   type: "HIIT",     done: false, today: true  },
  { day: "Fri", name: "Glutes Focus",     type: "Strength", done: false, today: false },
  { day: "Sat", name: "Vinyasa Flow",     type: "Yoga",     done: false, today: false },
  { day: "Sun", name: "Rest",             type: "Rest",     done: false, today: false },
];

const EXERCISES = [
  { name: "Barbell Hip Thrusts",    sets: 4, reps: "10",       weight: "40 kg",    muscle: "Glutes"     },
  { name: "Romanian Deadlifts",     sets: 4, reps: "8",        weight: "35 kg",    muscle: "Hamstrings" },
  { name: "Bulgarian Split Squats", sets: 3, reps: "10 each",  weight: "20 kg",    muscle: "Quads"      },
  { name: "Cable Glute Kickbacks",  sets: 3, reps: "12 each",  weight: "15 kg",    muscle: "Glutes"     },
  { name: "Leg Press",              sets: 3, reps: "15",       weight: "80 kg",    muscle: "Quads"      },
  { name: "Walking Lunges",         sets: 3, reps: "20 steps", weight: "Bodyweight",muscle: "Legs"      },
  { name: "Calf Raises",            sets: 4, reps: "20",       weight: "Bodyweight",muscle: "Calves"    },
];

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  Strength: { bg: COLORS.roseLight,    text: COLORS.rose     },
  HIIT:     { bg: COLORS.peachLight,   text: COLORS.peach    },
  Yoga:     { bg: COLORS.lavenderLight,text: COLORS.lavender },
  Rest:     { bg: COLORS.borderLight,  text: COLORS.textMuted},
};

function WorkoutsScreen() {
  const [mode, setMode] = useState<"gym" | "yoga">("gym");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenLabel}>CYCLE-SYNCED</Text>
            <Text style={styles.screenTitle}>Workout Plan</Text>
          </View>
          <View style={styles.modeToggle}>
            {(["gym", "yoga"] as const).map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
                onPress={() => setMode(m)}
              >
                <Text style={[styles.modeTxt, mode === m && styles.modeTxtActive]}>
                  {m === "gym" ? "Gym" : "Yoga"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Phase Banner ── */}
        <View style={[styles.phaseBanner, { backgroundColor: phase.light, borderColor: phase.border }]}>
          <View style={[styles.phaseBar, { backgroundColor: phase.color }]} />
          <View style={styles.phaseBody}>
            <View style={styles.phaseTopRow}>
              <View style={[styles.phasePill, { backgroundColor: phase.color }]}>
                <Text style={styles.phasePillText}>{PHASE} · Day 12</Text>
              </View>
              <Text style={[styles.phaseIntensity, { color: phase.color }]}>
                {phase.intensity} intensity
              </Text>
            </View>
            <Text style={[styles.phaseHeadline, { color: phase.color }]}>{phase.workoutFocus}</Text>
            <Text style={styles.phaseDetail}>
              Estrogen is rising — your strongest week. Increase weights, go for PRs, take on HIIT.
            </Text>
          </View>
        </View>

        {/* ── Weekly strip ── */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekRow}>
          {WEEK.map((d, i) => {
            const tc = TYPE_COLOR[d.type];
            return (
              <View
                key={i}
                style={[
                  styles.dayCard,
                  d.today && styles.dayCardToday,
                  d.done  && styles.dayCardDone,
                ]}
              >
                <Text style={[styles.dayName, d.today && styles.dayNameToday]}>{d.day}</Text>
                <View style={[styles.dayDot,
                  { backgroundColor: d.done ? COLORS.sage : d.today ? COLORS.roseDark : COLORS.border },
                ]} />
                <Text style={[styles.dayWorkout, d.today && styles.dayWorkoutToday]} numberOfLines={2}>
                  {d.name}
                </Text>
                <View style={[styles.dayType, { backgroundColor: tc.bg }]}>
                  <Text style={[styles.dayTypeText, { color: tc.text }]}>{d.type}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* ── Today's session ── */}
        <View style={styles.todayRow}>
          <View>
            <Text style={styles.sectionTitle}>Today's Session</Text>
            <Text style={styles.sessionSub}>Full Body HIIT · 50 min</Text>
          </View>
          <TouchableOpacity style={[styles.startBtn, SHADOW.rose]}>
            <Text style={styles.startBtnText}>Start Workout</Text>
          </TouchableOpacity>
        </View>

        {/* ── Exercise cards ── */}
        <View style={styles.exList}>
          {EXERCISES.map((ex, i) => (
            <View key={i} style={[styles.exCard, SHADOW.sm]}>
              <View style={[styles.exNum, { backgroundColor: COLORS.roseLight }]}>
                <Text style={styles.exNumText}>{String(i + 1).padStart(2, "0")}</Text>
              </View>
              <View style={styles.exMid}>
                <Text style={styles.exName}>{ex.name}</Text>
                <Text style={styles.exMuscle}>{ex.muscle}</Text>
              </View>
              <View style={styles.exStats}>
                <View style={styles.exStat}>
                  <Text style={styles.exStatVal}>{ex.sets}</Text>
                  <Text style={styles.exStatLbl}>sets</Text>
                </View>
                <View style={styles.exStatDivider} />
                <View style={styles.exStat}>
                  <Text style={styles.exStatVal}>{ex.reps}</Text>
                  <Text style={styles.exStatLbl}>reps</Text>
                </View>
                <View style={styles.exStatDivider} />
                <View style={styles.exStat}>
                  <Text style={[styles.exStatVal, { color: COLORS.rose, fontSize: FONTS.xs }]}>{ex.weight}</Text>
                  <Text style={styles.exStatLbl}>load</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── PR target card ── */}
        <View style={[styles.prCard, SHADOW.sm]}>
          <View style={styles.prCol}>
            <Text style={styles.prLabel}>LAST WEEK</Text>
            <Text style={styles.prValue}>35 kg × 10</Text>
            <Text style={styles.prExercise}>Hip Thrusts</Text>
          </View>
          <View style={styles.prArrow}>
            <View style={[styles.prArrowLine, { backgroundColor: COLORS.sage }]} />
            <Text style={[styles.prArrowText, { color: COLORS.sage }]}>+5 kg</Text>
          </View>
          <View style={styles.prCol}>
            <Text style={styles.prLabel}>THIS WEEK TARGET</Text>
            <Text style={[styles.prValue, { color: COLORS.sage }]}>40 kg × 10</Text>
            <View style={styles.prBadge}>
              <Text style={styles.prBadgeText}>PR attempt</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  screenLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  screenTitle: { fontSize: FONTS.xxl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.8, marginTop: 2 },

  modeToggle: { flexDirection: "row", backgroundColor: COLORS.roseLight, borderRadius: RADIUS.md, padding: 3, borderWidth: 1, borderColor: COLORS.roseBorder },
  modeBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 11 },
  modeBtnActive: { backgroundColor: COLORS.roseDark },
  modeTxt: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  modeTxtActive: { color: COLORS.white },

  phaseBanner: { borderRadius: RADIUS.lg, borderWidth: 1.5, marginBottom: 24, flexDirection: "row", overflow: "hidden" },
  phaseBar: { width: 4 },
  phaseBody: { flex: 1, padding: 16, gap: 6 },
  phaseTopRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  phasePill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: RADIUS.full },
  phasePillText: { color: COLORS.white, fontSize: FONTS.xs, fontWeight: "700" },
  phaseIntensity: { fontSize: FONTS.sm, fontWeight: "700" },
  phaseHeadline: { fontSize: FONTS.lg, fontWeight: "800" },
  phaseDetail: { fontSize: FONTS.sm, color: COLORS.textMuted, lineHeight: 20 },

  sectionTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.3, marginBottom: 4 },
  sessionSub: { fontSize: FONTS.xs, color: COLORS.textMuted, marginBottom: 12 },

  weekRow: { marginBottom: 24 },
  dayCard: {
    width: 90, marginRight: 10, padding: 12,
    backgroundColor: COLORS.white, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: "center", gap: 6,
  },
  dayCardToday: { borderColor: COLORS.roseDark, borderWidth: 2, backgroundColor: COLORS.roseLight },
  dayCardDone: { opacity: 0.45 },
  dayName: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.textMuted },
  dayNameToday: { color: COLORS.roseDark },
  dayDot: { width: 7, height: 7, borderRadius: 4 },
  dayWorkout: { fontSize: 11, fontWeight: "600", color: COLORS.text, textAlign: "center" },
  dayWorkoutToday: { color: COLORS.roseDark },
  dayType: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: RADIUS.full },
  dayTypeText: { fontSize: 9, fontWeight: "700" },

  todayRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 },
  startBtn: { backgroundColor: COLORS.roseDark, paddingHorizontal: 18, paddingVertical: 11, borderRadius: RADIUS.md },
  startBtnText: { color: COLORS.white, fontWeight: "700", fontSize: FONTS.sm },

  exList: { gap: 8, marginBottom: 16 },
  exCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.md,
    padding: 14, flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: COLORS.border, gap: 12,
  },
  exNum: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  exNumText: { fontSize: FONTS.sm, fontWeight: "800", color: COLORS.roseDark },
  exMid: { flex: 1 },
  exName: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.text },
  exMuscle: { fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 1 },
  exStats: { flexDirection: "row", alignItems: "center", gap: 8 },
  exStat: { alignItems: "center", minWidth: 34 },
  exStatVal: { fontSize: FONTS.sm, fontWeight: "800", color: COLORS.text },
  exStatLbl: { fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase" },
  exStatDivider: { width: 1, height: 22, backgroundColor: COLORS.border },

  prCard: {
    flexDirection: "row", backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg, padding: 18, marginBottom: 8,
    borderWidth: 1, borderColor: COLORS.border, alignItems: "center",
  },
  prCol: { flex: 1, gap: 4 },
  prLabel: { fontSize: 9, fontWeight: "700", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.8 },
  prValue: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text },
  prExercise: { fontSize: FONTS.xs, color: COLORS.textMuted },
  prArrow: { alignItems: "center", paddingHorizontal: 12, gap: 4 },
  prArrowLine: { width: 1, height: 20 },
  prArrowText: { fontSize: FONTS.sm, fontWeight: "800" },
  prBadge: { backgroundColor: COLORS.sageLight, borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start" },
  prBadgeText: { fontSize: 10, fontWeight: "700", color: COLORS.sage },
});