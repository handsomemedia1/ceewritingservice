-- 1. Create Currencies Table
CREATE TABLE IF NOT EXISTS currencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,       -- e.g., 'NGN', 'USD', 'GBP'
  symbol TEXT NOT NULL,            -- e.g., '₦', '$', '£'
  exchange_rate NUMERIC NOT NULL,  -- Multiplier to convert base NGN to this currency
  country_codes TEXT[] DEFAULT '{}', -- e.g., ['US', 'CA', 'AU']
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for currencies
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;

-- Public can read currencies
CREATE POLICY "Public currencies are viewable by everyone." ON currencies FOR SELECT USING (true);

-- Admins full access to currencies
CREATE POLICY "Admins full access to currencies" ON currencies FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 2. Seed initial currencies
-- NGN is base, rate 1
-- USD rate is 1 / 2000 = 0.0005 as per user request
INSERT INTO currencies (code, symbol, exchange_rate, country_codes, is_default)
VALUES 
  ('NGN', '₦', 1.0, ARRAY['NG'], true),
  ('USD', '$', 0.0005, ARRAY['US', 'CA', 'AU', 'NZ', 'PH'], false),
  ('GBP', '£', 0.00038, ARRAY['GB'], false),
  ('EUR', '€', 0.00045, ARRAY['DE', 'FR', 'IT', 'ES', 'NL', 'IE'], false),
  ('GHS', 'GH₵', 0.0075, ARRAY['GH'], false),
  ('KES', 'KSh', 0.065, ARRAY['KE'], false),
  ('ZAR', 'R', 0.0095, ARRAY['ZA'], false)
ON CONFLICT (code) DO UPDATE 
  SET exchange_rate = EXCLUDED.exchange_rate, 
      country_codes = EXCLUDED.country_codes;
