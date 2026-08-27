-- ML Playground progress persistence
-- Safe to run multiple times.

DO $$
BEGIN
  CREATE TYPE ml_playground_progress_status AS ENUM ('IN_PROGRESS', 'COMPLETED', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.ml_playground_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exercise_id INTEGER NOT NULL,
  status ml_playground_progress_status NOT NULL DEFAULT 'IN_PROGRESS',
  current_step INTEGER NOT NULL DEFAULT 0,
  score_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT ml_playground_progress_user_fk
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE,
  CONSTRAINT ml_playground_progress_step_non_negative CHECK (current_step >= 0),
  CONSTRAINT ml_playground_progress_unique_user_exercise UNIQUE (user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_ml_playground_progress_user_id
  ON public.ml_playground_progress (user_id);

CREATE INDEX IF NOT EXISTS idx_ml_playground_progress_exercise_id
  ON public.ml_playground_progress (exercise_id);

CREATE INDEX IF NOT EXISTS idx_ml_playground_progress_status
  ON public.ml_playground_progress (status);

CREATE INDEX IF NOT EXISTS idx_ml_playground_progress_completed_at
  ON public.ml_playground_progress (completed_at DESC);

-- Compatibility note:
-- Existing projects still using public.progress can continue operating.
-- The API layer attempts ml_playground_progress first and falls back to progress when needed.
