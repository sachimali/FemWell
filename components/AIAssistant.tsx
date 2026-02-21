import React, { useState } from "react";
import {
    KeyboardAvoidingView, Platform,
    Modal as RNModal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// On web the built-in Modal export from react-native can resolve to an object
// which breaks rendering. We guard against that by only using the platform
// modal on native platforms and falling back to a simple view container on web.

import { COLORS, FONTS, RADIUS, SHADOW } from "../constants/theme";

interface Message { role: "user" | "ai"; text: string; }

const QUICK_PROMPTS = [
  "Why am I bloated today?",
  "Best exercises for PCOS?",
  "What should I eat on my period?",
  "Should I skip my workout today?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: "ai",
    text: "Hi! I'm your FemWell assistant. Ask me anything about your health, cycle, workouts or nutrition.",
  }]);
  const [input, setInput] = useState("");

  const isWeb = Platform.OS === "web";
  // debug
  console.log("AIAssistant rendered; Platform.OS=", Platform.OS, "isWeb=", isWeb);


  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages(prev => [
      ...prev,
      { role: "user", text: q },
      { role: "ai", text: "Based on your cycle data and recent logs, here's what I recommend — this feature will connect to Claude API once your Supabase backend is set up." },
    ]);
    setInput("");
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)} activeOpacity={0.85}>
        <View style={styles.fabDot} />
        <Text style={styles.fabText}>Ask AI</Text>
      </TouchableOpacity>

      {/* Render a proper modal on native platforms, but on web we fall back to a
          simple overlay view since the RN web implementation can resolve to an
          object and crash the renderer. */}
      {console.log("AIAssistant debug open, isWeb", open, isWeb)}
      {isWeb ? (
        open && (
          <SafeAreaView style={[styles.modal, styles.webModal]}> // webModal ensures absolute positioning
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>FemWell AI</Text>
                <Text style={styles.sub}>Your personal wellness assistant</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setOpen(false)}>
                <Text style={styles.closeText}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <ScrollView style={styles.messages} contentContainerStyle={{ padding: 20, gap: 12 }}>
              {messages.map((m, i) => (
                <View key={i} style={[styles.bubble, m.role === "user" ? styles.bubbleUser : styles.bubbleAI]}>
                  {m.role === "ai" && <Text style={styles.sender}>FEMWELL AI</Text>}
                  <Text style={[styles.bubbleText, m.role === "user" && styles.bubbleTextUser]}>{m.text}</Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              style={styles.promptsRow} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}>
              {QUICK_PROMPTS.map((p, i) => (
                <TouchableOpacity key={i} style={styles.promptChip} onPress={() => send(p)}>
                  <Text style={styles.promptText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Ask anything about your health..."
                  placeholderTextColor={COLORS.textLight}
                  value={input}
                  onChangeText={setInput}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                  onPress={() => send(input)}
                  disabled={!input.trim()}
                >
                  <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        )
      ) : (
        <RNModal visible={open} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setOpen(false)}>
          <SafeAreaView style={styles.modal}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>FemWell AI</Text>
                <Text style={styles.sub}>Your personal wellness assistant</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setOpen(false)}>
                <Text style={styles.closeText}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <ScrollView style={styles.messages} contentContainerStyle={{ padding: 20, gap: 12 }}>
              {messages.map((m, i) => (
                <View key={i} style={[styles.bubble, m.role === "user" ? styles.bubbleUser : styles.bubbleAI]}>
                  {m.role === "ai" && <Text style={styles.sender}>FEMWELL AI</Text>}
                  <Text style={[styles.bubbleText, m.role === "user" && styles.bubbleTextUser]}>{m.text}</Text>
                </View>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              style={styles.promptsRow} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}>
              {QUICK_PROMPTS.map((p, i) => (
                <TouchableOpacity key={i} style={styles.promptChip} onPress={() => send(p)}>
                  <Text style={styles.promptText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Ask anything about your health..."
                  placeholderTextColor={COLORS.textLight}
                  value={input}
                  onChangeText={setInput}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                  onPress={() => send(input)}
                  disabled={!input.trim()}
                >
                  <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </RNModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 82,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.roseDark,
    borderRadius: RADIUS.full,
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...SHADOW.rose,
  },
  fabDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.roseLight },
  fabText: { color: COLORS.white, fontSize: FONTS.sm, fontWeight: "700", letterSpacing: 0.3 },
  modal: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 },
  title: { fontSize: FONTS.xl, fontWeight: "800", color: COLORS.text, letterSpacing: -0.5 },
  sub: { fontSize: FONTS.sm, color: COLORS.textMuted, marginTop: 2 },
  closeBtn: { backgroundColor: COLORS.roseLight, paddingHorizontal: 16, paddingVertical: 8, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.roseBorder },
  closeText: { fontSize: FONTS.sm, fontWeight: "700", color: COLORS.roseDark },
  divider: { height: 1, backgroundColor: COLORS.border },
  messages: { flex: 1 },
  bubble: { maxWidth: "82%", borderRadius: RADIUS.md, padding: 14, gap: 4 },
  bubbleAI: { alignSelf: "flex-start", backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  bubbleUser: { alignSelf: "flex-end", backgroundColor: COLORS.roseDark },
  sender: { fontSize: FONTS.xs, fontWeight: "700", color: COLORS.rose, textTransform: "uppercase", letterSpacing: 0.5 },
  bubbleText: { fontSize: FONTS.md, color: COLORS.text, lineHeight: 22 },
  bubbleTextUser: { color: COLORS.white },
  promptsRow: { maxHeight: 52, borderTopWidth: 1, borderTopColor: COLORS.border },
  promptChip: { backgroundColor: COLORS.roseLight, borderWidth: 1, borderColor: COLORS.roseBorder, borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 7 },
  promptText: { fontSize: FONTS.xs, color: COLORS.roseDark, fontWeight: "600" },
  inputRow: { flexDirection: "row", alignItems: "flex-end", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white },
  input: { flex: 1, minHeight: 44, maxHeight: 100, backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 10, fontSize: FONTS.md, color: COLORS.text },
  sendBtn: { height: 44, paddingHorizontal: 18, backgroundColor: COLORS.roseDark, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  sendBtnDisabled: { backgroundColor: COLORS.border },
  sendText: { color: COLORS.white, fontWeight: "700", fontSize: FONTS.sm },
  webModal: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: COLORS.background,
    zIndex: 1000,
  },
});