export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // --- SIMULAÇÃO DE FIREWALL (Para apresentar no trabalho) ---
    // Se você quiser testar o bloqueio na sua máquina, mude para true
    // Ou coloque para bloquear um país específico ex: if (request.cf.country === "US")
    const forçarBloqueioSeguranca = true; 

    if (forçarBloqueioSeguranca) {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Acesso Bloqueado - Cloudflare WAF</title>
          <style>
            body { background: #111; color: #fff; font-family: sans-serif; text-align: center; padding-top: 100px; }
            .badge { background: #e74c3c; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
            .box { border: 1px solid #333; max-width: 500px; margin: 0 auto; padding: 30px; background: #1e1e1e; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>🛡️ Cloudflare Security Edge</h2>
            <p><span class="badge">HTTP 403 Forbidden</span></p>
            <p>O seu endereço de IP ou a sua requisição foi interceptada pelas regras globais de mitigação do Worker.</p>
            <hr style="border-color: #333;">
            <p style="color: #888; font-size: 12px;">Reputação do IP (Threat Score): 85/100 | ID da Requisição: ${request.headers.get("cf-ray")}</p>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: { "content-type": "text/html;charset=UTF-8" }
        }
      );
    }

    // Se passar pelo filtro, ele puxa os assets estáticos normais (o botão e o HTML)
    return await env.ASSETS.fetch(request);
  }
};