#!/usr/bin/env node
const { execSync } = require('child_process');

async function scheduler() {
  console.log('[SCHEDULER] Starting daily global hydration...');
  
  try {
    execSync('node scripts/seed-tenants.js', { stdio: 'inherit' });
    execSync('node scripts/trends-interceptor.js', { stdio: 'inherit' });
    execSync('npm run generate-sitemap', { stdio: 'inherit' });
    
    // Trigger Vercel revalidation
    console.log('[SCHEDULER] Triggering on-demand revalidation...');
  } catch (e) {
    console.error('Scheduler error:', e.message);
  }
  
  console.log('[SCHEDULER] Daily run complete');
}

scheduler();
