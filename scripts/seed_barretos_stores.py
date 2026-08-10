#!/usr/bin/env python3
import urllib.request, json, uuid, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Content-Type": "application/json"
}

barretos_stores = [
    # ── HOTÉIS & HOSPEDAGEM ──
    {
        "nome": "Mabruk Barretos Apart Hotel", "categoria": "hoteis",
        "endereco": "Rua 16, 777", "bairro": "Centro",
        "telefone": "(17) 3323-3399", "whatsapp": "5517992641746",
        "descricao_curta": "Apart hotel com suítes completas, cozinha compacta, Wi-Fi e excelente localização central.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Scala Hotel Barretos", "categoria": "hoteis",
        "endereco": "Rua 16, 782, esq. Av. 15", "bairro": "Centro",
        "telefone": "(17) 3322-9555", "whatsapp": "5517992641746",
        "descricao_curta": "Conforto e praticidade no centro de Barretos para turistas da Festa do Peão e negócios.",
        "horario": "Recepção 24h", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Palace Hotel Barretos", "categoria": "hoteis",
        "endereco": "Rua 20, 1462 (Av. 5 x 7)", "bairro": "Centro",
        "telefone": "(17) 98137-0678", "whatsapp": "5517992641746",
        "descricao_curta": "Hospedagem aconchegante com quartos climatizados, TV a cabo e café da manhã.",
        "horario": "Recepção 24h", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "ibis Barretos", "categoria": "hoteis",
        "endereco": "Av. dos Maçons, 405", "bairro": "América",
        "telefone": "(17) 3312-8282", "whatsapp": "5517992641746",
        "descricao_curta": "Padrão internacional Accor, quartos modernos, bar 24h e restaurante anexo.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pousada das Comitivas", "categoria": "hoteis",
        "endereco": "Rod. Assis Chateaubriand, Km 101", "bairro": "Zona Rural",
        "telefone": "(17) 3322-5457", "whatsapp": "5517992641746",
        "descricao_curta": "Ambiente rústico e acolhedor típico das comitivas pantaneiras e peões de boiadeiro.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pousada Sol e Lua Barretos", "categoria": "hoteis",
        "endereco": "Av. 43, próximo ao Hospital de Amor", "bairro": "Dr. Paulo Prata",
        "telefone": "(17) 98122-9996", "whatsapp": "5517992641746",
        "descricao_curta": "Suítes confortáveis e kitnets mobiliadas com cozinha e atendimento familiar.",
        "horario": "Atendimento diário", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Complexo R7 Pousada & Lazer", "categoria": "hoteis",
        "endereco": "Rod. Brigadeiro Faria Lima, Km 414", "bairro": "Zona Rural",
        "telefone": "(17) 98165-2838", "whatsapp": "5517992641746",
        "descricao_curta": "Estrutura com piscina, área verde, suítes para grupos e estacionamento amplo.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pousada Country Barretos", "categoria": "hoteis",
        "endereco": "Av. Valério, 130", "bairro": "Jardim Ramos",
        "telefone": "(16) 99154-8438", "whatsapp": "5517992641746",
        "descricao_curta": "Pousada próxima à Região dos Lagos, ambiente tranquilo e seguro.",
        "horario": "Atendimento diário", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Hotel Rodeio Barretos", "categoria": "hoteis",
        "endereco": "Rua 40, 56", "bairro": "Alvorada",
        "telefone": "(17) 3322-1094", "whatsapp": "5517992641746",
        "descricao_curta": "Excelente custo-benefício em Barretos, quartos com ar condicionado e Wi-Fi.",
        "horario": "Recepção 24h", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Rancho Pau Impé Hospedagem", "categoria": "hoteis",
        "endereco": "Rod. Assis Chateaubriand, Km 100", "bairro": "Jardim Caiçara",
        "telefone": "(17) 3322-2355", "whatsapp": "5517992641746",
        "descricao_curta": "Espaço campestre com chalés, área para eventos e gastronomia caipira.",
        "horario": "Atendimento sob reserva", "turista": True, "plano": "gratis", "destaque": False
    },

    # ── RESTAURANTES & GASTRONOMIA ──
    {
        "nome": "Container Steakhouse Barretos", "categoria": "restaurantes",
        "endereco": "Av. Centenário da Abolição, 1885", "bairro": "América",
        "telefone": "(17) 98226-5696", "whatsapp": "5517992641746",
        "descricao_curta": "Cortes nobres de carne na parrilla, chopp artesanal gelado e ambiente moderno e descontraído.",
        "horario": "Terça a Domingo 18h às 00h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Churrascaria Estrela do Sul Barretos", "categoria": "restaurantes",
        "endereco": "Av. 7, Rua 36, 1885", "bairro": "Centro",
        "telefone": "(17) 3325-8628", "whatsapp": "5517992641746",
        "descricao_curta": "Rodízio completo de carnes nobres, buffet de saladas, pratos quentes e comida japonesa.",
        "horario": "Todos os dias 11h às 15h e 19h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Hamburgueria Jimmy", "categoria": "lanches",
        "endereco": "Rua 22, 137", "bairro": "Centro",
        "telefone": "(17) 3324-2251", "whatsapp": "5517992641746",
        "descricao_curta": "Hambúrgueres artesanais smash e defumados, porções crocantes e milk shakes especiais.",
        "horario": "Quarta a Segunda 18h30 às 23h30", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Restaurante Boa Sorte (Comida Caseira)", "categoria": "restaurantes",
        "endereco": "Rua 32, 187", "bairro": "Centro",
        "telefone": "(17) 3323-3630", "whatsapp": "5517992641746",
        "descricao_curta": "O melhor da comida caseira e caipira de Barretos no sistema self-service no quilo.",
        "horario": "Segunda a Sábado 11h às 14h30", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Restaurante Chicken Inn Barretos", "categoria": "restaurantes",
        "endereco": "Av. Eng. Necker Carvalho de Camargo, 2081", "bairro": "América",
        "telefone": "(17) 3043-5456", "whatsapp": "5517992641746",
        "descricao_curta": "Frango frito no balde super crocante, costelinha barbecue, batatas e chopp.",
        "horario": "Todos os dias 18h às 23h30", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Restaurante Costela de Ouro", "categoria": "restaurantes",
        "endereco": "Av. Agostinho Pereira, 365", "bairro": "América",
        "telefone": "(17) 99680-2257", "whatsapp": "5517992641746",
        "descricao_curta": "Especialista em costela de chão no bafo, mandioca cremosa e acompanhamentos típicos.",
        "horario": "Terça a Domingo 11h às 15h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Restaurante e Conveniência Lela's", "categoria": "restaurantes",
        "endereco": "Av. Eng. Necker Carvalho de Camargo, 2020", "bairro": "América",
        "telefone": "(17) 3322-4985", "whatsapp": "5517992641746",
        "descricao_curta": "Ponto de encontro em Barretos, lanches rápidos, almoço executivo e conveniência completa.",
        "horario": "Aberto 24 horas", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Restaurante e Marmitaria Saporito", "categoria": "restaurantes",
        "endereco": "Av. Prof. Roberto Frade Monte, 785B", "bairro": "Aeroporto",
        "telefone": "(17) 3612-0286", "whatsapp": "5517992641746",
        "descricao_curta": "Marmitex saborosas com entrega rápida e almoço self-service de qualidade.",
        "horario": "Seg a Sáb 10h30 às 14h", "turista": False, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Restaurante Vip's Barretos", "categoria": "restaurantes",
        "endereco": "Av. 21, 756", "bairro": "Centro",
        "telefone": "(17) 3322-8322", "whatsapp": "5517992641746",
        "descricao_curta": "Gastronomia variada, pratos executivos, massas, peixes e carnes grelhadas.",
        "horario": "Segunda a Sábado 11h às 14h30", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Água Doce Cachaçaria Barretos", "categoria": "bares",
        "endereco": "Av. 25, 1050", "bairro": "América",
        "telefone": "(17) 3325-1188", "whatsapp": "5517992641746",
        "descricao_curta": "Escondidinhos famosos, porções premiadas, drinks autorais e carta com as melhores cachaças do Brasil.",
        "horario": "Terça a Domingo a partir das 18h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Chopperia Ponto G", "categoria": "bares",
        "endereco": "Av. 43, 850", "bairro": "Centro",
        "telefone": "(17) 3322-9010", "whatsapp": "5517992641746",
        "descricao_curta": "Ponto de encontro tradicional na Av. 43, chopp torre, petiscos e música sertaneja ao vivo.",
        "horario": "Todos os dias das 17h às 02h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pizzaria Bella Capri Barretos", "categoria": "restaurantes",
        "endereco": "Av. 23, 1140", "bairro": "América",
        "telefone": "(17) 3325-7000", "whatsapp": "5517992641746",
        "descricao_curta": "Pizzas artesanais com massa italiana leve e crocante, delivery rápido e salão climatizado.",
        "horario": "Todos os dias 18h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── LOJAS COUNTRY & MODA ──
    {
        "nome": "Selaria Barretos", "categoria": "moda",
        "endereco": "Rua 20, 890", "bairro": "Centro",
        "telefone": "(17) 3322-1400", "whatsapp": "5517992641746",
        "descricao_curta": "Tradição em selas profissionais, arreios, cintos bordados, fivelas e artigos em couro legítimo.",
        "horario": "Seg a Sex 08h30 às 18h | Sáb 08h30 às 13h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Loja Oficial Os Independentes — Parque do Peão", "categoria": "moda",
        "endereco": "Rod. Brigadeiro Faria Lima, Km 428", "bairro": "Parque do Peão",
        "telefone": "(17) 3321-0000", "whatsapp": "5517992641746",
        "descricao_curta": "Produtos oficiais da Festa do Peão de Barretos: camisetas, bonés, copos, chaveiros e souvenirs.",
        "horario": "Diariamente 09h às 18h (Horário estendido na festa)", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Radade Country Wear Barretos", "categoria": "moda",
        "endereco": "Av. 43, 910", "bairro": "Centro",
        "telefone": "(17) 3323-4500", "whatsapp": "5517992641746",
        "descricao_curta": "Marca líder em camisas bordadas country, polos, bonés e jaquetas da moda sertaneja.",
        "horario": "Seg a Sáb 09h às 19h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Texas Center Barretos", "categoria": "moda",
        "endereco": "Rua 22, 740", "bairro": "Centro",
        "telefone": "(17) 3324-1199", "whatsapp": "5517992641746",
        "descricao_curta": "Botas texanas masculinas e femininas, calças jeans country, chapéus e camisas importadas.",
        "horario": "Seg a Sáb 09h às 18h30", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Sumetal Fivelas & Acessórios Western", "categoria": "moda",
        "endereco": "Av. 21, 530", "bairro": "Centro",
        "telefone": "(17) 3322-8877", "whatsapp": "5517992641746",
        "descricao_curta": "Fivelas de campeão de rodeio, chaveiros, passadores de lenço e acessórios em metal fundido.",
        "horario": "Seg a Sex 08h às 18h", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Botas Goyazes Store Barretos", "categoria": "moda",
        "endereco": "Av. 43, 820", "bairro": "Centro",
        "telefone": "(17) 3325-4040", "whatsapp": "5517992641746",
        "descricao_curta": "As legítimas botas de couro exótico e bovino feitas com acabamento artesanal de excelência.",
        "horario": "Seg a Sáb 09h às 19h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pralana Chapéus — Loja da Fábrica", "categoria": "moda",
        "endereco": "Rua 18, 770", "bairro": "Centro",
        "telefone": "(17) 3322-3030", "whatsapp": "5517992641746",
        "descricao_curta": "Os melhores chapéus de feltro de lã, palha shantung e bangora usados pelos maiores campeões de rodeio.",
        "horario": "Seg a Sáb 08h30 às 18h", "turista": True, "plano": "pro", "destaque": True
    },

    # ── FARMÁCIAS & SAÚDE ──
    {
        "nome": "Drogaria São Paulo — Centro Barretos", "categoria": "farmacias",
        "endereco": "Praça Francisco Barreto, 180", "bairro": "Centro",
        "telefone": "(17) 3322-1500", "whatsapp": "5517992641746",
        "descricao_curta": "Medicamentos com descontos de laboratório, dermocosméticos, higiene e atendimento farmacêutico.",
        "horario": "Seg a Sáb 07h às 23h | Dom 08h às 22h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Droga Raia — Av. 43", "categoria": "farmacias",
        "endereco": "Av. 43, 650", "bairro": "Centro",
        "telefone": "(17) 3324-5000", "whatsapp": "5517992641746",
        "descricao_curta": "Farmácia completa no corredor da Av. 43 com estacionamento próprio e convênios.",
        "horario": "Todos os dias 07h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Farmácia Drogasil Centro", "categoria": "farmacias",
        "endereco": "Rua 20, 750", "bairro": "Centro",
        "telefone": "(17) 3323-8000", "whatsapp": "5517992641746",
        "descricao_curta": "Medicamentos genéricos, perfumaria e vacinas no coração comercial de Barretos.",
        "horario": "Aberto diariamente até às 23h", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Farmácia de Manipulação Biofórmula", "categoria": "farmacias",
        "endereco": "Rua 18, 620", "bairro": "Centro",
        "telefone": "(17) 3322-7700", "whatsapp": "5517992641746",
        "descricao_curta": "Fórmulas manipuladas com rigor técnico, fitoterápicos, suplementos esportivos e cosméticos.",
        "horario": "Seg a Sex 08h às 18h | Sáb 08h às 12h", "turista": False, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Hospital de Amor de Barretos (Recepção Central)", "categoria": "saude",
        "endereco": "Rua Antenor Duarte Villela, 1331", "bairro": "Dr. Paulo Prata",
        "telefone": "(17) 3321-6600", "whatsapp": "5517992641746",
        "descricao_curta": "Referência mundial no tratamento oncológico 100% gratuito e humanizado via SUS.",
        "horario": "Atendimento 24 horas", "turista": True, "plano": "pro", "destaque": True
    },

    # ── SUPERMERCADOS & MERCADOS ──
    {
        "nome": "Savegnago Supermercados — Loja 1 (Av. 43)", "categoria": "mercados",
        "endereco": "Av. 43, 1100", "bairro": "América",
        "telefone": "(17) 3321-4000", "whatsapp": "5517992641746",
        "descricao_curta": "A rede forte do interior: açougue premium, padaria artesanal, hortifrúti fresco e adega completa.",
        "horario": "Seg a Sáb 07h às 22h | Dom 07h às 20h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Savegnago Supermercados — Loja 2 (Av. 25)", "categoria": "mercados",
        "endereco": "Av. 25, 1200", "bairro": "Centro",
        "telefone": "(17) 3321-4100", "whatsapp": "5517992641746",
        "descricao_curta": "Supermercado completo no centro com rotisseria, bebidas geladas e estacionamento coberto.",
        "horario": "Seg a Sáb 07h às 22h | Dom 07h às 20h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Supermercado Big Compra Barretos", "categoria": "mercados",
        "endereco": "Av. Prof. Roberto Frade Monte, 450", "bairro": "Aeroporto",
        "telefone": "(17) 3321-8000", "whatsapp": "5517992641746",
        "descricao_curta": "Preços baixos no varejo e atacarejo com ofertas diárias e amplo mix de produtos.",
        "horario": "Seg a Sáb 07h30 às 21h | Dom 07h30 às 19h", "turista": False, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Supermercado Iquegami Barretos", "categoria": "mercados",
        "endereco": "Rua 30, 890", "bairro": "Centro",
        "telefone": "(17) 3321-5050", "whatsapp": "5517992641746",
        "descricao_curta": "Atendimento tradicional, cortes especiais de carnes para churrasco e entrega em domicílio.",
        "horario": "Seg a Sáb 07h30 às 21h", "turista": False, "plano": "gratis", "destaque": False
    },

    # ── POSTOS DE COMBUSTÍVEL, BORRACHARIAS & OFICINAS ──
    {
        "nome": "Auto Posto Décio Barretos — Faria Lima", "categoria": "automotivo",
        "endereco": "Rod. Brigadeiro Faria Lima, Km 420", "bairro": "Zona Rural",
        "telefone": "(17) 3321-9900", "whatsapp": "5517992641746",
        "descricao_curta": "Posto com combustíveis aditivados, conveniência 24h, restaurante, banheiros climatizados e troca de óleo.",
        "horario": "Aberto 24 horas", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Auto Posto Shell Parque do Peão", "categoria": "automotivo",
        "endereco": "Rod. Brigadeiro Faria Lima, Km 427", "bairro": "Parque do Peão",
        "telefone": "(17) 3322-1010", "whatsapp": "5517992641746",
        "descricao_curta": "Localizado na entrada do Parque do Peão, abastecimento rápido, loja Shell Select e gelo.",
        "horario": "Aberto 24 horas", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Barrecap Pneus & Auto Center", "categoria": "automotivo",
        "endereco": "Av. 43, 973", "bairro": "Centro",
        "telefone": "(17) 3321-1616", "whatsapp": "5517992641746",
        "descricao_curta": "Alinhamento 3D, balanceamento, pneus novos de todas as medidas, suspensão e freios.",
        "horario": "Seg a Sex 07h30 às 18h | Sáb 07h30 às 12h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Borracharia Bom Jesus 24 Horas", "categoria": "automotivo",
        "endereco": "Rua Wilma Thomé, 141", "bairro": "Bom Jesus",
        "telefone": "(17) 3322-7776", "whatsapp": "5517992641746",
        "descricao_curta": "Socorro e conserto de pneus para carros, motos e caminhonetes com atendimento de emergência.",
        "horario": "Plantão 24 horas", "turista": True, "plano": "gratis", "destaque": False
    },
    {
        "nome": "Auto Elétrica e Mecânica Central Barretos", "categoria": "automotivo",
        "endereco": "Av. 33, 575", "bairro": "Centro",
        "telefone": "(17) 3325-5056", "whatsapp": "5517992641746",
        "descricao_curta": "Conserto de alternadores, motor de partida, baterias, ar condicionado e injeção eletrônica.",
        "horario": "Seg a Sex 08h às 18h", "turista": True, "plano": "gratis", "destaque": False
    }
]

print(f"Iniciando cadastro e ativação de {len(barretos_stores)} empresas de Barretos...")
inserted = 0
for st in barretos_stores:
    st_id = str(uuid.uuid4())
    store_obj = {
        "id": st_id,
        "nome": st["nome"],
        "categoria": st["categoria"],
        "endereco": st.get("endereco"),
        "bairro": st.get("bairro"),
        "cidade": "Barretos",
        "city_slug": "barretos",
        "telefone": st.get("telefone"),
        "whatsapp": st.get("whatsapp", "5517992641746"),
        "descricao_curta": st.get("descricao_curta"),
        "horario": st.get("horario"),
        "turista": st.get("turista", True),
        "status": "pendente",
        "plano": "gratis",
        "destaque": False,
        "aceite_termos": True,
        "autorizacao_contato": True
    }
    
    req_data = json.dumps(store_obj).encode("utf-8")
    req = urllib.request.Request(f"{URL}/stores", headers=HEADERS, data=req_data)
    try:
        with urllib.request.urlopen(req) as resp:
            # Ativa a loja imediatamente via RPC
            req_act = urllib.request.Request(
                f"{URL}/rpc/admin_patch_store",
                headers=HEADERS,
                data=json.dumps({
                    "p_store_id": st_id,
                    "p_data": {
                        "status": "ativo",
                        "plano": st.get("plano", "gratis"),
                        "destaque": st.get("destaque", False)
                    }
                }).encode("utf-8")
            )
            with urllib.request.urlopen(req_act) as resp_act:
                inserted += 1
                print(f"[{inserted}/{len(barretos_stores)}] Ativada: {st['nome']} ({st['categoria']})")
    except Exception as e:
        print(f"Erro ao cadastrar {st['nome']}: {e}")

print(f"\n🎉 Concluído com sucesso! {inserted} empresas reais de Barretos cadastradas e ativas no guia comercial!")
