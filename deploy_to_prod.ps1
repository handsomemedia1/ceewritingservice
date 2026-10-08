Write-Host "Deploying First Research Project Cluster to Production..." -ForegroundColor Cyan

# Step 1: Stage the necessary files
Write-Host "`n1. Staging required files..." -ForegroundColor Yellow
git add seed_data.json
git add src/config/roadmaps.ts

# Optional: Stage the docs and Python scripts we used, if you want them backed up
git add docs/cee-writing-editorial-standards-part3.md
git add generate_articles.py
git add compile_beginner_seed.py
git add remediate.py

# Step 2: Commit
Write-Host "`n2. Committing changes..." -ForegroundColor Yellow
git commit -m "feat: add First Research Project roadmap and staged cluster content"

# Step 3: Push to GitHub (Triggers standard Vercel deploy if linked)
Write-Host "`n3. Pushing to GitHub (This usually triggers Vercel automatically)..." -ForegroundColor Yellow
git push origin main

# Step 4: Direct Vercel Push (Fails gracefully if not logged in, but guarantees a push if you bypass Git)
Write-Host "`n4. Triggering direct Vercel Production deployment..." -ForegroundColor Yellow
npx vercel --prod --yes

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "Deployment initiated! Once Vercel finishes building:" -ForegroundColor Green
Write-Host "1. Go to: https://ceewriting.com/dashboard/seed-articles" -ForegroundColor Green
Write-Host "2. Click 'Inject Full Cluster' to populate Supabase." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
