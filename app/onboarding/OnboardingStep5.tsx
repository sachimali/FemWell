import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import OnboardingWrapper from "./OnboardingWrapper";
import { COLORS, FONTS, RADIUS, SHADOW, TOTAL_STEPS } from "../constants/theme";

const DIET_TYPES = [
  { id: "omni", label: "Everything", emoji: "🍽️", desc: "No restrictions" },
  { id: "veg", label: "Vegetarian", emoji: "🥗", desc: "No meat or fish" },
  { id: "vegan", label: "Vegan", emoji: "🌱", desc: "No animal products" },
  { id: "egg", label: "Eggetarian", emoji: "🥚", desc: "Veg + eggs" },
  { id: "pesc", label: "Pescatarian", emoji: "🐟", desc: "Fish but no meat" },
  { id: "keto", label: "Keto", emoji: "🥑", desc: "High fat, low carb" },
];

const ALLERGIES = [
  { id: "gluten", label: "Gluten", emoji: "🌾" },
  { id: "dairy", label: "Dairy", emoji: "🥛" },
  { id: "nuts", label: "Nuts", emoji: "🥜" },
  { id: "soy", label: "Soy", emoji: "🫘" },
  { id: "eggs", label: "Eggs", emoji: "🥚" },
  { id: "shellfish", label: "Shellfish", emoji: "🦐" },
  { id: "none_allergy", label: "None", emoji: "✅" },
];

const CUISINES = [
  { id: "north", label: "North Indian", emoji: "🍛" },
  { id: "south", label: "South Indian", emoji: "🥘" },
  { id: "continental", label: "Continental", emoji: "🍝" },
  { id: "asian", label: "Asian", emoji: "🍜" },
  { id: "mediterranean", label: "Mediterranean", emoji: "🫒" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
];

const COOKING_LEVELS = [
  { id: "beginner", label: "Beginner", desc: "Quick, simple recipes" },
  { id: "intermediate", label: "Intermediate", desc: "30-minute meals" },
  { id: "advanced", label: "Advanced", desc: "Love to cook!" },
];

export default function OnboardingStep5({ navigation }: any) {
  const [diet, setDiet] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [cookingLevel, setCookingLevel] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [focused, setFocused] = useState(false);

  const toggleAllergy = (id: string) => {
    if (id === "none_allergy") { setAllergies(["none_allergy"]); return; }
    setAllergies((prev) => {
      const without = prev.filter((a) => a !== "none_allergy");
      return without.includes(id) ? without.filter((a) => a !== id) : [...without, id];
    });
  };

  const toggleCuisine = (id: string) => {
    setCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const isValid = diet !== "";

  return (
    <OnboardingWrapper
      step={5}
      title={"Food &\nnutrition 🍽️"}
      subtitle="Your meals will be built around what you love and what works for your body."
      onNext={() => navigation?.navigate("OnboardingStep6")}
      onBack={() => navigation?.goBack()}
      nextDisabled={!isValid}
      accentColor={COLORS.peach}
      accentLight={COLORS.peachLight}
    >
      {/* Diet Type */}
      <Text style={styles.sectionLabel}>Dietary Preference</Text>
      <View style={styles.grid}>
        {DIET_TYPES.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.card, diet === d.id && styles.cardActive]}
            onPress={() => setDiet(d.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{d.emoji}</Text>
            <Text style={[styles.cardLabel, diet === d.id && styles.cardLabelActive]}>
              {d.label}
            </Text>
            <Text style={[styles.cardDesc, diet === d.id && styles.cardDescActive]}>
              {d.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Allergies */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Allergies / Intolerances</Text>
      <View style={styles.chipRow}>
        {ALLERGIES.map((a) => {
          const active = allergies.includes(a.id);
          return (
            <TouchableOpacity
              key={a.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggleAllergy(a.id)}
            >
              <Text style={styles.chipEmoji}>{a.emoji}</Text>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {a.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Cuisines */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Favourite Cuisines</Text>
      <View style={styles.chipRow}>
        {CUISINES.map((c) => {
          const active = cuisines.includes(c.id);
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggleCuisine(c.id)}
            >
              <Text style={styles.chipEmoji}>{c.emoji}</Text>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Cooking Level */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Cooking Skill</Text>
      <View style={styles.levelGroup}>
        {COOKING_LEVELS.map((l) => (
          <TouchableOpacity
            key={l.id}
            style={[styles.levelCard, cookingLevel === l.id && styles.levelCardActive]}
            onPress={() => setCookingLevel(l.id)}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.levelLabel, cookingLevel === l.id && styles.levelLabelActive]}>
                {l.label}
              </Text>
              <Text style={[styles.levelDesc, cookingLevel === l.id && styles.levelDescActive]}>
                {l.desc}
              </Text>
            </View>
            <View
              style={[
                styles.radio,
                cookingLevel === l.id && { borderColor: COLORS.peach, backgroundColor: COLORS.peach },
              ]}
            >
              {cookingLevel === l.id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dislikes */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Foods You Dislike{" "}
        <Text style={styles.optional}>(optional)</Text>
      </Text>
      <TextInput
        style={[styles.textArea, focused && styles.textAreaFocused]}
        placeholder={'e.g. "Don\'t like spinach, avoid fried food"'}
        placeholderTextColor={COLORS.textLight}
        value={dislikes}
        onChangeText={setDislikes}
        multiline
        numberOfLines={3}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: FONTS.sm,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  optional: {
    textTransform: "none",
    fontWeight: "400",
    color: COLORS.textMuted,
    fontSize: FONTS.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "47.5%",
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    borderRadius: RADIUS.md,
    padding: 14,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  cardActive: {
    backgroundColor: COLORS.peachLight,
    borderColor: COLORS.peach,
  },
  emoji: { fontSize: 22, marginBottom: 2 },
  cardLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardLabelActive: { color: COLORS.peach },
  cardDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
  },
  cardDescActive: { color: COLORS.peach },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  chipActive: {
    backgroundColor: COLORS.peach,
    borderColor: COLORS.peach,
  },
  chipEmoji: { fontSize: 13 },
  chipText: {
    fontSize: FONTS.sm,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  chipTextActive: { color: COLORS.white },

  levelGroup: { gap: 8 },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.roseBorder,
    backgroundColor: COLORS.white,
  },
  levelCardActive: {
    backgroundColor: COLORS.peachLight,
    borderColor: COLORS.peach,
  },
  levelLabel: {
    fontSize: FONTS.md,
    fontWeight: "700",
    color: COLORS.text,
  },
  levelLabelActive: { color: COLORS.peach },
  levelDesc: {
    fontSize: FONTS.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  levelDescActive: { color: COLORS.peach },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },

  textArea: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: FONTS.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    minHeight: 90,
    textAlignVertical: "top",
  },
  textAreaFocused: {
    borderColor: COLORS.peach,
    backgroundColor: COLORS.peachLight,
  },
});