import { Bot } from 'grammy';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const groqKey = process.env.GROQ_API_KEY;

if (!botToken || !supabaseUrl || !supabaseKey || !groqKey) {
  console.error("Missing environment variables for the Telegram bot.");
  process.exit(1);
}

// Initialize Clients
const bot = new Bot(botToken);
const supabase = createClient(supabaseUrl, supabaseKey);
const groq = new Groq({ apiKey: groqKey });

// --- COMMANDS ---

bot.command("start", (ctx) => {
  ctx.reply(
    "👋 Hello! I am the Cee Writing Service Assistant.\n\n" +
    "Here is what I can do for you:\n" +
    "🔹 Type /prices to see our live pricing.\n" +
    "🔹 Send me an essay or paragraph, and I will grade it or summarize it for you using Llama 3 AI!"
  );
});

bot.command("prices", async (ctx) => {
  const waitMsg = await ctx.reply("Fetching our latest services list...");
  
  const { data: services, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  
  if (error || !services) {
    return ctx.api.editMessageText(ctx.chat.id, waitMsg.message_id, "Sorry, I couldn't fetch the prices at the moment.");
  }

  let text = "✨ *Cee Writing Service Live Prices* ✨\n\n";
  services.forEach(svc => {
    text += `*${svc.name}*\n💰 Starts at ${svc.pricelabel}\n_${svc.desc_text}_\n\n`;
  });

  text += "To place an order, send us a message on WhatsApp!";
  
  await ctx.api.editMessageText(ctx.chat.id, waitMsg.message_id, text, { parse_mode: "Markdown" });
});

// --- AI INTELLIGENCE ---

bot.on("message:text", async (ctx) => {
  const userText = ctx.message.text;
  if (userText.startsWith("/")) return; // Ignore other commands

  // Show typing indicator
  await ctx.api.sendChatAction(ctx.chat.id, "typing");

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful, professional AI assistant working for Cee Writing Service, a premium academic and CV writing company. " +
                   "If the user asks questions, answer them politely. If the user sends a long text, evaluate it for grammar or summarize it. " +
                   "Always keep your responses under 3 paragraphs, use emojis gracefully, and occasionally remind them they can hire Cee Writing Service for a professional, human-written version."
        },
        {
          role: "user",
          content: userText,
        },
      ],
      model: "llama3-70b-8192", // Using Meta's massive Llama 3 open source model for free
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;
    
    if (aiResponse) {
      await ctx.reply(aiResponse);
    } else {
      await ctx.reply("I'm sorry, my brain disconnected for a second. Try again!");
    }
  } catch (error) {
    console.error("Groq AI Error:", error);
    await ctx.reply("System overloaded! Please try again in a moment.");
  }
});

// --- START BOT ---

console.log("Cee Writing Service Bot is starting...");
bot.start({
  onStart: (botInfo) => {
    console.log(`Bot @${botInfo.username} online and listening for messages!`);
  }
});

// Handle graceful shutdown
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
