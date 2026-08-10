#!/usr/bin/env python3
import urllib.request, json, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Content-Type": "application/json"
}

listings = [
    # Moda e Beleza
    {
        "titulo": "Bota Country Feminina Texana Couro Legítimo Bordada",
        "anunciante_nome": "Couro & Arte Western",
        "categoria": "moda-beleza", "subcategoria": "calcados",
        "descricao": "Bota bico fino salto baixo, solado antiderrapante em látex, numerações do 34 ao 39.",
        "preco": "R$ 389", "atributos": {"tamanho": "34 ao 39"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chapéu Pralana Champion Feltro 100% Lã Natural",
        "anunciante_nome": "Casa do Peão Barretos",
        "categoria": "moda-beleza", "subcategoria": "masculino",
        "descricao": "Chapéu tradicional cor preta, copa alta, aba 11cm, forro em cetim e carneira em recouro.",
        "preco": "R$ 420", "atributos": {"tamanho": "56 ao 60"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Casaco de Lã Batida Feminino Forrado — Serra Gaúcha",
        "anunciante_nome": "Malhas & Fios Gramado",
        "categoria": "moda-beleza", "subcategoria": "feminino",
        "descricao": "Casaco quentinho para o frio da serra, fechamento por botões duplos, bolsos laterais, tamanho G.",
        "preco": "R$ 310", "atributos": {"tamanho": "G"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    # Animais & Pets
    {
        "titulo": "Adoção Responsável: Lindos Filhotes de Cachorro Resgatados",
        "anunciante_nome": "ONG Amigos dos Animais",
        "categoria": "animais", "subcategoria": "adocao",
        "descricao": "Filhotes dóceis, porte médio, desverminados e com castração garantida quando atingirem a idade.",
        "preco": "Adoção Gratuita", "atributos": {"especie": "Cão SRD / Porte Médio"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Banho, Tosa Higiênica e Hotelzinho Pet com Leva e Traz",
        "anunciante_nome": "Pet Spa & Resort Barretos",
        "categoria": "animais", "subcategoria": "servicos-pet",
        "descricao": "Profissionais carinhosos, produtos hipoalergênicos e espaço amplo gramado para recreação.",
        "preco": "A partir de R$ 45",
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    # Eletrônicos & Tech
    {
        "titulo": "Samsung Galaxy S23 Ultra 256GB 5G Preto — Na Garantia",
        "anunciante_nome": "Bruno Imports",
        "categoria": "eletronicos", "subcategoria": "celulares",
        "descricao": "Câmera de 200MP com zoom 100x, caneta S-Pen, tela Dynamic AMOLED 120Hz sem detalhes.",
        "preco": "R$ 3.800", "atributos": {"estado": "semi", "marca": "Samsung Galaxy S23 Ultra"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Smart TV 55 Polegadas 4K UHD LG ThinQ AI",
        "anunciante_nome": "Eletro & Som Barretos",
        "categoria": "eletronicos", "subcategoria": "tv-audio",
        "descricao": "Smart TV com controle Smart Magic, Bluetooth, HDR10 e aplicativos instalados (Netflix, YouTube, Prime).",
        "preco": "R$ 1.950", "atributos": {"estado": "semi", "marca": "LG 55 4K"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Rochdale", "destaque": False, "plano": "gratis"
    },
    # Móveis & Decoração
    {
        "titulo": "Mesa de Jantar 6 Lugares com Tampo de Vidro e Cadeiras Estofadas",
        "anunciante_nome": "Casa Moderna Móveis",
        "categoria": "moveis-eletro", "subcategoria": "cozinha",
        "descricao": "Mesa 1,60m em madeira maciça com vidro sobreposto off-white e 6 cadeiras em linho bege.",
        "preco": "R$ 1.450", "atributos": {"estado": "novo"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Guarda-Roupa Casal 6 Portas com Espelho Central",
        "anunciante_nome": "Móveis Barretos Express",
        "categoria": "moveis-eletro", "subcategoria": "quarto",
        "descricao": "100% MDF, corrediças telescópicas nas gavetas, cabideiros em alumínio e divisão interna ele/ela.",
        "preco": "R$ 980", "atributos": {"estado": "novo"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    # Esportes & Lazer
    {
        "titulo": "Violão Elétrico Giannini Flat Cutaway com Afinador Embutido",
        "anunciante_nome": "Música & Cordas Barretos",
        "categoria": "esportes-lazer", "subcategoria": "musica",
        "descricao": "Cordas de aço novas DAddario, som limpo acústico e plugado, acompanha capa acolchoada e cabo.",
        "preco": "R$ 680", "atributos": {"marca": "Giannini Performance"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Prancha de Surf Funboard 7.2 com Quilhas e Leash",
        "anunciante_nome": "Surf Club Joaquina",
        "categoria": "esportes-lazer", "subcategoria": "surf-aquatico",
        "descricao": "Ótima flutuação, perfeita para iniciantes e intermediários pegarem muitas ondas.",
        "preco": "R$ 890",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Florianópolis", "city_slug": "florianopolis", "bairro": "Lagoa da Conceição", "destaque": True, "plano": "destaque"
    },
    # Agro & Campo
    {
        "titulo": "Cavalo Quarto de Milha Puro com Registro ABQM Domado",
        "anunciante_nome": "Haras Estrela do Norte",
        "categoria": "agro-campo", "subcategoria": "gado",
        "descricao": "Animal dócil e veloz, linhagem de tambor e laço, excelente para cavalgadas e provas.",
        "preco": "R$ 18.000", "atributos": {"detalhe_agro": "Quarto de Milha ABQM 6 anos"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },
    # Serviços
    {
        "titulo": "Instalação e Manutenção de Câmeras de Segurança e Alarmes",
        "anunciante_nome": "Segurança Eletrônica Barretos",
        "categoria": "servicos", "subcategoria": "eletrica",
        "descricao": "Acesso às imagens direto pelo celular em tempo real, gravação em nuvem e suporte técnico.",
        "preco": "Orçamento gratuito",
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Aulas Particulares de Matemática, Física e Química para ENEM",
        "anunciante_nome": "Prof. Eduardo Santos",
        "categoria": "servicos", "subcategoria": "aulas",
        "descricao": "Aulas presenciais em Barretos ou online para todo o Brasil. Material didático incluso.",
        "preco": "R$ 60 / hora-aula",
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": False, "plano": "gratis"
    },
    # Vagas Nacionais & Remoto
    {
        "titulo": "Assistente de Atendimento e Suporte ao Cliente via Chat (Remoto)",
        "anunciante_nome": "E-commerce Brasil Log",
        "categoria": "vagas-nac-empresa", "subcategoria": "home-office",
        "descricao": "Atendimento a dúvidas de pedidos via WhatsApp e chat online. Salário fixo + auxílio internet.",
        "preco": "R$ 2.100 / mês", "atributos": {"jornada": "Seg a Sex 09h às 18h", "requisitos": "Boa digitação"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Brasil Todo", "city_slug": "nacional", "bairro": "Remoto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Redator e Criador de Conteúdo para Blogs e Sites (Home Office)",
        "anunciante_nome": "Agência Conteúdo & SEO",
        "categoria": "vagas-nac-empresa", "subcategoria": "home-office",
        "descricao": "Produção de artigos otimizados para mecanismos de busca e redes sociais.",
        "preco": "R$ 3.000 / mês (PJ)", "atributos": {"jornada": "Remoto flexível", "requisitos": "Portfólio de textos"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Brasil Todo", "city_slug": "nacional", "bairro": "Remoto", "destaque": True, "plano": "destaque"
    }
]

print("Inserindo lote 3 de listings...")
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

print(f"\nLote 3 concluído! Total de {inserted} novos anúncios publicados!")
