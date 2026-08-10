# AQUITEM — Operação de Growth Automatizada

## Princípio
Toda comunicação é institucional. O nome pessoal da fundadora não aparece em páginas, mensagens ou automações.

## Identidade de envio
- AQUITEM | Parcerias Locais
- AQUITEM | Empresas Fundadoras
- E-mail corporativo de parcerias
- WhatsApp Business da AQUITEM

## Funil
1. Cidade/landing/evento leva à página `fundadores.html`.
2. Lead entra em `city_leads` com cidade, origem, UTM, programa e prioridade.
3. Trigger calcula prioridade.
4. Painel mostra Fundadora e Prioridade alta.
5. Um fluxo n8n/Make futuro recebe webhook do Supabase.
6. Mensagem institucional só é enviada para leads com consentimento e canal permitido.
7. Lead é revisado e convertido em empresa pelo painel.
8. Empresa publicada recebe checklist de perfil completo.
9. Após métricas de clique, entra em sequência de upgrade/renovação.

## Webhook recomendado
Evento: `INSERT` em `public.city_leads` quando `founder_interest = true`.

Payload mínimo:
```json
{
  "lead_id": "uuid",
  "city_slug": "gramado",
  "empresa_nome": "Empresa",
  "whatsapp": "5517...",
  "email": "empresa@dominio.com",
  "priority_score": 60,
  "program": "empresas_fundadoras"
}
```

## Regras de automação
- Não enviar WhatsApp sem consentimento.
- Incluir opção clara de parar contatos.
- Usar baixo volume e personalização real.
- Registrar todas as interações no CRM.
- Não usar dados coletados em desacordo com termos das plataformas.

## Métricas semanais
- inscrições fundadoras por cidade;
- taxa de resposta;
- lead com prioridade alta;
- lead → empresa publicada;
- perfil completo em até 48h;
- clique de WhatsApp por empresa;
- upgrade de plano;
- custo por empresa ativa.
