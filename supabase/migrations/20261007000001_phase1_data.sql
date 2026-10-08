-- ==============================================
-- PHASE 1: PRICING & SLUG DATA MIGRATION
-- ==============================================
-- This maps exactly from the deterministic legacy strings to the new structured columns.
-- No prices are invented.

UPDATE public.services SET price=10000, max_price=20000, pricing_type='range', slug='cover-letter-writing', display_order=0 WHERE id='fb6e82b8-2aae-4206-8d0c-3eda5d914793';
UPDATE public.services SET price=25000, max_price=45000, pricing_type='range', slug='linkedin-optimization', display_order=0 WHERE id='8c4bb8e4-1932-47d9-add8-7c259f8d78d1';
UPDATE public.services SET price=25000, max_price=50000, pricing_type='range', slug='statement-of-purpose', display_order=0 WHERE id='cb64af45-bcc8-4e2a-a595-c7dc1bc2bee6';
UPDATE public.services SET price=25000, max_price=50000, pricing_type='range', slug='scholarship-essay', display_order=0 WHERE id='72f72b24-6b53-49a5-9b07-53df2417c2c4';
UPDATE public.services SET price=5000, max_price=NULL, pricing_type='per_unit', pricing_unit='1000 words', slug='paraphrasing-rewriting', display_order=0 WHERE id='ed7ecefb-0b8c-40d7-8f6e-8c4803c4a5de';
UPDATE public.services SET price=25000, max_price=60000, pricing_type='range', slug='business-proposal', display_order=0 WHERE id='ff2b58f2-ab19-4603-aa90-162c00b2e2f9';
UPDATE public.services SET price=30000, max_price=60000, pricing_type='range', slug='company-profile', display_order=0 WHERE id='aa95f819-19ef-406e-9398-a6817712bcd5';
UPDATE public.services SET price=30000, max_price=50000, pricing_type='range', slug='grant-proposal', display_order=0 WHERE id='d89ec8c1-bc04-4736-8cc7-87e9c99d4e3d';
UPDATE public.services SET price=25000, max_price=50000, pricing_type='range', slug='personal-statement', display_order=0 WHERE id='af505c3b-2df9-4e9d-bb20-10adb759ba84';
UPDATE public.services SET price=15000, max_price=30000, pricing_type='range', slug='cv-resume-writing', display_order=0 WHERE id='a91924d2-ae73-45ec-9ac8-10ade0e8a430';
UPDATE public.services SET price=10000, max_price=20000, pricing_type='range', slug='recommendation-letter-writing', display_order=0 WHERE id='7aaf9dc6-41df-48d3-bf0a-ebe62d79902e';
UPDATE public.services SET price=5000, max_price=10000, pricing_type='range', slug='appeal-letter', display_order=0 WHERE id='3c5f3edd-64c1-4945-8c2c-bd34b16276be';
UPDATE public.services SET price=5000, max_price=10000, pricing_type='range', slug='professional-email', display_order=0 WHERE id='a1d59683-fe92-4a19-9519-6659a86c529a';
UPDATE public.services SET price=5000, max_price=10000, pricing_type='range', slug='formal-letter', display_order=0 WHERE id='67e2517c-1baf-4b99-a739-560a7f7a49d5';
UPDATE public.services SET price=10000, max_price=25000, pricing_type='range', slug='speech-writing', display_order=0 WHERE id='5e428f3e-f463-4f71-b741-ccea031b92b9';
UPDATE public.services SET price=3000, max_price=5000, pricing_type='range', slug='plagiarism-ai-detection', display_order=0 WHERE id='89fa958c-1c76-4bc2-9001-aa322689d866';
UPDATE public.services SET price=5000, max_price=NULL, pricing_type='per_unit', pricing_unit='1000 words', slug='ai-content-humanizing', display_order=0 WHERE id='d6e7cfea-b03f-4ba1-9171-511f78089643';
UPDATE public.services SET price=100000, max_price=150000, pricing_type='range', slug='bsc-project-writing-undergraduate', display_order=0 WHERE id='2d808db5-8b5a-4354-a0bc-4191840be699';
UPDATE public.services SET price=120000, max_price=200000, pricing_type='range', slug='msc-project-dissertation-writing-postgraduate', display_order=0 WHERE id='68fcf3b3-f362-42ff-aebf-046581bea808';
UPDATE public.services SET price=300000, max_price=500000, pricing_type='range', slug='phd-thesis-writing-doctoral', display_order=0 WHERE id='3136f9b3-1337-4193-bd73-f8ada28ca5d0';
UPDATE public.services SET price=25000, max_price=70000, pricing_type='range', slug='data-analysis', display_order=0 WHERE id='7ea9eba5-e68d-4404-bfee-64cfa750d1ce';
