-- ============================================================
-- FemWell — Complete Supabase / PostgreSQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USER PROFILES
-- ============================================================
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  age             INT,
  height_cm       FLOAT,
  weight_kg       FLOAT,
  goal_weight_kg  FLOAT,
  diet_type       TEXT,    -- Vegetarian, Vegan, Eggetarian, etc.
  fitness_level   TEXT,    -- Beginner, Intermediate, Advanced
  workout_pref    TEXT,    -- Gym Girl, Yoga Girl, Hybrid, Home
  body_type       TEXT,    -- Ectomorph, Mesomorph, Endomorph
  activity_level  TEXT,    -- Sedentary, Lightly Active, etc.
  sleep_hours     TEXT,    -- <5hrs, 6-7hrs, etc.
  water_goal      INT DEFAULT 8,  -- glasses per day
  conditions      TEXT[],  -- ["PCOS", "Hypothyroid", etc.]
  allergies       TEXT[],
  cuisines        TEXT[],
  goals           TEXT[],  -- ["Fat loss", "Muscle gain", etc.]
  food_dislikes   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. CYCLE TRACKING
-- ============================================================
CREATE TABLE cycle_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  period_start    DATE NOT NULL,
  period_end      DATE,
  cycle_length    INT,   -- calculated when next period starts
  period_duration INT,   -- days
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE period_daily_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date        DATE NOT NULL,
  flow_intensity  TEXT,  -- Light, Moderate, Heavy, Spotting, None
  symptoms        TEXT[],
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 3. WATER TRACKER
-- ============================================================
CREATE TABLE water_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  glasses     INT NOT NULL DEFAULT 0,
  goal        INT NOT NULL DEFAULT 8,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 4. SLEEP TRACKER
-- ============================================================
CREATE TABLE sleep_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date      DATE NOT NULL,
  hours_slept   FLOAT,
  quality       TEXT,  -- Poor, Fair, Good, Great
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 5. ACNE TRACKER
-- ============================================================
CREATE TABLE acne_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date      DATE NOT NULL,
  severity      INT CHECK (severity BETWEEN 1 AND 10),
  locations     TEXT[],  -- Forehead, Chin, Cheeks, etc.
  photo_url     TEXT,    -- Supabase Storage URL
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 6. HAIR FALL TRACKER
-- ============================================================
CREATE TABLE hair_fall_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date      DATE NOT NULL,
  count         INT,       -- exact count if provided
  range_label   TEXT,      -- 0-25, 25-50, 50-100, 100+
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 7. WEIGHT TRACKER
-- ============================================================
CREATE TABLE weight_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  weight_kg   FLOAT NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- ============================================================
-- 8. FOOD / MEAL LOG
-- ============================================================
CREATE TABLE food_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date      DATE NOT NULL,
  meal_type     TEXT,  -- Breakfast, Lunch, Dinner, Snack
  food_name     TEXT NOT NULL,
  calories      INT,
  protein_g     FLOAT,
  carbs_g       FLOAT,
  fat_g         FLOAT,
  is_cheat_meal BOOLEAN DEFAULT FALSE,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. WORKOUT LOGS
-- ============================================================
CREATE TABLE workout_sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_date  DATE NOT NULL,
  workout_type  TEXT,   -- Strength, HIIT, Yoga, Cardio
  duration_min  INT,
  cycle_day     INT,
  cycle_phase   TEXT,
  energy_level  INT CHECK (energy_level BETWEEN 1 AND 10),
  notes         TEXT,
  completed     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE exercise_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id      UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_name   TEXT NOT NULL,
  muscle_group    TEXT,
  sets_completed  INT,
  reps            TEXT,   -- "10" or "10 each"
  weight_kg       FLOAT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. CHEAT MEAL TRACKER
-- ============================================================
CREATE TABLE cheat_meal_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date      DATE NOT NULL,
  log_time      TIME,
  food_name     TEXT,
  stress_level  INT CHECK (stress_level BETWEEN 1 AND 10),
  mood          TEXT,    -- Great, Okay, Stressed, Anxious, Sad
  trigger       TEXT,    -- Stress, Boredom, Social, Craving, Habit
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. ML INSIGHTS (generated and stored)
-- ============================================================
CREATE TABLE insights (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category        TEXT,   -- Acne, Period, Hair Fall, Workout, Nutrition
  title           TEXT NOT NULL,
  finding         TEXT NOT NULL,
  confidence_pct  INT,
  data_points     INT,
  action          TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  generated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. DAILY SUMMARY (denormalized for dashboard speed)
-- ============================================================
CREATE TABLE daily_summaries (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  summary_date    DATE NOT NULL,
  cycle_day       INT,
  cycle_phase     TEXT,
  water_glasses   INT DEFAULT 0,
  sleep_hours     FLOAT,
  acne_severity   INT,
  hair_fall_count INT,
  weight_kg       FLOAT,
  calories_eaten  INT,
  workout_done    BOOLEAN DEFAULT FALSE,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, summary_date)
);

-- ============================================================
-- INDEXES for query performance
-- ============================================================
CREATE INDEX idx_water_logs_user_date        ON water_logs(user_id, log_date DESC);
CREATE INDEX idx_sleep_logs_user_date        ON sleep_logs(user_id, log_date DESC);
CREATE INDEX idx_acne_logs_user_date         ON acne_logs(user_id, log_date DESC);
CREATE INDEX idx_hair_fall_logs_user_date    ON hair_fall_logs(user_id, log_date DESC);
CREATE INDEX idx_weight_logs_user_date       ON weight_logs(user_id, log_date DESC);
CREATE INDEX idx_food_logs_user_date         ON food_logs(user_id, log_date DESC);
CREATE INDEX idx_period_logs_user_date       ON period_daily_logs(user_id, log_date DESC);
CREATE INDEX idx_workout_sessions_user_date  ON workout_sessions(user_id, session_date DESC);
CREATE INDEX idx_exercise_logs_session       ON exercise_logs(session_id);
CREATE INDEX idx_cheat_meal_user_date        ON cheat_meal_logs(user_id, log_date DESC);
CREATE INDEX idx_insights_user              ON insights(user_id, generated_at DESC);
CREATE INDEX idx_daily_summaries_user_date   ON daily_summaries(user_id, summary_date DESC);

-- ============================================================
-- ROW LEVEL SECURITY — users can only access their own data
-- ============================================================
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycle_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE period_daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE acne_logs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE hair_fall_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE cheat_meal_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights          ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries   ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can manage own profile"
  ON profiles FOR ALL
  USING (auth.uid() = id);

-- All tracker tables — same pattern
CREATE POLICY "Users own their water logs"       ON water_logs        FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their sleep logs"       ON sleep_logs        FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their acne logs"        ON acne_logs         FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their hair fall logs"   ON hair_fall_logs    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their weight logs"      ON weight_logs       FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their food logs"        ON food_logs         FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their cycle logs"       ON cycle_logs        FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their period logs"      ON period_daily_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their workout sessions" ON workout_sessions   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their exercise logs"    ON exercise_logs      FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their cheat meal logs"  ON cheat_meal_logs   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their insights"         ON insights          FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their daily summaries"  ON daily_summaries   FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_water_logs_updated_at
  BEFORE UPDATE ON water_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();