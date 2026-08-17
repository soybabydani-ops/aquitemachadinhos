import os
#!/usr/bin/env python3
import urllib.request, json, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "os.environ.get("SUPABASE_ANON_KEY", "")",
    "Authorization": "Bearer os.environ.get("SUPABASE_ANON_KEY", "")",
    "Content-Type": "application/json"
}

listings = [
    # Búzios
    {
        "titulo": "Casa de Praia 3 Suítes com Vista para Geribá — Temporada",
        "anunciante_nome": "Búzios Ocean Imóveis",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "Linda casa pé na areia em Geribá, deck com hidromassagem, churrasqueira e ar em todas as suítes.",
        "preco": "R$ 950 / diária",
        "atributos": {"quartos": "3", "banheiros": "3", "vagas": "2", "area": "180"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Búzios", "city_slug": "buzios", "bairro": "Geribá", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Instrutor de Mergulho e Marinheiro de Escuna",
        "anunciante_nome": "Maré Alta Passeios Náuticos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Condução de passeios pelas ilhas de Búzios e batismo de mergulho.",
        "preco": "R$ 2.500 + Gratificações",
        "atributos": {"jornada": "Escala turismo", "requisitos": "Habilitação Arrais / Mestre Amador"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Búzios", "city_slug": "buzios", "bairro": "Armação", "destaque": True, "plano": "destaque"
    },
    # Jericoacoara
    {
        "titulo": "Instrutor de Kitesurf e Windsurf com Certificação",
        "anunciante_nome": "Jeri Kite Club",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Aulas para iniciantes e avançados na praia do Preá e Lagoa do Paraíso.",
        "preco": "R$ 3.500 / mês estimado",
        "atributos": {"jornada": "Temporada de ventos", "requisitos": "Experiência comprovada"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Jericoacoara", "city_slug": "jericoacoara", "bairro": "Vila de Jeri", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Passeio de Buggy pelas Lagoas e Dunas de Jeri",
        "anunciante_nome": "Buggy Aventura Jeri",
        "categoria": "servicos", "subcategoria": "eventos",
        "descricao": "Roteiro completo: Pedra Furada, Árvore da Preguiça, Lagoa Azul e Lagoa do Paraíso com fotos de drone inclusas.",
        "preco": "R$ 350 / passeio (até 4 pessoas)",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Jericoacoara", "city_slug": "jericoacoara", "bairro": "Vila", "destaque": True, "plano": "destaque"
    },
    # Porto de Galinhas
    {
        "titulo": "Pousada Beira-Mar com Piscina nas Piscinas Naturais",
        "anunciante_nome": "Porto Tropical Pousada",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "A 50 metros das jangadas de Porto de Galinhas. Quarto com varanda, ar condicionado e café regional.",
        "preco": "R$ 320 / diária",
        "atributos": {"quartos": "1", "banheiros": "1", "vagas": "1", "area": "28"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Porto de Galinhas", "city_slug": "porto", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Restaurante e Garçom de Frutos do Mar",
        "anunciante_nome": "Restaurante Peixe na Telha",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento à beira-mar, pratos de lagosta, camarão e moquecas.",
        "preco": "R$ 2.100 + Gorjetas",
        "atributos": {"jornada": "Escala 6x1", "requisitos": "Disponibilidade de horário"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Porto de Galinhas", "city_slug": "porto", "bairro": "Vila", "destaque": True, "plano": "destaque"
    },
    # Caruaru
    {
        "titulo": "Vendedora de Artesanato em Barro e Roupas no Alto do Moura",
        "anunciante_nome": "Artesanato Mestre Vitalino",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento a turistas na maior feira de artesanato figurativo da América Latina.",
        "preco": "R$ 1.800 + Comissões",
        "atributos": {"jornada": "08h às 17h", "requisitos": "Boa comunicação"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Caruaru", "city_slug": "caruaru", "bairro": "Alto do Moura", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Casa 3 Quartos para Aluguel Anual no Maurício de Nassau",
        "anunciante_nome": "Imobiliária Capital do Agreste",
        "categoria": "imoveis", "subcategoria": "alugar",
        "descricao": "Casa espaçosa em bairro nobre, terraço amplo, suíte master e garagem para 2 carros.",
        "preco": "R$ 2.200 / mês",
        "atributos": {"quartos": "3", "banheiros": "2", "vagas": "2", "area": "160"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Caruaru", "city_slug": "caruaru", "bairro": "Maurício de Nassau", "destaque": True, "plano": "destaque"
    },
    # Veículos extras & Náutica
    {
        "titulo": "Chevrolet Onix Plus 1.0 Turbo Premier 2022 Automático",
        "anunciante_nome": "Triângulo Veículos Seminovos",
        "categoria": "veiculos", "subcategoria": "carros",
        "descricao": "Versão topo de linha com alerta de ponto cego, carregador wireless, Wi-Fi integrado e partida no botão.",
        "preco": "R$ 78.900",
        "atributos": {"marca": "Chevrolet Onix Plus Premier", "ano": "2022", "km": "36000", "cambio": "Automático"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Yamaha NMAX 160 ABS 2023 Azul Fosco",
        "anunciante_nome": "Motos & Cia Barretos",
        "categoria": "veiculos", "subcategoria": "motos",
        "descricao": "Scooter automática com chave presencial smart key, freios ABS nas duas rodas e garantia de fábrica.",
        "preco": "R$ 18.500",
        "atributos": {"marca": "Yamaha NMAX 160", "ano": "2023", "km": "8200"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    # Bebês, Esportes e Negócios
    {
        "titulo": "Carrinho de Bebê Burigotto com Bebê Conforto e Base Isofix",
        "anunciante_nome": "Priscila Mamães & Bebês",
        "categoria": "infantil-bebes", "subcategoria": "carrinhos",
        "descricao": "Kit completo em excelente estado de conservação, higienizado, com moisés reclinável e cinto 5 pontos.",
        "preco": "R$ 750",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Bicicleta Mountain Bike Caloi Aro 29 Câmbio Shimano 24V",
        "anunciante_nome": "Bike Shop Sul",
        "categoria": "esportes-lazer", "subcategoria": "bikes",
        "descricao": "Quadro em alumínio tamanho 17, freios a disco hidráulicos, suspensão com trava no guidão.",
        "preco": "R$ 1.450",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Florianópolis", "city_slug": "florianopolis", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Repasse de Loja de Cosméticos e Perfumaria Montada",
        "anunciante_nome": "Oportunidades Comerciais Barretos",
        "categoria": "negocios-comercio", "subcategoria": "pontos",
        "descricao": "Loja em pleno funcionamento no calçadão central, com prateleiras de vidro, ar condicionado, sistema PDV e clientela fidelizada.",
        "preco": "R$ 65.000 (Com estoque)",
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    # Doações & Trocas
    {
        "titulo": "Doação: Lote de Livros Didáticos, Literatura e Roupas Infantis",
        "anunciante_nome": "Projeto Solidariedade Barretos",
        "categoria": "trocas-doacoes", "subcategoria": "doacoes",
        "descricao": "Doamos livros escolares, romances e roupas infantis limpas para famílias que necessitam. Retirada no Centro.",
        "preco": "Grátis (Doação)",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "gratis"
    }
]

print("Inserindo lote 2 de listings...")
inserted = 0
for item in listings:
    payload = item.copy()
    payload["status"] = "ativo"
    
    req_data = json.dumps({"p_data": payload}).encode("utf-8")
    req = urllib.request.Request(
        f"{URL}/rpc/admin_insert_listing",
        headers=HEADERS,
        data=req_data
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if data and data.get("id"):
                lid = data["id"]
                req_act = urllib.request.Request(
                    f"{URL}/rpc/admin_set_listing_status",
                    headers=HEADERS,
                    data=json.dumps({"p_listing_id": lid, "p_status": "ativo"}).encode("utf-8")
                )
                with urllib.request.urlopen(req_act) as r_act:
                    inserted += 1
                    print(f"[{inserted}/{len(listings)}] Publicado: {item['titulo'][:45]}...")
    except Exception as e:
        print(f"Erro ao inserir {item['titulo']}: {e}")

print(f"\nLote 2 concluído! Total de {inserted} novos anúncios publicados!")
