import os, glob, re

REPO = '/home/user/repo_aquitem'

MESH_HTML = """
<!-- INÍCIO DA MALHA DE RELEVÂNCIA INTERNA CIRCULAR — AQUITEM SEO ENGINE -->
<div class="aquitem-internal-link-mesh mt-12 pt-8 border-t border-slate-800 bg-slate-950/80 rounded-3xl p-6 md:p-8 my-8 text-xs text-slate-300">
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center gap-2 mb-6">
      <span class="text-lg">🌐</span>
      <h3 class="text-sm md:text-base font-bold text-white uppercase tracking-wider">Malha de Navegação &amp; Relevância Interna</h3>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <!-- Coluna 1: Turismo VIP & Locação de Veículos -->
      <div>
        <h4 class="font-bold text-sky-400 uppercase tracking-wider mb-2.5 text-[11px]">✈️ Turismo VIP &amp; Locação</h4>
        <ul class="space-y-1.5 text-slate-400">
          <li><a href="/pacotes-viagem" class="hover:text-white transition">Pacotes de Viagem &amp; Cruzeiros All-Inclusive</a></li>
          <li><a href="/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao" class="hover:text-white transition">Cruzeiros Marítimos &amp; Resorts VIP</a></li>
          <li><a href="/aluguel-carros" class="hover:text-white transition">Aluguel de Carros &amp; Frotas — Discover Cars</a></li>
          <li><a href="/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos" class="hover:text-white transition">Aluguel de Blindados em Guarulhos GRU</a></li>
          <li><a href="/luxo-vip" class="hover:text-white transition">Suítes Presidenciais &amp; Helipontos CJ</a></li>
          <li><a href="/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo" class="hover:text-white transition">Resorts 5★ &amp; Helipontos em SP</a></li>
          <li><a href="/barretos-2026/biometria-facial-festa-do-peao-barretos" class="hover:text-white transition">Guia Estratégico Festa do Peão 2026</a></li>
          <li><a href="/destinos/orlando-passagens-hoteis-baratos" class="hover:text-white transition">Passagens e Hotéis Baratos em Orlando</a></li>
        </ul>
      </div>

      <!-- Coluna 2: Educação, Cursos & Infoprodutos -->
      <div>
        <h4 class="font-bold text-indigo-400 uppercase tracking-wider mb-2.5 text-[11px]">🎓 Cursos &amp; Infoprodutos</h4>
        <ul class="space-y-1.5 text-slate-400">
          <li><a href="/cursos" class="hover:text-white transition">Portal de Cursos com Certificado — Udemy</a></li>
          <li><a href="/cursos/cupom-desconto-promocoes-relampago-udemy-hoje" class="hover:text-white transition">Cupons de Desconto Cursos Udemy Hoje</a></li>
          <li><a href="/cursos/cursos-inteligencia-artificial-chatgpt-prompts" class="hover:text-white transition">Cursos de Inteligência Artificial &amp; Prompts</a></li>
          <li><a href="/infoprodutos/clube-invest-v3" class="hover:text-white transition">Clube Invest v3 — Independência Financeira</a></li>
          <li><a href="/clube-invest/como-destravar-independencia-financeira" class="hover:text-white transition">Método Oficial de Renda Passiva Kiwify</a></li>
          <li><a href="/estudante/como-pagar-meia-entrada-festa-do-peao-barretos" class="hover:text-white transition">Carteirinha Estudantil Meia-Entrada FESN</a></li>
          <li><a href="/estudante/carteirinha-estudante-digital-emitida-na-hora" class="hover:text-white transition">DNE Digital Emitida na Hora Monetizze</a></li>
          <li><a href="/energy-system/how-to-lower-electricity-bills-at-home-legally" class="hover:text-white transition">Energy Revolution System Tesla ClickBank</a></li>
        </ul>
      </div>

      <!-- Coluna 3: E-commerce & Achadinhos Virais -->
      <div>
        <h4 class="font-bold text-amber-400 uppercase tracking-wider mb-2.5 text-[11px]">🛍️ Achadinhos &amp; E-commerce</h4>
        <ul class="space-y-1.5 text-slate-400">
          <li><a href="/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre" class="hover:text-white transition">Painel de Bugs de Preço &amp; Cupons Relâmpago</a></li>
          <li><a href="/luxo-vip/melhores-malas-bordo-alta-resistencia-samsonite-tumi-promocao" class="hover:text-white transition">Malas Samsonite &amp; TUMI em Promoção</a></li>
          <li><a href="/malas-e-viagem/kit-malas-viagem-rigidas-360-tsa-amazon-promocao" class="hover:text-white transition">Kit Malas Rígidas 360° Padrão ANAC</a></li>
          <li><a href="/looks/chapeu-pralana-barretos-promocao" class="hover:text-white transition">Moda &amp; Chapéus Pralana Barretos</a></li>
          <li><a href="/marcas" class="hover:text-white transition">Grandes Marcas &amp; Lojas Credenciadas</a></li>
          <li><a href="/achadinhos" class="hover:text-white transition">Ofertas Virais Shopee, Amazon e SHEIN</a></li>
          <li><a href="/vagas" class="hover:text-white transition">Balcão de Empregos &amp; Vagas Regionais</a></li>
          <li><a href="/classificados" class="hover:text-white transition">Classificados &amp; Negócios do Interior</a></li>
        </ul>
      </div>

      <!-- Coluna 4: Utilidade Pública & Alertas Locais -->
      <div>
        <h4 class="font-bold text-emerald-400 uppercase tracking-wider mb-2.5 text-[11px]">📍 Utilidade Pública &amp; Alertas</h4>
        <ul class="space-y-1.5 text-slate-400">
          <li><a href="/concursos/barretos-inscricoes-abertas" class="hover:text-white transition">Concursos Municipais &amp; Processos Seletivos</a></li>
          <li><a href="/alerta-clima/barretos-alerta-meteorologico" class="hover:text-white transition">Alertas Meteorológicos da Defesa Civil</a></li>
          <li><a href="/alerta-transito/rodovia-presidente-dutra-travada" class="hover:text-white transition">Radar de Trânsito em Rodovias de SP</a></li>
          <li><a href="/utilidade-publica/barretos/achados-e-perdidos" class="hover:text-white transition">Central de Achados e Perdidos Comunitária</a></li>
          <li><a href="/utilidade-publica/barretos/doacoes-e-desapegos" class="hover:text-white transition">Mural de Doações &amp; Desapegos Locais</a></li>
          <li><a href="/cidades" class="hover:text-white transition">Guia das 64 Cidades Atendidas</a></li>
          <li><a href="/sobre" class="hover:text-white transition">Sobre a Curadoria &amp; Governança E-E-A-T</a></li>
          <li><a href="/termos" class="hover:text-white underline">Termos de Uso &amp; Política de Privacidade</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
<!-- FIM DA MALHA DE RELEVÂNCIA INTERNA CIRCULAR -->
"""

html_files = glob.glob(os.path.join(REPO, '**', '*.html'), recursive=True)

injected_count = 0
for hf in html_files:
    rel_path = os.path.relpath(hf, REPO)
    if 'node_modules' in rel_path or '.vercel' in rel_path or rel_path == '404.html':
        continue
    
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Se ja tiver a malha, pula
    if 'aquitem-internal-link-mesh' in content:
        continue

    # Injetar logo antes da tag <footer ou antes de <div id="site-footer"> ou antes de </body>
    if '<footer' in content:
        new_content = content.replace('<footer', MESH_HTML + '\n  <footer', 1)
    elif '<div id="site-footer">' in content:
        new_content = content.replace('<div id="site-footer">', MESH_HTML + '\n<div id="site-footer">', 1)
    elif '</body>' in content:
        new_content = content.replace('</body>', MESH_HTML + '\n</body>', 1)
    else:
        continue

    with open(hf, 'w', encoding='utf-8') as f:
        f.write(new_content)
    injected_count += 1

print(f"✓ Malha de links internos circulares injetada em {injected_count} páginas HTML!")
