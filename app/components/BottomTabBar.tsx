import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";

export type TabName = "home" | "track" | "plan" | "insights" | "profile";

interface Tab {
  id: TabName;
  label: string;
  emoji: string;
  activeEmoji: string;
}

const TABS: Tab[] = [
  { id: "home",     label: "Home",     emoji: "🏠",  activeEmoji: "🏡"  },
  { id: "track",    label: "Track",    emoji: "📋",  activeEmoji: "📊"  },
  { id: "plan",     label: "Plan",     emoji: "🗓️",  activeEmoji: "✨"  },
  { id: "insights", label: "Insights", emoji: "🔍",  activeEmoji: "💡"  },
  { id: "profile",  label: "Me",       emoji: "👤",  activeEmoji: "👑"  },
];

interface Props {
  active: TabName;
  onPress: (tab: TabName) => void;
}

export default function BottomTabBar({ active, onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onPress(tab.id)}
              activeOpacity={0.7}
            >
              {/* Active indicator dot */}
              {isActive && (
                <View style={styles.activeDot} />
              )}

              {/* Icon background for active tab */}
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Text style={styles.emoji}>
                  {isActive ? tab.activeEmoji : tab.emoji}
                </Text>
              </View>

              {/* Label */}
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    paddingTop: 0,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.border,
    shadowColor: "#2D1A24",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 20,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 4,
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.rose,
  },
  iconWrap: {
    width: 40,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: COLORS.roseLight,
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontSize: FONTS.xs,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  labelActive: {
    color: COLORS.roseDark,
    fontWeight: "700",
  },
});