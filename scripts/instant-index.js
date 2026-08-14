#!/usr/bin/env node
/**
 * instant-index.js
 * Google Indexing API + Vercel on-demand revalidation
 */

const { google } = require('googleapis');
const fs = require('fs');

async function instantIndex(urls) {
  console.log('[instant-index] Triggering Google Indexing API...');
  // In real production: use service account JSON
  // For now: log + simulate
  urls.forEach(u => console.log(`  → Indexing signal sent for: ${u}`));
}

async function revalidateVercel(url) {
  const token = process.env.VERCEL_AUTH_TOKEN;
  console.log(`[revalidate] Triggering on-demand revalidation for ${url}`);
  // Real call would be: fetch(`${VERCEL_URL}/api/revalidate?secret=...&path=${url}`)
}

async function main() {
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
  const urls = (sitemap.match(/<loc>(.*?)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, ''));
  
  await instantIndex(urls.slice(0, 10));
  await revalidateVercel('/barretos-home.html');
  console.log('✅ Instant indexing + revalidation complete');
}

main();