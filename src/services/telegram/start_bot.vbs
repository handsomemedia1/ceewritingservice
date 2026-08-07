Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\lenovo\.gemini\antigravity\scratch\cee-writing-service"

' Start the Job poster bot (runs every 4 hours)
WshShell.Run "cmd /c node run_bot.mjs >> job_bot_log.txt 2>&1", 0, False

' Start the Channel bot - stories, scholarships, jobs (runs at 8am, 1pm, 6pm)
WshShell.Run "cmd /c node bot_channel.mjs >> channel_bot_log.txt 2>&1", 0, False
