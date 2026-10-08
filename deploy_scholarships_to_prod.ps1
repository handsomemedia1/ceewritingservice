Write-Host "Deploying Scholarship & PhD 2027 Cluster to Production..." -ForegroundColor Cyan

# Step 1: Stage the necessary files
Write-Host "`n1. Staging required files..." -ForegroundColor Yellow
git add scholarships_seed_data.json
git add src/app/dashboard/seed-scholarships/page.tsx
git add public/images/blog/scholarships/

# Step 2: Commit
Write-Host "`n2. Committing changes..." -ForegroundColor Yellow
git commit -m "feat: Add Scholarship & PhD 2027 content cluster and seed route"

# Step 3: Push to GitHub (Triggers standard Vercel deploy if linked)
Write-Host "`n3. Pushing to GitHub (This usually triggers Vercel automatically)..." -ForegroundColor Yellow
git push origin main

# Step 4: Direct Vercel Push (Fails gracefully if not logged in, but guarantees a push if you bypass Git)
Write-Host "`n4. Triggering direct Vercel Production deployment..." -ForegroundColor Yellow
npx vercel --prod --yes

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "Deployment initiated! Once Vercel finishes building:" -ForegroundColor Green
Write-Host "1. Go to: https://ceewriting.com/dashboard/seed-scholarships" -ForegroundColor Green
Write-Host "2. Click 'Inject Scholarship Cluster (7 Articles)' to populate Supabase." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
