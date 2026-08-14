#!/usr/bin/env node
const fs=require('fs');
const path=require('path');
const assert=require('assert');
const ROOT=path.join(__dirname,'..');
const inventory=JSON.parse(fs.readFileSync(path.join(ROOT,'data/growth-route-inventory.json'),'utf8'));
const hydration=JSON.parse(fs.readFileSync(path.join(ROOT,'data/growth-page-hydration.json'),'utf8'));
const vercel=JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'));
const PARTNERS=['shopee','shein','mercado-livre','amazon','udemy'];

assert.equal(inventory.tenant_cities,64);
assert.equal(inventory.total_routes,449);
assert.equal(inventory.routes.length,449);
assert.equal(hydration.length,448);
assert.equal(new Set(inventory.routes.map(r=>r.canonical)).size,449,'canonical URLs must be unique');
assert.equal(new Set(hydration.map(r=>r.route)).size,448,'hydration routes must be unique');
assert.equal(new Set(hydration.map(r=>`${r.city_slug}:${r.topic}`)).size,448,'one row per city/topic');

const files=[];
(function walk(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);const s=fs.statSync(p);s.isDirectory()?walk(p):files.push(p);}})(path.join(ROOT,'guias'));
assert.equal(files.filter(f=>f.endsWith('.html')).length,449);
const forbidden=[/inscri[cç][oõ]es abertas/i,/desconto garantido/i,/alerta ativo/i,/viralizou nesta semana/i,/vaga garantida/i];
for(const file of files.filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  assert(html.includes('<link rel="canonical"'),`missing canonical: ${file}`);
  assert(html.includes('Conteúdo original AQUITEM')||file.endsWith('/guias/index.html'),`missing editorial marker: ${file}`);
  assert(!html.includes('affiliate-tracker'),`unsafe affiliate injector present: ${file}`);
  for(const rule of forbidden) assert(!rule.test(html),`unsupported urgency in ${file}: ${rule}`);
  for(const match of html.matchAll(/affiliate-redirect\.html\?partner=([^&"]+)/g)) assert(PARTNERS.includes(decodeURIComponent(match[1])),`unknown partner in ${file}`);
}
const redirectPage=fs.readFileSync(path.join(ROOT,'affiliate-redirect.html'),'utf8');
assert(redirectPage.includes('Não fazemos redirecionamento automático'));
assert(!/location\.(href|replace|assign)\s*=/.test(redirectPage),'affiliate exit must never auto-redirect');
for(const partner of PARTNERS) assert(redirectPage.includes(`${partner}:`)||redirectPage.includes(`'${partner}':`),`missing allowlist partner ${partner}`);
assert(!redirectPage.includes('urlParams.get(\'url\')'),'must not accept open redirect URL');
assert(vercel.cleanUrls===true);
assert(vercel.trailingSlash===false);
assert(vercel.redirects.some(r=>r.source==='/concursos/:cidade-inscricoes-abertas'&&r.permanent===true));
assert(vercel.redirects.some(r=>r.source==='/alerta-clima/:cidade-alerta-meteorologico'&&r.permanent===true));
const sitemap=fs.readFileSync(path.join(ROOT,'sitemap-growth.xml'),'utf8');
assert.equal((sitemap.match(/<url>/g)||[]).length,449);
assert(fs.readFileSync(path.join(ROOT,'robots.txt'),'utf8').includes('sitemap-growth.xml'));
console.log(JSON.stringify({ok:true,htmlFiles:449,hydrationRows:448,canonicalUrls:449,affiliatePartners:PARTNERS,affiliateExit:'allowlisted and user-confirmed',redirects:'legacy urgency routes canonicalized'},null,2));
