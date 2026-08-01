// Sitemap dinâmico — gera sitemap.xml com todas as lojas ativas
// Deploy: supabase functions deploy sitemap --no-verify-jwt
// URL: https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/sitemap
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } }
  );
  const { data: stores } = await supa.from("stores").select("id").eq("status", "ativo");
  const base = "https://aquitemachadinhos.com.br";
  const today = new Date().toISOString().slice(0, 10);
  let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const pages = ["/","/categoria","/ofertas","/turista","/anuncie","/cadastro","/motoristas","/busca","/sobre","/contato","/faq"];
  pages.forEach((p) => { xml += `<url><loc>${base}${p}</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>`; });
  (stores || []).forEach((s) => { xml += `<url><loc>${base}/loja.html?id=${s.id}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`; });
  xml += "</urlset>";
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "max-age=3600" } });
});
