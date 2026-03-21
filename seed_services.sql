-- ==============================================
-- CEE WRITING SERVICE - SEED DATA
-- Run this in the Supabase SQL Editor (supabase.com > your project > SQL Editor)
-- This will populate the categories and services tables with the existing pricing.
-- ==============================================

-- 1. Insert Categories (UUIDs are auto-generated)
INSERT INTO categories (title, description) VALUES
  ('Career & Professional', 'Get hired. Look professional. Stand out.'),
  ('Academic Support', 'For students who need quality, not shortcuts.'),
  ('Business Writing', 'Impress clients, investors and partners.');

-- 2. Insert Services (using subqueries to get the category UUIDs)

-- Career & Professional
INSERT INTO services (category_id, name, desc_text, price, pricelabel, high_price, popular) VALUES
  ((SELECT id FROM categories WHERE title = 'Career & Professional'), 'CV / Resume Writing', 'ATS-friendly CV that makes recruiters call you first.', 15000, '₦15,000', '₦30,000', true),
  ((SELECT id FROM categories WHERE title = 'Career & Professional'), 'Cover Letter Writing', 'Compelling cover letter tailored to your target job.', 10000, '₦10,000', '₦20,000', false),
  ((SELECT id FROM categories WHERE title = 'Career & Professional'), 'LinkedIn Optimization', 'Rewrite your LinkedIn so recruiters find and contact you.', 25000, '₦25,000', '₦45,000', false);

-- Academic Support
INSERT INTO services (category_id, name, desc_text, price, pricelabel, high_price, popular) VALUES
  ((SELECT id FROM categories WHERE title = 'Academic Support'), 'Personal Statement', 'University admissions. We tell your story compellingly.', 25000, '₦25,000', '₦40,000', true),
  ((SELECT id FROM categories WHERE title = 'Academic Support'), 'Statement of Purpose', 'Masters & PhD applications that win admissions abroad.', 25000, '₦25,000', '₦50,000', true),
  ((SELECT id FROM categories WHERE title = 'Academic Support'), 'Scholarship Essay', 'Chevening, Commonwealth, DAAD and more. Essays that win.', 25000, '₦25,000', '₦50,000', false),
  ((SELECT id FROM categories WHERE title = 'Academic Support'), 'Paraphrasing & Rewriting', 'Reduce plagiarism while keeping your original meaning.', 5000, '₦5,000', '/ 1000 wds', false);

-- Business Writing
INSERT INTO services (category_id, name, desc_text, price, pricelabel, high_price, popular) VALUES
  ((SELECT id FROM categories WHERE title = 'Business Writing'), 'Business Proposal', 'Proposals for loans, tenders, grants or partnerships.', 25000, '₦25,000', '₦60,000', false),
  ((SELECT id FROM categories WHERE title = 'Business Writing'), 'Company Profile', 'A compelling profile that tells your brand story.', 30000, '₦30,000', '₦60,000', false),
  ((SELECT id FROM categories WHERE title = 'Business Writing'), 'Grant Proposal', 'NGOs, startups and researchers. Applications that get funded.', 30000, '₦30,000', '₦50,000', true);

-- Done! Your frontend, admin dashboard, and Telegram bot will now show these services.
