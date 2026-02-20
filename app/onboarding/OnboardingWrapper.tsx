import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, RADIUS, SHADOW, TOTAL_STEPS } from "../constants/theme";

interface Props {
  step: number;
  title: string;
  subtitle: string;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  accentColor?: string;
  accentLight?: string;
  children: React.ReactNode;
}

export default function OnboardingWrapper({
  step,
  title,
  subtitle,
  onNext,
  onBack,
  nextLabel = "Continue →",
  nextDisabled = false,
  accentColor = COLORS.roseDark,
  accentLight = COLORS.roseLight,
  children,
}: Props) {
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
            <Text style={[styles.brand, { color: accentColor }]}>femwell</Text>
            <Text style={styles.stepText}>
              {step} of {TOTAL_STEPS}
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(step / TOTAL_STEPS) * 100}%`,
                  backgroundColor: accentColor,
                },
              ]}
            />
          </View>

          {/* Title */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {/* Content */}
          {children}

          {/* Buttons */}
          <View style={styles.btnRow}>
            {onBack && (
              <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Text style={[styles.backText, { color: accentColor }]}>← Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.nextBtn,
                { backgroundColor: accentColor },
                nextDisabled && styles.nextBtnDisabled,
                !onBack && { flex: 1 },
                SHADOW.rose,
              ]}
              onPress={onNext}
              disabled={nextDisabled}
              activeOpacity={0.85}
            >
              <Text style={styles.nextText}>{nextLabel}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.privacy}>
            🔒 Your data is private and only used to personalise your plan.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 14,
  },
  brand: {
    fontSize: FONTS.xl,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  stepText: {
    fontSize: FONTS.sm,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  progressTrack: {
    height: 4,
    backgroundColor: COLORS.roseLight,
    borderRadius: 4,
    marginBottom: 32,
  },
  progressFill: {
    height: 4,
    borderRadius: 4,
  },
  titleBlock: { marginBottom: 28 },
  title: {
    fontSize: FONTS.xxxl,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1,
    lineHeight: 42,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FONTS.md,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 36,
    marginBottom: 20,
  },
  backBtn: {
    height: 58,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: FONTS.md,
    fontWeight: "600",
  },
  nextBtn: {
    flex: 2,
    height: 58,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextText: {
    color: COLORS.white,
    fontSize: FONTS.lg,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  privacy: {
    textAlign: "center",
    fontSize: FONTS.xs,
    color: COLORS.textLight,
    lineHeight: 18,
  },
});