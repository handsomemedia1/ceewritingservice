Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\lenovo\.gemini\antigravity\scratch\cee-writing-service"

' Start the Job poster bot
WshShell.Run "cmd /c node run_bot.mjs >> job_bot_log.txt 2>&1", 0, False

' Start the Story & Scholarship bot (using npx ts-node)
WshShell.Run "cmd /c npx ts-node bot_channel.ts >> channel_bot_log.txt 2>&1", 0, False
