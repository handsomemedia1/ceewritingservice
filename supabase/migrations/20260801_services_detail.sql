-- Add rich content columns to the services table for detailed service pages

ALTER TABLE services
ADD COLUMN IF NOT EXISTS hero_title text,
ADD COLUMN IF NOT EXISTS hero_subtitle text,
ADD COLUMN IF NOT EXISTS featured_image text,
ADD COLUMN IF NOT EXISTS estimated_duration text,
ADD COLUMN IF NOT EXISTS starting_price text,
ADD COLUMN IF NOT EXISTS target_audience jsonb,
ADD COLUMN IF NOT EXISTS related_services jsonb,
ADD COLUMN IF NOT EXISTS overview_html text,
ADD COLUMN IF NOT EXISTS process_steps jsonb,
ADD COLUMN IF NOT EXISTS deliverables jsonb,
ADD COLUMN IF NOT EXISTS pricing_tiers jsonb,
ADD COLUMN IF NOT EXISTS faqs jsonb,
ADD COLUMN IF NOT EXISTS trust_indicators jsonb,
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text;

-- Example JSON Structures for documentation:
/*
target_audience: ["Undergraduate students", "Master's students", "Researchers"]
related_services: ["service-slug-1", "service-slug-2"]
process_steps: [
  { "step": 1, "title": "Discovery", "desc": "We analyze your requirements." }
]
deliverables: ["Plagiarism Report", "Formatted Document", "Turnitin Certificate"]
pricing_tiers: [
  { "name": "Standard", "price": "₦15,000", "features": ["Feature 1", "Feature 2"], "timeline": "3 Days" }
]
faqs: [
  { "question": "Is it confidential?", "answer": "Yes, 100% confidential." }
]
trust_indicators: [
  { "icon": "lock", "title": "Confidential", "desc": "Non-disclosure guaranteed." }
]
*/
