import { Bot, webhookCallback } from 'grammy';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is missing');

const bot = new Bot(token);

// --- Initialize Groq AI ---
const groqKey = process.env.GROQ_API_KEY;
const groq = groqKey ? new Groq({ apiKey: groqKey }) : null;

// --- Initialize Supabase (for /prices command) ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// --- SYSTEM PROMPT ---
const SYSTEM_PROMPT = `You are the official AI assistant for Cee Writing Service, a premium professional writing company based in Nigeria that serves clients globally.

Your personality: Warm, professional, knowledgeable, and helpful. You speak with confidence and a friendly tone.

Services offered:
- Professional CV / Resume writing (ATS-optimized)
- Cover Letter writing
- Statement of Purpose (SOP) / Personal Statement
- LinkedIn Profile Optimization
- Academic Essays & Research Papers
- Business Plans & Proposals

Key info:
- Website: https://ceewriting.com
- WhatsApp: https://wa.me/2349056752549
- Telegram Channel: @ceewritingservice

Rules:
1. Answer ANY question the user asks — career advice, writing tips, interview prep, scholarship guidance, general knowledge, etc.
2. Be genuinely helpful and conversational, like chatting with a knowledgeable friend.
3. When relevant, naturally mention that Cee Writing Service can help with professional writing needs.
4. Keep responses concise (under 3 paragraphs) but informative.
5. Use emojis sparingly and tastefully.
6. If someone asks about pricing, direct them to the website or /prices command.
7. Never be pushy or salesy. Be helpful first.`;

// --- /start COMMAND ---
bot.command('start', async (ctx) => {
  await ctx.reply(
    `👋 Hello! Welcome to Cee Writing Service!\n\n` +
    `I'm your AI assistant — ask me anything!\n\n` +
    `Here's what I can help with:\n` +
    `🔹 Career & job hunting advice\n` +
    `🔹 Writing tips & grammar help\n` +
    `🔹 Scholarship guidance\n` +
    `🔹 Our services & pricing\n\n` +
    `Commands:\n` +
    `/prices — See our live pricing\n\n` +
    `Or just type any question and I'll help! 💬`
  );
});

// --- /prices COMMAND ---
bot.command('prices', async (ctx) => {
  if (!supabase) {
    await ctx.reply('Please visit our website for pricing: https://ceewriting.com');
    return;
  }

  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !services || services.length === 0) {
      await ctx.reply(
        `Visit our website for the latest pricing:\n🌐 https://ceewriting.com\n\n` +
        `Or chat with our team on WhatsApp:\n💬 https://wa.me/2349056752549`
      );
      return;
    }

    let text = '✨ *Cee Writing Service — Live Prices* ✨\n\n';
    services.forEach((svc: any) => {
      text += `*${svc.name}*\n💰 ${svc.pricelabel}\n_${svc.desc_text}_\n\n`;
    });
    text += '🌐 Place an order: https://ceewriting.com\n💬 WhatsApp: https://wa.me/2349056752549';

    await ctx.reply(text, { parse_mode: 'Markdown' });
  } catch {
    await ctx.reply(
      `Visit our website for pricing:\n🌐 https://ceewriting.com\n💬 https://wa.me/2349056752549`
    );
  }
});

// --- AI CHAT HANDLER (responds to all text messages) ---
bot.on('message:text', async (ctx) => {
  // Ignore commands (already handled above)
  if (ctx.message.text.startsWith('/')) return;

  const userText = ctx.message.text;

  // Show typing indicator
  try {
    await ctx.api.sendChatAction(ctx.chat.id, 'typing');
  } catch { /* ignore typing errors */ }

  // --- Quick keyword replies (instant, no AI needed) ---
  const lower = userText.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('pay')) {
    await ctx.reply(
      `💰 Great question! Here's a quick overview:\n\n` +
      `Use the /prices command to see our full live pricing list.\n\n` +
      `Or visit our website for details and to place an order:\n` +
      `🌐 https://ceewriting.com\n` +
      `💬 WhatsApp: https://wa.me/2349056752549`
    );
    return;
  }

  // --- AI-Powered Response ---
  if (!groq) {
    // Fallback if Groq is not configured
    await ctx.reply(
      `👋 Thanks for your message!\n\n` +
      `Our AI assistant is temporarily unavailable, but our team is here to help.\n\n` +
      `🌐 https://ceewriting.com\n💬 https://wa.me/2349056752549`
    );
    return;
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userText },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (aiResponse) {
      await ctx.reply(aiResponse);
    } else {
      await ctx.reply(
        `I'm sorry, I had a brief hiccup! 😅 Please try sending your message again.`
      );
    }
  } catch (error) {
    console.error('Groq AI Error in webhook:', error);
    await ctx.reply(
      `I'm experiencing a temporary issue. Please try again in a moment!\n\n` +
      `Or reach our team directly:\n💬 https://wa.me/2349056752549`
    );
  }
});

// Export POST handler for Next.js App Router
export const POST = webhookCallback(bot, 'std/http');
