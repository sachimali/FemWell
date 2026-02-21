import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS, RADIUS, SHADOW } from "../../constants/theme";

const USER = {
  name: "Priya Sharma",
  age: 26,
  height: "162 cm",
  weight: "68.5 kg",
  goal: "65 kg",
  conditions: ["PCOS", "Vitamin D Deficiency"],
  diet: "Vegetarian",
  fitnessLevel: "Intermediate",
  workoutPref: "Gym Girl",
  joinedDays: 64,
};

const STATS = [
  { label: "Days tracked",    value: "64"  },
  { label: "Workouts logged", value: "41"  },
  { label: "Streak",          value: "12d" },
  { label: "Insights found",  value: "6"   },
];

const SETTINGS = [
  { label: "Workout reminders",       sub: "Daily at 7:00 AM"   },
  { label: "Water reminders",         sub: "Every 2 hours"      },
  { label: "Period predictions",      sub: "3 days before"      },
  { label: "Weekly insights report",  sub: "Every Sunday"       },
  { label: "Motivational nudges",     sub: "Morning & evening"  },
];

export default function ProfileScreen({ onBack }: { onBack?: () => void }) {
  const [notifs, setNotifs] = useState([true, true, false, true, false]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}

        {/* Avatar + name */}
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{USER.name[0]}</Text>
          </View>
          <Text style={styles.profileName}>{USER.name}</Text>
          <Text style={styles.profileSub}>Member for {USER.joinedDays} days</Text>
          <View style={styles.conditionRow}>
            {USER.conditions.map((c, i) => (
              <View key={i} style={styles.conditionBadge}>
                <Text style={styles.conditionText}>{c}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, SHADOW.sm]}>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Body info */}
        <Text style={styles.sectionTitle}>Body Info</Text>
        <View style={[styles.infoCard, SHADOW.sm]}>
          {[
            { label: "Age",           val: `${USER.age} years`    },
            { label: "Height",        val: USER.height             },
            { label: "Current weight",val: USER.weight             },
            { label: "Goal weight",   val: USER.goal               },
            { label: "Diet",          val: USER.diet               },
            { label: "Fitness level", val: USER.fitnessLevel       },
            { label: "Workout style", val: USER.workoutPref        },
          ].map((row, i, arr) => (
            <View key={i} style={[styles.infoRow, i < arr.length - 1 && styles.infoRowBorder]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoVal}>{row.val}</Text>
            </View>
          ))}
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={[styles.infoCard, SHADOW.sm]}>
          {SETTINGS.map((s, i) => (
            <View key={i} style={[styles.notifRow, i < SETTINGS.length - 1 && styles.infoRowBorder]}>
              <View style={styles.notifLeft}>
                <Text style={styles.notifLabel}>{s.label}</Text>
                <Text style={styles.notifSub}>{s.sub}</Text>
              </View>
              <Switch
                value={notifs[i]}
                onValueChange={(v) => setNotifs(prev => prev.map((n, j) => j === i ? v : n))}
                trackColor={{ false: COLORS.border, true: COLORS.rose }}
                thumbColor={COLORS.white}
              />
            </View>
          ))}
        </View>

        {/* Gamification */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={[styles.gamCard, SHADOW.sm]}>
          <View style={styles.gamRow}>
            {[
              { label: "Early Bird",    sub: "7-day streak",     earned: true  },
              { label: "Hydrated",      sub: "8 glasses × 14d",  earned: true  },
              { label: "Cycle Sage",    sub: "30 days logged",   earned: false },
              { label: "Iron Will",     sub: "50 workouts",      earned: false },
            ].map((b, i) => (
              <View key={i} style={[styles.badge, !b.earned && styles.badgeLocked]}>
                <View style={[styles.badgeCircle, { backgroundColor: b.earned ? COLORS.roseLight : COLORS.background }]}>
                  <Text style={styles.badgeIcon}>{b.earned ? "★" : "○"}</Text>
                </View>
                <Text style={[styles.badgeLabel, !b.earned && { color: COLORS.textLight }]}>{b.label}</Text>
                <Text style={styles.badgeSub}>{b.sub}</Text>
              </View>
            ))}
          </View>
          <View style={styles.streakBar}>
            <Text style={styles.streakLabel}>Current streak</Text>
            <Text style={[styles.streakVal, { color: COLORS.rose }]}>12 days</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionList}>
          {["Edit profile", "Export my data", "Privacy settings", "Help & support"].map((a, i) => (
            <TouchableOpacity key={i} style={[styles.actionRow, SHADOW.sm]}>
              <Text style={styles.actionText}>{a}</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>

        <View style={{ height: 140 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 16 },

  backBtn: { marginBottom: 12 },
  backText: { fontSize: FONTS.md, color: COLORS.rose, fontWeight: "700" },

  profileTop: { alignItems: "center", marginBottom: 24, gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.rose, alignItems: "center", justifyContent: "center" },
  avatarText: { color: COLORS.white, fontSize: FONTS.xxxl, fontWeight: "800" },
  profileName: { fontSize: FONTS.xl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.5 },
  profileSub: { fontSize: FONTS.sm, color: COLORS.textMuted },
  conditionRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  conditionBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: RADIUS.full, backgroundColor: COLORS.roseLight, borderWidth: 1, borderColor: COLORS.roseBorder },
  conditionText: { fontSize: FONTS.xs, fontWeight: "700", color: COLORS.roseDark },

  statsRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: 12, alignItems: "center", gap: 3, borderWidth: 1, borderColor: COLORS.border },
  statVal: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text },
  statLabel: { fontSize: 9, color: COLORS.textMuted, textAlign: "center", lineHeight: 13 },

  sectionTitle: { fontSize: FONTS.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.3, marginBottom: 12 },

  infoCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border, overflow: "hidden" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  infoLabel: { fontSize: FONTS.sm, color: COLORS.textMuted, fontWeight: "500" },
  infoVal: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.text },

  notifRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  notifLeft: { flex: 1, gap: 2 },
  notifLabel: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.text },
  notifSub: { fontSize: FONTS.xs, color: COLORS.textMuted },

  gamCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 18, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border, gap: 16 },
  gamRow: { flexDirection: "row", justifyContent: "space-between" },
  badge: { alignItems: "center", gap: 5, flex: 1 },
  badgeLocked: { opacity: 0.45 },
  badgeCircle: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  badgeIcon: { fontSize: 22, color: COLORS.rose },
  badgeLabel: { fontSize: 10, fontWeight: "700", color: COLORS.text, textAlign: "center" },
  badgeSub: { fontSize: 9, color: COLORS.textMuted, textAlign: "center" },
  streakBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.roseLight, borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 10 },
  streakLabel: { fontSize: FONTS.sm, fontWeight: "600", color: COLORS.text },
  streakVal: { fontSize: FONTS.lg, fontWeight: "800" },

  actionList: { gap: 8, marginBottom: 16 },
  actionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.white, borderRadius: RADIUS.md, paddingHorizontal: 16, paddingVertical: 16, borderWidth: 1, borderColor: COLORS.border },
  actionText: { fontSize: FONTS.md, fontWeight: "600", color: COLORS.text },
  actionArrow: { fontSize: FONTS.xl, color: COLORS.textMuted },

  logoutBtn: { backgroundColor: COLORS.roseLight, borderRadius: RADIUS.md, paddingVertical: 14, alignItems: "center", borderWidth: 1.5, borderColor: COLORS.roseBorder },
  logoutText: { fontSize: FONTS.md, fontWeight: "700", color: COLORS.roseDark },
});