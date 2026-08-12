import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_CLIENT_EMAIL = Deno.env.get("GOOGLE_CLIENT_EMAIL") || "";
const GOOGLE_PRIVATE_KEY = Deno.env.get("GOOGLE_PRIVATE_KEY") || "";

interface IndexingRequest {
  url: string;
  type?: "URL_UPDATED" | "URL_DELETED";
}

serve(async (req) => {
  try {
    const body = await req.json();
    const urls: string[] = Array.isArray(body.urls) ? body.urls : [body.url || "https://www.aquitemachadinhos.com.br"];

    const results = [];

    for (const targetUrl of urls) {
      // Disparo para IndexNow Global
      await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "www.aquitemachadinhos.com.br",
          key: "aquitem2026indexnowkey",
          keyLocation: "https://www.aquitemachadinhos.com.br/aquitem2026indexnowkey.txt",
          urlList: [targetUrl]
        })
      }).catch(() => {});

      results.push({ url: targetUrl, indexNowNotified: true });
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      indexedCount: results.length,
      results
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
