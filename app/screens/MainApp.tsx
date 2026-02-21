import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AIAssistant from "../../components/AIAssistant";
import BottomTabBar, { TabName } from "../../components/BottomTabBar";
import Dashboard from "./Dashboard";
import * as InsightsScreenModule from "./InsightsScreen";
import * as MealsScreenModule from "./MealsScreen";
import ProfileScreen from "./ProfileScreen";
import * as TrackScreenModule from "./TrackScreen";
import * as WorkoutsScreenModule from "./WorkoutsScreen";

// unwrap default-exported modules (Metro HMR may return namespace object)
const InsightsScreen = (InsightsScreenModule as any).default || InsightsScreenModule;
const MealsScreen = (MealsScreenModule as any).default || MealsScreenModule;
const TrackScreen = (TrackScreenModule as any).default || TrackScreenModule;
const WorkoutsScreen = (WorkoutsScreenModule as any).default || WorkoutsScreenModule;

export default function MainApp() {
  // debug: ensure all imports are valid React components
  console.log("MainApp imports", {
    Dashboard,
    WorkoutsScreen,
    MealsScreen,
    TrackScreen,
    InsightsScreen,
    AIAssistant,
    BottomTabBar,
  });
  const [tab, setTab] = useState<TabName>("home");
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return (
      <ProfileScreen onBack={() => setShowProfile(false)} />
    );
  }

  const renderScreen = () => {
    let element: React.ReactElement | null = null;
    switch (tab) {
      case "home":
        element = <Dashboard onProfilePress={() => setShowProfile(true)} />;
        break;
      case "workouts":
        element = <WorkoutsScreen />;
        break;
      case "meals":
        element = <MealsScreen />;
        break;
      case "track":
        element = <TrackScreen />;
        break;
      case "insights":
        element = <InsightsScreen />;
        break;
      default:
        // defensive fallback in case some unexpected value sneaks into state
        console.warn("MainApp: renderScreen received unknown tab", tab);
        element = (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'red'}}>Unknown tab: {String(tab)}</Text>
          </View>
        );
    }

    if (element && typeof element.type === "object") {
      console.error("MainApp: renderScreen returning invalid element type", element.type);
    }
    return element;
  };

  return (
    <View style={styles.root}>
      <View style={styles.screen}>
        {renderScreen()}
      </View>
      <AIAssistant />
      <BottomTabBar
        active={tab}
        onPress={(t) => {
          console.log("MainApp: switching tab ->", t);
          setTab(t);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  screen: { flex: 1, paddingBottom: 80 },
});