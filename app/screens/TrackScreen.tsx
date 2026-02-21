import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS, RADIUS, SHADOW } from "../../constants/theme";

// ─── Water Tracker ────────────────────────────────────────────
function WaterTracker() {
  const [glasses, setGlasses] = useState(4);
  const goal = 8;
  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Water Intake</Text>
          <Text style={styles.trackerSub}>{glasses} of {goal} glasses today</Text>
        </View>
        <View style={[styles.trackerBadge, { backgroundColor: "#E8F4FD", borderColor: "#B3D8F0" }]}>
          <Text style={[styles.trackerBadgeText, { color: "#3A8FC0" }]}>{Math.round((glasses / goal) * 100)}%</Text>
        </View>
      </View>
      <View style={styles.waterGlasses}>
        {Array.from({ length: goal }, (_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.glassBtn, i < glasses && styles.glassBtnFilled]}
            onPress={() => setGlasses(i + 1)}
          >
            <View style={[styles.glassDrop, i < glasses && styles.glassDropFilled]} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(glasses / goal) * 100}%` as any, backgroundColor: "#6BAED6" }]} />
      </View>
      <View style={styles.waterBtns}>
        <TouchableOpacity style={styles.waterMinus} onPress={() => setGlasses(g => Math.max(0, g - 1))}>
          <Text style={styles.waterMinusText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.waterPlus} onPress={() => setGlasses(g => Math.min(goal, g + 1))}>
          <Text style={styles.waterPlusText}>+ Add glass</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Period Tracker ───────────────────────────────────────────
function PeriodTracker() {
  const [flow, setFlow] = useState<string | null>("Moderate");
  const [symptoms, setSymptoms] = useState<string[]>(["Cramps", "Bloating"]);
  const FLOWS = ["Light", "Moderate", "Heavy", "Spotting"];
  const SYMPTOMS_LIST = ["Cramps", "Bloating", "Mood swings", "Fatigue", "Acne", "Headache", "Back pain", "Cravings"];

  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Period Log</Text>
          <Text style={styles.trackerSub}>Cycle Day 12 · Next in 16 days</Text>
        </View>
        <View style={[styles.trackerBadge, { backgroundColor: COLORS.roseLight, borderColor: COLORS.roseBorder }]}>
          <Text style={[styles.trackerBadgeText, { color: COLORS.rose }]}>Follicular</Text>
        </View>
      </View>

      <Text style={styles.fieldLabel}>FLOW INTENSITY</Text>
      <View style={styles.pillRow}>
        {FLOWS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.pill, flow === f && styles.pillActive]}
            onPress={() => setFlow(f)}
          >
            <Text style={[styles.pillText, flow === f && styles.pillTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.fieldLabel}>SYMPTOMS</Text>
      <View style={styles.chipRow}>
        {SYMPTOMS_LIST.map((s) => {
          const active = symptoms.includes(s);
          return (
            <TouchableOpacity
              key={s}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSymptoms(prev => active ? prev.filter(x => x !== s) : [...prev, s])}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Sleep Tracker ────────────────────────────────────────────
function SleepTracker() {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState<string | null>("Good");
  const QUALITIES = ["Poor", "Fair", "Good", "Great"];
  const qualityColor: Record<string, string> = { Poor: COLORS.rose, Fair: COLORS.peach, Good: COLORS.sage, Great: "#3A8FC0" };

  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Sleep Log</Text>
          <Text style={styles.trackerSub}>Last night's sleep</Text>
        </View>
        <View style={[styles.trackerBadge, { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavenderBorder }]}>
          <Text style={[styles.trackerBadgeText, { color: COLORS.lavender }]}>{hours}h</Text>
        </View>
      </View>

      <Text style={styles.fieldLabel}>HOURS SLEPT</Text>
      <View style={styles.sleepBtns}>
        {[4, 5, 6, 7, 8, 9].map((h) => (
          <TouchableOpacity
            key={h}
            style={[styles.sleepHourBtn, hours === h && styles.sleepHourBtnActive]}
            onPress={() => setHours(h)}
          >
            <Text style={[styles.sleepHourText, hours === h && styles.sleepHourTextActive]}>{h}h</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.fieldLabel}>SLEEP QUALITY</Text>
      <View style={styles.pillRow}>
        {QUALITIES.map((q) => (
          <TouchableOpacity
            key={q}
            style={[styles.pill, quality === q && { ...styles.pillActive, backgroundColor: qualityColor[q] + "20", borderColor: qualityColor[q] }]}
            onPress={() => setQuality(q)}
          >
            <Text style={[styles.pillText, quality === q && { color: qualityColor[q], fontWeight: "700" }]}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── Acne Tracker ─────────────────────────────────────────────
function AcneTracker() {
  const [severity, setSeverity] = useState(3);
  const [location, setLocation] = useState<string[]>(["Forehead"]);
  const LOCS = ["Forehead", "Chin", "Cheeks", "Jawline", "Nose", "Back"];

  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Acne Log</Text>
          <Text style={styles.trackerSub}>Tap severity · select location</Text>
        </View>
        <View style={[styles.trackerBadge, { backgroundColor: COLORS.peachLight, borderColor: COLORS.peachBorder }]}>
          <Text style={[styles.trackerBadgeText, { color: COLORS.peach }]}>{severity}/10</Text>
        </View>
      </View>

      <Text style={styles.fieldLabel}>SEVERITY (1–10)</Text>
      <View style={styles.severityRow}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <TouchableOpacity
            key={n}
            style={[
              styles.severityDot,
              n <= severity && { backgroundColor: n <= 3 ? COLORS.sage : n <= 6 ? COLORS.peach : COLORS.rose },
              n > severity && { backgroundColor: COLORS.border },
            ]}
            onPress={() => setSeverity(n)}
          />
        ))}
      </View>
      <Text style={styles.severityLabel}>
        {severity <= 3 ? "Mild — manageable" : severity <= 6 ? "Moderate — noticeable" : "Severe — needs attention"}
      </Text>

      <Text style={styles.fieldLabel}>LOCATION</Text>
      <View style={styles.chipRow}>
        {LOCS.map((l) => {
          const active = location.includes(l);
          return (
            <TouchableOpacity
              key={l}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setLocation(prev => active ? prev.filter(x => x !== l) : [...prev, l])}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{l}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.photoBtn}>
        <Text style={styles.photoBtnText}>+ Add photo for AI analysis</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Hair Fall Tracker ────────────────────────────────────────
function HairFallTracker() {
  const [count, setCount] = useState<string>("45");
  const RANGES = ["0–25", "25–50", "50–100", "100+"];
  const [range, setRange] = useState("25–50");

  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Hair Fall Log</Text>
          <Text style={styles.trackerSub}>Count strands or select range</Text>
        </View>
        <View style={[styles.trackerBadge, { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavenderBorder }]}>
          <Text style={[styles.trackerBadgeText, { color: COLORS.lavender }]}>Normal</Text>
        </View>
      </View>

      <Text style={styles.fieldLabel}>EXACT COUNT (optional)</Text>
      <TextInput
        style={styles.countInput}
        value={count}
        onChangeText={setCount}
        keyboardType="number-pad"
        placeholder="e.g. 45"
        placeholderTextColor={COLORS.textLight}
      />

      <Text style={styles.fieldLabel}>OR SELECT RANGE</Text>
      <View style={styles.pillRow}>
        {RANGES.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.pill, range === r && styles.pillActive]}
            onPress={() => setRange(r)}
          >
            <Text style={[styles.pillText, range === r && styles.pillTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.hairNote, { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavenderBorder }]}>
        <Text style={styles.hairNoteText}>
          Normal daily hair fall is 50–100 strands. Patterns tracked over time reveal correlations with cycle phase and nutrition.
        </Text>
      </View>
    </View>
  );
}

// ─── Weight Tracker ───────────────────────────────────────────
function WeightTracker() {
  const [weight, setWeight] = useState("68.5");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");

  return (
    <View style={[styles.trackerCard, SHADOW.sm]}>
      <View style={styles.trackerHeader}>
        <View>
          <Text style={styles.trackerTitle}>Weight Log</Text>
          <Text style={styles.trackerSub}>Best measured in the morning</Text>
        </View>
        <View style={styles.unitToggle}>
          {(["kg", "lbs"] as const).map((u) => (
            <TouchableOpacity
              key={u}
              style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
              onPress={() => setUnit(u)}
            >
              <Text style={[styles.unitText, unit === u && styles.unitTextActive]}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.weightRow}>
        <TouchableOpacity style={styles.weightStepBtn} onPress={() => setWeight(w => (parseFloat(w) - 0.1).toFixed(1))}>
          <Text style={styles.weightStepText}>−</Text>
        </TouchableOpacity>
        <View style={styles.weightDisplay}>
          <TextInput
            style={styles.weightInput}
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
          />
          <Text style={styles.weightUnit}>{unit}</Text>
        </View>
        <TouchableOpacity style={styles.weightStepBtn} onPress={() => setWeight(w => (parseFloat(w) + 0.1).toFixed(1))}>
          <Text style={styles.weightStepText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weightStats}>
        <View style={styles.weightStat}>
          <Text style={styles.weightStatLabel}>Last week</Text>
          <Text style={styles.weightStatVal}>68.0 kg</Text>
        </View>
        <View style={styles.weightStatDivider} />
        <View style={styles.weightStat}>
          <Text style={styles.weightStatLabel}>Change</Text>
          <Text style={[styles.weightStatVal, { color: COLORS.sage }]}>+0.5 kg</Text>
        </View>
        <View style={styles.weightStatDivider} />
        <View style={styles.weightStat}>
          <Text style={styles.weightStatLabel}>Goal</Text>
          <Text style={styles.weightStatVal}>65.0 kg</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────
function TrackScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenLabel}>DAILY</Text>
          <Text style={styles.screenTitle}>Trackers</Text>
        </View>

        <WaterTracker />
        <PeriodTracker />
        <SleepTracker />
        <AcneTracker />
        <HairFallTracker />
        <WeightTracker />

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default TrackScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  header: { marginBottom: 20 },
  screenLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  screenTitle: { fontSize: FONTS.xxl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.8, marginTop: 2 },

  trackerCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 18, marginBottom: 14,
    borderWidth: 1, borderColor: COLORS.border, gap: 12,
  },
  trackerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  trackerTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.3 },
  trackerSub: { fontSize: FONTS.xs, color: COLORS.textMuted, marginTop: 2 },
  trackerBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full, borderWidth: 1 },
  trackerBadgeText: { fontSize: FONTS.sm, fontWeight: "700" },

  fieldLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.8 },

  progressTrack: { height: 5, backgroundColor: COLORS.border, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: 5, borderRadius: 4 },

  waterGlasses: { flexDirection: "row", gap: 6 },
  glassBtn: { flex: 1, height: 32, borderRadius: 8, backgroundColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  glassBtnFilled: { backgroundColor: "#D4EBF8" },
  glassDrop: { width: 8, height: 10, borderRadius: 4, backgroundColor: COLORS.textLight },
  glassDropFilled: { backgroundColor: "#6BAED6" },
  waterBtns: { flexDirection: "row", gap: 10 },
  waterMinus: { width: 44, height: 38, borderRadius: RADIUS.md, backgroundColor: COLORS.roseLight, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.roseBorder },
  waterMinusText: { fontSize: FONTS.xl, color: COLORS.rose, fontWeight: "700", lineHeight: 28 },
  waterPlus: { flex: 1, height: 38, borderRadius: RADIUS.md, backgroundColor: COLORS.roseDark, alignItems: "center", justifyContent: "center" },
  waterPlusText: { color: COLORS.white, fontWeight: "700", fontSize: FONTS.sm },

  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border },
  pillActive: { backgroundColor: COLORS.roseLight, borderColor: COLORS.rose },
  pillText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  pillTextActive: { color: COLORS.roseDark, fontWeight: "700" },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.roseLight, borderColor: COLORS.rose },
  chipText: { fontSize: FONTS.xs, fontWeight: "600", color: COLORS.textMuted },
  chipTextActive: { color: COLORS.roseDark },

  sleepBtns: { flexDirection: "row", gap: 8 },
  sleepHourBtn: { flex: 1, height: 38, borderRadius: RADIUS.md, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  sleepHourBtnActive: { backgroundColor: COLORS.lavenderLight, borderColor: COLORS.lavender },
  sleepHourText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  sleepHourTextActive: { color: COLORS.lavender, fontWeight: "700" },

  severityRow: { flexDirection: "row", gap: 6 },
  severityDot: { flex: 1, height: 22, borderRadius: 6 },
  severityLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "500" },

  photoBtn: { backgroundColor: COLORS.peachLight, borderRadius: RADIUS.md, borderWidth: 1.5, borderColor: COLORS.peachBorder, paddingVertical: 12, alignItems: "center" },
  photoBtnText: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.peach },

  countInput: { backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 11, fontSize: FONTS.lg, fontWeight: "700", color: COLORS.text },

  hairNote: { borderRadius: RADIUS.md, borderWidth: 1, padding: 12 },
  hairNoteText: { fontSize: FONTS.xs, color: COLORS.textMuted, lineHeight: 18 },

  unitToggle: { flexDirection: "row", backgroundColor: COLORS.roseLight, borderRadius: RADIUS.md, padding: 3, borderWidth: 1, borderColor: COLORS.roseBorder },
  unitBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  unitBtnActive: { backgroundColor: COLORS.roseDark },
  unitText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  unitTextActive: { color: COLORS.white },

  weightRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  weightStepBtn: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: COLORS.roseLight, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: COLORS.roseBorder },
  weightStepText: { fontSize: FONTS.xl, color: COLORS.roseDark, fontWeight: "700" },
  weightDisplay: { flex: 1, flexDirection: "row", alignItems: "baseline", justifyContent: "center", gap: 4 },
  weightInput: { fontSize: 40, fontWeight: "800", color: COLORS.text, textAlign: "center" },
  weightUnit: { fontSize: FONTS.lg, fontWeight: "600", color: COLORS.textMuted },
  weightStats: { flexDirection: "row", backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: 14 },
  weightStat: { flex: 1, alignItems: "center", gap: 2 },
  weightStatLabel: { fontSize: FONTS.xs, color: COLORS.textMuted, fontWeight: "500" },
  weightStatVal: { fontSize: FONTS.md, fontWeight: "800", color: COLORS.text },
  weightStatDivider: { width: 1, backgroundColor: COLORS.border },
});