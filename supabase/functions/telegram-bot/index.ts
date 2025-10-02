// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

console.log(`Function "telegram-bot" up and running!`);

import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

const handleUpdate = webhookCallback(bot, "std/http");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(req.url);
    const functionSecret = Deno.env.get('FUNCTION_SECRET');

    // If called as a Telegram webhook, require secret check
    if (url.searchParams.has('secret')) {
      if (!functionSecret || url.searchParams.get('secret') !== functionSecret) {
        return new Response('not allowed', { status: 405, headers: corsHeaders });
      }
      const res = await handleUpdate(req);
      const headers = new Headers(res.headers);
      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v as string));
      return new Response(await res.text(), { status: res.status, headers });
    }

    // API mode for app requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action as string | undefined;

    if (!action) {
      return new Response(JSON.stringify({ ok: false, description: 'Missing action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'getMe') {
      const me = await bot.api.getMe();
      return new Response(JSON.stringify({ ok: true, result: me }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'sendMessage') {
      const chatId = body?.chatId;
      const text = body?.text ?? body?.message;
      if (!chatId || !text) {
        return new Response(JSON.stringify({ ok: false, description: 'chatId and text are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const sent = await bot.api.sendMessage(chatId, text);
      return new Response(JSON.stringify({ ok: true, result: sent }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: false, description: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('telegram-bot error', err);
    return new Response(JSON.stringify({ ok: false, description: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});