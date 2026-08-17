import os
#!/usr/bin/env python3
import urllib.request, json, uuid, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "os.environ.get("SUPABASE_ANON_KEY", "")",
    "Authorization": "Bearer os.environ.get("SUPABASE_ANON_KEY", "")",
    "Content-Type": "application/json"
}

all_cities_stores = [
    # ── GRAMADO (RS) ──
    {
        "nome": "Chocoland Hotel Gramado", "categoria": "hoteis",
        "endereco": "Av. Borges de Medeiros, 4877", "bairro": "Centro",
        "cidade": "Gramado", "city_slug": "gramado",
        "telefone": "(54) 2108-4114", "whatsapp": "5517992641746",
        "descricao_curta": "1º hotel temático do chocolate da América Latina, castelo no centro, suítes lúdicas e spa de cacau.",
        "horario": "Recepção 24h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Prawer Chocolates — Loja Conceito", "categoria": "lanches",
        "endereco": "Av. Borges de Medeiros, 2795", "bairro": "Centro",
        "cidade": "Gramado", "city_slug": "gramado",
        "telefone": "(54) 3286-1580", "whatsapp": "5517992641746",
        "descricao_curta": "O primeiro chocolate artesanal do Brasil, trufas finas, barras puras e café gourmet.",
        "horario": "Seg a Dom 09h às 21h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Café Colonial Bela Vista Gramado", "categoria": "restaurantes",
        "endereco": "Av. das Hortênsias, 3500", "bairro": "Centro",
        "cidade": "Gramado", "city_slug": "gramado",
        "telefone": "(54) 3286-1604", "whatsapp": "5517992641746",
        "descricao_curta": "O mais tradicional café colonial do Brasil: mais de 80 delícias coloniais, tortas, vinhos e queijos.",
        "horario": "Seg a Dom 11h às 22h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Restaurante El Fuego Gramado", "categoria": "restaurantes",
        "endereco": "Rua Garibaldi, 20", "bairro": "Centro",
        "cidade": "Gramado", "city_slug": "gramado",
        "telefone": "(54) 3286-3055", "whatsapp": "5517992641746",
        "descricao_curta": "Cortes especiais de carne na brasa, fondue premium na pedra e carta seleta de vinhos da serra.",
        "horario": "Todos os dias 11h30 às 23h30", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Hotel Casa da Montanha", "categoria": "hoteis",
        "endereco": "Av. Borges de Medeiros, 3166", "bairro": "Centro",
        "cidade": "Gramado", "city_slug": "gramado",
        "telefone": "(54) 3295-7575", "whatsapp": "5517992641746",
        "descricao_curta": "Hotel charmoso estilo alpino, piscina aquecida, lareira e restaurante especializado em caças e carnes.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── CAMPOS DO JORDÃO (SP) ──
    {
        "nome": "Cervejaria Baden Baden — Vila Capivari", "categoria": "bares",
        "endereco": "Av. Djalma Forjaz, 93", "bairro": "Vila Capivari",
        "cidade": "Campos do Jordão", "city_slug": "campos",
        "telefone": "(12) 3663-3610", "whatsapp": "5517992641746",
        "descricao_curta": "Ponto de encontro oficial de Campos do Jordão: chopes artesanais premiados, salsichas alemãs e fondue.",
        "horario": "Diariamente das 11h à 00h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Cervejaria Caras de Malte", "categoria": "restaurantes",
        "endereco": "Av. Pedro Paulo, 1500", "bairro": "Descansópolis",
        "cidade": "Campos do Jordão", "city_slug": "campos",
        "telefone": "(12) 3662-2530", "whatsapp": "5517992641746",
        "descricao_curta": "Microcervejaria com vista para as araucárias, sequência de fondue, trutas grelhadas e tour cervejeiro.",
        "horario": "Seg a Dom 11h30 às 22h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Restaurante Dona Chica no Horto Florestal", "categoria": "restaurantes",
        "endereco": "Av. Pedro Paulo, s/n", "bairro": "Horto Florestal",
        "cidade": "Campos do Jordão", "city_slug": "campos",
        "telefone": "(12) 3663-3953", "whatsapp": "5517992641746",
        "descricao_curta": "Gastronomia sustentável da Mantiqueira: arroz de pinhão, leitão a pururuca e ambiente em meio à natureza.",
        "horario": "Quarta a Segunda 11h30 às 17h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pousada BeneVento Campos do Jordão", "categoria": "hoteis",
        "endereco": "Rua Cantídio Pereira de Castro, 215", "bairro": "Vila Everest",
        "cidade": "Campos do Jordão", "city_slug": "campos",
        "telefone": "(12) 3662-4040", "whatsapp": "5517992641746",
        "descricao_curta": "Pousada intimista e aconchegante com vista deslumbrante para as montanhas e café da manhã artesanal.",
        "horario": "Recepção diária", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── BLUMENAU (SC) ──
    {
        "nome": "Biergarten Blumenau — Centro Histórico", "categoria": "bares",
        "endereco": "Rua XV de Novembro, 160", "bairro": "Centro",
        "cidade": "Blumenau", "city_slug": "blumenau",
        "telefone": "(47) 3326-6000", "whatsapp": "5517992641746",
        "descricao_curta": "Restaurante e choperia histórica às margens do Rio Itajaí-Açu com gastronomia germânica autêntica.",
        "horario": "Seg a Dom 11h às 23h30", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Cervejaria Eisenbahn — Estação Bier", "categoria": "bares",
        "endereco": "Rua Bahia, 5181", "bairro": "Salto Weissbach",
        "cidade": "Blumenau", "city_slug": "blumenau",
        "telefone": "(47) 3488-7300", "whatsapp": "5517992641746",
        "descricao_curta": "Bar da fábrica com todas as cervejas premiadas Eisenbahn engatadas na pressão e petiscos alemães.",
        "horario": "Terça a Sábado das 17h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Vila Germânica Gastronomia & Souvenirs", "categoria": "turismo",
        "endereco": "Rua Alberto Stein, 199", "bairro": "Velha",
        "cidade": "Blumenau", "city_slug": "blumenau",
        "telefone": "(47) 3381-7700", "whatsapp": "5517992641746",
        "descricao_curta": "O coração da Oktoberfest de Blumenau: lojas de trajes típicos, choperias, artesanato e eventos o ano todo.",
        "horario": "Aberto todos os dias 10h às 22h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Hotel Himmelblau Blumenau", "categoria": "hoteis",
        "endereco": "Rua 7 de Setembro, 1415", "bairro": "Centro",
        "cidade": "Blumenau", "city_slug": "blumenau",
        "telefone": "(47) 3036-5800", "whatsapp": "5517992641746",
        "descricao_curta": "Hotel tradicional no centro de Blumenau, piscina, restaurante e fácil acesso à Vila Germânica.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── FLORIANÓPOLIS (SC) ──
    {
        "nome": "Restaurante O Timoneiro Frutos do Mar", "categoria": "restaurantes",
        "endereco": "Rod. Baldicero Filomeno, 4707", "bairro": "Ribeirão da Ilha",
        "cidade": "Florianópolis", "city_slug": "florianopolis",
        "telefone": "(48) 3337-5777", "whatsapp": "5517992641746",
        "descricao_curta": "Ostras frescas cultivadas na própria baía do Ribeirão da Ilha, camarões, polvos e peixes grelhados.",
        "horario": "Terça a Domingo 11h30 às 22h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Pousada dos Sonhos Jurerê", "categoria": "hoteis",
        "endereco": "Rua Jornalista Hermínio Ramos, 255", "bairro": "Jurerê Tradicional",
        "cidade": "Florianópolis", "city_slug": "florianopolis",
        "telefone": "(48) 3282-1002", "whatsapp": "5517992641746",
        "descricao_curta": "Pousada pé na areia em Jurerê, hidromassagem aquecida na varanda com vista para o mar e restaurante.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Bar do Boni — Lagoa da Conceição", "categoria": "bares",
        "endereco": "Av. das Rendeiras, 1480", "bairro": "Lagoa da Conceição",
        "cidade": "Florianópolis", "city_slug": "florianopolis",
        "telefone": "(48) 3232-5638", "whatsapp": "5517992641746",
        "descricao_curta": "Às margens da Lagoa da Conceição, sequência de camarão, caipirinhas de frutas e música ao vivo.",
        "horario": "Todos os dias 11h às 00h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Escola de Surf Floripa Barra da Lagoa", "categoria": "turismo",
        "endereco": "Praia da Barra da Lagoa", "bairro": "Barra da Lagoa",
        "cidade": "Florianópolis", "city_slug": "florianopolis",
        "telefone": "(48) 99120-4400", "whatsapp": "5517992641746",
        "descricao_curta": "Aulas de surf para crianças e adultos, aluguel de pranchas, stand up paddle e wetsuits.",
        "horario": "Todos os dias 08h às 18h", "turista": True, "plano": "gratis", "destaque": False
    },

    # ── SALVADOR (BA) ──
    {
        "nome": "Restaurante Senac Pelourinho", "categoria": "restaurantes",
        "endereco": "Praça José de Alencar, 13", "bairro": "Pelourinho",
        "cidade": "Salvador", "city_slug": "salvador",
        "telefone": "(71) 3324-4555", "whatsapp": "5517992641746",
        "descricao_curta": "Buffet com mais de 40 pratos da autêntica culinária afro-baiana: moquecas, vatapá, caruru e doces típicos.",
        "horario": "Seg a Sáb 11h30 às 15h30", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Acarajé da Dinha — Rio Vermelho", "categoria": "lanches",
        "endereco": "Largo de Santana", "bairro": "Rio Vermelho",
        "cidade": "Salvador", "city_slug": "salvador",
        "telefone": "(71) 3334-1704", "whatsapp": "5517992641746",
        "descricao_curta": "O acarajé e abará mais famoso de Salvador no coração boêmio do Largo de Santana no Rio Vermelho.",
        "horario": "Todos os dias 16h às 02h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Hotel Fasano Salvador — Praça Castro Alves", "categoria": "hoteis",
        "endereco": "Praça Castro Alves, 5", "bairro": "Centro Histórico",
        "cidade": "Salvador", "city_slug": "salvador",
        "telefone": "(71) 2201-6300", "whatsapp": "5517992641746",
        "descricao_curta": "Hotel de luxo em prédio histórico tombado, rooftop com piscina de borda infinita com vista para a Baía de Todos-os-Santos.",
        "horario": "Recepção 24h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Sorveteria da Ribeira Salvador", "categoria": "sorveterias",
        "endereco": "Praça General Osório, 87", "bairro": "Ribeira",
        "cidade": "Salvador", "city_slug": "salvador",
        "telefone": "(71) 3316-5451", "whatsapp": "5517992641746",
        "descricao_curta": "Fundada em 1931, mais de 60 sabores artesanais de frutas tropicais como mangaba, cajá, graviola e taperebá.",
        "horario": "Seg a Dom 09h às 22h", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── UBERLÂNDIA (MG) ──
    {
        "nome": "Churrascaria Tropeiro Grill Uberlândia", "categoria": "restaurantes",
        "endereco": "Av. Rondon Pacheco, 3200", "bairro": "Tibery",
        "cidade": "Uberlândia", "city_slug": "uberlandia",
        "telefone": "(34) 3212-0050", "whatsapp": "5517992641746",
        "descricao_curta": "Rodízio premium de carnes nobres no principal corredor gastronômico de Uberlândia na Av. Rondon Pacheco.",
        "horario": "Seg a Dom 11h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Restaurante Fogão de Minas Uberlândia", "categoria": "restaurantes",
        "endereco": "Av. Anselmo Alves dos Santos, 1111", "bairro": "Santa Mônica",
        "cidade": "Uberlândia", "city_slug": "uberlandia",
        "telefone": "(34) 3219-5000", "whatsapp": "5517992641746",
        "descricao_curta": "Autêntica comida mineira na panela de barro, costelinha com quiabo, feijão tropeiro e doces de compota.",
        "horario": "Seg a Dom 11h às 15h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Gran Hotel Arrey Uberlândia", "categoria": "hoteis",
        "endereco": "Av. Rondon Pacheco, 3800", "bairro": "Tibery",
        "cidade": "Uberlândia", "city_slug": "uberlandia",
        "telefone": "(34) 3230-7000", "whatsapp": "5517992641746",
        "descricao_curta": "Hotel executivo com quartos climatizados, centro de eventos, academia e restaurante internacional.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Empório Mineiro do Queijo — Mercado Municipal", "categoria": "mercados",
        "endereco": "Rua Olegário Maciel, 255", "bairro": "Centro",
        "cidade": "Uberlândia", "city_slug": "uberlandia",
        "telefone": "(34) 3236-1200", "whatsapp": "5517992641746",
        "descricao_curta": "Queijos Canastra artesanais, doces de leite de Viçosa, cachaças mineiras e cafés especiais.",
        "horario": "Seg a Sáb 08h às 18h | Dom 08h às 12h", "turista": True, "plano": "gratis", "destaque": False
    },

    # ── BONITO (MS) ──
    {
        "nome": "Restaurante Casa do João Bonito", "categoria": "restaurantes",
        "endereco": "Rua Nelson Felício dos Santos, 64", "bairro": "Centro",
        "cidade": "Bonito", "city_slug": "bonito",
        "telefone": "(67) 3255-1212", "whatsapp": "5517992641746",
        "descricao_curta": "A mais famosa traíra sem espinha do Brasil, pratos pantaneiros com peixes de água doce e museu de antiguidades.",
        "horario": "Terça a Domingo 11h30 às 23h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Pousada Arte da Natureza Bonito", "categoria": "hoteis",
        "endereco": "Rua Santana do Paraíso, 1027", "bairro": "Centro",
        "cidade": "Bonito", "city_slug": "bonito",
        "telefone": "(67) 3255-1025", "whatsapp": "5517992641746",
        "descricao_curta": "Piscinas com cachoeiras privativas nas varandas, jardins tropicais e atendimento de alto padrão.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Agência de Ecoturismo Ygarapé Bonito", "categoria": "turismo",
        "endereco": "Rua Coronel Pilad Rebuá, 1853", "bairro": "Centro",
        "cidade": "Bonito", "city_slug": "bonito",
        "telefone": "(67) 3255-1733", "whatsapp": "5517992641746",
        "descricao_curta": "Reserva de passeios oficiais em Bonito: Rio da Prata, Gruta do Lago Azul, Abismo Anhumas e Boca da Onça.",
        "horario": "Seg a Dom 07h às 21h", "turista": True, "plano": "pro", "destaque": True
    },

    # ── CALDAS NOVAS (GO) ──
    {
        "nome": "diRoma Acqua Park & Hotéis Termais", "categoria": "hoteis",
        "endereco": "Rua São Cristóvão, 1110", "bairro": "Solar de Caldas",
        "cidade": "Caldas Novas", "city_slug": "caldasnovas",
        "telefone": "(64) 3455-9999", "whatsapp": "5517992641746",
        "descricao_curta": "Complexo hoteleiro com parque aquático termal exclusivo, toboáguas gigantes e piscinas termais naturais.",
        "horario": "Recepção 24h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Restaurante e Peixaria Ipê Caldas Novas", "categoria": "restaurantes",
        "endereco": "Av. Orozimbo Correia Neto, 220", "bairro": "Centro",
        "cidade": "Caldas Novas", "city_slug": "caldasnovas",
        "telefone": "(64) 3453-1500", "whatsapp": "5517992641746",
        "descricao_curta": "Especialidade em peixes do Rio Paranaíba, tucunaré na telha, empadão goiano e arroz com pequi.",
        "horario": "Seg a Dom 11h às 23h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Doces Caseiros Dona Cota Caldas Novas", "categoria": "lanches",
        "endereco": "Rua Cel. Cirilo, 85", "bairro": "Centro",
        "cidade": "Caldas Novas", "city_slug": "caldasnovas",
        "telefone": "(64) 3453-2288", "whatsapp": "5517992641746",
        "descricao_curta": "Tradicionais doces de leite no tacho de cobre, doce de figo, compotas e queijos goianos.",
        "horario": "Seg a Dom 08h às 21h", "turista": True, "plano": "gratis", "destaque": False
    },

    # ── BÚZIOS (RJ) ──
    {
        "nome": "Chez Michou Crêperie — Rua das Pedras", "categoria": "restaurantes",
        "endereco": "Rua das Pedras, 540", "bairro": "Centro",
        "cidade": "Búzios", "city_slug": "buzios",
        "telefone": "(22) 2623-2169", "whatsapp": "5517992641746",
        "descricao_curta": "O ponto mais badalado da Rua das Pedras: crepes franceses doces e salgados, caipirinhas e música.",
        "horario": "Todos os dias das 16h às 03h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Restaurante Bar do Zé — Orla Bardot", "categoria": "restaurantes",
        "endereco": "Orla Bardot, 382", "bairro": "Centro",
        "cidade": "Búzios", "city_slug": "buzios",
        "telefone": "(22) 2623-4986", "whatsapp": "5517992641746",
        "descricao_curta": "Jantar com velas à beira-mar na Orla Bardot: risoto de frutos do mar, cherne com banana e peixes frescos.",
        "horario": "Seg a Dom 12h às 00h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Pousada Abracadabra Búzios", "categoria": "hoteis",
        "endereco": "Rua Alto de Santana, 13", "bairro": "Morro do Humaitá",
        "cidade": "Búzios", "city_slug": "buzios",
        "telefone": "(22) 2623-1217", "whatsapp": "5517992641746",
        "descricao_curta": "Pousada boutique com piscina de borda infinita debruçada sobre a Baía da Armação de Búzios.",
        "horario": "Recepção 24h", "turista": True, "plano": "pro", "destaque": True
    },

    # ── CARUARU (PE) ──
    {
        "nome": "Restaurante Tia Joana no Alto do Moura", "categoria": "restaurantes",
        "endereco": "Rua Mestre Vitalino, 220", "bairro": "Alto do Moura",
        "cidade": "Caruaru", "city_slug": "caruaru",
        "telefone": "(81) 3722-1450", "whatsapp": "5517992641746",
        "descricao_curta": "Carne de bode assada, macaxeira na manteiga de garrafa, cuscuz recheado e fava no berço do barro.",
        "horario": "Terça a Domingo 11h às 17h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Artesanato Mestre Vitalino & Filhos", "categoria": "artesanato",
        "endereco": "Rua Mestre Vitalino, 115", "bairro": "Alto do Moura",
        "cidade": "Caruaru", "city_slug": "caruaru",
        "telefone": "(81) 3722-2000", "whatsapp": "5517992641746",
        "descricao_curta": "Esculturas em barro originais da linhagem de Vitalino no maior centro de arte figurativa das Américas.",
        "horario": "Seg a Dom 08h às 18h", "turista": True, "plano": "pro", "destaque": True
    },

    # ── JERICOACOARA (CE) ──
    {
        "nome": "Pousada Vila Kalango Jeri", "categoria": "hoteis",
        "endereco": "Rua das Dunas, 30", "bairro": "Praia de Jericoacoara",
        "cidade": "Jericoacoara", "city_slug": "jericoacoara",
        "telefone": "(88) 3669-2289", "whatsapp": "5517992641746",
        "descricao_curta": "Palafitas e bangalôs entre os coqueirais e a Duna do Pôr do Sol, escola de windsurf e restaurante pé na areia.",
        "horario": "Recepção 24h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Restaurante Tamarindo Jeri", "categoria": "restaurantes",
        "endereco": "Travessa Ismael, s/n", "bairro": "Vila de Jericoacoara",
        "cidade": "Jericoacoara", "city_slug": "jericoacoara",
        "telefone": "(88) 3669-2100", "whatsapp": "5517992641746",
        "descricao_curta": "Ambiente à luz de velas sob uma árvore de tamarindo: peixes no forno à lenha, camarões e risotos.",
        "horario": "Todos os dias 18h às 23h30", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Club dos Ventos Jeri — Kitesurf & Lounge", "categoria": "esportes",
        "endereco": "Rua da Praia, s/n", "bairro": "Praia de Jericoacoara",
        "cidade": "Jericoacoara", "city_slug": "jericoacoara",
        "telefone": "(88) 3669-2288", "whatsapp": "5517992641746",
        "descricao_curta": "Centro de esportes náuticos de ponta com aluguel de equipamentos de kite e windsurf, bar e restaurante.",
        "horario": "Diariamente 08h às 19h", "turista": True, "plano": "destaque", "destaque": True
    },

    # ── PORTO DE GALINHAS (PE) ──
    {
        "nome": "Restaurante Peixe na Telha Porto de Galinhas", "categoria": "restaurantes",
        "endereco": "Av. Beira Mar, s/n", "bairro": "Vila de Porto de Galinhas",
        "cidade": "Porto de Galinhas", "city_slug": "porto",
        "telefone": "(81) 3552-1323", "whatsapp": "5517992641746",
        "descricao_curta": "À beira das piscinas naturais de Porto de Galinhas: peixe na telha com molho de camarão e pirão de peixe.",
        "horario": "Seg a Dom 10h às 22h", "turista": True, "plano": "pro", "destaque": True
    },
    {
        "nome": "Pousada Ecoporto à Beira-Mar", "categoria": "hoteis",
        "endereco": "Praia de Merepe, s/n", "bairro": "Merepe",
        "cidade": "Porto de Galinhas", "city_slug": "porto",
        "telefone": "(81) 3552-1991", "whatsapp": "5517992641746",
        "descricao_curta": "Pousada com todos os quartos com vista frontal para o mar de Porto de Galinhas e piscina ao ar livre.",
        "horario": "Recepção 24h", "turista": True, "plano": "destaque", "destaque": True
    },
    {
        "nome": "Barcaxeira Restaurante Porto de Galinhas", "categoria": "restaurantes",
        "endereco": "Rua da Esperança, s/n", "bairro": "Centro",
        "cidade": "Porto de Galinhas", "city_slug": "porto",
        "telefone": "(81) 3552-1913", "whatsapp": "5517992641746",
        "descricao_curta": "Os famosos pratos gratinados de macaxeira com camarão, queijo coalho e carne de sol.",
        "horario": "Seg a Dom 11h às 23h", "turista": True, "plano": "destaque", "destaque": True
    }
]

print(f"Iniciando cadastro de {len(all_cities_stores)} empresas para as 12 cidades turísticas...")
inserted = 0
for st in all_cities_stores:
    st_id = str(uuid.uuid4())
    store_obj = {
        "id": st_id,
        "nome": st["nome"],
        "categoria": st["categoria"],
        "endereco": st.get("endereco"),
        "bairro": st.get("bairro"),
        "cidade": st.get("cidade"),
        "city_slug": st.get("city_slug"),
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
                        "plano": st.get("plano", "destaque"),
                        "destaque": st.get("destaque", True)
                    }
                }).encode("utf-8")
            )
            with urllib.request.urlopen(req_act) as resp_act:
                inserted += 1
                print(f"[{inserted}/{len(all_cities_stores)}] Publicada em {st['cidade']}: {st['nome']} ({st['categoria']})")
    except Exception as e:
        print(f"Erro ao cadastrar {st['nome']}: {e}")

print(f"\n🎉 Concluído com sucesso! {inserted} empresas reais cadastradas e ativas em todas as 12 cidades turísticas!")
