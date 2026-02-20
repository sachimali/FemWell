import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomTabBar, { TabName } from "../components/BottomTabBar";
import Dashboard from "./Dashboard";
import {
  TrackScreen,
  PlanScreen,
  InsightsScreen,
  ProfileScreen,
} from "./PlaceholderScreens";

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":     return <Dashboard />;
      case "track":    return <TrackScreen />;
      case "plan":     return <PlanScreen />;
      case "insights": return <InsightsScreen />;
      case "profile":  return <ProfileScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Active screen fills the space above the tab bar */}
      <View style={styles.screen}>
        {renderScreen()}
      </View>

      {/* Bottom nav sits on top */}
      <BottomTabBar active={activeTab} onPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    // Push content up so it doesn't hide behind tab bar
    paddingBottom: 80,
  },
});