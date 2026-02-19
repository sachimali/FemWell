# FemWell — Feature List

## 1. Onboarding (8 Steps)
- Basic metrics: age, height, weight, goal weight
- Health conditions: PCOS, thyroid, diabetes, endometriosis, anemia, etc.
- Body type & activity level
- Fitness goals (multi-select, ranked) & workout preference (gym / yoga / hybrid)
- Equipment access & daily time availability
- Dietary profile: diet type, allergies, cuisine preferences, cooking skill
- Period info: cycle length, regularity, last date, symptoms
- Mental health check-in: stress, mood, sleep, caffeine, lifestyle habits

---

## 2. Daily Trackers (Common for All Users)

| Tracker | Details |
|---|---|
| 💧 Water | Tap to log glasses, daily goal, reminders, streak |
| 🩸 Period | Calendar view, flow intensity, symptom log, phase display |
| 😴 Sleep | Hours, quality rating, weekly trend chart |
| 📸 Acne | Severity (1–5), face map, acne type, skincare routine, triggers, photos |
| 💇 Hair Fall | Strand count, scalp condition, triggers, photos |
| 🍕 Cheat Meals | No-shame log, emotional trigger, feeling after, calorie estimate |
| 🍽️ Food Log | Search DB, barcode scan, macros, meal timing |
| ⚖️ Weight | Weekly log, trend graph |

---

## 3. Personalized Plans (Unique Per User)

### Workout Plans
- Gym Girl: strength splits, HIIT, progressive overload
- Yoga Girl: Hatha / Vinyasa / Yin / Power flows, pose progressions
- Hybrid: mix of both
- Personalized by: body type, goals, fitness level, equipment, conditions
- Cycle-synced auto-adjustments:
  - Days 1–5 (Period): light yoga, 60% intensity
  - Days 6–14 (Follicular): heavy lifting, 100% intensity, PRs
  - Days 15–17 (Ovulation): peak performance
  - Days 18–28 (Luteal/PMS): moderate → stress relief, more yoga

### Meal Plans
- Calorie target based on BMR/TDEE + goal (deficit / surplus / maintain)
- Macro split adjusted for conditions (PCOS → low-carb, Diabetes → low-GI, etc.)
- Filtered by: diet type, allergies, cuisine, cooking skill
- Cycle-synced nutrition:
  - Days 1–5: iron-rich, anti-inflammatory
  - Days 6–14: lean protein, complex carbs
  - Days 15–17: fiber, antioxidants, hydration
  - Days 18–28: magnesium, B6, complex carbs, reduce salt/caffeine

---

## 4. ML-Powered Insights

| Feature | Approach | Priority |
|---|---|---|
| Period prediction | LSTM neural network | MVP |
| Acne trigger patterns | Correlation + lag analysis | MVP |
| Hair fall correlations | Correlation analysis | MVP |
| Workout performance by cycle phase | Time-series analysis | MVP |
| Cheat meal trigger classification | Classification model | Post-MVP |
| Workout preference learning | Reinforcement learning | Post-MVP |
| Acne photo severity detection | CNN (ResNet-50) | Post-MVP |

Sample outputs:
- "Acne spikes Days 20–25 — 93% confidence"
- "Dairy → breakout 2 days later — 81% confidence"
- "Sleep <6hrs → hair fall +35% — 89% confidence"
- "Best workouts: cycle Days 10–15 — 92% confidence"

---

## 5. AI Assistant (Claude API)
- Full user context: cycle, food, sleep, conditions
- Natural language Q&A: "Why am I bloated?" / "Best exercises for PCOS?"
- Cheat meal guidance, craving management
- Daily smart notifications based on cycle phase

---

## 6. Progress & Analytics
- Weekly report: workouts, nutrition, sleep, weight
- Monthly summary: measurements, strength gains, photo comparison
- Before/after photo timeline (private, encrypted)
- Export PDF report for doctor/dermatologist

---

## 7. Gamification
- Workout streaks & logging streaks
- Strength milestones (first pull-up, squat bodyweight, etc.)
- Yoga milestones (first headstand, 30-min flow, etc.)
- Weekly challenges (Plank Challenge, Water Warrior, Protein Power)

---

## 8. Monetization Tiers

| Feature | Free | Premium ($9.99/mo) |
|---|---|---|
| Basic trackers (water, period, sleep, acne, hair) | ✅ | ✅ |
| 1 workout plan + 1 meal plan | ✅ | ✅ |
| AI chat (10 messages/month) | ✅ | ✅ |
| Unlimited AI assistant | ❌ | ✅ |
| Advanced ML insights | ❌ | ✅ |
| Unlimited workout/meal plans | ❌ | ✅ |
| Cycle-synced auto-adjustments | ❌ | ✅ |
| Full data history | ❌ | ✅ |
| PDF export for doctors | ❌ | ✅ |
| Barcode & photo food scanner | ❌ | ✅ |

---

## 9. Tech Stack (Revised)
- **Mobile:** React Native (TypeScript)
- **Backend/DB:** Supabase (auth, PostgreSQL, storage, edge functions)
- **ML Service:** Python + FastAPI (hosted on Railway/Render)
- **Payments:** Razorpay
- **Notifications:** Firebase Cloud Messaging
- **AI:** Claude API (claude-sonnet-4-6)

---

## MVP Scope (First 8 Months)

| Phase | Duration | Deliverable |
|---|---|---|
| Foundation | Months 1–2 | Auth, onboarding, dashboard |
| Tracking | Months 3–4 | All daily loggers |
| Personalization | Months 5–6 | Workout + meal plan engine |
| ML & AI | Month 7 | Insights + chat assistant |
| Polish & Launch | Month 8 | Beta, fixes, App Store |