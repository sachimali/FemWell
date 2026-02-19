import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const TOTAL_STEPS = 8;
const CURRENT_STEP = 1;

type UnitToggle = "cm" | "ft" | "kg" | "lbs";

export default function OnboardingStep1({ navigation }: any) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const [focused, setFocused] = useState<string | null>(null);

  const isValid = name.trim() && age.trim() && height.trim() && weight.trim();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brand}>femwell</Text>
            <View style={styles.stepRow}>
              <Text style={styles.stepText}>
                Step {CURRENT_STEP} of {TOTAL_STEPS}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` },
              ]}
            />
          </View>

          {/* Title */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Let's get to{"\n"}know you ✨</Text>
            <Text style={styles.subtitle}>
              Your plan is built around your body — not anyone else's.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, focused === "name" && styles.inputFocused]}
                placeholder="e.g. Priya"
                placeholderTextColor="#C9A8B8"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                autoCapitalize="words"
              />
            </View>

            {/* Age */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, focused === "age" && styles.inputFocused]}
                placeholder="e.g. 24"
                placeholderTextColor="#C9A8B8"
                value={age}
                onChangeText={(v) => setAge(v.replace(/[^0-9]/g, ""))}
                onFocus={() => setFocused("age")}
                onBlur={() => setFocused(null)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            {/* Height */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.toggle}>
                  {(["cm", "ft"] as const).map((u) => (
                    <TouchableOpacity
                      key={u}
                      style={[
                        styles.toggleBtn,
                        heightUnit === u && styles.toggleBtnActive,
                      ]}
                      onPress={() => setHeightUnit(u)}
                    >
                      <Text
                        style={[
                          styles.toggleText,
                          heightUnit === u && styles.toggleTextActive,
                        ]}
                      >
                        {u}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TextInput
                style={[styles.input, focused === "height" && styles.inputFocused]}
                placeholder={heightUnit === "cm" ? "e.g. 162" : "e.g. 5'4\""}
                placeholderTextColor="#C9A8B8"
                value={height}
                onChangeText={setHeight}
                onFocus={() => setFocused("height")}
                onBlur={() => setFocused(null)}
                keyboardType="decimal-pad"
              />
            </View>

            {/* Current Weight */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Current Weight</Text>
                <View style={styles.toggle}>
                  {(["kg", "lbs"] as const).map((u) => (
                    <TouchableOpacity
                      key={u}
                      style={[
                        styles.toggleBtn,
                        weightUnit === u && styles.toggleBtnActive,
                      ]}
                      onPress={() => setWeightUnit(u)}
                    >
                      <Text
                        style={[
                          styles.toggleText,
                          weightUnit === u && styles.toggleTextActive,
                        ]}
                      >
                        {u}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TextInput
                style={[styles.input, focused === "weight" && styles.inputFocused]}
                placeholder={weightUnit === "kg" ? "e.g. 65" : "e.g. 143"}
                placeholderTextColor="#C9A8B8"
                value={weight}
                onChangeText={(v) => setWeight(v.replace(/[^0-9.]/g, ""))}
                onFocus={() => setFocused("weight")}
                onBlur={() => setFocused(null)}
                keyboardType="decimal-pad"
              />
            </View>

            {/* Goal Weight */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Goal Weight</Text>
                <Text style={styles.optional}>optional</Text>
              </View>
              <TextInput
                style={[styles.input, focused === "goal" && styles.inputFocused]}
                placeholder={weightUnit === "kg" ? "e.g. 58" : "e.g. 128"}
                placeholderTextColor="#C9A8B8"
                value={goalWeight}
                onChangeText={(v) => setGoalWeight(v.replace(/[^0-9.]/g, ""))}
                onFocus={() => setFocused("goal")}
                onBlur={() => setFocused(null)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.btn, !isValid && styles.btnDisabled]}
            activeOpacity={0.85}
            disabled={!isValid}
            onPress={() => navigation?.navigate("OnboardingStep2")}
          >
            <Text style={styles.btnText}>Continue →</Text>
          </TouchableOpacity>

          <Text style={styles.privacy}>
            🔒 Your data stays private and is only used to personalise your plan.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ROSE = "#C4748A";
const ROSE_LIGHT = "#F9EEF1";
const ROSE_DARK = "#8B4E6B";
const TEXT = "#2D1A24";
const MUTED = "#9E7A8A";
const WHITE = "#FFFFFF";
const BORDER = "#EDD8E0";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 14,
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: ROSE_DARK,
    letterSpacing: -0.5,
  },
  stepRow: {},
  stepText: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
  },

  // Progress
  progressTrack: {
    height: 4,
    backgroundColor: ROSE_LIGHT,
    borderRadius: 4,
    marginBottom: 32,
  },
  progressFill: {
    height: 4,
    backgroundColor: ROSE,
    borderRadius: 4,
  },

  // Title
  titleBlock: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -1,
    lineHeight: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 22,
  },

  // Form
  form: {
    gap: 20,
    marginBottom: 36,
  },
  fieldGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  optional: {
    fontSize: 12,
    color: MUTED,
    fontStyle: "italic",
  },
  input: {
    height: 54,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: TEXT,
    backgroundColor: WHITE,
  },
  inputFocused: {
    borderColor: ROSE,
    backgroundColor: ROSE_LIGHT,
  },

  // Toggle (cm/ft, kg/lbs)
  toggle: {
    flexDirection: "row",
    backgroundColor: ROSE_LIGHT,
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: ROSE,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: MUTED,
  },
  toggleTextActive: {
    color: WHITE,
  },

  // Button
  btn: {
    backgroundColor: ROSE_DARK,
    borderRadius: 16,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ROSE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  btnDisabled: {
    backgroundColor: BORDER,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Privacy note
  privacy: {
    textAlign: "center",
    fontSize: 12,
    color: MUTED,
    lineHeight: 18,
  },
});