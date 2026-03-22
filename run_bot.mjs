import fs from 'fs';
import path from 'path';

// Uses absolute path so it safely runs from the Windows Startup folder
const STATE_FILE = 'C:\\Users\\lenovo\\.gemini\\antigravity\\scratch\\cee-writing-service\\bot_state.json';
const INTERVAL_HOURS = 4;
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000;

function getLastRun() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
            return data.lastRun || 0;
        }
    } catch(e) {}
    return 0; // First time ever
}

function saveLastRun(timestamp) {
    fs.writeFileSync(STATE_FILE, JSON.stringify({ lastRun: timestamp }));
}

async function triggerBot() {
    try {
        console.log(`[${new Date().toLocaleString()}] 🤖 Waking up AI Bot to scrape and post...`);
        const response = await fetch('https://ceewritingservice.vercel.app/api/cron/bot');
        const data = await response.json();
        
        if (data.success) {
            console.log(`✅ Success! Posted job: ${data.job}`);
        } else if (data.message) {
            console.log(`ℹ️ Info: ${data.message} (Skipped posting)`);
        } else if (data.error) {
            console.error(`❌ API Error:`, data.error);
        } else {
            console.error(`❌ Unknown Error:`, data);
        }
    } catch (error) {
        console.error(`❌ Network Error: Failed to reach ceewritingservice.vercel.app. Are you connected to Wi-Fi?`);
    }
}

async function runDaemon() {
    console.log("🚀 CEE WRITING INVISIBLE AUTO-POSTER STARTED");
    
    while (true) {
        let lastRun = getLastRun();
        let now = Date.now();
        let timeSinceLastRun = now - lastRun;

        if (timeSinceLastRun >= INTERVAL_MS) {
            await triggerBot();
            
            // If it's the absolute FIRST run ever, don't try to catch up on "all of history".
            if (lastRun === 0) {
                saveLastRun(now);
            } else {
                // Mathematically advance the clock by 4 hours. 
                // If it was off for 24 hours, this loop will execute 6 times until it catches up!
                saveLastRun(lastRun + INTERVAL_MS);
            }
            
            // Check if it still needs to catch up more. Spacing out rapid catch-ups by 60s
            // prevents Telegram from banning us for spamming 6 messages instantly.
            if ((now - (lastRun + INTERVAL_MS)) >= INTERVAL_MS) {
               console.log("⏳ Catching up on missed posts. Waiting 60s before next post...");
               await new Promise(r => setTimeout(r, 60000));
            }
        } else {
            // Sleep for 1 minute, then check the clock again
            await new Promise(r => setTimeout(r, 60000));
        }
    }
}

runDaemon();
