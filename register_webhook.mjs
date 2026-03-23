/**
 * One-time script to register the Telegram webhook.
 * 
 * Usage: node register_webhook.mjs
 * 
 * This tells Telegram to forward all messages sent to the bot
 * to your Vercel deployment, where the AI will respond.
 * 
 * Run this ONCE after deploying to Vercel.
 * Re-run if you ever need to re-register (e.g. after running bot.ts locally).
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = 'https://ceewritingservice.vercel.app/api/telegram-webhook';

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN not found in .env.local');
  process.exit(1);
}

async function registerWebhook() {
  console.log('🔗 Registering Telegram webhook...');
  console.log(`   URL: ${WEBHOOK_URL}\n`);

  try {
    // Step 1: Set the webhook
    const setRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: WEBHOOK_URL,
          allowed_updates: ['message'],
          drop_pending_updates: true,
        }),
      }
    );
    const setData = await setRes.json();

    if (setData.ok) {
      console.log('✅ Webhook registered successfully!');
    } else {
      console.error('❌ Failed to set webhook:', setData.description);
      process.exit(1);
    }

    // Step 2: Verify it
    const infoRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`
    );
    const infoData = await infoRes.json();

    console.log('\n📋 Webhook Info:');
    console.log(`   URL: ${infoData.result?.url || 'NOT SET'}`);
    console.log(`   Pending updates: ${infoData.result?.pending_update_count || 0}`);
    if (infoData.result?.last_error_message) {
      console.log(`   ⚠️  Last error: ${infoData.result.last_error_message}`);
    }
    console.log('\n🎉 Done! Your bot will now respond to DMs via Vercel.');
    console.log('⚠️  Do NOT run bot.ts locally — it will remove this webhook.');
  } catch (error) {
    console.error('❌ Network error:', error.message);
    process.exit(1);
  }
}

registerWebhook();
