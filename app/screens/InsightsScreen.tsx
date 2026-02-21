import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS, RADIUS, SHADOW } from "../../constants/theme";

const INSIGHTS = [
  {
    category: "Acne",
    title: "Sleep & Acne Correlation",
    finding: "When you sleep under 6 hours, your acne severity increases by 40% within 48 hours.",
    confidence: 89,
    dataPoints: 64,
    color: COLORS.rose,
    light: COLORS.roseLight,
    border: COLORS.roseBorder,
    action: "Aim for 7–8 hours tonight",
  },
  {
    category: "Period",
    title: "Cycle Prediction",
    finding: "Your next period is predicted on March 8 ± 2 days, based on your last 6 cycles.",
    confidence: 93,
    dataPoints: 6,
    color: COLORS.lavender,
    light: COLORS.lavenderLight,
    border: COLORS.lavenderBorder,
    action: "Mark calendar",
  },
  {
    category: "Hair Fall",
    title: "Stress & Hair Fall",
    finding: "Hair fall increases by 35% in the 5 days following logged high-stress days.",
    confidence: 74,
    dataPoints: 42,
    color: COLORS.peach,
    light: COLORS.peachLight,
    border: COLORS.peachBorder,
    action: "Practice stress management",
  },
  {
    category: "Workout",
    title: "Peak Performance Phase",
    finding: "Your lifts are 22% heavier and reps 18% higher during Follicular & Ovulation phases.",
    confidence: 91,
    dataPoints: 80,
    color: COLORS.sage,
    light: COLORS.sageLight,
    border: COLORS.sageBorder,
    action: "Schedule PRs this week",
  },
  {
    category: "Acne",
    title: "Dairy & Breakout Pattern",
    finding: "Logged dairy consumption correlates with increased chin acne within 48–72 hours.",
    confidence: 67,
    dataPoints: 28,
    color: COLORS.peach,
    light: COLORS.peachLight,
    border: COLORS.peachBorder,
    action: "Try 2-week dairy elimination",
  },
  {
    category: "Nutrition",
    title: "Cheat Meal Trigger",
    finding: "83% of cheat meals occur on high-stress days, primarily between 8 PM – 11 PM.",
    confidence: 83,
    dataPoints: 36,
    color: COLORS.rose,
    light: COLORS.roseLight,
    border: COLORS.roseBorder,
    action: "Plan evening snacks",
  },
];

const CATEGORIES = ["All", "Acne", "Period", "Hair Fall", "Workout", "Nutrition"];

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.confBarTrack}>
      <View style={[styles.confBarFill, { width: `${value}%` as any, backgroundColor: color }]} />
    </View>
  );
}

function InsightCard({ insight }: { insight: typeof INSIGHTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.insightCard, { borderColor: insight.border }, SHADOW.sm]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.85}
    >
      <View style={[styles.insightBar, { backgroundColor: insight.color }]} />
      <View style={styles.insightBody}>
        <View style={styles.insightTopRow}>
          <View style={[styles.catBadge, { backgroundColor: insight.light, borderColor: insight.border }]}>
            <Text style={[styles.catBadgeText, { color: insight.color }]}>{insight.category}</Text>
          </View>
          <View style={styles.insightConfRow}>
            <Text style={[styles.confNum, { color: insight.color }]}>{insight.confidence}%</Text>
            <Text style={styles.confLabel}>confidence</Text>
          </View>
        </View>

        <Text style={styles.insightTitle}>{insight.title}</Text>
        <Text style={styles.insightFinding}>{insight.finding}</Text>

        <ConfidenceBar value={insight.confidence} color={insight.color} />

        <View style={styles.insightFooter}>
          <Text style={styles.dataPoints}>Based on {insight.dataPoints} data points</Text>
          <View style={[styles.actionBtn, { backgroundColor: insight.light, borderColor: insight.border }]}>
            <Text style={[styles.actionBtnText, { color: insight.color }]}>{insight.action}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function InsightsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? INSIGHTS
    : INSIGHTS.filter(i => i.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenLabel}>ML-POWERED</Text>
          <Text style={styles.screenTitle}>Insights</Text>
        </View>

        {/* Summary row */}
        <View style={styles.summaryRow}>
          {[
            { label: "Patterns found", val: "6",   color: COLORS.rose     },
            { label: "Data points",    val: "320",  color: COLORS.lavender },
            { label: "Days tracked",   val: "64",   color: COLORS.sage     },
            { label: "Avg confidence", val: "83%",  color: COLORS.peach    },
          ].map((s, i) => (
            <View key={i} style={[styles.summaryCard, SHADOW.sm]}>
              <View style={[styles.summaryAccent, { backgroundColor: s.color }]} />
              <Text style={[styles.summaryVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Insights */}
        <Text style={styles.sectionTitle}>{filtered.length} Pattern{filtered.length !== 1 ? "s" : ""} Found</Text>
        <View style={styles.insightList}>
          {filtered.map((insight, i) => (
            <InsightCard key={i} insight={insight} />
          ))}
        </View>

        {/* More data needed */}
        <View style={[styles.moreDataCard, SHADOW.sm]}>
          <Text style={styles.moreDataTitle}>More patterns unlocking soon</Text>
          <Text style={styles.moreDataSub}>
            Keep tracking daily for at least 30 days to unlock workout performance by phase, cheat meal emotional triggers, and acne photo severity detection.
          </Text>
          <View style={styles.moreDataProgress}>
            {[
              { label: "Workout vs Phase", days: 80, needed: 90 },
              { label: "Cheat Meal Emotions", days: 36, needed: 60 },
              { label: "Acne Photo AI", days: 12, needed: 30 },
            ].map((p, i) => (
              <View key={i} style={styles.moreDataRow}>
                <Text style={styles.moreDataLabel}>{p.label}</Text>
                <View style={styles.moreDataBarTrack}>
                  <View style={[styles.moreDataBarFill, { width: `${(p.days / p.needed) * 100}%` as any }]} />
                </View>
                <Text style={styles.moreDataCount}>{p.days}/{p.needed}d</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default InsightsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  header: { marginBottom: 20 },
  screenLabel: { fontSize: 10, fontWeight: "700", color: COLORS.textMuted, letterSpacing: 1 },
  screenTitle: { fontSize: FONTS.xxl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.8, marginTop: 2 },

  summaryRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  summaryCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: 12, gap: 3, overflow: "hidden" },
  summaryAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3, borderTopLeftRadius: RADIUS.md, borderTopRightRadius: RADIUS.md },
  summaryVal: { fontSize: FONTS.lg, fontWeight: "800", marginTop: 8 },
  summaryLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: "500", lineHeight: 13 },

  filterRow: { marginBottom: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.full, backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.border, marginRight: 8 },
  filterChipActive: { backgroundColor: COLORS.roseDark, borderColor: COLORS.roseDark },
  filterText: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.textMuted },
  filterTextActive: { color: COLORS.white },

  sectionTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.3, marginBottom: 12 },
  insightList: { gap: 12, marginBottom: 16 },

  insightCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, borderWidth: 1.5, flexDirection: "row", overflow: "hidden" },
  insightBar: { width: 4 },
  insightBody: { flex: 1, padding: 16, gap: 8 },
  insightTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  catBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: RADIUS.full, borderWidth: 1 },
  catBadgeText: { fontSize: FONTS.xs, fontWeight: "700" },
  insightConfRow: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  confNum: { fontSize: FONTS.lg, fontWeight: "800" },
  confLabel: { fontSize: FONTS.xs, color: COLORS.textMuted },
  insightTitle: { fontSize: FONTS.md, fontWeight: "800", color: COLORS.text },
  insightFinding: { fontSize: FONTS.sm, color: COLORS.text, lineHeight: 20 },
  confBarTrack: { height: 4, backgroundColor: COLORS.border, borderRadius: 3, overflow: "hidden" },
  confBarFill: { height: 4, borderRadius: 3 },
  insightFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dataPoints: { fontSize: FONTS.xs, color: COLORS.textMuted },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: RADIUS.full, borderWidth: 1 },
  actionBtnText: { fontSize: FONTS.xs, fontWeight: "700" },

  moreDataCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 18, borderWidth: 1, borderColor: COLORS.border, gap: 12 },
  moreDataTitle: { fontSize: FONTS.md, fontWeight: "800", color: COLORS.text },
  moreDataSub: { fontSize: FONTS.sm, color: COLORS.textMuted, lineHeight: 20 },
  moreDataProgress: { gap: 10 },
  moreDataRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  moreDataLabel: { fontSize: FONTS.xs, color: COLORS.text, fontWeight: "600", width: 120 },
  moreDataBarTrack: { flex: 1, height: 5, backgroundColor: COLORS.border, borderRadius: 3, overflow: "hidden" },
  moreDataBarFill: { height: 5, borderRadius: 3, backgroundColor: COLORS.rose },
  moreDataCount: { fontSize: FONTS.xs, color: COLORS.textMuted, width: 44, textAlign: "right" },
});