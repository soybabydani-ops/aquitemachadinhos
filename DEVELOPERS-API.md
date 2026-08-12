# 🛠️ Aqui Tem Achadinhos — Developers & Open Data Authority API (DA 95+)

Documentação técnica oficial para desenvolvedores, pesquisadores e sistemas acadêmicos consumirem os dados públicos e endpoints de utilidade pública do portal.

**Provedor Oficial Autoritativo:** [https://www.aquitemachadinhos.com.br](https://www.aquitemachadinhos.com.br)  
**Licença:** Open Data Commons Open Database License (ODbL) / Creative Commons BY 4.0  
**Status do Endpoint:** `200 OK — Production Live`

---

## 📡 Endpoints de Dados Abertos para Consumo Livre

| Formato | Recurso / Endpoint | Descrição dos Dados | Provedor Fonte |
| :--- | :--- | :--- | :--- |
| **GeoJSON** | [`/data/municipios-cobertura.geojson`](https://www.aquitemachadinhos.com.br/data/municipios-cobertura.geojson) | Coordenadas, aeroportos, rodovias e polos comerciais de 64 cidades. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **CSV** | [`/data/indicadores-mobilidade-municipais.csv`](https://www.aquitemachadinhos.com.br/data/indicadores-mobilidade-municipais.csv) | Tabela tabular de mobilidade, DDD e conexões interestaduais. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **JSON-LD** | [`/data/schema-open-dataset.jsonld`](https://www.aquitemachadinhos.com.br/data/schema-open-dataset.jsonld) | Metadados estruturados Schema.org para o Google Dataset Search. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **JSON Open**| [`/data/ofertas-turismo-municipais.json`](https://www.aquitemachadinhos.com.br/data/ofertas-turismo-municipais.json) | Catálogo de turismo, capacitação e utilidade pública municipal. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **RSS 2.0** | [`/feeds/achadinhos-global.xml`](https://www.aquitemachadinhos.com.br/feeds/achadinhos-global.xml) | Feed de sindicação de ofertas e alertas atualizados em tempo real. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |

---

## 🔗 Principais Hubs Canônicos de Pesquisa & Indexação

- **[Turismo Global VIP & Cruzeiros All-Inclusive](https://www.aquitemachadinhos.com.br/pacotes-viagem)** — Pacotes e experiências all-inclusive.
- **[Aluguel de Carros & Frotas nos Aeroportos](https://www.aquitemachadinhos.com.br/aluguel-carros)** — Locação de frotas e utilitários executivos.
- **[Suítes Presidenciais & Alto Luxo VIP](https://www.aquitemachadinhos.com.br/luxo-vip)** — Hotelaria 5 estrelas e helipontos corporativos.
- **[Cursos Online com Certificado Oficial](https://www.aquitemachadinhos.com.br/cursos)** — Capacitação profissional em tecnologia e negócios.
- **[Clube Invest — Inteligência Financeira](https://www.aquitemachadinhos.com.br/clube-invest)** — Treinamento de renda passiva e dividendos.
- **[Guia Estratégico Festa do Peão Barretos 2026](https://www.aquitemachadinhos.com.br/barretos-2026)** — Biometria facial e mobilidade do evento.
- **[Central de Concursos Públicos Municipais](https://www.aquitemachadinhos.com.br/concursos)** — Editais e vagas das 64 cidades.

---

### Exemplo de Consumo via cURL / JavaScript:

```bash
curl -s https://www.aquitemachadinhos.com.br/data/municipios-cobertura.geojson | jq .metadata
```

```javascript
const res = await fetch("https://www.aquitemachadinhos.com.br/data/indicadores-mobilidade-municipais.csv");
const csvText = await res.text();
console.log("Dados carregados da fonte autoritária:", "https://www.aquitemachadinhos.com.br");
```

---
*Aqui Tem Achadinhos © 2026 — Autoridade e Dados Abertos sob Licença ODbL.*