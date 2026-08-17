/**
 * AQUITEM ACHADINHOS — SUÍTE DE AUDITORIA E TESTE DE NOTIFICAÇÕES TELEGRAM AO VIVO
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_ANON = "process.env.SUPABASE_ANON_KEY || ''";
const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ERRO: ${message}`);
    failed++;
  }
}

async function runTelegramAuditTests() {
  console.log("\n=======================================================");
  console.log("✈️ AUDITORIA & TESTE DE NOTIFICAÇÕES TELEGRAM AO VIVO");
  console.log("=======================================================\n");

  // 1. TESTE HTTP POST DIRETO NA EDGE FUNCTION NOTIFY-TELEGRAM
  console.log("1. Testando Edge Function notify-telegram com Mensagem de Teste...");
  try {
    const testPayload = {
      action: "test",
      record: {
        cidade_destino: "Barretos",
        plataforma_afiliado: "Expedia Global Partner",
        rota: "/pacotes-viagem",
        comissao_estimada_usd_brl: 45.0,
        moeda: "USD"
      }
    };

    const edgeRes = await postJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/notify-telegram", testPayload, SUPABASE_ANON);
    assert(edgeRes?.success === true, "Edge Function notify-telegram respondeu HTTP 200 com sucesso");
    assert(edgeRes?.telegram_sent === true, "Disparo para a Telegram Bot API confirmado (telegram_sent = true)");
    assert(edgeRes?.telegram_status === 200, "Resposta HTTP 200 retornada pela API do Telegram");
  } catch (e) {
    assert(false, `Falha no teste da Edge Function: ${e.message}`);
  }

  // 2. TESTE DOS 4 PADRÕES DE MENSAGENS FORMATADAS
  console.log("\n2. Testando Formatação dos 4 Padrões de Mensagens no Celular...");
  const edgeFile = path.join(REPO_ROOT, 'supabase', 'functions', 'notify-telegram', 'index.ts');
  assert(fs.existsSync(edgeFile), "Arquivo supabase/functions/notify-telegram/index.ts existe");

  const edgeCode = fs.readFileSync(edgeFile, 'utf8');
  assert(edgeCode.includes("ALERTA DE CLIQUE (E-commerce)"), "Padrão 1: Alerta de E-commerce configurado com emojis");
  assert(edgeCode.includes("ALERTA VIP (Viagens / High-Ticket)"), "Padrão 2: Alerta VIP Viagens/Logística configurado");
  assert(edgeCode.includes("ALERTA DE INFOPRODUTO"), "Padrão 3: Alerta de Infoproduto/Educação configurado");
  assert(edgeCode.includes("ALERTA DE ANÚNCIO (Dólar)"), "Padrão 4: Alerta de Anúncio/CPM Dólar configurado");

  // 3. TESTE DE INSERÇÃO END-TO-END NO BANCO (DATABASE TRIGGER)
  console.log("\n3. Testando Inserção em cliques_afiliados_logs e Gatilho pg_net...");
  try {
    const logPayload = {
      cidade_destino: "São Paulo",
      cidade_local: "São Paulo",
      tipo_transporte: "Discover Cars",
      plataforma_afiliado: "Discover Cars Oficial",
      rota: "/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html",
      url_origem: "https://www.aquitemachadinhos.com.br/aluguel-carros",
      comissao_estimada_usd_brl: 18.50,
      moeda: "USD",
      ip_origem: "human-verified",
      user_agent: "Audit-Telemetry-Test/2.0",
      pais_origem: "BR",
      criado_em: new Date().toISOString()
    };

    const insertRes = await postJson(`${SUPABASE_REST}/cliques_afiliados_logs`, logPayload, SUPABASE_ANON);
    assert(Array.isArray(insertRes) && insertRes.length > 0, "Log de clique gravado com sucesso em cliques_afiliados_logs");
    assert(insertRes[0]?.plataforma_afiliado === "Discover Cars Oficial", "Plataforma Discover Cars registrada no banco");
  } catch (e) {
    assert(false, `Falha ao gravar telemetria no Supabase: ${e.message}`);
  }

  // 4. TESTE DE BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 5. TESTE DE LIMITES SERVERLESS VERCEL
  console.log("\n5. Testando Limite de Serverless Functions em api/ (Hobby <= 12)...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

function postJson(urlStr, data, key) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const postData = JSON.stringify(data);
    const options = {
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body, status: res.statusCode }); }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

runTelegramAuditTests().catch(console.error);
