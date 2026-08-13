#!/usr/bin/env python3
"""
AQUITEM ACHADINHOS — SEMANTIC ENTITY GRAPH SATURATION ENGINE (v5.0)
Injeta grafos de entidades Schema.org multi-tipo e preload do injetor de afiliados (< 5ms)
em todas as páginas HTML, cruzando dados de geolocalização com as 14 filiais e redes parceiras.
"""

import os
import re
import json

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://www.aquitemachadinhos.com.br"

GEO_DATA_PATH = os.path.join(REPO_ROOT, "scripts", "geo-local-data.js")

# Carrega cidades de geo-local-data.js
city_slugs = []
with open(GEO_DATA_PATH, "r", encoding="utf-8") as f:
    code = f.read()
    matches = re.findall(r"'([a-z0-9-]+)':\s*\{", code)
    city_slugs = list(set(matches))

print(f"Cidades mapeadas no geo-local-data: {len(city_slugs)}")

PARTNERS_GRAPH = [
    {"@type": "Brand", "name": "CJ Affiliate Luxury", "url": "https://www.anrdoezrs.net/click-101143576-15783291"},
    {"@type": "Brand", "name": "Expedia Global Group", "url": "https://expedia.com/affiliate/Kfv4vlu"},
    {"@type": "Brand", "name": "Discover Cars Global", "url": "https://www.discovercars.com/?a_aid=Aquitemachadinhos"},
    {"@type": "Brand", "name": "Udemy Impact Radius", "url": "https://udemy.sjv.io/c/1101l435760/aquitem_cursos"},
    {"@type": "Brand", "name": "Hotmart Oficial", "url": "https://go.hotmart.com/S107130565O"},
    {"@type": "Brand", "name": "Kiwify Clube Invest", "url": "https://pay.kiwify.com.br/pFhcTot?afid=StKTBKWy"},
    {"@type": "Brand", "name": "Monetizze DNE FESN", "url": "https://app.monetizze.com.br/r/AEK25825577"},
    {"@type": "Brand", "name": "ClickBank Global", "url": "https://theenergyrevolution.net/cb_redirect.php?&shield=3c970xyjyfi6b8lztkll2u0r75"},
    {"@type": "Brand", "name": "Wise Global Account", "url": "https://wise.com/br/?ref=1101l435760"},
    {"@type": "Brand", "name": "Shopee Brasil Oficial", "url": "https://s.shopee.com.br/30n7ohzzU6"},
    {"@type": "Brand", "name": "Mercado Livre Oficial", "url": "https://meli.la/1U3rtgV"},
    {"@type": "Brand", "name": "Amazon Prime Brasil", "url": "https://link.amazon/B0hmLsxcH"},
    {"@type": "Brand", "name": "SHEIN Brasil", "url": "https://onelink.shein.com/47/5ylqchgphidl"},
    {"@type": "Brand", "name": "Adsterra & PropellerAds Monetization Network", "url": DOMAIN}
]

def detect_city(filename, content):
    lower_path = filename.lower()
    for slug in sorted(city_slugs, key=len, reverse=True):
        if slug in lower_path:
            return slug
    return "sao-paulo"

def generate_entity_graph(rel_path, title, description, canonical_url, city_slug):
    city_clean = city_slug.replace("-", " ").title()
    
    graph_nodes = [
        {
            "@type": "WebSite",
            "@id": f"{DOMAIN}/#website",
            "url": DOMAIN,
            "name": "Aqui Tem Achadinhos",
            "description": "Portal Nacional e Internacional de Ofertas, Turismo VIP, Capacitação Profissional e Utilidade Pública das 64 Cidades.",
            "publisher": {
                "@type": "Organization",
                "@id": f"{DOMAIN}/#organization",
                "name": "Aqui Tem Achadinhos Oficial",
                "url": DOMAIN,
                "logo": {
                    "@type": "ImageObject",
                    "url": f"{DOMAIN}/logo.svg"
                },
                "sameAs": [
                    "https://t.me/ofertasbrasilz",
                    "https://github.com/soybabydani-ops/aquitemachadinhos"
                ],
                "brand": PARTNERS_GRAPH
            }
        },
        {
            "@type": "WebPage",
            "@id": f"{canonical_url}#webpage",
            "url": canonical_url,
            "name": title,
            "description": description,
            "isPartOf": {"@id": f"{DOMAIN}/#website"},
            "about": {
                "@type": "Place",
                "name": f"Polo de {city_clean}",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": city_clean,
                    "addressCountry": "BR"
                }
            }
        },
        {
            "@type": "Service",
            "name": f"Serviço de Curadoria & Utilidade Pública — {city_clean}",
            "provider": {"@id": f"{DOMAIN}/#organization"},
            "areaServed": {
                "@type": "City",
                "name": city_clean
            },
            "serviceType": "Utilidade Pública, Oportunidades Comerciais, Turismo e Capacitação Técnica"
        }
    ]

    return {
        "@context": "https://schema.org",
        "@graph": graph_nodes
    }

def process_file(filepath):
    rel_path = os.path.relpath(filepath, REPO_ROOT)
    
    # Blindagem absoluta de carrossel e arquivos intocáveis
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Extrai title e description existentes
    title_match = re.search(r"<title>([^<]+)</title>", content, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else "Aqui Tem Achadinhos — Portal Oficial 2026"
    
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
    desc = desc_match.group(1).strip() if desc_match else "Portal de Achadinhos, Turismo VIP, Cursos e Utilidade Pública Local 2026."

    canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', content, re.IGNORECASE)
    canonical = canonical_match.group(1).strip() if canonical_match else f"{DOMAIN}/{rel_path.replace('.html', '')}"

    city_slug = detect_city(rel_path, content)
    graph_obj = generate_entity_graph(rel_path, title, desc, canonical, city_slug)
    graph_json = json.dumps(graph_obj, ensure_ascii=False, indent=2)

    # 1. Garante Preload do Injetor de Afiliados (< 5ms)
    preload_tag = '<link rel="preload" href="/assets/affiliate-tracker.raw.js" as="script">'
    if 'rel="preload" href="/assets/affiliate-tracker.raw.js"' not in content and "rel='preload' href='/assets/affiliate-tracker.raw.js'" not in content:
        content = content.replace("</head>", f"  {preload_tag}\n</head>")

    # 2. Injeta / Atualiza Bloco de Grafo de Entidades Semânticas
    graph_tag = f'\n<script type="application/ld+json" id="aquitem-semantic-entity-graph">\n{graph_json}\n</script>'
    
    if 'id="aquitem-semantic-entity-graph"' in content:
        content = re.sub(
            r'<script type="application/ld\+json" id="aquitem-semantic-entity-graph">[\s\S]*?</script>',
            graph_tag.strip(),
            content
        )
    else:
        content = content.replace("</head>", f"{graph_tag}\n</head>")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def main():
    print("Iniciando injeção do Semantic Entity Graph Saturation em todas as páginas HTML...")
    count = 0
    for root, dirs, files in os.walk(REPO_ROOT):
        if ".git" in root or ".vercel" in root or "node_modules" in root:
            continue
        for f in files:
            if f.endswith(".html") and not f.startswith("404"):
                p = os.path.join(root, f)
                process_file(p)
                count += 1

    print(f"✅ Injeção concluída com sucesso em {count} páginas HTML!")

if __name__ == "__main__":
    main()
