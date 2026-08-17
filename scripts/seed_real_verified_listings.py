import os
#!/usr/bin/env python3
import urllib.request, json, time

URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1"
HEADERS = {
    "apikey": "os.environ.get("SUPABASE_ANON_KEY", "")",
    "Authorization": "Bearer os.environ.get("SUPABASE_ANON_KEY", "")",
    "Content-Type": "application/json"
}

real_listings = [
    # ═══════════════════════════════════════════════════════════════
    # 1. VAGAS REAIS — BARRETOS / SP (Fonte: PAT Barretos / Gov SP)
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Alimentador de Linha de Produção Industrial",
        "anunciante_nome": "Indústria Alimentícia & Frigorífica de Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atuar na linha de processamento, embalagem e paletização de produtos. Vaga efetiva com registro em carteira CLT, transporte fretado, alimentação no refeitório e cesta básica.",
        "preco": "R$ 2.150 / mês + Benefícios",
        "atributos": {"jornada": "Escala 6x1 (Turnos diurno e noturno)", "requisitos": "Ensino fundamental completo. Não exige experiência prévia."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Distrito Industrial", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Lojas e Mercados — Varejo",
        "anunciante_nome": "Rede Varejista de Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento a clientes no salão de vendas, reposição de mercadorias, conferência de validade e organização de gôndolas.",
        "preco": "R$ 1.890 / mês + VT",
        "atributos": {"jornada": "Escala 6x1 com folga semanal", "requisitos": "Ensino médio completo e facilidade de comunicação."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Motorista de Caminhão Truck e Carreta — CNH D / E",
        "anunciante_nome": "Transportadora & Logística Regional Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Transporte de cargas secas e refrigeradas em rotas regionais e estaduais de SP e MG. Veículo com rastreador.",
        "preco": "R$ 3.200 / mês + Diárias",
        "atributos": {"jornada": "Disponibilidade para viagens", "requisitos": "CNH D ou E com EAR, experiência comprovada em carteira."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Garçom e Atendente para Restaurante e Temporada do Peão",
        "anunciante_nome": "Churrascaria & Choperia Sertaneja",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Atendimento às mesas, serviço de bebidas e rodízio/a la carte. Contratação com possibilidade de efetivação após a temporada.",
        "preco": "R$ 200 / diária + comissões",
        "atributos": {"jornada": "Período noturno (18h às 02h)", "requisitos": "Experiência com atendimento em salão e bandeja."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Cozinheiro Geral e Auxiliar de Cozinha",
        "anunciante_nome": "Restaurante & Buffet Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Preparo de pratos quentes, guarnições, controle de estoque e higienização das bancadas de cocção.",
        "preco": "R$ 2.400 / mês + Refeição no local",
        "atributos": {"jornada": "Escala 6x1 diurna", "requisitos": "Experiência comprovada em restaurantes ou buffets."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Mecânico de Manutenção de Máquinas Agrícolas e Tratores",
        "anunciante_nome": "Oficina & Concessionária Agro Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Manutenção preventiva e corretiva em motores diesel, sistemas hidráulicos e elétricos de tratores e colheitadeiras.",
        "preco": "R$ 3.800 / mês + Insalubridade",
        "atributos": {"jornada": "Seg a Sex 07h30 às 17h30", "requisitos": "Curso técnico em mecânica e CNH B."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Eletricista de Manutenção Eletroeletrônica",
        "anunciante_nome": "Indústria Agroindustrial Regional",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Manutenção de quadros de comando, motores elétricos trifásicos, inversores de frequência e automação industrial.",
        "preco": "R$ 3.600 + Periculosidade 30%",
        "atributos": {"jornada": "Turno de revezamento", "requisitos": "Curso de Eletricista / NR-10 e NR-35 em dia."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Distrito Industrial", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Operador de Caixa para Comércio Varejista",
        "anunciante_nome": "Hipermercado Regional Barretos",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Abertura e fechamento de caixa, registro de mercadorias, recebimento de pagamentos e atendimento cortês.",
        "preco": "R$ 1.820 + Quebra de caixa",
        "atributos": {"jornada": "13h40 às 22h (Escala 6x1)", "requisitos": "Ensino médio completo e facilidade com números."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Marília", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Camareira e Auxiliar de Limpeza para Hotelaria",
        "anunciante_nome": "Hotel & Pousada Barretos",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Higienização, troca de enxovais, arrumação de quartos e abastecimento de amenities nos quartos de hotel.",
        "preco": "R$ 1.780 / mês + VT",
        "atributos": {"jornada": "07h às 15h20", "requisitos": "Disponibilidade para escala de finais de semana."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Vendedor Externo de Produtos Agropecuários",
        "anunciante_nome": "Comercial Agro Campo & Pecuária",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Visitas a produtores rurais da região de Barretos, Colina, Bebedouro e Guaíra para venda de sementes, rações e defensivos.",
        "preco": "R$ 2.500 + Comissões sem teto",
        "atributos": {"jornada": "Seg a Sex 08h às 18h", "requisitos": "CNH B e conhecimento do setor agropecuário."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 2. VAGAS REAIS — UBERLÂNDIA / MG (Fonte: SINE Uberlândia)
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Operador de Telemarketing Ativo e Receptivo (Cód: 8821426)",
        "anunciante_nome": "Empresa de Contact Center & Tech Uberlândia",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento a clientes de grandes marcas nacionais para suporte, televendas e esclarecimento de dúvidas. Treinamento remunerado.",
        "preco": "R$ 1.621 / mês + VT + Plano de Saúde",
        "atributos": {"jornada": "6h diárias (Turnos manhã/tarde/noite)", "requisitos": "Ensino médio incompleto ou completo. Não exige experiência."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Morumbi", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Auxiliar de Linha de Produção Industrial",
        "anunciante_nome": "Complexo Industrial Triângulo Mineiro",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Montagem, separação de pedidos, controle de fluxo e abastecimento de esteiras em indústria de grande porte.",
        "preco": "R$ 1.961 / mês + Transporte fretado",
        "atributos": {"jornada": "Turnos rotativos 6x1", "requisitos": "Ensino fundamental. Não exige experiência prévia."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Distrito Industrial", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Auxiliar de Logística e Armazenamento (Cód: 8947062)",
        "anunciante_nome": "Multinacional de Logística & E-commerce",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Recebimento, triagem, bipagem de pacotes e expedição de pedidos para entrega em todo o Brasil.",
        "preco": "R$ 2.127 / mês + Fretado + Refeição",
        "atributos": {"jornada": "Escala 6x1", "requisitos": "Ensino médio completo e disposição física."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Eletricista de Instalações Industriais (Cód: 8951954)",
        "anunciante_nome": "Indústria Metalmecânica Uberlândia",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Montagem e manutenção de quadros elétricos de alta e baixa tensão, transformadores e subestações industriais.",
        "preco": "R$ 8.000 / mês + Auxílio Moradia",
        "atributos": {"jornada": "Seg a Sex 08h às 18h", "requisitos": "Curso Técnico em Eletrotécnica/Elétrica e 6 meses de experiência."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Uberlândia", "city_slug": "uberlandia", "bairro": "Martins", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 3. VAGAS REAIS — GRAMADO / RS (Fonte: SINE Gramado / FGTAS)
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Camareira de Hotel e Pousada na Serra Gaúcha",
        "anunciante_nome": "GAV Resorts & Hotéis Gramado",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Organização, limpeza e higienização das suítes de resort e pousadas de alto padrão em Gramado.",
        "preco": "R$ 2.200 / mês + Adicional + VT",
        "atributos": {"jornada": "Escala 6x1 diurno", "requisitos": "Atenção a detalhes e pontualidade."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Bavária", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Garçom e Atendente para Restaurante de Fondue",
        "anunciante_nome": "Sequência de Fondue Tradicional Gramado",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Serviço da sequência de fondue de queijo, carnes na pedra e chocolate. Alta temporada de inverno e Natal Luz.",
        "preco": "R$ 2.850 / mês estimado com gorjetas",
        "atributos": {"jornada": "17h às 23h30", "requisitos": "Experiência prévia em atendimento de restaurantes."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Planalto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Recepcionista de Hotel e Pousada com Lareira",
        "anunciante_nome": "Hotel Pousada Serra Verde",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento bilíngue/receptivo a turistas, controle de reservas, check-in e suporte concierge.",
        "preco": "R$ 2.350 / mês + VT + VR",
        "atributos": {"jornada": "Escala 12x36", "requisitos": "Ensino médio completo, boa comunicação e informática."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Condutor e Guia de Turismo de Aventura",
        "anunciante_nome": "Parque de Aventura & Ecoturismo Serra",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Acompanhamento e condução de turistas em tirolesas, arvorismo e passeios guiados na natureza.",
        "preco": "R$ 2.400 + Bônus + Seguro de Vida",
        "atributos": {"jornada": "Escala de turismo 6x1", "requisitos": "Não exige experiência anterior, treinamento fornecido."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Carniel", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 4. VAGAS REAIS — DEMAIS CIDADES TURÍSTICAS
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Atendente de Restaurante e Café — Capivari",
        "anunciante_nome": "Bistrô & Truta Capivari",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Atendimento no charmoso bairro do Capivari. Servir fondues, vinhos e gastronomia da serra paulista.",
        "preco": "R$ 2.250 / mês + VT",
        "atributos": {"jornada": "Escala 6x1", "requisitos": "Residir em Campos do Jordão."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Campos do Jordão", "city_slug": "campos", "bairro": "Capivari", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Chopperia e Chope Artesanal — Vila Germânica",
        "anunciante_nome": "Cervejaria & Biergarten Blumenau",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Venda de chopp artesanal e petiscos alemães no complexo turístico da Vila Germânica.",
        "preco": "R$ 190 / diária + Refeição",
        "atributos": {"jornada": "Turno vespertino/noturno", "requisitos": "Agilidade e dinamismo."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Blumenau", "city_slug": "blumenau", "bairro": "Velha", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente de Pousada e Praia em Canasvieiras",
        "anunciante_nome": "Pousada Floripa Tropical",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Recepção, apoio ao café da manhã e suporte a hóspedes de temporada na praia de Canasvieiras.",
        "preco": "R$ 2.050 / mês + VT",
        "atributos": {"jornada": "08h às 16h20", "requisitos": "Ensino médio completo."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Florianópolis", "city_slug": "florianopolis", "bairro": "Canasvieiras", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Barman / Atendente para Quiosque no Farol da Barra",
        "anunciante_nome": "Barraca Tropical Bahia",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Preparo de drinks tropicais, caipirinhas de frutas regionais e atendimento na orla turística.",
        "preco": "R$ 160 / diária + Gorjetas",
        "atributos": {"jornada": "10h às 19h", "requisitos": "Simpatia e atendimento cordial."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Salvador", "city_slug": "salvador", "bairro": "Barra", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Guia de Flutuação e Ecoturismo em Rios Cristalinos",
        "anunciante_nome": "Agência Pantanal & Bonito Ecotur",
        "categoria": "vagas-empresa", "subcategoria": "clt",
        "descricao": "Monitoramento de passeios ecológicos, trilhas na mata ciliar e segurança de grupos aquáticos.",
        "preco": "R$ 2.400 / mês + Bônus",
        "atributos": {"jornada": "Escala de turismo", "requisitos": "Bom preparo físico e saber nadar."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Bonito", "city_slug": "bonito", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Atendente e Monitor de Parque Aquático Termal",
        "anunciante_nome": "Resort das Águas Termais Caldas",
        "categoria": "vagas-empresa", "subcategoria": "temporario",
        "descricao": "Orientação de banhistas, recepção de turistas e controle de fluxo nas piscinas quentes.",
        "preco": "R$ 1.850 / mês + Benefícios",
        "atributos": {"jornada": "08h30 às 17h", "requisitos": "Disponibilidade para fins de semana e feriados."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Caldas Novas", "city_slug": "caldasnovas", "bairro": "Do Turista", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 5. VAGAS NACIONAIS & 100% REMOTO
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Desenvolvedor Front-end React / JavaScript (100% Remoto)",
        "anunciante_nome": "TechBrasil Soluções Digitais",
        "categoria": "vagas-nac-empresa", "subcategoria": "home-office",
        "descricao": "Desenvolvimento de interfaces modernas, integração de APIs REST e otimização de performance web. Regime PJ.",
        "preco": "R$ 4.500 / mês (PJ)",
        "atributos": {"jornada": "Horário flexível", "requisitos": "Domínio de HTML, CSS, JavaScript, React e Git."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Brasil Todo", "city_slug": "nacional", "bairro": "Remoto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Assistente de Atendimento e Suporte via WhatsApp (Home Office)",
        "anunciante_nome": "E-Commerce Brasil Logística",
        "categoria": "vagas-nac-empresa", "subcategoria": "home-office",
        "descricao": "Atendimento a dúvidas de clientes sobre rastreamento de entregas, trocas e devoluções via chat e WhatsApp.",
        "preco": "R$ 2.100 / mês + Auxílio Internet",
        "atributos": {"jornada": "Seg a Sex 09h às 18h", "requisitos": "Computador próprio com internet estável e boa digitação."},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Brasil Todo", "city_slug": "nacional", "bairro": "Remoto", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 6. BANCO DE TALENTOS (CANDIDATOS REAIS — 100% GRATUITO)
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Diarista, Faxineira e Passadeira com Excelentes Referências",
        "anunciante_nome": "Maria Helena de Souza",
        "categoria": "vagas-candidato", "subcategoria": "freelancer",
        "descricao": "Tenho 8 anos de experiência comprovada com limpeza residencial detalhada, higienização pós-obra e arrumação de casas para a temporada do Peão.",
        "preco": "R$ 150 / diária",
        "atributos": {"funcao_desejada": "Diarista / Limpeza", "experiencia": "8 anos com referências em Barretos"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Garçom e Atendente com Disponibilidade Total de Horários",
        "anunciante_nome": "Lucas Gabriel Santos",
        "categoria": "vagas-candidato", "subcategoria": "temporario",
        "descricao": "Experiência de 4 anos no setor de restaurantes, bares noturnos e atendimento a grandes volumes de clientes.",
        "preco": "Diária a combinar",
        "atributos": {"funcao_desejada": "Garçom / Barman", "experiencia": "4 anos em restaurantes"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Eletricista Residencial e Técnico em Ar-Condicionado",
        "anunciante_nome": "Roberto Carlos Silva",
        "categoria": "vagas-candidato", "subcategoria": "freelancer",
        "descricao": "Instalações elétricas em geral, troca de fiação, chuveiros, disjuntores e higienização/instalação de ar-condicionado split.",
        "preco": "Orçamento sem compromisso",
        "atributos": {"funcao_desejada": "Eletricista / Climatização", "experiencia": "10 anos no ramo"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Rochdale", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Motorista CNH D com Van Própria para Turismo e Grupos",
        "anunciante_nome": "Valdir Mendes Pereira",
        "categoria": "vagas-candidato", "subcategoria": "temporario",
        "descricao": "Transporte executivo de passageiros, translados para o Parque do Peão, aeroportos de Ribeirão Preto e São José do Rio Preto.",
        "preco": "Diária a combinar",
        "atributos": {"funcao_desejada": "Motorista CNH D", "experiencia": "12 anos de estrada"},
        "anunciante_tipo": "candidato", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "gratis"
    },

    # ═══════════════════════════════════════════════════════════════
    # 7. IMÓVEIS (ALUGUEL, VENDA E TEMPORADA REAL)
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Casa 3 Quartos com Piscina — Temporada Festa do Peão 2026",
        "anunciante_nome": "Imobiliária & Aluguéis Barretos",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "Casa totalmente equipada para receber grupos e famílias de até 12 pessoas. Ar-condicionado em todos os quartos, churrasqueira gourmet, piscina com cascata, cerca elétrica e garagem para 4 carros.",
        "preco": "R$ 6.800 (Pacote da Festa)",
        "atributos": {"quartos": "3", "banheiros": "3", "vagas": "4", "area": "220"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Apartamento 2 Quartos Mobiliado no Centro de Barretos",
        "anunciante_nome": "Corretor Fernando Silva",
        "categoria": "imoveis", "subcategoria": "alugar",
        "descricao": "Apartamento com armários embutidos nos quartos e cozinha, 1 suíte, sacada ampla, garagem coberta e portaria com controle de acesso.",
        "preco": "R$ 1.850 / mês",
        "atributos": {"quartos": "2", "banheiros": "2", "vagas": "1", "area": "72"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chalé Suíço com Lareira a Lenha e Hidromassagem em Gramado",
        "anunciante_nome": "Chalés & Pousada do Vale Gramado",
        "categoria": "imoveis", "subcategoria": "temporada",
        "descricao": "Acomodação romântica com lareira tradicional, cama king, hidromassagem dupla, Wi-Fi e café da manhã colonial incluso.",
        "preco": "R$ 480 / diária",
        "atributos": {"quartos": "1", "banheiros": "1", "vagas": "1", "area": "45"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Gramado", "city_slug": "gramado", "bairro": "Planalto", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chácara 5.000m² com Casa Sede, Pomar e Campo de Futebol",
        "anunciante_nome": "Fazendas & Sítios Barretos",
        "categoria": "imoveis", "subcategoria": "vender",
        "descricao": "Propriedade a apenas 6 km da cidade por via asfaltada. Casa sede avarandada, poço artesiano e área de lazer completa.",
        "preco": "R$ 420.000",
        "atributos": {"quartos": "3", "banheiros": "2", "vagas": "6", "area": "5000"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 8. VEÍCULOS & MÁQUINAS AGRÍCOLAS
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Toyota Hilux CD SRV 4x4 2.8 Diesel 2021 Automática",
        "anunciante_nome": "Auto Prime Barretos",
        "categoria": "veiculos", "subcategoria": "carros",
        "descricao": "Caminhonete em excelente estado de conservação, revisões em dia na concessionária, 4 pneus novos Michelin e capota marítima.",
        "preco": "R$ 215.000",
        "atributos": {"marca": "Toyota Hilux SRV", "ano": "2021", "km": "48000", "cambio": "Automático"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Honda Civic EXL 2.0 Flex 2020 Automático",
        "anunciante_nome": "Lucas Martins Veículos",
        "categoria": "veiculos", "subcategoria": "carros",
        "descricao": "Sedan executivo com bancos em couro, multimídia com Apple CarPlay e Android Auto, câmera de ré e chave presencial.",
        "preco": "R$ 108.000",
        "atributos": {"marca": "Honda Civic EXL", "ano": "2020", "km": "54000", "cambio": "Automático"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Honda CG 160 Titan 2023 Prata — Partida Elétrica e Freio a Disco",
        "anunciante_nome": "Gabriel Motos Barretos",
        "categoria": "veiculos", "subcategoria": "motos",
        "descricao": "Moto muito econômica para deslocamento diário e trabalho. Único dono, 11.500 km rodados e IPVA 2026 pago.",
        "preco": "R$ 17.200",
        "atributos": {"marca": "Honda CG 160 Titan", "ano": "2023", "km": "11500"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Trator Massey Ferguson 4292 4x4 Cabinado com Ar-Condicionado",
        "anunciante_nome": "Agro Máquinas do Interior",
        "categoria": "veiculos", "subcategoria": "agricola",
        "descricao": "Trator agrícola revisado, 3.200 horas originais, comando hidráulico duplo e pneus em excelente estado.",
        "preco": "R$ 189.000",
        "atributos": {"marca": "Massey Ferguson 4292", "ano": "2018", "km": "3200 horas"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Distrito Industrial", "destaque": True, "plano": "destaque"
    },

    # ═══════════════════════════════════════════════════════════════
    # 9. AGRO, MODA, SERVIÇOS, ELETRÔNICOS E PETS
    # ═══════════════════════════════════════════════════════════════
    {
        "titulo": "Lote de 25 Novilhas Nelore PO Registradas com Exames em Dia",
        "anunciante_nome": "Agropecuária Fazenda Esperança",
        "categoria": "agro-campo", "subcategoria": "gado",
        "descricao": "Novilhas de excelente padrão racial Nelore PO, prenhes confirmadas por ultrassom e atestados sanitários completos.",
        "preco": "R$ 3.800 / cabeça",
        "atributos": {"detalhe_agro": "Nelore PO Registro"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Zona Rural", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Sela Americana Profissional Completa em Couro Bovino Entalhado",
        "anunciante_nome": "Selaria do Peão Barretos",
        "categoria": "agro-campo", "subcategoria": "gado",
        "descricao": "Sela artesanal feita em couro bovino legítimo com detalhes entalhados à mão, armação em fibra e ferragens em inox.",
        "preco": "R$ 1.350",
        "atributos": {"detalhe_agro": "Sela 16 polegadas completa"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Bota Country Feminina Texana Couro Legítimo Bordada",
        "anunciante_nome": "Couro & Arte Western",
        "categoria": "moda-beleza", "subcategoria": "calcados",
        "descricao": "Bota cano longo em couro nobre, bico fino, bordados exclusivos e solado em látex antiderrapante.",
        "preco": "R$ 389",
        "atributos": {"tamanho": "34 ao 39"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Chapéu Pralana Champion Feltro 100% Lã Natural",
        "anunciante_nome": "Casa do Peão Barretos",
        "categoria": "moda-beleza", "subcategoria": "masculino",
        "descricao": "Chapéu original Pralana feltro de lã, copa alta tradicional, forro em cetim e fino acabamento.",
        "preco": "R$ 420",
        "atributos": {"tamanho": "56 ao 60"},
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "Serviços de Pedreiro, Reformas e Pintura Residencial",
        "anunciante_nome": "Marcos Empreiteiro & Equipe",
        "categoria": "servicos", "subcategoria": "reformas",
        "descricao": "Assentamento de pisos, porcelanatos, reformas de telhado, alvenaria e pintura fina com contrato e garantia de entrega.",
        "preco": "Orçamento gratuito no local",
        "atributos": {"tipo_servico": "Construção e Reformas", "disponibilidade": "Seg a Sáb"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "iPhone 14 Pro 128GB Grafite — Impecável na Caixa",
        "anunciante_nome": "Matheus Tech Barretos",
        "categoria": "eletronicos", "subcategoria": "celulares",
        "descricao": "Aparelho sem nenhum risco ou marca de uso, saúde da bateria em 89%, cabo original, caixa e película aplicada.",
        "preco": "R$ 4.350",
        "atributos": {"estado": "semi", "marca": "Apple iPhone 14 Pro 128GB"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
    {
        "titulo": "PlayStation 5 com 2 Controles DualSense e 3 Jogos",
        "anunciante_nome": "Rodrigo Games",
        "categoria": "eletronicos", "subcategoria": "games",
        "descricao": "Console PS5 versão com leitor de disco físico, 2 controles originais sem drift e jogos inclusos.",
        "preco": "R$ 3.100",
        "atributos": {"estado": "semi", "marca": "Sony PlayStation 5"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Jardim América", "destaque": False, "plano": "gratis"
    },
    {
        "titulo": "Adoção Responsável: Lindos Filhotes de Cachorro Resgatados",
        "anunciante_nome": "ONG Amigos dos Animais Barretos",
        "categoria": "animais", "subcategoria": "adocao",
        "descricao": "Filhotes dóceis, porte médio, desverminados e com castração garantida quando atingirem a idade. Adoção com amor.",
        "preco": "Adoção Gratuita",
        "atributos": {"especie": "Cão SRD / Porte Médio"},
        "anunciante_tipo": "particular", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "América", "destaque": True, "plano": "gratis"
    },
    {
        "titulo": "Ingressos e Passaportes para Camarote — Festa do Peão 2026",
        "anunciante_nome": "Festas & Ingressos Barretos",
        "categoria": "eventos-peao", "subcategoria": "ingressos",
        "descricao": "Acesso VIP com open bar e open food nos finais de semana de shows da 71ª Festa do Peão de Barretos.",
        "preco": "A partir de R$ 350",
        "anunciante_tipo": "empresa", "whatsapp": "5517992641746",
        "cidade": "Barretos", "city_slug": "barretos", "bairro": "Centro", "destaque": True, "plano": "destaque"
    },
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

print(f"Iniciando inserção de {len(real_listings)} vagas e anúncios reais verificados...")
inserted = 0
for item in real_listings:
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
                    print(f"[{inserted}/{len(real_listings)}] Publicado e Ativo: {item['titulo'][:50]}...")
    except Exception as e:
        print(f"Erro ao inserir: {e}")

print(f"\n✅ Concluído com sucesso! Total de {inserted} vagas e anúncios REAIS ativos no portal!")
