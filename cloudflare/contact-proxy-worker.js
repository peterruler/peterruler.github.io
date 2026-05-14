export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://peterstroessler.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return json(
        {
          ok: false,
          error: "Method not allowed.",
        },
        405,
        corsHeaders
      );
    }

    if (!env.MAILER_URL) {
      return json(
        {
          ok: false,
          error: "MAILER_URL is not configured.",
        },
        500,
        corsHeaders
      );
    }

    const incomingContentType = request.headers.get("content-type") || "application/x-www-form-urlencoded";
    const body = await request.arrayBuffer();

    try {
      const upstreamResponse = await fetch(env.MAILER_URL, {
        method: "POST",
        headers: {
          "Content-Type": incomingContentType,
        },
        body,
      });

      const text = await upstreamResponse.text();
      const contentType = upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8";

      return new Response(text, {
        status: upstreamResponse.status,
        headers: {
          ...corsHeaders,
          "Content-Type": contentType,
        },
      });
    } catch (_error) {
      return json(
        {
          ok: false,
          error: "Proxy request to mailer failed.",
        },
        502,
        corsHeaders
      );
    }
  },
};

function json(payload, status, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}