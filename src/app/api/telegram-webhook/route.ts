import { Bot, webhookCallback } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN is missing');

const bot = new Bot(token);

// --- DM LISTENER (AUTO-REPLY CUSTOMER SERVICE) ---
bot.on('message:text', async (ctx) => {
  // Ignore channel broadcast messages
  if (ctx.chat?.type === 'channel') return;

  const text = ctx.message.text.toLowerCase();
  
  // Keyword matching
  if (text.includes('cv') || text.includes('resume') || text.includes('cover letter') || text.includes('sop') || text.includes('statement of purpose') || text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('essay') || text.includes('pay')) {
    await ctx.reply(`👋 Hello! Thanks for reaching out to Cee Writing Service.\n\nWe offer professional, ATS-optimized writing services including:\n✅ CV / Resume Revamp\n✅ Cover Letters\n✅ Academic Statements (SOPs, Personal Statements)\n✅ LinkedIn Optimization\n\nTo see our full pricing and place an order, please visit our website:\n🌐 https://ceewriting.com\n\nOr chat with our team directly on WhatsApp for a quick response:\n💬 https://wa.me/2349056752549`);
  } else {
    // Default reply
    await ctx.reply(`👋 Welcome to Cee Writing Service!\n\nI am the automated assistant. I can help direct you to the right place.\n\nLooking for a professional CV, Cover Letter, or SOP to land your dream job or scholarship?\n\nCheck out our services and pricing here:\n🌐 https://ceewriting.com\n\nNeed to speak with a human? Message our team directly on WhatsApp:\n💬 https://wa.me/2349056752549`);
  }
});

// Export it as a POST handler for Next.js App Router using the standard fetch-based adapter
export const POST = webhookCallback(bot, 'std/http');
