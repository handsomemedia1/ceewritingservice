import { Bot, InlineKeyboard } from 'grammy';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env.local') });

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
const keyboard = new InlineKeyboard().url("📱 Open Cee Writing App", "https://ceewriting.com");

const text = `✅ Test Post — Cee Writing Service

This is a quick test to verify the new App button works!

━━━━━━━━━━━━━━━━━━━━

✍️ Cee Writing Service
🌐 ceewriting.com`;

bot.api.sendMessage('@ceewritingservice', text, { reply_markup: keyboard })
  .then(() => { console.log('✅ Test post sent successfully!'); process.exit(0); })
  .catch(e => { console.error('❌ Failed:', e.message); process.exit(1); });
