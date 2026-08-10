#!/usr/bin/env python3
import urllib.request, json, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc",
    "Content-Type": "application/json"
}

listings = [
    # ── 1. VAGAS DE EMPREGO (EMPRESAS CONTRATANDO) ──
    {
        "titulo": "Garçom e Atendente Noturno para Restaurante e Churrascaria",
        "anunciante_nome": "Churrascaria Boiadeiro & Grill",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Contratação para atendimento no salão e bebidas durante a temporada de alta movimentação da Festa do Peão. Refeição e transporte fornecidos.",
        "preco": "R$ 200 / diária + comissão",
        "atributos": {"jornada": "18h às 02h", "requisitos": "Experiência com bandeja"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Cozinheiro Chefe e Auxiliar de Cozinha",
        "anunciante_nome": "Restaurante Sabor Caipira",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Vaga efetiva CLT para preparação de pratos típicos, carnes e guarnições. Salário fixo + cesta básica + vale transporte.",
        "preco": "R$ 2.450 / mês",
        "atributos": {"jornada": "Escala 6x1 diurno", "requisitos": "Experiência comprovada"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Recepcionista de Hotel e Pousada",
        "anunciante_nome": "Pousada das Rosas",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Atendimento cordial a hóspedes e turistas, check-in, check-out e atendimento telefônico/WhatsApp.",
        "preco": "R$ 1.900 + adicionais",
        "atributos": {"jornada": "Escala 12x36", "requisitos": "Boa comunicação e informática básica"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Vendedora de Moda Country e Botas",
        "anunciante_nome": "Boutique Texas Western",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Vendas presenciais na loja de artigos country, calçados e acessórios. Comissões atrativas sobre o faturamento.",
        "preco": "R$ 1.850 + Comissões",
        "atributos": {"jornada": "Seg a Sáb 09h às 19h", "requisitos": "Experiência em vendas de moda"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Segurança e Controlador de Acesso",
        "anunciante_nome": "Guarda Forte Eventos",
        "categoria": "vagas-empresa", "subcategoria": "freelancer",
        "descricao": "Plantões para controle de portaria, fiscalização de ingressos e apoio a eventos fechados no mês de agosto.",
        "preco": "R$ 170 / diária",
        "atributos": {"jornada": "Plantões noturnos", "requisitos": "Porte físico e pontualidade"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Industrial", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Barman / Bartender para Choperia e Eventos",
        "anunciante_nome": "Pub Sertanejo Barretos",
        "categoria": "vagas-empresa", "subcategoria": "freelancer",
        "descricao": "Preparo de drinks clássicos, caipirinhas, coquetéis autorais e chopp durante a temporada de shows.",
        "preco": "R$ 220 / diária",
        "atributos": {"jornada": "20h às 04h", "requisitos": "Experiência com coquetelaria"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Chocolateria e Café em Gramado",
        "anunciante_nome": "Chocolates da Serra Gramado",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento a turistas, degustação de chocolates artesanais, montagem de cestas para presente e operação de cafeteria.",
        "preco": "R$ 2.100 + VT + VR",
        "atributos": {"jornada": "Escala 6x1", "requisitos": "Simpatia e bom atendimento"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Garçom para Casa de Fondue na Serra Gaúcha",
        "anunciante_nome": "Restaurante Chalé Suíço",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Serviço da tradicional sequência de fondues de Gramado. Remuneração acima da média com comissões de serviço.",
        "preco": "R$ 2.800 / mês estimado",
        "atributos": {"jornada": "17h30 às 23h40", "requisitos": "Experiência em restaurantes"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Planalto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Restaurante e Café — Capivari",
        "anunciante_nome": "Bistrô do Vale Campos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento de mesas e cafeteria no centro turístico de Campos do Jordão.",
        "preco": "R$ 2.200 / mês",
        "atributos": {"jornada": "Escala 6x1", "requisitos": "Residir em Campos do Jordão"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Campos do Jordão", "city_slug": "campos", "bairro": "Capivari", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Chopperia e Oktoberfest em Blumenau",
        "anunciante_nome": "Biergarten Blumenau",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Venda de chopp artesanal e petiscos típicos alemães no complexo da Vila Germânica.",
        "preco": "R$ 190 / diária",
        "atributos": {"jornada": "Vespertino/Noturno", "requisitos": "Agilidade e dinamismo"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Blumenau", "city_slug": "blumenau", "bairro": "Velha", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Pousada e Praia em Floripa",
        "anunciante_nome": "Pousada Mar Azul Floripa",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Recepção, café da manhã e suporte aos hóspedes em Canasvieiras.",
        "preco": "R$ 2.000 + VT",
        "atributos": {"jornada": "08h às 16h20", "requisitos": "Ensino médio completo"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Florianópolis", "city_slug": "florianopolis", "bairro": "Canasvieiras", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Barman para Quiosque no Farol da Barra",
        "anunciante_nome": "Barraca Tropical Salvador",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Preparo de caipirinhas tropicais e atendimento na orla da praia da Barra.",
        "preco": "R$ 160 / diária + gorjetas",
        "atributos": {"jornada": "10h às 19h", "requisitos": "Bom atendimento ao cliente"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Salvador", "city_slug": "salvador", "bairro": "Barra", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Vendedor Externo e Comercial no Triângulo Mineiro",
        "anunciante_nome": "Distribuidora Triângulo Alimentos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento a mercados e panificadoras em Uberlândia e cidades vizinhas.",
        "preco": "R$ 2.600 + Comissões",
        "atributos": {"jornada": "Seg a Sex 08h às 18h", "requisitos": "CNH B e veículo próprio"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Martins", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Guia de Ecoturismo e Flutuação em Bonito",
        "anunciante_nome": "Bonito Aventura Ecotur",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Monitoramento de passeios ecológicos, trilhas e rios cristalinos.",
        "preco": "R$ 2.400 + Bônus",
        "atributos": {"jornada": "Escala turismo", "requisitos": "Afinidade com a natureza"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Bonito", "city_slug": "bonito", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente e Monitor de Parque Aquático em Caldas",
        "anunciante_nome": "Clube das Águas Termais",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Recepção e orientação de turistas nas piscinas termais e atrações aquáticas.",
        "preco": "R$ 1.850 / mês",
        "atributos": {"jornada": "08h30 às 17h", "requisitos": "Disponibilidade de finais de semana"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Caldas Novas", "city_slug": "caldasnovas", "bairro": "Do Turista", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Desenvolvedor Front-end React / JavaScript (100% Remoto)",
        "anunciante_nome": "Agência Digital TechBrasil",
        "categoria": "vagas-nac-empresa", "subcategoria": "home-office",
        "descricao": "Desenvolvimento de páginas e aplicações web. Trabalho 100% home office com horários flexíveis.",
        "preco": "R$ 4.500 / mês (PJ)",
        "atributos": {"jornada": "Flexível", "requisitos": "HTML, CSS, JS, Tailwind e Git"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Brasil Todo", "city_slug": "nacional", "bairro": "Remoto", "destaque": True, "plano": "destaque"
    },

    # ── 2. BANCO DE TALENTOS (CANDIDATOS - 100% GRÁTIS) ──
    {
        "titulo": "Diarista, Faxineira e Passadeira com Experiência",
        "anunciante_nome": "Maria Helena de Souza",
        "categoria": "vagas-candidato", "subcategoria": "freelancer",
        "descricao": "Experiência com limpeza residencial detalhada, pós-obra e apartamentos de temporada. Pontual, caprichosa e com excelentes referências.",
        "preco": "R$ 150 / diária",
        "atributos": {"funcao_desejada": "Diarista / Limpeza", "experiencia": "8 anos com referências"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Garçom e Atendente com Disponibilidade Total para o Peão",
        "anunciante_nome": "Lucas Gabriel Santos",
        "categoria": "vagas-candidato", "subcategoria": "temporario",
        "descricao": "Atendimento rápido, comunicativo e acostumado com ritmo acelerado em grandes eventos.",
        "preco": "Diária a combinar",
        "atributos": {"funcao_desejada": "Garçom / Barman", "experiencia": "4 anos em restaurantes"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Recepcionista e Concierge com Inglês Intermediário",
        "anunciante_nome": "Camila Brandão",
        "categoria": "vagas-candidato", "subcategoria": "clt",
        "descricao": "Formação em turismo e hotelaria. Experiência com sistemas de reservas e atendimento presencial e digital.",
        "preco": "Pretensão: R$ 2.200",
        "atributos": {"funcao_desejada": "Recepção / Atendimento", "escolaridade": "Superior em Turismo"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Eletricista Residencial e Técnico em Ar-Condicionado",
        "anunciante_nome": "Roberto Carlos Silva",
        "categoria": "vagas-candidato", "subcategoria": "freelancer",
        "descricao": "Instalação e manutenção elétrica residencial e comercial, higienização de ar split e ferramentas próprias.",
        "preco": "Orçamento sem compromisso",
        "atributos": {"funcao_desejada": "Eletricista / Climatização", "experiencia": "10 anos no ramo"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Rochdale", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Motorista CNH D com Veículo Próprio e Van",
        "anunciante_nome": "Valdir Mendes Pereira",
        "categoria": "vagas-candidato", "subcategoria": "temporario",
        "descricao": "Disponível para transporte de grupos, viagens intermunicipais e corridas durante a Festa do Peão.",
        "preco": "Diária a combinar",
        "atributos": {"funcao_desejada": "Motorista de Van / Turismo", "experiencia": "12 anos com CNH D"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "gratis"
    },

    # ── 3. IMÓVEIS ──
    {
        "titulo": "Casa 3 Quartos com Piscina — Temporada Festa do Peão 2026",
        "anunciante_nome": "Imóveis Barretos Prime",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "Excelente casa para temporada, acomoda até 12 pessoas confortavelmente. Ar condicionado em todos os quartos, churrasqueira, piscina e garagem para 4 carros. A 10 min do Parque do Peão.",
        "preco": "R$ 6.800 (Pacote da Festa)",
        "atributos": {"quartos": "3", "banheiros": "3", "vagas": "4", "area": "220"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Apartamento 2 Quartos Mobiliado no Centro",
        "anunciante_nome": "Corretor Fernando Silva",
        "categoria": "imoveis", "subcategoria": "alugar",
        "descricao": "Apartamento no centro de Barretos, com sala 2 ambientes, sacada, armários planejados, 1 suíte, cozinha completa e portaria 24h.",
        "preco": "R$ 1.850 / mês",
        "atributos": {"quartos": "2", "banheiros": "2", "vagas": "1", "area": "72"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chalé Suíço com Lareira e Hidromassagem em Gramado",
        "anunciante_nome": "Chalés do Vale Gramado",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "Hospedagem charmosa em meio aos pinheiros de Gramado. Cama king, lareira a lenha, banheira de hidromassagem e café da manhã.",
        "preco": "R$ 480 / diária",
        "atributos": {"quartos": "1", "banheiros": "1", "vagas": "1", "area": "45"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Planalto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chácara 5.000m² com Casa Sede, Pomar e Piscina",
        "anunciante_nome": "Fazendas & Sítios Barretos",
        "categoria": "imoveis", "subcategoria": "vender",
        "descricao": "Propriedade a apenas 6 km da cidade por asfalto. Casa com 3 quartos, varanda gourmet, poço artesiano, campo e pomar.",
        "preco": "R$ 420.000",
        "atributos": {"quartos": "3", "banheiros": "2", "vagas": "6", "area": "5000"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },

    # ── 4. VEÍCULOS & NÁUTICA ──
    {
        "titulo": "Toyota Hilux CD SRV 4x4 2.8 Diesel 2021",
        "anunciante_nome": "Auto Prime Barretos",
        "categoria": "veiculos", "subcategoria": "carros",
        "descricao": "Caminhonete em estado de zero km, todas as revisões na concessionária, 4 pneus novos Michelin e capota marítima.",
        "preco": "R$ 215.000",
        "atributos": {"marca": "Toyota Hilux SRV", "ano": "2021", "km": "48000", "cambio": "Automático"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Honda Civic EXL 2.0 Flex 2020 Automático",
        "anunciante_nome": "Lucas Martins Veículos",
        "categoria": "veiculos", "subcategoria": "carros",
        "descricao": "Sedan impecável, bancos em couro, multimídia com CarPlay, câmera de ré e chave presencial.",
        "preco": "R$ 108.000",
        "atributos": {"marca": "Honda Civic EXL", "ano": "2020", "km": "54000", "cambio": "Automático"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Trator Massey Ferguson 4292 4x4 Cabinado",
        "anunciante_nome": "Agro Máquinas do Interior",
        "categoria": "veiculos", "subcategoria": "agricola",
        "descricao": "Trator revisado com 3.200 horas originais. Cabine com ar-condicionado, tomada de força e comando duplo.",
        "preco": "R$ 189.000",
        "atributos": {"marca": "Massey Ferguson 4292", "ano": "2018", "km": "3200 horas"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Distrito Industrial", "destaque": True, "plano": "destaque"
    },

    # ── 5. SERVIÇOS PROFISSIONAIS ──
    {
        "titulo": "Serviços de Pedreiro, Reformas e Pintura Fina",
        "anunciante_nome": "Marcos Empreiteiro & Equipe",
        "categoria": "servicos", "subcategoria": "reformas",
        "descricao": "Assentamento de porcelanato, telhados, alvenaria, gesso e pintura residencial e comercial com contrato e garantia.",
        "preco": "Orçamento gratuito no local",
        "atributos": {"tipo_servico": "Construção Civil e Reformas", "disponibilidade": "Seg a Sáb"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Churrasqueiro Profissional para Festas e Confraternizações",
        "anunciante_nome": "Mestre do Churrasco Barretos",
        "categoria": "servicos", "subcategoria": "eventos",
        "descricao": "Carnes no ponto certo, cortes nobres na parrilla e acompanhamentos completos para sua festa.",
        "preco": "Diária / Pacote sob consulta",
        "atributos": {"tipo_servico": "Churrasqueiro e Buffet", "disponibilidade": "Fins de semana e temporada"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },

    # ── 6. ELETRÔNICOS & TECH ──
    {
        "titulo": "iPhone 14 Pro 128GB Grafite — Impecável na Caixa",
        "anunciante_nome": "Matheus Tech",
        "categoria": "eletronicos", "subcategoria": "celulares",
        "descricao": "Sem riscos, bateria 89%, acompanha cabo original, caixa e película 3D aplicada.",
        "preco": "R$ 4.350",
        "atributos": {"estado": "semi", "marca": "Apple iPhone 14 Pro"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Notebook Dell Inspiron Core i7 16GB SSD 512GB",
        "anunciante_nome": "Informática Triângulo",
        "categoria": "eletronicos", "subcategoria": "computadores",
        "descricao": "Notebook ultra rápido para trabalho e estudos. Tela 15.6 Full HD, bateria com 5h de autonomia.",
        "preco": "R$ 2.750",
        "atributos": {"estado": "semi", "marca": "Dell Inspiron 15"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Martins", "destaque": True, "plano": "destaque"
    },

    # ── 7. AGRO & FAZENDAS ──
    {
        "titulo": "Lote de 25 Novilhas Nelore PO Registradas",
        "anunciante_nome": "Agropecuária Fazenda Esperança",
        "categoria": "agro-campo", "subcategoria": "gado",
        "descricao": "Excelente padrão genético, vacinadas contra brucelose e aftosa, prenhes confirmadas por ultrassom.",
        "preco": "R$ 3.800 / cabeça",
        "atributos": {"detalhe_agro": "Nelore PO Registro"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Sela Americana Profissional Completa em Couro Bovino",
        "anunciante_nome": "Selaria do Peão Barretos",
        "categoria": "agro-campo", "subcategoria": "gado",
        "descricao": "Sela artesanal em couro legítimo entalhado, armação em fibra leve, acompanha loro e estribo.",
        "preco": "R$ 1.350",
        "atributos": {"detalhe_agro": "Sela 16 polegadas"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },

    # ── 8. MODA, PETS, EVENTOS, MÓVEIS ──
    {
        "titulo": "Vestido de Festa Longo com Pedraria e Fenda",
        "anunciante_nome": "Ateliê Elegance",
        "categoria": "moda-beleza", "subcategoria": "festas",
        "descricao": "Vestido usado uma única vez em baile country. Tamanho M (38-40), terracota com bordados em vidrilhos.",
        "preco": "R$ 380",
        "atributos": {"tamanho": "M / 38-40"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Filhotes de Golden Retriever com Pedigree e Vacinação",
        "anunciante_nome": "Canil Vale Dourado",
        "categoria": "animais", "subcategoria": "adocao",
        "descricao": "Filhotes com linhagem importada, vermifugados e com primeira dose de vacina V10 importada.",
        "preco": "R$ 1.800",
        "atributos": {"especie": "Cão Golden Retriever"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim dos Coqueiros", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Ingressos e Passaportes para Camarote — Festa do Peão 2026",
        "anunciante_nome": "Festas & Ingressos Barretos",
        "categoria": "eventos-peao", "subcategoria": "ingressos",
        "descricao": "Acesso VIP para o Parque do Peão nos finais de semana de shows com open bar e open food.",
        "preco": "A partir de R$ 350",
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    }
]

print("Iniciando inserção no banco de dados...")
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

print(f"\nFinalizado! Total de {inserted} listings e vagas ativos no banco de dados!")
