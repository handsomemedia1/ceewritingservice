-- ==============================================
-- PHASE 1: PRICING & ORDERING SCHEMA MIGRATION
-- ==============================================

-- Remove the implicit zero-default danger
ALTER TABLE public.services ALTER COLUMN price DROP DEFAULT;
ALTER TABLE public.services ALTER COLUMN price DROP NOT NULL;

-- Add canonical pricing model
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS pricing_type TEXT DEFAULT 'unconfigured' NOT NULL
    CHECK (pricing_type IN ('fixed', 'range', 'per_unit', 'starting_at', 'free', 'unconfigured')),
  ADD COLUMN IF NOT EXISTS max_price INTEGER NULL,
  ADD COLUMN IF NOT EXISTS pricing_unit TEXT NULL,
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'NGN' NOT NULL,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0 NOT NULL,
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Add index for efficient catalog sorting
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- Do NOT drop pricelabel or high_price yet.
