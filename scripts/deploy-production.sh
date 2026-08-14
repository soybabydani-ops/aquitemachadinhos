#!/bin/bash
# deploy-production.sh
# One-command production deploy for Aqui Tem Achadinhos (White Hat Global)

set -e

echo "=== AQUITEMACHADINHOS PRODUCTION DEPLOY ==="
echo "Date: $(date)"

# 1. Seed
echo "[1/8] Seeding 63 tenants..."
node scripts/seed-tenants.js

# 2. Global feeds
echo "[2/8] Running global sync (weather + jobs)..."
node scripts/global-sync.js

# 3. Sitemap
echo "[3/8] Generating dynamic sitemap..."
npm run generate-sitemap

# 4. International
echo "[4/8] Hydrating EN/ES international mirrors..."
node scripts/international-hydration.js

# 5. Instant Indexing
echo "[5/8] Sending instant indexing signals..."
node scripts/instant-index.js

# 6. Build
echo "[6/8] Production build..."
npm run build

# 7. Commit
echo "[7/8] Committing to main..."
git add -A
git commit -m "deploy: production white-hat global scale $(date +%Y%m%d-%H%M%S)" || true

# 8. Vercel
echo "[8/8] Deploying to Vercel Production..."
if [ -n "$VERCEL_AUTH_TOKEN" ]; then
  npx vercel --prod --token "$VERCEL_AUTH_TOKEN" --yes
else
  echo "Set VERCEL_AUTH_TOKEN and run again"
  npx vercel --prod --yes
fi

echo "=== DEPLOY COMPLETE ==="