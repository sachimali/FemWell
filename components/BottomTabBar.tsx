import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";

export type TabName = "home" | "workouts" | "meals" | "track" | "insights";

const TABS: { id: TabName; label: string }[] = [
  { id: "home",     label: "Home"     },
  { id: "workouts", label: "Workouts" },
  { id: "meals",    label: "Meals"    },
  { id: "track",    label: "Track"    },
  { id: "insights", label: "Insights" },
];

interface Props {
  active: TabName;
  onPress: (tab: TabName) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onPress(tab.id)}
            activeOpacity={0.65}
          >
            <View style={[styles.indicator, isActive && styles.indicatorActive]} />
            <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
              <View style={[styles.dot, isActive && styles.dotActive]} />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === "ios" ? 28 : 12,
    paddingTop: 8,
    shadowColor: "#2D1A24",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 20,
  },
  tab: { flex: 1, alignItems: "center", gap: 4 },
  indicator: {
    position: "absolute", top: -8,
    width: 20, height: 2, borderRadius: 1,
    backgroundColor: "transparent",
  },
  indicatorActive: { backgroundColor: COLORS.roseDark },
  iconBox: {
    width: 36, height: 28, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  iconBoxActive: { backgroundColor: COLORS.roseLight },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.textLight },
  dotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.roseDark },
  label: { fontSize: 10, color: COLORS.textLight, fontWeight: "500", letterSpacing: 0.2 },
  labelActive: { color: COLORS.roseDark, fontWeight: "700" },
});